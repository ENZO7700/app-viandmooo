
'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Meno musí mať aspoň 2 znaky.' }),
  phone: z.string().min(9, { message: 'Telefónne číslo je príliš krátke.' }),
  email: z.string().email({ message: 'Zadajte platnú e-mailovú adresu.' }),
  address: z.string().optional(),
  message: z.string().min(10, { message: 'Správa musí mať aspoň 10 znakov.' }),
});

type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        if (!formspreeEndpoint) {
            console.error("Formspree endpoint nie je nastavený v .env.local");
            setSubmitStatus('error');
            toast({
                title: "Chyba konfigurácie",
                description: "Kontaktný formulár nie je správne nakonfigurovaný.",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch(formspreeEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setSubmitStatus('success');
                toast({
                    title: "Správa úspešne odoslaná!",
                    description: "Ďakujeme, ozveme sa vám čo najskôr.",
                    variant: "default",
                });
                reset();
            } else {
                throw new Error('Odoslanie zlyhalo');
            }
        } catch (error) {
            setSubmitStatus('error');
            toast({
                title: "Chyba pri odosielaní",
                description: "Vyskytol sa problém. Skúste to prosím znova alebo nás kontaktujte priamo.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="p-6 md:p-8 shadow-lg rounded-xl bg-card border text-card-foreground">
            <CardHeader className="p-0 mb-6">
                <h2 className="text-3xl font-headline text-primary">Napíšte Nám</h2>
                <p className="text-muted-foreground">Odpovieme vám čo najskôr.</p>
            </CardHeader>
            <CardContent className="p-0">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Meno/Firma *</Label>
                        <Input id="name" placeholder="Vaše meno alebo názov firmy" {...register('name')} />
                        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Mobil *</Label>
                        <Input id="phone" type="tel" placeholder="Vaše telefónne číslo" {...register('phone')} />
                        {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" type="email" placeholder="vas@email.com" {...register('email')} />
                        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Adresa (nepovinné)</Label>
                        <Input id="address" placeholder="Adresa sťahovania alebo upratovania" {...register('address')} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="message">Vaša Správa *</Label>
                        <Textarea id="message" placeholder="Popíšte nám, s čím vám môžeme pomôcť..." rows={5} {...register('message')} />
                        {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
                    </div>

                    {submitStatus === 'success' && (
                        <Alert variant="default" className="bg-green-100 dark:bg-green-900/30 border-green-400">
                            <AlertTitle className="text-green-800 dark:text-green-300">Odoslané!</AlertTitle>
                            <AlertDescription className="text-green-700 dark:text-green-400">
                                Vaša správa bola úspešne odoslaná. Čoskoro sa vám ozveme.
                            </AlertDescription>
                        </Alert>
                    )}
                    {submitStatus === 'error' && (
                         <Alert variant="destructive">
                            <AlertTitle>Chyba</AlertTitle>
                            <AlertDescription>
                                Pri odosielaní správy sa vyskytla chyba. Skúste to znova alebo nás kontaktujte telefonicky.
                            </AlertDescription>
                        </Alert>
                    )}

                    <Button type="submit" size="lg" className="w-full py-6" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Odosielam...
                            </>
                        ) : 'Odoslať správu'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
