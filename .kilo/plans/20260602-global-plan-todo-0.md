# Global Plan — 20260602-todo-0.md

**TODO File**: `.agent/todos/20260602/20260602-todo-0.md`
**7 tasks** — Line Items format

---

## Pre-Flight: Git Setup

### Step 2: Git Feature Branch Setup => implementer
- Commit any unstaged changes
- Switch to `main`, create branch `feat/styling-polish-round2`
- Switch to new branch

### Step 3: Version Update => implementer
- Bump patch version in `package.json`

---

## Task 1: "El problema" section — 4 boxes same size

**Files**: `src/components/landing/ProblemSection.vue`
**Current issue**: Pain point cards in the 2-column grid have different heights because text length varies.
**Fix**: Add `h-100` to `.pain-point-content` so all cards in the same row stretch to match the tallest.

### 4.1 Analysis & Planning => architect
Research: Bootstrap grid equal-height cards. Plan: add `height: 100%` to `.pain-point-content` and ensure parent `<li>` fills column.

### 4.2 Implementation => implementer
In `ProblemSection.vue`:
- Add `h-100` class to `.pain-point-content` div (line 62): `<div class="pain-point-content dark-card h-100">`
- Ensure `<li>` has flex column behavior via Bootstrap `col-*`

### 4.3 Code Review => code-reviewer
Review for correctness and no regressions.

### 4.4 Documentation => docs-specialist
Minimal — add comment if needed.

### 4.5 Verification => implementer
Verify plan adherence, commit.

### 4.6 Task Completion => implementer
Mark `[DONE]` in TODO file, commit.

---

## Task 2: "Todo esto genera pérdida..." in pain color (red/orange)

**Files**: `src/assets/styles/variables.css`, `src/components/landing/ProblemSection.vue`
**Current issue**: `.problem-closing` uses `--color-accent` (emerald green `#10b981`). Needs a "pain" color.
**Fix**: Add `--color-pain: #ef4444;` (red) to `variables.css`, change `.problem-closing` color to `var(--color-pain)`.

### 4.1 Analysis & Planning => architect
Research: suitable red/orange for dark bg (WCAG contrast). Red `#ef4444` on `--color-text-on-dark` works well. Add variable, update class.

### 4.2 Implementation => implementer
1. `variables.css`: add `--color-pain: #ef4444;` in the interactive colors section.
2. `ProblemSection.vue` line 135: change `color: var(--color-accent);` to `color: var(--color-pain);`

### 4.3 Code Review => code-reviewer

### 4.4 Documentation => docs-specialist

### 4.5 Verification => implementer

### 4.6 Task Completion => implementer

---

## Task 3: "Prueba Gratis" (Beta) section — darker background

**Files**: `src/components/landing/BetaSection.vue`
**Current issue**: Gradient is `linear-gradient(135deg, var(--color-accent), #0d9488)` — bright emerald.
**Fix**: Darken to `linear-gradient(135deg, #0f766e, #134e4a)` — deeper teal/emerald.

### 4.1 Analysis & Planning => architect
The Beta section is the visual "breaker" per style guide. User explicitly wants it darker. Propose `#0f766e → #134e4a` (darker teal tones, still in the emerald family).

### 4.2 Implementation => implementer
`BetaSection.vue` line 58: change gradient.

### 4.3 Code Review => code-reviewer

### 4.4 Documentation => docs-specialist

### 4.5 Verification => implementer

### 4.6 Task Completion => implementer

---

## Task 4: Navbar scroll-spy — "Dudas" section not updating

**Files**: `src/components/landing/Navbar.vue`
**Current issue**: `IntersectionObserver` rootMargin bottom of `-70%` cuts off the bottom 70% of the viewport, so FAQ section at the bottom of the page never enters the top 30% observation zone.
**Fix**: Change rootMargin from `-70px 0px -70% 0px` to `-70px 0px -50% 0px`, making the observation zone the top 50% of the viewport.

### 4.1 Analysis & Planning => architect
Root cause: `-70%` bottom margin means only top 30% of viewport is observed. Near page bottom, FAQ can't reach that zone. Changing to `-50%` (top 50% observed) is minimal and effective. Also consider adjusting threshold to `[0, 0.15]` for smoother transitions.

