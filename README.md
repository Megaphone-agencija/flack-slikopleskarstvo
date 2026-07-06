# FLACK d.o.o. — Spletna stran

Marketinška spletna stran za podjetje **FLACK d.o.o.** (Ljubljana), ki se ukvarja s slikopleskarstvom, fasadami in zaključnimi deli. Cilj strani je predstavitev podjetja, storitev in generiranje povpraševanj lokalnih strank (Ljubljana in okolica).

- **Živa verzija (preview):** https://id-preview--1b9aea57-1fa0-4314-8cbf-5978bd5cae72.lovable.app
- **Objavljena verzija:** https://sparkle-build-studio-69.lovable.app
- **Urejanje preko Lovable:** https://lovable.dev (projekt je dvosmerno sinhroniziran z GitHub repotijem)

---

## Trenutna faza

**Faza 1 — vsebinska adaptacija je zaključena.**

Stran je bila remixana iz obstoječega gradbenega template-a in prilagojena novi stranki (FLACK d.o.o.):

- Zamenjani vsi podatki podjetja (naslov, telefon, email, davčna, matična).
- Prevzeta barvna shema iz logotipa (električno modra kot accent).
- Storitve preurejene v: slikopleskarstvo, fasade, dekorativni ometi, gletanje sten, barvanje lesa in kovin, zaključna dela.
- Ključno sporočilo "Cena na ključ" izpostavljeno v heroju, marquee vrstici in spodnji CTA sekciji.
- Zamenjane vse ključne fotografije (hero, storitve, "zakaj izbrati nas", CTA background) s stranki poslanimi originali ali z AI generiranimi "iPhone-style" fotografijami.
- Trust metrike usklajene (350+ prostorov, 50+ fasad, 15+ let izkušenj, ocena 4.8).
- Lokacijska značka "Ljubljana in okolica" nad naslovom.

### Kaj še ni narejeno

- **Podstrani `/storitve`, `/o-nas`, `/kontakt`** — routing obstaja (`src/App.tsx`), komponente strani so v `src/pages/`, a še vedno vsebujejo predvsem placeholder vsebino. Domača stran (`/`) je edina v celoti izdelana.
- **Kontaktni obrazec** — trenutno CTA gumbi vodijo na `tel:` in `mailto:` linke. Ni backenda, ni obrazca s pošiljanjem.
- **Galerija realizacij** — omenjena kot ideja, še ni implementirana.
- **SEO / metadata za podstrani** — nastavljeno je samo za root (`index.html`).
- **Analitika** — ni priklopljena.
- **Optimizacija slik** — nekaj `.jpg` / `.webp` je večjih; pred produkcijo bi bilo smiselno urediti responsive `srcset` in resample.

---

## Tehnološki sklad

| Področje       | Izbrano                                                                 |
| -------------- | ----------------------------------------------------------------------- |
| Framework      | **React 18** + **Vite 5** + **TypeScript 5**                             |
| Styling        | **Tailwind CSS v3** (semantični tokeni v `src/index.css`)                |
| UI komponente  | **shadcn/ui** (Radix) — v `src/components/ui/`                           |
| Animacije      | **framer-motion**                                                        |
| Routing        | **react-router-dom v6**                                                  |
| Ikone          | **lucide-react**                                                         |
| Data fetching  | **@tanstack/react-query** (pripravljen provider, še ne uporabljen)       |
| Obrazci        | **react-hook-form** + **zod** (pripravljen, še ne uporabljen)            |
| Testi          | **vitest** + **@testing-library/react**                                  |
| Backend        | Trenutno **ni backenda**. Če bo potreben (obrazec, admin), priporočam Lovable Cloud (Supabase pod pokrovom). |

---

## Struktura projekta

