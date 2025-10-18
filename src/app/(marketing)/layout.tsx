
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import InstallBanner from '@/components/pwa/InstallBanner';
import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from 'next';

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  // Tieto metadáta sú predvolené a môžu byť prepísané na úrovni stránky
  title: {
    default: 'Sťahovanie Bytov a Firiem Bratislava | VI&MO',
    template: '%s | VI&MO Sťahovanie Bratislava',
  },
  description: 'Profesionálne sťahovanie bytov, domov a firiem v Bratislave a okolí. Ponúkame aj vypratávanie a upratovacie služby. Získajte nezáväznú cenovú ponuku.',
  openGraph: {
    title: 'Sťahovanie Bytov a Firiem Bratislava | VI&MO',
    description: 'Spoľahlivé sťahovacie a upratovacie služby v Bratislave.',
    type: 'website',
  },
};


export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      <div className="bg-[#00202e]">
        <Footer />
      </div>
      <InstallBanner />
      <Toaster />
    </div>
  );
}
