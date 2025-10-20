
import type { Event } from 'react-big-calendar';

export interface Booking {
    id: string;
    clientName: string;
    title: string;
    start: string; // ISO string
    end: string;   // ISO string
    price: number;
    status: 'Scheduled' | 'Completed' | 'Cancelled';
}

export const mapBookingsToCalendarEvents = (bookings: Booking[]): Event[] => {
    if (!bookings) return [];
    return bookings.map(b => ({
        title: b.title,
        start: new Date(b.start),
        end: new Date(b.end),
        resource: b,
    }));
};
