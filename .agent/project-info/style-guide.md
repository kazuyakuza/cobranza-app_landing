# Style Guide — Cobranza App Landing Page

## Dark-First Design Rationale

The landing page uses a **night-mode dominant** dark theme. ~90% of the page uses the dark color family (deep navy/slate). Section separation is achieved through subtle shade shifts (2–4% luminance difference), not through light/dark alternation. The sole visual "breaker" is the Beta section — a vibrant blue gradient that draws attention to the free trial CTA.

---

## 1. Color Palette Reference

All colors are defined as CSS custom properties in `src/assets/styles/variables.css`. Never hardcode hex values in components.

### 1.1 Background Shades

| Variable | Hex | Usage | Context |
|---|---|---|---|
| `--color-bg-deepest` | `#080d1a` | Footer, page base | Darkest shade — anchors the page bottom |
| `--color-bg-dark` | `#0c1528` | Default dark sections | Primary section background |
| `--color-bg-navy` | `#112240` | Alternating sections, Hero | Slightly lighter for visual separation |
| `--color-bg-slate` | `#1a2740` | Alternating sections | Warmer dark tone, breaks monotony |
| `--color-bg-card` | `#1e2d4a` | Card/panel backgrounds | Elevated surfaces on dark sections |
| `--color-bg-card-alt` | `#243656` | Alternate card shade | Nested contrast within cards |

### 1.2 Interactive Colors

| Variable | Hex | Usage | Context |
|---|---|---|---|
| `--color-primary` | `#3b82f6` | Links, primary CTAs | Vibrant blue — pops on dark |
| `--color-primary-hover` | `#2563eb` | Primary hover state | Darker blue on hover |
| `--color-accent` | `#10b981` | Navbar CTA, success | Emerald green — money/success signal |
| `--color-accent-hover` | `#059669` | Accent hover state | Deeper green on hover |
| `--color-pain` | `#ef4444` | Pain/warning text | Red signal for problem indicators |

### 1.3 Text Colors

| Variable | Hex | Usage | Context |
|---|---|---|---|
| `--color-text-on-dark` | `#e2e8f0` | Primary text on dark | WCAG AA compliant (~8:1 on `#080d1a`) |
| `--color-text-on-dark-muted` | `#94a3b8` | Secondary/nav links | Lower emphasis text |
| `--color-text-on-dark-dim` | `#64748b` | Captions, tertiary | Lowest emphasis on dark |
| `--color-text-on-light` | `#1e293b` | Text on light (if any) | Reserved for future light sections |
| `--color-white` | `#ffffff` | Hero title, pure highlights | Used sparingly |

### 1.4 Utility

| Variable | Hex | Usage |
|---|---|---|
| `--color-border` | `#2a3f5f` | Borders, dividers on dark |
| `--navbar-height` | `70px` | Fixed navbar offset constant |

---

## 2. Typography

### 2.1 Font Stack

**Inter** (Google Fonts, variable weight) — clean, geometric, used by Stripe/GitHub for dark UIs.

```css
font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
```

Loaded in `index.html` `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
```

### 2.2 Type Scale

| Use | Size | Weight | Color Variable | Where |
|---|---|---|---|---|
| Section title | `2.25rem` (36px) | 700 | `--color-text-on-dark` | `<h2>` in each section |
| Section subtitle | `1.125rem` (18px) | 400 | `--color-text-on-dark-muted` | Muted subtitle below title |
| Body text | `1rem` (16px) | 400 | `--color-text-on-dark` | Paragraphs, lists |
| Card titles | `1.25rem` (20px) | 600 | `--color-text-on-dark` | Feature/use case card headings |
| Nav links | `0.95rem` | 500 | `--color-text-on-dark-muted` | Navbar links (hover: `--color-text-on-dark`) |
| Hero title | `2.25rem+` (display-4) | 700 | `--color-white` | HeroSection main heading |
| CTA buttons | inherited | 600 (`fw-semibold`) | varies | All `.btn` elements |

### 2.3 Body Defaults

```css
--bs-body-font-size: 1rem;
--bs-body-line-height: 1.65;
```

---

## 3. Section Background Pattern

### 3.1 Dark-First Alternation

Sections alternate between dark shades using subtle shifts. Only Beta breaks the pattern with a bright gradient.

