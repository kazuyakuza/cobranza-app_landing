# Task 3: Navbar — Highlight current visible section (scroll spy)

**Date**: 2026-06-01
**Scope**: `src/components/landing/Navbar.vue`
**Goal**: Add IntersectionObserver-based scroll-spy so the nav link matching the currently visible section receives an `.active` class.

---

## Current State

`Navbar.vue` currently:
- Defines a `menuItems` array of 9 links mapped to section IDs: `hero`, `problem`, `solution`, `use-cases`, `features`, `beta`, `pricing`, `faq`, `contact`.
- Has `scrollToSection(sectionId)` for smooth-scroll navigation.
- Has no reactive active-state tracking or `.active` styling.

All 9 target `<section>` elements with matching IDs exist in the landing page (`src/App.vue` imports them in order).

---

## Implementation Steps

### Step 1 — Add Composition API imports and reactive state

In `<script setup>`:
- Import `ref`, `onMounted`, `onUnmounted` from `vue`.
- Add `const activeSectionId = ref('')` to hold the ID of the section currently intersecting the observation zone.

### Step 2 — Build the IntersectionObserver

Inside `onMounted`:
1. Create a single `IntersectionObserver` instance with options:
   ```ts
   const observer = new IntersectionObserver(
     (entries) => {
       for (const entry of entries) {
         if (entry.isIntersecting) {
           activeSectionId.value = entry.target.id
         }
       }
     },
     { rootMargin: '-70px 0px -70% 0px' }
   )
   ```
   > Rationale: `rootMargin` clips the top 70 px (navbar) and the bottom 70 % of the viewport, so only the top ~30 % is observed. When a section enters that band, it becomes the active section.

2. Iterate `menuItems`, call `document.getElementById(item.sectionId)`, and observe each element that exists:
   ```ts
   for (const item of menuItems) {
     const el = document.getElementById(item.sectionId)
     if (el) observer.observe(el)
   }
   ```

### Step 3 — Clean up on unmount

In `onUnmounted`:
- Call `observer.disconnect()` to remove all observations and prevent memory leaks.

### Step 4 — Bind `.active` class in template

For each nav-link `<a>` inside the `v-for` loop:
- Add a dynamic class binding:
  ```vue
  <a
    class="nav-link"
    :class="{ active: activeSectionId === item.sectionId }"
    href="#"
    @click.prevent="scrollToSection(item.sectionId)"
  >
    {{ item.label }}
  </a>
  ```

### Step 5 — Add `.active` style in scoped CSS

Append to the existing `<style scoped>` block:
```css
.nav-link.active {
  color: var(--color-primary);
  font-weight: 600;
}
```

This uses the confirmed design token `var(--color-primary)` (#3b82f6) and sets `font-weight: 600` as required.

---

## Files to Modify

| File | Change |
|------|--------|
| `src/components/landing/Navbar.vue` | Add imports, `activeSectionId`, observer lifecycle, template class binding, `.active` style rule. |

---

## Testing / Verification

1. `npm run dev` (or equivalent) → open landing page in browser.
2. Scroll slowly through the page.
3. Verify that when each section enters the top portion of the viewport, the corresponding navbar link turns blue (`var(--color-primary)`) and weight 600.
4. Verify that clicking a nav link still smooth-scrolls to the section.
5. Resize browser and repeat to ensure `rootMargin` behaves correctly at different heights.

---

## Edge Cases Considered

- **Missing sections**: The observer only calls `observe(el)` when `getElementById` returns a truthy element. If a section is absent, it is silently skipped.
- **Multiple intersections**: The callback loops over all entries and sets `activeSectionId` to the last intersecting entry. Given the narrow observation band, typically only one section is active at a time.
- **No active section**: If the user scrolls into a large footer gap where no section intersects, the last active link remains highlighted until a new section enters. This is acceptable UX for this implementation.
- **Memory leaks**: `observer.disconnect()` in `onUnmounted` removes all targets.
