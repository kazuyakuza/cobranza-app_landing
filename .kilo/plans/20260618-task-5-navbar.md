# Plan — Task 5: Update Navbar (reduced menu + new CTA text)

- **Date:** 2026-06-18
- **TODO task:** Task 5 — Update Navbar
- **Workflow step:** 4.1 Analysis & Planning (Critical Workflow)
- **Status:** Draft (pending approval)
- **Plan author:** Architect sub-agent
- **Scope:** Single discrete step — analysis & planning only. No code written in this step.

---

## 1. Context

[Project Info: Active] Cobranza App Landing Page — Vue 3 + TypeScript + Bootstrap 5 single-page landing.

The Navbar (`src/components/landing/Navbar.vue`) currently lists 9 menu items and a CTA whose text references the Beta program. The product narrative changed: a new `HowItWorksSection` was added between `SolutionSection` and `UseCasesSection`, and the public-facing CTA messaging shifted from "Beta" framing to "early access" framing. The Navbar menu and CTA must be aligned with the current page structure and messaging.

---

## 2. Current State (verified)

File: `src/components/landing/Navbar.vue` (151 lines).

- `menuItems: NavMenuItem[]` (lines 10–20) — 9 items, order:
  1. Inicio → `hero`
  2. El Problema → `problem`
  3. La Solución → `solution`
  4. Rubros → `use-cases`
  5. Funcionalidades → `features`  ← REMOVE
  6. Prueba Gratis → `beta`        ← REMOVE
  7. Precios → `pricing`
  8. Dudas → `faq`
  9. Contacto → `contact`
- `ctaText = 'Quiero probar la Beta gratis'` (line 22).
- CTA button (lines 105–111) scrolls to `contact`, `d-none d-lg-inline-block` (desktop only).
- IntersectionObserver (lines 50–68) loops `for (const item of menuItems)` and observes `document.getElementById(item.sectionId)`. Fully dynamic over `menuItems`.
- `activeSectionId` initialized to `'hero'` (line 24).
- No test script in `package.json`. Scripts: `dev`, `build` (`vue-tsc -b && vite build`), `preview`, `lint` (`eslint .`).

### Target sections existence (verified via grep)

All 8 target IDs exist as `<section id="...">`:
- `hero` (HeroSection), `problem` (ProblemSection), `solution` (SolutionSection), `how-it-works` (HowItWorksSection, line 45), `use-cases` (UseCasesSection), `pricing` (PricingSection), `faq` (FaqSection), `contact` (ContactSection).

### Render order in `App.vue` (verified)

Hero → Problem → Solution → **HowItWorks** → UseCases → Features → Beta → Pricing → Faq → Contact.
The new menu order follows this visual order (skipping Features and Beta, which stay rendered but leave the nav).

---

## 3. Target State

`menuItems` reduced to 8 items, in page-visual order:

1. Inicio → `hero`
2. El Problema → `problem`
3. La Solución → `solution`
4. Cómo funciona → `how-it-works`   ← NEW
5. Rubros → `use-cases`
6. Precios → `pricing`
7. Dudas → `faq`
8. Contacto → `contact`

`ctaText = 'Solicitar acceso anticipado gratuito'` (matches HeroSection primary CTA and FloatingCta).

No other logic, template, or style changes.

---

## 4. High-Level Approach

Minimal, surgical edit to a single file:

1. Replace the `menuItems` array body: drop the `features` and `beta` entries, insert the `how-it-works` entry between `solution` and `use-cases`.
2. Replace the `ctaText` string literal.
3. Rely on the existing dynamic IntersectionObserver loop — no observer code change (it auto-adapts to the new array length).
4. Validate with type-check build + lint, then visual sanity check.

Why no observer change: the observer iterates `menuItems` at runtime, so removing/adding entries automatically observes the correct 8 sections. `activeSectionId` initial value `'hero'` remains valid because `hero` stays in the list.

