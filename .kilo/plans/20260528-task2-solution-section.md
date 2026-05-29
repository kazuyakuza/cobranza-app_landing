# Implementation Plan — Task 2: Solution Section Component

**Date**: 2026-05-29
**TODO File**: `.agent/todos/20260521/20260521-todo-1.md`
**Task**: Create Solution Section Component (Task 2 of 4)

---

## 1. High-Level Approach

Replace the existing `SolutionSection.vue` stub (14 lines) with the full implementation following patterns from `ProblemSection.vue` and the style guide. The component extracts 4 key features from the Spanish body text and presents them in a 2×2 card grid. Primary-blue icons (`--color-primary`) contrast with ProblemSection's dim gray icons, marking the emotional shift from pain → solution.

### Emotional Transition Strategy

| Aspect | ProblemSection | SolutionSection |
|---|---|---|
| Background | `--color-bg-dark` (deep dark) | `--color-bg-navy` (slightly lighter) |
| Icon color | `--color-text-on-dark-dim` (dim gray) | `--color-primary` (vibrant blue) |
| Emotional tone | Pain, friction, stress | Relief, capability, efficiency |
| Visual treatment | Pain points as warning-list items | Features as uplifting card grid |

### Content Flow: Title → Body paragraph → Feature cards (2×2 grid) → Closing statement

---

## 2. File Changes

### 2.1 `src/components/landing/SolutionSection.vue` — Full Rewrite

**Path**: `src/components/landing/SolutionSection.vue`
**Action**: Replace entire file content (currently 14-line stub)

#### 2.1.1 Script Block

```vue
<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal'

useScrollReveal()

const sectionTitle =
  'Cobranza App simplifica y centraliza todo el proceso de cobranza'

const bodyText =
  'Es una plataforma que permite cargar deudas de forma rápida (individual o masiva), que tus clientes consulten su saldo actual en cualquier momento, suban sus comprobantes de pago y que tú puedas validarlos de manera ágil y ordenada.'

interface SolutionFeature {
  icon: string
  label: string
  description: string
}

const features: SolutionFeature[] = [
  {
    icon: 'bi-lightning-charge',
    label: 'Carga rápida de deudas',
    description: 'Carga individual o masiva de deudas en segundos',
  },
  {
    icon: 'bi-graph-up',
    label: 'Consulta de saldo',
    description:
      'Tus clientes consultan su saldo actual en cualquier momento',
  },
  {
    icon: 'bi-file-earmark-arrow-up',
    label: 'Subida de comprobantes',
    description: 'Los clientes suben sus comprobantes de pago directamente',
  },
  {
    icon: 'bi-clipboard2-check',
    label: 'Validación ágil',
    description: 'Validá pagos de manera ágil y ordenada',
  },
]

const closingStatement =
  'De esta forma reducís drásticamente el tiempo dedicado a comunicación, verificación y conciliación de pagos.'
</script>
```

#### 2.1.2 Template Block

```vue
<template>
  <section id="solution" class="solution-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-9">
          <h2 data-reveal class="solution-title">
            {{ sectionTitle }}
          </h2>

          <p data-reveal class="solution-body">
            {{ bodyText }}
          </p>

          <div data-reveal class="features-wrapper">
            <div class="features-grid row g-4">
              <div
                v-for="feature in features"
                :key="feature.label"
                class="feature-item col-12 col-md-6"
              >
                <div class="feature-content dark-card">
                  <i
                    :class="feature.icon"
                    class="feature-icon"
                    aria-hidden="true"
                  ></i>
                  <div class="feature-text-wrapper">
                    <h3 class="feature-label">{{ feature.label }}</h3>
                    <p class="feature-description">{{ feature.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p data-reveal class="solution-closing">
            {{ closingStatement }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
```

#### 2.1.3 Style Block

```vue
<style scoped>
.solution-section {
  background: var(--color-bg-navy);
  color: var(--color-text-on-dark);
}

.solution-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.25;
}

.solution-body {
  font-size: 1.125rem;
  color: var(--color-text-on-dark-muted);
  margin-bottom: 2.5rem;
  line-height: 1.65;
}

.features-wrapper {
  margin-bottom: 2.5rem;
}

.features-grid {
  margin-bottom: 0;
}

.feature-content {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.feature-icon {
  font-size: 1.4rem;
  color: var(--color-primary);
  flex-shrink: 0;
  margin-top: 0.15rem;
}

.feature-text-wrapper {
  flex: 1;
}

.feature-label {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.35rem;
  line-height: 1.35;
}

.feature-description {
  font-size: 0.95rem;
  color: var(--color-text-on-dark-muted);
  line-height: 1.5;
  margin-bottom: 0;
}

.solution-closing {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-on-dark);
  line-height: 1.65;
}

@media (max-width: 767.98px) {
  .solution-title {
    font-size: 1.75rem;
  }

  .solution-body,
  .solution-closing {
    font-size: 1rem;
  }

  .feature-label {
    font-size: 1.05rem;
  }

  .feature-description {
    font-size: 0.9rem;
  }
}
</style>
```

