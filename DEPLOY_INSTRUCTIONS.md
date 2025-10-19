# Návod na nasadenie aplikácie

Tento súbor obsahuje všetky potrebné kroky a príkazy na úspešné nasadenie vašej aplikácie na Vercel pomocou GitHubu.

## Krok 1: Nahratie kódu na GitHub

Predpokladom je, že máte vytvorený prázdny repozitár na GitHube. Jeho URL adresa bude vyzerať takto: `https://github.com/VASE_MENO/NAZOV_REPOZITARA.git`.

Spustite nasledujúce príkazy vo vašom termináli, v hlavnom priečinku projektu.

1.  **Inicializácia Git-u (ak ste tak ešte neurobili):**
    ```bash
    git init -b main
    ```

2.  **Skontrolujte existujúce prepojenia:**
    Spustite tento príkaz, aby ste zistili, či už existuje prepojenie s názvom `origin`.
    ```bash
    git remote -v
    ```

3.  **Nastavenie správneho prepojenia (URL):**
    *   **Ak príkaz vyššie nič nevypísal**, vytvorte nové prepojenie (nahraďte URL za vašu):
        ```bash
        git remote add origin https://github.com/VASE_MENO/NAZOV_REPOZITARA.git
        ```
    *   **Ak príkaz vyššie vypísal starú alebo nesprávnu URL**, zmeňte ju na správnu (nahraďte URL za vašu):
        ```bash
        git remote set-url origin https://github.com/VASE_MENO/NAZOV_REPOZITARA.git
        ```

4.  **Pridanie všetkých súborov:**
    ```bash
    git add .
    ```

5.  **Vytvorenie záznamu o zmenách (commit):**
    ```bash
    git commit -m "Pripravené na nasadenie"
    ```

6.  **Nahratie súborov na GitHub:**
    ```bash
    git push -u origin main
    ```

Po tomto kroku budú vaše súbory na GitHube.

---

## Krok 2: Nasadenie na Vercel

1.  **Prihláste sa na Vercel:**
    *   Prejdite na stránku [vercel.com](https://vercel.com) a prihláste sa pomocou svojho GitHub účtu.

2.  **Importujte projekt:**
    *   Na vašom Vercel dashboarde kliknite na "Add New... -> Project".
    *   Vyberte GitHub repozitár, do ktorého ste práve nahrali kód.
    *   Vercel automaticky rozpozná, že ide o Next.js projekt.

3.  **Nastavte environmentálne premenné:**
    *   Pred kliknutím na "Deploy" rozbaľte sekciu "Environment Variables".
    *   Pridajte nasledujúce premenné s hodnotami zo súboru `.env`:
        *   `SESSION_SECRET`
        *   `NEXT_PUBLIC_FIREBASE_API_KEY`
        *   `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
        *   `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
        *   `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
        *   `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
        *   `NEXT_PUBLIC_FIREBASE_APP_ID`
        *   `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

4.  **Kliknite na "Deploy"**:
    *   Vercel sa o všetko postará. Po dokončení vám poskytne URL adresu nasadenej aplikácie.
