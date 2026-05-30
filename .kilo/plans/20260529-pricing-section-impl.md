# Plan: Pricing Section Component Implementation

## Overview

Replace the existing stub `src/components/landing/PricingSection.vue` with a full Spanish-language pricing section that explains the pay-per-use model, presents a concrete numerical example, and communicates transparency. The section follows the established dark-first design system, uses Bootstrap layout utilities, reuses `.dark-card`, applies scroll-reveal animations, and keeps all styles scoped with CSS variables only.

---

## High-Level Approach

1. Keep the existing component file path.
2. Fill the `<script setup lang="ts">` with all Spanish content as typed constants, a minimal data interface, and the `useScrollReveal()` call.
3. Build a three-block template inside a centered Bootstrap column:
   - Block A: pay-per-use explanation (plain text).
   - Block B: concrete example wrapped in `.dark-card` with a `--color-primary` left border and highlighted numbers.
   - Block C: transparency / personalization note.
4. Add scoped CSS for section background, typography, highlighted numbers, and a mobile media query.
5. Ensure every visible string is Spanish, every color is a CSS custom property, and every animated element carries `data-reveal`.

---

## Step-by-Step Implementation

### Step 1 — Script Block

**File:** `src/components/landing/PricingSection.vue` (existing stub, replace content)

**What to do:**
- Import `useScrollReveal` from `@/composables/useScrollReveal`.
- Call `useScrollReveal()`.
- Declare a `PricingExample` interface (single object, no array needed) with optional fields if desired, or simply use constants. To satisfy the "TypeScript interface for any data model needed" requirement, define:

```ts
interface PricingExampleData {
  totalDebts: string
  reconciled: string
  payableOn: string
}
```

- Declare all text constants in English variable names, Spanish values:

```ts
const sectionTitle = 'Pagás solo por lo que usás'
const explanationText = 'No cobramos cuota fija mensual. Cobramos un pequeño porcentaje únicamente sobre los pagos que se procesan y concilian a través de la plataforma.'

const exampleData: PricingExampleData = {
  totalDebts: '$1.000.000',
  reconciled: '$400.000',
  payableOn: '$400.000'
}

const exampleTitle = 'Ejemplo concreto'
const exampleLine = 'Si generás $1.000.000 en deudas en un mes y $400.000 se pagan mediante el sistema, solo abonás el porcentaje sobre esos $400.000.'

const transparencyTitle = 'Cobro transparente y personalizado'
const transparencyText = 'El cobro es mensual y transparente. Los porcentajes se definen de forma personalizada según volumen y características del cliente.'
```

### Step 2 — Template Block

**Structure:**

```html
<template>
  <section id="pricing" class="pricing-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-9">

          <!-- Title -->
          <h2 data-reveal class="pricing-title">{{ sectionTitle }}</h2>

          <!-- Block A: Explanation -->
          <p data-reveal class="pricing-explanation">{{ explanationText }}</p>

          <!-- Block B: Concrete Example -->
          <div data-reveal class="pricing-example dark-card">
            <h3 class="example-title">{{ exampleTitle }}</h3>
            <p class="example-body">
              Si generás
              <span class="highlight-number">{{ exampleData.totalDebts }}</span>
              en deudas en un mes y
              <span class="highlight-number">{{ exampleData.reconciled }}</span>
              se pagan mediante el sistema, solo abonás el porcentaje sobre esos
              <span class="highlight-number">{{ exampleData.payableOn }}</span>.
            </p>
          </div>

          <!-- Block C: Transparency Note -->
          <div data-reveal class="pricing-transparency">
            <h3 class="transparency-title">{{ transparencyTitle }}</h3>
            <p class="transparency-text">{{ transparencyText }}</p>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>
```

**Key rules:**
- `id="pricing"` is preserved for navbar anchor linking.
- All three visible blocks plus the title carry `data-reveal`.
- The example block uses `class="pricing-example dark-card"` so it receives the global card background, border, radius, and padding.
- A scoped CSS class will add the left border accent (see Step 3).
- Highlighted numbers are wrapped in `<span class="highlight-number">`.

### Step 3 — Scoped Style Block

