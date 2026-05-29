# Implementation Plan — Task 2: Add Detailed Example "Administración de Expensas"

**Date**: 2026-05-29
**Task**: Task 2 from `.agent/todos/20260521/20260521-todo-2.md`
**Branch**: `feat/use-cases-section`
**Target File**: `src/components/landing/UseCasesSection.vue`

---

## 1. Current State

- `UseCasesSection.vue` is fully implemented after Task 1 (~76 lines).
- Contains: `sectionTitle`, `useCases` grid with 5 icon cards, scoped styles.
- The Task 1 plan explicitly reserved space below the sector grid for this detailed example.
- File size after Task 1: ~76 lines. After Task 2 insertion: ~115–125 lines, well under the 200-line limit.

---

## 2. High-Level Approach

Insert a visually distinct detailed-example subsection below the existing sector grid inside the same `col-12 col-md-10 col-lg-9` container. The subsection uses the `.dark-card` base pattern plus a scoped accent modifier for visual distinction. It renders a sub-heading, a 7-step ordered list, and a closing applicability note. All content lives in `<script setup>` constants; all styling uses CSS variables and scoped styles per the style guide.

---

## 3. Detailed Implementation Steps

### Step 3.1 — Script Section Additions

Inside `<script setup lang="ts">`, below the existing `useCases` array, add three new constants:

1. `detailedExampleTitle` — string: `'Administración de Expensas'`
2. `detailedSteps` — `string[]` with the 7 steps exactly as provided in the task description (Spanish text).
3. `closingNote` — string: `'Un flujo similar se aplica a honorarios profesionales, cuotas educativas, alquileres y otros cobros.'`

No new imports are needed; `useScrollReveal()` is already present.

### Step 3.2 — Template Additions

Inside the `col-12 col-md-10 col-lg-9` column, immediately after the existing `.use-cases-grid` div (and before the closing `</div>` of the column), insert:

```html
<div data-reveal class="detailed-example dark-card">
  <h3 class="detailed-example-title">{{ detailedExampleTitle }}</h3>
  <ol class="detailed-example-steps">
    <li v-for="step in detailedSteps" :key="step" class="detailed-example-step">
      {{ step }}
    </li>
  </ol>
  <p class="detailed-example-note">{{ closingNote }}</p>
</div>
```

Key layout decisions:
- The wrapper has both `.detailed-example` (scoped modifier) and `.dark-card` (global pattern).
- `data-reveal` on the wrapper so the entire block animates in as one unit.
- Semantic `<ol>` for the numbered steps (matches the content structure).
- The closing note is a `<p>` with a dedicated class for muted color treatment.

### Step 3.3 — Scoped CSS Additions

Inside the existing `<style scoped>` block, append the following selectors after the existing media query:

| Selector | Properties |
|---|---|
| `.detailed-example` | `border-left: 4px solid var(--color-primary);` |
| `.detailed-example-title` | `font-size: 1.5rem; font-weight: 600; margin-bottom: 1.5rem; line-height: 1.3;` |
| `.detailed-example-steps` | `padding-left: 1.25rem; margin-bottom: 1.5rem;` |
| `.detailed-example-step` | `font-size: 1rem; line-height: 1.6; padding-bottom: 0.75rem; color: var(--color-text-on-dark);` |
| `.detailed-example-step:last-child` | `padding-bottom: 0;` |
| `.detailed-example-note` | `font-size: 0.95rem; font-style: italic; color: var(--color-text-on-dark-muted); margin-bottom: 0;` |

Rationale for visual distinction:
- `.dark-card` provides the base card background (`--color-bg-card`) against the section background (`--color-bg-slate`), creating natural contrast.
- The `border-left: 4px solid var(--color-primary)` adds a blue accent stripe that draws the eye without breaking the dark-card pattern.
- No hardcoded hex values; all colors use existing CSS variables.

### Step 3.4 — Style Guide Compliance Checklist

- [ ] Background/color: inherits from `.dark-card` (`--color-bg-card`) and section (`--color-bg-slate`); no hardcoded values.
- [ ] `data-reveal` on the wrapper for scroll animation.
- [ ] Scoped styles only (`<style scoped>`).
- [ ] Content constants defined in script (English variable names, Spanish user-facing text).
- [ ] No new CSS files; additions stay inside the component's scoped block.
- [ ] Bootstrap grid unchanged; detailed example lives inside the existing centered column.
- [ ] Step text uses `--color-text-on-dark`; note uses `--color-text-on-dark-muted`.
- [ ] Mobile-first: font sizes inherit responsive behavior from the section's existing media query. No extra breakpoints needed unless testing reveals issues.

---

## 4. File Size Projection

| Part | Task 1 Lines | Task 2 Additions | Total |
|---|---|---|---|
| `<script setup>` | ~21 | ~8 | ~29 |
| `<template>` | ~22 | ~10 | ~32 |
| `<style scoped>` | ~33 | ~12 | ~45 |
| **Total** | **~76** | **~30** | **~106** |

Well under the 200-line limit. No child-component extraction needed.

---

## 5. Acceptance Criteria

- [ ] Subsection appears below the 5 sector cards in `UseCasesSection.vue`.
- [ ] Subsection title reads "Administración de Expensas" in an `<h3>`.
- [ ] All 7 steps render as a numbered ordered list with correct Spanish text.
- [ ] Closing note reads: "Un flujo similar se aplica a honorarios profesionales, cuotas educativas, alquileres y otros cobros."
- [ ] The subsection is visually distinct via a blue left-border accent on a `.dark-card` container.
- [ ] `data-reveal` scroll animation works on the subsection wrapper.
- [ ] No TypeScript or lint errors.
- [ ] No hardcoded hex values anywhere.
- [ ] Scoped styles only; no global style leakage.
- [ ] Component total line count remains under 200 lines.
