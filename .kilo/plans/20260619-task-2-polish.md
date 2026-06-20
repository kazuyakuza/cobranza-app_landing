# Plan — Task 2: Polish & Consistency (TODO-12)

- **TODO source:** `.agent/todos/20260619/20260619-todo-3.md` (Task 2, lines 129–133)
- **Plan date:** 2026-06-19
- **Scope:** Visual cleanliness, mobile responsiveness, and section-flow verification across the 12 components modified in Task 1. **Plan only** — no implementation in this step.
- **Workflow step:** Critical Workflow 4.1 (Analysis & Planning). Implementation is step 4.2 (implementer).

## Goal

Verify and polish every comparison, list, table, and explanation added in Task 1 so the landing page reads as visually clean, professional, fully mobile-responsive, and with smooth transitions between sections. Produce a concrete, verifiable checklist plus the specific CSS tweaks required.

## Modified Components Under Review

| # | File | New/changed element to polish |
|---|------|-------------------------------|
| 1 | `src/components/landing/HeroSection.vue` | Long new subtitle |
| 2 | `src/components/landing/ProblemSection.vue` | "Casos comunes" list at end |
| 3 | `src/components/landing/SolutionSection.vue` | Antes/Después comparison + embedded Excel block |
| 4 | `src/components/landing/SolutionExcelComparison.vue` | New 3-column comparison table |
| 5 | `src/components/landing/HowItWorksSection.vue` | Conciliation step now embeds diagram |
| 6 | `src/components/landing/ConciliationDiagram.vue` | New SVG conciliation diagram |
| 7 | `src/components/landing/FeaturesSection.vue` | Two accordion groups + intro texts |
| 8 | `src/components/landing/FaqSection.vue` | Nested group accordion shell |
| 9 | `src/components/landing/FaqGroupAccordion.vue` | Nested group+question accordion |
| 10 | `src/components/landing/UseCasesTabs.vue` | Desktop tabs + mobile accordion |
| 11 | `src/components/landing/UseCaseComparison.vue` | Before/after comparison blocks |
| 12 | `src/components/landing/Navbar.vue` | 9-item menu + scroll-spy highlight |

## Pre-Analysis Findings (from code review)

The dark-first alternation and section backgrounds already match the style guide (`style-guide.md` §3.1). Section padding is uniform (`base.css`: `5rem` top/bottom). The issues below are the concrete polish targets; each maps to a step in the checklist.

- **F-1 Consistency:** `HowItWorksSection` title is `text-align: center` + `margin-bottom: 3rem`; every other section title is left-aligned with `margin-bottom` of `1.5rem` (Problem/Solution/UseCases/Faq) or `0.5rem` (Features). Title alignment and top spacing are inconsistent across sections.
- **F-2 Navbar crowding:** 9 Spanish nav labels plus the long CTA "Solicitar acceso anticipado gratuito" (`d-none d-lg-inline-block`) compete for horizontal space at the `lg` breakpoint (992–1200px). Risk of wrap/overflow.
- **F-3 Diagram legibility (HIGH):** `ConciliationDiagram.vue` uses `viewBox="0 0 620 300"` with `width="100%"` and 11px text on mobile. On a 320–375px viewport the SVG scales to ~0.5×, rendering text at ~5.5px — effectively unreadable.
- **F-4 Redundant CSS:** `FaqGroupAccordion.vue` declares `.faq-question-button::after` and `:focus` twice (combined block lines 111–120, then again lines 148–155).
- **F-5 Spacing:** In `SolutionSection.vue`, the accent closing statement has no `margin-bottom`; the gap to the Excel heading relies solely on `.excel-comparison-heading { margin-top: 2.5rem }`. Verify it reads as intentional separation, not a floating gap.
- **F-6 Diagram edge routing:** The edge from Deuda `(x1=160, y1=126)` to Match `(x2=360, y2=170)` may visually cross the Comprobante node box (`translate(170,170)`, width 140). Verify no overlap.
- **F-7 Tablet tab UX:** `UseCasesTabs.vue` shows the mobile accordion only below `md` (<768px); at `md`–`lg` (768–991px) it keeps horizontally-scrolling tabs. Optional improvement.
- **F-8 Hero subtitle length:** New subtitle is a long single sentence in `.lead` (1.25rem). Verify line length/readability on small phones.
- **F-9 Verification of prior fix:** TODO item (line 124) — accordion text centering, missing top padding, extra bottom space — was marked `[DONE]` in Task 1. Re-verify in `FeaturesSection.vue` that the accordion body padding is balanced (currently `1rem 1.5rem 1rem 3.1rem`).

