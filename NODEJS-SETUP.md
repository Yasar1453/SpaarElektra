# Node.js Setup voor SpaarElektra

## Stap 1: Installeer Node.js

### Optie A: Via de officiële website (Makkelijkst)

1. Ga naar https://nodejs.org/
2. Download de **LTS versie** (bijv. 20.x.x)
3. Open het gedownloade `.pkg` bestand
4. Volg de installatie wizard
5. **Belangrijk:** Herstart je Terminal na installatie

### Optie B: Via Homebrew (voor gevorderden)

```bash
# Installeer Homebrew (als je dit nog niet hebt)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Installeer Node.js
brew install node
```

## Stap 2: Verifieer de installatie

Open een **nieuwe** Terminal en voer uit:

```bash
node --version
# Verwacht: v20.x.x of hoger

npm --version
# Verwacht: 10.x.x of hoger
```

Als je deze versienummers ziet, is Node.js succesvol geïnstalleerd! ✅

## Stap 3: Navigeer naar je project

```bash
cd /Users/yasarkocdas/Documents/SpaarElektra
```

## Stap 4: Installeer project dependencies

```bash
npm install
```

Dit installeert alle benodigde packages (Vite, etc.). Dit kan even duren.

## Stap 5: Start de development server

```bash
npm run dev
```

Je ziet nu een melding zoals:
```
  VITE v5.0.0  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Open http://localhost:5173/ in je browser! 🚀

## Beschikbare Commando's

```bash
# Development server met hot reload
npm run dev

# Build voor productie (maakt geoptimaliseerde bestanden)
npm run build

# Preview van productie build
npm run preview

# Simpele Python server (geen Node.js features)
npm run serve
```

## Voordelen van Node.js Development Server

✅ **Hot Reload** - Wijzigingen zijn direct zichtbaar zonder refresh
✅ **Snellere development** - Optimale performance tijdens ontwikkeling
✅ **Modern tooling** - Toegang tot moderne JavaScript features
✅ **Productie builds** - Geoptimaliseerde, gecomprimeerde bestanden
✅ **Module bundling** - Efficiënte code organisatie

## Problemen oplossen

### "command not found: node"
- Herstart je Terminal
- Controleer of de installatie succesvol was
- Probeer een nieuwe Terminal tab/window

### "npm install" geeft errors
- Verwijder de `node_modules` folder en probeer opnieuw
- Zorg dat je in de juiste directory bent (`pwd` moet `/Users/yasarkocdas/Documents/SpaarElektra` tonen)

### Poort 5173 is al in gebruik
```bash
# Stop andere Vite servers of gebruik een andere poort:
npm run dev -- --port 3000
```

## Volgende stappen

Na succesvolle setup kun je:
1. De website aanpassen met live preview
2. Nieuwe features toevoegen
3. Production builds maken met `npm run build`
4. De website deployen naar een hosting platform

Veel succes! 🎉
