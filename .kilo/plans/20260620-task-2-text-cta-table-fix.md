# Fix Plan — Task 2: Content Text, Floating CTA & Comparison Table Sizing

## Review Summary

Commit `193afb6` implements the three planned changes correctly:

1. **User features intro text** — `src/data/features.ts` and `.agent/project-info/landing-content.es.md` are synced to:
   `Un portal web sencillo de usar, donde:`
2. **Floating CTA initial flash** — `src/components/landing/FloatingCta.vue` now sets initial `isHeroVisible` / `isContactVisible` synchronously in `onMounted` using `isElementInViewport()` before the `IntersectionObserver` fires. Logic is correct, no infinite loops, and visibility behavior is preserved.
3. **Comparison table mobile sizing** — `src/components/landing/SolutionExcelComparison.vue` reduces mobile cell font-size to `0.8rem` and adds `overflow-wrap: break-word` inside the existing mobile media query.

Build (`npm run build`) passes. Manual verification steps from the implementation plan remain valid.

## Issues Found

`npm run lint` reports **pre-existing Prettier formatting errors in `src/components/landing/FloatingCta.vue`** (the style block was not modified by this commit, but the file is in scope and code-style consistency is a review criterion):

- Line 90: `transition: opacity 0.3s ease, transform 0.3s ease;` should be formatted across multiple lines.
- Line 98: file is missing a trailing newline.

All other lint errors are in untouched files and are out of scope for this task.

## Fix Steps

### Step 1 — Format CSS transition in `FloatingCta.vue`

File: `src/components/landing/FloatingCta.vue`

Replace:

```css
.float-enter-active,
.float-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
```

With:

```css
.float-enter-active,
.float-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
```

### Step 2 — Add trailing newline

Ensure the file ends with a newline after the closing `</style>` tag.

## Verification

- Run `npm run lint` and confirm the only remaining errors/warnings are in files **not** touched by Task 2.
- Run `npm run build` to confirm the type-check + production build still succeeds.
- No functional verification is required because these are purely formatting changes.

## Files to Modify

| File | Change |
|---|---|
| `src/components/landing/FloatingCta.vue` | Prettier formatting only (CSS transition + trailing newline) |
