# Plan — Task 5: Styling & Polish (UseCasesSection)

## Overview

Audit `UseCasesSection.vue` against `ProblemSection.vue` (reference) and the style guide to ensure consistent spacing, typography, iconography, visual hierarchy, and responsive behavior.

## Audit Findings

### 1. Spacing / Typography vs ProblemSection
- **Title alignment**: ProblemSection and SolutionSection titles are left-aligned. UseCasesSection title uses `text-align: center`.
- **Title bottom margin**: ProblemSection / SolutionSection use `margin-bottom: 1.5rem`. UseCasesSection uses `margin-bottom: 2.5rem`.
- **Icon size**: ProblemSection and SolutionSection icons are `1.4rem`. UseCasesSection icons are `1.5rem`.

### 2. Bootstrap Icons
- All five icons (`bi-building`, `bi-house-door`, `bi-briefcase`, `bi-mortarboard`, `bi-arrow-repeat`) are valid Bootstrap Icons classes.
- Icons are rendered with `<i>` tags and `aria-hidden="true"`, matching the reference pattern.

### 3. Visual Hierarchy
- Clear flow: `h2` title → grid cards (`.dark-card`) → detailed example (`.dark-card` + left border accent).
- `data-reveal` attributes present on title, grid wrapper, and detailed example block.
- No issues.

### 4. Responsive Layout
- Grid uses `col-12 col-md-6 col-lg-4` (mobile / tablet / desktop). ✅
- Container uses `col-12 col-md-10 col-lg-9`. ✅
- Mobile media query (`max-width: 767.98px`) scales down title and sub-title font sizes. ✅

### 5. Inconsistencies
- Title alignment and margin differ from ProblemSection / SolutionSection.
- Icon size is slightly larger than reference sections.
- `.detailed-example-title` is `1.5rem`; the style guide card-title scale is `1.25rem`. As an `<h3>` sub-heading this is acceptable, but could be tightened to `1.25rem` for strict adherence.

## Action Items

All changes target `src/components/landing/UseCasesSection.vue`.

### Step 1 — Align title with reference sections
Remove `text-align: center` and change `margin-bottom` from `2.5rem` to `1.5rem`.

```css
.use-cases-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.25;
}
```

### Step 2 — Match icon size to reference
Change `.use-case-icon` from `1.5rem` to `1.4rem`.

```css
.use-case-icon {
  font-size: 1.4rem;
  color: var(--color-text-on-dark-dim);
  flex-shrink: 0;
  margin-top: 0.15rem;
}
```

### Step 3 — (Optional) Tighten detailed-example title
If strict card-title scale adherence is desired, reduce `.detailed-example-title` from `1.5rem` to `1.25rem`. Otherwise leave as-is (sub-heading prominence is reasonable).

```css
.detailed-example-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  line-height: 1.3;
}
```

### Step 4 — Verify responsive behavior
Ensure no regressions on mobile/tablet after typography changes.

### Step 5 — Build check
Run build / lint to confirm no compilation errors.

## Conclusion

The component is structurally sound and largely complete from Tasks 1-3. **Minor polish changes are needed** (title alignment/margin and icon size) to bring it fully in line with the ProblemSection reference. The optional detailed-example title resize can be decided during implementation.