| # | Section | Background | Text Color | Rationale |
|---|---|---|---|---|
| — | **Navbar** | `--color-bg-dark` + backdrop-blur | `--color-text-on-dark` | Dark glass-morphism sticky bar |
| 1 | **Hero** | `--color-bg-navy` gradient | `--color-white` | Deepest hero impact |
| 2 | **Problem** | `--color-bg-dark` | `--color-text-on-dark` | Deep dark, sets night tone |
| 3 | **Solution** | `--color-bg-navy` | `--color-text-on-dark` | Slightly brighter navy |
| 4 | **Use Cases** | `--color-bg-slate` | `--color-text-on-dark` | Fresh slate tone |
| 5 | **Features** | `--color-bg-dark` | `--color-text-on-dark` | Dark again; cards use `--color-bg-card` |
| 6 | **Beta** | `linear-gradient(135deg, #0f766e, #134e4a)` (darker emerald) | `--color-white` | **Sole bright contrast breaker** — darkened emerald trust gradient |
| 7 | **Pricing** | `--color-bg-navy` | `--color-text-on-dark` | Back to dark after Beta |
| 8 | **FAQ** | `--color-bg-slate` | `--color-text-on-dark` | Slightly warmer dark |
| 9 | **Contact** | `--color-bg-dark` | `--color-text-on-dark` | Returns to deepest dark |
| 10 | **Footer** | `--color-bg-deepest` | `--color-text-on-dark-muted` | Seamless page close. Closing phrase uses `--color-accent` (emerald) for emphasis |

### 3.2 Section Separation Rule

- 8 dark sections (navy/dark/slate variations)
- 1 Beta bright breaker (primary blue gradient)
- 1 deepest footer (`--color-bg-deepest`)
- Separation uses subtle shade shifts, not light/dark alternation

### 3.3 Section Spacing

All sections share consistent vertical padding:

```css
section {
  padding-top: 5rem;     /* 80px */
  padding-bottom: 5rem;  /* 80px */
}
```

---

## 4. Component Styling Rules

### 4.1 Navbar — Dark Glass-Morphism

**File**: `src/components/landing/Navbar.vue`

- Template class: `navbar-dark` (not `navbar-light`)
- Background: `rgba(12, 21, 40, 0.85)` with `backdrop-filter: blur(12px)`
- Border: `1px solid var(--color-border)`
- Brand: `--color-text-on-dark`, bold
- Nav links: `--color-text-on-dark-muted` → hover: `--color-text-on-dark`
- Nav links active state: `--color-primary` color, `600` weight — driven by scroll-spy
- CTA button: `btn-success` → `--color-accent` green
- Sticky: `fixed-top`
- Height constant: `NAVBAR_HEIGHT_PX = 70` in `src/utils/constants.ts`

#### Scroll-Spy Active Link Behavior

The navbar tracks the currently visible section using an `IntersectionObserver`:

- On mount, observes all section IDs from the `menuItems` array
- Root margin: `-70px 0px -70% 0px` (offsets navbar height, triggers when section enters top 30% of viewport)
- Threshold: `[0, 0.25]` — fires when section is 0% or 25% visible
- When a section enters the observed zone, its ID updates `activeSectionId`
- The matching nav link receives `.active` class (primary blue, bold)
- Observer is disconnected on component unmount

This creates automatic nav link highlighting as the user scrolls through sections.

### 4.2 Hero — Navy Gradient

**File**: `src/components/landing/HeroSection.vue`

- Background: `linear-gradient(135deg, --color-bg-navy → --color-bg-dark)`
- Layout: centered (`d-flex align-items-center`, `text-center`)
- Title: `--color-white`, `display-4`, `fw-bold`
- Subtitle: `--color-text-on-dark-muted` with `opacity: 0.85`
- Primary CTA: `btn-primary`, rounded, hover `translateY(-2px)` + blue shadow
- Secondary CTA: `btn-outline-light`, rounded, hover fills with `--color-primary` bg + `--color-white` text
- Mobile: `min-height: 90vh`, title `2rem` at `<768px`

### 4.3 Cards — Dark Card Pattern

**Class**: `.dark-card` (defined in `base.css`)

```css
.dark-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 2rem;
}
```

- No box-shadow — depth via bg contrast + border
- Used in Features, Use Cases, Pricing sections
- **Equal height in flex/grid layouts**: when cards sit in Bootstrap columns within the same row, apply `height: 100%` to the card wrapper (e.g., `.feature-group`) so all cards fill the tallest column height. Use this pattern whenever card content length varies but visual uniformity is required.

### 4.4 Sections — Scoped Style Pattern

Each section component uses `<style scoped>` with:

```css
section {
  background: var(--color-bg-*); /* per alternation table */
}
```

- Always use CSS variables, never hardcode hex
- Section background defined per Section 3.1 table
- Add `data-reveal` to section headings for scroll animation

### 4.5 Beta — Emerald Gradient

**File**: `src/components/landing/BetaSection.vue`

