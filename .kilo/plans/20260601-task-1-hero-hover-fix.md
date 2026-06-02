# Fix Plan: HeroSection — Replace hardcoded `white` with CSS variable

## Issue

In `src/components/landing/HeroSection.vue`, line 105, the hover rule uses `color: white` (hardcoded CSS keyword) instead of the project's CSS custom property `var(--color-white)`.

The project defines `--color-white: #ffffff` in `src/assets/styles/variables.css` and uses it consistently across all other components (e.g., `BetaSection.vue` uses `var(--color-white)` 6 times). Using the hardcoded keyword breaks the established pattern.

## File

- `src/components/landing/HeroSection.vue`

## Change

### Current (line 105)

```css
  color: white;
```

### Fixed

```css
  color: var(--color-white);
```

## Scope

- Single line change, no other modifications needed.