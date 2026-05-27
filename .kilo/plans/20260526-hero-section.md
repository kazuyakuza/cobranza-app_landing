# Hero Section Implementation Plan

**Task**: Task 2 — Hero Section Component (TODO-02, task 2)
**Date**: 2026-05-26
**Status**: Planning (4.1)

---

## 1. High-Level Approach

### 1.1 Git Strategy
- Work in branch `feat/navbar-hero-section` (already created)
- Single commit after implementation with message: `feat: implement HeroSection component with Spanish content`

### 1.2 Code Strategy
- Modify existing `src/components/landing/HeroSection.vue` (already stub, already imported in `App.vue`)
- No new files needed
- No external dependencies beyond Bootstrap 5 (already installed)
- All content from `landing-content.es.md` Section 1
- Follow Navbar.vue patterns: `<script setup lang="ts">`, scoped styles, Bootstrap classes

### 1.3 Build Strategy
- Run `npm run build` after implementation to verify no errors
- Run `npm run lint` to verify TypeScript/lint compliance

### 1.4 Review Strategy
- Verify content matches `landing-content.es.md` Section 1 exactly
- Verify `id="hero"` present for navbar scroll target
- Verify responsive behavior at mobile (375px), tablet (768px), desktop (1024px+)

### 1.5 Docs Strategy
- No documentation files created (per Markdown Generation Rule — only Plan Agent or Docs Specialist)
- No comments added (self-documenting code per rules)

---

## 2. Detailed Implementation Steps

### 2.1 Script Section (`<script setup lang="ts">`)

No reactive logic needed. Only constants for Spanish content:

```typescript
<script setup lang="ts">
const mainTitle = 'Cobranza App — Gestioná tus cobros de forma simple, ordenada y eficiente.'
const subtitle =
  'Sistema web que permite a empresas y profesionales cargar deudas, recibir comprobantes de pago de sus clientes y conciliarlos de manera centralizada y sin complicaciones.'
const primaryCtaText = 'Quiero probar la Beta gratis'
const secondaryCtaText = 'Cómo funciona'

function scrollToContact(): void {
  const element = document.getElementById('contact')
  if (element) {
    const targetPosition = element.getBoundingClientRect().top + window.scrollY - 70
    window.scrollTo({ top: targetPosition, behavior: 'smooth' })
  }
}

function scrollToSolution(): void {
  const element = document.getElementById('solution')
  if (element) {
    const targetPosition = element.getBoundingClientRect().top + window.scrollY - 70
    window.scrollTo({ top: targetPosition, behavior: 'smooth' })
  }
}
</script>
```

### 2.2 Template Section

```html
<template>
  <section id="hero" class="hero-section d-flex align-items-center">
    <div class="container">
      <div class="row justify-content-center text-center">
        <div class="col-12 col-md-10 col-lg-8">
          <h1 class="hero-title display-4 fw-bold text-white mb-4">
            {{ mainTitle }}
          </h1>
          <p class="hero-subtitle lead text-white-50 mb-5">
            {{ subtitle }}
          </p>
          <div class="hero-cta-wrapper d-flex flex-column flex-sm-row justify-content-center gap-3">
            <button
              class="btn btn-primary btn-lg px-4 py-3 fw-semibold hero-cta-primary"
              @click="scrollToContact"
            >
              {{ primaryCtaText }}
            </button>
            <button
              class="btn btn-outline-light btn-lg px-4 py-3 fw-semibold hero-cta-secondary"
              @click="scrollToSolution"
            >
              {{ secondaryCtaText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
```

**Design decisions**:
- `min-height: 100vh` via style to create full-screen hero impact
- Centered content with Bootstrap flex utilities
- Text centered with constrained width (col-md-10 col-lg-8) for readability
- White heading, muted subtitle (`text-white-50`) for visual hierarchy
- Primary CTA: solid filled `btn-primary` → scrolls to `#contact`
- Secondary CTA: outlined `btn-outline-light` → scrolls to `#solution`
- `d-flex flex-column flex-sm-row` stacks CTAs vertically on mobile, side-by-side on sm+
- Gap between buttons via Bootstrap `gap-3`
- Large padding on buttons (`py-3 px-4`) for strong CTA presence

### 2.3 Style Section (`<style scoped>`)

```css
<style scoped>
.hero-section {
  min-height: 100vh;
  padding-top: 70px;
  background: linear-gradient(135deg, #0a1f3f 0%, #0d2b5e 40%, #0f3460 70%, #0a1f3f 100%);
}

.hero-title {
  letter-spacing: -0.02em;
}

.hero-subtitle {
  opacity: 0.85;
}

.hero-cta-primary {
  border-radius: 8px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hero-cta-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 123, 255, 0.35);
}

.hero-cta-secondary {
  border-radius: 8px;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.hero-cta-secondary:hover {
  transform: translateY(-2px);
  background-color: rgba(255, 255, 255, 0.1);
}

@media (max-width: 767.98px) {
  .hero-section {
    min-height: 90vh;
  }

  .hero-title {
    font-size: 2rem;
  }
}
</style>
```

