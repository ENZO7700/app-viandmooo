
import type { Metadata } from 'next';
import StahovanieKlavirovClient from './StahovanieKlavirovClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://app.viandmo.com';

export const metadata: Metadata = {
  title: 'Sťahovanie Klavírov a Ťažkých Bremien Bratislava | VI&MO',
  description: 'Profesionálne sťahovanie klavírov, pianín, trezorov a iných ťažkých bremien v Bratislave. Používame špeciálnu techniku a postupy na zaistenie maximálnej bezpečnosti.',
  openGraph: {
    title: 'Sťahovanie Klavírov a Ťažkých Bremien Bratislava | VI&MO',
    description: 'Profesionálne sťahovanie klavírov, pianín a trezorov v Bratislave. Maximálna bezpečnosť a odborný prístup.',
    url: '/stahovanie-klavirov',
  },
  alternates: {
    canonical: `${siteUrl}/stahovanie-klavirov`,
  },
};

export default function StahovanieKlavirovPage() {
  return <StahovanieKlavirovClient />;
}
