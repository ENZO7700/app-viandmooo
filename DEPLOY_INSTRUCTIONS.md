# Návod na nasadenie aplikácie

Tento súbor obsahuje všetky potrebné kroky a príkazy na úspešné nasadenie vašej aplikácie na Vercel pomocou GitHubu.

## Krok 1: Nahratie kódu na GitHub

Predpokladom je, že máte vytvorený prázdny repozitár na GitHube. Jeho URL adresa musí presne zodpovedať tejto: `https://github.com/ENZO7700/app-viandmooo`.

Spustite nasledujúce príkazy vo vašom termináli, v hlavnom priečinku projektu.

1.  **Inicializácia Git-u (ak ste tak ešte neurobili):**
    ```bash
    git init -b main
    ```

2.  **Nastavenie prepojenia s GitHub repozitárom:**
    Najprv skúste pridať nové prepojenie. Nahraďte URL adresu za vašu:
    ```bash
    git remote add origin https://github.com/ENZO7700/app-viandmooo
    ```
    *   **Ak príkaz prebehne bez chyby,** pokračujte krokom 3.
    *   **Ak sa zobrazí chyba `error: remote origin already exists.`,** znamená to, že prepojenie už existuje. V tom prípade použite nasledujúci príkaz na jeho aktualizáciu:
        ```bash
        git remote set-url origin https://github.com/ENZO7700/app-viandmooo
        ```

3.  **Pridanie všetkých súborov:**
    ```bash
    git add .
    ```

4.  **Vytvorenie záznamu o zmenách (commit):**
    ```bash
    git commit -m "Pripravené na nasadenie"
    ```

5.  **Nahratie súborov na GitHub:**
    ```bash
    git push -u origin main
    ```

Po tomto kroku budú vaše súbory na GitHube. Ak sa pri `git push` zobrazí chyba `fatal: repository not found`, skontrolujte, či URL adresa repozitára na GitHube presne sedí a či je repozitár verejný.

---

## Krok 2: Nasadenie na Vercel

1.  **Prihláste sa na Vercel:**
    *   Prejdite na stránku [vercel.com](https://vercel.com) a prihláste sa pomocou svojho GitHub účtu.

2.  **Importujte projekt:**
    *   Na vašom Vercel dashboarde kliknite na "Add New... -> Project".
    *   Vyberte GitHub repozitár, do ktorého ste práve nahrali kód (`app-viandmooo`).
    *   Vercel automaticky rozpozná, že ide o Next.js projekt a predvyplní všetky nastavenia. **Nemeňte ich.**

3.  **Nastavte environmentálne premenné (KĽÚČOVÝ KROK):**
    *   Pred kliknutím na "Deploy" rozbaľte sekciu **Environment Variables**.
    *   Budete pridávať premenné jednu po druhej. Skopírujte **Názov (Name)** a **Hodnotu (Value)** z tabuľky nižšie a vložte ich do príslušných polí vo Verceli.

| Názov (Name) | Hodnota (Value) |
| :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | `https://app.viandmo.com` |


**Veľmi dôležité:** Pri vkladaní hodnoty (Value) sa uistite, že typ premennej je nastavený na **"Plaintext"**. Vedľa poľa pre hodnotu je prepínač, ktorý môže byť omylom nastavený na "Secret". Ak je nastavený na "Secret", Vercel bude hľadať kľúč s daným menom, čo spôsobí chybu. Uistite sa, že hodnotu vkladáte priamo ako obyčajný text.

4.  **Kliknite na "Deploy"**:
    *   Vercel sa o všetko postará. Po dokončení vám poskytne URL adresu nasadenej aplikácie.
