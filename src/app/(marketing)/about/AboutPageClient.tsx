
'use client'

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Phone, Mail, Truck, Box, Trash2, Sparkles } from 'lucide-react';
import imageData from '@/lib/placeholder-images.json';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
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

const team = [
    { name: "Miroslav Danihel", role: "Sťahovanie", phone: "+421 911 275 755", img: imageData.teamMember1.src, width: imageData.teamMember1.width, height: imageData.teamMember1.height, hint: imageData.teamMember1.hint },
    { name: "Partner", role: "Upratovanie", phone: "+421 918 895 730", img: imageData.teamMember2.src, width: imageData.teamMember2.width, height: imageData.teamMember2.height, hint: imageData.teamMember2.hint },
];

const services = [
  {
    icon: <Truck className="w-10 h-10 text-primary" />,
    title: "Sťahovanie bytov a domov",
    description: "Kompletné sťahovanie vašej domácnosti. Od demontáže nábytku až po bezpečnú prepravu a vyloženie. Bez stresu a starostí.",
  },
  {
    icon: <Box className="w-10 h-10 text-primary" />,
    title: "Sťahovanie firiem a kancelárií",
    description: "Minimalizujeme dopad na vašu prevádzku. Plánovanie, logistika a realizácia firemného sťahovania na kľúč.",
  },
  {
    icon: <Trash2 className="w-10 h-10 text-primary" />,
    title: "Vypratávanie a odvoz odpadu",
    description: "Vyprázdnime pivnice, byty po rekonštrukcii alebo staré prevádzky. Postaráme sa o ekologickú likvidáciu odpadu.",
  },
  {
    icon: <Sparkles className="w-10 h-10 text-primary" />,
    title: "Upratovacie služby",
    description: "Zabezpečíme profesionálne upratanie po sťahovaní, maľovaní alebo hĺbkové čistenie vašich priestorov.",
  }
];

export default function AboutPageClient() {
    const shouldReduceMotion = useReducedMotion();
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-96 w-full flex items-center justify-center text-center text-white">
        <Image
          src={imageData.aboutHero.src}
          alt="Tím VI&MO v akcii pri sťahovaní v Bratislave"
          fill
          priority
          className="object-cover object-center"
          data-ai-hint={imageData.aboutHero.hint}
        />
        <div className="absolute inset-0 bg-black/60" />
        <motion.div 
            className="relative z-10 p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-headline font-extrabold leading-tight text-primary-foreground drop-shadow-lg">
            Náš Príbeh: Pevné ruky a poctivý prístup
          </h1>
          <p className="mt-4 text-lg md:text-2xl max-w-3xl mx-auto drop-shadow-md">
            Spoznajte ľudí a prístup, ktorý stojí za úspechom VI&MO.
          </p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <motion.section 
        className="py-16 md:py-24 bg-background text-foreground"
        variants={shouldReduceMotion ? undefined : sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">Naša Filozofia</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Sme silná partia v oblasti &quot;moving & logistic&quot; služieb. Jadrom našej identity je viac než <strong className="text-foreground font-semibold">7 rokov skúseností</strong>, počas ktorých sme sa vyprofilovali na expertov v profesionálnom sťahovaní, ekologickej likvidácii odpadu a nadštandardných upratovacích prácach. Či už potrebujete presťahovať malý byt, rozsiahle kancelárie alebo celú firmu, náš prístup zostáva rovnaký – precízny, zodpovedný a s citom pre detail.</p>
              <p>Zakladáme si na tom, že pracujeme <strong className="text-foreground font-semibold">rýchlo, efektívne a s ľudským prístupom</strong>. Pre nás to nie sú len prázdne slová. Znamená to, že rešpektujeme váš čas, majetok a individuálne potreby. Naše slovo platí a ku každej zákazke pristupujeme s maximálnou vážnosťou. Naším pôsobiskom je najmä Bratislava a okolie, kde sme si vybudovali meno založené na <strong className="text-foreground font-semibold">férovom prístupe, transparentných cenách a poctivej práci</strong>, na ktorú sa môžete stopercentne spoľahnúť.</p>
            </div>
          </div>
          <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-xl">
             <Image
                src={imageData.aboutPacking.src}
                alt="Pracovník baliaci krehké predmety do krabice pri sťahovaní v Bratislave"
                fill
                className="object-cover"
                data-ai-hint={imageData.aboutPacking.hint}
             />
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
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
             <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Ponúkame komplexné riešenia pre vaše sťahovanie, vypratávanie a čistotu.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
               <motion.div
                key={index}
                whileHover={shouldReduceMotion ? {} : { y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                  <Card className={`text-left p-6 flex flex-col items-start shadow-lg rounded-xl transition-all duration-300 h-full bg-card border`}>
                     <div className={`p-3 rounded-full mb-4 bg-primary/10`}>
                        {service.icon}
                    </div>
                    <h3 className={`text-xl font-headline font-semibold mb-2 text-foreground`}>{service.title}</h3>
                    <p className={`flex-grow text-muted-foreground`}>{service.description}</p>
                  </Card>
               </motion.div>
            ))}
          </div>
        </div>
      </motion.section>


       {/* Team Section */}
      <motion.section 
        className="py-16 md:py-24 bg-background text-foreground"
        variants={shouldReduceMotion ? undefined : sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Zoznámte sa s naším tímom</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Sme tu pre vás, pripravení zodpovedať vaše otázky a pomôcť vám s vašimi požiadavkami.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member) => (
                <motion.div 
                    key={member.name}
                    className="text-center p-6 border rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card"
                    whileHover={shouldReduceMotion ? {} : { y: -5, scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
                        <Image
                          src={member.img}
                          alt={`Portrét člena tímu VI&MO - ${member.name}, sťahovanie Bratislava`}
                          width={member.width}
                          height={member.height}
                          className="object-cover"
                          data-ai-hint={member.hint}
                        />
                    </div>
                    <h3 className="text-2xl font-semibold font-headline">{member.name}</h3>
                    <p className="text-muted-foreground text-lg">{member.role}</p>
                     <a href={`tel:${member.phone}`} className="flex items-center justify-center gap-2 mt-2 text-muted-foreground hover:text-primary transition-colors">
                        <Phone className="w-4 h-4"/>
                        {member.phone}
                    </a>
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
                Máte otázky alebo si želáte ponuku?
              </h2>
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
                Neváhajte nás kontaktovať. Radi vám poradíme a pripravíme nezáväznú cenovú ponuku na sťahovanie v Bratislave.
              </p>
              <Link href="/contact" passHref>
                <Button size="lg" variant="default" className="px-8 py-6 text-lg transition-transform duration-300 hover:scale-105 rounded-full shadow-lg">
                  Kontaktujte nás
                </Button>
              </Link>
            </div>
        </div>
      </section>
    </div>
  );
}
