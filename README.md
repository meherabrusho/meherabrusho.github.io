# Mohtasin Meherab Sikder — Developer Portfolio & Technical Blog

A high-performance, minimalist portfolio and technical blog showcasing the career, architectural case studies, and insights of **Mohtasin Meherab Sikder**, Lead Engineer at Samsung Electronics specializing in iOS Platforms, Connected IoT Ecosystems, and Agentic AI Orchestration.

Built with **Next.js 16 (Turbopack)**, **Tailwind CSS 4**, and **TypeScript**, engineered with sub-100ms static performance, an interactive multi-scene procedural canvas engine, and quantitative executive case studies.

---

## Key Features & Highlights

- **Multi-Scene Procedural AI Background Engine**:
  - Interactive HTML5 Canvas rendering mathematical representations of AI paradigms:
    - *Agentic Orchestration*: Autonomous multi-agent dispatch graphs and Model Context Protocol (MCP) telemetry pulses.
    - *High-Dimensional Embeddings*: Dynamic semantic vector clustering with cosine-similarity connections.
    - *Diffusion Denoising*: Silicon neural lattice denoising with focal crystallization.
  - **Route-Aware Auto-Dimming**: Canvas drops to a subtle watermark on reading routes (`/blog/[slug]` and `/projects/[slug]`) to preserve text contrast.
  - **Tab Inactivity Power Optimization**: Visibility lifecycle hooks suspend the `requestAnimationFrame` render loop when the browser tab is idle or hidden, consuming 0% idle CPU/GPU.

- **Executive Overview Bento Grids**:
  - Every architectural case study features an executive overview dashboard displaying **Role**, **Domain**, **Key Impact KPI badge** (e.g. *80%+ Automated Triage*, *400+ Files · 0 Regressions*), and **Core Tech**.

- **Editorial Visual Rhythm**:
  - Left-aligned header hierarchy with uppercase kicker anchors across all sections.
  - Responsive continuous timeline rail with aligned status nodes on both mobile and desktop.
  - Elevated glassmorphic surfaces (`.glass-card`) with crisp contrast in both dark and light modes.

- **Markdown & Diagram-Driven Case Studies**:
  - Case studies and blog posts authored in markdown (`src/content/projects/` and `src/content/blog/`) with frontmatter metadata schemas, code highlighting, and client-side Mermaid architectural diagrams.

---

## Technical Stack

- **Framework**: Next.js 16 (App Router, Turbopack, Full Static Site Generation / SSG)
- **Language**: TypeScript 5 with strict type safety
- **Styling**: Tailwind CSS 4 with `@tailwindcss/typography`
- **Themes**: System-aware light/dark mode via `next-themes`
- **Markdown & Diagrams**: `gray-matter`, `react-markdown`, `mermaid`
- **Graphics**: HTML5 Canvas 2D Context with adaptive device pixel ratio (DPR) scaling
- **Deployment**: Static export hosted on GitHub Pages (`gh-pages`)

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
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Lint & Type Check
```bash
npm run lint
```

### 4. Build Production Bundle
Verifies TypeScript compilation, linting, and SSG generation across all dynamic routes:
```bash
npm run build
```

---

## Deployment

This portfolio is configured for static export to GitHub Pages.

To trigger the automated build and publish to the `gh-pages` branch:
```bash
npm run deploy
```

---

## Project Structure

```text
├── src/
│   ├── app/                               # Next.js App Router
│   │   ├── layout.tsx                     # Root layout with ThemeProvider & SiteBackground
│   │   ├── page.tsx                       # Home page (Hero, Expertise, Experience, Skills, Featured Projects)
│   │   ├── globals.css                    # Tailwind CSS 4 design tokens, glassmorphism, animations
│   │   ├── projects/
│   │   │   ├── page.tsx                   # Projects catalog with KPI impact badges
│   │   │   └── [slug]/page.tsx            # Project case study with Executive Bento Grid
│   │   └── blog/
│   │       ├── page.tsx                   # Technical blog index
│   │       └── [slug]/page.tsx            # Blog post reading view
│   ├── components/                        # UI Components
│   │   ├── SiteBackground.tsx             # Route-aware background coordinator
│   │   ├── Navbar.tsx                     # Navigation header with theme toggle & resume link
│   │   ├── Footer.tsx                     # Site footer
│   │   ├── ExperienceTimeline.tsx         # Mobile-responsive continuous career timeline
│   │   ├── Mermaid.tsx                    # Mermaid architecture diagram renderer
│   │   ├── AnimateOnScroll.tsx            # IntersectionObserver entrance animation wrapper
│   │   └── background/                    # Multi-scene AI canvas engine
│   │       ├── BackgroundEngine.tsx       # Canvas render loop, scroll tracker & visibility hooks
│   │       ├── OrchestrationScene.ts      # Agentic AI MCP orchestration scene
│   │       ├── EmbeddingsScene.ts         # High-dimensional vector space scene
│   │       ├── DiffusionScene.ts          # Silicon neural core diffusion scene
│   │       └── core.ts                    # Layout math, color palettes, ease curves
│   ├── content/                           # Markdown content files
│   │   ├── projects/                      # Architectural case study markdown files
│   │   └── blog/                          # Technical blog posts
│   ├── data/                              # Structured resume data
│   │   ├── experiences.ts                 # Career roles & responsibilities
│   │   ├── skills.ts                      # Categorized technology stack
│   │   └── achievements.ts                # Patents, awards, and education
│   └── lib/                               # Data loaders & parsers
│       ├── projects.ts                    # Project metadata & markdown parser
│       └── blog.ts                        # Blog post reader & frontmatter parser
├── public/                                # Static media assets (PDF resume, icons)
├── tests/                                 # Playwright E2E test specs
└── README.md
```

---

## License

MIT © [Mohtasin Meherab Sikder](https://github.com/meherabrusho)
