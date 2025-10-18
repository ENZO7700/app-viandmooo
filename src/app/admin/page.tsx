
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, Truck, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fetchBookings } from "./bookings/actions";

export default async function AdminDashboardPage() {
    const bookings = await fetchBookings();
    
    // --- Dynamic Stats Calculation ---
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const bookingsThisMonth = bookings.filter(b => {
        const bookingDate = new Date(b.start);
        return bookingDate.getMonth() === currentMonth && bookingDate.getFullYear() === currentYear;
    });

    // 1. Monthly Revenue
    const monthlyRevenue = bookingsThisMonth
        .filter(b => b.status === 'Completed')
        .reduce((sum, b) => sum + (b.price || 0), 0);

    // 2. Bookings this month
    const monthlyBookingsCount = bookingsThisMonth.length;
    
    // 3. New clients this month (unique client names)
    const newClientsThisMonth = new Set(bookingsThisMonth.map(b => b.clientName)).size;

    // 4. Recent Jobs (last 4)
    const recentJobs = [...bookings].sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime()).slice(0, 4);

    const stats = [
        { title: "Mesačné tržby", value: `${monthlyRevenue.toLocaleString('sk-SK')} €`, icon: <DollarSign className="h-4 w-4 text-muted-foreground"/> },
        { title: "Zákazky tento mesiac", value: `+${monthlyBookingsCount}`, icon: <Truck className="h-4 w-4 text-muted-foreground"/> },
        { title: "Noví klienti tento mesiac", value: `+${newClientsThisMonth}`, icon: <Users className="h-4 w-4 text-muted-foreground"/> },
    ]


    return (
        <div className="space-y-6">
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

            <div>
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
            </div>
        </div>
    )
}
