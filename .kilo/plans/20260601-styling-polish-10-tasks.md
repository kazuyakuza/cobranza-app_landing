# Global Plan — TODO-09: Styling Polish (10 Tasks)

**TODO File**: `.agent/todos/20260601/20260601-todo-0.md`
**Date**: 2026-06-01

---

## Step 2: Git Feature Branch Setup
- **Agent**: implementer
- Commit any unstaged work on current branch with meaningful message
- Switch to `main`, create branch `feat/styling-polish-10-tasks`
- Switch to new branch

## Step 3: Version Update
- **Agent**: implementer
- Bump patch version in `package.json`

---

## Task 1: HeroSection — Fix "Cómo funciona" hover text visibility

### 4.1 Analysis & Planning (architect)
- **File**: `src/components/landing/HeroSection.vue`
- **Problem**: `.hero-cta-secondary:hover` sets `background-color: rgba(255, 255, 255, 0.1)` on a `btn-outline-light` button, causing white text on light-tinted background → low contrast.
- **Fix**: Change hover to use `--color-primary` background with white text, or increase background opacity for better contrast. Keep existing transform animation.

### 4.2 Implementation (implementer)
### 4.3 Code Review (code-reviewer, then implementer for fixes)
### 4.4 Documentation (docs-specialist)
### 4.5 Verification (implementer)
### 4.6 Task Completion (implementer) — mark `[DONE]`

---

## Task 2: ProblemSection — Fix 4 boxes icon/text alignment + color closing phrase

### 4.1 Analysis & Planning (architect)
- **File**: `src/components/landing/ProblemSection.vue`
- **Problem A**: `.pain-point-content` uses `align-items: flex-start`. Icon and text are top-aligned, not centered vertically.
- **Fix A**: Change to `align-items: center`, remove `margin-top: 0.15rem` from `.pain-point-icon`.
- **Problem B**: `.problem-closing` has `color: var(--color-text-on-dark)` — no visual emphasis.
- **Fix B**: Add `color: var(--color-accent)` or `color: var(--color-primary)`.

### 4.2 Implementation (implementer)
### 4.3 Code Review (code-reviewer, then implementer for fixes)
### 4.4 Documentation (docs-specialist)
### 4.5 Verification (implementer)
### 4.6 Task Completion (implementer) — mark `[DONE]`

---

## Task 3: Navbar — Highlight current visible section

### 4.1 Analysis & Planning (architect)
- **File**: `src/components/landing/Navbar.vue`
- **Problem**: No active-state indication for which section is currently in view.
- **Approach**: Use `IntersectionObserver` to watch section elements (`#hero`, `#problem`, `#solution`, `#use-cases`, `#features`, `#beta`, `#pricing`, `#faq`, `#contact`). When a section intersects at a threshold, update a reactive `activeSectionId` ref. Apply `.active` class styling (e.g., `color: var(--color-primary)`) to the matching nav link.
- **Detail**: On mount, observe all section IDs. Use `rootMargin: '-70px 0px -70% 0px'` to account for navbar height and trigger when section is in upper portion of viewport. Clean up observer on unmount.

### 4.2 Implementation (implementer)
### 4.3 Code Review (code-reviewer, then implementer for fixes)
### 4.4 Documentation (docs-specialist)
### 4.5 Verification (implementer)
### 4.6 Task Completion (implementer) — mark `[DONE]`

---

## Task 4: SolutionSection — Fix 4 boxes alignment/size + color closing phrase

### 4.1 Analysis & Planning (architect)
- **File**: `src/components/landing/SolutionSection.vue`
- **Problem A**: The 4 feature cards in the grid have different heights because content varies. `.feature-content` needs `height: 100%` to fill the column.
- **Fix A**: Add `height: 100%` to `.feature-content` CSS rule.
- **Problem B**: `.solution-closing` has `color: var(--color-text-on-dark)` — no emphasis.
- **Fix B**: Add `color: var(--color-accent)` or `color: var(--color-primary)`.

### 4.2 Implementation (implementer)
### 4.3 Code Review (code-reviewer, then implementer for fixes)
### 4.4 Documentation (docs-specialist)
### 4.5 Verification (implementer)
### 4.6 Task Completion (implementer) — mark `[DONE]`

---

## Task 5: UseCasesSection — Add hover effect to 5 boxes

### 4.1 Analysis & Planning (architect)
- **File**: `src/components/landing/UseCasesSection.vue`
- **Problem**: The 5 `.use-case-card` elements have no hover effect.
- **Fix**: Add a subtle hover transform (e.g., `translateY(-4px)`) and border-color transition to `.use-case-card`. Use `transition: transform 0.25s ease, border-color 0.25s ease`.

### 4.2 Implementation (implementer)
### 4.3 Code Review (code-reviewer, then implementer for fixes)
### 4.4 Documentation (docs-specialist)
### 4.5 Verification (implementer)
### 4.6 Task Completion (implementer) — mark `[DONE]`

---

## Task 6: FeaturesSection — Equal height for 2 boxes