## High-Level Approach

1. Run build + lint first to establish a clean baseline before any tweak.
2. Apply the concrete CSS tweaks identified below (atomic, per component).
3. Execute the per-component visual checklist (desktop + mobile).
4. Execute the section-flow checklist (background sequence + transitions).
5. Execute the mobile breakpoint QA matrix.
6. Re-run build + lint; visual QA at each breakpoint; commit.

## Step 0 — Baseline Build & Lint

- [ ] Run `npm run build` from `C:\projects\cobranza-app\landing`; confirm it passes with no new errors.
- [ ] Run `npm run lint`; confirm no new warnings/errors.
- [ ] Record baseline output; any tweak that breaks these must be reverted or fixed.

## Step 1 — Concrete CSS Tweaks (atomic, verifiable)

> Each tweak is scoped to `<style scoped>` of the named file unless noted. Use CSS variables only (style-guide §8). No hardcoded hex. Keep methods ≤50 lines and ≤2 levels nesting (project rules).

### Tweak 1.1 — Standardize section title alignment and spacing (F-1)
- **File:** `src/components/landing/HowItWorksSection.vue`
- **Change:** In `.section-title`, remove `text-align: center;` and change `margin-bottom: 3rem;` → `margin-bottom: 1.5rem;` to match Problem/Solution/UseCases/Faq.
- **Alternative (if centered is intentional):** leave HowItWorks centered but document the exception; in that case align only `margin-bottom` to `1.5rem`. **Decide before implementing.**
- **Also normalize:** `FeaturesSection.vue` `.features-title { margin-bottom: 0.5rem }` → `1.5rem` (the `0.5rem` was set because a subtitle follows; if kept, document as intentional).
- **Verify:** all section titles share the same left alignment and `1.5rem` bottom gap (or documented exceptions).

### Tweak 1.2 — Prevent navbar crowding at `lg` (F-2)
- **File:** `src/components/landing/Navbar.vue`
- **Option A (preferred):** change the desktop CTA from `d-none d-lg-inline-block` to `d-none d-xl-inline-block` so the long CTA appears only at `xl` (≥1200px); below that the menu stays link-only (the mobile FloatingCta already covers small screens).
- **Option B:** keep `lg` but add a scoped rule reducing `.nav-link` font-size to `0.875rem` between `lg` and `xl` via `@media (min-width: 992px) and (max-width: 1199.98px)`.
- **Verify at 992px and 1100px:** brand + 9 links fit on one row without wrapping or horizontal overflow; active highlight still visible.

### Tweak 1.3 — Make ConciliationDiagram legible on mobile (F-3, HIGH)
- **File:** `src/components/landing/ConciliationDiagram.vue`
- **Change:** give the SVG a minimum readable width and wrap it in a horizontally scrollable container on small screens. Concrete approach:
  - In template, wrap the `<svg>` in `<div class="conciliation-diagram-scroll">`.
  - CSS: `.conciliation-diagram-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; }` and `.conciliation-diagram { min-width: 480px; }` inside the `@media (max-width: 767.98px)` block (keep `max-width: 100%` removed on mobile so min-width wins; on desktop keep `max-width: 560px`).
  - Alternatively raise `viewBox` text `font-size` from `13px`/`11px` to `16px`/`13px` so scaled text stays readable.
- **Verify on 320px & 375px:** diagram text is readable; horizontal swipe works; no layout overflow beyond the card.

