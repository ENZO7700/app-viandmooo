
'use client'

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Phone, ArrowRight, ShieldCheck, Settings, Users } from 'lucide-react';
import imageData from '@/lib/placeholder-images.json';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

const pricingTiers = [
    { name: "Pianíno / Menší klavír", price: "od 150 €", description: "Preprava štandardných pianín a menších krídel." },
    { name: "Koncertné krídlo / Trezor", price: "od 250 €", description: "Sťahovanie veľkých nástrojov a bremien nad 200 kg." },
    { name: "Poschodie bez výťahu", price: "+ 15 € / poschodie", description: "Príplatok za každé poschodie pri nosení v rukách." },
]

export default function StahovanieKlavirovClient() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full flex items-center justify-center text-center text-white">
        <Image
          src={imageData.stahovanieKlavirovHero.src}
          alt="Sťahovanie klavíra v Bratislave tímom VI&MO"
          fill
          priority
          className="object-cover object-center brightness-50"
          data-ai-hint={imageData.stahovanieKlavirovHero.hint}
        />
        <div className="absolute inset-0 bg-black/60" />
        <motion.div 
            className="relative z-10 p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl font-headline font-extrabold leading-tight text-primary-foreground drop-shadow-lg">
            Sťahovanie klavírov a ťažkých bremien
          </h1>
          <p className="mt-4 text-lg md:text-2xl max-w-3xl mx-auto drop-shadow-md">
            Odborná preprava klavírov, trezorov a iných cenných predmetov v Bratislave.
          </p>
           <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="px-8 py-6 text-lg rounded-full shadow-lg transition-transform duration-300 hover:scale-105">
                <Link href="/contact">Získať presnú cenu</Link>
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
        <div className="container max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-6">Technika a skúsenosti pre najvyššiu bezpečnosť</h2>
            <div className="prose prose-lg max-w-none text-foreground/90 prose-p:leading-relaxed prose-h3:font-headline prose-h3:text-primary">
                <p>Sťahovanie klavíra, pianína alebo ťažkého trezoru je úloha, ktorá si vyžaduje viac než len silu. Vyžaduje si precíznu techniku, špeciálne vybavenie a tím skúsených profesionálov, ktorí rozumejú hodnote a krehkosti predmetu. V VI&MO máme dlhoročné skúsenosti s prepravou ťažkých a nadrozmerných bremien a garantujeme ich maximálnu bezpečnosť počas celého procesu.</p>
                
                <p>Každé sťahovanie klavíra či trezoru začíname dôkladnou obhliadkou a plánovaním trasy. Používame špeciálne sťahovacie popruhy, vozíky a ochranné materiály, aby sme predišli akémukoľvek poškodeniu – či už samotného bremena, alebo vašich priestorov. Náš tím je vyškolený na manipuláciu v úzkych priestoroch, na schodiskách a v ďalších náročných podmienkach.</p>
            </div>
          </div>
          <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1 bg-primary/10 p-3 rounded-full">
                       <ShieldCheck className="w-8 h-8 text-primary"/>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-foreground">Plné poistenie</h3>
                        <p className="text-muted-foreground">Všetky nami sťahované bremená sú plne poistené proti poškodeniu, čo vám dáva stopercentnú istotu.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1 bg-primary/10 p-3 rounded-full">
                       <Settings className="w-8 h-8 text-primary"/>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-foreground">Špeciálna technika</h3>
                        <p className="text-muted-foreground">Používame osvedčené sťahovacie techniky, gurtne a vozíky navrhnuté špeciálne na prepravu ťažkých predmetov.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1 bg-primary/10 p-3 rounded-full">
                       <Users className="w-8 h-8 text-primary"/>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-foreground">Skúsený tím</h3>
                        <p className="text-muted-foreground">Náš tím má za sebou stovky úspešných sťahovaní klavírov, trezorov a priemyselných strojov.</p>
                    </div>
                </div>
          </div>
        </div>
      </motion.section>

      {/* Pricing Snippet Section */}
      <motion.section 
        className="py-16 md:py-24 bg-background text-foreground"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Orientačný cenník</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Cena sa odvíja od váhy, rozmerov a náročnosti terénu. Pre presnú ponuku nás kontaktujte.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier) => (
                <Card key={tier.name} className="text-center p-6 flex flex-col items-center shadow-lg rounded-xl bg-card border">
                     <CardHeader>
                        <CardTitle className="font-headline text-xl text-foreground">{tier.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-4xl font-bold text-primary mb-2">{tier.price}</p>
                        <p className="text-muted-foreground text-sm">{tier.description}</p>
                    </CardContent>
                </Card>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <section className="bg-background text-foreground">
        <div className="container py-16 md:py-20 text-center">
             <div className="rounded-2xl bg-card border shadow-xl p-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4 text-primary">
                Potrebujete presunúť niečo ťažké?
              </h2>
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
                Zverte svoj cenný majetok do rúk profesionálov. Kontaktujte nás pre individuálnu konzultáciu a cenovú ponuku na mieru.
              </p>
              <Link href="/contact" passHref>
                <Button size="lg" variant="default" className="px-8 py-6 text-lg transition-transform duration-300 hover:scale-105 rounded-full shadow-lg">
                  Vyžiadať si ponuku <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
        </div>
      </section>
    </div>
  );
}
