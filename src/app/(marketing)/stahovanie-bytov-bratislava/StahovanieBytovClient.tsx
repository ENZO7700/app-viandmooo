
'use client'

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Phone, ArrowRight, ShieldCheck, Clock, PackageCheck } from 'lucide-react';
import imageData from '@/lib/placeholder-images.json';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
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

const benefits = [
    { icon: <ShieldCheck className="w-8 h-8 text-primary"/>, title: "Poistenie a Bezpečnosť", description: "Váš majetok je plne poistený počas celého procesu. Používame kvalitné ochranné materiály a bezpečné postupy." },
    { icon: <Clock className="w-8 h-8 text-primary"/>, title: "Rýchlosť a Efektivita", description: "Náš zohratý tím a optimalizované procesy zaručujú, že vaše sťahovanie prebehne v najkratšom možnom čase." },
    { icon: <PackageCheck className="w-8 h-8 text-primary"/>, title: "Kompletný Servis", description: "Postaráme sa o všetko – od demontáže a balenia nábytku až po jeho finálnu montáž vo vašom novom domove." },
];

export default function StahovanieBytovClient({ faqs }: { faqs: { question: string, answer: string }[] }) {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-96 w-full flex items-center justify-center text-center text-white">
        <Image
          src={imageData.stahovanieBytovHero.src}
          alt="Profesionálne sťahovanie bytu v Bratislave tímom VI&MO"
          fill
          priority
          className="object-cover object-center brightness-50"
          data-ai-hint={imageData.stahovanieBytovHero.hint}
        />
        <div className="absolute inset-0 bg-black/60" />
        <motion.div 
            className="relative z-10 p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl font-headline font-extrabold leading-tight text-primary-foreground drop-shadow-lg">
            Sťahovanie Bytov a Domov v Bratislave
          </h1>
          <p className="mt-4 text-lg md:text-2xl max-w-3xl mx-auto drop-shadow-md">
            Bez starostí, bezpečne a efektívne. Nechajte vaše sťahovanie na profesionálov.
          </p>
           <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="px-8 py-6 text-lg rounded-full shadow-lg transition-transform duration-300 hover:scale-105">
                <Link href="/contact">Získať cenovú ponuku</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-black px-8 py-6 text-lg rounded-full shadow-lg transition-transform duration-300 hover:scale-105">
                <a href="tel:+421911275755"><Phone className="w-5 h-5 mr-2" /> Zavolajte teraz</a>
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
        <div className="container max-w-4xl mx-auto grid md:grid-cols-1 gap-12 items-center">
          <div className="text-left">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-6">Kompletné sťahovanie domácností v Bratislave</h2>
            <div className="prose prose-lg max-w-none text-foreground/90 prose-p:leading-relaxed prose-h3:font-headline prose-h3:text-primary">
                <p>Plánujete zmenu bydliska a hľadáte spoľahlivého partnera, ktorý vám pomôže presťahovať váš domov rýchlo a bezpečne? Sťahovanie bytu či rodinného domu v Bratislave a okolí je naša špecializácia. S viac ako 7-ročnými skúsenosťami a stovkami úspešných realizácií vám garantujeme hladký priebeh celého procesu.</p>
                
                <p>Náš tím pristupuje ku každému sťahovaniu individuálne. Chápeme, že nesťahujeme len nábytok, ale celý váš život a spomienky. Preto kladieme maximálny dôraz na opatrnosť, precíznosť a efektívnu organizáciu. Či už ide o sťahovanie malej garsónky, 3-izbového bytu v Petržalke, alebo priestranného rodinného domu v okrajových častiach mesta, sme pripravení poskytnúť vám servis na najvyššej úrovni.</p>

                <h3>Ako vyzerá sťahovanie bytu s VI&MO?</h3>
                <ul className='list-disc pl-6 space-y-2'>
                    <li><strong className='font-semibold'>Bezplatná obhliadka a cenová ponuka:</strong> Po prvotnom kontakte si môžeme dohodnúť bezplatnú obhliadku, na základe ktorej vám vypracujeme presnú a nezáväznú cenovú ponuku.</li>
                    <li><strong className='font-semibold'>Odborná demontáž a montáž nábytku:</strong> Váš nábytok bezpečne rozložíme a na novej adrese opäť zložíme do pôvodného stavu.</li>
                    <li><strong className='font-semibold'>Precízne balenie:</strong> Používame kvalitné baliace materiály – od pevných krabíc až po bublinkové fólie a ochranné deky, aby sme zaistili maximálnu ochranu vášho majetku.</li>
                    <li><strong className='font-semibold'>Bezpečná preprava:</strong> Disponujeme modernými a čistými sťahovacími vozidlami, ktoré sú prispôsobené na bezpečnú prepravu nábytku a osobných vecí.</li>
                </ul>

                <p>Našim cieľom je zbaviť vás stresu spojeného so sťahovaním. Prenechajte všetky starosti na nás a začnite si užívať svoj nový domov od prvej chvíle. Kontaktujte nás a my sa postaráme o všetko ostatné.</p>
            </div>
          </div>
        </div>
      </motion.section>

       {/* Benefits Section */}
        <motion.section 
            id="vyhody"
            className="py-16 md:py-24 bg-background text-foreground"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Prečo sťahovať byt s nami?</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {benefits.map((item, index) => (
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

      {/* FAQ Section */}
      <motion.section 
        className="py-16 md:py-24 bg-background text-foreground"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Často Kladené Otázky</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Odpovede na vaše najčastejšie otázky ohľadom sťahovania bytov.</p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </motion.section>

      {/* CTA Section */}
      <section className="bg-background text-foreground">
        <div className="container py-16 md:py-20 text-center">
             <div className="rounded-2xl bg-card border shadow-xl p-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4 text-primary">
                Pripravení na sťahovanie bez stresu?
              </h2>
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
                Vyžiadajte si nezáväznú cenovú ponuku. Stačí vyplniť náš formulár a my sa vám ozveme s riešením na mieru.
              </p>
              <Link href="/contact" passHref>
                <Button size="lg" variant="default" className="px-8 py-6 text-lg transition-transform duration-300 hover:scale-105 rounded-full shadow-lg">
                  Chcem nezáväznú ponuku <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
        </div>
      </section>
    </div>
  );
}
