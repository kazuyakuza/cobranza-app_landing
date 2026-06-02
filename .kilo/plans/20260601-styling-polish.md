# Plan: Styling & Polish — ContactSection & Footer

**Date:** 2026-06-01  
**Task:** TODO-08 Task 5 — Styling & Polish (ContactSection & Footer final polish)  
**Source:** `.agent/todos/20260529/20260529-todo-3.md` §5  
**Status:** Issues found — 3 targeted fixes required  

---

## 1. Executive Summary

Both `ContactSection.vue` and `Footer.vue` are well-implemented and largely consistent with the project's dark-first design system. The components follow the section alternation table (Contact → `--color-bg-dark`, Footer → `--color-bg-deepest`), use correct typography scales, implement `data-reveal` animations appropriately, and integrate cleanly into the page flow.

Three minor polish issues were identified during analysis:
1. Footer email link can overflow its container on very narrow viewports.
2. ContactSection form notice and Footer legal text use `--color-text-on-dark-dim` which yields contrast ratios slightly below WCAG AA 4.5:1 on the darkest backgrounds.

All fixes are small, scoped CSS changes. No structural or global adjustments are required.

---

## 2. Analysis Checklist Results

| # | Check | Result |
|---|---|---|
| 1 | **Spacing consistency** | ContactSection inherits `5rem` padding from `base.css`. Footer overrides to `3rem` — **intentional and correct** for a slim page-close element. Gap between Contact (bottom 5rem) and Footer (top 3rem) is 8rem, creating a tighter visual connection. |
| 2 | **Color consistency** | ContactSection uses `--color-bg-dark` (style guide row 9). Footer uses `--color-bg-deepest` (style guide row 10). Matches the alternation table exactly. |
| 3 | **Typography consistency** | Title `2.25rem`/700, subtitle `1.125rem`, body `1rem` all match the type scale. Footer fine-print sizes (`0.95rem`, `0.875rem`, `0.8rem`) are appropriate for footer metadata. Mobile breakpoints reduce titles to `1.75rem` consistently. |
| 4 | **Page flow** | App.vue order: `… → PricingSection → FaqSection → ContactSection → Footer`. Contact serves as the strong final CTA; Footer provides a gentle, semantic close. Sequence is natural. |
| 5 | **Mobile responsiveness** | Iframe wrapper uses `padding-top: 90%` responsive ratio technique. CTA button is `btn-lg` with `px-4 py-3` — well above 44×44px touch target. Footer nav uses `flex-wrap` and hides separator pipes on mobile. |
| 6 | **Global polish** | No new global CSS patterns needed. `base.css` covers section padding, scroll reveal, and card styles adequately. |

---

## 3. Issues Found & Fixes

### Fix 1 — Footer email link overflow on narrow viewports

**File:** `src/components/landing/Footer.vue`  
**Line range:** 97–103 (`.footer-nav` ruleset)  
**Issue:** The email address `cobranza360pro@gmail.com` (26 characters) at `0.95rem` does not break mid-word. On viewports narrower than ~360 px, the flex item overflows its line because `flex-wrap` only wraps whole items, not words inside them.  
**Fix:** Add `overflow-wrap: break-word` to `.footer-nav` so the email can wrap if needed.

**Current:**
```css
.footer-nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.5rem 1rem;
}
```

**Proposed:**
```css
.footer-nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.5rem 1rem;
  overflow-wrap: break-word;
}
```

---

### Fix 2 — ContactSection form notice contrast

**File:** `src/components/landing/ContactSection.vue`  
**Line range:** 150–154 (`.contact-form-notice` ruleset)  
**Issue:** `color: var(--color-text-on-dark-dim)` (#64748b) on `--color-bg-dark` (#0c1528) at `0.875rem` yields a contrast ratio of ~3.9:1, which falls below the WCAG AA 4.5:1 threshold for normal text.  
**Fix:** Change the color to `var(--color-text-on-dark-muted)` which provides ~6.3:1 on the darkest backgrounds and passes AA comfortably.

**Current:**
```css
.contact-form-notice {
  font-size: 0.875rem;
  color: var(--color-text-on-dark-dim);
  margin-bottom: 0;
}
```

**Proposed:**
```css
.contact-form-notice {
  font-size: 0.875rem;
  color: var(--color-text-on-dark-muted);
  margin-bottom: 0;
}
```

---

### Fix 3 — Footer legal text contrast

**File:** `src/components/landing/Footer.vue`  
**Line range:** 134–138 (`.footer-legal` ruleset)  
**Issue:** `color: var(--color-text-on-dark-dim)` (#64748b) on `--color-bg-deepest` (#080d1a) at `0.8rem` yields a contrast ratio of ~4.1:1, below the WCAG AA 4.5:1 threshold for small normal text.  
**Fix:** Change the color to `var(--color-text-on-dark-muted)` to align with the corrected ContactSection notice and ensure accessibility compliance.

**Current:**
```css
.footer-legal {
  font-size: 0.8rem;
  margin-bottom: 0;
  color: var(--color-text-on-dark-dim);
}
```

**Proposed:**
```css
.footer-legal {
  font-size: 0.8rem;
  margin-bottom: 0;
  color: var(--color-text-on-dark-muted);
}
```

---

## 4. Files to Modify

1. `src/components/landing/Footer.vue` — 2 CSS rule adjustments (Fix 1 & Fix 3)
2. `src/components/landing/ContactSection.vue` — 1 CSS rule adjustment (Fix 2)

No new files. No global CSS changes. No structural/component logic changes.

---

## 5. Verification Steps

1. Run the dev server and open the landing page.
2. Scroll to the Contact section and confirm:
   - Form notice text is readable and color matches muted text.
3. Scroll to the Footer and confirm:
   - Nav links wrap cleanly on a 320–375 px wide viewport.
   - Legal disclaimer text is readable and color matches muted text.
4. Run `npm run lint` or equivalent to ensure no style-lint regressions.
5. Confirm no TypeScript or build errors.

---

## 6. Conclusion

Both `ContactSection.vue` and `Footer.vue` are architecturally sound and visually consistent with the established design language. The three fixes above address narrow-viewport overflow and accessibility contrast without altering the component structure or introducing new patterns. After these changes, both components will fully meet the polish requirements.
