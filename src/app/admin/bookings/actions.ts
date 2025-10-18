
'use server';

import { revalidatePath } from "next/cache";
import { z } from "zod";
import fs from 'fs/promises';
import path from 'path';
import type { Booking } from "@/lib/data";

const dataDir = path.join(process.cwd(), 'data');
const bookingsFilePath = path.join(dataDir, 'bookings.json');

// Helper function to ensure directory and files exist, then read them
async function readData<T>(filePath: string): Promise<T[]> {
    try {
        await fs.mkdir(dataDir, { recursive: true });
        await fs.access(filePath);
    } catch {
        // If file doesn't exist, create it with an empty array
        await fs.writeFile(filePath, '[]', 'utf8');
    }

    try {
        const fileContent = await fs.readFile(filePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error(`Error reading or parsing data from ${filePath}:`, error);
        // Return an empty array if parsing fails to prevent crashes
        return [];
    }
}

// Helper function to write data
async function writeData<T>(filePath: string, data: T[]): Promise<void> {
    try {
        await fs.mkdir(dataDir, { recursive: true });
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error(`Error writing data to ${filePath}:`, error);
        // We re-throw here to let the caller know the write failed.
        throw new Error(`Could not write data to ${filePath}.`);
    }
}

const getBookings = async (): Promise<Booking[]> => await readData<Booking>(bookingsFilePath);
const saveAllBookings = async (data: Booking[]): Promise<void> => await writeData<Booking>(bookingsFilePath, data);

const getNextBookingId = async (): Promise<number> => {
    const bookings = await getBookings();
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
  const bookings = await getBookings();
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
        id: await getNextBookingId(),
        ...eventData,
      };
      bookings.push(newBooking);
    }
    
    await saveAllBookings(bookings);
    
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
    try {
        let bookings = await getBookings();
        const initialLength = bookings.length;
        const updatedBookings = bookings.filter(b => b.id !== bookingId);

        if (initialLength !== updatedBookings.length) {
            await saveAllBookings(updatedBookings);
            revalidatePath('/admin/bookings');
            revalidatePath('/admin');
            revalidatePath('/admin/contact');
            return { success: true, message: 'Zákazka bola zmazaná.' };
        } else {
            return { success: false, message: 'Zákazka nebola nájdená.' };
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Neznáma chyba.";
        return { success: false, message: `Chyba pri mazaní zákazky: ${errorMessage}` };
    }
}

export async function fetchBookings(): Promise<Booking[]> {
    return await getBookings();
}
