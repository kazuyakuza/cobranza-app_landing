# Cobranza App Landing Page

Professional landing page for **Cobranza App**, a SaaS platform for debt management and payment reconciliation. Built to generate leads and onboard users to the Beta program.

## Tech Stack

- **Vue.js 3** — Composition API with `<script setup>`
- **TypeScript** — Type-safe development
- **Bootstrap 5** — Responsive UI framework
- **Vite** — Build tool and dev server

## Language Rules

- **All user-facing content** (texts, headings, buttons): Neutral **Spanish**
- **All development artifacts** (code, component names, folders, variables, documentation): **English**

## Getting Started

### Prerequisites

- Node.js 18+ (LTS)
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── assets/
│   ├── images/            # Static images
│   └── icons/             # Icon assets
├── components/
│   └── landing/           # Landing page section components
├── composables/           # Reusable composition functions
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
├── App.vue                # Root component
└── main.ts                # Application entry point
```

## Deployment

This project is configured for deployment to **GitHub Pages**.

### Build

```bash
npm run build
```

The static files are generated in the `dist/` directory.

### Deploy to GitHub Pages

#### Option A — Manual (gh-pages branch)

1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy the `dist/` folder to the `gh-pages` branch:
   ```bash
   npx gh-pages -d dist
   ```
   > Requires `gh-pages` package: `npm install --save-dev gh-pages`

3. In the repository settings on GitHub, set **Pages** source to the `gh-pages` branch.

#### Option B — GitHub Actions (recommended)

Create `.github/workflows/deploy.yml` with the following workflow:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

In the repository settings on GitHub, set **Pages** source to the `gh-pages` branch.

### Live URL

Once deployed, the site will be available at:

**https://kazuyakuza.github.io/cobranza-app_landing/**

### Important Notes

- The project is a **single-page application without client-side routing**, so no `404.html` redirect is required.
- The `vite.config.ts` `base` path is already set to `/cobranza-app_landing/` for correct asset loading on GitHub Pages.
- The Open Graph `og:image` meta tag references an image that does not yet exist. Create and add `og-image.png` to the `public/` folder before sharing the site publicly.

## Project Brief

See [Project Brief](.agent/project-info/brief.md) for full requirements and scope.

---

*Built with Vue 3 + TypeScript + Bootstrap 5*