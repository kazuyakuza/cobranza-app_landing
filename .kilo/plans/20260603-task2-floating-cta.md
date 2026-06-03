# Plan: Create FloatingCta.vue Component

**Task Source:** `.agent/todos/20260603/20260603-todo-1.md`, line 2
**Plan Date:** 2026-06-03

---

## Context

- `src/utils/constants.ts` exports `NAVBAR_HEIGHT_PX = 70`. Confirmed.
- `src/App.vue` imports all landing section components directly and renders them sequentially. No global component registration is used.
- `src/components/landing/` is the correct folder per `.agent/project-structure.md`.
- No test suite exists in the project (no `.spec.ts`, `.test.ts`, or Vitest config found).
- Existing components use `<script setup lang="ts">`, scoped `<style>`, local scroll-to-section utilities, and `IntersectionObserver` patterns.
- Bootstrap CSS is loaded globally; `d-lg-none`, `btn-success`, `shadow` are available.

---

## Implementation Steps

### Step 1 — Create `src/components/landing/FloatingCta.vue`

Create the new file with the complete Vue SFC below.

**Compliance notes for implementer:**
- Max lines per file: < 200 (expected ~65).
- Max lines per method: < 50 (all methods < 10).
- Max depth: ≤ 2 nested blocks (function → for → if/else if).
- Single-section boolean conditions: each `if` uses a single variable check; composite logic is split across sequential `if` statements inside `isFloatingCtaVisible()`.
- Self-documenting code: descriptive variable/function names, no comments needed.
- No commented-out code.

```vue
<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { NAVBAR_HEIGHT_PX } from '@/utils/constants'

const isHeroVisible = ref(false)
const isContactVisible = ref(false)

function isFloatingCtaVisible(): boolean {
  if (isHeroVisible.value) {
    return false
  }
  if (isContactVisible.value) {
    return false
  }
  return true
}

const isVisible = computed(isFloatingCtaVisible)

let observer: IntersectionObserver | null = null

function updateVisibility(entries: IntersectionObserverEntry[]): void {
  for (const entry of entries) {
    if (entry.target.id === 'hero') {
      isHeroVisible.value = entry.isIntersecting
    } else if (entry.target.id === 'contact') {
      isContactVisible.value = entry.isIntersecting
    }
  }
}

function scrollToContact(): void {
  const element = document.getElementById('contact')
  if (element) {
    const targetPosition = element.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT_PX
    window.scrollTo({ top: targetPosition, behavior: 'smooth' })
  }
}

onMounted(() => {
  observer = new IntersectionObserver(updateVisibility, { rootMargin: '0px', threshold: 0 })
  const hero = document.getElementById('hero')
  const contact = document.getElementById('contact')
  if (hero) observer.observe(hero)
  if (contact) observer.observe(contact)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <Transition name="float">
    <button
      v-show="isVisible"
      class="btn btn-success shadow floating-cta d-lg-none fw-semibold"
      @click="scrollToContact"
    >
      Probar Beta Gratis
    </button>
  </Transition>
</template>

<style scoped>
.floating-cta {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 1040;
  border-radius: 50rem;
  padding: 0.75rem 1.5rem;
}

.float-enter-active,
.float-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.float-enter-from,
.float-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
```

### Step 2 — Register in `src/App.vue`

Add import and place the component **after** `<Footer />` (fixed-position element, no layout impact).

**Changes to `src/App.vue`:**

1. Add import:
   ```ts
   import FloatingCta from '@/components/landing/FloatingCta.vue'
   ```
2. Add tag before closing `</template>`:
   ```vue
   <FloatingCta />
   ```

### Step 3 — Verify Compilation

Run the development or build command to confirm no TypeScript/Vue compilation errors.

```bash
npm run dev
# or
npm run build
```

No runtime errors should appear; the button should be hidden on desktop (`d-lg-none`), appear on mobile when neither `#hero` nor `#contact` is in the viewport, and animate in/out with the `float` transition.

---

## Verification Checklist

- [ ] `src/components/landing/FloatingCta.vue` exists and matches the snippet above.
- [ ] `src/App.vue` imports and renders `<FloatingCta />`.
- [ ] `npm run build` completes without errors.
- [ ] On mobile viewport:
  - Button is hidden while `#hero` is visible.
  - Button is hidden while `#contact` is visible.
  - Button is visible when scrolled between `#hero` and `#contact`.
  - Clicking the button scrolls to `#contact` with `NAVBAR_HEIGHT_PX` offset.
  - Show/hide uses a smooth opacity + translateY transition.
- [ ] On desktop (`≥992px`), button is never visible (`d-lg-none`).

---

## Files Modified / Created

1. **Create:** `src/components/landing/FloatingCta.vue`
2. **Modify:** `src/App.vue` (add import + component tag)
