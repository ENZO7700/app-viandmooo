'use client'

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Truck, Box, Trash2, Sparkles, Phone, Star, Quote, Award, Clock, ShieldCheck, Handshake, CalendarCheck, Wallet, UserCheck, Check } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import imageData from '@/lib/placeholder-images.json';
import { InteractiveCalculator } from '@/components/pricing/InteractiveCalculator';
import { useRef } from 'react';


// Services Section Component
const services = [
  {
    icon: <Truck className="w-10 h-10 text-primary" />,
    title: "Sťahovanie bytov a rodinných domov",
    description: "Presťahujeme vás bez stresu a zbytočných starostí.",
    featured: true,
  },
  {
    icon: <Box className="w-10 h-10 text-primary" />,
    title: "Sťahovanie firiem, skladov a prevádzok",
    description: "Efektívne plánovanie a spoľahlivá logistika pre minimálny výpadok prevádzky.",
  },
  {
    icon: <Trash2 className="w-10 h-10 text-primary" />,
    title: "Vypratávanie, likvidácia a odvoz odpadu",
    description: "Kompletné vypratávacie služby vrátane ekologickej likvidácie.",
  },
  {
    icon: <Sparkles className="w-10 h-10 text-primary" />,
    title: "Profesionálne upratovacie práce",
    description: "Jednorazové aj pravidelné upratovanie pre čistotu, na ktorú sa môžete spoľahnúť.",
  }
];

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

const HeroSection = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });
  
  const shouldReduceMotion = useReducedMotion();

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  
  const motionProps = shouldReduceMotion ? {} : { style: { y, opacity } };
  
  const logoVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2, ease: "easeOut" } },
  };

  return (
    <section 
      ref={targetRef}
      className="relative h-screen w-full flex items-center justify-center text-center text-primary-foreground bg-[#00202e]"
    >
      <motion.div {...motionProps} className="relative z-10 p-4 flex flex-col items-center -translate-y-[35%]">
         <motion.div 
            className="mb-6"
            variants={shouldReduceMotion ? undefined : logoVariants}
            initial="hidden"
            animate="visible"
          >
           <Image 
             src="https://viandmo.com/wp-content/uploads/viandmo_logo_regular_white.svg" 
             alt="Logo VI&MO - Sťahovanie a upratovanie Bratislava" 
             width={240} 
             height={63} 
             priority 
             className="h-auto"
             data-ai-hint="logo"
           />
         </motion.div>
         <motion.div
            variants={shouldReduceMotion ? undefined : textVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-5xl md:text-7xl font-headline font-extrabold leading-tight text-white text-shadow-lg">
                Pevné ruky & poctivý prístup
            </h1>
            <p className="mt-2 text-lg md:text-xl max-w-3xl mx-auto text-white/90 text-shadow">
              Sťahovanie, odvoz odpadu a upratovanie v Bratislave a okolí
            </p>
         </motion.div>
      </motion.div>
    </section>
  );
};

