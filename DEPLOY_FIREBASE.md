
# Návod na nasadenie aplikácie na Firebase Hosting

Tento súbor obsahuje všetky kroky potrebné na úspešné nasadenie vašej statickej Next.js aplikácie na Firebase Hosting.

---

### Krok 1: Príprava Firebase Projektu

1.  **Vytvorenie Firebase projektu:**
    -   Prejdite na [Firebase Console](https://console.firebase.google.com/).
    -   Kliknite na "Add project" a vytvorte nový projekt. Počas vytvárania **môžete vypnúť Google Analytics**, pre túto stránku ho nepotrebujete.
    -   Počkajte, kým sa projekt vytvorí.

2.  **Nájdenie ID projektu:**
    -   Na hlavnej stránke projektu kliknite na ikonu ozubeného kolesa vedľa "Project Overview" a vyberte "Project settings".
    -   Váš **Project ID** nájdete v sekcii "General". Skopírujte si ho.

### Krok 2: Konfigurácia lokálneho projektu

1.  **Nastavenie `.firebaserc`:**
    -   Otvorte súbor `.firebaserc` vo vašom projekte.
    -   Nahraďte placeholder `NAZOV-VASHO-PROJEKTU` za vaše skutočné **Project ID**, ktoré ste skopírovali v predchádzajúcom kroku.

    ```json
    {
      "projects": {
        "default": "vase-skutocne-project-id"
      }
    }
    ```

### Krok 3: Inštalácia a prihlásenie cez Firebase CLI

1.  **Inštalácia závislostí (ak ste tak ešte neurobili):**
    Spustite tento príkaz v termináli v hlavnom priečinku projektu. Tým sa nainštaluje aj `firebase-tools`.
    ```bash
    npm install
    ```

2.  **Prihlásenie do Firebase:**
    Spustite nasledujúci príkaz. Otvorí sa okno prehliadača, kde sa prihlásite do svojho Google účtu, pod ktorým máte vytvorený Firebase projekt.
    ```bash
    firebase login
    ```
    -   Ak ste už prihlásení, tento krok môžete preskočiť.

### Krok 4: Finálne nasadenie

1.  **Spustenie nasadzovacieho skriptu:**
    Teraz už stačí spustiť jediný príkaz. Ten automaticky vytvorí statickú verziu vašej stránky (`npm run build`) a následne ju nahrá na Firebase Hosting (`firebase deploy`).
    ```bash
    npm run deploy
    ```

Po dokončení príkazu vám terminál vypíše **Hosting URL**. To je finálna adresa vašej novej webstránky. Gratulujem!
