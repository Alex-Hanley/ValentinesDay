# Valentine — Hailey

A single-page Valentine site: soft, modern, with floating photos and a glassmorphism card.

## Setup

1. **Dependencies**
   ```bash
   npm install
   ```

2. **Images**  
   Photos in `Images/` are copied to `public/Images` when you run:
   ```bash
   npm run copy-images
   ```
   This also runs automatically before `npm run dev`.

3. **Run**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

## Tech

- **Next.js 14** (App Router)
- **TailwindCSS**
- **Framer Motion**
- **TypeScript**

## Structure

```
Valentines/
├── app/
│   ├── layout.tsx      # Fonts, metadata
│   ├── page.tsx        # Main page (5s transition, state)
│   └── globals.css
├── components/
│   ├── AnimatedBackground.tsx  # Gradient, glow, grain, particles
│   ├── FloatingElements.tsx   # Images + hearts, mouse avoidance, dimming
│   └── GlassCard.tsx          # “HAILEY!” + “Will you be my Valentine?”
├── hooks/
│   └── useMouseAvoidance.ts   # Mouse position + smooth offset math
├── lib/
│   └── image-list.ts          # Image filenames (from Images/)
├── public/
│   └── Images/                # Populated by copy-images
├── scripts/
│   └── copy-images.js         # Copies Images/ → public/Images
└── package.json
```

## Behaviour

- **Load:** Page fades in; photos and hearts float and drift.
- **Mouse:** Moving the cursor near a photo or heart pushes it away smoothly.
- **After ~5s:** Floaters dim to 40% and blur; the glass card slides up with “HAILEY!” and “Will you be my Valentine?”.

To add/remove photos, update the `Images/` folder and run `npm run copy-images`; then update `lib/image-list.ts` to match the filenames (or change the script to write that list automatically).
