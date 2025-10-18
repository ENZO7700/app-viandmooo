
'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Logo from '@/components/layout/Logo';
import { login, loginWithGoogle } from './actions';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, ChromeIcon } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';
import { motion } from 'framer-motion';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" type="submit" disabled={pending}>
      {pending ? 'Prihlasujem...' : 'Prihlásiť sa'}
    </Button>
  );
}

function GoogleSignInButton() {
    const { pending } = useFormStatus();
    return (
        <Button variant="outline" className="w-full" type="submit" disabled={pending}>
            <ChromeIcon className="mr-2 h-4 w-4" />
            {pending ? 'Presmerovávam...' : 'Prihlásiť sa cez Google'}
        </Button>
    )
}

export default function LoginPage() {
  const [state, formAction] = useActionState(login, undefined);

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen bg-background">
      <div className="hidden bg-muted lg:block relative">
        <Image
          src="https://viandmo.com/wp-content/uploads/stahovanie-nabytku-viandmo-scaled.jpg"
          alt="Sťahovanie nábytku VI&MO"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
        />
         <div className="absolute inset-0 flex flex-col justify-end p-12 text-white bg-gradient-to-t from-black/50 to-transparent">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                <h2 className="text-4xl font-bold">Spoľahlivosť a efektivita v každom detaile.</h2>
                <p className="mt-4 text-lg text-white/80">Spravujte zákazky, sledujte štatistiky a komunikujte s klientmi na jednom mieste.</p>
            </motion.div>
        </div>
      </div>
      <div className="flex items-center justify-center py-12">
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto grid w-[350px] gap-6"
        >
          <div className="grid gap-2 text-center">
            <div className="flex justify-center mb-4">
              <Logo />
            </div>
            <h1 className="text-3xl font-bold">Administrácia</h1>
            <p className="text-balance text-muted-foreground">
              Zadajte svoje prihlasovacie údaje
            </p>
          </div>
           {state?.error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}
          <form action={formAction} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@admin.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Heslo</Label>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
             <div className="flex items-center space-x-2">
              <Checkbox id="remember" name="remember" />
              <Label htmlFor="remember" className="text-sm font-normal">Zapamätať si ma</Label>
            </div>
            <SubmitButton />
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Alebo</span>
            </div>
           </div>
           <form action={loginWithGoogle}>
              <GoogleSignInButton />
           </form>
        </motion.div>
      </div>
    </div>
  );
}