const ServicesSection = () => {
    const shouldReduceMotion = useReducedMotion();
    
    return (
      <motion.section 
        id="sluzby" 
        className="py-16 md:py-24 bg-background text-foreground"
        variants={shouldReduceMotion ? undefined : sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-2">Naše Služby</h2>
             <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Komplexné riešenia pre vaše sťahovanie a čistotu. Spoľahnite sa na pevné ruky a poctivý prístup.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
               <motion.div
                key={index}
                whileHover={shouldReduceMotion ? {} : { y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                  <Card className={`text-left p-6 flex flex-col items-start shadow-lg rounded-xl transition-all duration-300 h-full bg-card`}>
                     <div className={`p-3 rounded-full mb-4 bg-primary/10`}>
                        {service.icon}
                    </div>
                    <h3 className={`text-xl font-headline font-semibold mb-2 text-foreground`}>{service.title}</h3>
                    <p className={`flex-grow text-muted-foreground`}>{service.description}</p>
                     <Button asChild variant={service.featured ? 'secondary' : 'default'} className="mt-6 w-full rounded-full shadow-lg transition-transform duration-300 hover:scale-105">
                        <Link href="/contact">{service.featured ? 'Cenová ponuka' : 'Viac o službách'}</Link>
                    </Button>
                  </Card>
               </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    );
}

// Why Us Section Component
const whyUsPoints = [
    { icon: <Award className="w-6 h-6 text-primary" />, text: "Viac ako 7 rokov preverených skúseností" },
    { icon: <UserCheck className="w-6 h-6 text-primary" />, text: "Silný a zodpovedný tím profesionálov" },
    { icon: <Wallet className="w-6 h-6 text-primary" />, text: "Férové ceny bez skrytých poplatkov" },
    { icon: <ShieldCheck className="w-6 h-6 text-primary" />, text: "Plné poistenie zodpovednosti za škodu" },
];

const WhyUsSection = () => {
    const shouldReduceMotion = useReducedMotion();
    return (
      <motion.section 
        id="preco-my" 
        className="py-16 md:py-24 bg-muted/30 text-foreground"
        variants={shouldReduceMotion ? undefined : sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container grid md:grid-cols-2 gap-12 items-center">
            <div>
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">Prečo si vybrať VI&MO na sťahovanie v Bratislave?</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>Hľadáte spoľahlivú firmu na sťahovanie v Bratislave, na ktorú sa môžete na 100% spoľahnúť? Sme tu pre vás už <strong className="text-foreground">viac ako 7 rokov</strong>. Počas tejto doby sme úspešne zrealizovali stovky sťahovaní – od malých bytov až po rozsiahle firemné priestory. Naše meno je synonymom pre <strong className="text-foreground">kvalitu, rýchlosť a ľudský prístup</strong>.</p>
                  <p>Vieme, že sťahovanie je viac než len prenos vecí. Je to začiatok novej etapy. Preto ku každej zákazke pristupujeme s maximálnou zodpovednosťou, aby bol váš prechod do nového čo najpríjemnejší. Postaráme sa o všetko – demontáž nábytku, precízne zabalenie, bezpečnú prepravu, a dokonca aj o finálne upratovanie.</p>
                </div>
            </div>
            <div className="space-y-6">
                {whyUsPoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-1 bg-primary/10 p-3 rounded-full">
                           {point.icon}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-foreground">{point.text}</h3>
                            <p className="text-muted-foreground">Naša prax a zohratý tím sú zárukou, že vaše veci sú v najlepších rukách. Procesy máme vyladené do detailov.</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </motion.section>
    );
}

// Guarantees Section
const guarantees = [
    { icon: <Handshake className="w-8 h-8"/>, title: "Férové Ceny", description: "Naša cenová politika je transparentná. Získate detailnú ponuku bez nečakaných poplatkov. To, na čom sa dohodneme, platí." },
    { icon: <Clock className="w-8 h-8"/>, title: "Rýchla Komunikácia", description: "Váš čas je pre nás dôležitý. Na dopyty reagujeme obratom a sme vám k dispozícii počas celého procesu." },
    { icon: <CalendarCheck className="w-8 h-8"/>, title: "Expresný Termín", description: "Potrebujete sa presťahovať urgentne? Po dohode vieme zabezpečiť aj expresné termíny, aby sme vyhoveli vašim potrebám." },
    { icon: <ShieldCheck className="w-8 h-8"/>, title: "Poistenie Zodpovednosti", description: "Váš majetok je u nás v bezpečí. Disponujeme plným poistením zodpovednosti za škodu pre váš úplný pokoj." },
    { icon: <UserCheck className="w-8 h-8"/>, title: "Lokálny Tím", description: "Sme tím z Bratislavy, ktorý dokonale pozná mesto. Vyhneme sa dopravným nástrahám a ušetríme váš čas." },
    { icon: <Award className="w-8 h-8"/>, title: "Servis na Kľúč", description: "Od balenia a demontáže až po finálne upratanie. Ponúkame kompletný servis, aby ste sa nemuseli o nič starať." },
];

const GuaranteesSection = () => {
    const shouldReduceMotion = useReducedMotion();
    return (
        <motion.section 
            id="garancie"
            className="py-16 md:py-24 bg-background text-foreground"
            variants={shouldReduceMotion ? undefined : sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Naše Garancie a Výhody</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-2">Poskytujeme viac než len sťahovanie. Poskytujeme istotu a spoľahlivosť.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {guarantees.map((item, index) => (
                         <motion.div
                            key={index}
                            whileHover={shouldReduceMotion ? {} : { y: -5, scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Card className="text-center p-6 flex flex-col items-center shadow-lg rounded-xl h-full bg-card/50">
                                <div className="p-4 rounded-full mb-4 bg-primary/10 text-primary">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-headline font-semibold mb-2">{item.title}</h3>
                                <p className="flex-grow text-muted-foreground text-sm">{item.description}</p>
                            </Card>
                         </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};


// CTA Section Component
const CtaSection = () => {
    const shouldReduceMotion = useReducedMotion();
    return (
      <section className="bg-primary text-primary-foreground">
        <motion.div 
            className="container py-16 md:py-20 text-center"
            variants={shouldReduceMotion ? undefined : sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">
            Pripravení na zmenu?
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-primary-foreground/80">
            Nechajte starosti so sťahovaním na nás. Vyplňte krátky formulár a my vám obratom pripravíme cenovú ponuku šitú na mieru. Rýchlo, férovo a bez záväzkov.
          </p>
          <motion.div whileHover={shouldReduceMotion ? {} : { scale: 1.05 }} transition={{ duration: 0.3 }}>
              <Link href="/contact" passHref>
                <Button size="lg" variant="secondary" className="px-8 py-6 text-lg rounded-full shadow-lg">
                  Chcem nezáväznú ponuku
                </Button>
              </Link>
          </motion.div>
        </motion.div>
      </section>
    );
}

const PricingSection = () => {
    const shouldReduceMotion = useReducedMotion();
    return (
        <motion.section
            id="cennik"
            className="py-16 md:py-24 bg-muted/40 text-foreground"
            variants={shouldReduceMotion ? undefined : sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="container">
                <div className="text-center mb-12 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Interaktívna cenová ponuka</h2>
                    <p className="text-muted-foreground mt-3 text-lg">
                        Vyskúšajte našu kalkulačku a získajte okamžitý odhad ceny vášho sťahovania. Pre presnú ponuku šitú na mieru nás neváhajte kontaktovať.
                    </p>
                </div>
                <InteractiveCalculator />
            </div>
        </motion.section>
    );
};


export default function HomePage() {
  return (
    <>
      <HeroSection />
      <>
        <ServicesSection />
        <WhyUsSection />
        <GuaranteesSection />
        <PricingSection />
        <CtaSection />
      </>
    </>
  );
}