---

## 3. Design Decisions & Rationale

| Decision | Rationale |
|---|---|
| Background `--color-bg-navy` | Per style guide alternation table row #3; natural progression from ProblemSection's `--color-bg-dark` |
| Icons in `--color-primary` (vibrant blue) | Contrasts with ProblemSection's `--color-text-on-dark-dim` icons; signals positive transformation from pain → solution |
| 4 features extracted from body text | Body text naturally lists 4 capabilities. Extracting them into cards improves scanability vs. a single paragraph |
| `bi-lightning-charge` icon for "Carga rápida" | Conveys speed/efficiency; matches "de forma rápida" from body text |
| `bi-graph-up` icon for "Consulta de saldo" | Financial/balance inquiry; matches "consulten su saldo actual" |
| `bi-file-earmark-arrow-up` icon for "Subida de comprobantes" | Document upload; matches "suban sus comprobantes de pago" |
| `bi-clipboard2-check` icon for "Validación ágil" | Clipboard with checkmark = validation/approval; matches "validarlos de manera ágil" |
| Feature labels as `<h3>` inside cards | Creates clear hierarchy: section title (h2) → feature name (h3) → description (p). Better than `<span>` for screen readers |
| `.dark-card` pattern for each feature | Reuses existing design token; elevated card surfaces distinguish features from body text |
| Feature descriptions in `0.95rem` / `--color-text-on-dark-muted` | Slightly smaller + muted keeps focus on labels; follows typography scale conventions |
| Closing statement bold (`fw-bold`) | Creates emotional punch after listing features; emphasizes "reducís drásticamente" |
| `useScrollReveal()` called in `<script setup>` | Enables `data-reveal` attributes on title, body, features wrapper, closing statement |
| Responsive: 2-column → 1-column at `<768px` | Matches ProblemSection grid behavior; ensures readable card width on mobile |
| No hardcoded hex values | All colors reference CSS variables per style guide rule AI-1 |
| `SolutionFeature` interface inline | Small scope — no need for separate types file; follows existing `PainPoint` pattern |
| Navbar link "La Solución" → `#solution` | Already wired in Navbar.vue; component needs only the `id="solution"` attribute |

---

## 4. Content Mapping (Spanish Text → Component)

| Content Field | Spanish Text | Source in `landing-content.es.md` |
|---|---|---|
| `sectionTitle` | Cobranza App simplifica y centraliza todo el proceso de cobranza | Section 3, line 38 |
| `bodyText` | Es una plataforma que permite cargar deudas de forma rápida (individual o masiva), que tus clientes consulten su saldo actual en cualquier momento, suban sus comprobantes de pago y que tú puedas validarlos de manera ágil y ordenada. | Section 3, line 41 |
| `features[0].label` | Carga rápida de deudas | Derived from "cargar deudas de forma rápida (individual o masiva)" |
| `features[0].description` | Carga individual o masiva de deudas en segundos | Derived summarizing feature |
| `features[1].label` | Consulta de saldo | Derived from "tus clientes consulten su saldo actual" |
| `features[1].description` | Tus clientes consultan su saldo actual en cualquier momento | Derived from body text |
| `features[2].label` | Subida de comprobantes | Derived from "suban sus comprobantes de pago" |
| `features[2].description` | Los clientes suben sus comprobantes de pago directamente | Derived summarizing feature |
| `features[3].label` | Validación ágil | Derived from "puedas validarlos de manera ágil y ordenada" |
| `features[3].description` | Validá pagos de manera ágil y ordenada | Derived from body text |
| `closingStatement` | De esta forma reducís drásticamente el tiempo dedicado a comunicación, verificación y conciliación de pagos. | Section 3, line 43 |

---

## 5. Bootstrap 5 / Bootstrap Icons Usage

| Element | Bootstrap Utility / Component |
|---|---|
| Layout container | `container` |
| Row/column grid (centered) | `row justify-content-center`, `col-12 col-md-10 col-lg-9` |
| Feature card grid | `row g-4`, `col-12 col-md-6` (2×2 at md+) |
| Feature card surface | `.dark-card` class (defined in `base.css`) |
| Feature icons | Bootstrap Icons: `bi-lightning-charge`, `bi-graph-up`, `bi-file-earmark-arrow-up`, `bi-clipboard2-check` |
| Icon accessibility | `aria-hidden="true"` (decorative; text conveys meaning) |
| Feature label heading | `<h3>` for semantic hierarchy below `<h2>` |

---

## 6. CSS Variables Referenced

