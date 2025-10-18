
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarClient } from './CalendarClient';
import { fetchBookings } from '@/app/admin/bookings/actions';
import { mapBookingsToCalendarEvents } from '@/lib/data';

export default async function AdminContactPage() {
    const bookings = await fetchBookings();
    const events = mapBookingsToCalendarEvents(bookings);
    
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Kalendár zákazok</CardTitle>
                    <CardDescription>Vizuálny prehľad všetkých naplánovaných zákazok.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[70vh] bg-background p-4 rounded-lg">
                       <CalendarClient initialEvents={events} />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
