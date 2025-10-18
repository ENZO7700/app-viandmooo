'use client';

import { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Booking } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, PlusCircle, Trash2 } from "lucide-react";
import { deleteBookingAction } from "@/app/admin/bookings/actions";
import { BookingForm } from "@/components/admin/BookingForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useCollection, useFirebase } from "@/firebase";
import { collection } from "firebase/firestore";
import { Skeleton } from "../ui/skeleton";


function DeleteButton({ bookingId }: { bookingId: string }) {
    const { toast } = useToast();
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm('Naozaj si želáte zmazať túto zákazku?')) return;
        const result = await deleteBookingAction(bookingId);
        if (result.success) {
            toast({
                title: 'Úspech!',
                description: result.message,
            });
            // Router refresh is handled by useCollection hook automatically
        } else {
            toast({
                title: 'Chyba',
                description: result.message,
                variant: 'destructive',
            });
        }
    }
    return (
        <Button variant="ghost" size="icon" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 text-destructive" />
            <span className="sr-only">Zmazať</span>
        </Button>
    );
}

function BookingDialog({ children, booking }: { children: React.ReactNode, booking?: Booking }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const title = booking ? "Upraviť zákazku" : "Pridať novú zákazku";
  const description = booking ? "Upravte údaje o existujúcej zákazke." : "Vyplňte formulár pre vytvorenie novej zákazky.";
  
  const handleFormSubmitSuccess = () => {
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <BookingForm booking={booking} onFormSubmitSuccess={handleFormSubmitSuccess} />
      </DialogContent>
    </Dialog>
  );
}


export function BookingManager() {
    const { firestore } = useFirebase();
    const bookingsQuery = firestore ? collection(firestore, 'bookings') : null;
    const { data: bookings, loading } = useCollection<Booking>(bookingsQuery);

    const sortedBookings = useMemo(() => {
        if (!bookings) return [];
        return [...bookings].sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime());
    }, [bookings]);

    return (
        <>
            <div className="flex justify-end mb-4">
                 <BookingDialog>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Pridať zákazku
                    </Button>
                </BookingDialog>
            </div>
            
             {loading && (
                <div className="space-y-2">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                </div>
             )}

            {!loading && (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Klient</TableHead>
                            <TableHead>Služba</TableHead>
                            <TableHead>Dátum</TableHead>
                            <TableHead>Stav</TableHead>
                            <TableHead>Cena</TableHead>
                            <TableHead className="text-right">Akcie</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedBookings.length > 0 ? (
                            sortedBookings.map((job) => (
                                <TableRow key={job.id}>
                                    <TableCell>
                                        <div className="font-medium">{job.clientName}</div>
                                    </TableCell>
                                    <TableCell>{job.title}</TableCell>
                                    <TableCell>{new Date(job.start).toLocaleDateString('sk-SK')}</TableCell>
                                    <TableCell>
                                        <Badge variant={job.status === 'Completed' ? 'default' : job.status === 'Cancelled' ? 'destructive' : 'secondary'}>{job.status}</Badge>
                                    </TableCell>
                                    <TableCell>{job.price.toLocaleString('sk-SK')} €</TableCell>
                                    <TableCell className="text-right">
                                        <BookingDialog booking={job}>
                                            <Button variant="ghost" size="icon">
                                                <Pencil className="h-4 w-4" />
                                                <span className="sr-only">Upraviť</span>
                                            </Button>
                                        </BookingDialog>
                                        <DeleteButton bookingId={job.id} />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-10">
                                    Zatiaľ neevidujete žiadne zákazky.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            )}
        </>
    )
}
