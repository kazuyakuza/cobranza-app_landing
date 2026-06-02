# Plan: HeroSection — Fix "Cómo funciona" hover text visibility

## Problem

`.hero-cta-secondary` uses Bootstrap's `btn-outline-light` class (white text / white border). The custom hover rule in `<style scoped>` sets `background-color: rgba(255, 255, 255, 0.1)`, which is a nearly-transparent white tint. Against the dark gradient hero background, the white text becomes nearly invisible on hover.

## File

- `src/components/landing/HeroSection.vue`

## Change

### Section to modify

Lines 76–80 in the `<style scoped>` block:

```css
.hero-cta-secondary:hover {
  transform: translateY(-2px);
  background-color: rgba(255, 255, 255, 0.1);
}
```

### New code

```css
.hero-cta-secondary:hover {
  transform: translateY(-2px);
  background-color: var(--color-primary);
  color: white;
}
```

### Rationale

- Replace the low-contrast `rgba(255, 255, 255, 0.1)` hover background with the solid `--color-primary` (brand blue).
- Explicitly declare `color: white` to override any Bootstrap `btn-outline-light` hover color shift and guarantee high contrast.
- Keep `transform` and `transition` unchanged.

## Verification

1. Open the landing page in a browser.
2. Hover over the "Cómo funciona" button in the hero section.
3. Confirm the button background changes to solid blue (`--color-primary`).
4. Confirm the text remains clearly visible in white.
