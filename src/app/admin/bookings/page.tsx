
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchBookings } from "./actions";
import { BookingManager } from "@/components/admin/BookingManager";

export default async function AdminBookingsPage() {
    const bookings = await fetchBookings();
    
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
                   <BookingManager initialBookings={bookings} />
                </CardContent>
            </Card>
        </div>
    )
}