```html
<style scoped>
.pricing-section {
  background: var(--color-bg-navy);
  color: var(--color-text-on-dark);
}

.pricing-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.25;
}

.pricing-explanation {
  font-size: 1.125rem;
  font-weight: 400;
  color: var(--color-text-on-dark-muted);
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.pricing-example {
  border-left: 4px solid var(--color-primary);
  background: var(--color-bg-card-alt);
  margin-bottom: 2.5rem;
}

.example-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  line-height: 1.3;
  color: var(--color-text-on-dark);
}

.example-body {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 0;
  color: var(--color-text-on-dark);
}

.highlight-number {
  color: var(--color-primary);
  font-weight: 700;
}

.transparency-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  line-height: 1.3;
  color: var(--color-text-on-dark);
}

.transparency-text {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 0;
  color: var(--color-text-on-dark-muted);
}

@media (max-width: 767.98px) {
  .pricing-title {
    font-size: 1.75rem;
  }

  .pricing-explanation {
    font-size: 1rem;
  }

  .example-title,
  .transparency-title {
    font-size: 1.125rem;
  }
}
</style>
```

**Key rules:**
- Background: `var(--color-bg-navy)` per style guide §3.1 (Pricing row).
- Text: `var(--color-text-on-dark)` for primary text.
- Muted text: `var(--color-text-on-dark-muted)` for explanations.
- Example card uses `.dark-card` (from `base.css`) plus an override `background: var(--color-bg-card-alt)` and `border-left: 4px solid var(--color-primary)` matching the UseCasesSection detailed example pattern.
- Highlighted numbers use `var(--color-primary)` and bold weight.
- No hardcoded hex values anywhere.
- Mobile media query (`max-width: 767.98px`) reduces title and subtitle sizes.

### Step 4 — Verification Against TODO Requirements

| Requirement | Plan Coverage |
|---|---|
| Create `src/components/landing/PricingSection.vue` replacing stub | Step 1–3 rewrite entire file |
| Spanish content from `landing-content.es.md` §7 | All strings in Step 1 match §7 exactly |
| Title: "Pagás solo por lo que usás" | `sectionTitle` constant + `<h2>` |
| Pay-per-use model (no fixed monthly fee), small percentage on reconciled payments | `explanationText` covers this |
| Concrete example: $1.000.000 debts, $400.000 reconciled → pay % only on $400.000 | `exampleData` + `exampleBody` with highlighted numbers |
| Transparent and personalized pricing | `transparencyTitle` + `transparencyText` |
| Color scheme: `--color-bg-navy` bg, `--color-text-on-dark` text | Scoped `.pricing-section` styles |
| Three content blocks: (a) explanation, (b) example, (c) transparency note | Three distinct template blocks |
| `.dark-card` for example block with `--color-primary` accent border | `.pricing-example.dark-card` + `border-left` override |
| Scoped CSS: CSS variables only, no hardcoded hex | All properties use `var(--...)` |
| `useScrollReveal()` + `data-reveal` on title, content blocks | Import/call in script; `data-reveal` on `<h2>`, `<p>`, and `<div>` blocks |
| Responsive: Bootstrap grid, media queries for mobile | `container > row > col-12 col-md-10 col-lg-9` + `@media (max-width: 767.98px)` |
| TypeScript interface for any data model needed | `PricingExampleData` interface defined |

---

## Reference: Existing Patterns Used

- **Bootstrap layout:** `container`, `row justify-content-center`, `col-12 col-md-10 col-lg-9` (same as UseCasesSection and FeaturesSection).
- **Card pattern:** `.dark-card` class from `base.css`.
- **Left accent border:** `border-left: 4px solid var(--color-primary)` (same as UseCasesSection `.detailed-example`).
- **Scroll reveal:** `useScrollReveal()` import + `data-reveal` attribute (same as both reference sections).
- **Typography sizes:** Section title `2.25rem`, card title `1.25rem`, body `1rem`, subtitle `1.125rem` (matches style guide §2.2).
- **Mobile media query:** `max-width: 767.98px` with reduced font sizes (same breakpoint as FeaturesSection and UseCasesSection).

---

## Out of Scope (for Implementer Awareness Only)

- No changes to `base.css` or `variables.css`.
- No changes to parent `App.vue` or other sections.
- No new dependencies.
- No unit tests are part of this plan; the project currently has no visible test suite configuration.