### 4.2 Implementation => implementer
`Navbar.vue` line 52: change `rootMargin: '-70px 0px -70% 0px'` to `rootMargin: '-70px 0px -50% 0px'`

### 4.3 Code Review => code-reviewer

### 4.4 Documentation => docs-specialist
Update style guide scroll-spy section if needed.

### 4.5 Verification => implementer

### 4.6 Task Completion => implementer

---

## Task 5: "Dudas" (FAQ) section — lighter background

**Files**: `src/components/landing/FaqSection.vue`
**Current issue**: Background `--color-bg-slate` (`#1a2740`) is too dark.
**Fix**: Change to `--color-bg-card-alt` (`#243656`) — the next lighter shade in the palette.

### 4.1 Analysis & Planning => architect
Available lighter shades: `--color-bg-card` (`#1e2d4a`) or `--color-bg-card-alt` (`#243656`). `--color-bg-card-alt` is noticeably lighter while staying in the dark palette family.

### 4.2 Implementation => implementer
`FaqSection.vue` line 105: change `background: var(--color-bg-slate);` to `background: var(--color-bg-card-alt);`

### 4.3 Code Review => code-reviewer

### 4.4 Documentation => docs-specialist
Update style guide section 3.1 table entry for FAQ.

### 4.5 Verification => implementer

### 4.6 Task Completion => implementer

---

## Task 6: Mobile — move CTA btn outside nav menu, text "Probar Beta Gratis"

**Files**: `src/components/landing/Navbar.vue`
**Current issue**: "Quiero probar la Beta gratis" button is inside `.navbar-collapse`, hidden behind hamburger on mobile.
**Fix**: Add a mobile-only CTA button outside the collapse (next to the toggler), hide the desktop CTA on mobile, vice-versa.

### 4.1 Analysis & Planning => architect
Template restructuring:
- Add `const mobileCtaText = 'Probar Beta Gratis'` in script
- After the toggler button, add: `<a class="btn btn-success d-lg-none mobile-cta px-3 py-2 fw-semibold" @click.prevent="scrollToSection('contact')">{{ mobileCtaText }}</a>`
- Change desktop button: add `d-none d-lg-inline-block` classes to hide on mobile
- Style `.mobile-cta` for proper positioning (margin-left: auto, or within flex container)

### 4.2 Implementation => implementer
1. Add `mobileCtaText` constant
2. Add mobile CTA button after toggler, before collapse div
3. Add `d-none d-lg-inline-block` to existing button
4. Add scoped CSS for `.mobile-cta` positioning

### 4.3 Code Review => code-reviewer

### 4.4 Documentation => docs-specialist

### 4.5 Verification => implementer

### 4.6 Task Completion => implementer

---

## Task 7: Google Form iframe — dynamic sizing for mobile

**Files**: `src/components/landing/ContactSection.vue`
**Current issue**: Inline `width="640" height="576"` and `padding-top: 90%` aspect ratio cut off form on mobile.
**Fix**: Remove inline width/height, use `min-height: 800px` and `height: auto` with responsive limits.

### 4.1 Analysis & Planning => architect
Remove `width` and `height` from iframe (CSS handles sizing). Change `.contact-form-wrapper` from `padding-top: 90%` to `min-height: 600px; height: auto`. The iframe is already absolutely positioned to fill the wrapper. On mobile, a minimum height ensures visibility.

### 4.2 Implementation => implementer
1. Remove `width="640" height="576"` from iframe element
2. Change `.contact-form-wrapper` CSS: remove `padding-top: 90%`, add `min-height: 600px; height: auto;`
3. Add `@media (max-width: 767.98px)` with `min-height: 700px;` for mobile

### 4.3 Code Review => code-reviewer

### 4.4 Documentation => docs-specialist

### 4.5 Verification => implementer

### 4.6 Task Completion => implementer

---

## Step 5: TODO File Completion => implementer
- All tasks marked `[DONE]`, rename TODO file with `-DONE` suffix
- Merge feature branch to `main`
- Push `main` to `origin`

---

## Step 6: Continuation
- Check for remaining TODO files in `.agent/todos/`
