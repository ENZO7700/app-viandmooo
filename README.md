
# VI&MO - Sťahovanie a Upratovanie (Statická Verzia)

Toto je Next.js aplikácia vytvorená vo Firebase Studio, nakonfigurovaná na generovanie čisto statického webu (`output: 'export'`). Je pripravená na nasadenie na akúkoľvek statickú hostingovú službu, ako je Vercel alebo Firebase Hosting.

## Kľúčové Vlastnosti

- **Statická Generácia (SSG):** Extrémne rýchle načítanie a vysoká bezpečnosť vďaka `output: 'export'` v Next.js. Žiadny serverový kód v produkcii.
- **Optimalizácia pre SEO:** Detailné metadáta, JSON-LD štruktúrované dáta, generovaná sitemap.xml a optimalizovaný `robots.txt`.
- **Core Web Vitals:** Dôraz na výkon s optimalizovanými obrázkami (`next/image`), správnym načítavaním fontov a minimalizáciou layout shiftu (CLS).
_Poznámka: Pre statický export je serverová optimalizácia obrázkov vypnutá (`unoptimized: true`)._
- **Responzívny Dizajn:** Moderný vzhľad vďaka Tailwind CSS a ShadCN UI.
- **Blogovací Systém:** Staticky generovaný blog z Markdown súborov s podporou pre kategórie a tagy.
- **Kontaktný formulár:** Integrácia so službou Formspree pre jednoduché spracovanie správ bez potreby vlastného backendu.

## Spustenie a Vývoj

1.  **Inštalácia závislostí:**
    ```bash
    npm install
    ```

2.  **Nastavenie Environmentálnych Premenných (DÔLEŽITÉ):**
    Pre plnú funkčnosť (kontaktný formulár) je potrebné nastaviť premenné prostredia. Pre lokálny vývoj môžete vytvoriť súbor `.env.local` skopírovaním z `.env.example`. Pri nasadení (napr. na Vercel) je potrebné tieto premenné nastaviť v administrácii daného projektu.

    **Súbor: `.env.example`**
    ```env
    # Hlavná URL adresa vašej finálnej stránky (používa sa na generovanie sitemap.xml a kanonických URL)
    NEXT_PUBLIC_SITE_URL="https://vasa-domena.sk"

    # URL endpoint pre Formspree kontaktný formulár
    NEXT_PUBLIC_FORMSPREE_ENDPOINT="https://formspree.io/f/xxxxxxxx"
    ```

3.  **Spustenie vývojového servera:**
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
    Pre detailný postup nasadenia na Vercel si pozrite súbor `DEPLOY_INSTRUCTIONS.md`.

4.  **Nasadenie na Firebase Hosting:**
    Pre detailný postup nasadenia na Firebase si pozrite súbor `DEPLOY_FIREBASE.md`.


## SEO a Výkon (Core Web Vitals)

### SEO Checklist

-   **Unikátne titulky a popisy:** Každá stránka má vlastný `<title>` a `<meta name="description">`.
-   **Štruktúrované dáta (JSON-LD):** V hlavnom layoute sú definované dáta pre `MovingCompany`. Blogové články majú `BlogPosting` a FAQ sekcie majú `FAQPage` schému.
-   **Sitemap:** Súbor `src/app/sitemap.ts` automaticky generuje `sitemap.xml` so všetkými verejnými stránkami počas buildu.
-   **Robots.txt:** Súbor `src/app/robots.ts` dáva vyhľadávačom inštrukcie, čo môžu a nemôžu indexovať.

### Optimalizácia Core Web Vitals (CWV)

-   **LCP (Largest Contentful Paint):** Kľúčové obrázky (napr. v Hero sekciách) používajú `next/image` s atribútom `priority`, čo urýchľuje ich načítanie.
-   **CLS (Cumulative Layout Shift):** Všetky obrázky majú definované rozmery, aby sa predišlo "poskakovaniu" layoutu pri načítavaní.
-   **INP (Interaction to Next Paint):** Kód je optimalizovaný a množstvo JavaScriptu na strane klienta je minimálne, čo zaručuje rýchle reakcie na interakcie používateľa.
