# Plan — FAQ Section Design & UX Polish

## Task
Polish `src/components/landing/FaqSection.vue` design to fully meet the "Design & UX" requirements:
- Clear question titles and well-formatted answers
- Good spacing and readable typography
- Mobile-friendly

## Analysis Summary

The FAQ section already implements:
- Bootstrap 5 Accordion markup and behavior
- Dark theme overrides via CSS variables
- Section title (2.25rem, 700 weight) matching the style guide
- Accordion button (1rem, 600 weight) and body (1rem, 1.6 line-height, muted color)
- Chevron filter for dark background visibility
- Primary-color focus ring
- Smooth 0.35s collapse transition
- Responsive title resize at 767.98px
- Bootstrap grid (`col-12 col-md-10 col-lg-9`)
- Correct background (`--color-bg-slate` per style guide Section 3.1)
- Scroll reveal (`data-reveal`) on title and accordion

## Design Gaps Found

1. **No visual separation between accordion items** — Items sit flush with only a 1px border, creating a monolithic block. The `.dark-card` pattern used elsewhere (Pricing, Features, etc.) uses `border-radius` and clear separation. Each accordion item should feel like an individual card.
2. **Missing `border-radius` on accordion items** — Flat corners look less polished compared to the rest of the page.
3. **Bootstrap first/last item border-radius overrides** — Bootstrap only rounds the top of the first item and bottom of the last. When items are separated, all corners of every item should be rounded uniformly.
4. **Last item extra bottom margin** — If a `margin-bottom` is added to all items, the last one will create unwanted spacing below the accordion.

## Implementation Steps

### Step 1: Add visual separation and rounded corners to accordion items

In `src/components/landing/FaqSection.vue`, update the `.accordion-item` rule and add first/last overrides:

```css
.accordion-item {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  margin-bottom: 0.75rem;
  overflow: hidden;
}

.accordion-item:first-of-type,
.accordion-item:last-of-type {
  border-radius: 8px;
}

.accordion-item:last-of-type {
  margin-bottom: 0;
}
```

### Step 2: Verify no other changes needed

- Typography already matches style guide (Section 2.2)
- Color variables already used correctly (Section 1)
- Section background follows alternation pattern (Section 3.1)
- Padding inherits from `base.css` (`section { padding: 5rem 0; }`)
- Mobile breakpoint already present

### Step 3: Build check

Run the project's build command to ensure the component compiles without errors.

### Step 4: Commit

Commit the scoped style changes with a meaningful message.

## Verification Checklist

- [ ] Accordion items have 8px border-radius on all corners
- [ ] 0.75rem gap between each accordion item
- [ ] Last accordion item has no bottom margin
- [ ] Button and body corners are clipped cleanly (`overflow: hidden`)
- [ ] Build passes without errors
- [ ] Mobile rendering unchanged (responsive breakpoint still active)
