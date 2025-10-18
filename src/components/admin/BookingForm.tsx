'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { createOrUpdateBooking, type BookingFormState } from '@/app/admin/bookings/actions';
import type { Booking } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (isEditing ? 'Ukladám zmeny...' : 'Vytváram zákazku...') : (isEditing ? 'Uložiť zmeny' : 'Vytvoriť zákazku')}
    </Button>
  );
}

export function BookingForm({ booking, onFormSubmitSuccess }: { booking?: Booking, onFormSubmitSuccess: () => void }) {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  
  const initialState: BookingFormState = {
    message: '',
    issues: [],
    success: false,
  };
  
  const [state, formAction] = useFormState(createOrUpdateBooking, initialState);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: 'Úspech!',
          description: state.message,
        });
        onFormSubmitSuccess();
        formRef.current?.reset();
      } else {
        toast({
          title: 'Chyba vo formulári',
          description: state.message,
          variant: 'destructive',
        });
      }
    }
  }, [state, toast, onFormSubmitSuccess]);

  const getErrorForField = (field: string) => {
    return state.issues?.find(issue => issue.startsWith(field))?.split(' : ')[1];
  }

  const isEditing = !!booking;
  const defaultDate = booking?.start ? format(new Date(booking.start), 'yyyy-MM-dd') : '';

  return (
    <form ref={formRef} action={formAction} className="grid gap-4 py-4">
      {booking?.id && <input type="hidden" name="id" value={booking.id} />}
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="clientName" className="text-right">Meno klienta</Label>
        <div className="col-span-3">
          <Input id="clientName" name="clientName" defaultValue={booking?.clientName} className="w-full" />
          <p className="text-destructive text-xs h-4 mt-1">{getErrorForField('clientName')}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="title" className="text-right">Služba</Label>
        <div className="col-span-3">
            <Input id="title" name="title" defaultValue={booking?.title} className="w-full" />
            <p className="text-destructive text-xs h-4 mt-1">{getErrorForField('title')}</p>
        </div>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="start" className="text-right">Dátum</Label>
        <div className="col-span-3">
            <Input id="start" name="start" type="date" defaultValue={defaultDate} className="w-full" />
            <p className="text-destructive text-xs h-4 mt-1">{getErrorForField('start')}</p>
        </div>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="price" className="text-right">Cena (€)</Label>
        <div className="col-span-3">
            <Input id="price" name="price" type="number" step="0.01" defaultValue={booking?.price} className="w-full" />
            <p className="text-destructive text-xs h-4 mt-1">{getErrorForField('price')}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="status" className="text-right">Stav</Label>
        <div className="col-span-3">
           <Select name="status" defaultValue={booking?.status || 'Scheduled'}>
              <SelectTrigger>
                <SelectValue placeholder="Vyberte stav" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Scheduled">Naplánovaná</SelectItem>
                <SelectItem value="Completed">Dokončená</SelectItem>
                <SelectItem value="Cancelled">Zrušená</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-destructive text-xs h-4 mt-1">{getErrorForField('status')}</p>
        </div>
      </div>

      <SubmitButton isEditing={isEditing} />
    </form>
  );
}
