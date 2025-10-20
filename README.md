
# VI&MO - Sťahovanie a Upratovanie (Statická Verzia)

Toto je Next.js aplikácia vytvorená vo Firebase Studio, nakonfigurovaná na generovanie čisto statického webu (`output: 'export'`). Je pripravená na nasadenie na akúkoľvek statickú hostingovú službu, ako je Vercel alebo Firebase Hosting.

## Kľúčové Vlastnosti

- **Statická Generácia (SSG):** Extrémne rýchle načítanie a vysoká bezpečnosť vďaka `output: 'export'` v Next.js. Žiadny serverový kód v produkcii.
- **Optimalizácia pre SEO:** Detailné metadáta, JSON-LD štruktúrované dáta, generovaná sitemap.xml a optimalizovaný `robots.txt`.
- **Core Web Vitals:** Dôraz na výkon s optimalizovanými obrázkami (`next/image`), správnym načítavaním fontov a minimalizáciou layout shiftu (CLS).
- **Responzívny Dizajn:** Moderný vzhľad vďaka Tailwind CSS a ShadCN UI.
- **Blogovací Systém:** Staticky generovaný blog z Markdown súborov s podporou pre kategórie a tagy.

## Spustenie a Vývoj

1.  **Inštalácia závislostí:**
    ```bash
    npm install
    ```

2.  **Spustenie vývojového servera:**
    ```bash
    npm run dev
    ```
    Aplikácia bude dostupná na adrese `http://localhost:3000`.

## Build a Nasadenie

1.  **Vytvorenie statického buildu:**
    Tento príkaz vygeneruje statické súbory do adresára `out/`.
    ```bash
    npm run build
    ```

2.  **Lokálne otestovanie produkčného buildu:**
    Na otestovanie vygenerovaných súborov môžete použiť jednoduchý HTTP server.
    ```bash
    npx serve out
    ```

3.  **Nasadenie na Vercel (Odporúčané):**
    - Prepojte svoje GitHub úložisko s Vercel účtom.
    - Vercel automaticky rozpozná, že ide o Next.js projekt.
    - **Dôležité:** V nastaveniach projektu na Verceli **nemusíte** nastavovať žiadne environmentálne premenné, keďže všetky kľúče sú už súčasťou statického buildu (viď sekcia nižšie). Framework preset by mal byť `Next.js`.

4.  **Nasadenie na Firebase Hosting:**
    - Uistite sa, že máte nainštalované Firebase CLI (`npm install -g firebase-tools`).
    - Prihláste sa: `firebase login`.
    - Inicializujte hosting: `firebase init hosting`. Ako verejný adresár zadajte `out`.
    - Nasaďte projekt: `firebase deploy --only hosting`.

## Environmentálne Premenné

Keďže táto verzia projektu je plne statická (`output: 'export'`), všetky `NEXT_PUBLIC_` premenné sú vložené priamo do vygenerovaných súborov počas `npm run build`. Preto **nie je nutné** nastavovať ich na hostingovej platforme.

Pre lokálny vývoj si vytvorte súbor `.env.local` a vložte doň nasledujúce premenné (používajú sa napr. na generovanie sitemap.xml):

```env
# Súbor: .env.local

# Hlavná URL adresa vašej finálnej stránky
NEXT_PUBLIC_SITE_URL="https://app.viandmo.com"
```

## SEO a Výkon (Core Web Vitals)

### SEO Checklist

-   **Unikátne titulky a popisy:** Každá stránka má vlastný `<title>` a `<meta name="description">` v `src/app/(marketing)/.../page.tsx`.
-   **Štruktúrované dáta (JSON-LD):** V hlavnom layoute (`src/app/layout.tsx`) sú definované dáta pre `MovingCompany`, ktoré popisujú vašu firmu pre Google. Blogové články majú vlastné `BlogPosting` dáta.
-   **Sitemap:** Súbor `src/app/sitemap.ts` automaticky generuje `sitemap.xml` so všetkými verejnými stránkami počas buildu.
-   **Robots.txt:** Súbor `src/app/robots.txt` dáva vyhľadávačom inštrukcie, čo môžu a nemôžu indexovať.

### Optimalizácia Core Web Vitals (CWV)

-   **LCP (Largest Contentful Paint):** Kľúčové obrázky (napr. v Hero sekciách) používajú `next/image` s atribútom `priority`, čo urýchľuje ich načítanie.
-   **CLS (Cumulative Layout Shift):** Všetky obrázky majú definované rozmery, aby sa predišlo "poskakovaniu" layoutu pri načítavaní.
-   **INP (Interaction to Next Paint):** Kód je optimalizovaný a množstvo JavaScriptu na strane klienta je minimálne, čo zaručuje rýchle reakcie na interakcie používateľa.
