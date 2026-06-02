# Plan: BetaSection — Restyle background + color closing phrase

## Objective

Update `src/components/landing/BetaSection.vue` to use an emerald gradient background and increase the visual weight of the closing phrase.

## Current State

- `.beta-section` background: `linear-gradient(135deg, var(--color-primary), var(--color-primary-hover))`
- `.beta-closing` has `color: var(--color-white)` with `opacity: 0.9`

## Target State

- `.beta-section` background: `linear-gradient(135deg, var(--color-accent), #0d9488)`
- `.beta-closing` has `color: var(--color-white)` with `font-weight: 600` and **no** `opacity`

## Steps

### 1. Edit `src/components/landing/BetaSection.vue`

#### 1.1 Update `.beta-section` background

Replace the existing background declaration:

```css
.beta-section {
  background: linear-gradient(135deg, var(--color-accent), #0d9488);
  color: var(--color-white);
}
```

#### 1.2 Update `.beta-closing` style

Replace the existing `.beta-closing` block:

```css
.beta-closing {
  font-size: 1rem;
  font-style: italic;
  margin-top: 1.5rem;
  margin-bottom: 0;
  color: var(--color-white);
  font-weight: 600;
}
```

### 2. Verify build

Run the project's build command (e.g., `npm run build`) to confirm the component compiles without errors.

### 3. Code review

- Ensure only the two specified style blocks were modified.
- Confirm no unused CSS variables remain.
- Verify `var(--color-accent)` resolves to `#10b981` in the design system.

### 4. Documentation

- No README or docs updates required for this purely visual change unless a style guide explicitly documents the beta section palette.

## Success Criteria

- [ ] `BetaSection.vue` uses emerald gradient background.
- [ ] `.beta-closing` is fully opaque and bold (`font-weight: 600`).
- [ ] Build passes without errors.
