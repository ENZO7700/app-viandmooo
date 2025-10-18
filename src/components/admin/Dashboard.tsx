
'use client';

import { useMemo, useState } from 'react';
import { useFirestore } from '@/firebase';
import { useCollection } from '@/firebase/firestore/use-collection';
import { type Booking } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { subDays, startOfMonth, format } from 'date-fns';
import { sk } from 'date-fns/locale';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


type Period = 'month' | '90days' | 'all';

const StatCard = ({ title, value, description }: { title: string, value: string, description: string }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground">{description}</p>
        </CardContent>
    </Card>
);


export function Dashboard() {
    const firestore = useFirestore();
    const query = useMemo(() => firestore.collection('bookings').where('status', '==', 'Completed'), [firestore]);
    const { data: bookings, loading, error } = useCollection<Booking>(query);
    const [period, setPeriod] = useState<Period>('month');

    const formatPrice = (price: number) => new Intl.NumberFormat('sk-SK', { style: 'currency', currency: 'EUR' }).format(price);

    const filteredBookings = useMemo(() => {
        if (!bookings) return [];
        const now = new Date();
        if (period === 'month') {
            const start = startOfMonth(now);
            return bookings.filter(b => new Date(b.start) >= start);
        }
        if (period === '90days') {
            const start = subDays(now, 90);
            return bookings.filter(b => new Date(b.start) >= start);
        }
        return bookings;
    }, [bookings, period]);

    const { totalRevenue, totalBookings, avgBookingValue, chartData } = useMemo(() => {
        if (!filteredBookings) return { totalRevenue: 0, totalBookings: 0, avgBookingValue: 0, chartData: [] };

        const revenue = filteredBookings.reduce((sum, b) => sum + b.price, 0);
        const bookingsCount = filteredBookings.length;
        const avgValue = bookingsCount > 0 ? revenue / bookingsCount : 0;
        
        const dailyRevenue: { [key: string]: number } = {};
        filteredBookings.forEach(booking => {
            const day = format(new Date(booking.start), 'yyyy-MM-dd');
            dailyRevenue[day] = (dailyRevenue[day] || 0) + booking.price;
        });

        const sortedChartData = Object.entries(dailyRevenue)
            .map(([date, total]) => ({ name: format(new Date(date), 'd. MMM', { locale: sk }), total }))
            .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());


        return {
            totalRevenue: revenue,
            totalBookings: bookingsCount,
            avgBookingValue: avgValue,
            chartData: sortedChartData,
        };
    }, [filteredBookings]);

    if (error) {
        return <div className="text-destructive">Chyba pri načítavaní dát: {error.message}</div>
    }
    if (loading) {
        // This is handled by Suspense in the page, but as a fallback.
        return <div>Načítavanie štatistík...</div>
    }

    return (
        <div className="space-y-6">
            <Tabs value={period} onValueChange={(value) => setPeriod(value as Period)}>
                <TabsList>
                    <TabsTrigger value="month">Tento mesiac</TabsTrigger>
                    <TabsTrigger value="90days">Posledných 90 dní</TabsTrigger>
                    <TabsTrigger value="all">Celá história</TabsTrigger>
                </TabsList>
            </Tabs>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <StatCard 
                    title="Celkové tržby" 
                    value={formatPrice(totalRevenue)}
                    description="Súčet cien všetkých dokončených zákaziek."
                />
                <StatCard 
                    title="Priemerná cena zákazky" 
                    value={formatPrice(avgBookingValue)}
                    description="Priemerná hodnota jednej dokončenej zákazky."
                />
                <StatCard 
                    title="Počet zákaziek" 
                    value={totalBookings.toString()}
                    description="Celkový počet dokončených zákaziek."
                />
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Prehľad tržieb</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={chartData}>
                            <XAxis
                                dataKey="name"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${formatPrice(value as number)}`}
                            />
                            <Tooltip 
                                 cursor={{fill: 'hsl(var(--muted))'}}
                                 contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))'}}
                                 labelStyle={{color: 'hsl(var(--foreground))'}}
                                 formatter={(value) => [formatPrice(value as number), 'Tržba']}
                            />
                            <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}
