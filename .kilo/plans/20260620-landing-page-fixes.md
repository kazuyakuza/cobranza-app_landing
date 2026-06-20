# Global Plan: Landing Page UI Fixes (2026-06-20)

## Source

- TODO File: `.agent/todos/20260620/20260620-todo-0.md`

## Global Pre-Analysis

All 7 reported issues are UI/UX fixes on the Cobranza App landing page. They affect 6 files across text content, SVG diagram, CSS styling, and mobile responsive behavior. The fixes are small in scope, well-localized, and do not introduce new dependencies or architectural changes. To keep the workflow efficient without sacrificing rigor, the 7 line items are grouped into **3 logical tasks** based on affected files and concern areas.

## Git Feature Branch

- Branch name: `feat/landing-ui-fixes-20260620`
- Base: `main`

## Version Update

- If `package.json` exists, bump patch version (e.g., `0.x.y` → `0.x.(y+1)`).
- Commit message: `chore: bump version to x.y.z`

---

## Task 1: Conciliation Diagram Update & Mobile Overflow Fix

**Original TODO items:** 1, 4

**Affected Files:**
- `src/components/landing/ConciliationDiagram.vue`
- `src/components/landing/HowItWorksSection.vue`

### Task 1 Pre-Analysis

The conciliation diagram in step 5 of the HowItWorksSection needs structural and visual improvements. The current flex ancestor chain (`step-row` → `step-content` → `step-card`) has `min-width: auto` by default, which allows the diagram's `min-width: 480px` (mobile) to expand beyond the viewport and break the page layout. Both the graph redesign and the overflow fix must be handled together since they share the same component and container.

### Task 1 Implementation Plan (4.2)

1. **Graph Structure Change**
   - In `ConciliationDiagram.vue`, remove the "Cliente → Deuda" vertical edge.
   - Add a "Cliente → Comprobante" edge (repositioned or newly drawn).
   - Ensure "Deuda" remains connected to the flow (e.g., direct edge to `Match` or repositioned as an independent left-side input).
   - Update `aria-label` text to reflect the new flow.

2. **Visual Improvements**
   - Improve the arrow from "Extracto Bancario" to "Transferencia" (e.g., clearer arrowhead, slightly curved path, or distinct stroke styling).
   - Enhance overall visual polish: consistent node sizing, improved contrast, better spacing.

3. **Mobile Overflow Fix**
   - Add `min-width: 0` to `.step-content` (or `.step-card`) in `HowItWorksSection.vue` to allow flex items to shrink below content width.
   - Ensure `.conciliation-diagram-scroll` has `max-width: 100%` and properly contains the SVG.
   - Keep `overflow-x: auto` on the scroll container so users can pan the graph horizontally without breaking the page.
   - Test on simulated mobile viewport to confirm no horizontal page scroll.

4. **Commit**
   - Commit with meaningful message, e.g. `feat: update conciliation diagram flow and fix mobile overflow`.

---

## Task 2: Content Text, Floating CTA & Comparison Table Sizing

**Original TODO items:** 2, 5, 6

**Affected Files:**
- `src/data/features.ts`
- `src/components/landing/FloatingCta.vue`
- `src/components/landing/SolutionExcelComparison.vue`

### Task 2 Pre-Analysis

Three independent micro-fixes: a text string update, a visibility logic verification, and a mobile font-size reduction. None affect each other and can be implemented in any order.

### Task 2 Implementation Plan (4.2)

1. **Text Update**
   - In `src/data/features.ts`, within `featureGroups` (user group), change `intro` from:
     `"Un portal web simple donde el cliente puede:"`
     to:
     `"Un portal web sencillo de usar, donde:"`

2. **Floating CTA Verification / Fix**
   - Inspect `FloatingCta.vue` logic. The current `IntersectionObserver` with `threshold: 0` hides the button when `#hero` or `#contact` is visible.
   - Verify that on mobile the button is indeed visible in all middle sections and hidden only in Hero and Contact.
   - If edge cases exist (e.g., button flashes on initial load, or remains visible in Footer), adjust:
     - Initialize `isHeroVisible` to `true` (or use a mounted guard) to prevent flash.
     - Optionally add `rootMargin` to make detection more stable.
   - If no code changes are needed, document the verification result.

