
'use server';

import { revalidatePath } from "next/cache";
import { z } from "zod";
import fs from 'fs';
import path from 'path';
import type { Booking } from "@/lib/data";

const dataDir = path.join(process.cwd(), 'data');
const bookingsFilePath = path.join(dataDir, 'bookings.json');

// Helper function to ensure files exist and read them
function readData<T>(filePath: string): T[] {
    try {
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, '[]', 'utf8');
        }
        const fileContent = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error(`Error reading data from ${filePath}:`, error);
        return [];
    }
}

// Helper function to write data
function writeData<T>(filePath: string, data: T[]): void {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error(`Error writing data to ${filePath}:`, error);
    }
}

const getBookings = (): Booking[] => readData<Booking>(bookingsFilePath);
const saveAllBookings = (data: Booking[]): void => writeData<Booking>(bookingsFilePath, data);

const getNextBookingId = (): number => {
    const bookings = getBookings();
    if (bookings.length === 0) {
        return 1;
    }
    const maxId = Math.max(...bookings.map(b => b.id));
    return maxId + 1;
};

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
  const bookings = getBookings();
  const bookingId = formData.get('id') ? Number(formData.get('id')) : null;
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
        end: eventDate.toISOString(), // Assuming end time is same as start for simplicity
    }

    if (bookingId) {
      // Update existing booking
      const index = bookings.findIndex(b => b.id === bookingId);
      if (index !== -1) {
        bookings[index] = {
          ...bookings[index],
          ...eventData,
          id: bookingId, // ensure id is not lost
        };
      } else {
         throw new Error(`Booking with ID ${bookingId} not found.`);
      }
    } else {
      // Create new booking
      const newBooking: Booking = {
        id: getNextBookingId(),
        ...eventData,
      };
      bookings.push(newBooking);
    }
    
    saveAllBookings(bookings);
    
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

export async function deleteBooking(bookingId: number) {
    let bookings = getBookings();
    const updatedBookings = bookings.filter(b => b.id !== bookingId);

    if (bookings.length !== updatedBookings.length) {
        saveAllBookings(updatedBookings);
        revalidatePath('/admin/bookings');
        revalidatePath('/admin');
        revalidatePath('/admin/contact');
        return { success: true, message: 'Zákazka bola zmazaná.' };
    } else {
        return { success: false, message: 'Zákazka nebola nájdená.' };
    }
}

export async function fetchBookings(): Promise<Booking[]> {
    return getBookings();
}
