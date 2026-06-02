# Plan: Task 1 — "El problema" section: make the 4 boxes the same size

**Task Source**: `.agent/todos/20260602/20260602-todo-0.md` — Task 1  
**Branch**: `feat/styling-polish-round2`  
**Files Affected**: `src/components/landing/ProblemSection.vue`

---

## 1. Analysis

- `ProblemSection.vue` renders 4 pain-point cards inside a Bootstrap grid (`row` + `col-12 col-md-6`).
- Bootstrap columns in a `.row` are flex items and stretch vertically to the tallest item in the row by default (`align-items: stretch`).
- The `<li>` elements (columns) are therefore already equal height.
- The inner `<div class="pain-point-content dark-card">` does **not** fill the full column height because it lacks an explicit `height` declaration.
- Result: cards visually have different heights depending on text length.

## 2. High-Level Approach

Add Bootstrap's `h-100` utility class to the `.pain-point-content` div so it stretches to 100% of the parent `<li>` column height, making all four cards equal height.

## 3. Detailed Implementation Steps

### Step 4.2 — Implementation (implementer)

1. Open `src/components/landing/ProblemSection.vue`.
2. Locate line 62:
   ```html
   <div class="pain-point-content dark-card">
   ```
3. Append `h-100` to the class list:
   ```html
   <div class="pain-point-content dark-card h-100">
   ```
4. Save the file.

**Rationale**: `h-100` sets `height: 100% !important`. Because the parent `<li class="col-12 col-md-6">` is already stretched to equal height by Bootstrap's flexbox grid, the card div will now fill that entire height. This is the minimal, framework-native fix.

### Step 4.3 — Code Review (code-reviewer)

1. Verify that only the class attribute on line 62 was changed.
2. Confirm no other `.pain-point-content` usages or `.dark-card` rules are negatively affected.
3. Check that `h-100` is available (Bootstrap 5.3.8 is a project dependency — confirmed).

### Step 4.4 — Documentation (docs-specialist)

- No documentation updates required. The change is self-documenting via the Bootstrap class name.

### Step 4.5 — Verification (implementer)

1. Run the dev server or production build to confirm no compile errors:
   ```bash
   npm run build
   ```
2. Visually inspect the "El problema" section at viewport widths ≥ 768px (`md` breakpoint) to confirm the four cards form a 2×2 grid with equal heights in each row.
3. Verify at < 768px that cards still stack vertically and `h-100` does not cause layout issues.

### Step 4.6 — Task Completion (implementer)

1. Stage the change:
   ```bash
   git add src/components/landing/ProblemSection.vue
   ```
2. Commit with a descriptive message:
   ```bash
   git commit -m "fix(problem-section): equalize pain-point card heights with h-100"
   ```
3. In the TODO file `.agent/todos/20260602/20260602-todo-0.md`, append `[DONE]` to Task 1's heading:
   ```markdown
   ## Task 1: "El problema" section — 4 boxes same size [DONE]
   ```
4. Commit the TODO update:
   ```bash
   git commit -m "chore(todo): mark task 1 as done"
   ```

---

## 4. Verification Checklist

- [ ] `ProblemSection.vue` line 62 contains `class="pain-point-content dark-card h-100"`
- [ ] Build passes (`npm run build` succeeds without errors)
- [ ] Visual inspection shows equal card heights in the 2-column layout
- [ ] Change is committed in `feat/styling-polish-round2`
- [ ] TODO file updated with `[DONE]`
