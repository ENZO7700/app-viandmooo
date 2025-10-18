
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookingManager } from "@/components/admin/BookingManager";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

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
                        <BookingManager />
                   </Suspense>
                </CardContent>
            </Card>
        </div>
    )
}
