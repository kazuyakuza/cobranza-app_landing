# Plan: Navbar — Remove Mobile CTA + Add Menu Auto-Close

**Task Source:** `.agent/todos/20260603/20260603-todo-1.md`, line 1
**Target File:** `src/components/landing/Navbar.vue`

---

## 1A — Remove Mobile CTA and Simplify Wrapper

### 1A.1 Delete `mobileCtaText` constant
- **Line 23:** Remove the line:
  ```ts
  const mobileCtaText = 'Probar Beta Gratis'
  ```

### 1A.2 Delete mobile CTA element and wrapper div
- **Lines 74–93:** Replace the entire wrapper `<div class="d-flex align-items-center gap-2 d-lg-none">` and its contents with the toggler button alone, adding `d-lg-none` directly to the button:
  ```html
      <button
        class="navbar-toggler d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
  ```
  > Indentation: 6 spaces for `<button>` and `</button>`, 8 spaces for inner lines, to align with the sibling `<a class="navbar-brand">` element.

---

## 1B — Auto-Close Menu on Outside Click

### 1B.1 Add `handleClickOutside` helper function
- **Insert after line 42** (after the `scrollToSection` function, before the blank line leading to `onMounted`):
  ```ts
  function handleClickOutside(event: MouseEvent): void {
    const navbar = document.querySelector('.navbar')
    if (navbar && !navbar.contains(event.target as Node)) {
      closeNavCollapse()
    }
  }
  ```

### 1B.2 Register listener in `onMounted`
- **Inside `onMounted()`, after line 58** (after the `for...of` loop that sets up `observer.observe`):
  ```ts
    document.addEventListener('click', handleClickOutside)
  ```

### 1B.3 Clean up listener in `onUnmounted`
- **Inside `onUnmounted()`, after line 62** (after `observer?.disconnect()`):
  ```ts
    document.removeEventListener('click', handleClickOutside)
  ```

---

## 1C — Auto-Close Menu on Scroll

### 1C.1 Register scroll listener in `onMounted`
- **Inside `onMounted()`, immediately after the click listener** (same block as 1B.2):
  ```ts
    window.addEventListener('scroll', closeNavCollapse, { passive: true })
  ```

### 1C.2 Clean up scroll listener in `onUnmounted`
- **Inside `onUnmounted()`, immediately after the click listener removal** (same block as 1B.3):
  ```ts
    window.removeEventListener('scroll', closeNavCollapse)
  ```

---

## Resulting Script Section Structure (for reference)

```ts
const ctaText = 'Quiero probar la Beta gratis'
const brandName = 'Cobranza App'
const activeSectionId = ref<string>('hero')
let observer: IntersectionObserver | null = null

function closeNavCollapse(): void { ... }

function scrollToSection(sectionId: string): void { ... }

function handleClickOutside(event: MouseEvent): void {
  const navbar = document.querySelector('.navbar')
  if (navbar && !navbar.contains(event.target as Node)) {
    closeNavCollapse()
  }
}

onMounted(() => {
  observer = new IntersectionObserver(...)

  for (const item of menuItems) { ... }

  document.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', closeNavCollapse, { passive: true })
})

onUnmounted(() => {
  observer?.disconnect()
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', closeNavCollapse)
})
```

---

## Verification Steps

1. Confirm `mobileCtaText` is no longer present in the file.
2. Confirm the `<a class="mobile-cta">` element is removed.
3. Confirm there is no remaining `.d-flex.d-lg-none` wrapper div around the toggler.
4. Confirm `navbar-toggler` has `d-lg-none` class.
5. Confirm `handleClickOutside` exists and is called by `document.addEventListener('click', ...)` inside `onMounted`.
6. Confirm `window.addEventListener('scroll', closeNavCollapse, { passive: true })` exists inside `onMounted`.
7. Confirm both listeners are removed in `onUnmounted`.
