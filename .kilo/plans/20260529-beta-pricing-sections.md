# Global Plan: Beta Status + Pricing Sections

**TODO File**: `.agent/todos/20260529/20260529-todo-1.md`
**Date**: 2026-05-29
**Tasks**: 5 (Pattern C: `# Title` → `## Tasks` → `### Heading`)

## Context Summary

- **Project**: Cobranza App Landing Page (Vue 3 + TS + Bootstrap 5)
- **Current State**: Hero, Problem, Solution, UseCases, Features, Navbar implemented. BetaSection and PricingSection exist as stubs with correct IDs and backgrounds.
- **App.vue**: Already imports and renders both components (lines 9-10, 26-27). No structural changes needed.
- **Style Guide**: Dark-first palette. Beta = bright primary-blue gradient breaker. Pricing = navy dark.
- **Navbar links**: "Prueba Gratis" → `#beta`, "Precios" → `#pricing`. Both already set.
- **Content Source**: `.agent/project-info/landing-content.es.md` lines 97-123.
- **Language rule**: Code (English), user-visible text (Neutral Spanish).

---

## Sub-Step Sequence

### Step 2: Git Feature Branch Setup → implementer
- Commit any unstaged changes with meaningful message.
- Switch to `main`, create `feat/beta-pricing-sections`, switch to it.

### Step 3: Version Update → implementer
- Bump patch version in `package.json` (current needs inspection).
- Commit as `chore: bump version`.

### Task 1: Create BetaSection.vue → architect (4.1)
Generate implementation plan for filling BetaSection.vue stub with full content from landing-content.es.md.

### Task 1: Create BetaSection.vue → implementer (4.2)
Implement BetaSection.vue per plan.

### Task 1: Code Review → code-reviewer (4.3)
Review BetaSection.vue, generate fix plan if needed.

### Task 1: Documentation → docs-specialist (4.4)
Add minimal code comments.

### Task 1: Verification → implementer (4.5)
Verify plan adherence, commit.

### Task 1: Task Completion → implementer (4.6)
Mark Task 1 `[DONE]` in TODO file, commit.

### Task 2: Create PricingSection.vue → architect (4.1)
Generate implementation plan for filling PricingSection.vue stub.

### Task 2: Create PricingSection.vue → implementer (4.2)
Implement PricingSection.vue per plan.

### Task 2: Code Review → code-reviewer (4.3)
Review PricingSection.vue, generate fix plan if needed.

### Task 2: Documentation → docs-specialist (4.4)
Add minimal code comments.

### Task 2: Verification → implementer (4.5)
Verify plan adherence, commit.

### Task 2: Task Completion → implementer (4.6)
Mark Task 2 `[DONE]` in TODO file, commit.

### Task 3: Design & UX → architect (4.1)
Generate implementation plan for visual polish: green/trust signals for Beta, clear/reassuring for Pricing, responsive refinements.

### Task 3: Design & UX → implementer (4.2)
Apply visual polish per plan.

### Task 3: Code Review → code-reviewer (4.3)
Review styling changes.

### Task 3: Documentation → docs-specialist (4.4)
Add styling comments if needed.

### Task 3: Verification → implementer (4.5)
Verify plan adherence, commit.

### Task 3: Task Completion → implementer (4.6)
Mark Task 3 `[DONE]` in TODO file, commit.

### Task 4: Integrate into Main App → architect (4.1)
Generate plan: verify App.vue already has components, verify `id` attributes exist and match navbar.

### Task 4: Integrate into Main App → implementer (4.2)
Verify integration (no structural changes expected — components already imported and rendered with correct IDs).

### Task 4: Code Review → code-reviewer (4.3)
Review integration.

### Task 4: Documentation → docs-specialist (4.4)
No docs needed for this task.

### Task 4: Verification → implementer (4.5)
Verify plan adherence, commit.

### Task 4: Task Completion → implementer (4.6)
Mark Task 4 `[DONE]` in TODO file, commit.

### Task 5: Styling & Polish → architect (4.1)
Generate plan: responsive layout, visual separation, readability checks.

### Task 5: Styling & Polish → implementer (4.2)
Apply responsive/polish refinements.

### Task 5: Code Review → code-reviewer (4.3)
Review styling polish.

### Task 5: Documentation → docs-specialist (4.4)
Add comments if needed.

### Task 5: Verification → implementer (4.5)
Final verification, commit.

### Task 5: Task Completion → implementer (4.6)
Mark Task 5 `[DONE]` in TODO file, commit.

### Step 5: TODO File Completion → implementer
- Rename TODO file with `-DONE` suffix.
- Clear state.json, set `current_todo_file` to `null`.
- Merge `feat/beta-pricing-sections` to `main`, delete feature branch.
- Push `main` to `origin` if remote set.
