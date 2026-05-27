# Implementation Plan: Navbar Component

**Date:** 2026-05-26
**TODO File:** `.agent/todos/20260521/20260521-todo-0.md` — Task 1
**Status:** Plan — awaiting approval

---

## 1. High-Level Approach

### Git Handling
- No separate git operations needed for this step. Work continues on `feat/navbar-hero-section`.
- Commit will happen at step 4.2 after implementation, per Critical Workflow.

### Code Writing Specifics
- Modify exactly **1 file**: `src/components/landing/Navbar.vue` (replace current 5-line stub with full implementation).
- **NO new files needed**. No types, no styles files, no composables.
- Pure Bootstrap 5 classes for the navbar structure (no custom CSS unless unavoidable for shadow/spacing tweaks).
- Single-file component (SFC) with `<script setup lang="ts">` + `<template>` + `<style scoped>`.

### Console Commands (Build Verification)
- `npm run build` — verify TypeScript compilation and Vite build pass clean.
- `npm run lint` — verify ESLint passes.

### Code Review Considerations
- Check compliance with all `.kilo/rules/` constraints (max lines, max depth, max args, etc.).
- Verify all 9 menu items match Spanish content.
- Verify smooth scroll targets match section IDs to be created in Task 2 (HeroSection) and Task 3 (all sections).
- Verify responsive behavior at all breakpoints.

### Documentation Updates
- None needed in this step. The component is self-documenting.

### Task Verification Against TODO
- ✅ Sticky navbar using Bootstrap 5 `fixed-top`
- ✅ 9 menu items with exact Spanish text
- ✅ CTA button "Quiero probar la Beta gratis"
- ✅ Smooth scroll using `scrollIntoView({ behavior: 'smooth' })`
- ✅ Responsive hamburger menu using Bootstrap `navbar-toggler` + `collapse`
- ✅ English for code/comments, Spanish for user-visible text
- ✅ No TypeScript errors

---

## 2. Detailed Implementation Steps

### Step 1: Replace `src/components/landing/Navbar.vue` — Full Component

#### 2.1 Script Section (`<script setup lang="ts">`)

**Data — Menu Items Array (private, local reactive state):**

```ts
interface NavMenuItem {
  label: string
  sectionId: string
}

const menuItems: NavMenuItem[] = [
  { label: 'Inicio', sectionId: 'hero' },
  { label: 'El Problema', sectionId: 'problem' },
  { label: 'La Solución', sectionId: 'solution' },
  { label: 'Rubros', sectionId: 'use-cases' },
  { label: 'Funcionalidades', sectionId: 'features' },
  { label: 'Prueba Gratis', sectionId: 'beta' },
  { label: 'Precios', sectionId: 'pricing' },
  { label: 'Dudas', sectionId: 'faq' },
  { label: 'Contacto', sectionId: 'contact' },
]
```

**Data — CTA text (private, local):**

```ts
const ctaText = 'Quiero probar la Beta gratis'
```

**Data — Brand name:**

```ts
const brandName = 'Cobranza App'
```

**Method — `scrollToSection(sectionId: string)` (1 param — within limit):**

```ts
function scrollToSection(sectionId: string): void {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
```

**Method — `isActiveSection(sectionId: string): boolean` (optional, for active link highlighting — can be omitted for simplicity in initial implementation):**

If included, uses a ref tracker updated via `window.addEventListener('scroll', ...)` on mount. **Recommendation: omit scroll-spy for now** to keep the component under 125 lines and avoid unnecessary complexity. Active link highlighting can be added later.

