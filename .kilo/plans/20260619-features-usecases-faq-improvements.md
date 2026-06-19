# Global Plan: Features Section Improvements + Use Cases Enhancement + Expanded FAQ

## Date
2026-06-19

## Source
- TODO file: `.agent/todos/20260619/20260619-todo-1.md`

## Objective
Improve the Features section with expandable items, significantly enhance the Use Cases / Rubros section with sub-items and tabbed examples, and expand the FAQ section.

---

## Global Pre-Analysis

### Current State

**`src/components/landing/FeaturesSection.vue` (160 lines)**
- Two feature groups (company / client) rendered as static `<ul>` lists inside dark-card columns.
- 6 company features + 4 client features, each with Bootstrap icon and text.
- No interactivity or expansion.

**`src/components/landing/UseCasesSection.vue` (160 lines)**
- Grid of 5 use-case cards with icon + single-line text.
- One detailed example block ("Administración de Expensas") with 7 ordered steps.
- No tabs, no sub-items under rubros.

**`src/components/landing/FaqSection.vue` (184 lines)**
- Bootstrap 5 Accordion with 9 Spanish Q&A pairs.
- Dark theme overrides, scroll reveal animations.
- No category grouping.

**`.agent/project-info/landing-content.es.md` (191 lines)**
- §4: Use Cases — 5 simple bullet rubros, one detailed 7-step example.
- §5: Features — title + subtitle + 2 bullet lists (6 + 4 items).
- §8: FAQ — 9 questions.
- Content does NOT yet include the expanded structure required by the TODO.

**`src/App.vue` (36 lines)**
- Imports and renders all 10 sections in fixed order.
- No conditional rendering or dynamic section loading.

**`src/components/landing/Navbar.vue` (150 lines)**
- 8 menu items mapping to existing section IDs.
- No new section IDs needed (features already has `#features`, use-cases has `#use-cases`, faq has `#faq`).

### Build / Lint / Test
- Scripts: `dev`, `build` (`vue-tsc -b && vite build`), `lint` (`eslint .`).
- No `test` script.
- Verification = `npm run lint` + `npm run build` + visual check.

### Constraints & Rules
- Max 200 lines per source file (`src/`).
- Max 50 lines per method body.
- Max 2 levels nesting; extract at 3rd.
- English code, Spanish visible text.
- Use Bootstrap native components (Accordion, Tabs) where possible.
- Self-documenting code, minimal comments.
- Private members by default.

---

## Execution Structure

Each bullet is a separate `task` tool invocation with the specified `subagent_type`.

- **Step 2**: Git Feature Branch Setup → `implementer`
- **Step 3**: Version Update → `implementer`

### Task 0: Update Spanish Content File
- **Task 0 — 4.1**: Analysis & Planning → `architect`
- **Task 0 — 4.2**: Implementation → `implementer`
- **Task 0 — 4.3**: Code Review → `code-reviewer`; 4.3-fix → `implementer`
- **Task 0 — 4.4**: Documentation → `docs-specialist`
- **Task 0 — 4.5**: Verification → `architect`
- **Task 0 — 4.6**: Task Completion → `implementer`

### Task 1: Improve Features Section
- **Task 1 — 4.1**: Analysis & Planning → `architect`
- **Task 1 — 4.2**: Implementation → `implementer`
- **Task 1 — 4.3**: Code Review → `code-reviewer`; 4.3-fix → `implementer`
- **Task 1 — 4.4**: Documentation → `docs-specialist`
- **Task 1 — 4.5**: Verification → `architect`
- **Task 1 — 4.6**: Task Completion → `implementer`

### Task 2: Enhance UseCasesSection
- **Task 2 — 4.1**: Analysis & Planning → `architect`
- **Task 2 — 4.2**: Implementation → `implementer`
- **Task 2 — 4.3**: Code Review → `code-reviewer`; 4.3-fix → `implementer`
- **Task 2 — 4.4**: Documentation → `docs-specialist`
- **Task 2 — 4.5**: Verification → `architect`
- **Task 2 — 4.6**: Task Completion → `implementer`

### Task 3: Update FAQ Section
- **Task 3 — 4.1**: Analysis & Planning → `architect`
- **Task 3 — 4.2**: Implementation → `implementer`
- **Task 3 — 4.3**: Code Review → `code-reviewer`; 4.3-fix → `implementer`
- **Task 3 — 4.4**: Documentation → `docs-specialist`
- **Task 3 — 4.5**: Verification → `architect`
- **Task 3 — 4.6**: Task Completion → `implementer`

### Task 4: Integration & Polish
- **Task 4 — 4.1**: Analysis & Planning → `architect`
- **Task 4 — 4.2**: Implementation → `implementer`
- **Task 4 — 4.3**: Code Review → `code-reviewer`; 4.3-fix → `implementer`
- **Task 4 — 4.4**: Documentation → `docs-specialist`
- **Task 4 — 4.5**: Verification → `architect`
- **Task 4 — 4.6**: Task Completion → `implementer`

