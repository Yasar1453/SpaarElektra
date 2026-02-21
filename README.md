# SpaarElektra Website

Professionele website voor SpaarElektra - Elektrotechnische Installaties

## ✨ Features

- 🎨 Modern en responsief design
- 📸 Fullscreen foto slider met automatische transitie
- 🎯 Transparante navigatie die wit wordt bij scrollen
- 📱 Volledig responsive voor alle devices
- ⚡ Optimale performance
- 🔄 Smooth scrolling en animaties
- ⚙️ Vite-powered development server met hot reload

## 🚀 Quick Start

### Voor Beginners (Zonder Node.js)

Open gewoon `index.html` in je browser - dat werkt direct!

### Voor Development (Met Node.js) - **AANBEVOLEN**

**Zie [NODEJS-SETUP.md](NODEJS-SETUP.md) voor gedetailleerde installatie instructies!**

Korte versie:

```bash
# 1. Installeer Node.js vanaf https://nodejs.org/ (LTS versie)

# 2. Navigeer naar de project folder
cd /Users/yasarkocdas/Documents/SpaarElektra

# 3. Installeer dependencies
npm install

# 4. Start development server
npm run dev

# Browser opent automatisch op http://localhost:5173/
```

## Projectstructuur

```
SpaarElektra/
├── index.html          # Hoofdpagina
├── styles.css          # Alle styling
├── script.js           # Interactieve functionaliteit
├── package.json        # Node.js configuratie
├── Fotos/
│   └── Homepage-fotos/ # Hero slider foto's
└── README.md           # Dit bestand
```

## Technologieën

- HTML5
- CSS3 (met moderne features zoals CSS Grid, Flexbox, CSS Variables)
- Vanilla JavaScript (ES6+)
- Vite (optioneel, voor development)

## Browser Compatibiliteit

- Chrome (laatste 2 versies)
- Firefox (laatste 2 versies)
- Safari (laatste 2 versies)
- Edge (laatste 2 versies)

## Aanpassingen

### Kleuren wijzigen

Pas de CSS variabelen aan in `styles.css`:

```css
:root {
    --primary-color: #003366;
    --secondary-color: #0066cc;
    --accent-color: #ff6600;
}
```

### Foto's toevoegen/wijzigen

Plaats foto's in `Fotos/Homepage-fotos/` en update de `background-image` URL's in `index.html`.

### Slider snelheid aanpassen

Wijzig de interval in `script.js`:

```javascript
slideInterval = setInterval(showNextSlide, 5000); // 5000 = 5 seconden
```

## Contact

Voor vragen of ondersteuning, neem contact op met SpaarElektra.
