
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Script from 'next/script';

const APP_NAME = "VI&MO";
const APP_DEFAULT_TITLE = "Sťahovanie Bytov a Firiem Bratislava | VI&MO";
const APP_TITLE_TEMPLATE = "%s | VI&MO";
const APP_DESCRIPTION = "Profesionálne sťahovanie bytov, domov a firiem v Bratislave a okolí. Ponúkame aj vypratávanie a upratovacie služby. Získajte nezáväznú cenovú ponuku.";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://app.viandmo.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    url: siteUrl,
    images: [
      {
        url: '/og-image.jpg', // Odkaz na predvolený OG obrázok
        width: 1200,
        height: 630,
        alt: 'VI&MO Sťahovanie a Upratovanie v Bratislave',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
     images: [
      {
        url: '/og-image.jpg',
        alt: 'VI&MO Sťahovanie a Upratovanie v Bratislave',
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#00202e",
};

const mainFont = Plus_Jakarta_Sans({
  subsets: ['latin-ext'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '600', '700', '800'],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" className={cn(mainFont.variable)} suppressHydrationWarning>
      <head>
        <Script
          id="viandmo-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MovingCompany",
              "name": "VI and MO s. r. o.",
              "description": "Profesionálne sťahovanie bytov, domov a firiem v Bratislave a okolí. Rýchlo, férovo a bez starostí. Ponúkame aj vypratávanie a upratovacie služby.",
              "telephone": "+421911275755",
              "email": "info@viandmo.com",
              "url": siteUrl,
              "logo": "https://viandmo.com/wp-content/uploads/viandmo_logo_regular_white.svg",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Karpatské námestie 7770/10A",
                "addressLocality": "Bratislava",
                "addressRegion": "Bratislavský kraj",
                "postalCode": "831 06",
                "addressCountry": "SK"
              },
              "areaServed": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": "48.148598",
                  "longitude": "17.107748"
                },
                "geoRadius": "50000"
              },
              "openingHours": "Mo-Su 08:00-20:00",
              "priceRange": "€€",
              "founder": {
                "@type": "Person",
                "name": "Miroslav Danihel"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Služby",
                "itemListElement": [
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sťahovanie bytov a domov" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sťahovanie firiem a kancelárií" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Vypratávanie a likvidácia odpadu" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Profesionálne upratovacie práce" } }
                ]
              }
            })
          }}
        />
      </head>
      <body className={cn('font-body antialiased')}>
        {children}
      </body>
    </html>
  );
}
