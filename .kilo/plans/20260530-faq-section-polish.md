# Plan: FAQ Section — Styling & Polish

## Status: Verification-Only (No Code Changes Required)

After comparing `FaqSection.vue` against the project style guide, `base.css`, and peer sections (`PricingSection.vue`, `BetaSection.vue`, `FeaturesSection.vue`, `HeroSection.vue`), no styling or polish gaps were found. All requirements from the TODO task are already satisfied by the existing implementation.

---

## Verification Checklist

### 1. Design Language Consistency
- [ ] Confirm section title uses `2.25rem / 700` (matches style guide §2.2 and all other sections).
- [ ] Confirm body text uses `1rem / 400` with `line-height: 1.6` (matches style guide §2.2).
- [ ] Confirm background is `var(--color-bg-slate)` (matches style guide §3.1 FAQ row).
- [ ] Confirm section inherits `padding-top: 5rem; padding-bottom: 5rem` from `base.css` (no override in component).
- [ ] Confirm Bootstrap grid uses `container > row justify-content-center > col-12 col-md-10 col-lg-9` (same as Pricing).

### 2. Professional & Trustworthy Appearance
- [ ] Confirm accordion items use dark card pattern (`--color-bg-card`, `--color-border`, `border-radius: 8px`).
- [ ] Confirm expanded state uses `--color-bg-card-alt` for visual hierarchy.
- [ ] Confirm text colors are `--color-text-on-dark` (questions) and `--color-text-on-dark-muted` (answers) for readability.
- [ ] Confirm chevron icon is visible via `filter: brightness(0) invert(0.85)`.
- [ ] Confirm focus ring uses primary brand color (`rgba(var(--bs-primary-rgb), 0.5)`).

### 3. Smooth Accordion Animations
- [ ] Confirm `.accordion-collapse` has `transition: height 0.35s ease`.
- [ ] Confirm Bootstrap JS accordion behavior is functional (collapse/expand).

### 4. Responsive Design
- [ ] Confirm mobile breakpoint `@media (max-width: 767.98px)` reduces title to `1.75rem`.
- [ ] Confirm grid collapses to single column on mobile via Bootstrap classes.

### 5. Scroll Reveal
- [ ] Confirm `data-reveal` is present on `<h2>` and `.accordion`.
- [ ] Confirm `useScrollReveal()` is imported and called in `<script setup>`.

---

## Steps

1. Open `src/components/landing/FaqSection.vue`.
2. Review `<style scoped>` block against checklist above.
3. Run the dev server (`npm run dev` or equivalent) and visually inspect the FAQ section at desktop and mobile widths.
4. Interact with accordion items to verify expand/collapse animations and hover/focus states.
5. If any item fails verification, document the gap and create a fix sub-plan.
6. If all items pass, mark the TODO task as `[DONE]` and commit with message `chore(faq): verify styling and polish completeness`.

---

## Findings Summary

No gaps found. The existing `FaqSection.vue` implementation is complete and consistent with the project's design system.