Why no CSS change: the nav goes from 9 links to 8 links plus the existing right-aligned CTA. Net horizontal width decreases (two labels removed, one similar-length label "Cómo funciona" added, roughly the same width as the removed "Funcionalidades"). `navbar-expand-lg` collapses to hamburger at <992px; at >=992px the reduced set fits within the `container` width. Overflow risk strictly decreases.

---

## 5. Detailed Implementation Steps (delegated to 4.2 Implementer)

All work on the current feature branch (created in Critical Workflow step 2). Follow [Gitignore Compliance Rule](../../.kilo/rules/gitignore-compliance.md) before any commit.

### Step 5.1 — Edit `menuItems` array

File: `src/components/landing/Navbar.vue`

Replace lines 10–20 (the full `menuItems` array) with:

```ts
const menuItems: NavMenuItem[] = [
  { label: 'Inicio', sectionId: 'hero' },
  { label: 'El Problema', sectionId: 'problem' },
  { label: 'La Solución', sectionId: 'solution' },
  { label: 'Cómo funciona', sectionId: 'how-it-works' },
  { label: 'Rubros', sectionId: 'use-cases' },
  { label: 'Precios', sectionId: 'pricing' },
  { label: 'Dudas', sectionId: 'faq' },
  { label: 'Contacto', sectionId: 'contact' }
]
```

Verification: array has exactly 8 entries; `features` and `beta` absent; `how-it-works` present at index 3; `NavMenuItem` interface unchanged (still `label` + `sectionId`).

### Step 5.2 — Edit `ctaText` constant

Same file, line 22. Replace:

```ts
const ctaText = 'Quiero probar la Beta gratis'
```

with:

```ts
const ctaText = 'Solicitar acceso anticipado gratuito'
```

Verification: grep `Quiero probar la Beta gratis` in `src/components/landing/Navbar.vue` returns no matches; grep `Solicitar acceso anticipado gratuito` returns 1 match.

### Step 5.3 — No further edits

Do NOT touch: IntersectionObserver block, `scrollToSection`, `closeNavCollapse`, `handleClickOutside`, template, `<style>`. Do NOT delete `FeaturesSection.vue` or `BetaSection.vue` (sections stay rendered; only nav links are removed).

### Step 5.4 — Type-check + build

Console (project root):

```bash
npm run build
```

Expected: `vue-tsc -b` passes (type errors = 0) and `vite build` emits `dist/`. Any type error in `Navbar.vue` -> fix and rerun.

### Step 5.5 — Lint

Console:

```bash
npm run lint
```

Expected: 0 errors, 0 warnings. If prettier/eslint reports formatting, apply the suggested fix and rerun.

### Step 5.6 — Commit

Stage only `src/components/landing/Navbar.vue` (after `git status` + `.gitignore` check; ensure no `dist/`, `node_modules/` staged).

```bash
git add src/components/landing/Navbar.vue
git commit -m "feat(navbar): reduce menu to 8 items and update CTA text to early access"
```

---

## 6. Code Review Checklist (delegated to 4.3 Code Reviewer)

- [ ] `menuItems` has exactly 8 entries in the order: hero, problem, solution, how-it-works, use-cases, pricing, faq, contact.
- [ ] No `features` or `beta` entries remain in `menuItems`.
- [ ] `ctaText` equals `'Solicitar acceso anticipado gratuito'` (exact string, neutral Spanish).
- [ ] No changes to IntersectionObserver logic, lifecycle hooks, or template/style beyond the two planned edits.
- [ ] `NavMenuItem` interface not modified.
- [ ] No commented-out code introduced (per no-commented-code rule).
- [ ] File line count still < 200 (expected ~149 lines) — satisfies max-lines-per-file.
- [ ] Method bodies still <= 50 lines and depth <= 2 — satisfies max-lines-per-method and max-depth.
- [ ] `npm run build` and `npm run lint` both pass.
- [ ] No gitignore-matching files staged in the commit.

If any item fails, Code Reviewer saves a fix plan to `.kilo/plans/<YYYYMMDD>-task-5-navbar-fix.md` and Plan Agent delegates the fix to the Implementer (max 3 cycles).

