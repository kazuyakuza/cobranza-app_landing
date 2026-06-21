# Plan — Task 1: FAQ Accordion Expanded-State Contrast Fix

- **Date**: 2026-06-20
- **Workflow step**: 4.1 Analysis & Planning (Critical Workflow)
- **TODO task**: Task 1 — FAQ Accordion Style Fix
- **Target file**: `src/components/landing/FaqGroupAccordion.vue`
- **Change type**: CSS-only (scoped style), single rule edit
- **Plan file**: `.kilo/plans/20260620-task-1-faq-accordion-fix.md`

---

## 1. Root Cause Analysis (Verified)

### Observed defect
When a FAQ **question** accordion item is expanded (selected), its header button text becomes
unreadable: light text (`#e2e8f0`) renders on a light blue background (`#e7f1ff`), giving poor
contrast. The **group** accordion header does NOT exhibit this issue.

### Mechanism
Bootstrap 5 ships a global rule for the expanded accordion button:

```css
/* Bootstrap 5 — global, not scoped */
.accordion-button:not(.collapsed) {
  color: #0c63e4;
  background-color: #e7f1ff;                       /* light blue */
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.125);
}
```

This selector has specificity `(0, 2, 0)` (1 class + 1 pseudo-class from `:not()`).

In `FaqGroupAccordion.vue` the question button base rule sets a dark background:

```css
/* line 148 — base rule, specificity (0,1,0) -> scoped (0,2,0) */
.faq-question-button {
  background: var(--color-bg-card-alt);   /* #243656 dark */
  color: var(--color-text-on-dark);       /* #e2e8f0 light */
  ...
}
```

In the **expanded** state the element (classes `accordion-button faq-question-button`, no
`.collapsed`) matches both Bootstrap's `.accordion-button:not(.collapsed)` and the scoped
`.faq-question-button`. Bootstrap's `background-color: #e7f1ff` wins the cascade for the
expanded state (it is the only rule targeting the expanded state for `background`), overriding
the dark `background` from the base rule. The text `color`, however, is re-asserted to
`--color-text-on-dark` (`#e2e8f0`, light) by the scoped expanded-state rule — see below — so
the text stays light while the background flips to light blue.

### The missing override (lines 156-158)
```css
.faq-question-button:not(.collapsed) {
  color: var(--color-text-on-dark);
}
```

This scoped expanded-state rule re-asserts only `color`. It **omits** the `background` and
`box-shadow` overrides that neutralize Bootstrap's light blue background and inset shadow.

### Proof of established codebase pattern
The correct override already exists in two peer locations, both using the identical triple:

1. **Same file, group button** — `FaqGroupAccordion.vue` lines 114-118:
   ```css
   .faq-group-button:not(.collapsed) {
     background: var(--color-bg-card-alt);
     color: var(--color-text-on-dark);
     box-shadow: none;
   }
   ```
2. **FeaturesSection.vue** lines 146-150:
   ```css
   .accordion-button:not(.collapsed) {
     background: var(--color-bg-card-alt);
     color: var(--color-text-on-dark);
     box-shadow: none;
   }
   ```

The group button is readable when expanded precisely because it has the `background` override;
the question button is unreadable precisely because it lacks it. No global override exists in
`src/assets/styles/variables.css` (verified — it contains only CSS custom properties, no
selector-based accordion rules), so the scoped fix is the codebase-consistent approach.

