# Návod na nasadenie aplikácie na Vercel

Tento súbor obsahuje všetky potrebné kroky a príkazy na úspešné nasadenie vašej aplikácie na Vercel. Máte dve možnosti: cez GitHub (odporúčané pre automatizáciu) alebo priamo z príkazového riadku (najrýchlejšie).

---

## Možnosť 1: Nasadenie cez Príkazový Riadok (Najrýchlejšie)

Tento spôsob je ideálny na rýchle nasadenie priamo z vášho počítača.

1.  **Inštalácia Vercel CLI (ak ho ešte nemáte):**
    Spustite tento príkaz vo vašom termináli:
    ```bash
    npm install -g vercel
    ```

2.  **Spustenie nasadenia:**
    V hlavnom priečinku projektu spustite nasledujúci príkaz. Prevedie vás celým procesom.
    ```bash
    vercel
    ```
    *   Po spustení sa prihláste do svojho Vercel účtu.
    *   **Link to existing project?** Odpovedzte `N` (Nie).
    *   Potvrďte názov projektu a umiestnenie kódu (väčšinou stačí stlačiť `Enter`).
    *   Vercel automaticky rozpozná nastavenia pre Next.js. **Nemeňte ich.**

3.  **Nastavenie Environmentálnych Premenných (KĽÚČOVÝ KROK):**
    Počas procesu sa vás terminál opýta na premenné. Zadajte ich jednu po druhej.

| Názov (Name)                     | Hodnota (Value)                                     |
| :------------------------------- | :-------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`           | `https://vasa-finalna-domena.sk`                      |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | `https://formspree.io/f/xxxxxxxx` (vaša URL z Formspree) |

**Dôležité:**
*   Hodnotu pre `NEXT_PUBLIC_SITE_URL` nahraďte URL adresou, ktorú vám Vercel pridelí po prvom nasadení.
*   Hodnotu pre `NEXT_PUBLIC_FORMSPREE_ENDPOINT` získate po registrácii a vytvorení nového formulára na [formspree.io](https://formspree.io).

Po zadaní premenných Vercel aplikáciu nasadí a poskytne vám finálnu URL.

---

## Možnosť 2: Nasadenie cez GitHub (Odporúčané pre automatizáciu)

Tento spôsob je ideálny pre dlhodobú správu, pretože každá zmena nahratá na GitHub automaticky spustí nové nasadenie.

### Krok 1: Príprava a Nahratie kódu na GitHub

Predpokladom je, že máte vytvorený prázdny repozitár na GitHube.

1.  **Inicializácia Git-u (ak ste tak ešte neurobili):**
    ```bash
    git init -b main
    ```

2.  **Nastavenie prepojenia s GitHub repozitárom:**
    Nahraďte `URL_ADRESA_VASHO_REPOZITARA` za vašu vlastnú.
    ```bash
    git remote add origin URL_ADRESA_VASHO_REPOZITARA
    ```

3.  **Pridanie všetkých súborov a vytvorenie commitu:**
    ```bash
    git add .
    git commit -m "Pripravené na nasadenie na Vercel"
    ```

4.  **Nahratie súborov na GitHub:**
    ```bash
    git push -u origin main
    ```

### Krok 2: Nasadenie na Vercel

1.  **Prihláste sa na Vercel:**
    *   Prejdite na stránku [vercel.com](https://vercel.com) a prihláste sa pomocou svojho GitHub účtu.

2.  **Importujte projekt:**
    *   Na vašom Vercel dashboarde kliknite na "Add New... -> Project".
    *   Vyberte GitHub repozitár, do ktorého ste práve nahrali kód.
    *   Vercel automaticky rozpozná, že ide o Next.js projekt a predvyplní všetky nastavenia. **Nemeňte ich.**

3.  **Nastavte Environmentálne Premenné:**
    *   Pred kliknutím na "Deploy" rozbaľte sekciu **Environment Variables**.
    *   Pridajte premenné podľa tabuľky vyššie (`NEXT_PUBLIC_SITE_URL` a `NEXT_PUBLIC_FORMSPREE_ENDPOINT`).

4.  **Kliknite na "Deploy"**:
    *   Vercel sa o všetko postará. Po dokončení vám poskytne URL adresu nasadenej aplikácie.

Po úspešnom nasadení otestujte funkčnosť stránky, najmä odoslanie kontaktného formulára.
