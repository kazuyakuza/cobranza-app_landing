# Plan: Darken "Prueba Gratis" Section Background

## Task
"Prueba Gratis" section: the bkg color should be darker.

## Current State
- **File**: `src/components/landing/BetaSection.vue`
- **Line**: 58 (`.beta-section` style block)
- **Current gradient**: `linear-gradient(135deg, var(--color-accent), #0d9488)`
  - `var(--color-accent)` resolves to `#10b981` (emerald-500)
  - `#0d9488` is teal-600
- **Text color**: All text is `var(--color-white)` (`#ffffff`) — high contrast is preserved with darker tones.

## Proposed Change
Replace the gradient with darker teal/emerald tones:

```css
.beta-section {
  background: linear-gradient(135deg, #0f766e, #134e4a);
  color: var(--color-white);
}
```

- `#0f766e` (teal-700) — deeper than current `#0d9488` (teal-600)
- `#134e4a` (teal-900) — much darker endpoint, still in the green family

## Rationale
- Keeps the emerald trust accent identity while satisfying the "darker" request.
- White text maintains excellent WCAG contrast against both stops.
- No other component references this gradient directly; change is isolated.

## Implementation Steps
1. Open `src/components/landing/BetaSection.vue`.
2. In the `<style scoped>` block, locate `.beta-section`.
3. Change `background: linear-gradient(135deg, var(--color-accent), #0d9488);` to `background: linear-gradient(135deg, #0f766e, #134e4a);`.
4. Save the file.

## Verification
- Visual check: the Beta section background should appear noticeably darker than adjacent sections.
- Confirm no build errors (`npm run build` or `npm run dev`).

## Files Modified
- `src/components/landing/BetaSection.vue`
