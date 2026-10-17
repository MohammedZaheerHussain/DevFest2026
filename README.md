# DevFest Memory Match — Round 1 🎮

> **Fast, tactile, accessible memory matching challenge built for Google DevFest.**  
> Features Google developer ecosystem technologies, DevFest 2026 neo-brutalist aesthetics, Web Audio API sound synthesizer, and organizer sponsor logo customization.

---

## ✨ Features

- **⚡ Dual Difficulty Modes**:
  - **Easy Mode**: 16 cards (4×4 grid), 8 pairs, 60s countdown timer.
  - **Hard Mode**: 32 cards (8×4 desktop grid / 4×8 mobile grid), 16 pairs, 90s countdown timer.
  - **Practice & Speedrun Modes**: Untimed or 40-second blitz options.
- **🎨 DevFest 2026 Neo-brutalist Aesthetic**:
  - Signature `{DevFest}` branding with Google-colored braces (`#F9AB00` and `#E37400`).
  - Tactile 2.5px solid ink outlines (`#15171e`) and mint (`#dcfce7`) / sky (`#e0f2fe`) surfaces.
  - Signature `<GdgMark />` GDG brackets emblem on card backs.
  - Interactive geometric background Doodles (12-ray wireframe star, mint circle pills, wireframe globe).
  - Vetted by Taste Skill (`design-taste-frontend`) for anti-slop visual excellence (0 banned patterns, 0 warnings).
- **🔊 Pure Web Audio API Sound Synthesizer**:
  - 100% offline, zero audio asset downloads.
  - Realistic card flips, harmonized pair match chords with streak pitch shifting, mismatch buzzer, urgent countdown ticks (<=10s), and victory fanfares.
- **⭐ Combo Streak Multiplier System**:
  - Consecutive matches trigger streak bonuses (`+100`, `+125`, `+150`, `+200`).
  - Floating score indicators (`+100`, `+125 (x2!)`) at the interaction coordinates.
- **🤝 Organizer Sponsor Logo Customization**:
  - Allows event organizers to replace any standard ecosystem card with custom sponsor branding and tiers (Title Sponsor, Platinum Partner, Community Partner, or custom SVG).
- **⌨️ Complete Keyboard & Mobile Accessibility**:
  - Full keyboard grid navigation with Arrow Keys (`↑`, `↓`, `←`, `→`) and `Spacebar` / `Enter` to flip.
  - High-contrast focus rings and `aria-*` labels for screen readers.
- **💾 LocalStorage Best Score Tracking**:
  - Real-time persistent tracking of high scores across game sessions without any backend dependency.
- **🎉 Confetti Celebrations**:
  - Canvas confetti particle bursts styled in the Google 4-color palette (`#4285F4`, `#EA4335`, `#FBBC04`, `#34A853`).

---

## 🛠️ Technology Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Vanilla CSS Neo-brutalist Design System with 3D CSS transforms
- **Audio**: Web Audio API Synthesizer (`AudioContext`, `OscillatorNode`, `GainNode`)
- **Particle Physics**: Canvas Confetti (offline)
- **Quality & Taste**: Audited with `design-taste-frontend`

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm / yarn / pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/MohammedZaheerHussain/DevFest2026.git

# Navigate into the project directory
cd DevFest2026

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The production bundle will be generated in `dist/`.

### Run Verification Tests

```bash
node tests/verify-game.cjs
```

---

## 🎯 Gameplay Rules

1. All cards start face-down.
2. Flip two cards per turn.
3. If the developer ecosystem technologies match:
   - Both cards stay face-up.
   - You earn 100 base points plus combo streak multiplier bonuses!
4. If they mismatch:
   - They remain visible for ~800ms before flipping back down.
   - Combo streak resets to zero.
5. Clear all pairs before the timer expires to achieve victory and set a new local record!

---

## 📜 Independent Community Project

*DevFest Memory Match is an independent community project developed for Google DevFest participants and attendees. Not an official Google product.*
