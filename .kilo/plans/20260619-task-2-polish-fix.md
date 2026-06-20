# Fix Plan — Task 2 Polish Review

## Review outcome

Code review found **one blocking issue** introduced by the polish commit and **one pre-existing style issue** in a file touched by the polish commit. The production build passes (`vue-tsc` + `vite build`), but `npm run lint` reports formatting errors that must be resolved before the task can be considered complete.

## Blocking issue: `ConciliationDiagram.vue` indentation

The wrapper `<div class="conciliation-diagram-scroll">` was added around the `<svg>`, but the SVG children (`<defs>`, `<g>`, `<line>`) were not re-indented. This produces 113 `prettier/prettier` errors in this file alone.

### Fix

1. Open `src/components/landing/ConciliationDiagram.vue`.
2. Re-indent the entire `<svg>` block so that:
   - The wrapper `<div>` is at base template indentation (2 spaces inside `<template>`).
   - The `<svg>` opening/closing tags are indented 2 spaces inside the wrapper.
   - All SVG children are indented 2 additional spaces relative to `<svg>` (i.e. 4 spaces inside the wrapper).
3. Example structure after fix:

```vue
<template>
  <div class="conciliation-diagram-scroll">
    <svg
      class="conciliation-diagram"
      viewBox="0 0 620 300"
      width="100%"
      role="img"
      :aria-label="diagramLabel"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker ...>...</marker>
      </defs>
      <g class="conciliation-node" transform="translate(40,20)">...</g>
      ...
    </svg>
  </div>
</template>
```

4. Run `npm run lint` and confirm `ConciliationDiagram.vue` reports zero errors.

## Secondary issue: `FaqGroupAccordion.vue` one-line CSS rules

The variant modifier rules are written on a single line. Prettier reports 4 errors on these lines. Although these rules were not introduced by the polish commit, the file was modified during the polish step (duplicate CSS removal), so the formatting should be cleaned up now.

### Fix

Change lines 93–96 from:

```css
.faq-group-item--general { --group-color: var(--color-primary); }
.faq-group-item--company { --group-color: var(--color-accent); }
.faq-group-item--user { --group-color: var(--color-primary); }
.faq-group-item--conciliation { --group-color: var(--color-accent); }
```

To:

```css
.faq-group-item--general {
  --group-color: var(--color-primary);
}
.faq-group-item--company {
  --group-color: var(--color-accent);
}
.faq-group-item--user {
  --group-color: var(--color-primary);
}
.faq-group-item--conciliation {
  --group-color: var(--color-accent);
}
```

Then run `npm run lint` and confirm `FaqGroupAccordion.vue` reports zero errors.

## Optional cleanup: redundant `aria-hidden="false"`

In `src/components/landing/HowItWorksSection.vue`, the `<ConciliationDiagram>` usage carries `aria-hidden="false"`. The component itself already exposes `role="img"` and `aria-label`, so this attribute is redundant and can be removed. This is not a lint error, so it is optional.

## Verification

- [ ] `npm run lint` passes with no errors or warnings.
- [ ] `npm run build` still passes.
- [ ] All reviewed `src/` files remain ≤200 lines.
- [ ] No commented-out code was added.
- [ ] No hardcoded hex colors were introduced.
