# raisemedia-video

Vidéo de vente / explainer pour **RaiseMed.IA** en motion design,
construite avec [Remotion](https://remotion.dev) (React).

## Compositions

- `RaiseMedia-16x9` — master 1920×1080 · 30 fps · 60 s
- `RaiseMedia-9x16` — déclinaison sociale 1080×1920 · 30 fps · 60 s

Les deux pointent sur le même `MainSixteenNine`. Les scènes `Protocol`
et `Results` détectent l'orientation via `useVideoConfig()` et
basculent en grille mono-colonne en vertical.

## Storyboard (1800 frames)

| # | Scène       | Frames    | Durée | Beat                                                 |
| - | ----------- | --------- | ----- | ---------------------------------------------------- |
| 1 | Cold Open   | 0-120     | 4 s   | Recherche Google qui se tape — silence               |
| 2 | Problem     | 120-390   | 9 s   | "82 % de vos prospects vous Googlisent"              |
| 3 | Cost        | 390-600   | 7 s   | "3,3★ — 1 prospect sur 2 ne vous contacte jamais"    |
| 4 | Pivot       | 600-690   | 3 s   | Flash blanc → logo RAISE™                            |
| 5 | Protocol    | 690-1050  | 12 s  | R · A · I · S · E — 5 étapes                         |
| 6 | Demo        | 1050-1320 | 9 s   | `<HtmlInCanvas>` — fiche Google passe 3,3 → 4,6★     |
| 7 | Results     | 1320-1590 | 9 s   | 3 KPI : +40-120 % · 4,6★ · 90 j ou remboursé         |
| 8 | CTA         | 1590-1800 | 7 s   | "Sachez quels deals vous perdez en silence"          |

## Système de design

- **Couleurs** (`src/theme.ts`)
  - `bg #0A0A0A` · `text #F4F1EA` · `gold #F5B544` · `red #E25241`
- **Typographies** (Google Fonts via `@remotion/google-fonts`)
  - Display : **Fraunces** (variable serif, weights 300-900)
  - Serif italic : **Instrument Serif** (citations / sous-titres éditoriaux)
  - Mono : **JetBrains Mono** (data, chrome, métadonnées)
- **Easings** (`src/lib/easings.ts`)
  - `enter` — `cubic-bezier(0.16, 1, 0.3, 1)` Apple-like decelerator
  - `mask` — `cubic-bezier(0.77, 0, 0.175, 1)` reveal cinématique
  - `editorial`, `pop`, `exit`

Toutes les animations passent par `useCurrentFrame()` + `interpolate()`.
Pas de transitions/animations CSS (interdit en Remotion).

## Pré-requis HtmlInCanvas (scène Demo)

La scène `Demo` utilise `<HtmlInCanvas>` (Remotion 4.0.459) pour appliquer
un blur 2D sur une vraie fiche Google qui se "défloute" pendant que la note
passe de 3,3 à 4,6 étoiles. Cette feature exige :

1. **Chrome 149+** (download : <https://googlechromelabs.github.io/chrome-for-testing/>)
2. **Flag `chrome://flags/#canvas-draw-element` activé** dans Chrome (preview Studio)
3. **Renderer `--gl=angle`** (déjà configuré dans `remotion.config.ts`)

Pour le rendu CLI, Remotion télécharge Chrome 149.0.7790.0 automatiquement.

## Lancer

```bash
npm i
npm run dev          # Studio sur http://localhost:3000
```

## Rendre

```bash
# Master 16:9
npx remotion render RaiseMedia-16x9 out/raisemedia-16x9.mp4

# Social 9:16
npx remotion render RaiseMedia-9x16 out/raisemedia-9x16.mp4

# Frame check (still)
npx remotion still RaiseMedia-16x9 out/check.png --frame=1180 --scale=0.5
```

## Audio (slots prêts)

Les fichiers ne sont pas inclus. Pour activer le son :

1. Place les fichiers dans `public/audio/`
   - `music.mp3`     — bed musical 60 s, ~ −14 LUFS
   - `sfx-hits.mp3`  — bed de whooshes/dings synchronisé sur les cuts
     (ColdOpen→Problem à 4 s, Problem→Cost à 13 s, Pivot à 20 s,
     RAISE™ reveal à 22 s, Demo clear à ~38 s, Results à 44 s, CTA à 53 s)
2. Dans `src/compositions/MainSixteenNine.tsx`, passe `ENABLE_MUSIC`
   et/ou `ENABLE_SFX` à `true`.

Pas de voix-off : tout est porté par la kinetic typography.

## Inspirations / parti pris

Apple keynote (typographie serif éditoriale, fond noir profond,
respirations longues, KPIs massifs), Linear/Vercel pour la grille
mono discrète, Pentagram/Bauhaus pour les chiffres-héros. Évite
délibérément les esthétiques génériques d'IA (purple-on-white,
Inter/Roboto, gradients pastel).
