# Kominictví Štěstí — Web

Prémiový firemní web pro kominictví postavený na Next.js 15 + TailwindCSS + Framer Motion.

## 🚀 Nasazení na Vercel (doporučeno)

### Metoda 1: GitHub + Vercel (nejjednodušší)

1. **Nahraj projekt na GitHub**
   - Jdi na [github.com/new](https://github.com/new)
   - Vytvoř nový repozitář (např. `kominictvi-stesti`)
   - Postupuj dle pokynů GitHubu pro upload složky

2. **Připoj Vercel**
   - Jdi na [vercel.com](https://vercel.com) a přihlas se
   - Klikni **"Add New Project"**
   - Vyber svůj GitHub repozitář
   - Vercel automaticky detekuje Next.js
   - Klikni **"Deploy"**

3. **Hotovo!** 🎉
   - Web bude dostupný na `твой-projekt.vercel.app`
   - Pro vlastní doménu jdi do Settings → Domains

### Metoda 2: Vercel CLI

```bash
# Nainstaluj Vercel CLI
npm install -g vercel

# Vstup do složky projektu
cd kominictvi-stesti

# Nainstaluj závislosti
npm install

# Deploy
vercel

# Nebo pro produkci
vercel --prod
```

## 💻 Lokální vývoj

```bash
npm install
npm run dev
# Web běží na http://localhost:3000
```

## 📁 Struktura projektu

```
src/
  app/
    layout.tsx      # Root layout + metadata SEO
    page.tsx        # Hlavní stránka
    globals.css     # Globální styly + animace
  components/
    Cursor.tsx      # Custom cursor
    Loader.tsx      # Loading screen
    ScrollProgress.tsx
    Navbar.tsx      # Navigace + mobile menu
    Hero.tsx        # Hero sekce
    About.tsx       # O nás
    Services.tsx    # Služby (8 karet)
    Sections.tsx    # WhyUs, Steps, Reviews, Gallery, Certs
    Contact.tsx     # Kontakt + formulář
    Footer.tsx      # Footer
  hooks/
    useReveal.ts    # Scroll reveal animace
```

## 🎨 Technologie

- **Next.js 15** — React framework
- **TypeScript** — typová bezpečnost
- **TailwindCSS** — utility CSS
- **Framer Motion** — animace (připraveno)
- **Google Fonts** — Cormorant Garamond + Syne

## 📱 Funkce

- ✅ Cinematic dark luxury design
- ✅ Custom ember cursor
- ✅ Loader s reveal animací
- ✅ Scroll progress bar
- ✅ Smoke & ember particle efekty
- ✅ Scroll reveal animace
- ✅ Responzivní (mobile-first)
- ✅ Mobile hamburger menu
- ✅ SEO metadata (OpenGraph)
- ✅ Kontaktní formulář
- ✅ 8 service karet
- ✅ 6 zákaznických referencí
- ✅ Galerie projektů
- ✅ Certifikace sekce

## 🔧 Přizpůsobení

Změň telefonní číslo a e-mail na svůj:
- `src/components/Navbar.tsx` — `tel:` číslo
- `src/components/Contact.tsx` — kontaktní údaje
- `src/components/Footer.tsx` — kontaktní údaje
- `src/app/layout.tsx` — SEO metadata
