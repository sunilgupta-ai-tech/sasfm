# Meridian FM — Facilities Management Landing Page

Frontend built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**.

## Structure
```
src/
  app/
    layout.tsx          # Root layout, SEO metadata
    page.tsx             # Homepage — assembles all sections
    globals.css          # Design tokens (colors, type, focus states, marquee keyframes)
    portfolio/
      page.tsx            # Portfolio listing (filterable grid)
      [slug]/page.tsx      # Individual project detail page
    blog/
      page.tsx            # Blog listing
      [slug]/page.tsx      # Individual blog post page
  components/
    Header.tsx             # Sticky nav: Home / About Us / Portfolio / Blog / Enquiry Now
    Footer.tsx
    TrustBar.tsx            # Infinite-scroll client wordmark marquee
    ScrollProgress.tsx      # Top-of-page scroll progress bar
    CountUp.tsx             # Animated count-up number (used in stats)
    PortfolioGrid.tsx       # Reusable filterable project grid
    BuildingSchematic.tsx   # Animated SVG building cross-section (legacy hero graphic)
    sections/
      Hero.tsx               # Split hero: dark panel + full-bleed video/placeholder
      GlobalScale.tsx        # 5-column "delivery at scale" stat band
      Offerings.tsx
      SoftServices.tsx
      About.tsx
      Portfolio.tsx          # Homepage portfolio preview
      BlogPreview.tsx        # Homepage blog preview
      CtaBanner.tsx
      Enquiry.tsx            # Lead form (frontend only for now — see below)
  data/
    content.ts              # All copy/content in one place for easy editing
```

## Run locally
```bash
npm install
npm run dev
```
Visit http://localhost:3000

## Adding your hero video
The hero (`src/components/sections/Hero.tsx`) is built for a full-bleed
background video, split-panel style. To add yours:

1. Drop your video file into `public/videos/` (e.g. `hero.mp4`), **or** have
   it hosted externally (S3, Cloudinary, etc.) — see `public/videos/README.txt`.
2. Open `src/components/sections/Hero.tsx` and set:
   ```ts
   const HERO_VIDEO_SRC = "/videos/hero.mp4"; // or a full https:// URL
   ```
3. Save — the video will autoplay, muted and looped, with a working
   play/pause button in the bottom-right corner.

Until you set a URL, the hero shows a designed placeholder graphic (a
stylized phone/work-order mockup) instead of a broken video element.

## Fonts note
This build uses system-font fallbacks (Space Grotesk / Inter / IBM Plex Mono
/ Fraunces-style serif stacks) because the sandbox this was built in has no
outbound access to Google Fonts. On your machine or in deployment (Vercel
etc.), you have internet access, so you can restore real webfonts with
`next/font/google` in `src/app/layout.tsx`:

```tsx
import { Space_Grotesk, Inter, IBM_Plex_Mono, Fraunces } from "next/font/google";
```

## Backend (next phase)
The Enquiry form in `Enquiry.tsx` currently logs the payload to the console.
It's already shaped to POST to `/api/enquiries` — that's the next thing to
wire up once the Node.js/Express + PostgreSQL backend is built. Portfolio
and blog content currently live in `src/data/content.ts` as static data —
these are the natural next things to move into the database too.
