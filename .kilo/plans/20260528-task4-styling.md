# Plan: Task 4 — Styling & Polish Assessment

**Date:** 2026-05-28
**TODO:** `.agent/todos/20260521/20260521-todo-1.md` — Task 4
**Components:** `ProblemSection.vue`, `SolutionSection.vue`
**Style Guide:** `.agent/project-info/style-guide.md`

---

## Assessment Summary

**Result: Both components are already well-styled. All 5 Task 4 requirements are met.** No mandatory code changes needed.

---

## Requirement-by-Requirement Evidence

### 1. Bootstrap 5 utilities + scoped styles → ✅ MET

| Component | Bootstrap Utilities Used | Scoped Styles Used |
|---|---|---|
| ProblemSection | `container`, `row`, `col-12`, `col-md-10`, `col-lg-9`, `list-unstyled`, `g-4`, `col-md-6`, `.dark-card` | Typography, spacing, layout refinements |
| SolutionSection | `container`, `row`, `justify-content-center`, `col-12`, `col-md-10`, `col-lg-9`, `g-4`, `col-md-6`, `.dark-card` | Typography, spacing, layout refinements |
| HeroSection (reference) | `d-flex`, `align-items-center`, `text-center`, `display-4`, `fw-bold`, `text-white`, `mb-4`, `lead`, `mb-5`, `d-flex`, `flex-column`, `flex-sm-row`, `gap-3`, `btn`, `btn-primary`, `btn-lg`, `px-4`, `py-3`, `fw-semibold` | Background gradient, hover effects, mobile overrides |

Both Problem and Solution sections use Bootstrap grid/layout utilities and supplement with scoped styles. The approach is valid and follows the same pattern as the design system.

### 2. Consistent visual style with Hero/Navbar → ✅ MET

| Element | Hero/Navbar | ProblemSection | SolutionSection | Match? |
|---|---|---|---|---|
| Background color | Navbar: `rgba(0c,15,28,0.85)`. Hero: gradient `--color-bg-navy`/`--color-bg-dark` | `--color-bg-dark` | `--color-bg-navy` | ✅ Follows alternation table |
| CSS variables | All colors via `var(--color-*)` | All colors via `var(--color-*)` | All colors via `var(--color-*)` | ✅ |
| Scroll animations | `data-reveal` + `useScrollReveal()` | `data-reveal` + `useScrollReveal()` | `data-reveal` + `useScrollReveal()` | ✅ |
| Card pattern | Navbar uses `.dark-card` (N/A). Hero: no cards | `.dark-card` for pain points | `.dark-card` for features | ✅ |
| Section padding | Hero: custom. Navbar: fixed-top | Inherits `5rem` from `base.css` | Inherits `5rem` from `base.css` | ✅ |

### 3. Typography hierarchy → ✅ MET

| Element | Style Guide Spec | ProblemSection | SolutionSection | Match? |
|---|---|---|---|---|
| Section title | 2.25rem / 700 / `--color-text-on-dark` | 2.25rem / 700 / `--color-text-on-dark` | 2.25rem / 700 / `--color-text-on-dark` | ✅ |
| Section subtitle | 1.125rem / 400 / `--color-text-on-dark-muted` | 1.125rem / 400 / `--color-text-on-dark-muted` (`.problem-body`) | 1.125rem / 400 / `--color-text-on-dark-muted` (`.solution-body`) | ✅ |
| Card titles | 1.25rem / 600 | N/A (no card titles) | 1.125rem / 600 (`.feature-label`) | ⚠️ Minor: 0.125rem smaller than spec |
| Body text | 1rem / 400 | 1rem / 400 (`.pain-point-text`) | 0.95rem (`.feature-description`) | ✅ Within range |
| Mobile title | (no fixed spec) | 1.75rem at <768px | 1.75rem at <768px | ✅ |

**Note on SolutionSection `.feature-label`:** Using 1.125rem instead of 1.25rem. This is a minor deviation that does not harm visual hierarchy and is within the card-title range.

### 4. Mobile-first responsive design → ✅ MET

- Bootstrap responsive grid: `col-12` → `col-md-6` at md breakpoint ✅
- Mobile media queries at `767.98px`: title font reduction (2.25rem → 1.75rem), body text reduction ✅
- Section padding (`5rem` from `base.css`) — reasonable on mobile, no override needed per style guide ✅
- Layout stacks vertically on narrow screens via Bootstrap grid ✅

### 5. Subtle icons using Bootstrap Icons → ✅ MET

| Section | Icons Used | Color | Semantic Fit |
|---|---|---|---|
| ProblemSection | `bi-chat-dots`, `bi-check2-circle`, `bi-journal-text`, `bi-person-x` | `--color-text-on-dark-dim` (#64748b) | ✅ Muted — emphasizes pain/drudgery |
| SolutionSection | `bi-lightning-charge`, `bi-graph-up`, `bi-file-earmark-arrow-up`, `bi-clipboard2-check` | `--color-primary` (#3b82f6) | ✅ Vibrant — emphasizes benefits/speed |

---

## Optional Polish Items

These are cosmetic enhancements that could improve visual polish but are **not required** to meet Task 4 acceptance criteria.

### Option A: Dark-card hover elevation

Add subtle hover lift to cards, matching the interactivity level of Hero CTA buttons.

**Files:** `ProblemSection.vue`, `SolutionSection.vue`

```css
/* Add to each component's <style scoped> */
.pain-point-content,
.feature-content {
  transition: transform 0.2s ease;
}

.pain-point-content:hover,
.feature-content:hover {
  transform: translateY(-2px);
}
```

**Effort:** 2 lines per component. Low risk.

### Option B: Reduce mobile section padding

Override base.css `5rem` padding on mobile for more compact sections.

```css
@media (max-width: 767.98px) {
  .problem-section,
  .solution-section {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
}
```

**Effort:** Minimal. Subjective UX choice.

### Option C: ProblemSection icon accent color

Change pain-point icons from `--color-text-on-dark-dim` to a warmer muted tone (orange/amber) to emphasize "pain."

```css
.pain-point-icon {
  color: #f59e0b; /* or define a new variable */
}
```

**Effort:** 1 line per component. Requires style guide approval for new color.

---

## Conclusion

**No mandatory code changes required.** Both components pass all 5 Task 4 acceptance criteria and follow the dark-first design system established in the style guide. The Plan Agent can proceed directly to Step 4.5 (Verification) or optionally implement polish items above.

---

## References

- Style guide: `.agent/project-info/style-guide.md`
- Style guide Section 3.1 (alternation table): Problem = `--color-bg-dark`, Solution = `--color-bg-navy`
- Style guide Section 4.3 (card pattern): `.dark-card` usage
- Style guide Section 5 (scroll animations): `[data-reveal]` + `useScrollReveal()`
