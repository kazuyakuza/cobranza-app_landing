# Plan: FeaturesSection Styling & Polish (Task 5)

## Objective
Final polish pass on `FeaturesSection.vue` to ensure full visual consistency with the established dark-first design system and sibling sections.

## Analysis Summary

### What Was Reviewed
- `src/components/landing/FeaturesSection.vue` (target)
- `src/components/landing/UseCasesSection.vue` (reference)
- `src/components/landing/HeroSection.vue` (reference)
- `src/assets/styles/base.css` (section padding, card pattern)
- `.agent/project-info/style-guide.md` (source of truth)

### Consistency Check Results

| Criterion | Expected | FeaturesSection | Status |
|---|---|---|---|
| Section padding | 5rem top/bottom (from `base.css`) | Inherited, not overridden | OK |
| Title font size | 2.25rem | 2.25rem | OK |
| Title font weight | 700 | 700 | OK |
| Subtitle font size | 1.125rem | 1.125rem | OK |
| Subtitle color | `--color-text-on-dark-muted` | `--color-text-on-dark-muted` | OK |
| Card class | `.dark-card` | `.dark-card` used on both groups | OK |
| Mobile breakpoint | 767.98px | 767.98px | OK |
| Mobile title size | 1.75rem | 1.75rem | OK |
| Scroll reveal | `data-reveal` + `useScrollReveal()` | Present on title, subtitle, both columns | OK |
| CSS variables | No hardcoded hex | All colors use CSS variables | OK |
| Scoped styles | `<style scoped>` | Yes | OK |
| Background | `--color-bg-dark` | `--color-bg-dark` | OK |

### Issues Found

#### Issue 1: Icon Color Mismatch in Company Feature Group (Definite Fix)
- **Current**: `.feature-icon` is hardcoded to `var(--color-accent)` (green) for all items.
- **Problem**: The company group title uses `var(--color-primary)` (blue), but its icons are green. This breaks visual cohesion within the card.
- **User group** title and icons are both green — already consistent.
- **Fix**: Override icon color inside `.feature-group-company` to `var(--color-primary)`.

#### Issue 2: Mobile Column Stacking Spacing (Verify / Minor)
- **Current**: Stacked columns rely on Bootstrap `g-4` gap.
- **Assessment**: Likely fine, but should be visually verified after build to ensure cards don't feel too cramped or too far apart on small screens.
- **Action**: No code change unless visual verification reveals a problem. If needed, add scoped mobile padding adjustment to `.feature-group`.

#### Issue 3: Text Contrast on Dark Backgrounds (Verify)
- **Current**: Body text uses `var(--color-text-on-dark)`, subtitle uses `var(--color-text-on-dark-muted)`.
- **Assessment**: Matches style guide and passes WCAG AA per documented contrast ratios.
- **Action**: No code change needed.

## Implementation Steps

### Step 1: Fix Icon Color Cohesion
**File**: `src/components/landing/FeaturesSection.vue`

Add a scoped CSS selector to align company-group icons with the company-group title color:

```css
.feature-group-company .feature-icon {
  color: var(--color-primary);
}
```

Place this rule immediately after the existing `.feature-icon` block or near the other `.feature-group-company` modifiers.

**Rationale**: This keeps the default `.feature-icon` as accent green (matching the user group), while only overriding the company group where the title is already primary blue.

### Step 2: Verify Mobile Layout
- Run the dev server or build the project.
- Open the page in a viewport narrower than 768px.
- Confirm that stacked columns have comfortable vertical spacing (`g-4` gap).
- If spacing feels off, add a scoped mobile rule (e.g., reduce `.feature-group` padding via `.dark-card` override at `max-width: 767.98px`). **Only if visual check fails.**

### Step 3: Final Consistency Checklist
- [ ] Section padding visually matches adjacent sections (Problem, Solution, UseCases).
- [ ] Title size and weight match UseCasesSection.
- [ ] Card corners, border, and padding match `.dark-card` spec.
- [ ] Hover effect on icons is subtle (`translateX(2px)`).
- [ ] No TypeScript or lint errors.
- [ ] No commented-out code.

## Expected Result
- FeaturesSection is visually consistent with the rest of the landing page.
- Color hierarchy within each feature group is coherent (title + icons share the same accent).
- Mobile layout is comfortable and readable.

## Plan Output
- Plan file: `.kilo/plans/20260529-features-section-task5.md`
- Primary issue found: 1 (icon color mismatch in company group)
- Secondary verification items: 2 (mobile spacing, contrast)