---

## 7. Documentation (delegated to 4.4 Docs Specialist)

- `Navbar.vue` code is self-documenting (`menuItems`, `ctaText`, `brandName`); no code comments required per self-documenting-code rule.
- Update `.agent/project-info/context.md` "Recent Changes" with a one-line entry: `Navbar.vue updated — menu reduced to 8 items (removed Funcionalidades/Prueba Gratis, added Cómo funciona); CTA text changed to "Solicitar acceso anticipado gratuito"`.
- No README change required (Navbar behavior unchanged at the user-instruction level).

---

## 8. Verification (delegated to 4.5 Architect)

- Re-read `Navbar.vue` and confirm the two edits match Section 3 target state exactly.
- Confirm `git status` shows no unstaged unrelated files; commit present on feature branch.
- Optional manual check: run `npm run dev`, scroll the page, confirm the navbar shows 8 links, "Cómo funciona" highlights when the HowItWorks section is in view (scroll-spy), and the CTA reads "Solicitar acceso anticipado gratuito" and scrolls to contact.

---

## 9. Task Completion (delegated to 4.6 Implementer)

- Mark Task 5 as `[DONE]` in the TODO file per its item format (line item -> append to line; section item -> append to section title; preserve original content).
- Commit the TODO update:

```bash
git add .agent/todos/<path-to-todo-file>
git commit -m "chore(todo): mark task 5 navbar update as done"
```

---

## 10. Rules Compliance (pre-checked)

| Rule | Status |
|---|---|
| max-lines-per-file (<200, src/) | Pass — ~149 lines |
| max-lines-per-method (<=50) | Pass — methods unchanged, all short |
| max-depth (<=2) | Pass — observer loop+if stays at depth 2 |
| single-section-boolean-conditions | Pass — `if (entry.isIntersecting)` single section |
| self-documenting-code | Pass — clear constant/array names |
| no-commented-code | Pass — no commented code introduced |
| prefer-private-members | N/A — Vue `<script setup>`, no class |
| max-arguments-per-method (<=2) | Pass — `scrollToSection(sectionId)` 1 arg |
| newline-prevention | Pass — real newlines in edit |
| project-structure | Pass — edit inside existing `src/components/landing/` |
| gitignore-compliance | To enforce at commit (5.6) |
| military-mode-communication | Pass — plan is technical/concise |

---

## 11. Out-of-Scope Observations (NOT modified in this task)

1. **`Footer.vue` line 17** still has `{ label: 'Funcionalidades', sectionId: 'features' }` in its own nav links. This is a separate component and outside Task 5's scope. Recommend a follow-up TODO to reconcile Footer nav with the reduced menu if full consistency is desired. Do NOT edit `Footer.vue` in this task.
2. `FeaturesSection.vue` and `BetaSection.vue` remain imported and rendered in `App.vue`. The TODO removes them from the **Navbar menu only**, not from the page. No deletion.
3. `FloatingCta.vue` already uses "Solicitar acceso anticipado gratuito"; the new Navbar CTA text aligns with it — no conflict.

---

## 12. Risks & Mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| Typo in `how-it-works` sectionId breaks scroll-spy | Low | grep-verified section id matches; build type-check catches nothing (ids are strings) — manual scroll-spy check in 4.5 |
| Accidental edit of observer/template | Low | Section 5.3 explicitly forbids; Code Review checklist 6 enforces |
| Committing `dist/` after build | Medium | gitignore-compliance check at 5.6 before `git add` |
| Inconsistency with Footer nav | Low | Flagged as out-of-scope follow-up; not a blocker for Task 5 |

---

## 13. Summary

Single-file, two-edit change to `src/components/landing/Navbar.vue`: reduce `menuItems` from 9 to 8 (drop `features` + `beta`, add `how-it-works` in page order) and update `ctaText` to early-access messaging. No observer/template/style changes. Validate via `npm run build` + `npm run lint`, commit on the feature branch, then proceed through 4.3–4.6 of the Critical Workflow.
