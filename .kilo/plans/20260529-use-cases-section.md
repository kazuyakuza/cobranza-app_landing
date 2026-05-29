# Global Plan — TODO-04: Use Cases (Rubros) + Detailed Example

**TODO File**: `.agent/todos/20260521/20260521-todo-2.md`
**Date**: 2026-05-29
**Branch**: `feat/use-cases-section`

## Pre-Implementation Notes

- `UseCasesSection.vue` stub already exists at `src/components/landing/UseCasesSection.vue` with `id="use-cases"`, dark-slate background, and `data-reveal` on the heading
- `App.vue` already imports and renders `<UseCasesSection />` — Task 4 (integration) is pre-completed
- `Navbar.vue` already links "Rubros" → `#use-cases`
- Section background: `--color-bg-slate` (style guide alternation table, position #4)
- All user-visible text from `landing-content.es.md` Section 4 (Ejemplos de Uso)
- Section ID stays `use-cases` (not `sectors` as the TODO template suggests — navbar already wired to `use-cases`)

## Tasks Overview (Pattern C — 5 tasks)

| # | Task | Status |
|---|------|--------|
| 1 | Create Use Cases Section Component | PENDING |
| 2 | Detailed Example (Administración de Expensas) | PENDING |
| 3 | Design & UX | PENDING |
| 4 | Integrate into Main App | PENDING (pre-completed) |
| 5 | Styling & Polish | PENDING |

---

## Step 2: Git Feature Branch Setup

**Sub-agent**: implementer

- Commit any pending changes in working tree
- Checkout `main`, create `feat/use-cases-section`
- Switch to new branch

---

## Step 3: Version Update

**Sub-agent**: implementer

- Bump version in `package.json` from `0.3.0` → `0.4.0` (minor: new section component)
- Commit as `chore: bump version to 0.4.0`

---

## Task 1: Create Use Cases Section Component

### 4.1 Analysis & Planning

**Sub-agent**: architect

Analyze project context and generate detailed implementation plan for replacing the UseCasesSection stub with full content:
- Spanish content from `landing-content.es.md` Section 4
- Main heading: "Ideal para:"
- Bullet list of 5 sectors
- Maintain existing `id="use-cases"` and `--color-bg-slate` background
- Follow existing component patterns (ProblemSection as reference)
- Use `data-reveal` attributes and `useScrollReveal()` composable
- Use `.dark-card` class for any card elements and Bootstrap Icons

Save plan to `.kilo/plans/20260529-use-cases-section.md`.

### 4.2 Implementation

**Sub-agent**: implementer

Implement the UseCasesSection with:
- Title "Ideal para:" as section heading
- Bullet list of 5 sectors from content file
- Bootstrap icons for each sector

### 4.3 Code Review

**Sub-agent**: code-reviewer

Review code for correctness, plan adherence, and code quality.

### 4.4 Documentation

**Sub-agent**: docs-specialist

Add minimal code comments where needed (English).

### 4.5 Verification

**Sub-agent**: implementer

Verify implementation matches plan. Commit unstaged changes.

### 4.6 Task Completion

**Sub-agent**: implementer

Mark Task 1 as `[DONE]` in the TODO file. Commit.

---

## Task 2: Detailed Example (Administración de Expensas)

### 4.1 Analysis & Planning

**Sub-agent**: architect

Plan for adding the detailed example subsection to the existing UseCasesSection:
- Sub-heading: "Administración de Expensas"
- 7 numbered steps from content
- Closing note: "Un flujo similar se aplica a honorarios profesionales, cuotas educativas, alquileres y otros cobros."
- The example should visually stand out from the bullet list (different background, border, or card)

### 4.2 Implementation

**Sub-agent**: implementer

Add the detailed example content to UseCasesSection.vue.

### 4.3 Code Review

**Sub-agent**: code-reviewer

Review code for correctness and plan adherence.

### 4.4 Documentation

**Sub-agent**: docs-specialist

Add/update code comments.

### 4.5 Verification

**Sub-agent**: implementer

Verify implementation. Commit.

### 4.6 Task Completion

**Sub-agent**: implementer

Mark Task 2 as `[DONE]`. Commit.

---

## Task 3: Design & UX

### 4.1 Analysis & Planning

**Sub-agent**: architect

Plan visual presentation:
- Bootstrap cards/icons for the bullet list sectors
- Make the detailed example stand out (different background/border/card)
- Ensure readability on desktop and mobile
- Use `.dark-card` for sectors grid and example card

### 4.2 Implementation

**Sub-agent**: implementer

Apply Bootstrap card grid, icons, and visual treatment.

### 4.3 Code Review

**Sub-agent**: code-reviewer

Review design implementation.

### 4.4 Documentation

**Sub-agent**: docs-specialist

Update comments as needed.

### 4.5 Verification

**Sub-agent**: implementer

Verify visual presentation. Commit.

### 4.6 Task Completion

**Sub-agent**: implementer

Mark Task 3 as `[DONE]`. Commit.

---

## Task 4: Integrate into Main App

### 4.1 Analysis & Planning

**Sub-agent**: architect

Verify integration status:
- `App.vue` already imports and renders `<UseCasesSection />`
- `Navbar.vue` already links "Rubros" → `#use-cases`
- The `id="use-cases"` is already in the component template
- This task is pre-completed; plan is to verify and document

### 4.2 Implementation

**Sub-agent**: implementer

Verify no changes needed. The component is already integrated.

### 4.3 Code Review

**Sub-agent**: code-reviewer

Verify import and rendering are correct.

### 4.4 Documentation

**Sub-agent**: docs-specialist

Minimal — document that integration was pre-existing.

### 4.5 Verification

**Sub-agent**: implementer

Build check. Verify navbar "Rubros" links correctly. Commit if needed.

### 4.6 Task Completion

**Sub-agent**: implementer

Mark Task 4 as `[DONE]`. Commit.

---

## Task 5: Styling & Polish

### 4.1 Analysis & Planning

**Sub-agent**: architect

Plan final polish:
- Consistent design with other sections (ProblemSection patterns)
- Bootstrap Icons
- Spacing and visual hierarchy
- Fully responsive (mobile-first)
- Follow style guide — no hardcoded hex, use CSS variables
- Ensure `.dark-card` usage, `data-reveal` attributes

### 4.2 Implementation

**Sub-agent**: implementer

Apply final styling polish to UseCasesSection.vue.

### 4.3 Code Review

**Sub-agent**: code-reviewer

Final review of all styling.

### 4.4 Documentation

**Sub-agent**: docs-specialist

Final code comments.

### 4.5 Verification

**Sub-agent**: implementer

Build + lint check. Visual verification. Commit.

### 4.6 Task Completion

**Sub-agent**: implementer

Mark Task 5 as `[DONE]`. Commit.

---

## Step 5: TODO File Completion

**Sub-agent**: implementer

- All 5 tasks marked `[DONE]` → rename TODO file with `-DONE` suffix
- Clear state.json history, set `current_todo_file` to `null`
- Merge `feat/use-cases-section` into `main`
- Delete feature branch
- Push `main` to `origin` if remote is set
