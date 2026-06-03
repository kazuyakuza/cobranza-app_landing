# Plan: Reorder Navbar in Mobile Version

## Objective
In the mobile view of `src/components/landing/Navbar.vue`, reorder the controls inside the mobile-only container so the "Probar Beta Gratis" CTA button appears **before** the hamburger menu toggle.

## Current State
Inside `<div class="d-flex align-items-center gap-2 d-lg-none">` (lines 74-93):
1. Hamburger button (`navbar-toggler`)
2. Mobile CTA button (`mobile-cta`)

## Desired State
Inside the same container:
1. Mobile CTA button (`mobile-cta`) — text: "Probar Beta Gratis"
2. Hamburger button (`navbar-toggler`)

## Implementation Steps
1. Open `src/components/landing/Navbar.vue`.
2. Locate the mobile controls container (`<div class="d-flex align-items-center gap-2 d-lg-none">`).
3. Swap the positions of the two child elements:
   - Move the `<a class="btn btn-success ... mobile-cta">` element to appear first.
   - Move the `<button class="navbar-toggler">` element to appear second.
4. Preserve all existing attributes, classes, and event handlers exactly as they are.
5. No changes to `<script>` or `<style>` sections are required.

## Verification
- In mobile viewport (below `lg` breakpoint), the navbar should display:
  - Brand name on the left
  - "Probar Beta Gratis" button next to it
  - Hamburger menu icon to the right of the button
- Desktop layout (`lg` and above) must remain unchanged.

## Files Affected
- `src/components/landing/Navbar.vue` (template only, lines 74-93)
