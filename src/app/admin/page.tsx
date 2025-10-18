
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, Truck, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCollection, useFirebase } from "@/firebase";
import type { Booking } from "@/lib/data";
import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import 'firebase/compat/firestore';

function StatsSkeleton() {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            {[...Array(3)].map((_, i) => (
                 <Card key={i}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-8 w-1/2" />
                        <Skeleton className="h-3 w-1/3 mt-1" />
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

function RecentJobsSkeleton() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Nedávne a aktuálne zákazky</CardTitle>
                <CardDescription>Prehľad posledných štyroch zákazok.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                     {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex justify-between items-center p-2">
                            <div className="space-y-1">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-3 w-32" />
                            </div>
                            <Skeleton className="h-6 w-20" />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}


export default function AdminDashboardPage() {
    const { firestore } = useFirebase();
    const bookingsQuery = firestore ? firestore.collection('bookings') : null;
    const { data: bookings, loading } = useCollection<Booking>(bookingsQuery);

    const { monthlyRevenue, monthlyBookingsCount, newClientsThisMonth, recentJobs } = useMemo(() => {
        if (!bookings) return { monthlyRevenue: 0, monthlyBookingsCount: 0, newClientsThisMonth: 0, recentJobs: [] };
        
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        
        const bookingsThisMonth = bookings.filter(b => {
            const bookingDate = new Date(b.start);
            return bookingDate.getMonth() === currentMonth && bookingDate.getFullYear() === currentYear;
        });

        const monthlyRevenue = bookingsThisMonth
            .filter(b => b.status === 'Completed')
            .reduce((sum, b) => sum + (b.price || 0), 0);

        const monthlyBookingsCount = bookingsThisMonth.length;
        
        const newClientsThisMonth = new Set(bookingsThisMonth.map(b => b.clientName)).size;

        const recentJobs = [...bookings].sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime()).slice(0, 4);
        
        return { monthlyRevenue, monthlyBookingsCount, newClientsThisMonth, recentJobs };

    }, [bookings]);

    const stats = [
        { title: "Mesačné tržby", value: `${monthlyRevenue.toLocaleString('sk-SK')} €`, icon: <DollarSign className="h-4 w-4 text-muted-foreground"/> },
        { title: "Zákazky tento mesiac", value: `+${monthlyBookingsCount}`, icon: <Truck className="h-4 w-4 text-muted-foreground"/> },
        { title: "Noví klienti tento mesiac", value: `+${newClientsThisMonth}`, icon: <Users className="h-4 w-4 text-muted-foreground"/> },
    ];


    return (
        <div className="space-y-6">
            {loading ? <StatsSkeleton/> : (
                <div className="grid gap-4 md:grid-cols-3">
                    {stats.map(stat => (
                        <Card key={stat.title}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                {stat.icon}
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className="text-xs text-muted-foreground">
                                    aktuálny mesiac
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            <div>
                 {loading ? <RecentJobsSkeleton /> : (
                    <Card>
                        <CardHeader>
                            <CardTitle>Nedávne a aktuálne zákazky</CardTitle>
                            <CardDescription>Prehľad posledných štyroch zákazok.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                 <TableHeader>
                                    <TableRow>
                                        <TableHead>Klient</TableHead>
                                        <TableHead>Služba</TableHead>
                                        <TableHead>Dátum</TableHead>
                                        <TableHead>Stav</TableHead>
                                        <TableHead className="text-right">Cena</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentJobs.length > 0 ? (
                                        recentJobs.map((job) => (
                                         <TableRow key={job.id}>
                                            <TableCell>
                                                <div className="font-medium">{job.clientName}</div>
                                            </TableCell>
                                            <TableCell>{job.title}</TableCell>
                                            <TableCell>{new Date(job.start).toLocaleDateString('sk-SK')}</TableCell>
                                            <TableCell>
                                                 <Badge variant={job.status === 'Completed' ? 'default' : job.status === 'Cancelled' ? 'destructive' : 'secondary'}>{job.status}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">{job.price.toLocaleString('sk-SK')} €</TableCell>
                                        </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-10">
                                                Žiadne nedávne zákazky.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                 )}
            </div>
        </div>
    )
}
