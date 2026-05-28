# Global Plan: Problem + Solution Sections (20260521-todo-1)

## Objective
Implement the **Problem** and **Solution** sections of the landing page following the approved content and design standards.

---

## Step 1: Task Origin (DONE)
- Read TODO file: `.agent/todos/20260521/20260521-todo-1.md`
- Verified state: `.kilo/state.json` exists, on `main` branch

---

## Step 2: Git Feature Branch Setup
- Run `git status`; commit any unstaged files per gitignore compliance
- Switch to `main`, ensure clean state
- Create and switch to new branch: `feat/problem-solution-sections`
- **Sub-agent**: `implementer`

---

## Step 3: Version Update
- Check `package.json` for version field
- Increment minor version (feature addition)
- Commit as `chore: bump version to x.y.z`
- **Sub-agent**: `implementer`

---

## Task 1: Problem + Solution Sections Implementation

### Task 1 — 4.1: Analysis and Planning
- **Sub-agent**: `architect`
- Analyze existing stubs (`ProblemSection.vue`, `SolutionSection.vue`)
- Review Spanish content from `landing-content.es.md` (sections 2 and 3)
- Study existing design patterns (HeroSection, Navbar, style guide)
- Determine exact component structure, props, content, and styling approach
- Generate detailed implementation plan and save to `.kilo/plans/20260528-problem-solution.md`
- Present plan for approval (auto-approve if user preference; else ask)

### Task 1 — 4.2: Implementation
- **Sub-agent**: `implementer`
- Follow the approved implementation plan:
  1. **Create `ProblemSection.vue`**
     - Title: "¿Cuántas horas por mes dedicás a gestionar cobros y seguimiento de pagos?"
     - Body content with pain points list from `landing-content.es.md`
     - Use Bootstrap cards/icons for visual presentation
     - Emotional/visual contrast to highlight pain points
     - Background: `--color-bg-dark` (per style guide section 3.1)
     - Add `data-reveal` attributes for scroll animations
  2. **Create `SolutionSection.vue`**
     - Title: "Cobranza App simplifica y centraliza todo el proceso de cobranza"
     - Full explanatory text from `landing-content.es.md`
     - Natural continuation after Problem section
     - Highlight benefits and transformation
     - Background: `--color-bg-navy` (per style guide section 3.1)
     - Add `data-reveal` attributes for scroll animations
  3. **Update `App.vue`**
     - Ensure `ProblemSection` and `SolutionSection` are included in correct order with `id="problem"` and `id="solution"`
     - Verify proper spacing between sections
  4. **Styling & Polish**
     - Bootstrap 5 utilities + scoped styles
     - Consistent visual style with Hero/Navbar
     - Good typography hierarchy
     - Mobile-first responsive design
     - Optional: subtle icons using Bootstrap Icons
- Commit with meaningful message after implementation

### Task 1 — 4.3: Code Review
- **Sub-agent**: `code-reviewer`
- Review `ProblemSection.vue`, `SolutionSection.vue`, and `App.vue` changes
- Check for:
  - Correctness against implementation plan
  - Compliance with style guide (colors, typography, spacing)
  - Bootstrap 5 best practices
  - Responsive design
  - No commented-out code
  - Self-documenting code (English variable names, Spanish user text)
  - Scroll reveal integration
- Generate fix plan if needed and save to `.kilo/plans/20260528-problem-solution-fixes.md`

### Task 1 — 4.3-fix: Apply Fixes (if needed)
- **Sub-agent**: `implementer`
- Apply fixes from code review plan
- Commit fix changes

### Task 1 — 4.4: Documentation
- **Sub-agent**: `docs-specialist`
- Add minimal code comments where needed (complex logic only)
- Update `CONTEXT.md` if necessary
- Ensure component files are self-documenting

### Task 1 — 4.5: Verification
- **Sub-agent**: `implementer`
- Check implementation plan adherence
- Run build (`npm run build`) to verify no errors
- Run lint (`npm run lint`) to verify no linting errors
- Verify TypeScript compilation
- Commit any unstaged files

### Task 1 — 4.6: Task Completion
- **Sub-agent**: `implementer`
- Mark task as `[DONE]` in `.agent/todos/20260521/20260521-todo-1.md`
- Update `.kilo/state.json` with completion status
- Commit final changes with meaningful message

---

## Step 5: TODO File Completion
- **Sub-agent**: `implementer`
- Rename TODO file to `20260521-todo-1-DONE.md`
- Ensure all files committed in feature branch
- Merge feature branch to `main`
- Delete feature branch on success
- Push `main` to `origin` only

---

## Step 6: Continuation
- Check for remaining TODO files
- Ask user to proceed with next file if any exist

---

## Acceptance Criteria
- Both sections are visually appealing and match content exactly
- Navbar links correctly scroll to these new sections
- Fully responsive on mobile and desktop
- Consistent design language with previously implemented sections
- No TypeScript or linting errors
- Project builds correctly