3. **Mobile Table Font Size**
   - In `SolutionExcelComparison.vue`, under `@media (max-width: 767.98px)`, reduce table cell font size from `0.875rem` to `0.8rem` (or `0.75rem` if still scrolling).
   - Also reduce horizontal padding inside table cells (`th`, `td`) if necessary to eliminate horizontal scroll.

4. **Commit**
   - Commit with meaningful message, e.g. `fix: update feature intro text, verify floating CTA, reduce mobile table font`.

---

## Task 3: Accordion Style Fixes (FAQ & Use Cases)

**Original TODO items:** 3, 7

**Affected Files:**
- `src/components/landing/FaqGroupAccordion.vue`
- `src/components/landing/UseCasesTabs.vue`

### Task 3 Pre-Analysis

Both FAQ and Use Cases mobile accordions suffer from Bootstrap's default `.accordion-button:not(.collapsed)` styles overriding the custom dark-theme colors, resulting in dark-blue text on a blue background. Additionally, the Use Cases mobile accordion body lacks top padding. Both fixes are pure CSS additions.

### Task 3 Implementation Plan (4.2)

1. **FAQ Accordion Open State**
   - In `FaqGroupAccordion.vue`, add explicit `color: var(--color-text-on-dark);` to:
     - `.faq-group-button:not(.collapsed)`
     - `.faq-question-button:not(.collapsed)` (new rule)
   - Ensure `box-shadow: none;` is present on both to remove Bootstrap default focus/active glow if it conflicts.

2. **Use Cases Mobile Accordion Open State**
   - In `UseCasesTabs.vue`, add explicit `color: var(--color-text-on-dark);` to `.use-case-mobile-button:not(.collapsed)`.
   - Add top padding to `.use-case-mobile-body`:
     - Change `padding: 0 1.25rem 1.25rem;` to `padding: 1rem 1.25rem 1.25rem;` (or similar appropriate value).

3. **Commit**
   - Commit with meaningful message, e.g. `fix: accordion open-state text color and padding for FAQ and use cases`.

---

## Execution Schedule

| Step | Task | Sub-agent Type |
|------|------|----------------|
| 2 | Git Feature Branch Setup | implementer |
| 3 | Version Update | implementer |
| 4.1 | Task 1: Analysis & Planning | architect |
| 4.2 | Task 1: Implementation | implementer |
| 4.3 | Task 1: Code Review | code-reviewer |
| 4.3-fix | Task 1: Fix Review Findings | implementer |
| 4.4 | Task 1: Documentation | docs-specialist |
| 4.5 | Task 1: Verification | architect |
| 4.6 | Task 1: Task Completion | implementer |
| 4.1 | Task 2: Analysis & Planning | architect |
| 4.2 | Task 2: Implementation | implementer |
| 4.3 | Task 2: Code Review | code-reviewer |
| 4.3-fix | Task 2: Fix Review Findings | implementer |
| 4.4 | Task 2: Documentation | docs-specialist |
| 4.5 | Task 2: Verification | architect |
| 4.6 | Task 2: Task Completion | implementer |
| 4.1 | Task 3: Analysis & Planning | architect |
| 4.2 | Task 3: Implementation | implementer |
| 4.3 | Task 3: Code Review | code-reviewer |
| 4.3-fix | Task 3: Fix Review Findings | implementer |
| 4.4 | Task 3: Documentation | docs-specialist |
| 4.5 | Task 3: Verification | architect |
| 4.6 | Task 3: Task Completion | implementer |
| 5 | TODO File Completion | implementer |

## Notes

- All changes must preserve the existing dark-theme design system (CSS variables in `variables.css`).
- Mobile testing should use viewport widths ≤ 375px and 767px.
- No new dependencies should be introduced.
