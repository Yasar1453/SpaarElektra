# Installatie Instructies voor Node.js

## Optie 1: Installeer via Homebrew (Aanbevolen voor macOS)

### Stap 1: Installeer Homebrew
Open Terminal en voer dit commando uit:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Je wordt mogelijk gevraagd om je wachtwoord in te voeren.

### Stap 2: Installeer Node.js
Na Homebrew installatie, voer uit:

```bash
brew install node
```

### Stap 3: Verifieer installatie
Controleer of Node.js correct is geïnstalleerd:

```bash
node --version
npm --version
```

## Optie 2: Download vanaf nodejs.org

1. Ga naar https://nodejs.org/
2. Download de LTS versie (Long Term Support)
3. Open het gedownloade bestand en volg de installatie wizard
4. Herstart je Terminal na installatie

## Gebruik van de website

### Zonder Node.js (huidige situatie)
Open gewoon `index.html` in je browser - alles werkt!

### Met Node.js (voor development)

1. Navigeer naar de project folder in Terminal:
```bash
cd /Users/yasarkocdas/Documents/SpaarElektra
```

2. Installeer dependencies:
```bash
npm install
```

3. Start de development server:
```bash
npm run dev
```

4. Of gebruik de simpele Python server (geen installatie nodig):
```bash
npm run serve
```

## Veelgestelde Vragen

**Q: Heb ik Node.js nodig om de website te gebruiken?**
A: Nee! De website werkt perfect zonder Node.js. Je kunt gewoon index.html openen.

**Q: Waarom zou ik Node.js gebruiken?**
A: Node.js geeft je toegang tot:
- Hot reload tijdens development
- Geoptimaliseerde builds voor productie
- Moderne development tools

**Q: Homebrew installatie vraagt om wachtwoord?**
A: Dit is normaal. Homebrew heeft admin rechten nodig om te installeren.

## Hulp nodig?

Als je problemen hebt met de installatie:
1. Controleer of je admin rechten hebt op je Mac
2. Zorg dat je Terminal toegang heeft tot internet
3. Probeer Terminal opnieuw op te starten na installatie
