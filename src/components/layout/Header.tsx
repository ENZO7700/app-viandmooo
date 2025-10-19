'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Logo from "./Logo";

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
        className="text-white/70 hover:text-white transition-colors duration-300"
        aria-label={ariaLabel}
    >
        {children}
    </a>
);


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
        <Link href="/">
          <Logo />
        </Link>
        <nav className="hidden md:flex flex-grow justify-end items-center gap-4">
          {navLinks.map(link => <NavLink key={link.href} {...link} />)}
           <div className="flex items-center gap-4 ml-4">
               <SocialIcon href="https://www.facebook.com/p/VI-MO-stahovanie-upratovanie-100063524682338/" ariaLabel="Facebook">
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor"><title>Facebook</title><path d="M23.998 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.61 22.954 23.998 17.99 23.998 12z"/></svg>
               </SocialIcon>
               <SocialIcon href="https://www.instagram.com/viamoservice/" ariaLabel="Instagram">
                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor"><title>Instagram</title><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.936 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.314.936 20.646.525 19.86.22c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.06 1.17-.249 1.805-.413 2.227-.217.562-.477.96-.896 1.381-.42.419-.819.679-1.38.896-.423.164-1.057.36-2.227.413-1.266.057-1.646.07-4.85.07s-3.585-.015-4.85-.07c-1.17-.06-1.805-.249-2.227-.413-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.164-.422-.36-1.057-.413-2.227-.057-1.266-.07-1.646-.07-4.85s.015-3.585.07-4.85c.06-1.17.249-1.805.413-2.227.217-.562.477-.96.896-1.381.42-.419.819-.679 1.38-.896.423-.164 1.057-.36 2.227-.413C8.415 2.176 8.797 2.16 12 2.16zm0 5.48c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7.16c-1.468 0-2.66-1.192-2.66-2.66s1.192-2.66 2.66-2.66 2.66 1.192 2.66 2.66-1.192 2.66-2.66 2.66zm6.336-7.72c-.62 0-1.125.503-1.125 1.125s.504 1.125 1.125 1.125c.62 0 1.125-.503 1.125-1.125s-.504-1.125-1.125-1.125z"/></svg>
               </SocialIcon>
               <SocialIcon href="https://wa.me/421911275755" ariaLabel="WhatsApp">
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor"><title>WhatsApp</title><path d="M12.04 0C5.43 0 0.05 5.38 0.05 11.99c0 2.1.56 4.06 1.57 5.8l-1.62 5.92 6.07-1.59c1.69.95 3.63 1.48 5.66 1.48h.01c6.61 0 11.99-5.38 11.99-11.99S18.65 0 12.04 0zm0 21.6c-1.85 0-3.6-.5-5.13-1.39l-.36-.21-3.81.99 1.01-3.72-.24-.38a9.66 9.66 0 0 1-1.56-5.23C2.96 6.56 7.01 2.4 12.04 2.4c5.02 0 9.1 4.17 9.1 9.29 0 5.12-4.08 9.91-9.1 9.91zM17.5 14.3c-.27-.13-1.59-.78-1.84-.88-.25-.09-.43-.13-.62.13-.19.27-.7.88-.86 1.06-.16.18-.32.2-.59.06-.27-.13-1.15-.42-2.19-1.35C9.9 12.45 9.3 11.6 9.14 11.3c-.15-.3-.02-.46.12-.61.12-.12.27-.32.4-.42.14-.1.18-.18.27-.31.09-.13.05-.27-.02-.41-.08-.13-.62-1.49-.84-2.03s-.45-.47-.62-.47c-.17 0-.36-.01-.54-.01s-.43.06-.66.31-.9.87-1.17 2.1c-.27 1.22.13 2.8.32 3.1.19.29 1.8 2.75 4.38 3.82.6.26 1.08.41 1.45.53.69.21 1.32.18 1.82.11.5-.07 1.59-.65 1.81-1.28.23-.63.23-1.18.16-1.28-.07-.1-.25-.19-.52-.32z"/></svg>
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
                <Link href="/">
                 <Logo />
                </Link>
               </div>
              <nav className="flex flex-col items-start gap-2">
                {navLinks.map(link => (
                    <Button asChild variant="link" className={cn(
                      "text-lg font-semibold -ml-4",
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