### 4.1 Analysis & Planning (architect)
- **File**: `src/components/landing/FeaturesSection.vue`
- **Problem**: The two `.feature-group` divs inside `col-md-6` have different heights (company list has 6 items, user list has 4).
- **Fix**: Add `height: 100%` to `.feature-group` or use Bootstrap `h-100` class on the card divs.

### 4.2 Implementation (implementer)
### 4.3 Code Review (code-reviewer, then implementer for fixes)
### 4.4 Documentation (docs-specialist)
### 4.5 Verification (implementer)
### 4.6 Task Completion (implementer) — mark `[DONE]`

---

## Task 7: BetaSection — Restyle section + add color to closing phrase

### 4.1 Analysis & Planning (architect)
- **File**: `src/components/landing/BetaSection.vue`
- **Problem A**: User dislikes the "too lightly blue" background gradient `linear-gradient(135deg, var(--color-primary), var(--color-primary-hover))`.
- **Fix A**: Replace with a deeper, richer gradient. Options:
  - **Option 1 (Recommended)**: Use emerald/accent gradient — `linear-gradient(135deg, var(--color-accent), #0d9488)` to maintain the "trust signal" while being distinct from blue. This keeps the section as a visual breaker but with a warmer tone.
  - **Option 2**: Deepen the blue — `linear-gradient(135deg, #1d4ed8, #1e3a8a)`.
  - **Option 3**: Use navy-to-slate gradient that's still distinct from adjacent sections.
- **Problem B**: `.beta-closing` has `color: var(--color-white)` with `opacity: 0.9`. Needs a distinct color.
- **Fix B**: Add `color: var(--color-accent)` or a gold/warm tone for emphasis.

### 4.2 Implementation (implementer)
### 4.3 Code Review (code-reviewer, then implementer for fixes)
### 4.4 Documentation (docs-specialist)
### 4.5 Verification (implementer)
### 4.6 Task Completion (implementer) — mark `[DONE]`

---

## Task 8: PricingSection & FaqSection — Different backgrounds / visual separation

### 4.1 Analysis & Planning (architect)
- **File**: `src/components/landing/PricingSection.vue`, `src/components/landing/FaqSection.vue`
- **Problem**: Pricing uses `--color-bg-navy` (`#112240`), FAQ uses `--color-bg-slate` (`#1a2740`). These shades are very close (5% luminance difference). Need clearer visual distinction.
- **Fix**: Change Pricing to `--color-bg-dark` (`#0c1528`) which is darker and creates 10% luminance gap with FAQ's slate. Or add a subtle border-top divider to FAQ.

### 4.2 Implementation (implementer)
### 4.3 Code Review (code-reviewer, then implementer for fixes)
### 4.4 Documentation (docs-specialist)
### 4.5 Verification (implementer)
### 4.6 Task Completion (implementer) — mark `[DONE]`

---

## Task 9: FaqSection — Allow multiple accordion items open simultaneously

### 4.1 Analysis & Planning (architect)
- **File**: `src/components/landing/FaqSection.vue`
- **Problem**: The `data-bs-parent="#faqAccordion"` attribute on each collapse causes auto-closing of other items when one opens.
- **Fix**: Remove `:data-bs-parent="'#' + accordionId"` from the `.accordion-collapse` div. Keep the `accordionId` variable for the wrapper `id` but don't enforce parent-child closing behavior.

### 4.2 Implementation (implementer)
### 4.3 Code Review (code-reviewer, then implementer for fixes)
### 4.4 Documentation (docs-specialist)
### 4.5 Verification (implementer)
### 4.6 Task Completion (implementer) — mark `[DONE]`

---

## Task 10: Footer — Add color to closing phrase

### 4.1 Analysis & Planning (architect)
- **File**: `src/components/landing/Footer.vue`
- **Problem**: `.footer-phrase` has `color: var(--color-text-on-dark)` — no visual emphasis.
- **Fix**: Add `color: var(--color-primary)` or `color: var(--color-accent)`.

### 4.2 Implementation (implementer)
### 4.3 Code Review (code-reviewer, then implementer for fixes)
### 4.4 Documentation (docs-specialist)
### 4.5 Verification (implementer)
### 4.6 Task Completion (implementer) — mark `[DONE]`

---

## Step 5: TODO File Completion
- **Agent**: implementer
- Mark all 10 tasks as `[DONE]` in the TODO file
- Rename TODO file with `-DONE` suffix
- Commit all changes in feature branch
- Merge to `main`, delete feature branch
- Push `main` to `origin` (if remote set)

---

## Design Decisions (CONFIRMED)

1. **Task 1 (Hero hover)**: Blue tint on hover — `--color-primary` background with white text
2. **Tasks 2/4/10 (Closing phrases)**: Emerald accent color — `--color-accent` (#10b981)
3. **Task 7 (Beta restyle)**: Emerald gradient — `linear-gradient(135deg, #10b981, #0d9488)`
4. **Task 8 (Pricing/FAQ separation)**: SKIPPED — FAQ background already different in current version
