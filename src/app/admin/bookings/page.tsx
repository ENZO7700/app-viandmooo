
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchBookings } from "./actions";
import { BookingManager } from "@/components/admin/BookingManager";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

async function BookingsData() {
    const bookings = await fetchBookings();
    return <BookingManager initialBookings={bookings} />;
}

function BookingsSkeleton() {
    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <Skeleton className="h-10 w-[150px]" />
            </div>
            <Skeleton className="h-48 w-full" />
        </div>
    )
}

export default async function AdminBookingsPage() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Správa zákazok</CardTitle>
                        <CardDescription>Zoznam všetkých prijatých a naplánovaných zákazok.</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                   <Suspense fallback={<BookingsSkeleton />}>
                        <BookingsData />
                   </Suspense>
                </CardContent>
            </Card>
        </div>
    )
}
