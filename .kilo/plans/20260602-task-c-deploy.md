# Task C — Deployment Preparation (GitHub Pages)

## Source

- TODO: `.agent/todos/20260602/20260602-todo-1.md` — Task 5: Deployment Preparation (GitHub Pages)
- Global Plan: `.kilo/plans/1780438189741-quiet-cabin.md`

## Discovery Summary

| Item | Value |
|------|-------|
| GitHub Username | `kazuyakuza` |
| Repository Name | `cobranza-app_landing` |
| GitHub Pages URL | `https://kazuyakuza.github.io/cobranza-app_landing/` |
| Project Type | Single-page Vue 3 landing (no `vue-router`) |
| Current `base` | Not set (defaults to `/`) |
| Current `homepage` | Not set in `package.json` |

## Current State Verification

### `vite.config.ts`
```ts
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
```

### `package.json`
- No `homepage` field.
- Scripts: `dev`, `build`, `preview`, `lint`.

### `index.html`
- `<meta property="og:url" content="https://cobranza-app.github.io/landing/" />` — **incorrect**, does not match actual repo.
- `<meta property="og:image" content="https://cobranza-app.github.io/landing/og-image.png" />` — **incorrect**, does not match actual repo.
- No actual `og-image.png` file exists in `public/` or `src/assets/`.

### `README.md`
- Sections: Getting Started, Tech Stack, Project Structure, Project Brief.
- No deployment instructions.

## Planned Edits

### Edit 1 — `vite.config.ts` (add `base`)

**Old:**
```ts
export default defineConfig({
  plugins: [vue()],
```

**New:**
```ts
export default defineConfig({
  base: '/cobranza-app_landing/',
  plugins: [vue()],
```

**Rationale:** GitHub Pages serves the site under the repository sub-path. Without this, asset and script paths will 404.

---

### Edit 2 — `package.json` (add `homepage`)

**Old:**
```json
  "private": true,
  "type": "module",
```

**New:**
```json
  "private": true,
  "homepage": "https://kazuyakuza.github.io/cobranza-app_landing/",
  "type": "module",
```

**Rationale:** Standard metadata for GitHub Pages deployments; used by some tooling and documentation.

---

### Edit 3 — `index.html` (fix `og:url`)

**Old:**
```html
    <meta property="og:url" content="https://cobranza-app.github.io/landing/" />
```

**New:**
```html
    <meta property="og:url" content="https://kazuyakuza.github.io/cobranza-app_landing/" />
```

---

### Edit 4 — `index.html` (fix `og:image`)

**Old:**
```html
    <meta property="og:image" content="https://cobranza-app.github.io/landing/og-image.png" />
```

**New:**
```html
    <meta property="og:image" content="https://kazuyakuza.github.io/cobranza-app_landing/og-image.png" />
```

**Rationale:** OG tags currently point to a non-existent domain and path. Must match the actual GitHub Pages URL. The image file itself does not exist yet — this is a documented limitation to be resolved in a future task.

---

### Edit 5 — `README.md` (add Deployment section)

Insert a new "## Deployment" section immediately before the existing "## Project Brief" section.

**Old:**
```markdown
## Project Brief

See [Project Brief](.agent/project-info/brief.md) for full requirements and scope.
```

**New:**
```markdown
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
```

---

## Verification Checklist

| # | Check | Command / Method |
|---|-------|-----------------|
| 1 | `vite.config.ts` contains `base: '/cobranza-app_landing/'` | Read file |
| 2 | `package.json` contains `homepage` field with correct URL | Read file |
| 3 | `index.html` OG tags use `kazuyakuza.github.io/cobranza-app_landing` | Read file |
| 4 | `README.md` has Deployment section | Read file |
| 5 | Production build succeeds without errors | `npm run build` |
| 6 | `dist/` folder is generated and contains `index.html` and assets | List `dist/` |
| 7 | No `vue-router` present (confirmed — single page) | Check `App.vue` imports |

## Risks & Limitations

1. **OG Image Missing**: No `og-image.png` exists in `public/` or `src/assets/`. The `og:image` URL is updated to the correct path, but the file must be created separately.
2. **No GitHub Actions Workflow Yet**: The README documents the workflow file, but the file itself is not created in this task. Can be added later.
3. **SPA Routing**: Not applicable (no router), but if routing is added later, a `404.html` redirect must be implemented.

## Out of Scope

- Creating the actual `og-image.png` asset.
- Creating the `.github/workflows/deploy.yml` file (documented in README for future implementation).
- Installing `gh-pages` npm package.
- Actually deploying to GitHub Pages (build and verify only).
