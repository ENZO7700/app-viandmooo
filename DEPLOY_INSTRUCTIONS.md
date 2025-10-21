# Návod na nasadenie aplikácie na Vercel

Tento súbor obsahuje všetky potrebné kroky a príkazy na úspešné nasadenie vašej aplikácie na Vercel pomocou GitHubu.

## Krok 1: Príprava a Nahratie kódu na GitHub

Predpokladom je, že máte vytvorený prázdny repozitár na GitHube.

Spustite nasledujúce príkazy vo vašom termináli, v hlavnom priečinku projektu.

1.  **Inicializácia Git-u (ak ste tak ešte neurobili):**
    ```bash
    git init -b main
    ```

2.  **Nastavenie prepojenia s GitHub repozitárom:**
    Nahraďte `URL_ADRESA_VASHO_REPOZITARA` za vašu vlastnú.
    ```bash
    git remote add origin URL_ADRESA_VASHO_REPOZITARA
    ```
    *   **Ak sa zobrazí chyba `error: remote origin already exists.`,** aktualizujte prepojenie príkazom:
        ```bash
        git remote set-url origin URL_ADRESA_VASHO_REPOZITARA
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

---

## Krok 2: Nasadenie na Vercel

1.  **Prihláste sa na Vercel:**
    *   Prejdite na stránku [vercel.com](https://vercel.com) a prihláste sa pomocou svojho GitHub účtu.

2.  **Importujte projekt:**
    *   Na vašom Vercel dashboarde kliknite na "Add New... -> Project".
    *   Vyberte GitHub repozitár, do ktorého ste práve nahrali kód.
    *   Vercel automaticky rozpozná, že ide o Next.js projekt a predvyplní všetky nastavenia. **Nemeňte ich.**

3.  **Nastavte Environmentálne Premenné (KĽÚČOVÝ KROK):**
    *   Pred kliknutím na "Deploy" rozbaľte sekciu **Environment Variables**.
    *   Budete pridávať premenné jednu po druhej. Skopírujte **Názov (Name)** a **Hodnotu (Value)** z tabuľky nižšie a vložte ich do príslušných polí vo Verceli.

| Názov (Name)                     | Hodnota (Value)                                     |
| :------------------------------- | :-------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`           | `https://vasa-finalna-domena.sk`                      |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | `https://formspree.io/f/xxxxxxxx` (vaša URL z Formspree) |

**Dôležité:**
*   Hodnotu pre `NEXT_PUBLIC_SITE_URL` nahraďte URL adresou, ktorú vám Vercel pridelí po prvom nasadení, alebo vašou vlastnou finálnou doménou.
*   Hodnotu pre `NEXT_PUBLIC_FORMSPREE_ENDPOINT` získate po registrácii a vytvorení nového formulára na [formspree.io](https://formspree.io).

4.  **Kliknite na "Deploy"**:
    *   Vercel sa o všetko postará. Po dokončení vám poskytne URL adresu nasadenej aplikácie. Tento proces môže trvať niekoľko minút.

Po úspešnom nasadení otestujte funkčnosť stránky, najmä odoslanie kontaktného formulára.
