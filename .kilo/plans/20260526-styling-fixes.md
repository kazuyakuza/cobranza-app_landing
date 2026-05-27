# Styling Fixes — Code Review Fix Plan

## Source
Code review for Task 4 (Sub-step 4.3) — deviations and bugs found during review of dark-first styling implementation.

---

## Issues Found

### Issue 1 — CRITICAL: `useScrollReveal` animation broken (no reveal effect)

**File**: `src/composables/useScrollReveal.ts`  
**Lines**: 11–16 (the IntersectionObserver callback)  
**Severity**: Functional bug

**Problem**: The composable adds both `reveal-on-scroll` and `is-visible` classes simultaneously when an element intersects. The CSS rule `.reveal-on-scroll` sets `opacity: 0` and `.reveal-on-scroll.is-visible` sets `opacity: 1`. Since both classes are added in the same event loop tick, the browser computes the final style immediately — the element never renders in its hidden state, so the CSS transition never triggers. Result: elements never animate; they just appear.

Elements with `data-reveal` also lack the `reveal-on-scroll` class in their HTML template, so they start visible by default. There is no initial hidden state to transition from.

**Fix**: Split the class application into two phases:
1. On mount: add `reveal-on-scroll` to all `[data-reveal]` elements immediately (hides them).
2. On intersection: add only `is-visible` (triggers the reveal transition).

This ensures elements start hidden and smoothly transition to visible.

**New code** (`src/composables/useScrollReveal.ts`):
```ts
import { onMounted, onUnmounted } from 'vue'

const REVEAL_THRESHOLD = 0.15

export function useScrollReveal(): void {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const elements = document.querySelectorAll('[data-reveal]')

    if (elements.length === 0) {
      return
    }

    for (const element of elements) {
      element.classList.add('reveal-on-scroll')
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer?.unobserve(entry.target)
          }
        }
      },
      { threshold: REVEAL_THRESHOLD }
    )

    for (const element of elements) {
      observer.observe(element)
    }
  })

  onUnmounted(() => {
    observer?.disconnect()
  })
}
```

**Changes**:
- Extract `0.15` → named constant `REVEAL_THRESHOLD`.
- Add `reveal-on-scroll` class to all elements **before** observing (on mount, line-by-line loop).
- Observer callback only adds `is-visible` (removes the duplicate `.add('reveal-on-scroll')`).

---

### Issue 2 — MEDIUM: HeroSection subtitle uses `text-white-50` instead of `--color-text-on-dark-muted`

**File**: `src/components/landing/HeroSection.vue`  
**Line**: 43 (the `<p>` element)  
**Severity**: Contrast / design deviation

**Problem**: Per plan Section 3.3, section subtitles should use `--color-text-on-dark-muted` (#94a3b8, slate-400) for consistent typography. The hero uses Bootstrap's `text-white-50` (50% opacity white ≈ #808080 on dark bg), which has insufficient contrast and deviates from the design system.

**Fix**: Replace `text-white-50` with a scoped style using the CSS variable.

**In template** (line 43), change from:
```html
<p data-reveal class="hero-subtitle lead text-white-50 mb-5">
```
To:
```html
<p data-reveal class="hero-subtitle lead mb-5">
```

**In scoped style**, add:
```css
.hero-subtitle {
  color: var(--color-text-on-dark-muted);
  opacity: 0.85;
}
```

(Remove the existing `.hero-subtitle { opacity: 0.85; }` rule and replace with the above that also includes `color`.)

---

### Issue 3 — LOW: `useScrollReveal()` called in HeroSection instead of App.vue

**File**: `src/components/landing/HeroSection.vue` (remove import/call), `src/App.vue` (add import/call)  
**Severity**: Architectural concern

**Problem**: The composable runs `document.querySelectorAll('[data-reveal]')` globally, but is initialized only in HeroSection. While it works because all components mount simultaneously, it's fragile — if HeroSection is ever lazy-loaded or conditionally rendered, other sections' reveal elements won't be observed.

**Fix**: Move `useScrollReveal()` to `App.vue` where all landing sections are composed.

**In `src/App.vue`**, add:
```ts
import { useScrollReveal } from '@/composables/useScrollReveal'

useScrollReveal()
```

**In `src/components/landing/HeroSection.vue`**, remove:
```ts
import { useScrollReveal } from '@/composables/useScrollReveal'
```
And remove the `useScrollReveal()` call.

---

### Issue 4 — LOW: Hardcoded `70px` in HeroSection CSS should use CSS custom property

**File**: `src/components/landing/HeroSection.vue`, `src/assets/styles/variables.css`  
**Severity**: Maintainability

**Problem**: `padding-top: 70px` is hardcoded in HeroSection's CSS, creating a second source of truth alongside `NAVBAR_HEIGHT_PX` in `constants.ts`.

**Fix**: Add `--navbar-height: 70px` to `variables.css` and reference it in HeroSection.

**In `src/assets/styles/variables.css`**, add:
```css
--navbar-height: 70px;
```

**In `src/components/landing/HeroSection.vue`**, change:
```css
padding-top: 70px;
```
To:
```css
padding-top: var(--navbar-height);
```

---

## Summary

| # | Severity | File(s) | Description |
|---|----------|---------|-------------|
| 1 | CRITICAL | `useScrollReveal.ts` | Animation never fires — both classes added simultaneously, elements never hidden |
| 2 | MEDIUM | `HeroSection.vue` | Subtitle uses `text-white-50` instead of design-system `--color-text-on-dark-muted` |
| 3 | LOW | `HeroSection.vue`, `App.vue` | `useScrollReveal()` should be called in App.vue, not HeroSection |
| 4 | LOW | `HeroSection.vue`, `variables.css` | Hardcoded `70px` should use CSS custom property |

## Verification Steps

After applying fixes:
1. `npm run build` — zero errors
2. `npm run lint` — clean
3. Visual check: scroll down the page — elements with `data-reveal` should start invisible and animate in
4. Verify hero subtitle has proper contrast on dark background
5. Inspect navbar glass-morphism and section backgrounds still match Section 2.3 of the plan