### Tweak 1.4 — Remove duplicate CSS in FaqGroupAccordion (F-4)
- **File:** `src/components/landing/FaqGroupAccordion.vue`
- **Change:** delete the duplicate `.faq-question-button::after` (lines ~148–150) and `.faq-question-button:focus` (lines ~152–155); keep the single combined declarations at lines 111–120 which already cover both `.faq-group-button` and `.faq-question-button`.
- **Verify:** no visual change; lint/build clean.

### Tweak 1.5 — Clarify spacing before Excel comparison (F-5)
- **File:** `src/components/landing/SolutionSection.vue` and `src/components/landing/SolutionExcelComparison.vue`
- **Change:** add `margin-bottom: 1rem;` to `.solution-closing` and reduce `.excel-comparison-heading { margin-top: 2.5rem }` → `margin-top: 1.5rem;` for a tighter, intentional separation.
- **Verify:** closing accent line → Excel heading reads as one grouped "why Excel/WhatsApp isn't enough" block, not a floating gap.

### Tweak 1.6 — Fix diagram edge routing if overlapping (F-6)
- **File:** `src/components/landing/ConciliationDiagram.vue`
- **Check first:** render desktop + mobile; confirm whether the Deuda→Match line visually crosses the Comprobante rectangle.
- **If overlapping:** route the Deuda edge to the Comprobante left edge instead (e.g., `x2=170, y2=188`) so flow reads Deuda→Comprobante→Match, matching the TODO ASCII diagram; or bend the path. Adjust coordinates and re-verify arrows point correctly.
- **If not overlapping:** no change; mark verified.

### Tweak 1.7 — Optional: tablet accordion for UseCasesTabs (F-7)
- **File:** `src/components/landing/UseCasesTabs.vue`
- **Optional change:** swap breakpoints from `d-none d-md-block` / `d-md-none` to `d-none d-lg-block` / `d-lg-none` so tablets (768–991px) get the accordion instead of horizontal-scroll tabs.
- **Decide:** only if QA shows tab scroll is awkward at 768–991px. Otherwise leave as-is.

### Tweak 1.8 — Optional: Hero subtitle mobile size (F-8)
- **File:** `src/components/landing/HeroSection.vue`
- **Optional change:** inside `@media (max-width: 767.98px)` add `.hero-subtitle { font-size: 1.125rem; }` if the `.lead` 1.25rem feels too large for the long sentence on small phones.
- **Decide based on QA.**

## Step 2 — Per-Component Visual Checklist

For each component verify: spacing, alignment, color (CSS vars only), typography (per style-guide §2.2), and that `data-reveal` is present on the right elements.

### 2.1 HeroSection.vue
- [ ] Title `display-4` white, `2rem` on mobile; long subtitle uses `--color-text-on-dark-muted` + `opacity 0.85`.
- [ ] CTA wrapper `flex-column flex-sm-row gap-3`; buttons `8px` radius, hover `translateY(-2px)`.
- [ ] Mobile `min-height 90vh`, `padding-top calc(navbar-height + 2rem)`; no overlap with fixed navbar.
- [ ] Subtitle line-length/readability on 320px (see Tweak 1.8).

### 2.2 ProblemSection.vue
- [ ] Title `2.25rem`→`1.75rem` mobile; body `1.125rem`→`1rem` mobile.
- [ ] Pain-point cards: `col-12 col-md-6`, `dark-card h-100`, icon `--color-text-on-dark-dim`, even row heights.
- [ ] "Casos comunes" intro `--color-pain` weight 600; list markers `bi-exclamation-triangle` `--color-pain`; text `--color-text-on-dark-muted` `0.9rem` mobile.
- [ ] No double bottom margin between pain-points block, closing line, and cases list.

