# Implementation Plan — BetaSection.vue Component

## Task
Replace the existing `src/components/landing/BetaSection.vue` stub with a full Beta status section using Spanish content from `landing-content.es.md` §6, green/emerald trust accents, scroll reveal animations, and responsive Bootstrap layout.

---

## 1. High-Level Approach

- **Single-file change**: overwrite `src/components/landing/BetaSection.vue`.
- Keep the component self-contained: `<script setup lang="ts">`, `<template>`, `<style scoped>`.
- Follow the exact same pattern established by `UseCasesSection.vue` (typed data model, `useScrollReveal()`, container/row/col layout, scoped CSS variables).
- The section is the **sole bright contrast breaker** (style guide §3.1): background is a `--color-primary` gradient with `--color-white` text.
- Green/emerald (`--color-accent`) is used **only** for trust-signal accents (badges, icons, decorative bars) to satisfy the TODO requirement for "visually positive and encouraging" tones.
- All visible strings are in Spanish and sourced from `landing-content.es.md` §6.
- Include the accompanying phrase from §9 if it fits naturally.
- No new dependencies, no new CSS files, no changes to `App.vue` required.

---

## 2. Exact Template Structure

### 2.1 Root & Layout
```vue
<section id="beta" class="beta-section">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-10 col-lg-8 text-center">
        ...content...
      </div>
    </div>
  </div>
</section>
```
- `id="beta"` preserved for navbar anchor link.
- Bootstrap `container` → `row justify-content-center` → `col-12 col-md-10 col-lg-8 text-center`.
- Mobile-first: full width on small screens, constrained readable width on tablet/desktop.

### 2.2 Content Elements (top to bottom)

| # | Element | Spanish Text | `data-reveal` |
|---|---------|--------------|---------------|
| 1 | Badge / trust pill | "Beta Abierta — 100% Gratis" | yes |
| 2 | Section title (`<h2>`) | "Estamos en versión Beta" | yes |
| 3 | Lead paragraph (`<p class="beta-lead">`) | "**Cobranza App** se encuentra actualmente en fase **Beta abierta**. Durante toda esta etapa el servicio es **100% gratuito**." | yes |
| 4 | Feature list (`<ul>`) | 3 bullet items (see §2.3) | yes |
| 5 | Closing phrase (`<p class="beta-closing">`) | "Un sistema en constante evolución, que crece junto a vos." | yes |

### 2.3 Feature List Items (Spanish)
Each item is an `<li>` with a Bootstrap Icons checkmark (`bi-check-circle-fill`) as the bullet.

1. **Duración estimada de la Beta: 1 a 3 meses**
2. **Todos los usuarios que se sumen durante esta etapa recibirán una bonificación especial al lanzarse la versión paga**
3. **El producto se mejora constantemente según el feedback de los primeros usuarios**

### 2.4 `data-reveal` Placement Rules
- Add `data-reveal` to every block-level content element (badge, h2, lead, ul container, closing phrase) so they reveal progressively as the user scrolls.
- The composable `useScrollReveal()` is called once in `<script setup>`; it auto-discovers all `[data-reveal]` elements inside the component.

---

## 3. Color Scheme

### 3.1 Background & Text (per Style Guide §3.1)
- **Background**: `linear-gradient(135deg, var(--color-primary), var(--color-primary-hover))`
- **Text color**: `var(--color-white)`
- This maintains the Beta section as the single bright contrast breaker in the dark-first page.

### 3.2 Green / Emerald Trust Accents
Used **sparingly** for positive visual signals only:
- **Badge background**: `var(--color-accent)` with `var(--color-white)` text.
- **Checkmark icons**: `var(--color-accent)`.
- **Optional decorative top bar** on the section: `4px solid var(--color-accent)` (or a subtle `box-shadow` accent) to signal "green = go / trust".
- Do **not** make the section background green; that would break the style-guide alternation pattern.

---

## 4. Scoped CSS Details

### 4.1 Section Base
```css
.beta-section {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-hover));
  color: var(--color-white);
}
```

### 4.2 Badge / Trust Pill
```css
.beta-badge {
  display: inline-block;
  background: var(--color-accent);
  color: var(--color-white);
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.4rem 1rem;
  border-radius: 9999px; /* pill shape */
  margin-bottom: 1.25rem;
}
```

### 4.3 Typography Overrides for Light Background
Because this section is the rare light-bright breaker, text defaults from `base.css` need local overrides:
- Title: `font-size: 2.25rem`, `font-weight: 700`, `color: var(--color-white)`.
- Lead paragraph: `font-size: 1.125rem`, `opacity: 0.95`, `color: var(--color-white)`.
- List items: `font-size: 1rem`, `color: var(--color-white)`.
- Closing phrase: `font-style: italic`, `opacity: 0.9`.

### 4.4 Feature List Styling
```css
.beta-features {
  list-style: none;
  padding-left: 0;
  margin: 1.5rem 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.beta-feature-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  text-align: left;
}

.beta-feature-icon {
  color: var(--color-accent);
  font-size: 1.25rem;
  flex-shrink: 0;
  margin-top: 0.15rem;
}
```

### 4.5 Responsive Adjustments
```css
@media (max-width: 767.98px) {
  .beta-section h2 {
    font-size: 1.75rem;
  }

  .beta-lead {
    font-size: 1rem;
  }

  .beta-feature-text {
    font-size: 0.95rem;
  }
}
```

---

## 5. TypeScript Interface

