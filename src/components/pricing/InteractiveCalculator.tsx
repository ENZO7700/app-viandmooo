
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence, useMotionValue, useSpring, animate, useTransform } from 'framer-motion';
import { Calculator, ArrowRight, Building, Users, Home, HardHat, Car, MapPin, Package } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const bratislavaDistricts = [
  'Staré Mesto', 'Ružinov', 'Vrakuňa', 'Podunajské Biskupice', 'Nové Mesto', 
  'Rača', 'Vajnory', 'Karlova Ves', 'Dúbravka', 'Lamač', 'Devín', 
  'Devínska Nová Ves', 'Záhorská Bystrica', 'Petržalka', 'Jarovce', 'Rusovce', 'Čunovo'
];

const propertyTypes = {
  'Garsónka': { basePrice: 65, estimatedHours: 2, icon: <Home className="w-5 h-5"/> },
  '1-izbový byt': { basePrice: 70, estimatedHours: 2.5, icon: <Home className="w-5 h-5"/> },
  '2-izbový byt': { basePrice: 140, estimatedHours: 4, icon: <Home className="w-5 h-5"/> },
  '3-izbový byt': { basePrice: 240, estimatedHours: 6, icon: <Building className="w-5 h-5"/> },
  '4-izbový byt': { basePrice: 350, estimatedHours: 8, icon: <Building className="w-5 h-5"/> },
  'Rodinný dom': { basePrice: 450, estimatedHours: 10, icon: <Building className="w-5 h-5"/> },
};

const workerRates: { [key: number]: number } = { 1: 40, 2: 50, 3: 65, 4: 80, 5: 95 };

const MIN_CHARGE = 70;
const FLOOR_CHARGE = 8;
const ASSEMBLY_HOURS = 1.5;
const TRANSPORT_FLAT_RATE = 30;
const KM_RATE = 0.8;

type PropertyType = keyof typeof propertyTypes;

function AnimatedPrice({ value }: { value: number }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const previousValue = parseInt(node.textContent?.replace(/\s|€/g, '') || '0', 10);
    const controls = animate(previousValue, value, {
      duration: 1.2,
      ease: "circOut",
      onUpdate(latest) {
        node.textContent = `${Math.round(latest).toLocaleString('sk-SK')} €`;
      },
    });

    return () => controls.stop();
  }, [value]);

  return <p ref={ref} className="text-5xl font-bold tracking-tighter text-primary" />;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};


