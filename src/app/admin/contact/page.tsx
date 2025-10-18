
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarClient } from './CalendarClient';
import { useCollection, useFirebase } from '@/firebase';
import { mapBookingsToCalendarEvents, type Booking } from '@/lib/data';
import 'firebase/compat/firestore';
import { useMemo } from 'react';

export default function AdminContactPage() {
    const { firestore } = useFirebase();
    const bookingsQuery = useMemo(() => firestore ? firestore.collection('bookings') : null, [firestore]);
    const { data: bookings, loading } = useCollection<Booking>(bookingsQuery);

    const events = mapBookingsToCalendarEvents(bookings || []);
    
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Kalendár zákazok</CardTitle>
                    <CardDescription>Vizuálny prehľad všetkých naplánovaných zákazok.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[70vh] bg-background p-4 rounded-lg">
                       <CalendarClient initialEvents={events} isLoading={loading} />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
