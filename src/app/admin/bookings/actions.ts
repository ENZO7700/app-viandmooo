
'use server';

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { initializeFirebase } from "@/firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const bookingSchema = z.object({
  clientName: z.string().min(1, "Meno klienta je povinné."),
  title: z.string().min(1, "Názov služby je povinný."),
  start: z.string().min(1, "Dátum je povinný."),
  price: z.coerce.number().min(0, "Cena musí byť kladné číslo."),
  status: z.enum(['Scheduled', 'Completed', 'Cancelled']),
});

export type BookingFormState = {
  message: string;
  issues?: string[];
  success?: boolean;
}

export async function createOrUpdateBooking(
  prevState: BookingFormState,
  formData: FormData
): Promise<BookingFormState> {
  const { firestore } = initializeFirebase();
  const bookingsCollection = firestore.collection('bookings');
  
  const bookingId = formData.get('id') ? formData.get('id') as string : null;
  const data = Object.fromEntries(formData);
  const parsed = bookingSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "Formulár obsahuje chyby.",
      issues: parsed.error.issues.map((issue) => `${issue.path.join('.')} : ${issue.message}`),
    };
  }
  
  try {
    const eventDate = new Date(parsed.data.start);
    const eventData = {
        ...parsed.data,
        start: eventDate.toISOString(),
        end: eventDate.toISOString(), // Ensure end date is also set
    };

    if (bookingId) {
      const bookingRef = bookingsCollection.doc(bookingId);
      await bookingRef.update(eventData);
    } else {
      await bookingsCollection.add(eventData);
    }
    
    revalidatePath('/admin/bookings');
    revalidatePath('/admin');
    revalidatePath('/admin/contact');

    return { 
        success: true,
        message: `Zákazka bola úspešne ${bookingId ? 'upravená' : 'vytvorená'}.` 
    };
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Neznáma chyba.";
    return {
      success: false,
      message: `Ľutujeme, nastala chyba: ${errorMessage}`,
    };
  }
}

export async function deleteBookingAction(bookingId: string) {
    try {
        const { firestore } = initializeFirebase();
        const bookingRef = firestore.collection('bookings').doc(bookingId);
        await bookingRef.delete();

        revalidatePath('/admin/bookings');
        revalidatePath('/admin');
        revalidatePath('/admin/contact');
        return { success: true, message: 'Zákazka bola zmazaná.' };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Neznáma chyba.";
        return { success: false, message: `Chyba pri mazaní zákazky: ${errorMessage}` };
    }
}