### Contrast verification (WCAG)
After fix: `--color-text-on-dark` (`#e2e8f0`) on `--color-bg-card-alt` (`#243656`).
This is the exact pairing already used by the collapsed (base) state of the same button and by
both peer components; it satisfies the style guide contrast-compliance rule (#8). No new color
combination is introduced.

---

## 2. High-Level Approach

Mirror the existing `.faq-group-button:not(.collapsed)` override inside the same component for
the question button: add `background: var(--color-bg-card-alt);` and `box-shadow: none;` to the
`.faq-question-button:not(.collapsed)` rule. This is a minimal, atomic, scoped CSS change that:

- Restores the dark background in the expanded state (overrides Bootstrap `#e7f1ff`).
- Removes Bootstrap's inset box-shadow on the expanded button (visual parity with group button).
- Keeps light text on dark background → readable, contrast-compliant.
- Introduces no new selectors, no new files, no hardcoded hex values.

---

## 3. Detailed Implementation Steps (Step 4.2 — implementer)

### 3.1 Pre-flight
- Confirm working on the feature branch created in Critical Workflow Step 2
  (`feat/<descriptive-name>`). Do NOT branch or merge here — branch handling is already done.
- Read `.gitignore` and run `git status` (Gitignore Compliance Rule). Ensure no
  `node_modules/`, `dist/`, or other gitignored artifacts are staged.

### 3.2 The single code change
**File**: `src/components/landing/FaqGroupAccordion.vue`
**Location**: scoped `<style>` block, lines 156-158.

**BEFORE (current — lines 156-158):**
```css
.faq-question-button:not(.collapsed) {
  color: var(--color-text-on-dark);
}
```

**AFTER (target):**
```css
.faq-question-button:not(.collapsed) {
  background: var(--color-bg-card-alt);
  color: var(--color-text-on-dark);
  box-shadow: none;
}
```

**Implementation notes**
- Add `background: var(--color-bg-card-alt);` as the first declaration (matches declaration
  order of the peer `.faq-group-button:not(.collapsed)` rule at lines 114-118 for consistency).
- Add `box-shadow: none;` as the last declaration (matches peer order).
- Keep `color: var(--color-text-on-dark);` in the middle (unchanged, matches peer order).
- Use the `edit` tool (or `vscode-mcp-server_replace_lines_code`) with enough surrounding
  context to uniquely match lines 156-158. The `oldString` must include the rule's closing brace
  and the preceding `color` line to disambiguate from `.faq-group-button:not(.collapsed)`
  (which has the same selector shape but different body).

**Suggested exact edit payload**
- `oldString`:
  ```
  .faq-question-button:not(.collapsed) {
    color: var(--color-text-on-dark);
  }
  ```
- `newString`:
  ```
  .faq-question-button:not(.collapsed) {
    background: var(--color-bg-card-alt);
    color: var(--color-text-on-dark);
    box-shadow: none;
  }
  ```

### 3.3 Post-edit validation (local)
- Re-read lines 148-160 of the file to confirm the edit applied correctly and indentation
  (2-space) is preserved.
- Confirm no other rules were touched (diff should show exactly +2 lines in one rule).

### 3.4 Commit
- Stage only `src/components/landing/FaqGroupAccordion.vue`.
- Verify `git status` shows no gitignored files staged.
- Commit message (conventional commits, repo style):
  `fix: override Bootstrap expanded background on FAQ question accordion button`
  - Body (optional, one line): restore dark `--color-bg-card-alt` background and remove inset
    box-shadow on `.faq-question-button:not(.collapsed)` to fix light-on-light contrast.

---

## 4. Build / Lint / Manual Verification (Step 4.5 — verification)

This is a CSS-only change; no unit-test suite exists yet (per `tech.md` "Testing Strategy
(Future)"). Verification is build + lint + visual.

### 4.1 Type-check / build
- `npm run build` — must succeed with no new warnings/errors. (Vite build compiles SFC scoped
  styles; a syntax error in the CSS would fail the build.)

### 4.2 Lint
- `npm run lint` — must pass with no new warnings/errors.

### 4.3 Diagnostics
- Run VS Code diagnostics on `src/components/landing/FaqGroupAccordion.vue`
  (`vscode-mcp-server_get_diagnostics_code`) — expect 0 errors, 0 warnings.

### 4.4 Manual visual check (dev server)
- Start dev server: `npm run dev` (background process via `background_process` tool).
- Navigate to the FAQ section (`#faq`) in the browser (Playwright snapshot).
- For each FAQ group, expand at least one **question** item and confirm:
  - Expanded question button background is dark (`--color-bg-card-alt`, `#243656`), NOT light
    blue (`#e7f1ff`).
  - Question text is light (`--color-text-on-dark`) and clearly readable.
  - No Bootstrap inset bottom-border shadow is visible on the expanded question button.
  - Collapsed question buttons remain unchanged (dark background, light text).
  - Group accordion header expanded state remains correct (regression check).
- Test at least one mobile viewport width (e.g., resize to 390x844) to confirm the fix holds
  under the `@media (max-width: 767.98px)` responsive rules (those only override font-size and
  padding, so background fix applies equally).
- Stop the dev server after verification.

### 4.5 Acceptance criteria (all must pass)
- [ ] `npm run build` succeeds.
- [ ] `npm run lint` passes.
- [ ] 0 diagnostics on the edited file.
- [ ] Expanded FAQ question button shows dark background with readable light text in browser.
- [ ] No inset shadow on expanded question button.
- [ ] Group accordion and collapsed states visually unchanged (no regression).

---

## 5. Code Review Checklist (Step 4.3 — code-reviewer)

- [ ] Change matches this plan exactly: only `.faq-question-button:not(.collapsed)` edited;
      only `background` and `box-shadow` added; `color` unchanged.
- [ ] No hardcoded hex values — only CSS variables (style guide rule #1).
- [ ] Style is scoped (`<style scoped>`) — not promoted to global (rule #4).
- [ ] Declaration order matches peer `.faq-group-button:not(.collapsed)` rule (consistency).
- [ ] No commented-out code left behind (no-commented-code rule).
- [ ] No unrelated code removed or altered (preserve-existing-code guideline).
- [ ] Max-lines-per-file: file stays well under 200 lines (was 202 total incl. template +
      blank lines; +2 lines -> 204 total, but rule applies to `src/` source lines; CSS block
      remains compact — verify it does not exceed 200 *effective* source lines; if flagged,
      note that template+style combined is the existing size and the +2 is trivial; no split
      required for a 2-line CSS addition).
- [ ] Max-depth / single-section-boolean / max-arguments: N/A (CSS-only change).
- [ ] Commit staged only the target file; no gitignored artifacts staged.

If any item fails, code-reviewer writes a fix plan to
`.kilo/plans/20260620-task-1-faq-accordion-fix-review.md` and Plan Agent reassigns to
implementer (max 3 cycles).

---

## 6. Documentation (Step 4.4 — docs-specialist)

- The code is self-documenting (CSS property names + variable names convey intent); per
  self-documenting-code rule, no code comments are required for this CSS addition.
- **Style guide**: no update needed — the fix follows the already-documented dark-theme
  accordion override pattern; no new variable, color, or pattern is introduced.
- **context.md**: update `.agent/project-info/context.md` "Recent Changes" with a one-line
  entry (e.g., "2026-06-20: FaqGroupAccordion — added `background`/`box-shadow` override to
  `.faq-question-button:not(.collapsed)` to fix expanded-state light-on-light contrast
  (Bootstrap `#e7f1ff` override); self-documenting CSS, no comments needed"). This is the
  mandatory closing step per project-info instructions.
- **README**: no change (no user-facing/deployment behavior change).

---

## 7. Task Completion (Step 4.6 — implementer)

- Mark Task 1 as `[DONE]` in the TODO file per the line-item / section format used there
  (append `[DONE]` to the task entry; mark any `[]` sub-items as `[x]`). Preserve all other
  TODO file content.
- Commit the TODO file update with message:
  `docs: mark Task 1 (FAQ accordion contrast fix) [DONE]`.

---

## 8. Risks & Edge Cases

- **Specificity regression**: if a future global `.accordion-button:not(.collapsed)` override
  is added to `variables.css` or `base.css` with higher specificity, it could re-introduce the
  conflict. Mitigation: keep FAQ overrides scoped in the component (current pattern); the
  scoped `[data-v-*]` attribute keeps specificity competitive. Out of scope for this task.
- **Bootstrap version upgrade**: a future Bootstrap 5.x change to the expanded accordion
  background token (`--bs-accordion-active-bg`) could alter behavior. Mitigation: if upgrading,
  prefer overriding `--bs-accordion-active-bg` globally in `variables.css`. Not required now.
- **Other accordion components**: `FeaturesSection.vue` and `UseCasesTabs.vue` also use
  `accordion-button`. `FeaturesSection.vue` already has the correct override (verified).
  `UseCasesTabs.vue` uses `use-case-mobile-button` (mobile-only accordion, line 74) — out of
  scope for this task; flagged for the orchestrator, NOT to be touched here (sub-agent scope
  boundary).

---

## 9. Out of Scope (explicit)

- No changes to `FeaturesSection.vue`, `UseCasesTabs.vue`, `variables.css`, or `base.css`.
- No global Bootstrap variable overrides (`--bs-accordion-*`).
- No refactoring, no new files, no new CSS files (style guide rule #5).
- No git branch/merge operations (handled in Critical Workflow Steps 2 & 5).
- No touching of other TODO tasks or the global plan.

---

## 10. Files Touched

| File | Change | Lines |
|---|---|---|
| `src/components/landing/FaqGroupAccordion.vue` | Add `background` + `box-shadow` to `.faq-question-button:not(.collapsed)` | 156-158 -> 156-160 (+2) |
| `.agent/project-info/context.md` | Append recent-change entry | end of "Recent Changes" list |
| `.agent/todos/<file>` | Mark Task 1 `[DONE]` | Task 1 line |

---

## 11. Summary

- **Root cause**: `.faq-question-button:not(.collapsed)` (lines 156-158) re-asserts only
  `color`; Bootstrap's `.accordion-button:not(.collapsed)` injects `background-color: #e7f1ff`
  in the expanded state, which overrides the dark base `background`, leaving light text on a
  light background.
- **Fix**: add `background: var(--color-bg-card-alt);` and `box-shadow: none;` to that rule,
  exactly mirroring the existing `.faq-group-button:not(.collapsed)` override (lines 114-118)
  and `FeaturesSection.vue` (lines 146-150).
- **Scope**: one scoped CSS rule, two added declarations, single file (+context.md + TODO
  marker). No new files, no hardcoded hex, contrast-compliant, regression-safe.
