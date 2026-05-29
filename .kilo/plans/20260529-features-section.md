# Global Plan: Features Section (TODO-05)

**TODO File**: `.agent/todos/20260529/20260529-todo-0.md`
**Date**: 2026-05-29
**Pattern**: Pattern C — 5 tasks under `## Tasks` → `###` headings

---

## Step 2: Git Feature Branch Setup

- **Subagent**: `implementer`
- **Scope**: Commit any unstaged changes, checkout `main`, create `feat/features-section`, switch to it
- **Expected Output**: Clean working tree on new `feat/features-section` branch

---

## Step 3: Version Update

- **Subagent**: `implementer`
- **Scope**: Read `package.json`, bump patch version (implementation-only change), commit as `chore: bump version`
- **Expected Output**: Version incremented, committed

---

## Task 1: 4.1 Analysis & Planning — Create Features Section Component

- **Subagent**: `architect`
- **Description**: Generate detailed implementation plan for creating the FeaturesSection.vue component shell
- **Context**: File already exists as stub (`src/components/landing/FeaturesSection.vue`). Must expand it following project patterns (UseCasesSection as reference).
- **Plan specifics**:
  - `<script setup lang="ts">` with `useScrollReveal()`
  - Section title: "Cómo te ayuda Cobranza App"
  - Template skeleton with `<section id="features">`, `.container`, `.row`
  - Placeholder columns for Company vs End User content
  - `<style scoped>` with `background: var(--color-bg-dark)` (already present)
- **Save plan to**: `.kilo/plans/20260529-features-section-task1.md`

### 4.2 Implementation

- **Subagent**: `implementer`
- **Scope**: Implement the component shell per plan, ensure build passes

### 4.3 Code Review

- **Subagent**: `code-reviewer` then `implementer` (if fixes needed)
- **Max cycles**: 3

### 4.4 Documentation

- **Subagent**: `docs-specialist`
- **Scope**: Add minimal code comments

### 4.5 Verification

- **Subagent**: `implementer`
- **Scope**: Verify plan adherence, commit

### 4.6 Task Completion

- **Subagent**: `implementer`
- **Scope**: Mark task 1 `[DONE]` in TODO file, commit

---

## Task 2: 4.1 Analysis & Planning — Split Content into Two Columns / Areas

- **Subagent**: `architect`
- **Description**: Plan the two-column layout with Spanish content from `landing-content.es.md` §5
- **Content**:
  - **Left column (Company/Professional)**: 6 items with icons
  - **Right column (End User/Cliente Final)**: 4 items with icons
- **Layout**: Bootstrap grid: `col-lg-6` each side, stacked on mobile
- **Data structure**: Two typed arrays for company features and user features
- **Icons**: Bootstrap Icons matching each feature intent
- **Save plan to**: `.kilo/plans/20260529-features-section-task2.md`

### 4.2 Implementation

- **Subagent**: `implementer`
- **Scope**: Add typed data arrays, two-column grid markup, loop rendering

### 4.3 Code Review

- **Subagent**: `code-reviewer` then `implementer` (if fixes needed)

### 4.4 Documentation

- **Subagent**: `docs-specialist`

### 4.5 Verification

- **Subagent**: `implementer`

### 4.6 Task Completion

- **Subagent**: `implementer`

---

## Task 3: 4.1 Analysis & Planning — Design & Presentation

- **Subagent**: `architect`
- **Description**: Plan visual presentation — icons, card styling, Bootstrap Icons usage, two distinct columns with clear visual separation
- **Design**: Each feature as an icon + text row. Company column could have a subtle left border accent. User column similar but distinct (e.g., different border color or card variant).
- **Styling**: `.dark-card` or variant, Bootstrap Icons inline with text, responsive stacking
- **Save plan to**: `.kilo/plans/20260529-features-section-task3.md`

### 4.2 Implementation

- **Subagent**: `implementer`

### 4.3 Code Review

- **Subagent**: `code-reviewer` then `implementer`

### 4.4 Documentation

- **Subagent**: `docs-specialist`

### 4.5 Verification

- **Subagent**: `implementer`

### 4.6 Task Completion

- **Subagent**: `implementer`

---

## Task 4: 4.1 Analysis & Planning — Integrate into Main App

- **Subagent**: `architect`
- **Description**: Verify/update integration. FeaturesSection already imported and placed in App.vue with correct `id="features"`. Navbar already links to `#features`. This task is largely verification — confirm everything is wired correctly.
- **Save plan to**: `.kilo/plans/20260529-features-section-task4.md`

### 4.2 Implementation

- **Subagent**: `implementer`
- **Scope**: Verify App.vue import and placement, verify Navbar link, no structural changes needed if correct

### 4.3 Code Review

- **Subagent**: `code-reviewer` then `implementer`

### 4.4 Documentation

- **Subagent**: `docs-specialist`

### 4.5 Verification

- **Subagent**: `implementer`

### 4.6 Task Completion

- **Subagent**: `implementer`

---

## Task 5: 4.1 Analysis & Planning — Styling & Polish

- **Subagent**: `architect`
- **Description**: Plan mobile responsiveness polish, visual consistency review, spacing/typography adjustments
- **Checklist**: Mobile stacking, font sizes, spacing consistency with UseCasesSection, dark card consistency, scroll reveal on elements, hover effects
- **Save plan to**: `.kilo/plans/20260529-features-section-task5.md`

### 4.2 Implementation

- **Subagent**: `implementer`

### 4.3 Code Review

- **Subagent**: `code-reviewer` then `implementer`

### 4.4 Documentation

- **Subagent**: `docs-specialist`

### 4.5 Verification

- **Subagent**: `implementer`

### 4.6 Task Completion

- **Subagent**: `implementer`

---

## Step 5: TODO File Completion

- **Subagent**: `implementer`
- **Scope**: Rename TODO file with `-DONE` suffix, switch to `main`, merge `feat/features-section`, delete feature branch, push `main` to `origin`

---

## Step 6: Continuation

- Check remaining TODO files in `.agent/todos/20260529/`
- If any exist, prompt user to proceed in new chat

---

## Design Constraints (for all tasks)

- **Code**: English (component names, variables, comments)
- **Content**: Neutral Spanish (user-visible text)
- **CSS**: Use CSS variables only, never hardcode hex
- **Background**: `var(--color-bg-dark)` per section alternation table
- **Cards**: Use `.dark-card` class from `base.css`
- **Scroll Animation**: `useScrollReveal()` composable + `data-reveal` attributes
- **Bootstrap Icons**: `bi bi-*` classes (loaded via CDN in `index.html`)
- **Max lines per file**: ≤200 (src/)
- **Max method lines**: ≤50
- **Max depth**: ≤2 nesting levels
- **Max method params**: ≤2
- **Prefer private members**: everything private unless intentionally exposed
