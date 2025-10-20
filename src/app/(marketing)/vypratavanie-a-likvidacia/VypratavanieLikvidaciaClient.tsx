
'use client'

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Phone, ArrowRight, Recycle, Trash2, Building } from 'lucide-react';
import imageData from '@/lib/placeholder-images.json';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
};

const services = [
    { icon: <Trash2 className="w-8 h-8 text-primary"/>, title: "Vypratávanie Bytov a Domov", description: "Kompletné vypratanie bytov pred predajom, po rekonštrukcii alebo pri generačnej výmene. Od nábytku po osobné veci." },
    { icon: <Building className="w-8 h-8 text-primary"/>, title: "Vypratávanie Firieb a Kancelárií", description: "Diskrétne a rýchle vypratanie kancelárskych priestorov, skladov a obchodných prevádzok vrátane likvidácie elektroniky." },
    { icon: <Recycle className="w-8 h-8 text-primary"/>, title: "Odvoz a Likvidácia Odpadu", description: "Zabezpečíme odvoz a ekologickú likvidáciu všetkých druhov odpadu - od starého nábytku až po stavebnú suť." },
];

export default function VypratavanieLikvidaciaClient() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full flex items-center justify-center text-center text-white">
        <Image
          src={imageData.vypratavanieHero.src}
          alt="Vypratávanie priestorov a odvoz odpadu v Bratislave"
          fill
          priority
          className="object-cover object-center brightness-50"
          data-ai-hint={imageData.vypratavanieHero.hint}
        />
        <div className="absolute inset-0 bg-black/60" />
        <motion.div 
            className="relative z-10 p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl font-headline font-extrabold leading-tight text-primary-foreground drop-shadow-lg">
            Vypratávanie a Likvidácia Odpadu
          </h1>
          <p className="mt-4 text-lg md:text-2xl max-w-3xl mx-auto drop-shadow-md">
            Urobíme poriadok za vás. Rýchlo, profesionálne a s ohľadom na životné prostredie.
          </p>
           <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="px-8 py-6 text-lg rounded-full shadow-lg transition-transform duration-300 hover:scale-105">
                <Link href="/contact">Objednať vypratávanie</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-black px-8 py-6 text-lg rounded-full shadow-lg transition-transform duration-300 hover:scale-105">
                <a href="tel:+421911275755"><Phone className="w-5 h-5 mr-2" /> Zavolajte nám</a>
              </Button>
            </div>
        </motion.div>
      </section>

      {/* Main Content Section */}
      <motion.section 
        className="py-16 md:py-24 bg-background text-foreground"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-2">Komplexné vypratávacie služby v Bratislave</h2>
             <p className="text-muted-foreground text-lg max-w-3xl mx-auto">Potrebujete uvoľniť priestor, zbaviť sa starého nábytku alebo vyčistiť nehnuteľnosť po nájomníkoch? Ponúkame profesionálne a komplexné vypratávacie služby pre domácnosti aj firmy v Bratislave a okolí.</p>
          </div>
            <div className="prose prose-lg max-w-none text-foreground/90 prose-p:leading-relaxed prose-h3:font-headline prose-h3:text-primary mx-auto">
                <p>Náš tím sa postará o kompletný proces – od triedenia vecí, cez demontáž nábytku, až po finálny odvoz a ekologickú likvidáciu odpadu na zbernom dvore. Šetríme váš čas, energiu a nervy. Sme pripravení vypratať byty, domy, pivnice, garáže, kancelárie, sklady aj celé pozostalosti. Ku každej zákazke pristupujeme diskrétne a s maximálnou efektivitou.</p>
            </div>
        </div>
      </motion.section>

      {/* Services Section */}
        <motion.section 
            id="sluzby-vypratavania"
            className="py-16 md:py-24 bg-background text-foreground"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">S čím vám pomôžeme?</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {services.map((item, index) => (
                         <motion.div
                            key={index}
                            whileHover={{ y: -5, scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Card className="text-center p-6 flex flex-col items-center shadow-lg rounded-xl h-full bg-card border">
                                <div className="p-4 rounded-full mb-4 bg-primary/10">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-headline font-semibold mb-2 text-foreground">{item.title}</h3>
                                <p className="flex-grow text-muted-foreground text-sm">{item.description}</p>
                            </Card>
                         </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>

      {/* CTA Section */}
      <section className="bg-background text-foreground">
        <div className="container py-16 md:py-20 text-center">
             <div className="rounded-2xl bg-card border shadow-xl p-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4 text-primary">
                Potrebujete urobiť poriadok?
              </h2>
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
                Kontaktujte nás a my vám pripravíme nezáväznú cenovú ponuku. Zabezpečíme rýchle a profesionálne vypratanie vašich priestorov.
              </p>
              <Link href="/contact" passHref>
                <Button size="lg" variant="default" className="px-8 py-6 text-lg transition-transform duration-300 hover:scale-105 rounded-full shadow-lg">
                  Chcem cenovú ponuku <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
        </div>
      </section>
    </div>
  );
}
