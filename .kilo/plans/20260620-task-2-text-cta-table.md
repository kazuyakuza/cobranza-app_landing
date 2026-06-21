# Plan — Task 2: Content Text, Floating CTA & Comparison Table Sizing

- **Branch**: `feat/landing-ui-fixes-20260620`
- **Step**: 4.1 Analysis & Planning (architect)
- **Scope**: Three small, independent UI fixes. No new files. No new dependencies.
- **Project Info**: Active (Vue 3 + TypeScript + Vite + Bootstrap 5.3). No unit-test suite — scripts: `dev`, `build` (`vue-tsc -b && vite build`), `preview`, `lint`.

---

## Pre-Analysis

| # | Target file | Change type | Risk |
|---|---|---|---|
| 1 | `src/data/features.ts` | Content text (1 line) + source-of-truth sync | Low |
| 2 | `src/components/landing/FloatingCta.vue` | Logic: initial-flash fix | Low–Medium |
| 3 | `src/components/landing/SolutionExcelComparison.vue` | CSS: mobile font-size + overflow wrap | Low |

**Verified facts**
- `#hero` id exists: `src/components/landing/HeroSection.vue:28`.
- `#contact` id exists: `src/components/landing/ContactSection.vue:20`.
- `FloatingCta.vue` visibility logic (`isFloatingCtaVisible`) is already correct for "hidden on hero/contact, visible elsewhere". The only defect is the **initial flash on load** (see Sub-task 2 analysis).
- Comparison table content lives in `src/data/solution.ts` (`excelComparisonRows`). Long unbreakable words ("Significativamente", "administrativo") drive mobile min-content overflow → horizontal scroll. Font-size reduction alone does NOT guarantee no-scroll on 320–360 px viewports; a word-break property is required (see Sub-task 3 analysis).
- Content source of truth `.agent/project-info/landing-content.es.md:205` still holds the OLD intro text, so it must be synced to keep `brief.md`'s "all visible texts come from that file" rule.

**Rules compliance (this plan)**
- Methods <= 2 params; max depth <= 2; max method body <= 50 lines; files < 200 lines.
- Single-section boolean conditions: viewport-overlap check extracted into a named predicate `isElementInViewport`.
- No magic numbers; CSS variables preserved; no hardcoded hex.
- Self-documenting code (no comments needed).
- Gitignore compliance: only `src/**` `.ts`/`.vue` + one `.md` content file touched; no `node_modules/`, `dist/`, `.env`, etc.

---

## Sub-task 1 — User features intro text

### 1a. Code text change
**File**: `src/data/features.ts`
**Line 92** (inside `featureGroups`, second group `variant: 'user'`):

```diff
-    intro: 'Un portal web simple donde el cliente puede:',
+    intro: 'Un portal web sencillo de usar, donde:',
```

Exact new line:
```ts
    intro: 'Un portal web sencillo de usar, donde:',
```

### 1b. Source-of-truth sync (required by `brief.md`)
**File**: `.agent/project-info/landing-content.es.md`
**Line 205**:

```diff
-Un portal web simple donde el cliente puede:
+Un portal web sencillo de usar, donde:
```

> Rationale: `brief.md` states all visible texts must be taken from `landing-content.es.md`. Changing `features.ts` without syncing this file breaks the source-of-truth contract. This is a documentation `.md` edit, safe to do in 4.2 alongside the code change.

**Render check**: `intro` is consumed by `src/components/landing/FeaturesSection.vue` (per project context). No template/structural change — text-only.

---

## Sub-task 2 — Floating CTA initial-flash fix

### Problem
`FloatingCta.vue` initializes `isHeroVisible` and `isContactVisible` to `false`. The `IntersectionObserver` first callback fires **asynchronously** after `observe()`. On a fresh page load the hero is at the top and visible, but until the observer fires, `isVisible` computed = `true`, so the mobile button renders visible for one paint, then fades out when the callback sets `isHeroVisible = true`. This is the reported "initial flash on load".

The existing hide/show logic is otherwise correct and must be preserved:
- Hidden when `#hero` visible
- Hidden when `#contact` visible
- Visible in all other sections

### Fix
Set the initial visibility state **synchronously** in `onMounted` by measuring each target's bounding rect against the viewport, before the observer supplies updates. This closes the async gap; the subsequent reactive update is flushed in a microtask before paint, so no flash occurs. The observer continues to maintain state on scroll.

**File**: `src/components/landing/FloatingCta.vue`

**Add a predicate helper** (insert after `isFloatingCtaVisible`/`isVisible`, before `let observer`):

```ts
function isElementInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect()
  const isAboveViewport = rect.bottom <= 0
  const isBelowViewport = rect.top >= window.innerHeight
  return !isAboveViewport && !isBelowViewport
}
```

Semantics match the observer config (`threshold: 0`, `rootMargin: '0px'`): any pixel overlap => visible. The compound condition is wrapped in a descriptively named predicate (Single-Section Boolean Conditions rule).

**Update `onMounted`** (replace current lines 40–46):

```ts
onMounted(() => {
  const hero = document.getElementById('hero')
  const contact = document.getElementById('contact')
  if (hero) {
    isHeroVisible.value = isElementInViewport(hero)
  }
  if (contact) {
    isContactVisible.value = isElementInViewport(contact)
  }
  observer = new IntersectionObserver(updateVisibility, { rootMargin: '0px', threshold: 0 })
  if (hero) observer.observe(hero)
  if (contact) observer.observe(contact)
})
```

**No other changes** to `updateVisibility`, `scrollToContact`, `onUnmounted`, template, or styles.

**Compliance check**
- `isElementInViewport`: 1 param, body 4 lines, depth 1.
- `onMounted` body: ~10 lines, depth 2.
- File grows from 85 -> ~92 lines (< 200).
- No commented code; self-documenting names.

