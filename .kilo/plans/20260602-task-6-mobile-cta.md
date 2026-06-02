# Task 6: Mobile — Move CTA Button Outside Nav Menu

## Objective
On mobile viewports, move the "Quiero probar la Beta gratis" CTA button out of the collapsible Bootstrap navbar menu so it is always visible in the top bar. Change the button text to "Probar Beta Gratis" on mobile.

## Current State
`src/components/landing/Navbar.vue`

The navbar uses Bootstrap 5 `navbar-expand-lg`:
```
.container (flex, space-between)
├── .navbar-brand
├── button.navbar-toggler
└── #navbarContent.collapse.navbar-collapse
      ├── ul.navbar-nav (menu links)
      └── a.btn.btn-success (CTA — desktop & mobile, inside collapse)
```

Because the CTA lives inside `#navbarContent`, it is hidden behind the hamburger menu on mobile.

## High-Level Approach
Introduce a **mobile-only CTA** placed outside the collapse and group it with the toggler inside a flex wrapper. This wrapper acts as a single flex item inside the `.container`, so Bootstrap’s `justify-content: space-between` keeps the brand on the left and the toggler+CTA group on the right.

On desktop (`lg+`), the wrapper is hidden (`d-lg-none`), the toggler is hidden by Bootstrap, and the original desktop CTA inside the collapse remains visible.

## Detailed Steps

### Step 1 — Add mobile text constant
In `<script setup>` (after `const ctaText = '...'`):
```typescript
const mobileCtaText = 'Probar Beta Gratis'
```

### Step 2 — Wrap toggler and mobile CTA
Replace the standalone `<button class="navbar-toggler">` with a wrapper div that contains both the mobile CTA and the toggler:

```html
<div class="d-flex align-items-center gap-2 d-lg-none">
  <a
    class="btn btn-success px-3 py-2 fw-semibold"
    href="#"
    @click.prevent="scrollToSection('contact')"
  >
    {{ mobileCtaText }}
  </a>

  <button
    class="navbar-toggler"
    type="button"
    data-bs-toggle="collapse"
    data-bs-target="#navbarContent"
    aria-controls="navbarContent"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span class="navbar-toggler-icon"></span>
  </button>
</div>
```

Why a wrapper?
- Bootstrap `.navbar > .container` uses `justify-content: space-between`.
- Without a wrapper, the brand, toggler, and CTA become three separate flex items, causing the CTA to land in the middle instead of next to the toggler.
- The wrapper makes the toggler+CTA a single flex item, so they sit together on the right side of the navbar.

### Step 3 — Hide desktop CTA on mobile
On the existing CTA inside `#navbarContent`, add responsive display classes so it only appears on desktop:

Change:
```html
<a class="btn btn-success px-4 py-2 fw-semibold" ...>
```
To:
```html
<a class="btn btn-success d-none d-lg-inline-block px-4 py-2 fw-semibold" ...>
```

### Step 4 — Verify scoped CSS
No additional scoped CSS is required:
- `.mobile-cta` positioning is handled by the flex wrapper and Bootstrap utilities (`d-flex`, `align-items-center`, `gap-2`).
- The existing `.btn-success` and `.fw-semibold` styles apply to the new button automatically.

## Files to Modify
- `src/components/landing/Navbar.vue`

## No New Files

## Verification Checklist
- [ ] On mobile (< 992px), the "Probar Beta Gratis" button is visible to the right of the hamburger icon.
- [ ] On mobile, the desktop CTA inside the expanded menu is hidden.
- [ ] On desktop (≥ 992px), the mobile CTA wrapper is hidden.
- [ ] On desktop, the original CTA with full text "Quiero probar la Beta gratis" is visible inside the navbar.
- [ ] Both CTAs scroll to `#contact` on click.
- [ ] No build errors or lint warnings.
