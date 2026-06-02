# Plan — FeaturesSection: Equal height for 2 boxes

## Task
Make the two `.feature-group` divs in `FeaturesSection.vue` equal height regardless of content length (6 items vs 4 items).

## Current State
- File: `src/components/landing/FeaturesSection.vue`
- Two `.feature-group` elements are wrapped in `col-12 col-md-6` columns inside a Bootstrap `.row.g-4`.
- The columns stretch to the tallest sibling by default (Bootstrap flex row), but the inner `.feature-group` cards do not fill the full column height because they lack an explicit height.
- `.dark-card` (applied to each `.feature-group`) only sets `background`, `border`, `border-radius`, and `padding`.

## Root Cause
`.feature-group` has no `height` declaration, so it sizes to its content, making the two cards visually uneven.

## Fix
Add a single CSS rule to the `<style scoped>` block of `FeaturesSection.vue`:

```css
.feature-group {
  height: 100%;
}
```

This makes each card fill the full height of its Bootstrap column, which already stretches to the tallest sibling in the row.

## Implementation Steps

### 1. CSS Change
**File:** `src/components/landing/FeaturesSection.vue`
**Location:** `<style scoped>` block (after the `.features-subtitle` rule, before `.feature-group-company`)
**Change:** Insert:
```css
.feature-group {
  height: 100%;
}
```

### 2. Verification
- Run the dev server (e.g., `npm run dev`) and visually confirm both cards are the same height on medium (`md`) and larger breakpoints.
- Optionally, inspect the computed height in DevTools to ensure both `.feature-group` elements match.

## Rollback
Remove the `.feature-group { height: 100%; }` block if needed.