---

## Sub-task 3 — Mobile comparison table sizing (no horizontal scroll)

### Problem
`SolutionExcelComparison.vue` wraps the table in `.table-responsive` (Bootstrap `overflow-x: auto`). The table is `width: 100%`, but with `table-layout: auto` its **min-content width** is the sum of each column's longest unbreakable word. Long words ("Significativamente" 17 chars, "administrativo" 14 chars) produce a min-content width (~340 px at 0.875 rem) that exceeds the inner container width on 320–360 px phones → horizontal scroll.

Font-size reduction alone is insufficient: at `0.8 rem` min-content is still ~340 px > ~336 px container on 360 px; on 320 px (inner ~296 px) it overflows clearly. Reaching fit-by-font-only would need ~0.65 rem, harming readability.

### Fix
Reduce mobile cell font-size (as requested) AND allow long words to wrap so min-content collapses and the `width: 100%` table always fits.

**File**: `src/components/landing/SolutionExcelComparison.vue`
**Lines 78–81** (inside `@media (max-width: 767.98px)`):

Current:
```css
  .excel-comparison-table :deep(th),
  .excel-comparison-table :deep(td) {
    font-size: 0.875rem;
  }
```

New:
```css
  .excel-comparison-table :deep(th),
  .excel-comparison-table :deep(td) {
    font-size: 0.8rem;
    overflow-wrap: break-word;
  }
```

**Why each property**
- `font-size: 0.8rem` (from `0.875rem`): the requested reduction; improves density/readability on small screens.
- `overflow-wrap: break-word`: lets a long word break at any character only when it would otherwise overflow. This collapses the cell min-content to the widest single character, so the 3-column `width: 100%` table can shrink to the container — **guarantees no horizontal scroll** on the full mobile range (320–767.98 px) without shrinking font to an unreadable size.

**Scope note**: Applied only inside the existing mobile media query (matches task scope). Desktop table is unchanged. Specificity of `.excel-comparison-table :deep(td/th)` (0,2,1) already overrides Bootstrap `.table` cell rules — the existing `font-size: 0.875rem` override proves this; adding `overflow-wrap` in the same block applies the same way.

**Optional alternative** (only if reviewer prefers a denser look): use `font-size: 0.75rem` instead of `0.8rem`. Keep `overflow-wrap: break-word` regardless. Not required.

---

## Git / Commit Plan (for 4.2)

All work stays on `feat/landing-ui-fixes-20260620`. Three logical commits (may be combined into one if reviewer prefers):

1. `fix(content): simplify user features intro wording`
   - `src/data/features.ts`, `.agent/project-info/landing-content.es.md`
2. `fix(floating-cta): prevent mobile button flash on page load`
   - `src/components/landing/FloatingCta.vue`
3. `fix(comparison-table): prevent horizontal scroll on mobile`
   - `src/components/landing/SolutionExcelComparison.vue`

Before each commit: read `.gitignore`, run `git status`, stage only intended files (no `node_modules/`, `dist/`, `.env`, `*.tsbuildinfo`, `.kilo/agent-manager.json`).

---

## Verification & Testing Instructions

**Static checks** (run from project root):
- `npm run lint` — ESLint must pass (no new warnings/errors).
- `npm run build` — `vue-tsc -b && vite build` must succeed (type-check + build).

**Manual visual checks** (run `npm run dev`, use DevTools device toolbar):

1. **Sub-task 1 — Text**
   - Navigate to Features section, expand "Para el cliente final" accordion group.
   - Confirm intro reads: **"Un portal web sencillo de usar, donde:"** (no "simple", no "el cliente puede:").
   - Confirm company group intro is unchanged.

2. **Sub-task 2 — Floating CTA**
   - Mobile viewport (<= 991.98 px, e.g. iPhone 12 390x844).
   - **Hard reload at top (hero visible)**: floating button must NOT flash; it must be hidden immediately on first paint.
   - Scroll to Problem/Solution/HowItWorks/UseCases/Features/Beta/Pricing/FAQ: button appears (bottom-right), fades in.
   - Scroll to `#contact`: button hides.
   - Scroll back to `#hero`: button hides.
   - Desktop (>= 992 px): button never visible (`d-lg-none`).
   - Click button: smooth-scrolls to `#contact` offset by navbar height (70 px).

3. **Sub-task 3 — Comparison table**
   - Mobile viewports: **320 px** (iPhone SE), **360 px**, **390 px**, **768 px** boundary.
   - In Solution section, confirm the Excel/WhatsApp comparison table fits within the viewport with **no horizontal scroll**.
   - Confirm long cells ("Significativamente reducido", "Asistida + revision manual") wrap to a second line instead of overflowing.
   - Confirm text remains readable (~0.8 rem) and the Cobranza App column keeps its accent color/bold weight.
   - Desktop (>= 768 px): table layout unchanged (font-size 1 rem, no forced wrapping side-effects from the mobile-only rule).

**Out of scope for this step**: no `context.md` update here (handled by 4.4 Documentation / 4.5 Verification per Critical Workflow). No unit tests (project has none).

---

## Files Touched (summary)

| File | Lines | Change |
|---|---|---|
| `src/data/features.ts` | 92 | intro text |
| `.agent/project-info/landing-content.es.md` | 205 | intro text sync |
| `src/components/landing/FloatingCta.vue` | ~18, ~40–46 | add `isElementInViewport`, set initial refs in `onMounted` |
| `src/components/landing/SolutionExcelComparison.vue` | 78–81 | `font-size: 0.8rem` + `overflow-wrap: break-word` |

No new files. No new folders. No dependency changes. No `.agent/project-structure.md` update needed.
