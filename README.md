# SAI Digital (Concentrix Company) - Enterprise Digital Commerce Website

[![Next.js](https://img.shields.io/badge/Next.js-16.3.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Bun](https://img.shields.io/badge/Bun-1.3-FBF0DF?style=for-the-badge&logo=bun)](https://bun.sh/)

A pixel-perfect, high-performance enterprise digital commerce web platform modeled after **[SAI Digital](https://www.sai-digital.com/)** (A Concentrix Company), engineered with **Next.js 16**, **React 19**, and **Turbopack**.

---

## 🌟 Highlights & Features

- **Fluid Full-Width Layout**: Designed for modern ultra-wide displays down to mobile devices without artificial container constraints, featuring tailored edge-to-edge spacing (`px-6 sm:px-10 lg:px-14 xl:px-16`).
- **Brand Typography & Color Harmony**:
  - Fonts: **Rubik** (Headings) & **Montserrat** (Body text & Subtitles).
  - Primary Accents: Signature cyan (`#7ceee0` / `#25E2CC`) set against sleek dark backgrounds (`#0A0D0E`, `#141718`).
- **Real-Time Global APAC Clocks**: Dynamic local clocks for 7 regional delivery hubs: Singapore, Japan, Australia, Hong Kong, Vietnam, South Korea, and India.
- **Interactive MegaMenu**: Fullscreen overlay modal navigation with category tabs (Services, Products, Work, Insights, Company).
- **Infinite Partner Marquee**: Smooth two-tier infinite horizontal logo slider showcasing global technology partners (SAP, Adobe, commercetools, Shopify Plus, Salesforce, etc.).
- **Complete Enterprise Pages**:
  - `Home (/)`: Hero banner, 4 Core Service Pillars, Case Studies slider, SmartCX showcase, Testimonials, Insights list, Culture, and Contact CTA.
  - `Our Work (/our-work)`: Filterable case studies portfolio across Consumer Goods, Manufacturing, Finance, and Electronics.
  - `Company (/company)`: Mission, global team presence, core values, and key stats.
  - `Our People (/people)`: Leadership governance, industry experts directory, quotes, and culture in motion showcase.
  - `Services (/services/all-services)`: Detailed breakdown of Strategy & Design, Enterprise Technology, Data & Analytics, and CX Operations.
  - `SmartCommerce (/smartcommerce)` & `SpeedX (/speedx)`: Proprietary AI modules and acceleration engines.
  - `Testimonials (/testimonial)`: Enterprise customer reviews and testimonials.
  - `Insights (/insights)` & `Article Details (/articles/[slug])`: Thought leadership articles with metadata.
  - `Contact Us (/contact-us)`: Interactive inquiry form, direct channels, and regional office directory.
  - `Privacy & Terms (/privacy-policy, /sai-privacy)`: Enterprise data compliance, GDPR, CCPA, and SOC 2 Type II audit disclosures.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16.3.5 (App Router, Turbopack, React Server Components)
- **Library**: React 19.3.0 & React DOM 19.3.0
- **Language**: TypeScript 5.6
- **Styling**: Tailwind CSS 3.4, PostCSS, Autoprefixer
- **Icons**: Lucide React
- **Linter**: ESLint 9 (Flat Config via `eslint.config.mjs`)
- **Package Manager**: Bun 1.3+

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Bun](https://bun.sh/) installed:

```bash
# Verify bun installation
bun --version
```

### Installation

Clone the repository and install dependencies:

```bash
git clone git@github.com:hung55410-uiuxdesign/egead-company.git
cd egead-company
bun install
```

### Running Locally

Start the development server with Turbopack on port `3000`:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

---

## 📦 Scripts

| Command | Description |
|---|---|
| `bun run dev` | Starts development server on port `3000` with Turbopack hot reload |
| `bun run build` | Compiles an optimized static/SSR production bundle in sub-second time |
| `bun run start` | Runs the production build server locally |
| `bun run lint` | Lints the codebase with ESLint 9 flat configuration |

---

## 📁 Project Structure

```text
├── app/
│   ├── articles/[slug]/    # Dynamic insight article pages
│   ├── career/             # Careers and job openings
│   ├── company/            # Company overview and culture
│   ├── contact-us/         # Contact forms & global office directory
│   ├── insights/           # Insights and thought leadership list
│   ├── our-work/           # Work portfolio and case studies
│   ├── partners/           # Partner ecosystem
│   ├── privacy-policy/     # Privacy policy
│   ├── sai-privacy/        # Terms & conditions
│   ├── services/           # Services and capabilities
│   ├── smartcommerce/      # SmartCommerce product suite
│   ├── speedx/             # SpeedX commerce accelerator
│   ├── testimonial/        # Client reviews and testimonials
│   ├── global-error.tsx    # Next.js 16 Root Error Boundary
│   ├── layout.tsx          # Root Layout with fonts and theme configuration
│   └── page.tsx            # Homepage
├── components/             # Reusable UI sections and components
├── public/assets/          # Vector icons, logos, brand assets, and images
├── eslint.config.mjs       # ESLint 9 Flat Config
├── next.config.mjs         # Next.js configuration
├── package.json            # Dependencies and scripts
└── tailwind.config.ts      # Custom Tailwind styling and color tokens
```

---

## 📄 License

Private & Proprietary. All trademarks and brand assets belong to their respective owners.
