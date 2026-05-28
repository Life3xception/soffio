# Soffio — Guida al Setup di Capacitor per iOS & Android 📱

Soffio è stata progettata con un'architettura **mobile-first, offline-first e PWA-ready**. Questo significa che puoi compilarla istantaneamente in una vera applicazione nativa per **iPhone (iOS) e Android** utilizzando **Capacitor**.

La struttura del codice include già la predisposizione delle funzionalità chiave (come i promemoria simulati pronti per essere agganciati a `@capacitor/local-notifications` e i trigger tattili).

---

## 🚀 Istruzioni di Setup Rapido

Per compilare ed eseguire Soffio sul tuo smartphone, segui questi semplici passaggi nel terminale dopo aver esportato il codice:

### 1. Installa i pacchetti Capacitor nel progetto
Esegui questo comando nella root del progetto:
```bash
npm install @capacitor/core
npm install -D @capacitor/cli
```

### 2. Inizializza Capacitor
Configura il file di configurazione con il nome dell'app e il bundle ID:
```bash
npx cap init Soffio com.soffio.app --web-dir=dist
```

### 3. Installa i plug-in nativi necessari (Notifiche & Vibrazione)
Soffio sfrutta notifiche locali e feedback di vibrazione. Installa i plug-in ufficiali:
```bash
npm install @capacitor/local-notifications
npm install @capacitor/haptics
```

### 4. Genera la build di produzione statica
Compila il codice React + Tailwind:
```bash
npm run build
```

### 5. Aggiungi le piattaforme natice desiderate
Aggiungi iOS o Android (richiede Xcode instalato per iOS, o Android Studio / Gradle per Android):

#### Per iOS (Apple iPhone):
```bash
npm install @capacitor/ios
npx cap add ios
```

#### Per Android:
```bash
npm install @capacitor/android
npx cap add android
```

---

## 🔄 Sincronizzazione del codice nativo

Ogni volta che fai modifiche al codice React e vuoi testare l'app sul telefono o emulatore nativo, esegui:

1. **Compila il codice:**
   ```bash
   npm run build
   ```
2. **Sincronizza i file con i progetti nativi:**
   ```bash
   npx cap sync
   ```

---

## 🛠️ Come avviare l'Editor Nativo per il Deploy finale

- Per aprire il progetto in **Xcode** (iOS):
  ```bash
  npx cap open ios
  ```
- Per aprire il progetto in **Android Studio** (Android):
  ```bash
  npx cap open android
  ```

Da qui puoi connettere il tuo telefono reale tramite cavo USB e cliccare il pulsante "Run/Avvia" per installare un'istanza nativa offline ad altissime prestazioni sul tuo dispostivo! 🌱