```
src/
├── assets/              # Slike (hero, storitve, logo, cta background)
├── components/
│   ├── ui/              # shadcn/ui primitivi — ne urejati direktno
│   ├── Navbar.tsx       # Zgornja navigacija + brand + CTA
│   ├── Footer.tsx       # Footer s kontaktnimi podatki
│   └── NavLink.tsx
├── hooks/               # use-mobile, use-toast
├── lib/utils.ts         # cn() helper (clsx + tailwind-merge)
├── pages/
│   ├── Index.tsx        # Domača stran — glavnina vsebine je tu
│   ├── Storitve.tsx     # Placeholder
│   ├── ONas.tsx         # Placeholder
│   ├── Kontakt.tsx      # Placeholder
│   └── NotFound.tsx
├── test/                # Vitest setup
├── App.tsx              # Router, providers
├── index.css            # Design tokeni (HSL barve, radiusi, sencke)
└── main.tsx
```

### Design sistem

Vse barve, gradientni in sencke so **semantični tokeni** definirani v `src/index.css` (HSL) in izpostavljeni preko `tailwind.config.ts`. Uporabljaj razrede tipa `bg-background`, `text-foreground`, `bg-accent`, `border-border` — **nikoli** hardcoded razredov kot `bg-white`, `text-black` ali `bg-[#...]`. To ohranja doslednost teme in omogoča prihodnje spremembe brez posegov po komponentah.

Ključni tokeni (glej `src/index.css`):
- `--accent: 214 95% 50%` — električno modra iz logotipa, glavna brand barva
- `--primary`, `--foreground`, `--background` — usklajeni z logom
- Tipografija, radiusi in sencke so prav tako v tokenih

---

## Lokalni razvoj

Predpogoji: **Node.js 18+** in **npm** (ali bun/pnpm).

```bash
# 1. Kloniraj repo
git clone <repo-url>
cd <folder>

# 2. Namesti odvisnosti
npm install

# 3. Zaženi dev server
npm run dev
# → http://localhost:8080

# 4. Build za produkcijo
npm run build

# 5. Lint & testi
npm run lint
npm run test
```

Vite dev server teče na portu **8080** (glej `vite.config.ts`).

---

## Delo preko Lovable vs. lokalno

Repo je povezan z Lovable projektom preko **dvosmerne GitHub sinhronizacije**:

- Spremembe narejene v Lovable UI se avtomatsko commitajo v ta repo.
- Push v ta repo (iz lokalnega IDE ali GitHub UI) se avtomatsko odrazi v Lovable preview-u.

Torej lahko developer nadaljuje delo **v Lovable UI, v svojem IDE lokalno, ali kombinirano** — brez ročne sinhronizacije.

Za popolno prevzemanje projekta (self-hosting izven Lovable) preprosto deployaj build (`npm run build` → `dist/`) na katerikoli statični host (Vercel, Netlify, Cloudflare Pages, S3 + CDN).

---

## Predlagani naslednji koraki

Priporočen vrstni red za novega developerja:

1. **Storitve** (`src/pages/Storitve.tsx`) — najbolj konverzijsko relevantna podstran; podrobnejši opis vsake storitve, cenovni okvir, foto galerija.
2. **Kontakt** (`src/pages/Kontakt.tsx`) — kontaktni obrazec (react-hook-form + zod je že v odvisnostih), Google Maps embed, delovni čas. Za pošiljanje mailov: Lovable Cloud edge function ali npr. Resend API.
3. **O nas** (`src/pages/ONas.tsx`) — zgodba podjetja, izkušnje, morda ekipa.
4. **Galerija realizacij** — nova sekcija ali podstran s fotografijami pred/po.
5. **SEO** — `react-helmet-async` ali podobno za per-page `<title>` in `<meta>`; strukturirani podatki (LocalBusiness JSON-LD) za lokalno vidnost.
6. **Analitika** — Plausible / GA4.
7. **Optimizacija slik** — pretvorba v `.webp` z več velikostmi, `loading="lazy"`, `srcset`.

---

## Kontaktni podatki stranke (za referenco)

- **FLACK d.o.o.**, Voduškova ulica 21, 1000 Ljubljana
- Tel: **040 296 555**
- E: **sliko.flackdoo@gmail.com**
- Davčna: 21943788 · Matična: 9845640000
- Bizi profil: https://www.bizi.si/FLACK-D-O-O/
