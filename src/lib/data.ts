
import { BarChart, Calendar, Mail, Settings, TruckIcon, ShieldCheck } from "lucide-react";
import type { Event } from 'react-big-calendar';

export const adminNavItems = [
  { href: "/admin", label: "Dashboard", icon: BarChart },
  { href: "/admin/bookings", label: "Zákazky", icon: TruckIcon },
  { href: "/admin/contact", label: "Kalendár", icon: Calendar },
  { href: "/admin/messages", label: "Správy", icon: Mail },
  { href: "/admin/settings", label: "Nastavenia", icon: Settings },
  { href: "/admin/system-check", label: "Kontrola Systému", icon: ShieldCheck },
];

// Represents a single contact form submission.
export interface ContactSubmission {
    id: string;
    name: string;
    phone: string;
    email: string;
    address?: string;
    message: string;
    date: string; // ISO 8601 date string
}

// Represents a single booking/job.
export interface Booking {
    id: number;
    clientName: string;
    title: string;
    start: string; // Storing as ISO string
    end: string;   // Storing as ISO string
    price: number;
    status: 'Scheduled' | 'Completed' | 'Cancelled';
}

// This function is now just for mapping, no fs access
export const mapBookingsToCalendarEvents = (bookings: Booking[]): Event[] => {
    return bookings.map(b => ({
        title: b.title,
        start: new Date(b.start),
        end: new Date(b.end),
        resource: b,
    }));
};
