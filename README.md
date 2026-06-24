<div align="center">

# 🦇 VAMPGEN

### _Gothic Fashion for the Modern Soul_

Premium gothic-fashion eCommerce experience for Gen-Z — **midnight velvet, dark academia, vampire chic.**
An animation-rich, fully-responsive storefront built as a showcase of modern front-end engineering and motion design.

<br/>

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=for-the-badge&logo=framer&logoColor=white)

[**Live Demo**](#) · [Features](#-features) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [Roadmap](#-roadmap)

</div>

---

## Overview

**VAMPGEN** is a high-fidelity, single-page eCommerce storefront for a fictional gothic fashion brand. It pairs a cohesive dark design system with cinematic scroll interactions and complete shopping flows — catalog → product → cart → checkout — all driven by a single, strongly-typed product catalog.

The project is intentionally built like a real product: a reusable component library, a typed data layer, route-based pages, and a variant-aware cart with persistence. It is designed to demonstrate production-grade front-end architecture, motion design, and attention to detail.

> 🎯 **Why it exists:** a portfolio piece to showcase modern React/TypeScript engineering, design-system thinking, and (soon) full-stack capability with a dedicated API backend.

---

## ✨ Features

| | |
|---|---|
| 🛍️ **Product catalog** | Detail pages (`/product/:slug`) with image gallery, size & colour variants, related products |
| 🔍 **Shop & filtering** | `/shop` listing with category filters and live sorting (featured, price, name) |
| 🌑 **Collection pages** | Four themed "World" collections (`/world/:slug`) with cinematic hero treatments |
| 🛒 **Variant-aware cart** | Lines keyed by product + size + colour, quantity stepper, `localStorage` persistence |
| 🎞️ **Cinematic motion** | Scroll-driven horizontal Lookbook, parallax hero, custom cursor, film-grain overlay |
| 📱 **Fully responsive** | Adaptive layouts and a scroll effect that recalculates travel for any viewport |
| ♿ **Considered UX** | Toast feedback, empty/loading states, keyboard-reachable controls, reduced-motion aware |

---

## 🧱 Tech Stack

**Core**
- **React 19** + **TypeScript** — strict, component-driven UI
- **Vite 7** — lightning-fast dev/build tooling
- **React Router 7** — route-based pages & navigation

**Styling & UI**
- **Tailwind CSS 3.4** with a custom gothic design token system (`void` · `blood` · `ember` · `bone`)
- **shadcn/ui** (Radix primitives) — accessible component foundation
- **Cinzel** + **Inter** typography

**Motion**
- **Framer Motion** — scroll-linked animation, layout transitions, gestures
- **GSAP** + **Lenis** — smooth scrolling & timeline effects

**Tooling & DX**
- **Zod** — schema validation · **Sonner** — toasts · **lucide-react** — icons
- **ESLint** + **TypeScript ESLint**

---

## 📸 Screenshots

> _Drop captures into `docs/screenshots/` and they'll render here._

| Hero | Product Detail | Collection |
|---|---|---|
| ![Hero](docs/screenshots/hero.png) | ![Product](docs/screenshots/product.png) | ![Collection](docs/screenshots/world.png) |

---

## 🚀 Getting Started

**Prerequisites:** Node.js 20+ and npm.

```bash
# 1. Clone
git clone https://github.com/Avan1sh/VampGen.git
cd VampGen

# 2. Install dependencies
npm install

# 3. Start the dev server (http://localhost:3000)
npm run dev
```

**Available scripts**

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## 🗂️ Project Structure

```
src/
├── components/          # Reusable UI (Navbar, ProductCard, CustomCursor, ui/*)
├── context/             # CartContext — variant-aware, persisted cart state
├── data/                # products.ts — single typed catalog + collections
├── hooks/               # useSmoothScroll, useScrollPosition, useReducedMotion…
├── pages/               # HomePage, ShopPage, WorldPage, ProductDetailPage, CartPage
├── sections/            # Landing sections (Hero, Lookbook, Featured, Editorial…)
├── types/               # Product / CartItem types + price helpers
├── App.tsx              # Routes + global chrome
└── main.tsx             # Entry (Router + CartProvider)
```

---

## 🏗️ Architecture Highlights

- **Single source of truth** — every section, page and the cart read from one typed `products.ts` catalog; no duplicated product data.
- **Variant-aware cart** — items are keyed by `productId + size + colour`, so the same garment in different variants are distinct lines; state is persisted to `localStorage` and hydrated synchronously to avoid flashes.
- **Responsive scroll-driven Lookbook** — horizontal travel is measured at runtime (`trackWidth − viewportWidth`) so the scroll effect is pixel-accurate on a phone, a laptop, or an ultra-wide.
- **Composable, accessible components** — Radix-based `ui/` primitives + a shared `ProductCard` with a stretched-link pattern for valid, accessible navigation.

---

## 🗺️ Roadmap

- [x] **Phase 1** — Typed catalog + Product Detail Pages + variant cart
- [x] **Phase 2** — Shop page (filter/sort) + four collection pages
- [ ] **Phase 3** — Client-side search, wishlist, 404 + dead-end cleanup
- [ ] **Phase 4** — Multi-step checkout + order confirmation
- [ ] **Phase 5** — Deploy (Vercel), social/OG meta, Lighthouse & a11y pass
- [ ] **Backend** — REST API (Node · PostgreSQL · Prisma): catalog, auth, cart & orders — see [`docs/BACKEND.md`](docs/BACKEND.md)

---

## 📝 License

Released under the [MIT License](LICENSE).

## 👤 Author

**Avanish** — [@Avan1sh](https://github.com/Avan1sh)

<div align="center"><br/><sub>Designed with 🖤 in the dark.</sub></div>
