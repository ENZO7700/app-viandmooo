
import { BarChart, Calendar, Mail, Settings, TruckIcon, ShieldCheck } from "lucide-react";
import type { Event } from 'react-big-calendar';
import fs from 'fs';
import path from 'path';

export const adminNavItems = [
  { href: "/admin", label: "Dashboard", icon: BarChart },
  { href: "/admin/bookings", label: "Zákazky", icon: TruckIcon },
  { href: "/admin/contact", label: "Kalendár", icon: Calendar },
  { href: "/admin/messages", label: "Správy", icon: Mail },
  { href: "/admin/settings", label: "Nastavenia", icon: Settings },
  { href: "/admin/system-check", label: "Kontrola Systému", icon: ShieldCheck },
];

// --- DATA PERSISTENCE (SERVER-SIDE ONLY) ---
// This code runs only on the server.

const dataDir = path.join(process.cwd(), 'data');
const bookingsFilePath = path.join(dataDir, 'bookings.json');
const submissionsFilePath = path.join(dataDir, 'submissions.json');

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

// --- Bookings ---
export const getBookings = (): Booking[] => readData<Booking>(bookingsFilePath);
export const saveBookings = (data: Booking[]): void => writeData<Booking>(bookingsFilePath, data);

// --- Submissions ---
export const getSubmissions = (): ContactSubmission[] => readData<ContactSubmission>(submissionsFilePath);
export const saveSubmission = (submission: ContactSubmission): void => {
    const submissions = getSubmissions();
    // Add to the beginning of the array to show newest first
    submissions.unshift(submission);
    writeData<ContactSubmission>(submissionsFilePath, submissions);
};


// --- Derived Data & Helpers ---

export function getNextBookingId(): number {
    const bookings = getBookings();
    if (bookings.length === 0) {
        return 1;
    }
    const maxId = Math.max(...bookings.map(b => b.id));
    return maxId + 1;
}

export const getCalendarBookings = (): Event[] => {
    return getBookings().map(b => ({
        title: b.title,
        start: new Date(b.start),
        end: new Date(b.end),
        resource: b,
    }));
};
