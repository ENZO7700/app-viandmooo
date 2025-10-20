
'use client';

import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FormEvent, useRef } from 'react';

// This is a simplified contact form for a static site.
// It does not send data anywhere by default.
// To make it functional, you can integrate a service like Formspree or Netlify Forms.

export function ContactForm() {
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        // This is a placeholder. In a real scenario, you would handle form submission here.
        // For example, using fetch to post to a serverless function or a service like Formspree.
        console.log('Form submitted. Data would be sent here.');

        toast({
            title: "Správa (simulácia)",
            description: "Toto je len ukážka. V reálnej aplikácii by sa správa odoslala.",
            variant: "default",
        });

        formRef.current?.reset();
    };

    return (
        <Card className="p-6 md:p-8 shadow-lg rounded-xl bg-card border text-card-foreground">
            <CardHeader className="p-0 mb-6">
            <h2 className="text-3xl font-headline text-primary">Napíšte Nám</h2>
            <p className="text-muted-foreground">Odpovieme vám čo najskôr.</p>
            </CardHeader>
            <CardContent className="p-0">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                <Label htmlFor="name">Meno/Firma *</Label>
                <Input id="name" name="name" placeholder="Vaše meno alebo názov firmy" required />
                </div>
                <div className="space-y-2">
                <Label htmlFor="phone">Mobil *</Label>
                <Input id="phone" type="tel" name="phone" placeholder="Vaše telefónne číslo" required />
                </div>
                <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" name="email" placeholder="vas@email.com" required/>
                </div>
                <div className="space-y-2">
                <Label htmlFor="address">Adresa (nepovinné)</Label>
                <Input id="address" name="address" placeholder="Adresa sťahovania alebo upratovania" />
                </div>
                <div className="space-y-2">
                <Label htmlFor="message">Vaša Správa *</Label>
                <Textarea id="message" name="message" placeholder="Popíšte nám, s čím vám môžeme pomôcť..." rows={5} required/>
                </div>
                <Button type="submit" size="lg" className="w-full py-6">Odoslať správu</Button>
            </form>
            </CardContent>
        </Card>
    );
}