| Variable | Where Used | Defined in `variables.css` |
|---|---|---|
| `--color-bg-navy` | Section background | Line 8 |
| `--color-bg-card` | `.dark-card` (feature card background) | Line 10 |
| `--color-border` | `.dark-card` (feature card border) | Line 13 |
| `--color-primary` | Feature icons | Line 15 |
| `--color-text-on-dark` | Title, feature labels, closing statement | Line 21 |
| `--color-text-on-dark-muted` | Body text, feature descriptions | Line 22 |

---

## 7. Scroll Reveal Integration

| Element | `data-reveal` Attribute | Reveal Order |
|---|---|---|
| Section title (`h2.solution-title`) | Yes | 1st — enters viewport first |
| Body paragraph (`p.solution-body`) | Yes | 2nd — follows title |
| Features wrapper (`div.features-wrapper`) | Yes | 3rd — entire grid reveals together |
| Closing statement (`p.solution-closing`) | Yes | 4th — final emphasis |

`useScrollReveal()` is called in `<script setup>`. The composable (from `src/composables/useScrollReveal.ts`) uses `IntersectionObserver` with `threshold: 0.15`. Each element gets `.reveal-on-scroll` class added on mount; `.is-visible` is toggled on intersection. Elements are unobserved after first reveal.

---

## 8. Responsive Design

| Breakpoint | Behavior |
|---|---|
| Desktop (`≥992px`) | Content centered in 9/12 column width. Features in 2-column grid. Title at `2.25rem`. |
| Tablet (`768–991px`) | Content in 10/12 column width. Features still 2-column. Title at `2.25rem`. |
| Mobile (`<768px`) | Full width (`col-12`). Features stack single-column. Title shrinks to `1.75rem`. Body and closing text to `1rem`. Feature labels to `1.05rem`, descriptions to `0.9rem`. |

Media query: `@media (max-width: 767.98px)` — matches ProblemSection and HeroSection patterns.

---

## 9. Line Count Estimate

| Block | Lines |
|---|---|
| `<script setup>` (with blank lines) | ~40 |
| `<template>` (with blank lines) | ~42 |
| `<style scoped>` (with blank lines) | ~58 |
| **Total** | **~140 lines** |

Within the 200-line max per file rule.

---

## 10. Expected Section Appearance in Page Flow

```
[Navbar — fixed, dark glass-morphism]
[HeroSection — id="hero", navy gradient, full-viewport]
[ProblemSection — id="problem", --color-bg-dark]      ← Task 1 (DONE)
[SolutionSection — id="solution", --color-bg-navy]     ← THIS COMPONENT
[UseCasesSection — id="use-cases", --color-bg-slate]   ← Future task
...
```

Navbar link "La Solución" → scrolls to `#solution` (wired in Navbar.vue).

---

## 11. Verification Checklist

- [ ] Component renders with correct Spanish content matching `landing-content.es.md` Section 3
- [ ] Section has `id="solution"` for navbar scroll targeting
- [ ] Background is `var(--color-bg-navy)` — no hex values
- [ ] Feature icons use `--color-primary` (vibrant blue) — contrast with ProblemSection's dim icons
- [ ] Feature icons: `bi-lightning-charge`, `bi-graph-up`, `bi-file-earmark-arrow-up`, `bi-clipboard2-check`
- [ ] `.dark-card` pattern applied to all 4 feature items
- [ ] 4 features in 2×2 grid at md+ breakpoint, single-column on mobile
- [ ] All `data-reveal` elements animate on scroll
- [ ] Feature labels use `<h3>` for semantic hierarchy
- [ ] Typography: title 2.25rem/700, body 1.125rem/400, closing 1.125rem/600, feature labels 1.125rem/600, feature descriptions 0.95rem/400
- [ ] Closing statement is bold to create emotional punch after features
- [ ] No TypeScript errors
- [ ] No linting errors
- [ ] Vite build succeeds
- [ ] File under 200 lines
- [ ] No commented-out code
- [ ] English code, Spanish user text

---

## 12. Implementation Steps (Sequential)

### Step 1: Read current file
- Read `src/components/landing/SolutionSection.vue` to confirm current stub content

### Step 2: Replace file content
- Use `create_file_code` with `overwrite: true` to write the full component
- Content: script block → template block → style block (as defined in Section 2.1)

### Step 3: Verify diagnostics
- Run `get_diagnostics_code` on the file to confirm no errors

### Step 4: Build check
- Run `npm run build` to confirm Vite compiles cleanly

### Step 5: Lint check
- Run `npm run lint` to confirm no ESLint/Prettier errors

### Step 6: Commit
- Commit with message: `feat: implement SolutionSection with 2x2 feature grid`

---

## 13. Out of Scope (for Task 2 only)

- ProblemSection changes (Task 1, already done)
- App.vue integration changes (Task 3)
- Any other landing page sections
- Styling/polish pass (Task 4)
- Unit tests (no test suite configured in project)
