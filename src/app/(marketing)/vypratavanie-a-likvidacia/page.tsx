
import type { Metadata } from 'next';
import VypratavanieLikvidaciaClient from './VypratavanieLikvidaciaClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://app.viandmo.com';

export const metadata: Metadata = {
  title: 'Vypratávanie a Ekologická Likvidácia Odpadu Bratislava | VI&MO',
  description: 'Profesionálne vypratávanie bytov, pivníc, kancelárií a pozostalostí v Bratislave. Zabezpečíme triedenie a ekologickú likvidáciu všetkého druhu odpadu.',
  openGraph: {
    title: 'Vypratávanie a Ekologická Likvidácia Odpadu Bratislava | VI&MO',
    description: 'Rýchle a spoľahlivé vypratávacie služby v Bratislave. Od nábytku po stavebný odpad.',
    url: '/vypratavanie-a-likvidacia',
  },
  alternates: {
    canonical: `${siteUrl}/vypratavanie-a-likvidacia`,
  },
};

export default function VypratavanieLikvidaciaPage() {
  return <VypratavanieLikvidaciaClient />;
}
