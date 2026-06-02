# Plan: Fix Navbar Scroll Spy for FAQ Section

## Task

When scrolling down and reaching the "Dudas" (FAQ) section, the navbar section selection doesn't update correctly.

## Problem Analysis

The `Navbar.vue` component uses an `IntersectionObserver` with:

- `rootMargin: '-70px 0px -70% 0px'`
- `threshold: [0, 0.25]`

The `rootMargin` of `-70%` on the bottom shrinks the observation area to only the top ~30% of the viewport. When the user scrolls to the FAQ section near the bottom of the page, there isn't enough content below the FAQ section for the page to scroll further. Consequently, the FAQ section never enters the top 30% observation zone, so the observer never fires and the navbar active state remains stuck on the previous section.

## Solution

Expand the observation zone by changing the bottom `rootMargin` from `-70%` to `-50%`. This increases the observed area from the top 30% to the top 50% of the viewport, giving bottom sections (FAQ, Contact) enough room to be detected without making the zone so large that early sections trigger prematurely.

## Steps

1. Open `src/components/landing/Navbar.vue`.
2. Locate the `IntersectionObserver` options object (currently line 52).
3. Change:

   ```javascript
   { rootMargin: '-70px 0px -70% 0px', threshold: [0, 0.25] }
   ```

   to:

   ```javascript
   { rootMargin: '-70px 0px -50% 0px', threshold: [0, 0.25] }
   ```

4. Save the file.
5. Verify in the browser that scrolling to the "Dudas" section now highlights the correct navbar item.

## Files Changed

- `src/components/landing/Navbar.vue`

## Verification

- Scroll through the landing page and confirm each navbar item highlights correctly as its corresponding section enters the viewport.
- Pay special attention to the "Dudas" and "Contacto" sections at the bottom of the page.
