# Global Plan: 20260529-todo-1 — Beta Status + Pricing Sections

**TODO File**: `.agent/todos/20260529/20260529-todo-1.md`  
**Created**: 2026-05-29  
**Project**: Cobranza App Landing Page  
**Format**: Pattern C (`#` → `## Tasks` → `###`)

---

## Task Overview

Five tasks derived from the `## Tasks` → `###` headings:

| # | Task | Scope |
|---|------|-------|
| 1 | Create Beta Status Section Component | Replace BetaSection.vue stub with full component using Spanish content from `landing-content.es.md` §6 |
| 2 | Create Pricing Section Component | Replace PricingSection.vue stub with full component using Spanish content from `landing-content.es.md` §7 |
| 3 | Design & UX | Ensure visual consistency: Beta bright breaker per style guide §3.1, pricing cards clear and reassuring |
| 4 | Integrate into Main App | Verify App.vue has correct `id` attributes (`#beta`, `#pricing`) and components wired properly |
| 5 | Styling & Polish | Final responsive QA, readability check, visual separation, accompanying phrase placement |

---

## Execution Plan

### Step 2: Git Feature Branch Setup
- **Agent**: implementer
- Switch to `main`, create `feat/beta-pricing-sections` branch
- Commit any pending unstaged work before branching

### Step 3: Version Update
- **Agent**: implementer
- Bump patch version in `package.json` (minor feature: two new sections)
- Commit as `chore: bump version to x.y.z`

---

### Task 1: Create Beta Status Section Component

#### 4.1 Analysis & Planning
- **Agent**: architect
- Analyze Spanish content §6 "Etapa Actual" for Beta section
- Review existing component patterns (HeroSection, FeaturesSection, UseCasesSection)
- Review style guide §3.1 — Beta is the sole bright contrast breaker
- Generate detailed implementation plan saved to `.kilo/plans/20260529-beta-section-impl.md`
- Plan covers: template structure, Spanish content mapping, color scheme (emerald/green for positivity), Bootstrap card layout, scroll animations, responsive design
- Present to user for approval

#### 4.2 Implementation
- **Agent**: implementer
- Replace `src/components/landing/BetaSection.vue` stub with full implementation
- Content: title "Estamos en versión Beta", bullet points for beta duration, free access, benefits, feedback
- Accompanying phrase: "Un sistema en constante evolución, que crece junto a vos."
- Style: green/emerald positive tones, bright gradient background per style guide
- Use `useScrollReveal()` + `data-reveal` attributes
- Scoped CSS with CSS variables only
- Commit with meaningful message

#### 4.3 Code Review
- **Agent**: code-reviewer
- Review BetaSection.vue for plan adherence, style guide compliance, Spanish content accuracy
- Generate fix plan if needed; implementer applies fixes (max 3 cycles)

#### 4.4 Documentation
- **Agent**: docs-specialist
- Add minimal code comments (English) where needed
- Update context.md with BetaSection completion

#### 4.5 Verification
- **Agent**: implementer
- Verify plan adherence, check diagnostics, commit unstaged files

#### 4.6 Task Completion
- **Agent**: implementer
- Mark `### 1. Create Beta Status Section Component` with `[DONE]` in TODO file
- Mark sub-items as `[x]`
- Commit

---

### Task 2: Create Pricing Section Component

#### 4.1 Analysis & Planning
- **Agent**: architect
- Analyze Spanish content §7 "Modelo de Precios" for pricing section
- Review style guide §3.1 — Pricing is on `--color-bg-navy`, `.dark-card` pattern for pricing cards
- Review FeaturesSection pattern for icon+text lists
- Generate detailed implementation plan saved to `.kilo/plans/20260529-pricing-section-impl.md`
- Plan covers: pay-per-use explanation, concrete example ($1.000.000 debt / $400.000 reconciled), transparent pricing messaging, card layout, icon choices
- Present to user for approval

#### 4.2 Implementation
- **Agent**: implementer
- Replace `src/components/landing/PricingSection.vue` stub with full implementation
- Content: "Pagás solo por lo que usás", no fixed monthly fee, small percentage on reconciled payments, concrete example, transparent/personalized pricing
- Cards with `.dark-card` class for pricing info blocks
- Use `useScrollReveal()` + `data-reveal` attributes
- Scoped CSS only
- Commit with meaningful message

#### 4.3 Code Review
- **Agent**: code-reviewer
- Review PricingSection.vue for plan adherence, style guide compliance, Spanish content accuracy
- Generate fix plan if needed; implementer applies fixes (max 3 cycles)

#### 4.4 Documentation
- **Agent**: docs-specialist
- Add minimal code comments (English) where needed
- Update context.md with PricingSection completion

#### 4.5 Verification
- **Agent**: implementer
- Verify plan adherence, check diagnostics, commit unstaged files