**Code guidelines enforcement in script:**
- No methods exceed 50 lines (both methods are tiny, ~5-8 lines each).
- Max 1 argument per method (`sectionId`).
- Single-section boolean conditions: `if (element)` is a single-section check.
- Interface `NavMenuItem` defined as type — no need for separate file (it's a simple inline type).
- No commented-out code.
- Private-by-default: `menuItems`, `ctaText`, `brandName` are `const` scoped to `<script setup>` (not exported/emitted).

#### 2.2 Template Section

**Bootstrap 5 Structure:**

```html
<nav class="navbar navbar-expand-lg fixed-top navbar-light bg-white shadow-sm">
  <div class="container">
    <!-- Brand -->
    <a class="navbar-brand fw-bold text-primary" href="#" @click.prevent="scrollToSection('hero')">
      {{ brandName }}
    </a>

    <!-- Mobile Toggler -->
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarContent"
      aria-controls="navbarContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Collapsible Content -->
    <div id="navbarContent" class="collapse navbar-collapse">
      <!-- Menu Items -->
      <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
        <li v-for="item in menuItems" :key="item.sectionId" class="nav-item">
          <a
            class="nav-link"
            href="#"
            @click.prevent="scrollToSection(item.sectionId)"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>

      <!-- CTA Button -->
      <a
        class="btn btn-success px-4 py-2 fw-semibold"
        href="#"
        @click.prevent="scrollToSection('contact')"
      >
        {{ ctaText }}
      </a>
    </div>
  </div>
</nav>
```

**Key Bootstrap classes explained:**
- `navbar` — base navbar container
- `navbar-expand-lg` — collapse at breakpoint `lg` (>=992px shows full menu, <992px shows hamburger)
- `fixed-top` — sticky navbar fixed to viewport top
- `navbar-light` — light color scheme for toggler
- `bg-white` — white background
- `shadow-sm` — subtle shadow for depth/separation
- `container` — Bootstrap responsive container (padded, max-width per breakpoint)
- `navbar-brand` — brand link styling
- `fw-bold` — bold brand text
- `text-primary` — Bootstrap primary color for brand
- `navbar-toggler` / `navbar-toggler-icon` — hamburger button
- `collapse navbar-collapse` — collapsible menu container (controlled by `data-bs-target`)
- `navbar-nav` — nav list styling
- `mx-auto` — center menu items horizontally on desktop
- `nav-item` / `nav-link` — individual nav items
- `btn btn-success` — green CTA button (Bootstrap success = green, conveys "go" action)
- `px-4 py-2 fw-semibold` — padding and semi-bold weight for CTA

**CTA button note:** `scrollToSection('contact')` scrolls to Contact section. The CTA text says "Quiero probar la Beta gratis" but linking to Contact is the logical action for lead capture — the user clicks to express interest, lands on the form. This matches the TODO spec where the CTA is in the navbar for lead conversion.

**Smooth scroll implementation:**
- Each link uses `@click.prevent` + `scrollToSection(sectionId)`.
- `scrollToSection` calls `document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' })`.
- No external library needed. Native browser API supported in all modern browsers.

**v-for directive:** Iterates `menuItems` using `item.sectionId` as `:key` (unique, stable).

#### 2.3 Style Section (`<style scoped>`)

Minimal scoped styles — Bootstrap handles 95% of styling. Only add what's needed:

```css
.navbar {
  transition: box-shadow 0.3s ease;
}

.nav-link {
  font-size: 0.95rem;
  transition: color 0.2s ease;
}
```

There should be no need for custom navbar padding adjustments — Bootstrap defaults plus `py-2` class (if needed) are sufficient. If shadow transition looks odd on load, can be simplified to static shadow.

**Code guidelines enforcement in style:**
- Max 125 meaningful lines: this SCSS is ~10 lines, well under the limit.
- No commented-out code.

#### 2.4 Section IDs Expected in Other Components

The navbar requires these section IDs to exist in the DOM for smooth scroll to work. They will be implemented in Tasks 2 & 3 (HeroSection + other sections):

| Menu Item | Section ID | Component |
|-----------|-----------|-----------|
| Inicio | `hero` | HeroSection.vue |
| El Problema | `problem` | ProblemSection.vue |
| La Solución | `solution` | SolutionSection.vue |
| Rubros | `use-cases` | UseCasesSection.vue |
| Funcionalidades | `features` | FeaturesSection.vue |
| Prueba Gratis | `beta` | BetaSection.vue |
| Precios | `pricing` | PricingSection.vue |
| Dudas | `faq` | FaqSection.vue |
| Contacto | `contact` | ContactSection.vue |

Section components should wrap their content in a `<section :id="sectionId">` element.

#### 2.5 Color Palette (Fintech Professional Style)

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Primary (deep navy) | Dark blue | `#1a3a5c` | Brand text, active link |
| Success / CTA | Green | Bootstrap `btn-success` | CTA button |
| Background | White | `#ffffff` | Navbar background |
| Shadow | Semi-transparent black | Bootstrap `shadow-sm` | Navbar elevation |
| Text | Dark | Bootstrap default | Nav links |
| Hover | Primary blue | Bootstrap `text-primary` on hover | Nav links hover state |

**Bootstrap theming approach:** Use Bootstrap's built-in classes (`text-primary`, `btn-success`, `bg-white`, `shadow-sm`) rather than custom CSS. If branding requires exact color matching, Bootstrap 5 SASS variables can be overridden in `src/styles/` later. For this task, Bootstrap defaults are professional enough for a fintech look.

#### 2.6 Responsive Behavior Specification

| Breakpoint | Behavior |
|-----------|----------|
| `< 992px` (below `lg`) | Hamburger icon visible. Menu collapses. Click toggler to expand vertical menu. CTA button appears at bottom of expanded menu. |
| `>= 992px` (`lg` and above) | Full horizontal menu visible. CTA button aligned to right. No hamburger. |

Bootstrap `navbar-expand-lg` handles this automatically. No additional media queries or JS required.

#### 2.7 Accessibility

- `aria-controls="navbarContent"` on toggler button
- `aria-expanded="false"` toggled by Bootstrap JS
- `aria-label="Toggle navigation"` for screen readers
- Semantic `<nav>` element
- Keyboard-navigable links (native `<a>` elements)
- Sufficient color contrast (Bootstrap defaults meet WCAG AA)

### Step 2: Build Verification

```bash
npm run build
```

Expected: `vue-tsc -b` passes (no type errors), `vite build` produces output in `dist/`.

```bash
npm run lint
```

Expected: ESLint passes with no errors or warnings.

---

## 3. Code Guidelines Compliance Checklist

| Rule | Compliance |
|------|-----------|
| Max lines per file: 200 | ✅ Estimated ~120 lines (script ~40 + template ~55 + style ~10 + blanks ~15) |
| Max lines per method: 50 | ✅ `scrollToSection`: ~5 lines |
| Max depth: 2 | ✅ No nested blocks beyond 2 levels |
| Max arguments per method: 2 | ✅ `scrollToSection` has 1 arg |
| Single-section boolean conditions | ✅ `if (element)` — single check |
| Self-documenting code | ✅ Clear variable names, no unnecessary comments |
| Prefer private members | ✅ All const/vars are scoped to `<script setup>`, not exported |
| No commented-out code | ✅ No commented-out code present |
| English code, Spanish content | ✅ All code in English, all user text in neutral Spanish |

---

## 4. Comparison to Original Task (TODO-02 Task 1)

| TODO Requirement | Plan Coverage |
|-----------------|---------------|
| Create `src/components/landing/Navbar.vue` | ✅ Step 2.1 — full file replacement |
| Sticky navbar (fixed on scroll) using Bootstrap 5 | ✅ `fixed-top` class on `<nav>` |
| 9 menu items: Inicio, El Problema, La Solución, Rubros, Funcionalidades, Prueba Gratis, Precios, Dudas, Contacto | ✅ Exact text in `menuItems` array |
| Smooth scroll to sections | ✅ `scrollIntoView({ behavior: 'smooth' })` |
| CTA button: "Quiero probar la Beta gratis" | ✅ `ctaText` constant + button in template |
| Fully responsive hamburger menu | ✅ `navbar-expand-lg` + `navbar-toggler` + `collapse` |
| English code/comments, Spanish user text | ✅ Consistent throughout plan |
| All component logic/props/events/comments in English | ✅ No emits needed, internal logic only |
| User-visible text in neutral Spanish | ✅ All labels from landing-content.es.md |

---

## 5. Implementation Order (for Step 4.2)

1. Open `src/components/landing/Navbar.vue`
2. Replace entire file with the full SFC implementation per Step 2.1–2.3 above.
3. Run `npm run build` to verify compilation.
4. Run `npm run lint` to verify code quality.
5. Commit with message: `feat: implement sticky navbar with smooth scroll navigation`

---

## 6. Notes

- The CTA button scrolls to `#contact` section. This is intentional — "Quiero probar la Beta gratis" is a lead-generation CTA; clicking it lands the user on the contact form.
- If a scroll-spy (active link highlighting) is desired later, it can be added as a separate enhancement without modifying the core structure.
- No `emits` or `props` are defined — the Navbar is a self-contained component with no parent-child communication needed.
- The `scrollToSection` function gracefully handles missing sections (no-op if `getElementById` returns null), so the navbar won't break if sections aren't in the DOM yet.
