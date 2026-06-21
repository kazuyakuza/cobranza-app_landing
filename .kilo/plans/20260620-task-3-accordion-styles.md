# Task 3: Accordion Style Fixes (FAQ & Use Cases)

## Branch
`feat/landing-ui-fixes-20260620`

## Files
- `src/components/landing/FaqGroupAccordion.vue`
- `src/components/landing/UseCasesTabs.vue`

## Problem

Bootstrap's default `.accordion-button:not(.collapsed)` sets a dark blue text color on open accordion buttons. The dark theme overrides the background to `--color-bg-card-alt` but not the text color, producing low-contrast dark-blue-on-dark-blue text. The use-cases mobile accordion body also lacks top padding, so content sits flush against the open button.

## Changes

### 1. `FaqGroupAccordion.vue`

Two accordion button types turn dark blue when open (group + question).

**1a.** Add `color` to the existing `.faq-group-button:not(.collapsed)` rule:
```css
.faq-group-button:not(.collapsed) {
  background: var(--color-bg-card-alt);
  color: var(--color-text-on-dark);
  box-shadow: none;
}
```

**1b.** Add a new `.faq-question-button:not(.collapsed)` rule after the `.faq-question-button` rule. Bootstrap's `.accordion-button:not(.collapsed)` overrides the single-class color when open, so an explicit `:not(.collapsed)` rule is required:
```css
.faq-question-button:not(.collapsed) {
  color: var(--color-text-on-dark);
}
```

### 2. `UseCasesTabs.vue`

**2a.** Add `color` to the existing `.use-case-mobile-button:not(.collapsed)` rule:
```css
.use-case-mobile-button:not(.collapsed) {
  background: var(--color-bg-card-alt);
  color: var(--color-text-on-dark);
  box-shadow: none;
}
```

**2b.** Update `.use-case-mobile-body` padding to add top padding:
```css
.use-case-mobile-body {
  padding: 1rem 1.25rem 1.25rem;
  background: var(--color-bg-card);
}
```

## Verification

- Run `npm run build` to verify no errors.
- FAQ: expand each group and each question; confirm open button text is the light theme color, readable against dark blue; closed buttons unchanged.
- Use cases (viewport < 992px / DevTools mobile): expand each accordion; confirm open button text is readable and body content has visible top spacing (no longer flush).

## Git

- Already on `feat/landing-ui-fixes-20260620`; no branch action.
- Commit: `fix(landing): correct accordion open-state text color and use-case mobile body padding`.

## Out of Scope

- No changes to non-open accordion states, desktop use-cases tabs, or template/script logic. CSS-only edits.