### 2.3 SolutionSection.vue
- [ ] Antes/Después headers `--color-pain` / `--color-accent`; 2-col grid desktop, hidden + per-cell labels on mobile.
- [ ] Comparison cells: `--color-bg-card`, 3px left accent, `0.95rem` text; "después" text brighter (`--color-text-on-dark`).
- [ ] Closing accent line → Excel block spacing (see Tweak 1.5).
- [ ] Mobile: headers hidden, cell labels `0.7rem` uppercase show, single column.

### 2.4 SolutionExcelComparison.vue
- [ ] Heading `1.25rem`→`1.1rem` mobile; table `table-responsive` (horizontal scroll), `table-bordered align-middle`.
- [ ] `thead th` + `tbody th` (Aspect column) `--color-bg-card` `--color-text-on-dark` weight 600; `td` `--color-bg-card-alt`; Cobranza column `--color-accent` weight 600.
- [ ] Mobile font `0.875rem`; verify 3 columns fit or scroll cleanly; first column readable.
- [ ] Optional: sticky first column (not required).

### 2.5 HowItWorksSection.vue
- [ ] Title alignment/spacing per Tweak 1.1.
- [ ] Timeline: nodes `--node-color`, dashed for `sistema`, filled for `resultado`; connecting lines render continuously between steps.
- [ ] Conciliation step card embeds diagram with `margin-top 0.5rem`; card padding `1.2rem 1.5rem` (`1rem` mobile).
- [ ] Mobile: node 30px, timeline col 36px, text `0.95rem`.

### 2.6 ConciliationDiagram.vue
- [ ] Accessibility: `role="img"` + `aria-label` present; remove redundant `aria-hidden="false"` on wrapper if it adds no value.
- [ ] Node fill/stroke use CSS vars; Match node accent border `2px`; Validación node accent border.
- [ ] Edge routing verified (Tweak 1.6); arrowheads render via `#conciliationArrow` marker.
- [ ] Mobile legibility fix applied (Tweak 1.3); no overflow beyond step card.

### 2.7 FeaturesSection.vue
- [ ] Two groups side-by-side `col-12 col-lg-6`; `feature-group--company` (primary) / `--user` (accent) left border 4px.
- [ ] Group title + intro text render above each accordion; intro `--color-text-on-dark-muted`.
- [ ] Accordion: button `font-weight 500`, icon `--group-color`, body padding balanced (re-verify F-9: no missing top padding, no extra trailing space).
- [ ] Mobile: title `1.75rem`, group title `1.125rem`, button `0.9375rem`, body left-indent aligns under text.

### 2.8 FaqSection.vue
- [ ] Section bg `--color-bg-card-alt`; title `2.25rem`→`1.75rem` mobile.
- [ ] Outer accordion shell `#faqOuterAccordion`; `data-reveal` present.

### 2.9 FaqGroupAccordion.vue
- [ ] General group open by default; first question of every group open by default (verify in DOM: `show` class + `aria-expanded`).
- [ ] Group button `1.25rem` weight 600; question button `1rem` weight 500; both use `--group-color` left accent.
- [ ] Answer body `--color-text-on-dark-muted`; optional `note` block italic with 2px left accent.
- [ ] Duplicate CSS removed (Tweak 1.4); mobile sizes applied (`1.125rem` group, `0.9375rem` question/answer).
- [ ] Only one group open at a time (outer `data-bs-parent`); only one question per group open (inner `data-bs-parent`).

### 2.10 UseCasesTabs.vue
- [ ] Desktop tabs `d-none d-md-block` (or `d-lg-block` per Tweak 1.7): `nav-tabs` nowrap, active state uses CSS vars, ARIA roles complete.
- [ ] Mobile accordion `d-md-none` (or `d-lg-none`): first item open, single-open via `data-bs-parent`.
- [ ] Tab content card `--color-bg-card`, bottom radius `12px`, padding `1.75rem` (`1.25rem` mobile).
- [ ] Title "Seleccioná tu caso" `1.5rem`→`1.25rem` mobile.