Inside `<script setup lang="ts">`, define an interface for the feature list items to preserve type safety and follow the project pattern (see `UseCasesSection.vue`):

```ts
interface BetaFeature {
  text: string
}
```

The array of features is typed as `BetaFeature[]`.

No props or emits are required; this component is static content.

---

## 6. Scroll Reveal Setup

```ts
import { useScrollReveal } from '@/composables/useScrollReveal'
useScrollReveal()
```

All animated elements carry `data-reveal` (see §2.2). The composable handles class toggling via `IntersectionObserver` at `threshold: 0.15`.

---

## 7. Complete Expected Component Code

> **Note**: This section is the exact target code the Implementer should produce.

```vue
<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal'

useScrollReveal()

const badgeText = 'Beta Abierta — 100% Gratis'
const sectionTitle = 'Estamos en versión Beta'

const leadParagraph =
  '<strong>Cobranza App</strong> se encuentra actualmente en fase <strong>Beta abierta</strong>. Durante toda esta etapa el servicio es <strong>100% gratuito</strong>.'

interface BetaFeature {
  text: string
}

const features: BetaFeature[] = [
  { text: 'Duración estimada de la Beta: 1 a 3 meses' },
  {
    text: 'Todos los usuarios que se sumen durante esta etapa recibirán una bonificación especial al lanzarse la versión paga'
  },
  {
    text: 'El producto se mejora constantemente según el feedback de los primeros usuarios'
  }
]

const closingPhrase = 'Un sistema en constante evolución, que crece junto a vos.'
</script>

<template>
  <section id="beta" class="beta-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8 text-center">
          <span data-reveal class="beta-badge">{{ badgeText }}</span>

          <h2 data-reveal class="beta-title">{{ sectionTitle }}</h2>

          <p data-reveal class="beta-lead" v-html="leadParagraph" />

          <ul data-reveal class="beta-features">
            <li v-for="feature in features" :key="feature.text" class="beta-feature-item">
              <i class="bi bi-check-circle-fill beta-feature-icon" aria-hidden="true" />
              <span class="beta-feature-text">{{ feature.text }}</span>
            </li>
          </ul>

          <p data-reveal class="beta-closing">{{ closingPhrase }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.beta-section {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-hover));
  color: var(--color-white);
}

.beta-badge {
  display: inline-block;
  background: var(--color-accent);
  color: var(--color-white);
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.4rem 1rem;
  border-radius: 9999px;
  margin-bottom: 1.25rem;
}

.beta-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.25;
  color: var(--color-white);
}

.beta-lead {
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: var(--color-white);
  opacity: 0.95;
}

.beta-features {
  list-style: none;
  padding-left: 0;
  margin: 1.5rem 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.beta-feature-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  text-align: left;
}

.beta-feature-icon {
  color: var(--color-accent);
  font-size: 1.25rem;
  flex-shrink: 0;
  margin-top: 0.15rem;
}

.beta-feature-text {
  font-size: 1rem;
  line-height: 1.55;
  font-weight: 500;
  color: var(--color-white);
}

.beta-closing {
  font-size: 1rem;
  font-style: italic;
  margin-top: 1.5rem;
  margin-bottom: 0;
  color: var(--color-white);
  opacity: 0.9;
}

@media (max-width: 767.98px) {
  .beta-title {
    font-size: 1.75rem;
  }

  .beta-lead {
    font-size: 1rem;
  }

  .beta-feature-text {
    font-size: 0.95rem;
  }
}
</style>
```

---

## 8. Verification Checklist

| Requirement | Plan Coverage |
|-------------|---------------|
| Replace existing `BetaSection.vue` stub | §7 target code overwrites the 14-line stub |
| Spanish content from §6 "Etapa Actual" | §2.2, §2.3, §7 — all strings match `landing-content.es.md` exactly |
| Title: "Estamos en versión Beta" | §2.2 element #2 |
| Content: open Beta, 100% free, 1–3 months, special benefits, continuous improvement | §2.3 three bullet items + lead paragraph |
| Green/emerald positive tones | §3.2 — `--color-accent` used for badge, check icons |
| Style guide §3.1: Beta is the sole bright contrast breaker | §3.1 — primary blue gradient background, white text |
| Accompanying phrase included | §2.2 element #5, §7 `closingPhrase` |
| Scoped CSS, CSS variables only, no hardcoded hex | §4, §7 `<style scoped>` uses only `var(...)` |
| `useScrollReveal()` + `data-reveal` on title and content | §6, §2.2 — every block element has `data-reveal` |
| Responsive: Bootstrap grid + media queries for mobile | §2.1 grid classes, §4.5 mobile font-size overrides |
| TypeScript interface for data model | §5 `BetaFeature` interface |
| No new files created | Only `BetaSection.vue` is modified |

---

## 9. Post-Implementation Steps (for Implementer / Reviewer)

1. Run `npm run build` to confirm no TypeScript or Vue template errors.
2. Run `npm run lint` to verify ESLint/Prettier compliance.
3. Open the landing page in browser, scroll to `#beta`, and confirm:
   - Gradient background renders correctly.
   - All text is Spanish and matches `landing-content.es.md`.
   - Badge is emerald pill-shaped.
   - Check icons are emerald.
   - Scroll reveal triggers sequentially on title, lead, list, closing phrase.
   - Mobile (`<768px`) font sizes reduce gracefully.
4. If any deviation is found, return to 4.3 Code Review fix cycle.

---

## 10. Questions for Caller

None — all requirements, content strings, style-guide rules, and component patterns are unambiguous and fully covered by this plan.
