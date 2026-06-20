# Global Plan: TODO-12 Additional Content Improvements & Polish

**Source:** `.agent/todos/20260619/20260619-todo-3.md`  
**Date:** 2026-06-19  
**Branch:** `feat/content-improvements-and-polish`

---

## Global Pre-Analysis

This TODO implements high-impact content recommendations across the entire landing page. Work spans:

1. **Content updates** in `.agent/project-info/landing-content.es.md`.
2. **Vue component changes** across 6+ components (`HeroSection`, `ProblemSection`, `SolutionSection`, `HowItWorksSection`, `FeaturesSection`, `FaqSection`, `UseCasesTabs`).
3. **Data file updates** in `src/data/faq.ts` and potentially `src/data/features.ts`.
4. **UI/UX fixes**: accordion padding, nested FAQ accordions, navbar scroll spy, mobile tabs-to-accordion refactor.

All visible text must remain in **neutral Spanish**; code and comments in **English**.

---

## Step 2: Git Feature Branch Setup

- Check `git status`, commit any unstaged work.
- Switch to `main`, create `feat/content-improvements-and-polish`.

**Agent:** `implementer`

---

## Step 3: Version Update

- If `package.json` exists, bump patch version.
- Commit as `chore: bump version`.

**Agent:** `implementer`

---

## Task 0: Update Spanish Content File

### Pre-Analysis
Straightforward text edits in `.agent/project-info/landing-content.es.md`. No logic changes.

### 4.1 Analysis & Planning
**Agent:** `architect`
- Identify exact line ranges to modify.
- Produce implementation plan with file paths and replacement text.

### 4.2 Implementation
**Agent:** `implementer`
Apply changes:
1. **Hero subtitle** → updated text.
2. **Problem closing** → replace last paragraph with 5 real-case bullet points.
3. **Solution labels** → "Sin Cobranza App" / "Con Cobranza App".
4. **Solution comparison** → add "¿Por qué no alcanza con Excel o WhatsApp?" table.
5. **How It Works step 5** → add ASCII/SVG conciliación diagram.
6. **Features intros** → add introductory paragraphs under "Para la empresa o profesional" and "Para el cliente final".
7. **FAQ additions** → add 10+ new questions and update existing ones.

### 4.3 Code Review
**Agent:** `code-reviewer`
- Verify all requested content changes are present and formatting is correct.

### 4.4 Documentation
**Agent:** `docs-specialist`
- Ensure content file is well-structured; no code comments needed (it's a content doc).

### 4.5 Verification
**Agent:** `architect`
- Cross-check content file against TODO requirements.

### 4.6 Task Completion
**Agent:** `implementer`
- Append `[DONE]` to Task 0 in TODO file; commit.

---

## Task 1: Update Relevant Components

### Pre-Analysis
This is the bulk of the work. Changes touch 6+ Vue components and 2 data files. Several UI/UX bugs also need fixing.

### 4.1 Analysis & Planning
**Agent:** `architect`
- Map each TODO sub-item to exact files, props, and data structures.
- Plan mobile accordion strategy for UseCasesTabs.
- Plan nested accordion strategy for FaqSection.

### 4.2 Implementation
**Agent:** `implementer`
Implement in logical order (commit after each component):

1. **`HeroSection.vue`** — update `subtitle` constant.
2. **`ProblemSection.vue`** — add `commonCases` array, render list after pain points, update closing statement.
3. **`SolutionSection.vue`** —
   - Rename labels "Antes" → "Sin Cobranza App", "Después" → "Con Cobranza App".
   - Add Excel/WhatsApp comparison block (table or grid) after the main comparison.
4. **`HowItWorksSection.vue`** — enhance step 5 text + add visual diagram (SVG or styled ASCII art) for conciliación flow.
5. **`FeaturesSection.vue`** —
   - Add introductory text paragraphs above each accordion group.
   - Fix accordion body top padding and bottom spacing (center text correctly inside accordion).
6. **`src/data/faq.ts`** — add all new FAQ entries and update existing ones (e.g., extracto formats include Excel).
7. **`FaqSection.vue`** —
   - Refactor so each **group title** is itself an accordion.
   - Only one group can be open at a time (or allow multiple, but group titles are clickable).
   - "General" group default open.
   - First item of each group default open.
8. **`Navbar.vue`** — review IntersectionObserver logic for scroll highlight; fix if broken.
9. **`UseCasesTabs.vue`** — for mobile (`< md`), replace horizontal scroll tabs with an accordion that allows only one open case at a time.

### 4.3 Code Review
**Agent:** `code-reviewer`
- Check for deviations from plan, responsive issues, and Bootstrap usage.
- Generate fix plan if needed.

### 4.4 Documentation
**Agent:** `docs-specialist`
- Update `.agent/project-info/landing-content.es.md` if any component text diverged from it.
- Add brief code comments for complex accordion logic if needed.

### 4.5 Verification
**Agent:** `architect`
- Verify all component changes match TODO checklist.
- Confirm mobile accordion in UseCasesTabs works.
- Confirm nested FAQ accordion behavior.

### 4.6 Task Completion
**Agent:** `implementer`
- Append `[DONE]` to Task 1 in TODO file; commit.

---

## Task 2: Polish & Consistency

### Pre-Analysis
Final pass for visual quality, responsive behavior, and section transitions.

### 4.1 Analysis & Planning
**Agent:** `architect`
- Define checklist: table responsiveness, list spacing, color consistency, scroll-reveal alignment.

### 4.2 Implementation
**Agent:** `implementer`
- Run dev server or inspect built output.
- Adjust CSS for new tables/lists on mobile.
- Ensure smooth `data-reveal` transitions between modified sections.

### 4.3 Code Review
**Agent:** `code-reviewer`
- Quick review of polish changes.

### 4.4 Documentation
**Agent:** `docs-specialist`
- Update `landing-content.es.md` if any final text tweaks occurred.

### 4.5 Verification
**Agent:** `architect`
- Final cross-check against acceptance criteria.

### 4.6 Task Completion
**Agent:** `implementer`
- Append `[DONE]` to Task 2 in TODO file; commit.

---

## Step 5: TODO File Completion

**Agent:** `implementer`
- Rename `.agent/todos/20260619/20260619-todo-3.md` → `20260619-todo-3-DONE.md`.
- Ensure all changes committed in feature branch.
- Switch to `main`, merge `feat/content-improvements-and-polish`.
- Delete feature branch on success.
- Push `main` to `origin` only.

---

## Acceptance Criteria (Global)

- [ ] Hero subtitle updated.
- [ ] Problem section strengthened with 5 real-case bullet points.
- [ ] Solution section relabeled and Excel/WhatsApp comparison added.
- [ ] How It Works step 5 has conciliación visual + improved text.
- [ ] Features section has introductory texts and fixed accordion padding.
- [ ] FAQ significantly expanded (10+ new questions) and group titles are accordions (General default open, first item per group default open).
- [ ] Navbar scroll highlight works correctly.
- [ ] UseCasesTabs uses accordion on mobile.
- [ ] Mobile responsiveness verified for all new elements.
- [ ] All visible text in neutral Spanish; code/comments in English.