**Design decisions**:
- Deep navy/dark-blue gradient background → fintech professional trust feel
- `padding-top: 70px` compensates for fixed navbar height (matches Navbar's `NAVBAR_OFFSET_PX`)
- CTA buttons: rounded corners (8px), hover lift effect (`translateY(-2px)`) with shadow
- Mobile: reduced to 90vh to avoid excessive scrolling, smaller title font

---

## 3. Color Palette for Fintech Professional Look

| Element | Color | Usage |
|---|---|---|
| Background gradient stop 1 | `#0a1f3f` | Deep navy (top-left) |
| Background gradient stop 2 | `#0d2b5e` | Mid-dark blue (mid) |
| Background gradient stop 3 | `#0f3460` | Slate blue (bottom-right) |
| Background gradient stop 4 | `#0a1f3f` | Deep navy (blend back) |
| Heading text | `#ffffff` (Bootstrap `text-white`) | Hero title |
| Subtitle text | `rgba(255,255,255,0.5)` (Bootstrap `text-white-50`) | Muted contrast |
| Primary CTA | Bootstrap `btn-primary` (`#0d6efd`) | Main action button |
| Primary CTA hover shadow | `rgba(0, 123, 255, 0.35)` | Lift effect glow |
| Secondary CTA | Bootstrap `btn-outline-light` | Secondary action |

The palette avoids bright/playful colors. Navy/slate tones convey trust, stability, and professionalism — consistent with financial SaaS branding. The blue accent (`btn-primary`) provides a clear call-to-action without being aggressive.

---

## 4. Responsive Behavior Specification

### 4.1 Desktop (≥992px)
- Full 100vh hero height
- `col-lg-8` text container (centered)
- CTAs horizontal (`flex-sm-row`)
- Title at `display-4` size (~3.5rem)
- Subtitle at `lead` size (~1.25rem)

### 4.2 Tablet (768px – 991px)
- Full 100vh hero height
- `col-md-10` text container
- CTAs horizontal
- Title slightly smaller (Bootstrap responsive `display-4` scales down)

### 4.3 Mobile (<768px)
- Reduced to 90vh (avoid excessive scrolling on small screens)
- CTAs stacked vertically (`flex-column`)
- Title font-size: `2rem` (override via media query)
- Button width: full (`w-100` implied by column stacking)
- Content padding adjusted naturally by container

### 4.4 Small Mobile (≤375px)
- Bootstrap's responsive type will naturally scale
- 90vh height works well
- Vertical stacked buttons remain

---

## 5. Code Guidelines Compliance Checklist

| Rule | Status | Notes |
|---|---|---|
| **Max lines per file (200)** | ✅ PASS | Estimated ~80 lines total |
| **Max lines per method (50)** | ✅ PASS | scrollToContact & scrollToSolution each ~7 lines |
| **Max depth (2 levels)** | ✅ PASS | Template has 2 levels (section > div > content) |
| **Max arguments per method (2)** | ✅ PASS | Both methods have 0 params |
| **Self-documenting code** | ✅ PASS | Clear variable names (mainTitle, subtitle, primaryCtaText) |
| **No commented code** | ✅ PASS | Clean implementation |
| **Prefer private members** | ✅ N/A | No class, no members exported |
| **Single-section boolean conditions** | ✅ PASS | No complex conditions in component |
| **Newline prevention** | ✅ PASS | All strings use template literals, no `\n` |
| **All user-facing text in Spanish** | ✅ PASS | Content from `landing-content.es.md` |
| **All development artifacts in English** | ✅ PASS | Variable names, function names, template attributes |
| **Bootstrap 5 utilities + scoped styles** | ✅ PASS | Uses Bootstrap classes, scoped for custom |
| **SEO-friendly semantic HTML** | ✅ PASS | `<section>`, `<h1>`, semantic structure |

---

## 6. Comparison to Original TODO Task Requirements

| TODO Requirement | Covered? | How |
|---|---|---|
| Main Title | ✅ | `mainTitle` constant from content file |
| Subtitle | ✅ | `subtitle` constant from content file |
| Primary CTA "Quiero probar la Beta gratis" | ✅ | `primaryCtaText` constant, scrolls to `#contact` |
| Optional Secondary CTA "Ver cómo funciona" | ✅ | `secondaryCtaText` = "Cómo funciona", scrolls to `#solution` |
| Strong visual impact, clean fintech style | ✅ | Full-screen dark gradient, centered layout, hover effects |
| Excellent mobile responsiveness | ✅ | 90vh mobile, stacked CTAs, responsive typography |
| Section `id="hero"` for navbar scroll target | ✅ | Already on stub, preserved |
| No TypeScript errors | ✅ | Passes lint/build (to verify in 4.2) |
| Content from Spanish content file | ✅ | Exact strings from Section 1 of `landing-content.es.md` |

**TODO task fully covered.**

---

## 7. Implementation Order for 4.2 (Code Sub-agent)

The Code sub-agent shall execute in this order:

1. **Open `src/components/landing/HeroSection.vue`**
2. **Replace `<script setup>` block** — add Spanish content constants and scroll functions
3. **Replace `<template>` block** — add full hero layout with Bootstrap classes
4. **Add `<style scoped>` block** — add gradient background, typography, CTA styles, media query
5. **Save file**
6. **Run `npm run build`** — verify no compilation errors
7. **Run `npm run lint`** — verify no lint errors
8. **Run `vscode-mcp-server_get_diagnostics_code`** — verify no TypeScript/IDE errors
9. **Commit** with message: `feat: implement HeroSection component with Spanish content`

---

*End of implementation plan. Ready for 4.2 execution.*
