# Styling & Polish — Implementation Plan (Dark Theme)

## Task

Task 4 in `.agent/todos/20260521/20260521-todo-0.md`: Styling & Polish

## Objective

Define a consistent **dark-first professional color palette**, CSS custom properties, global typography/spacing, mobile UX polish, and scroll animations. The look must feel **near night mode** — dark backgrounds dominant — while retaining professional fintech polish through subtle shade variation, controlled accents, and contrast pockets.

---

## 1. Styling Audit (Current State)

### 1.1 What Already Exists

| Component | What's styled | Gap |
|---|---|---|
| `Navbar.vue` | `shadow-sm`, `bg-white`, scoped `.navbar` transition + `.nav-link` font/color | Uses default Bootstrap colors; must switch to dark |
| `HeroSection.vue` | Navy gradient (`#0a1f3f` → `#0d2b5e` → `#0f3460`), CTA hover effects, mobile media query | Hard-coded colors; already dark — good base |
| `App.vue` | No styling | No global styles or CSS variables |
| `main.ts` | Bootstrap CSS + Bootstrap Icons + Bootstrap JS | No custom global CSS imported |
| All other sections | Bare stubs: `<h2>Section Name</h2>` | No styling whatsoever |

### 1.2 Missing Infrastructure

- No CSS custom properties file
- No global typography imports (no Google Fonts)
- No global section spacing strategy
- No animation system
- No dark section alternation pattern

---

## 2. Dark-First Color Palette

### 2.1 Brand Palette Definition (Night-Mode Dominant)

Dark-slate/navy family as the core, with controlled lighter shades only for contrast accents (cards, borders, subtle highlights).

| CSS Variable | Value | Usage |
|---|---|---|
| `--color-bg-deepest` | `#080d1a` | Footer, deepest page background |
| `--color-bg-dark` | `#0c1528` | Dark sections, default dark bg |
| `--color-bg-navy` | `#112240` | Slightly lighter navy, section alternation |
| `--color-bg-slate` | `#1a2740` | Slate variation for visual separation |
| `--color-bg-card` | `#1e2d4a` | Card/panel backgrounds on dark sections |
| `--color-bg-card-alt` | `#243656` | Alternate card shade for nested contrast |
| `--color-border` | `#2a3f5f` | Subtle borders/dividers on dark bg |
| `--color-primary` | `#3b82f6` | Links, primary CTAs (vibrant blue on dark) |
| `--color-primary-hover` | `#2563eb` | Hover state for primary |
| `--color-accent` | `#10b981` | Navbar CTA, success/money indicators |
| `--color-accent-hover` | `#059669` | Hover state for accent |
| `--color-text-on-dark` | `#e2e8f0` | Primary text on dark backgrounds (slate-200) |
| `--color-text-on-dark-muted` | `#94a3b8` | Secondary/muted text on dark (slate-400) |
| `--color-text-on-dark-dim` | `#64748b` | Captions, tertiary info on dark (slate-500) |
| `--color-text-on-light` | `#1e293b` | Text on light backgrounds (if any) (slate-800) |
| `--color-white` | `#ffffff` | Pure white, sparingly used |

**Design principle**: 90% of the page uses the dark color family. Only the Beta accent section uses a vibrant blue gradient as the sole visual "breaker." Section separation is achieved through subtle navy/slate shade shifts (2-4% luminance difference), not through light-dark alternation.

### 2.2 Bootstrap Variable Overrides

```css
/* Override Bootstrap's default look for dark theme */
--bs-body-bg: var(--color-bg-deepest);
--bs-body-color: var(--color-text-on-dark);
--bs-primary: var(--color-primary);
--bs-primary-rgb: 59, 130, 246;
--bs-success: var(--color-accent);
--bs-success-rgb: 16, 185, 129;
--bs-link-color: var(--color-primary);
--bs-link-hover-color: var(--color-primary-hover);
--bs-border-color: var(--color-border);
--bs-heading-color: var(--color-text-on-dark);
```

### 2.3 Section Background Alternation (Dark-First)

Only Beta provides a bright contrast pocket. All others stay in the dark family with subtle variation.

