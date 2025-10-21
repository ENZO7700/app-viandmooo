
'use client';

import { Mail, MapPin, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ContactForm } from '@/components/contact/ContactForm';

export default function ContactPageClient() {
  return (
    <div className='bg-background text-foreground'>
      <section className="w-full flex items-center justify-center text-center py-16 md:py-24 bg-background text-foreground">
        <div className="relative z-10 p-4">
          <h1 className="text-5xl md:text-7xl font-headline leading-tight text-primary drop-shadow-lg">
            Kontaktujte Nás
          </h1>
          <p className="mt-4 text-lg md:text-2xl max-w-3xl mx-auto text-muted-foreground drop-shadow-md">
            Sme tu pre vás. Napíšte nám a získajte nezáväznú cenovú ponuku na sťahovanie v Bratislave.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background text-foreground">
        <div className="container grid md:grid-cols-2 gap-16 items-start">
          
          {/* Contact Info */}
          <div className="space-y-8">
             <Card className="shadow-lg rounded-xl bg-card border">
                <CardHeader><h2 className="text-2xl font-headline text-primary">Kontaktné údaje</h2></CardHeader>
                <CardContent className="space-y-4 text-lg text-foreground">
                    <div className="flex items-center gap-4">
                        <Phone className="w-6 h-6 text-primary flex-shrink-0" />
                        <div>
                            <a href="tel:+421911275755" className="hover:text-primary transition-colors">+421 911 275 755</a>
                            <span className="text-sm text-muted-foreground block">Sťahovanie</span>
                        </div>
                    </div>
                     <div className="flex items-center gap-4">
                        <Phone className="w-6 h-6 text-primary flex-shrink-0" />
                         <div>
                            <a href="tel:+421918895730" className="hover:text-primary transition-colors">+421 918 895 730</a>
                             <span className="text-sm text-muted-foreground block">Upratovanie</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Mail className="w-6 h-6 text-primary flex-shrink-0" />
                        <a href="mailto:info@viandmo.com" className="hover:text-primary transition-colors">info@viandmo.com</a>
                    </div>
                     <div className="flex items-center gap-4">
                        <MapPin className="w-6 h-6 text-primary flex-shrink-0" />
                        <span>Karpatské námestie 7770/10A<br/>831 06 Bratislava - Rača</span>
                    </div>
                </CardContent>
             </Card>

            {/* Placeholder for Map */}
            <div className="aspect-video w-full bg-muted rounded-xl overflow-hidden relative shadow-lg">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2659.582390956554!2d17.14798331565108!3d48.20458997922961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476c8edb5da8d5a9%3A0x8a914a22b7987daf!2sKarpatsk%C3%A9%20n%C3%A1mestie%2010a%2C%20831%2006%20Bratislava!5e0!3m2!1ssk!2ssk!4v1684321654879!5m2!1ssk!2ssk" 
                    width="100%" 
                    height="100%" 
                    style={{border:0}} 
                    allowFullScreen={true}
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mapa polohy VI&MO - Sťahovanie Bratislava"
                ></iframe>
            </div>
          </div>

          <ContactForm />

        </div>
      </section>
    </div>
  );
}
