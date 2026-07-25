# Mohtasin Meherab Sikder — Developer Portfolio & Blog

A premium, minimalistic developer portfolio showcasing the career, projects, and insights of **Mohtasin Meherab Sikder**, Lead Engineer at Samsung Electronics specializing in iOS, IoT, and Agentic AI.

Developed using **Next.js 16**, **Tailwind CSS 4**, and **TypeScript**, styled with a focus on clean typography, responsive layout, glassmorphic cards, and high-quality dark mode integration.

---

## Technical Stack & Architecture

- **Framework**: Next.js 16 (App Router, Turbopack, Server/Client components)
- **Styling**: Tailwind CSS 4 with `@tailwindcss/typography`
- **Branding & Theme**: Premium dark-mode prioritized aesthetic using `next-themes`
- **Data Layer**: Clean TypeScript models for structured experience timeline, skills, and achievements
- **Deployment**: Configured for GitHub Pages via `gh-pages`

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

### 3. Build & Type Check
Verify that the production build compiles successfully:
```bash
npm run build
```

---

## Deployment

This portfolio is configured to deploy directly to GitHub Pages.

To trigger the deploy pipeline (which runs build and pushes the static assets to the `gh-pages` branch):
```bash
npm run deploy
```

---

## Project Structure

- `src/app/` — Pages and layout configuration
- `src/components/` — Reusable UI modules (Timeline, Navbar, Footer, ThemeToggle)
- `src/data/` — Static data assets (experiences, skills, achievements, projects)
- `src/lib/` — Helper scripts (e.g. blog post parser)
- `public/` — Static media assets (PDFs, images)
