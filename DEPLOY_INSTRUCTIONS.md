# Návod na nasadenie aplikácie

Tento súbor obsahuje všetky potrebné kroky a príkazy na úspešné nasadenie vašej aplikácie na Vercel pomocou GitHubu.

## Krok 1: Nahratie kódu na GitHub

Predpokladom je, že máte vytvorený prázdny repozitár na GitHube. Jeho URL adresa bude vyzerať takto: `https://github.com/VASE_MENO/NAZOV_REPOZITARA.git`.

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

Po tomto kroku budú vaše súbory na GitHube.

---

## Krok 2: Nasadenie na Vercel

1.  **Prihláste sa na Vercel:**
    *   Prejdite na stránku [vercel.com](https://vercel.com) a prihláste sa pomocou svojho GitHub účtu.

2.  **Importujte projekt:**
    *   Na vašom Vercel dashboarde kliknite na "Add New... -> Project".
    *   Vyberte GitHub repozitár, do ktorého ste práve nahrali kód.
    *   Vercel automaticky rozpozná, že ide o Next.js projekt a predvyplní všetky nastavenia. **Nemeňte ich.**

3.  **Nastavte environmentálne premenné (KĽÚČOVÝ KROK):**
    *   Pred kliknutím na "Deploy" rozbaľte sekciu **Environment Variables**.
    *   Budete pridávať premenné jednu po druhej. Skopírujte **Názov (Name)** a **Hodnotu (Value)** z tabuľky nižšie a vložte ich do príslušných polí vo Verceli.

| Názov (Name) | Hodnota (Value) |
| :--- | :--- |
| `SESSION_SECRET` | `e527d2c3e1e2b0a0a6b4a3a6a9b4a1a6` |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIzaSyB8LV8AB2AyvU_LWk7Cy9xHtIt3xDP_WUY` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `viandmo-whitegreen.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `viandmo-whitegreen` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `viandmo-whitegreen.appspot.com` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `69187711611` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | `1:69187711611:web:74c80cfc777a90405068de` |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | (toto pole nechajte prázdne) |

**Veľmi dôležité:** Pri vkladaní hodnoty (Value) sa uistite, že typ premennej je nastavený na **"Plaintext"**. Vedľa poľa pre hodnotu je prepínač, ktorý môže byť omylom nastavený na "Secret". Ak je nastavený na "Secret", Vercel bude hľadať kľúč s daným menom, čo spôsobí chybu, ktorú ste videli. Uistite sa, že hodnotu vkladáte priamo ako obyčajný text.

4.  **Kliknite na "Deploy"**:
    *   Vercel sa o všetko postará. Po dokončení vám poskytne URL adresu nasadenej aplikácie.
