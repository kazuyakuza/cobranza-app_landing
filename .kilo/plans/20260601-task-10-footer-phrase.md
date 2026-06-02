# Plan: Footer — Add Color to Closing Phrase

## Task

Change `.footer-phrase` in `src/components/landing/Footer.vue` from `color: var(--color-text-on-dark)` to `color: var(--color-accent)` (emerald `#10b981`, confirmed by user) and add `font-weight: 600` for emphasis.

## Current State

- **File**: `src/components/landing/Footer.vue`
- **Line 89–95**: `.footer-phrase` scoped block
  - `font-size: 1.125rem`
  - `font-style: italic`
  - `color: var(--color-text-on-dark)` ← to be changed
  - `margin-bottom: 0`
  - `line-height: 1.6`
- **CSS variable**: `--color-accent: #10b981` is already defined in `src/assets/styles/variables.css`

## Steps

### Step 1 — Edit `.footer-phrase` CSS block

**File**: `src/components/landing/Footer.vue`  
**Lines**: 89–95 (inside `<style scoped>`)

Replace:

```css
.footer-phrase {
  font-size: 1.125rem;
  font-style: italic;
  color: var(--color-text-on-dark);
  margin-bottom: 0;
  line-height: 1.6;
}
```

With:

```css
.footer-phrase {
  font-size: 1.125rem;
  font-style: italic;
  color: var(--color-accent);
  font-weight: 600;
  margin-bottom: 0;
  line-height: 1.6;
}
```

### Step 2 — Build verification

Run `npm run build` (or equivalent build command) to ensure the project compiles cleanly with no Vite/Vue compilation errors.

### Step 3 — Lint verification

Run `npm run lint` (or equivalent lint command) to ensure no style lint errors are introduced.

### Step 4 — Git commit

Commit the change with message:

```text
style(footer): change closing phrase color to emerald accent and add font-weight 600
```

Before committing, verify `.gitignore` compliance and ensure no ignored files are staged.

## Verification Checklist

- [ ] `.footer-phrase` uses `color: var(--color-accent)`
- [ ] `.footer-phrase` includes `font-weight: 600`
- [ ] Build passes without errors
- [ ] Lint passes without errors
- [ ] Change is committed on `feat/styling-polish-10-tasks`

## Files Modified

- `src/components/landing/Footer.vue`
