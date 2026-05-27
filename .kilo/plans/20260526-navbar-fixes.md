# Fix Plan: Navbar Component — Code Review Issues

**Date:** 2026-05-26
**Source:** Task 1, Sub-step 4.3 Code Review
**Component:** `src/components/landing/Navbar.vue`

---

## Issue 1: Mobile Menu Doesn't Close After Link Click

**Severity:** Medium — UX Bug

**Problem:**
On mobile/tablet (< 992px), clicking a nav link scrolls to the section but the Bootstrap collapse menu stays open, obscuring the target content. In an SPA with smooth scroll (no page reload), the menu needs explicit closing.

**Fix:**
In `scrollToSection()`, after triggering smooth scroll, programmatically close the Bootstrap collapse by removing the `show` class from the `#navbarContent` element.

**Specific change in `src/components/landing/Navbar.vue` — `<script setup>`:**

Replace the existing `scrollToSection` function with:

```ts
function scrollToSection(sectionId: string): void {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
  closeNavCollapse()
}

function closeNavCollapse(): void {
  const navContent = document.getElementById('navbarContent')
  if (navContent) {
    navContent.classList.remove('show')
  }
}
```

**Guidelines check:**
- Max 1 arg per method: ✅ (closeNavCollapse has 0 args, scrollToSection has 1)
- Max depth 2: ✅ (if inside function = depth 2)
- Single-section boolean: ✅ (each `if` is single condition)
- Max 50 lines per method: ✅ (both are ~5 lines)

---

## Issue 2: Fixed-Top Navbar Overlaps Scroll Target Sections

**Severity:** Medium — UX Bug

**Problem:**
`scrollIntoView()` scrolls the target element to the exact top of the viewport, but the `fixed-top` navbar (~56px) covers it. The section heading content is hidden behind the navbar.

**Fix:**
Replace `scrollIntoView()` with `window.scrollTo()` that subtracts the navbar height from the scroll position. This provides precise control over the scroll destination.

**Specific change in `src/components/landing/Navbar.vue` — `<script setup>`:**

Replace the `scrollToSection` function with:

```ts
const NAVBAR_OFFSET_PX = 70

function scrollToSection(sectionId: string): void {
  const element = document.getElementById(sectionId)
  if (element) {
    const targetPosition = element.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET_PX
    window.scrollTo({ top: targetPosition, behavior: 'smooth' })
  }
  closeNavCollapse()
}
```

`NAVBAR_OFFSET_PX` is a named constant (not a magic number per guidelines) set to 70px (navbar height ~56px + 14px breathing room). This replaces Issue 1's separate fix since `closeNavCollapse()` is included in the same function.

---

## Combined Fix: Final State

After both fixes, the `<script setup>` section should be:

```ts
<script setup lang="ts">
interface NavMenuItem {
  label: string
  sectionId: string
}

const menuItems: NavMenuItem[] = [
  { label: 'Inicio', sectionId: 'hero' },
  { label: 'El Problema', sectionId: 'problem' },
  { label: 'La Solución', sectionId: 'solution' },
  { label: 'Rubros', sectionId: 'use-cases' },
  { label: 'Funcionalidades', sectionId: 'features' },
  { label: 'Prueba Gratis', sectionId: 'beta' },
  { label: 'Precios', sectionId: 'pricing' },
  { label: 'Dudas', sectionId: 'faq' },
  { label: 'Contacto', sectionId: 'contact' },
]

const ctaText = 'Quiero probar la Beta gratis'
const brandName = 'Cobranza App'
const NAVBAR_OFFSET_PX = 70

function closeNavCollapse(): void {
  const navContent = document.getElementById('navbarContent')
  if (navContent) {
    navContent.classList.remove('show')
  }
}

function scrollToSection(sectionId: string): void {
  const element = document.getElementById(sectionId)
  if (element) {
    const targetPosition = element.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET_PX
    window.scrollTo({ top: targetPosition, behavior: 'smooth' })
  }
  closeNavCollapse()
}
</script>
```

**Template and style sections remain unchanged.**

---

## Post-Fix Verification

After applying fixes:
1. Run `npm run build` — must pass with no TypeScript or build errors
2. Run `npm run lint` — must pass with no errors
3. Verify on mobile viewport that menu closes after clicking a link
4. Verify that scroll destinations are not hidden behind the navbar