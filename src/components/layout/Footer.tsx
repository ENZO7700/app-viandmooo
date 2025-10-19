
'use client';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Phone, Mail } from 'lucide-react';
import Image from 'next/image';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-transparent text-white py-12">
      <div className="container grid grid-cols-1 gap-8 text-center md:grid-cols-4 md:text-left">
        <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="relative flex items-center">
                <Logo />
            </Link>
          <p className="text-sm text-white max-w-xs mt-4">
            Spoľahlivé sťahovanie, vypratávanie a upratovanie v Bratislave a okolí. Rýchlo, efektívne a s ľudským prístupom.
          </p>
          <div className="flex items-center gap-4 mt-6">
              <a href="https://www.facebook.com/p/VI-MO-stahovanie-upratovanie-100063524682338/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors" aria-label="Facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32V7.46H6.11v4.24h3.39v10.4h4.24V11.7h3.34l.57-4.24z"></path></svg>
              </a>
              <a href="https://www.instagram.com/viamoservice/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors" aria-label="Instagram">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.936 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.314.936 20.646.525 19.86.22c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.06 1.17-.249 1.805-.413 2.227-.217.562-.477.96-.896 1.381-.42.419-.819-.679-1.38.896-.423.164-1.057.36-2.227.413-1.266.057-1.646.07-4.85.07s-3.585-.015-4.85-.07c-1.17-.06-1.805-.249-2.227-.413-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.164-.422-.36-1.057-.413-2.227-.057-1.266-.07-1.646-.07-4.85s.015-3.585.07-4.85c.06-1.17.249-1.805.413-2.227.217-.562.477.96.896-1.381.42-.419.819-.679 1.38-.896.423-.164 1.057.36 2.227-.413C8.415 2.176 8.797 2.16 12 2.16zm0 5.48c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7.16c-1.468 0-2.66-1.192-2.66-2.66s1.192-2.66 2.66-2.66 2.66 1.192 2.66 2.66-1.192 2.66-2.66 2.66zm6.336-7.72c-.62 0-1.125.503-1.125 1.125s.504 1.125 1.125 1.125c.62 0 1.125-.503 1.125-1.125s-.504-1.125-1.125-1.125z"></path></svg>
              </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 font-headline text-white">Rýchle odkazy</h3>
          <ul className="space-y-2 text-white">
            <li><Link href="/#sluzby" className="hover:text-gray-300 transition-colors">Služby</Link></li>
            <li><Link href="/#cennik" className="hover:text-gray-300 transition-colors">Cenník</Link></li>
            <li><Link href="/blog" className="hover:text-gray-300 transition-colors">Blog</Link></li>
            <li><Link href="/about" className="hover:text-gray-300 transition-colors">O nás</Link></li>
            <li><Link href="/contact" className="hover:text-gray-300 transition-colors">Kontakt</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 font-headline text-white">Kontakt</h3>
          <ul className="space-y-2 text-white">
            <li className="flex items-center justify-center md:justify-start gap-2">
              <Phone className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
              <div>
                 <a href="tel:+421911275755" className="hover:text-gray-300 transition-colors">
                    +421 911 275 755 (Sťahovanie)
                 </a>
                 <br/>
                 <a href="tel:+421918895730" className="hover:text-gray-300 transition-colors">
                    +421 918 895 730 (Upratovanie)
                 </a>
              </div>
            </li>
            <li className="flex items-center justify-center md:justify-start">
              <Mail className="h-4 w-4 mr-2 text-primary" />
              <a href="mailto:info@viandmo.com" className="hover:text-gray-300 transition-colors">
                info@viandmo.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 font-headline text-white">Obchodné údaje</h3>
           <div className="text-sm text-white space-y-1">
                <p>VI and MO s. r. o.</p>
                <p>Karpatské námestie 7770/10A</p>
                <p>831 06 Bratislava - Rača</p>
                <p>IČO: 56 811 322</p>
                <p>DIČ: 2122461176</p>
           </div>
        </div>
      </div>

      <Separator className="my-8 bg-white/20" />

      <div className="container text-center text-sm text-white">
        &copy; {currentYear} VI and MO s. r. o. Všetky práva vyhradené.
        <span className="mx-2">|</span>
        <Link href="/privacy-policy" className="hover:text-gray-300 transition-colors">
          Ochrana osobných údajov
        </Link>
      </div>
    </footer>
  );
}

    