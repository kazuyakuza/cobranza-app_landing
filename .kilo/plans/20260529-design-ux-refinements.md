# Plan: Design & UX Refinements — Beta & Pricing Sections

**Date:** 2026-05-30  
**Task:** Task 3 from `.agent/todos/20260529/20260529-todo-1.md`  
**Status:** Requirements satisfied — no code changes required.

---

## Findings

### Requirement 1: Beta section visually positive and encouraging (green tones or trust signals)
- **Current implementation:**
  - Background: `linear-gradient(135deg, var(--color-primary), var(--color-primary-hover))` — vibrant blue gradient, the page's sole "bright contrast breaker" per style guide §3.1.
  - Badge: `.beta-badge` uses `--color-accent` (`#10b981` emerald green) with text "Beta Abierta — 100% Gratis".
  - Icons: `bi-check-circle-fill` in `--color-accent` on every feature item.
- **Evaluation:** Green badge and check icons provide strong trust/success signals. Blue gradient background is intentional per design system. ✓ **SATISFIED**

### Requirement 2: Pricing section clear and reassuring (avoid complexity)
- **Current implementation:**
  - Title "Pagás solo por lo que usás" immediately communicates the model.
  - One-paragraph explanation of pay-per-use (no fixed monthly fee).
  - Concrete `.dark-card` example: `$1.000.000` → `$400.000` reconciled → percentage-only on reconciled amount.
  - "Cobro transparente y personalizado" reinforces simplicity.
- **Evaluation:** No pricing tables, tiers, or calculators. Single concrete example + transparency statement. ✓ **SATISFIED**

### Requirement 3: Use Bootstrap cards or highlighted boxes where appropriate
- **Current implementation:**
  - Pricing example block: `<div data-reveal class="pricing-example dark-card">` — uses the global `.dark-card` pattern (`background`, `border`, `border-radius`, `padding`) defined in `base.css`.
  - Beta features list: custom-styled `<ul>` with flex layout. A card would add unnecessary visual weight on an already bright gradient section; the list format is cleaner here.
- **Evaluation:** Card pattern used where it adds value (Pricing example). Omitted where it would detract (Beta list). ✓ **SATISFIED**

### Requirement 4: Include the accompanying phrase somewhere in these sections if it fits naturally
- **Current implementation:**
  - Beta section closing: `<p data-reveal class="beta-closing">Un sistema en constante evolución, que crece junto a vos.</p>`
  - Pricing section: factual/practical tone; no natural place for a poetic closing phrase.
- **Evaluation:** Phrase present in Beta where it fits the encouraging tone. ✓ **SATISFIED**

---

## Conclusion

All four design/UX requirements from Task 3 are already satisfied by the current implementation of `BetaSection.vue` and `PricingSection.vue`. No code changes, styling updates, or refactors are needed.

**Files reviewed:**
- `src/components/landing/BetaSection.vue`
- `src/components/landing/PricingSection.vue`
- `src/assets/styles/base.css` (`.dark-card` pattern verification)
- `.agent/project-info/style-guide.md`
