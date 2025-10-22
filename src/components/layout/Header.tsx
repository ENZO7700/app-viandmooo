
'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import React from "react";
import { Truck, Box, Trash2 } from "lucide-react";


const services: { title: string; href: string; description: string, icon: React.ReactNode }[] = [
  {
    title: "Sťahovanie Bytov a Domov",
    href: "/stahovanie-bytov-bratislava",
    description: "Komplexné sťahovanie domácností v rámci Bratislavy a okolia. Rýchlo a bezpečne.",
    icon: <Truck className="h-5 w-5 text-primary" />
  },
  {
    title: "Sťahovanie Klavírov a Bremien",
    href: "/stahovanie-klavirov",
    description: "Profesionálna preprava ťažkých a citlivých predmetov ako sú klavíry, pianína a trezory.",
    icon: <Box className="h-5 w-5 text-primary" />
  },
  {
    title: "Vypratávanie a Likvidácia",
    href: "/vypratavanie-a-likvidacia",
    description: "Vypratanie bytov, pivníc a kancelárií s ekologickou likvidáciou odpadu.",
    icon: <Trash2 className="h-5 w-5 text-primary" />
  },
]

const navLinks = [
  { href: "/", label: "Úvod" },
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
        className="text-white/70 hover:text-white transition-colors duration-300"
        aria-label={ariaLabel}
    >
        {children}
    </a>
);


export default function Header() {
  const pathname = usePathname();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#00202e]/80 backdrop-blur-md">
      <div className="container flex h-20 items-center">
        <Link href="/" aria-label="Domovská stránka VI&MO">
          <Logo />
        </Link>
        
        <NavigationMenu className="hidden md:flex flex-grow justify-end items-center gap-1">
           <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), pathname === '/' ? 'text-primary' : 'text-white', 'bg-transparent')}>
                  Úvod
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className={cn(pathname.startsWith('/stahovanie') ? 'text-primary' : 'text-white', 'bg-transparent text-sm font-semibold uppercase tracking-wider')}>Služby</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {services.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                      icon={component.icon}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            {navLinks.filter(l => l.href !== '/').map(link => (
              <NavigationMenuItem key={link.href}>
                <Link href={link.href} legacyBehavior passHref>
                   <NavigationMenuLink className={cn(
                    navigationMenuTriggerStyle(),
                    (pathname === link.href || (link.href === '/blog' && pathname.startsWith('/blog'))) ? "text-primary" : "text-white",
                    'bg-transparent text-sm font-semibold uppercase tracking-wider'
                  )}>
                    {link.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}

           </NavigationMenuList>

           <div className="flex items-center gap-4 ml-4">
               <SocialIcon href="https://www.facebook.com/p/VI-MO-stahovanie-upratovanie-100063524682338/" ariaLabel="Facebook">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32V7.46H6.11v4.24h3.39v10.4h4.24V11.7h3.34l.57-4.24z"></path></svg>
               </SocialIcon>
               <SocialIcon href="https://www.instagram.com/viamoservice/" ariaLabel="Instagram">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.936 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.314.936 20.646.525 19.86.22c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.06 1.17-.249 1.805-.413 2.227-.217.562-.477.96-.896 1.381-.42.419-.819-.679-1.38.896-.423.164-1.057.36-2.227.413-1.266.057-1.646.07-4.85.07s-3.585-.015-4.85-.07c-1.17-.06-1.805-.249-2.227-.413-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.164-.422-.36-1.057-.413-2.227-.057-1.266-.07-1.646-.07-4.85s.015-3.585.07-4.85c.06-1.17.249-1.805.413-2.227.217-.562.477.96.896-1.381.42-.419.819-.679 1.38-.896.423-.164 1.057.36 2.227-.413C8.415 2.176 8.797 2.16 12 2.16zm0 5.48c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7.16c-1.468 0-2.66-1.192-2.66-2.66s1.192-2.66 2.66-2.66 2.66 1.192 2.66 2.66-1.192 2.66-2.66 2.66zm6.336-7.72c-.62 0-1.125.503-1.125 1.125s.504 1.125 1.125 1.125c.62 0 1.125-.503 1.125-1.125s-.504-1.125-1.125-1.125z"></path></svg>
               </SocialIcon>
               <SocialIcon href="https://wa.me/421911275755" ariaLabel="WhatsApp">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.462.149-.115.198-.199.297-.347.099-.149.05-.297-.024-.446-.073-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.525.074-.798.371c-.273.297-1.04 1.016-1.04 2.479s1.065 2.875 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.2-1.624a11.822 11.822 0 005.793 1.502h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg>
               </SocialIcon>
           </div>
        </NavigationMenu>
        
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
                <Link href="/">
                 <Logo />
                </Link>
               </div>
              <nav className="flex flex-col items-start gap-2">
                {[...navLinks.slice(0,1), {href: '#', label: 'Služby'}, ...navLinks.slice(1)]
                .map(link => (
                    link.label === 'Služby' ? 
                    <div key={link.href} className="text-lg font-semibold text-white/50 w-full pt-2">Služby</div>
                    :
                    <Button asChild variant="link" className={cn("text-lg font-semibold -ml-4", (pathname === link.href || (link.href === '/blog' && pathname.startsWith('/blog'))) ? "text-primary" : "text-white hover:text-gray-300",
                    )} key={link.href}>
                        <Link href={link.href}>{link.label}</Link>
                    </Button>
                ))}
                 <div className="pl-4 pt-2 flex flex-col items-start gap-1">
                    {services.map(s => (
                        <Button asChild variant="link" className={cn("text-base font-medium -ml-4 h-auto py-1", pathname === s.href ? "text-primary" : "text-white/80 hover:text-white")} key={s.href}>
                           <Link href={s.href}>{s.title}</Link>
                        </Button>
                    ))}
                 </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-3">
             {icon && <div className="flex-shrink-0">{icon}</div>}
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground ml-8">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
    
    
