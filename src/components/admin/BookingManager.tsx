
'use client';

import { useState, useMemo } from 'react';
import { useFirestore } from '@/firebase';
import { useCollection } from '@/firebase/firestore/use-collection';
import type { Booking } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BookingForm } from '@/components/admin/BookingForm';
import { PlusCircle, ArrowUpDown } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { sk } from 'date-fns/locale';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { collection } from 'firebase/firestore';

type SortKey = 'start' | 'price' | 'clientName';
type SortDirection = 'asc' | 'desc';


export function BookingManager() {
  const firestore = useFirestore();
  const query = useMemo(() => firestore ? collection(firestore, 'bookings') : null, [firestore]);
  const { data: bookings, loading, error } = useCollection<Booking>(query);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | undefined>(undefined);
  
  const [sortKey, setSortKey] = useState<SortKey>('start');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleEdit = (booking: Booking) => {
    setEditingBooking(booking);
    setDialogOpen(true);
  };
  
  const handleAddNew = () => {
    setEditingBooking(undefined);
    setDialogOpen(true);
  };
  
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
        setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
        setSortKey(key);
        setSortDirection('asc');
    }
  }

  const sortedBookings = useMemo(() => {
    if (!bookings) return [];
    return [...bookings].sort((a, b) => {
        const aValue = a[sortKey];
        const bValue = b[sortKey];

        let comparison = 0;
        if (aValue > bValue) {
            comparison = 1;
        } else if (aValue < bValue) {
            comparison = -1;
        }
        
        return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [bookings, sortKey, sortDirection]);
  

  if (error) return <div>Chyba: {error.message}</div>;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('sk-SK', { style: 'currency', currency: 'EUR' }).format(price);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
        const date = parseISO(dateString);
        return format(date, 'd. MMMM yyyy', { locale: sk });
    } catch {
        return 'Neplatný dátum';
    }
  };


  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <div className="flex justify-end mb-4">
             <Button onClick={handleAddNew} className="flex items-center gap-2">
                <PlusCircle size={20} />
                Pridať novú zákazku
            </Button>
        </div>
        <div className="rounded-md border">
            <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Názov</TableHead>
                    <TableHead>Klient</TableHead>
                    <TableHead>
                        <Button variant="ghost" onClick={() => handleSort('start')}>
                            Dátum
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                    </TableHead>
                    <TableHead className="text-right">
                        <Button variant="ghost" onClick={() => handleSort('price')}>
                            Cena
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Akcie</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {loading ? (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center py-10">
                            Načítavam zákazky...
                        </TableCell>
                    </TableRow>
                ) : sortedBookings && sortedBookings.length > 0 ? (
                    sortedBookings.map((booking) => (
                        <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.title}</TableCell>
                        <TableCell>{booking.clientName}</TableCell>
                        <TableCell>{formatDate(booking.start)}</TableCell>
                        <TableCell className="text-right">{formatPrice(booking.price)}</TableCell>
                        <TableCell>{booking.status}</TableCell>
                        <TableCell className="text-right">
                            <Button variant="outline" size="sm" onClick={() => handleEdit(booking)}>
                                Upraviť
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center">
                            Nenašli sa žiadne zákazky.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
            </Table>
        </div>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>{editingBooking ? 'Upraviť zákazku' : 'Vytvoriť novú zákazku'}</DialogTitle>
            </DialogHeader>
            <BookingForm booking={editingBooking} onFormSubmitSuccess={() => setDialogOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