#### 4.6 Task Completion
- **Agent**: implementer
- Mark `### 2. Create Pricing Section Component` with `[DONE]` in TODO file
- Mark sub-items as `[x]`
- Commit

---

### Task 3: Design & UX

#### 4.1 Analysis & Planning
- **Agent**: architect
- Review both sections against style guide §3, §4, §5
- Analyze visual treatment needed: Beta as green/emerald bright breaker, Pricing as clear reassuring dark section
- Plan visual refinements: trust signals for beta, clarity for pricing
- Generate fix/refinement plan saved to `.kilo/plans/20260529-design-ux-refinements.md`
- Present to user for approval

#### 4.2 Implementation
- **Agent**: implementer
- Apply visual refinements to both BetaSection.vue and PricingSection.vue
- Ensure Beta uses emerald/green positive tones (section background, icon colors, badges)
- Ensure Pricing uses clear, uncluttered layout with highlighted example
- Verify Bootstrap card/box usage is appropriate
- Commit with meaningful message

#### 4.3 Code Review
- **Agent**: code-reviewer
- Review visual design adherence to style guide
- Generate fix plan if needed (max 3 cycles)

#### 4.4 Documentation
- **Agent**: docs-specialist
- Update style guide if new patterns emerged
- Update context.md

#### 4.5 Verification
- **Agent**: implementer
- Verify plan adherence, check diagnostics, commit

#### 4.6 Task Completion
- **Agent**: implementer
- Mark `### 3. Design & UX` with `[DONE]` in TODO file
- Commit

---

### Task 4: Integrate into Main App

#### 4.1 Analysis & Planning
- **Agent**: architect
- Review App.vue current state — BetaSection and PricingSection already imported and placed
- Verify `id` attributes are correct: BetaSection has `id="beta"`, PricingSection has `id="pricing"`
- Navbar already links to `#beta` ("Prueba Gratis") and `#pricing` ("Precios")
- Plan: verify IDs match, ensure section order matches architecture doc
- Generate mini-plan if changes needed, saved to `.kilo/plans/20260529-integration-check.md`
- Present to user for approval (or auto-approve if no changes needed)

#### 4.2 Implementation
- **Agent**: implementer
- Verify App.vue imports and placement of BetaSection and PricingSection
- Verify `id` attributes in component templates match navbar links
- Make corrections if needed
- Commit with meaningful message

#### 4.3 Code Review
- **Agent**: code-reviewer
- Verify integration correctness
- Generate fix plan if needed (max 3 cycles)

#### 4.4 Documentation
- **Agent**: docs-specialist
- Update context.md if integration changes were made

#### 4.5 Verification
- **Agent**: implementer
- Verify all section IDs match navbar links
- Check diagnostics, commit

#### 4.6 Task Completion
- **Agent**: implementer
- Mark `### 4. Integrate into Main App` with `[DONE]` in TODO file
- Commit

---

### Task 5: Styling & Polish

#### 4.1 Analysis & Planning
- **Agent**: architect
- Review all sections for consistent professional design
- Analyze: readability of pricing info, visual separation between sections, responsive behavior
- Check accompanying phrase placement ("Un sistema en constante evolución...") — add to Beta or Pricing if natural fit
- Generate polish plan saved to `.kilo/plans/20260529-styling-polish.md`
- Present to user for approval

#### 4.2 Implementation
- **Agent**: implementer
- Apply final styling polish: spacing, typography, responsive breakpoints
- Ensure excellent readability of pricing information (font sizes, line heights, contrast)
- Add accompanying phrase if natural placement found
- Commit with meaningful message

#### 4.3 Code Review
- **Agent**: code-reviewer
- Review final polish for consistency
- Generate fix plan if needed (max 3 cycles)

#### 4.4 Documentation
- **Agent**: docs-specialist
- Update context.md with final state

#### 4.5 Verification
- **Agent**: implementer
- Full build/lint check, verify diagnostics clean
- Final commit

#### 4.6 Task Completion
- **Agent**: implementer
- Mark `### 5. Styling & Polish` with `[DONE]` in TODO file
- Commit

---

### Step 5: TODO File Completion
- **Agent**: implementer
- All tasks marked `[DONE]` → rename TODO file to `20260529-todo-1-DONE.md`
- Clear state.json: history to `[]`, current_todo_file to `null`, sub_step_status to `"COMPLETED"`
- Merge `feat/beta-pricing-sections` into `main`
- Delete feature branch on success
- Push `main` to `origin` if remote set

---

### Step 6: Continuation
- Remaining TODO files: `20260529-todo-2.md`, `20260529-todo-3.md`
- Proposal for next session: `full read @AGENTS.md & follow /critical-workflow do @.agent/todos/20260529/20260529-todo-2.md`
