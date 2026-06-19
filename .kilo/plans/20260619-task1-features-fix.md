# Fix Plan — Task 1: Improve Features Section

**TODO:** `.agent/todos/20260619/20260619-todo-1.md` → Task 1  
**Target files:** `src/components/landing/FeaturesSection.vue`

---

## Findings

The implementation is functionally correct and meets the acceptance criteria (Bootstrap 5 accordion, 7 + 5 features matching §5, multi-open behavior, responsive layout, dark theme, under 200 lines). The following are minor deviations from the implementation plan that should be aligned.

---

## Fix 1 — Accordion item styling does not match the planned FaqSection pattern

**Location:** `FeaturesSection.vue` `<style scoped>` → `.accordion-item`

**Current:**

```css
.accordion-item {
  background: transparent;
  border: none;
  border-radius: 0;
  margin-bottom: 0;
}
```

**Planned:** reuse `FaqSection` dark accordion overrides (`bg --color-bg-card`, `border`, `8px radius`, `overflow hidden`).

**Action:** Either align with the plan by giving each `.accordion-item` the card-style treatment, **or** update the implementation plan to document the chosen grouped-card design (group wrapper with left accent + flat items) as an intentional refinement. If aligning with the plan, preserve the group left-border accent by wrapping items in the existing `.feature-group` container.

---

## Fix 2 — Missing accordion collapse transition

**Location:** `FeaturesSection.vue` `<style scoped>`

**Current:** no `.accordion-collapse` transition rule.

**Planned:** include `.accordion-collapse { transition: height 0.35s ease; }` (mirrors `FaqSection.vue`).

**Action:** add the transition rule to match the plan and existing component behavior.

```css
.accordion-collapse {
  transition: height 0.35s ease;
}
```

---

## Fix 3 — Accordion body left padding differs from planned alignment

**Location:** `FeaturesSection.vue` `<style scoped>` → `.accordion-body`

**Current:**

```css
.accordion-body {
  padding: 0 1.5rem 1rem calc(1.5rem + 1.1rem + 0.75rem);
}
```

**Planned:** body indented `padding-left: 3.1rem` to align under the header text.

**Action:** adjust padding-left to `3.1rem` (or update the plan to reflect the computed value). Ensure mobile breakpoint uses the corresponding reduced value.

---

## Verification

1. Run `npm run build` and `npm run lint` after changes.
2. Visually verify desktop and mobile accordion rendering remains professional and readable.
3. Confirm no regressions in content, expand/collapse behavior, or scroll-reveal animations.

---

## Out of Scope

- No changes to `src/types/features.ts`, `src/data/features.ts`, or `.agent/project-structure.md`.
- No changes to other sections (UseCasesSection, FaqSection, App.vue, navbar).
