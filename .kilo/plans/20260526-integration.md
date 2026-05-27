# Implementation Plan: Task 3 — App Integration

**Date**: 2026-05-27
**TOD File**: `.agent/todos/20260521/20260521-todo-0.md`
**Branch**: `feat/navbar-hero-section`

---

## 1. Current State Analysis

### 1.1 App.vue (`src/App.vue`)

All 11 components are imported and rendered:
- `<Navbar />` (outside `<main>`, top)
- `<main>` wraps: HeroSection, ProblemSection, SolutionSection, UseCasesSection, FeaturesSection, BetaSection, PricingSection, FaqSection, ContactSection
- `<Footer />` (outside `<main>`, bottom)

**Verdict**: ✅ Correct. No changes needed.

### 1.2 Navbar Menu → Section ID Mapping

| Navbar Label | `sectionId` | Component | HTML `id` | Match |
|---|---|---|---|---|
| Inicio | `hero` | HeroSection.vue | `id="hero"` | ✅ |
| El Problema | `problem` | ProblemSection.vue | `id="problem"` | ✅ |
| La Solución | `solution` | SolutionSection.vue | `id="solution"` | ✅ |
| Rubros | `use-cases` | UseCasesSection.vue | `id="use-cases"` | ✅ |
| Funcionalidades | `features` | FeaturesSection.vue | `id="features"` | ✅ |
| Prueba Gratis | `beta` | BetaSection.vue | `id="beta"` | ✅ |
| Precios | `pricing` | PricingSection.vue | `id="pricing"` | ✅ |
| Dudas | `faq` | FaqSection.vue | `id="faq"` | ✅ |
| Contacto | `contact` | ContactSection.vue | `id="contact"` | ✅ |

**Verdict**: ✅ All 9 of 9 section IDs match. No changes needed.

### 1.3 Smooth Scrolling

Implemented in `Navbar.vue`:
- `scrollToSection(sectionId)` function (line ~20-26)
- Uses `getElementById`, calculates offset with `NAVBAR_OFFSET_PX = 70`
- `window.scrollTo({ top: targetPosition, behavior: 'smooth' })`
- `closeNavCollapse()` handles mobile menu dismissal
- All 9 menu items and the CTA button use `@click.prevent="scrollToSection(...)"`

`HeroSection.vue` also has `scrollToContact()` and `scrollToSolution()` with the same offset logic.

**Verdict**: ✅ Smooth scrolling already implemented. No changes needed.

### 1.4 Observations (Non-Blocking)

1. **Duplicated offset constant**: `70` is hardcoded in `Navbar.vue` (`NAVBAR_OFFSET_PX`) and in `HeroSection.vue` (`scrollToContact`, `scrollToSolution`). These could be extracted to a shared constant, but this is cosmetic and not required for Task 3.
2. **Duplicate scroll logic**: HeroSection has its own scroll functions instead of reusing Navbar's `scrollToSection`. Refactoring is out of scope for this task.

---

## 2. Implementation Steps

### Step 2.1: Verify Build

- Run `npm run build` to confirm current state produces no errors.

### Step 2.2: No Code Changes Required

All three TODO sub-items for Task 3 are already satisfied:
1. ✅ App.vue includes `<Navbar />`, `<HeroSection />`, and proper layout
2. ✅ Smooth scrolling implemented in Navbar for all menu links
3. ✅ All section IDs are set correctly in stub components

---

## 3. Verification Checklist

- [ ] `npm run build` passes with no errors
- [ ] Navbar links scroll to correct sections in browser
- [ ] Mobile hamburger menu collapses on link click
- [ ] Footer renders below all sections

---

## 4. Conclusion

Task 3 — App Integration is **already complete**. The integration was performed implicitly during Task 1 (Navbar) and Task 2 (HeroSection) implementations. No code changes are required for this task. The plan recommends:
1. Run `npm run build` as verification
2. Proceed directly to marking Task 3 as `[DONE]`
