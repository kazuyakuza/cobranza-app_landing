# Task 3: HeroSection + Footer Mobile Padding

## Objective
Increase mobile top padding in `HeroSection.vue` and mobile bottom padding in `Footer.vue` to improve visual spacing on small screens.

## Files Involved
- `src/components/landing/HeroSection.vue`
- `src/components/landing/Footer.vue`

## Current State Verified
- `HeroSection.vue`: `.hero-section` has `padding-top: var(--navbar-height)` and an existing `@media (max-width: 767.98px)` block overriding `min-height` only.
- `Footer.vue`: `.footer-section` has `padding-bottom: 3rem` and an existing `@media (max-width: 767.98px)` block with no padding override.

## Implementation Steps

### Step 1 — HeroSection.vue mobile top padding
In the existing `@media (max-width: 767.98px)` block of `src/components/landing/HeroSection.vue`, add a `padding-top` override to `.hero-section`:

```css
@media (max-width: 767.98px) {
  .hero-section {
    min-height: 90vh;
    padding-top: calc(var(--navbar-height) + 2rem);
  }

  .hero-title {
    font-size: 2rem;
  }
}
```

### Step 2 — Footer.vue mobile bottom padding
In the existing `@media (max-width: 767.98px)` block of `src/components/landing/Footer.vue`, add a `.footer-section` rule:

```css
@media (max-width: 767.98px) {
  .footer-section {
    padding-bottom: 5rem;
  }

  .footer-phrase {
    font-size: 1rem;
  }

  /* ... rest of existing rules ... */
}
```

## Verification Steps
1. Open the landing page in a mobile viewport (<= 767.98px).
2. Confirm that the hero title is no longer touching the navbar (padding-top increased).
3. Confirm that the footer content is not hidden by the floating CTA button (padding-bottom increased).

## Code Review Checklist
- [ ] No media query duplication; both changes reuse existing `@media (max-width: 767.98px)` blocks.
- [ ] No commented-out code added.
- [ ] Existing styles remain untouched except for the intended additions.