- **Step 5**: TODO File Completion → `implementer`

---

## Per-Task Pre-Analysis

### Task 0: Update Spanish Content File

**Scope**: Update `.agent/project-info/landing-content.es.md` with all new texts specified in the TODO.

**Changes required**:
1. §5 (Features) — replace with new title, subtitle, and both bullet lists (including the new "No necesitan registrarse" item and "Conciliación asistida" detail).
2. §4 (Use Cases) — replace with new structure: 5 rubros each with 4 sub-bullets, plus "Seleccioná tu caso" tab section with 4 tabs and their "Situación habitual / Con Cobranza App" content.
3. §8 (FAQ) — append 8 new Q&A pairs at the end.

**Ambiguities**:
- The FAQ grouping suggestion (Empresa, Clientes, Conciliación) is optional; the plan will leave this decision to Task 3's architect analysis.
- No extra descriptive text per feature is defined; Task 1's architect will decide how to implement "expandable items with extra information."

**Files affected**:
- `.agent/project-info/landing-content.es.md` — edit only.

---

### Task 1: Improve Features Section

**Scope**: Update `src/components/landing/FeaturesSection.vue` to make feature items individually expandable.

**Approach (to be refined in 4.1)**:
- Convert the two static `<ul>` lists into Bootstrap Accordions (one per group, or one overall).
- Each accordion item = one feature; the button shows the icon + text; the body shows extra descriptive text.
- Since the TODO content does not define extra text per feature, the architect must either:
  a) Generate brief elaborations for each feature, or
  b) Use a different expandable pattern (e.g., each group is a collapsible card).
- Keep within 200-line limit; extract types to `src/types/features.ts` if needed.
- Maintain scroll reveal animations.

**Files affected**:
- `src/components/landing/FeaturesSection.vue` — edit.
- Potentially `src/types/features.ts` — create if needed.

---

### Task 2: Enhance UseCasesSection

**Scope**: Rebuild `src/components/landing/UseCasesSection.vue` with rubro sub-items and Bootstrap Tabs.

**Approach (to be refined in 4.1)**:
1. **Rubros grid**: Replace the 5 simple cards with cards that have a title + 4 bullet sub-items each.
2. **Tabs section**: Add a new "Seleccioná tu caso" section below the rubros grid using Bootstrap Tabs (`nav-tabs` + `tab-content`).
3. **Tab content**: Each of the 4 tabs shows two blocks — "Situación habitual" and "Con Cobranza App" — styled as comparison cards or clear visual separation.
4. Responsive: tabs should scroll horizontally on mobile or stack cleanly.
5. Keep within 200-line limit; if the component grows too large, extract the tab data/types to a separate file.

**Files affected**:
- `src/components/landing/UseCasesSection.vue` — major rewrite.
- Potentially `src/types/use-cases.ts` — create if needed.

---

### Task 3: Update FAQ Section

**Scope**: Update `src/components/landing/FaqSection.vue` with 8 new questions.

**Approach (to be refined in 4.1)**:
- Append 8 new Q&A pairs to the existing `faqItems` array (total 17).
- Consider grouping into categories. If grouped, use separate accordion groups per category with category headings, OR keep as one long accordion if it stays usable.
- Ensure the component stays under 200 lines; if not, extract FAQ data to a separate file.
- Maintain dark theme overrides and scroll reveal.

**Files affected**:
- `src/components/landing/FaqSection.vue` — edit.
- Potentially a new data file if extraction is needed.

---

### Task 4: Integration & Polish

**Scope**: Ensure all sections work together, verify responsive design, and check content consistency.

**Approach (to be refined in 4.1)**:
1. Verify `App.vue` does not need new imports or section order changes.
2. Verify `Navbar.vue` does not need new menu items.
3. Check that all new content in components matches the updated `landing-content.es.md`.
4. Run `npm run lint` and `npm run build`.
5. Visual/responsive sanity check: accordions, tabs, and cards must look clean on mobile.
6. If any CSS adjustments are needed for the new components (e.g., tab dark-theme overrides, accordion spacing), apply them in scoped styles.

**Files affected**:
- Potentially `src/App.vue` — verify only.
- Potentially `src/components/landing/Navbar.vue` — verify only.
- Component files from Tasks 1-3 — minor CSS polish if needed.

---

## Git

- Base branch: `main`
- Feature branch: `feat/features-usecases-faq-improvements`

## Version

- Current: `0.7.0`
- New: `0.8.0` (minor bump for new features)

---

## Plan Notes

- Tasks should be executed in order (0 → 1 → 2 → 3 → 4) because Task 0 provides the content source, and Task 4 depends on Tasks 1-3 being complete.
- Before each new task, commit pending changes from the previous task.
- On failures: pause and invoke Ask Agent for user intervention.