| # | Section | Background | Text Color | Rationale |
|---|---|---|---|---|
| — | **Navbar** | `--color-bg-dark` + `backdrop-blur` | `--color-text-on-dark` | Dark glass-morphism sticky bar |
| 1 | **Hero** | `--color-bg-navy` gradient | `--color-white` | Deepest hero impact, brand anchor |
| 2 | **Problem** | `--color-bg-dark` | `--color-text-on-dark` | Deep dark, sets the night tone |
| 3 | **Solution** | `--color-bg-navy` | `--color-text-on-dark` | Slightly brighter navy, subtle shift |
| 4 | **Use Cases** | `--color-bg-slate` | `--color-text-on-dark` | Fresh slate tone, breaks monotony |
| 5 | **Features** | `--color-bg-dark` | `--color-text-on-dark` | Dark again; cards use `--color-bg-card` |
| 6 | **Beta** | `--color-primary` gradient | `--color-white` | **Sole bright contrast section** — draws attention to CTA |
| 7 | **Pricing** | `--color-bg-navy` | `--color-text-on-dark` | Back to dark after Beta pop |
| 8 | **FAQ** | `--color-bg-slate` | `--color-text-on-dark` | Slightly warmer dark for readability |
| 9 | **Contact** | `--color-bg-dark` | `--color-text-on-dark` | Returns to deepest dark |
| 10 | **Footer** | `--color-bg-deepest` | `--color-text-on-dark-muted` | Seamless page close |

**Visual flow**: The page opens dark, stays dark through subtle navy/slate variations, hits one bright Beta section, then returns to dark. The only "light" element is the Beta gradient — deliberate, high-impact contrast.

---

## 3. Typography

### 3.1 Font Stack

**Inter** from Google Fonts (variable weight) — clean, geometric, used by Stripe/GitHub for dark UIs.

```html
<!-- index.html <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
```

### 3.2 Bootstrap Font Override

```css
--bs-body-font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
--bs-body-font-size: 1rem;
--bs-body-line-height: 1.65;
```

### 3.3 Typography Scale

| Use | Size | Weight | Color |
|---|---|---|---|
| Section title | `2.25rem` (36px) | 700 | `--color-text-on-dark` |
| Section subtitle | `1.125rem` (18px) | 400 | `--color-text-on-dark-muted` |
| Body text | `1rem` (16px) | 400 | `--color-text-on-dark` |
| Card titles | `1.25rem` (20px) | 600 | `--color-text-on-dark` |
| Nav links | 0.95rem | 500 | `--color-text-on-dark-muted` (hover: `--color-text-on-dark`) |

---

## 4. Spacing & Layout Consistency

### 4.1 Section Padding

```css
section {
  padding-top: 5rem;     /* 80px */
  padding-bottom: 5rem;  /* 80px */
}
```

### 4.2 Navbar Offset

All scroll targets must account for navbar height. Extract the `70` constant to a shared module:

**File**: `src/utils/constants.ts`
```ts
export const NAVBAR_HEIGHT_PX = 70;
```

Import in `Navbar.vue`, `HeroSection.vue`, and any future components that scroll to sections.

---

## 5. Navbar Design — Dark Glass-Morphism

The navbar transitions from `bg-white` to a dark glass-morphism bar:

```css
.navbar {
  background: rgba(12, 21, 40, 0.85);  /* --color-bg-dark at 85% opacity */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}
```

- Brand text: `--color-text-on-dark`, bold
- Nav links: `--color-text-on-dark-muted` → hover: `--color-text-on-dark`
- CTA button: `btn-success` → `--color-accent` green (pops on dark navbar)
- Hamburger icon: use `navbar-dark` instead of `navbar-light` in template classes

---

## 6. Card Design — Elevated on Dark

When sections need cards (Features, Use Cases, Pricing), use a card pattern:

```css
.dark-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 2rem;
}
```

No box-shadow needed — the bg difference + border provides enough depth on dark backgrounds.

---

## 7. Mobile UX Polish

### 7.1 Navbar

- Switch `navbar-light` → `navbar-dark` for proper hamburger icon contrast
- Dark glass-morphism background works on mobile too

### 7.2 Hero Section

- Already has mobile media query (`90vh`, `font-size: 2rem`) — keep
- CTA buttons already stack vertically (`flex-column`) on mobile — keep

### 7.3 All Sections

- Ensure heading sizes scale on mobile (Bootstrap responsive typography handles this)
- Touch targets minimum 44px (Bootstrap `.btn-lg` meets this)
- Section padding can reduce to `3rem` on mobile: add media query if needed

---

## 8. Scroll Animations

### 8.1 Composable: `useScrollReveal`

**File**: `src/composables/useScrollReveal.ts`

```ts
// Uses Intersection Observer to add .is-visible to [data-reveal] elements.
// Observes once per element; no re-trigger on scroll up.
// Cleanup on component unmount.
```

### 8.2 CSS Animation Classes

