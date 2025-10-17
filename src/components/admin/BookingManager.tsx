
'use client';

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Booking } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, PlusCircle, Trash2 } from "lucide-react";
import { deleteBooking } from "@/app/admin/bookings/actions";
import { BookingForm } from "@/components/admin/BookingForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function DeleteButton({ bookingId }: { bookingId: number }) {
    const deleteBookingWithId = deleteBooking.bind(null, bookingId);
    return (
        <form action={deleteBookingWithId} className="inline-flex">
            <Button variant="ghost" size="icon" type="submit">
                <Trash2 className="h-4 w-4 text-destructive" />
                <span className="sr-only">Zmazať</span>
            </Button>
        </form>
    );
}

function BookingDialog({ children, booking, onFormSubmit }: { children: React.ReactNode, booking?: Booking, onFormSubmit: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const title = booking ? "Upraviť zákazku" : "Pridať novú zákazku";
  const description = booking ? "Upravte údaje o existujúcej zákazke." : "Vyplňte formulár pre vytvorenie novej zákazky.";
  
  const handleFormSubmit = () => {
    setIsOpen(false);
    onFormSubmit();
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
        <BookingForm booking={booking} onFormSubmit={handleFormSubmit} />
      </DialogContent>
    </Dialog>
  );
}


export function BookingManager({ initialBookings }: { initialBookings: Booking[] }) {
    // The initialBookings prop will only be used for the initial render.
    // Revalidating the path on the server action will cause the parent server component to refetch and new props will be passed.
    const sortedBookings = [...initialBookings].sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime());

    const handleDialogClose = () => {
      // This function can be used for any cleanup if needed when the dialog closes,
      // but for now, we just need a function to pass down.
    };
    
    return (
        <>
            <div className="flex justify-end mb-4">
                 <BookingDialog onFormSubmit={handleDialogClose}>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Pridať zákazku
                    </Button>
                </BookingDialog>
            </div>
            
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
                                    <BookingDialog booking={job} onFormSubmit={handleDialogClose}>
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
        </>
    )
}