- Background: `linear-gradient(135deg, #0f766e, #134e4a)` — darker emerald green gradient
- Text: `--color-white` throughout
- Badge: solid `--color-accent` pill, `font-weight: 600`, `0.9rem`
- Title: `2.25rem`, `font-weight: 700`, white
- Lead paragraph: `1.125rem`, white, `opacity: 0.95`
- Feature list: flex column, check icons in `--color-accent`, text `font-weight: 500`, white
- Closing phrase: `font-weight: 600`, white
- This is the only non-dark section; uses green trust/success signals
- Mobile: title scales to `1.75rem`, lead to `1rem`

---

## 5. Scroll Animation System

### 5.1 Composable: `useScrollReveal`

**File**: `src/composables/useScrollReveal.ts`

- Uses `IntersectionObserver` with `threshold: 0.15`
- On mount: finds all `[data-reveal]` elements, adds `.reveal-on-scroll` class
- On intersect: adds `.is-visible` class, then unobserves that element
- Each element reveals once (no re-trigger on scroll up)
- Cleanup: observer disconnected on component unmount

### 5.2 CSS Animation Classes

**File**: `src/assets/styles/base.css`

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

### 5.3 How to Add Scroll Reveal to New Elements

1. Add `data-reveal` attribute to the element in the template
2. Import and call `useScrollReveal()` in `<script setup>`:

   ```ts
   import { useScrollReveal } from '@/composables/useScrollReveal'
   useScrollReveal()
   ```

3. The composable handles the rest — no manual class management needed

### 5.4 What to Animate

- Section titles and subtitles
- Cards and card groups
- CTA buttons
- Any content that benefits from progressive reveal

---

## 6. Code Conventions

### 6.1 Language

- **Code**: English (variable names, comments, class names)
- **Content**: Spanish (user-facing text in templates)

### 6.2 Component Naming

- PascalCase: `Navbar.vue`, `HeroSection.vue`, `ProblemSection.vue`
- Suffix pattern: `*Section.vue` for landing page sections
- Prefix pattern: `use*` for composables

### 6.3 Style File Structure

| File | Purpose |
|---|---|
| `src/assets/styles/variables.css` | CSS custom properties + Bootstrap overrides |
| `src/assets/styles/base.css` | Global resets, section padding, animation classes, card pattern |
| Component `<style scoped>` | Per-component styles (background, hover effects, responsive) |

### 6.4 Import Order in `main.ts`

1. Bootstrap CSS
2. Bootstrap Icons
3. `@/assets/styles/variables.css`
4. `@/assets/styles/base.css`
5. Bootstrap JS

---

## 7. Layout Constants

**File**: `src/utils/constants.ts`

```ts
export const NAVBAR_HEIGHT_PX = 70;
```

- Import in any component that scrolls to sections
- Used to offset `window.scrollTo()` target positions
- Mirrored in CSS as `--navbar-height: 70px`

---

## 8. AI Agent Instructions

### Rules for Extending Styling

1. **Use CSS variables always** — Never hardcode hex values. Reference `variables.css` for available colors.
2. **Follow section alternation pattern** — When creating new sections, pick the appropriate background from Section 3.1 table. Do not introduce new dark shades without approval.
3. **Use `data-reveal` for new elements** — Add this attribute to any element that should animate on scroll. Import `useScrollReveal()` in the component.
4. **Prefer scoped styles** — Component-specific styles go in `<style scoped>`. Only add to `base.css` if the pattern is truly global (used across 3+ components).
5. **No new CSS files** — All global styles go in `variables.css` or `base.css`. Do not create additional CSS files without approval.
6. **Bootstrap compatibility** — When overriding Bootstrap defaults, use CSS variable overrides in `variables.css`. Test that modals, dropdowns, and inputs still work on dark backgrounds.
7. **Mobile-first responsive** — Use Bootstrap responsive classes (`col-*`, `d-flex`, `text-center`). Add media queries in `<style scoped>` only for component-specific overrides.
8. **Contrast compliance** — Text on dark backgrounds must use `--color-text-on-dark` or lighter. Verify WCAG AA contrast if introducing new color combinations.
9. **Card pattern reuse** — Use `.dark-card` class for any card/panel on dark backgrounds. Do not redefine card styles per component.
10. **Section padding** — Inherits from `base.css` (`5rem` top/bottom). Override only with explicit scoped rules when needed.

### Quick Reference for New Sections

```vue
<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal'
useScrollReveal()
</script>

<template>
  <section id="my-section">
    <div class="container">
      <h2 data-reveal>New Section</h2>
      <p data-reveal>Content here</p>
    </div>
  </section>
</template>

<style scoped>
section {
  background: var(--color-bg-dark); /* or navy/slate per alternation table */
}
</style>
```