```css
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.reveal-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

### 8.3 Usage

Add `data-reveal` attribute to key elements (titles, cards, CTAs). The composable handles the rest.

---

## 9. Implementation Steps (for 4.2)

### Step 9.1: Create CSS Variables File

**File**: `src/assets/styles/variables.css`

Define all CSS custom properties from Section 2.1. Include Bootstrap variable overrides from Section 2.2.

### Step 9.2: Create Global Base Styles

**File**: `src/assets/styles/base.css`

Contents:
- Global body: `background: var(--color-bg-deepest); color: var(--color-text-on-dark);`
- Inter font family override
- Section padding rule
- `.reveal-on-scroll` / `.is-visible` animation classes
- `.dark-card` card pattern
- `scroll-behavior: smooth` on html
- `::selection` with primary blue

### Step 9.3: Extract Navbar Height Constant

**File**: `src/utils/constants.ts`

```ts
export const NAVBAR_HEIGHT_PX = 70;
```

### Step 9.4: Update `index.html` — Google Fonts

Add Inter font `<link>` tags in `<head>`.

### Step 9.5: Import Global Styles in `main.ts`

Add after Bootstrap imports:
```ts
import '@/assets/styles/variables.css'
import '@/assets/styles/base.css'
```

### Step 9.6: Update Navbar — Dark Glass-Morphism

- Template: replace `navbar-light bg-white` with dark classes
- Style: glass-morphism (rgba + backdrop-filter + border)
- Nav links: lighter colors for dark bg
- Import `NAVBAR_HEIGHT_PX` from constants

### Step 9.7: Update HeroSection — CSS Variables + Scroll Reveal

- Replace hard-coded hex with `var(--color-bg-navy)` / `var(--color-bg-dark)`
- Add `data-reveal` to title, subtitle, and CTA buttons
- Import and call `useScrollReveal()`
- Import `NAVBAR_HEIGHT_PX` from constants

### Step 9.8: Create `useScrollReveal` Composable

**File**: `src/composables/useScrollReveal.ts`

### Step 9.9: Apply Section Backgrounds to All Stubs

For each section stub (Problem, Solution, UseCases, Features, Beta, Pricing, FAQ, Contact, Footer):
- Add scoped `<style>` with background per Section 2.3
- Add section padding
- Add text color for dark background
- Add `data-reveal` to section headings

### Step 9.10: Verify Build & Lint

```bash
npm run build   # vue-tsc + vite build — zero errors
npm run lint    # ESLint — clean
```

### Step 9.11: Commit

Message: `feat: apply dark-first global styling, color palette, typography, and scroll animations`

---

## 10. Files Summary

| File | Action | Est. Lines |
|---|---|---|
| `src/assets/styles/variables.css` | **Create** | ~70 |
| `src/assets/styles/base.css` | **Create** | ~50 |
| `src/utils/constants.ts` | **Create** | ~5 |
| `src/composables/useScrollReveal.ts` | **Create** | ~45 |
| `index.html` | Modify (add font links) | +4 |
| `src/main.ts` | Modify (add 2 imports) | +2 |
| `src/components/landing/Navbar.vue` | Modify (dark glass-morphism) | ~15 changed |
| `src/components/landing/HeroSection.vue` | Modify (CSS vars + data-reveal) | ~10 changed |
| `src/components/landing/ProblemSection.vue` | Modify (bg + padding) | ~10 |
| `src/components/landing/SolutionSection.vue` | Modify (bg + padding) | ~10 |
| `src/components/landing/UseCasesSection.vue` | Modify (bg + padding) | ~10 |
| `src/components/landing/FeaturesSection.vue` | Modify (bg + padding) | ~10 |
| `src/components/landing/BetaSection.vue` | Modify (primary gradient bg) | ~10 |
| `src/components/landing/PricingSection.vue` | Modify (bg + padding) | ~10 |
| `src/components/landing/FaqSection.vue` | Modify (bg + padding) | ~10 |
| `src/components/landing/ContactSection.vue` | Modify (bg + padding) | ~10 |
| `src/components/landing/Footer.vue` | Modify (bg + padding) | ~10 |

**Total**: 4 new files, 14 modified, ~0 npm deps added.

---

## 11. Dependencies & Risks

- **No new npm dependencies** — Intersection Observer is native, Inter is Google Fonts CDN
- **Bootstrap dark override risk**: Overriding `--bs-body-bg` and `--bs-body-color` may affect Bootstrap component defaults — verify modals, dropdowns look correct on dark bg
- **Browser support**: CSS custom properties (96%+), backdrop-filter (95%+), Intersection Observer (97%+) — all widely supported
- **Contrast**: All dark-background text uses `--color-text-on-dark` (`#e2e8f0`) which has WCAG AA contrast ratio (≈8:1) against the darkest bg (`#080d1a`)

---

*End of revised dark-first styling plan.*
