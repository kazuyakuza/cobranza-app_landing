# Plan: Task 3 — Use Cases Section Design & UX Enhancements

**TODO Reference**: `.agent/todos/20260521/20260521-todo-2.md` (Task 3)
**Branch**: `feat/use-cases-section`
**Target File**: `src/components/landing/UseCasesSection.vue`

---

## 1. Audit

| Requirement | Status | Notes |
|---|---|---|
| Bootstrap cards, icons, or clean numbered list | Satisfied | Uses `.dark-card`, Bootstrap Icons (`bi-*`), and `<ol>` for steps. |
| Detailed example stands out (different bg/border/card) | Partially satisfied | Blue left-border accent exists (`var(--color-primary)`), but background matches grid cards exactly (`--color-bg-card`). |
| Excellent readability on desktop & mobile | Mostly satisfied | Title scales to `1.75rem` on mobile. Grid uses `col-12 col-md-6 col-lg-4`. Detailed example title (`1.5rem`) does *not* scale down on mobile, making it disproportionately large next to the `1.75rem` section title. |

## 2. Gaps

1. **Detailed example lacks differentiated background**: The TODO explicitly asks for a "different background, border, or card". The current implementation only adds a left border; the background is identical to the grid cards.
2. **Mobile font size for detailed example title**: At `1.5rem`, the subtitle is only `0.25rem` smaller than the main title on mobile (`1.75rem`), weakening visual hierarchy.

## 3. Proposed Enhancements (Minimal)

The current implementation from Tasks 1 & 2 is strong. Only two scoped CSS additions are needed:

### 3.1 Differentiated Background for Detailed Example
Apply `background: var(--color-bg-card-alt)` to `.detailed-example`. This uses the style guide's designated "Alternate card shade" for "Nested contrast within cards", making the example subtly distinct without breaking the dark-first design.

### 3.2 Responsive Font Size for Detailed Example Title
Add a mobile media query (`max-width: 767.98px`) to reduce `.detailed-example-title` from `1.5rem` to `1.25rem`. This aligns with the style guide's "Card titles" scale and restores proper hierarchy on small screens.

### 3.3 Card Hover Effects (Optional / Not Required)
No hover effects are defined for `.dark-card` in `base.css`, and `ProblemSection.vue` follows the same flat pattern. To keep consistency and avoid expanding scope, **no hover effects will be added** unless explicitly requested later.

## 4. Implementation Steps

All changes are scoped to `src/components/landing/UseCasesSection.vue`.

### Step 1: Add alternate background to detailed example
Locate `.detailed-example` in `<style scoped>` and add the background override:

```css
.detailed-example {
  border-left: 4px solid var(--color-primary);
  background: var(--color-bg-card-alt);
}
```

### Step 2: Add mobile font-size override
Extend the existing `@media (max-width: 767.98px)` block to include the detailed example title:

```css
@media (max-width: 767.98px) {
  .use-cases-title {
    font-size: 1.75rem;
  }

  .detailed-example-title {
    font-size: 1.25rem;
  }
}
```

## 5. Verification

- `npm run lint` must pass.
- `npm run dev` — visual check:
  - Detailed example background is slightly lighter than grid cards.
  - On mobile viewport (`<768px`), detailed example title is `1.25rem` and clearly subordinate to the `1.75rem` section title.
  - No regressions in scroll reveal or layout.

## 6. Assessment Summary

**Significant changes are NOT needed.** The design from Tasks 1 & 2 is already adequate. Only **two minimal, scoped CSS additions** are required to fully close Task 3: a differentiated background for the detailed example and a responsive font-size tweak for its title on mobile.
