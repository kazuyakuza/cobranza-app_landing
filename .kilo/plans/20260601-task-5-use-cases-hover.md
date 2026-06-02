# Task 5 — UseCasesSection Hover Effect

## Objective
Add a subtle hover effect to the 5 `.use-case-card` elements inside `src/components/landing/UseCasesSection.vue`.

## Current State
- File: `src/components/landing/UseCasesSection.vue`
- The 5 cards use `class="use-case-card dark-card"`.
- `.dark-card` (global, `base.css`) provides `background`, `border`, `border-radius`, `padding`.
- `.use-case-card` (scoped) currently defines flex layout only:
  ```css
  .use-case-card {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    height: 100%;
  }
  ```
- No hover or transition styles exist for these cards.

## Target Behavior
On hover of each `.use-case-card`:
- `transform: translateY(-4px)`
- `border-color: var(--color-primary)`
- Smooth transition: `transition: transform 0.25s ease, border-color 0.25s ease`

## Implementation Steps

### Step 1 — Add transition and hover styles
In `src/components/landing/UseCasesSection.vue`, within the existing `<style scoped>` block, modify the `.use-case-card` rule and add a hover rule.

**Before:**
```css
.use-case-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  height: 100%;
}
```

**After:**
```css
.use-case-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  height: 100%;
  transition: transform 0.25s ease, border-color 0.25s ease;
}

.use-case-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-primary);
}
```

### Step 2 — Verify no regression
- Confirm `.dark-card` base styles remain untouched in `base.css`.
- Confirm the adjacent `.detailed-example.dark-card` does **not** receive hover effects (scoped to `.use-case-card`).
- Ensure `transform` does not conflict with `data-reveal` scroll animations (no existing transform on `.use-case-card`).

## Files Changed
- `src/components/landing/UseCasesSection.vue` — scoped CSS only.

## Testing / Verification
- Visual check: hover over each of the 5 use-case cards and confirm lift + border color change.
- Ensure transition feels smooth (0.25s).

## Constraints
- Do not modify global `.dark-card` styles.
- Do not add hover effects to the `.detailed-example` card.
- Use only CSS variables already defined in the project (`--color-primary`).
