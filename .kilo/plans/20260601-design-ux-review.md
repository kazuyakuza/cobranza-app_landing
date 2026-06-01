# Design & UX Review Plan — ContactSection + Footer

## Scope

Verify newly implemented `ContactSection.vue` and `Footer.vue` against design requirements from TODO-08 §3 and `style-guide.md`.

---

## Verification Results

### 1. ContactSection Background

- **Requirement**: `--color-bg-dark` per style-guide.md §3.1 alternation table.
- **Current**: `background: var(--color-bg-dark);`
- **Status**: ✅ PASS

### 2. Footer Background

- **Requirement**: `--color-bg-deepest` per style-guide.md §3.1 alternation table.
- **Current**: `background: var(--color-bg-deepest);`
- **Status**: ✅ PASS

### 3. ContactSection CTA Prominence

- **Requirements**: "visually strong as a final CTA" (font size, color, spacing, hover effects).
- **Current**:
  - Title: `2.25rem` / `700` weight (matches style-guide type scale).
  - Button: `btn btn-primary btn-lg px-4 py-3 fw-semibold` — large Bootstrap button with primary blue.
  - Hover: `translateY(-2px)` + blue shadow.
  - Placed above the form, clear hierarchy.
- **Status**: ✅ PASS

### 4. Embedded Form Responsive Behavior

- **Requirement**: "Make the embedded form responsive".
- **Current**: Wrapper uses `position: relative; width: 100%; max-width: 640px; padding-top: 90%;` with iframe absolutely positioned to fill. Aspect ratio `90%` matches original iframe dimensions (`576/640`).
- **Status**: ✅ PASS

### 5. Color Contrast & Readability

- **Requirement**: `--color-text-on-dark` for primary text, `--color-text-on-dark-muted` for secondary.
- **Current**:
  - Title: `--color-text-on-dark`
  - Subtitle / email label: `--color-text-on-dark-muted`
  - Email link: `--color-primary` (pops on dark)
  - Form notice: `--color-text-on-dark-dim` (tertiary caption, appropriate per style guide)
- **Status**: ✅ PASS

### 6. Section Spacing Consistency

- **Requirement**: `5rem` top/bottom via `base.css`.
- **Current**: `<section>` tag inherits `padding-top: 5rem; padding-bottom: 5rem;` from `base.css`.
- **Status**: ✅ PASS

### 7. Footer Spacing

- **Requirement**: `3rem` fits "seamless page close" intent.
- **Current**: `padding-top: 3rem; padding-bottom: 3rem;` on `<footer>`.
- **Status**: ✅ PASS

### 8. Overall Page Flow

- **Requirement**: Pricing → Faq → Contact → Footer feels natural.
- **Current backgrounds**:
  - Pricing: `--color-bg-navy`
  - FAQ: `--color-bg-slate`
  - Contact: `--color-bg-dark`
  - Footer: `--color-bg-deepest`
- **Observation**: Progressive darkening creates a natural page-close rhythm.
- **Status**: ✅ PASS

---

## Issue Found

### Hardcoded CTA Hover Shadow Color

**File**: `src/components/landing/ContactSection.vue`
**Line**: 126
**Current**:
```css
.contact-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 123, 255, 0.35);
}
```

**Problem**:
- `rgba(0, 123, 255, 0.35)` is Bootstrap's old default primary (`#007bff`), not the project's `--color-primary` (`#3b82f6` = `rgb(59, 130, 246)`).
- Violates style-guide.md rule: "Never hardcode hex values in components."
- Produces a subtly wrong-colored shadow.

**Fix**:
```css
.contact-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgb(var(--bs-primary-rgb) / 0.35);
}
```

This reuses the existing `--bs-primary-rgb` variable already defined in `variables.css`.

---

## Action Items

| # | Task | File | Change |
|---|---|---|---|
| 1 | Fix CTA hover shadow color | `src/components/landing/ContactSection.vue` | Replace `rgba(0, 123, 255, 0.35)` with `rgb(var(--bs-primary-rgb) / 0.35)` |

---

## Summary

All design requirements are met. Only **one CSS value fix** is required to align the ContactSection CTA hover shadow with the project's color system.
