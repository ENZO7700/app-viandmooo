
'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { submitContactForm, type ContactFormState } from '@/app/actions';

export function ContactForm() {
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);

    const initialState: ContactFormState = {
        message: "",
    };

    const [state, formAction] = useActionState(submitContactForm, initialState);

    useEffect(() => {
        if (state.message && !state.issues) {
            toast({
                title: "Správa odoslaná",
                description: state.message,
                variant: "default",
            });
            formRef.current?.reset();
        } else if (state.message && state.issues) {
             toast({
                title: "Chyba vo formulári",
                description: state.message,
                variant: "destructive",
            });
        }
    }, [state, toast]);

    const getErrorForField = (field: string) => {
        return state.issues?.find(issue => issue.startsWith(field))?.split(' a ')[1];
    }

    return (
        <Card className="p-6 md:p-8 shadow-lg rounded-xl bg-card border text-card-foreground">
            <CardHeader className="p-0 mb-6">
            <h2 className="text-3xl font-headline text-primary">Napíšte Nám</h2>
            <p className="text-muted-foreground">Odpovieme vám čo najskôr.</p>
            </CardHeader>
            <CardContent className="p-0">
            <form ref={formRef} action={formAction} className="space-y-6">
                <div className="space-y-2">
                <Label htmlFor="name">Meno/Firma *</Label>
                <Input id="name" name="name" placeholder="Vaše meno alebo názov firmy" defaultValue={state.fields?.name}/>
                <p className="text-destructive text-sm h-4">{getErrorForField('name')}</p>
                </div>
                <div className="space-y-2">
                <Label htmlFor="phone">Mobil *</Label>
                <Input id="phone" type="tel" name="phone" placeholder="Vaše telefónne číslo" defaultValue={state.fields?.phone} />
                <p className="text-destructive text-sm h-4">{getErrorForField('phone')}</p>
                </div>
                <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" name="email" placeholder="vas@email.com" defaultValue={state.fields?.email}/>
                <p className="text-destructive text-sm h-4">{getErrorForField('email')}</p>
                </div>
                <div className="space-y-2">
                <Label htmlFor="address">Adresa (nepovinné)</Label>
                <Input id="address" name="address" placeholder="Adresa sťahovania alebo upratovania" defaultValue={state.fields?.address} />
                </div>
                <div className="space-y-2">
                <Label htmlFor="message">Vaša Správa *</Label>
                <Textarea id="message" name="message" placeholder="Popíšte nám, s čím vám môžeme pomôcť..." rows={5} defaultValue={state.fields?.message}/>
                    <p className="text-destructive text-sm h-4">{getErrorForField('message')}</p>
                </div>
                <Button type="submit" size="lg" className="w-full py-6">Odoslať správu</Button>
            </form>
            </CardContent>
        </Card>
    );
}
