
import { BarChart, Calendar, Mail, Settings, TruckIcon, ShieldCheck, Rocket } from "lucide-react";
import type { Event } from 'react-big-calendar';
import type { Timestamp } from 'firebase/firestore';


export const adminNavItems = [
  { href: "/admin", label: "Dashboard", icon: BarChart },
  { href: "/admin/bookings", label: "Zákazky", icon: TruckIcon },
  { href: "/admin/contact", label: "Kalendár", icon: Calendar },
  { href: "/admin/messages", label: "Správy", icon: Mail },
  { href: "/admin/mission", label: "Misia", icon: Rocket },
  { href: "/admin/settings", label: "Nastavenia", icon: Settings },
  { href: "/admin/system-check", label: "Kontrola Systému", icon: ShieldCheck },
];

export interface ContactSubmission {
    id: string;
    name: string;
    phone: string;
    email: string;
    address?: string;
    message: string;
    date: Timestamp; 
}

export interface Booking {
    id: string; // Firestore uses string IDs
    clientName: string;
    title: string;
    start: string; // Storing as ISO string
    end: string;   // Storing as ISO string
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
