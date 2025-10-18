
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
import { AlertCircle } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import imageData from '@/lib/placeholder-images.json';


function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" type="submit" disabled={pending}>
      {pending ? 'Prihlasujem...' : 'Prihlásiť sa'}
    </Button>
  );
}

// Simple component for Google's icon
function GoogleIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
        </svg>
    )
}


function GoogleSignInButton() {
    const { pending } = useFormStatus();
    return (
        <Button variant="outline" className="w-full gap-2" type="submit" disabled={pending}>
            <GoogleIcon />
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
          src={imageData.loginBackground.src}
          alt="Sťahovanie nábytku VI&MO"
          fill
          fetchPriority="high"
          className="object-cover opacity-20"
          data-ai-hint={imageData.loginBackground.hint}
          width={imageData.loginBackground.width}
          height={imageData.loginBackground.height}
        />
         <div className="absolute inset-0 flex flex-col justify-end p-12 text-white bg-gradient-to-t from-black/60 to-transparent">
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
            <Link href="/" className="flex justify-center mb-4">
              <Logo />
            </Link>
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
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Zapamätať si ma
              </label>
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