### 2.11 UseCaseComparison.vue
- [ ] 2-col grid desktop → 1-col mobile; habitual `--color-pain` / cobranza `--color-accent` left borders + icons.
- [ ] Labels uppercase `0.8rem`; text `0.95rem` `--color-text-on-dark`.
- [ ] Renders identically inside both desktop tab pane and mobile accordion body.

### 2.12 Navbar.vue
- [ ] Scroll-spy highlights the most-visible section among all 9 (verify at hero, problem, solution, how-it-works, use-cases, features, pricing, faq, contact).
- [ ] Active link `--color-primary` weight 600; inactive `--color-text-on-dark-muted` → hover `--color-text-on-dark`.
- [ ] Mobile menu closes on outside click, on scroll, and on link click.
- [ ] No wrap/overflow at 992–1200px after Tweak 1.2.

## Step 3 — Section Flow & Transition Checklist

- [ ] Background sequence matches style-guide §3.1: Hero(navy)→Problem(dark)→Solution(navy)→HowItWorks(dark)→UseCases(slate)→Features(dark)→Beta(gradient)→Pricing(navy)→Faq(card-alt)→Contact(dark)→Footer(deepest).
- [ ] Each adjacent pair differs only by a subtle shade shift (2–4% luminance); no jarring jumps except the Beta breaker.
- [ ] Section vertical padding uniform `5rem` (base.css); Hero override only.
- [ ] No horizontal scrollbar introduced by any new table/diagram at any breakpoint.
- [ ] Scroll reveal (`data-reveal`) fires once on each new block (comparison, Excel table, diagram step, accordions, tabs).

## Step 4 — Mobile Breakpoint QA Matrix

Manually verify (DevTools device toolbar or browser resize) at each width. Pass = no overflow, readable text, correct stacking.

| Width | Devices | Key checks |
|-------|---------|-----------|
| 320px | iPhone SE | Diagram readable (Tweak 1.3); Excel table scrolls; FAQ nested accordion usable; navbar collapses. |
| 375px | iPhone 12/13 | Same as 320px; Hero subtitle readable. |
| 414px | iPhone Plus | Pain cards 1-col; comparison 1-col with labels. |
| 768px | iPad portrait | UseCases tabs vs accordion decision (Tweak 1.7); 2-col layouts begin. |
| 992px | iPad landscape / small laptop | Navbar crowding check (Tweak 1.2); Features 2-col; tabs render. |
| 1200px | Laptop | Full desktop layout; CTA visible. |
| 1440px | Desktop | Centered container; diagram max-width 560px. |

## Step 5 — Build, Lint & Final Verification

- [ ] Re-run `npm run build`; no errors.
- [ ] Re-run `npm run lint`; no new warnings.
- [ ] Confirm no hardcoded hex introduced (style-guide §8.1) — search modified files for `#`-prefixed colors.
- [ ] Confirm no commented-out code remains (project rule: no-commented-code).
- [ ] Confirm file/method line limits respected (modified `src/` files ≤200 lines; methods ≤50 lines).

## Step 6 — Git (for implementer, step 4.2)

- [ ] Before commit: read `.gitignore` and run `git status`; ensure no `node_modules/`, `dist/`, or gitignored files staged (gitignore-compliance rule).
- [ ] Stage only the polished component files + plan.
- [ ] Commit message: `polish: visual consistency and mobile responsiveness of comparison components`.
- [ ] Push only to `origin` if required (git-remote-safety rule). Do not push to `base-project`/`upstream`.

## Acceptance Criteria (maps to TODO Task 2)

- [ ] All new comparisons and explanations are visually clean and professional.
- [ ] Mobile responsiveness of new tables and lists verified at 320–414px.
- [ ] Smooth flow between sections verified (backgrounds, padding, transitions).
- [ ] Conciliation diagram is legible on mobile (F-3 resolved).
- [ ] No build/lint regressions.

## Out of Scope

- Content/wording changes (covered by Task 1; do not re-edit Spanish text).
- New features or sections.
- Changes to non-modified components (Beta, Pricing, Contact, Footer) unless a flow issue is found.
- Running git commands in this planning step.
