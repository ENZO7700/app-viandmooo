
'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Úvod" },
  { href: "/#sluzby", label: "Služby" },
  { href: "/#cennik", label: "Cenník" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "O nás" },
  { href: "/contact", label: "Kontakt" },
];

const SocialIcon = ({ href, children, ariaLabel }: { href: string, children: React.ReactNode, ariaLabel: string }) => (
    <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-white/70 hover:text-gray-300 transition-colors duration-200"
        aria-label={ariaLabel}
    >
        {children}
    </a>
)


export default function Header() {
  const pathname = usePathname();
  
  const NavLink = ({ href, label }: { href: string, label:string }) => (
    <Button asChild variant="link" className={cn(
      "text-sm font-semibold uppercase tracking-wider",
       (pathname === href || (href === '/blog' && pathname.startsWith('/blog'))) ? "text-primary" : "text-white hover:text-gray-300",
      "transition-colors duration-200"
    )}>
      <Link href={href}>{label}</Link>
    </Button>
  );
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#00202e]/80 backdrop-blur-md">
      <div className="container flex h-20 items-center">
        <Link href="/" className="relative flex items-center">
          <Image 
            src="https://viandmo.com/wp-content/uploads/viandmo_logo_regular_white.svg" 
            alt="VI&MO Logo" 
            width={96}
            height={25}
            priority
            fetchpriority="high"
            className="h-10 w-auto"
            data-ai-hint="logo"
          />
        </Link>
        <nav className="hidden md:flex flex-grow justify-end items-center gap-4">
          {navLinks.map(link => <NavLink key={link.href} {...link} />)}
           <div className="flex items-center gap-3 ml-4">
               <SocialIcon href="https://www.facebook.com/p/VI-MO-stahovanie-upratovanie-100063524682338/" ariaLabel="Facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3.5 8.2h-2.1c-.5 0-.8.2-.8.8v1.4h2.9l-.4 2.8h-2.5v7.2h-3V13.2H7.7v-2.8h2.2V9c0-1.6.8-2.8 2.6-2.8H15.5v2z"></path></svg>
               </SocialIcon>
               <SocialIcon href="https://wa.me/421911275755" ariaLabel="WhatsApp">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 0C5.43 0 0.05 5.38 0.05 11.99c0 2.1.56 4.06 1.57 5.8l-1.62 5.92 6.07-1.59c1.69.95 3.63 1.48 5.66 1.48h.01c6.61 0 11.99-5.38 11.99-11.99S18.65 0 12.04 0zm5.17 17.5c-.26.47-.92.83-1.28.87-.36.04-1.04.04-1.5-.18-.46-.22-1.32-.6-2.51-1.15-1.19-.55-2.2-1.42-2.92-2.5-0.72-1.08-1.15-2.3-1.09-3.48.06-1.18.61-2.22 1.34-2.95.73-.73 1.63-1.16 2.58-1.16.95 0 1.77.29 2.45.92.68.63 1.02 1.52 1.02 2.47s-.34 1.84-.92 2.47c-.58.63-1.47 1.07-2.42 1.07-.95 0-1.76-.29-2.45-.92-.26-.24-.48-.52-.66-.82-.18-.3-.32-.61-.41-.93-.1-.31-.14-.63-.14-.94 0-.58.12-1.1.35-1.56.23-.46.57-.8.98-1.03.41-.23.86-.35 1.32-.35.59 0 1.15.15 1.66.44.51.29.93.69 1.24 1.18.31.49.47.98.47 1.48 0 .5-.15 1.01-.46 1.52-.31.51-.73.9-1.25 1.18-.52.28-1.08.43-1.68.43-.59 0-1.15-.15-1.66-.44-.51-.29-.93-.69-1.24-1.18l-.06-.09c-.21-.32-.38-.66-.51-1.01-.13-.35-.2-.71-.2-1.08 0-.59.13-1.12.38-1.58.25-.46.6-.82 1.02-1.08.42-.26.9-.4 1.4-.4.65 0 1.26.17 1.8.5.54.33.99.76 1.33 1.29.34.53.51 1.1.51 1.71 0 .6-.17 1.2-.52 1.73-.35.53-.79.95-1.32 1.26-.53.31-1.1.47-1.7.47-.65 0-1.26-.17-1.8-.5-.54-.33-.99-.76-1.33-1.29l-.04-.06c-1.2 1.4-1.08 2.89.13 4.43.34.42.75.76 1.2.98.45.22.9.33 1.36.33.56 0 1.28-.15 1.9-.84.62-.69.93-1.5.93-2.41 0-.96-.34-1.85-1.02-2.48s-1.5-1.04-2.45-1.2l-.1-.01c-1.1-.19-2.16.2-2.9 1.02-.74.82-1.13 1.85-1.07 3.03.06 1.18.49 2.3 1.21 3.38.72 1.08 1.73 1.95 2.92 2.5 1.19.55 2.05.88 2.51 1.15.46.27 1.14.27 1.5.18.36-.09 1.02-.45 1.28-.92l.02-.03z"></path></svg>
               </SocialIcon>
           </div>
        </nav>
        
        <div className="md:hidden ml-auto">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-white/10 text-white">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-[#00202e] p-6 border-r-0">
               <SheetTitle className="sr-only">Hlavné menu</SheetTitle>
               <div className="mb-8">
                 <Link href="/" className="relative flex items-center">
                    <Image 
                        src="https://viandmo.com/wp-content/uploads/viandmo_logo_regular_white.svg" 
                        alt="VI&MO Logo" 
                        width={96}
                        height={25}
                        priority
                        className="h-10 w-auto"
                        data-ai-hint="logo"
                    />
                </Link>
               </div>
              <nav className="flex flex-col items-start gap-4">
                {navLinks.map(link => (
                    <Button asChild variant="link" className={cn(
                      "text-lg font-semibold",
                      (pathname === link.href || (link.href === '/blog' && pathname.startsWith('/blog'))) ? "text-primary" : "text-white hover:text-gray-300",
                    )} key={link.href}>
                        <Link href={link.href}>{link.label}</Link>
                    </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