export function InteractiveCalculator() {
  const [fromDistrict, setFromDistrict] = useState(bratislavaDistricts[0]);
  const [toDistrict, setToDistrict] = useState(bratislavaDistricts[0]);
  const [propertyType, setPropertyType] = useState<PropertyType>('2-izbový byt');
  const [fromFloor, setFromFloor] = useState([2]);
  const [toFloor, setToFloor] = useState([2]);
  const [fromElevator, setFromElevator] = useState(true);
  const [toElevator, setToElevator] = useState(true);
  const [workers, setWorkers] = useState([2]);
  const [assembly, setAssembly] = useState(false);
  const [distance, setDistance] = useState(0);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let price = 0;
    const selectedProperty = propertyTypes[propertyType];

    let basePrice = selectedProperty.basePrice;

    let hours = selectedProperty.estimatedHours;
    if (assembly) hours += ASSEMBLY_HOURS;
    const workerRate = workerRates[workers[0]] || 50;
    const workCost = hours * workerRate;

    let floorCost = 0;
    if (!fromElevator) floorCost += fromFloor[0] * FLOOR_CHARGE;
    if (!toElevator) floorCost += toFloor[0] * FLOOR_CHARGE;
    
    let transportCost = TRANSPORT_FLAT_RATE;
    if (fromDistrict === 'Mimo Bratislavy' || toDistrict === 'Mimo Bratislavy') {
      transportCost = distance * KM_RATE;
    }
    
    price = basePrice + workCost + floorCost + transportCost;

    if (price < MIN_CHARGE) price = MIN_CHARGE;

    setTotalPrice(price);

  }, [fromDistrict, toDistrict, propertyType, fromFloor, toFloor, fromElevator, toElevator, workers, assembly, distance]);

  const isOutOfBratislava = fromDistrict === 'Mimo Bratislavy' || toDistrict === 'Mimo Bratislavy';

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
    >
      <motion.div
        variants={itemVariants}
        className="lg:col-span-2 bg-card rounded-2xl shadow-xl border"
      >
        <Card className="bg-transparent border-0 text-card-foreground">
            <CardHeader className="p-8">
            <CardTitle className="font-headline text-3xl text-foreground">Parametre vášho sťahovania</CardTitle>
            <CardDescription className="text-muted-foreground text-base">Zadajte detaily a získajte okamžitý odhad.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 px-8 pb-8">
                
                <motion.div variants={itemVariants} className="space-y-4 p-6 rounded-xl bg-muted/50 border">
                    <Label className="font-semibold text-lg flex items-center gap-2"><MapPin className="w-5 h-5 text-primary"/>Trasa sťahovania</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                        <div className="space-y-2">
                            <Label htmlFor="from-district">Odkiaľ?</Label>
                            <Select value={fromDistrict} onValueChange={setFromDistrict}>
                                <SelectTrigger id="from-district" className="transition-all duration-300"><SelectValue/></SelectTrigger>
                                <SelectContent>
                                    {[...bratislavaDistricts, 'Mimo Bratislavy'].map(d => <SelectItem key={`from-${d}`} value={d}>{d}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="to-district">Kam?</Label>
                            <Select value={toDistrict} onValueChange={setToDistrict}>
                                <SelectTrigger id="to-district" className="transition-all duration-300"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {[...bratislavaDistricts, 'Mimo Bratislavy'].map(d => <SelectItem key={`to-${d}`} value={d}>{d}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                     <AnimatePresence>
                        {isOutOfBratislava && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                animate={{ opacity: 1, height: 'auto', marginTop: '1rem' }}
                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                className="space-y-2 overflow-hidden"
                            >
                                <Label htmlFor="distance" className="flex items-center gap-2 font-semibold"><Car className="w-5 h-5 text-primary"/> Vzdialenosť mimo Bratislavy (jedna cesta, v km)</Label>
                                <Input id="distance" type="number" value={distance} onChange={(e) => setDistance(Math.max(0, Number(e.target.value)))} placeholder="Zadajte počet kilometrov"/>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-4 p-6 rounded-xl bg-muted/50 border">
                    <Label className="font-semibold text-lg flex items-center gap-2"><Package className="w-5 h-5 text-primary"/>Detaily nehnuteľnosti</Label>
                    <div className="space-y-2">
                        <Label htmlFor="property-type">Typ nehnuteľnosti</Label>
                        <Select value={propertyType} onValueChange={(val) => setPropertyType(val as PropertyType)}>
                            <SelectTrigger id="property-type" className="transition-all duration-300"><SelectValue/></SelectTrigger>
                            <SelectContent>
                                {Object.entries(propertyTypes).map(([p, data]) => <SelectItem key={p} value={p}><span className="flex items-center gap-2">{data.icon} {p}</span></SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <div className="space-y-4 p-4 border rounded-lg bg-background">
                            <Label className="font-medium">Adresa nakládky</Label>
                            <div className="space-y-2">
                                <Label htmlFor="from-floor" className="text-sm font-normal flex justify-between">Poschodie: <span className="font-bold text-primary text-lg">{fromFloor[0]}</span></Label>
                                <Slider id="from-floor" value={fromFloor} onValueChange={setFromFloor} max={15} step={1} />
                            </div>
                            <div className="flex items-center space-x-2 pt-2">
                                <Switch id="from-elevator" checked={fromElevator} onCheckedChange={setFromElevator} />
                                <Label htmlFor="from-elevator" className="text-sm font-normal">K dispozícii je výťah</Label>
                            </div>
                        </div>
                        <div className="space-y-4 p-4 border rounded-lg bg-background">
                            <Label className="font-medium">Adresa vykládky</Label>
                            <div className="space-y-2">
                                <Label htmlFor="to-floor" className="text-sm font-normal flex justify-between">Poschodie: <span className="font-bold text-primary text-lg">{toFloor[0]}</span></Label>
                                <Slider id="to-floor" value={toFloor} onValueChange={setToFloor} max={15} step={1} />
                            </div>
                            <div className="flex items-center space-x-2 pt-2">
                                <Switch id="to-elevator" checked={toElevator} onCheckedChange={setToElevator} />
                                <Label htmlFor="to-elevator" className="text-sm font-normal">K dispozícii je výťah</Label>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-4 p-6 rounded-xl bg-muted/50 border">
                    <Label className="font-semibold text-lg">Pracovníci a doplnkové služby</Label>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="workers" className="flex items-center gap-2"><Users className="w-5 h-5 text-primary"/> Počet pracovníkov</Label>
                            <span className="font-bold text-primary text-lg">{workers[0]}</span>
                        </div>
                        <Slider id="workers" value={workers} onValueChange={setWorkers} min={1} max={5} step={1} />
                    </div>
                    <div className="flex items-center space-x-3 pt-4">
                        <Switch id="assembly" checked={assembly} onCheckedChange={setAssembly} />
                        <Label htmlFor="assembly" className="flex items-center gap-2 font-normal"><HardHat className="w-5 h-5 text-primary"/> Požadujem demontáž a montáž nábytku</Label>
                    </div>
                </motion.div>
            </CardContent>
        </Card>
      </motion.div>

      <motion.div
           variants={itemVariants}
           className="lg:col-span-1 sticky top-24"
        >
        <div
           className="rounded-2xl bg-card border shadow-xl"
        >
        <Card className="bg-transparent border-0 relative overflow-hidden">
         <div className="absolute inset-0 bg-black/10"></div>
          <CardHeader className="text-center items-center p-8 relative z-10">
            <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-2">
                <Calculator className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl text-foreground text-shadow-lg">Odhadovaná cena</CardTitle>
          </CardHeader>
          <CardContent className="text-center relative z-10">
             <AnimatedPrice value={totalPrice} />
             <p className="text-muted-foreground text-sm mt-2">vrátane DPH</p>
          </CardContent>
          <CardFooter className="flex-col gap-4 px-8 pb-8 relative z-10">
             <Button asChild size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full transition-transform duration-300 hover:scale-105 shadow-lg">
                <Link href="/contact">Chcem presnú ponuku</Link>
             </Button>
             <p className="text-xs text-muted-foreground text-center pt-2">Toto je len orientačná cena. Pre finálnu cenovú ponuku nás, prosím, kontaktujte.</p>
          </CardFooter>
        </Card>
        </div>
      </motion.div>
    </motion.div>
  );
}
