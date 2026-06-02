# Task 2 — ProblemSection Alignment & Color Fix

## Objective
Apply two visual fixes to `src/components/landing/ProblemSection.vue`:
1. Vertically center the icon and text inside each pain-point box.
2. Change the closing phrase color to the accent/emerald green.

## Files to Modify
- `src/components/landing/ProblemSection.vue`

## Changes

### Change 1 — Icon+Text Vertical Centering

**a) `.pain-point-content` (lines 115–119)**
Replace:
```css
.pain-point-content {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}
```
With:
```css
.pain-point-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}
```

**b) `.pain-point-icon` (lines 121–126)**
Replace:
```css
.pain-point-icon {
  font-size: 1.4rem;
  color: var(--color-text-on-dark-dim);
  flex-shrink: 0;
  margin-top: 0.15rem;
}
```
With:
```css
.pain-point-icon {
  font-size: 1.4rem;
  color: var(--color-text-on-dark-dim);
  flex-shrink: 0;
}
```

### Change 2 — Closing Phrase Color

**`.problem-closing` (lines 133–138)**
Replace:
```css
.problem-closing {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-on-dark);
  line-height: 1.65;
}
```
With:
```css
.problem-closing {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-accent);
  line-height: 1.65;
}
```

## Verification Steps
1. Open the landing page and scroll to the Problem section.
2. Confirm the 4 pain-point boxes show the Bootstrap icon and the text vertically centered.
3. Confirm the closing sentence "Todo esto genera pérdida de tiempo, errores y estrés innecesario." renders in the emerald green accent color.

## Notes
- No script or template changes are required.
- These are scoped `<style>` changes inside the single-file component; no side-effects on other components are expected.
