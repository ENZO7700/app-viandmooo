
import type { Metadata } from 'next';
import StahovanieBytovClient from './StahovanieBytovClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://app.viandmo.com';

const faqs = [
    {
      question: "Koľko vopred si mám objednať sťahovanie bytu?",
      answer: "Odporúčame objednať si sťahovacie služby aspoň 1-2 týždne vopred, najmä ak plánujete sťahovanie počas víkendu alebo na konci mesiaca. Pre expresné termíny nás neváhajte kontaktovať telefonicky."
    },
    {
      question: "Poskytujete aj baliaci materiál?",
      answer: "Áno, po dohode vieme zabezpečiť kompletný baliaci materiál vrátane pevných krabíc, bublinkovej a stretch fólie, lepiacich pások a ochranných diek."
    },
    {
      question: "Ako prebieha demontáž a montáž nábytku?",
      answer: "Náš skúsený tím má potrebné náradie a zručnosti na odbornú demontáž a následnú montáž väčšiny typov nábytku, od skriniek a postelí až po kuchynské linky."
    },
    {
      question: "Čo ak bývam na vyššom poschodí bez výťahu?",
      answer: "Sťahovanie bez výťahu nie je problém. Účtujeme si malý príplatok za každé poschodie, ktorý transparentne uvedieme v cenovej ponuke. Náš tím je fyzicky zdatný a poradí si aj s náročnými podmienkami."
    }
];

export const metadata: Metadata = {
  title: 'Sťahovanie Bytov a Domov v Bratislave | VI&MO',
  description: 'Profesionálne a bezpečné sťahovanie bytov, garsóniek a rodinných domov v Bratislave. Komplexné služby od balenia po montáž nábytku. Získajte ponuku zdarma!',
  openGraph: {
    title: 'Sťahovanie Bytov a Domov v Bratislave | VI&MO',
    description: 'Profesionálne a bezpečné sťahovanie bytov, garsóniek a rodinných domov v Bratislave. Získajte nezáväznú cenovú ponuku.',
    url: '/stahovanie-bytov-bratislava',
  },
  alternates: {
    canonical: `${siteUrl}/stahovanie-bytov-bratislava`,
  },
};

export default function StahovanieBytovPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StahovanieBytovClient faqs={faqs} />
    </>
  );
}

