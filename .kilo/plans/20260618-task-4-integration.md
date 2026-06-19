# Plan — Task 4: Integration of HowItWorksSection into the Landing Page

- **Date**: 2026-06-18
- **Workflow**: Critical Workflow — Task 4, Step 4.1 (Analysis & Planning)
- **TODO source**: TODO-09 (Integrate `HowItWorksSection` into the landing page)
- **Plan agent role**: Architect (sub-agent) producing the implementation plan for Step 4.2
- **Scope of THIS plan**: Integration only. Implementation of the App.vue change. Identification (not implementation) of navbar/Hero changes needed for `how-it-works` navigability.
- **Plan file**: `.kilo/plans/20260618-task-4-integration.md`

---

## 1. Task Context & Scope

### 1.1 Requirements from TODO
1. Update `src/App.vue` to include the new `HowItWorksSection` right after `SolutionSection`.
2. Update all navbar links and smooth scrolling to include the new section.
3. Ensure consistent styling across sections.

### 1.2 Explicit Task 4 deliverables (from caller)
- `App.vue`: import `HowItWorksSection`, add `<HowItWorksSection />` between `SolutionSection` and `UseCasesSection`.
- Identify if any other files need updates for smooth scrolling to `how-it-works`.
- Check if `FloatingCta.vue` text needs updating to match new CTA.
- Identify what navbar changes are needed for the `how-it-works` section to be navigable (navbar menu-item **implementation** is primarily Task 5 scope).

### 1.3 Scope decision (in-scope vs deferred)
- **IN-SCOPE for Task 4 Step 4.2 (implementation)**: `src/App.vue` only — add import + render tag.
- **IDENTIFY-ONLY (deferred to Task 5, unless Plan Agent rules otherwise)**: Navbar `menuItems` entry for `how-it-works`; HeroSection "Cómo funciona" CTA retarget.
- **NO CHANGE needed**: `FloatingCta.vue`, `HowItWorksSection.vue`, `useScrollReveal.ts`, styling files.
- **Docs updates (Step 4.4)**: `architecture.md`, `style-guide.md`, `context.md` — listed in Section 9.

---

## 2. Pre-Analysis — Current State Findings

### 2.1 `src/App.vue` (34 lines)
- Imports 13 components in render order: Navbar, HeroSection, ProblemSection, SolutionSection, UseCasesSection, FeaturesSection, BetaSection, PricingSection, FaqSection, ContactSection, Footer, FloatingCta.
- Calls `useScrollReveal()` once at root (line 16).
- Template render order (inside `<main>`): Hero -> Problem -> Solution -> UseCases -> Features -> Beta -> Pricing -> Faq -> Contact.
- **`HowItWorksSection` is NOT imported or rendered.**
- Import convention: imports are ordered to match template render order. New import must follow this convention (after `SolutionSection`, before `UseCasesSection`).

### 2.2 `src/components/landing/HowItWorksSection.vue` (200 lines)
- Already fully implemented (created in TODO-09 Task 1).
- Section id: `id="how-it-works"` (line 45).
- Background: `var(--color-bg-dark)` (line 80) — matches the dark-first palette.
- Uses `useScrollReveal()` (line 2-4) and `data-reveal` attributes (lines 49, 54).
- Self-contained, typed via `src/types/how-it-works.ts` (`HowItWorksStep`, `HowItWorksStepKind`).
- **No changes needed.** Ready to integrate.

### 2.3 `src/components/landing/Navbar.vue` (151 lines)
- `menuItems` array (lines 10-20) has 9 entries with section IDs: `hero`, `problem`, `solution`, `use-cases`, `features`, `beta`, `pricing`, `faq`, `contact`. **No `how-it-works` entry.**
- `scrollToSection(sectionId)` (lines 34-41) is **generic**: it looks up `document.getElementById(sectionId)` and scrolls with `NAVBAR_HEIGHT_PX` offset. It works for ANY section id that exists in the DOM. -> Once `#how-it-works` is rendered by App.vue, smooth-scroll to it works **automatically** provided a link points to it.
- Scroll-spy `IntersectionObserver` (lines 50-68) iterates over `menuItems` and observes each `sectionId`. -> It only tracks sections listed in `menuItems`. Without a `how-it-works` entry, the spy will not highlight it (and there is no nav link for it either — consistent).
- **Conclusion**: No smooth-scroll *mechanism* change is required for Task 4. Rendering the section is enough to make `#how-it-works` a valid scroll target. Making it *navigable* (nav link + spy highlight) requires adding a `menuItems` entry — see Section 7 (Task 5).

### 2.4 `src/components/landing/HeroSection.vue` (119 lines)
- Secondary CTA text: `secondaryCtaText = 'Cómo funciona'` (line 8).
- That CTA calls `scrollToSolution()` (lines 18-24) -> scrolls to `#solution`.
- **Integration finding**: A dedicated "Cómo funciona Cobranza App" section now exists (`#how-it-works`). The hero "Cómo funciona" button semantically should scroll to `#how-it-works` instead of `#solution`. This is part of "smooth scrolling to include the new section". See Section 8 (scope flag).

### 2.5 `src/components/landing/FloatingCta.vue` (85 lines)
- Button text: `"Probar Beta Gratis"` hardcoded in template (line 60).
- Scrolls to `#contact` via `scrollToContact()` (lines 32-38).
- Visibility: hidden when `#hero` or `#contact` is intersecting; visible otherwise (so it remains visible over `#how-it-works` — intended).
- **No "new CTA" is introduced by this integration.** Behavior and target (`contact`) are unchanged and correct.
- **Conclusion: NO change needed for Task 4.** Text is consistent with existing Navbar CTA messaging. Any CTA-text unification is a separate Task 5 concern, not an integration requirement.

### 2.6 Styling consistency
- Section background order after insertion:
  Hero (navy gradient) -> Problem (`--color-bg-dark`) -> Solution (`--color-bg-navy`) -> **HowItWorks (`--color-bg-dark`)** -> UseCases (`--color-bg-slate`) -> Features (`--color-bg-dark`) -> Beta (emerald gradient) -> Pricing (`--color-bg-navy`) -> Faq (`--color-bg-card-alt`) -> Contact (`--color-bg-dark`) -> Footer (`--color-bg-deepest`).
- The insertion produces `navy -> dark -> slate` around the new section — a subtle shade shift consistent with the dark-first alternation rule (style-guide §3.1/§3.2). No new shade introduced.
- `HowItWorksSection` already uses CSS variables, `data-reveal`, `useScrollReveal()`, and inherits section padding from `base.css`. **No styling changes needed.**

### 2.7 Scroll-reveal double-observer (pre-existing, not a concern)
- `App.vue` calls `useScrollReveal()` (queries all `[data-reveal]` globally) AND each section component also calls `useScrollReveal()`. This results in each `[data-reveal]` element being observed by multiple observers. The effect is idempotent (`.is-visible` is added once; `unobserve` cleans up). This is an **existing accepted pattern** across all sections; `HowItWorksSection` already follows it. No change required for Task 4.

### 2.8 Build/lint tooling (from `package.json`)
- `npm run build` -> `vue-tsc -b && vite build` (type-check + production build).
- `npm run lint` -> `eslint .`.
- `npm run dev` -> `vite` (dev server, optional visual check).
- Version: `0.6.6` (version bump handled in Critical Workflow Step 3, not here).

### 2.9 Gitignore compliance (`.gitignore`)
- Gitignored: `node_modules/`, `dist/`, `build/`, `*.tsbuildinfo`, `.env*`, `.vscode/`, `.idea/`, `*.log`, `.kilo/agent-manager.json`.
- Before any commit, the implementer must run `git status` and ensure no gitignored paths are staged; unstage if found. `dist/` will be created by `npm run build` and must NOT be committed.

---

## 3. High-Level Approach

1. Verify git state (on the feature branch created in Critical Workflow Step 2; commit any pending unrelated changes first).
2. Edit `src/App.vue` with two precise, verifiable edits:
   a. Add the `HowItWorksSection` import (keeping imports in render order).
   b. Add `<HowItWorksSection />` in the template between `<SolutionSection />` and `<UseCasesSection />`.
3. Run `npm run lint` (must pass clean).
4. Run `npm run build` (must pass clean; `vue-tsc` type-check + Vite build).
5. Optional visual check via `npm run dev` (confirm section renders between Solution and Use Cases, scroll-reveal animates).
6. Commit the single-file change with a meaningful message.
7. Hand off to Step 4.3 (Code Review).

No other source files are modified in Task 4 Step 4.2. Navbar/Hero changes are identified in Sections 7-8 for Task 5 (or Plan Agent scope decision).

---

## 4. Detailed Implementation Steps (for Step 4.2 — Implementer)

### Step 0 — Git state verification (Implementer)
- Command: `git branch --show-current` -> confirm on the feature branch (e.g., `feat/*` or `fix/*`) created in Critical Workflow Step 2. If on `main`, STOP and escalate to Plan Agent.
- Command: `git status --short` -> if there are unstaged/untracked changes unrelated to this task, commit them first with a meaningful message (per Gitignore Compliance Rule: read `.gitignore`, ensure no `node_modules/`, `dist/`, `*.tsbuildinfo` are staged).
- Do NOT switch branches or merge — branch setup is already done in Step 2.

### Step 1 — Edit `src/App.vue`: add import
- File: `src/App.vue`
- Tool preference: `vscode-mcp-server_replace_lines_code` (structured editor) or `edit`.
- Target: insert one import line after the `SolutionSection` import (current line 6) and before the `UseCasesSection` import (current line 7), preserving render-order convention.

**Exact replacement:**

oldString (lines 6-7):
```
import SolutionSection from '@/components/landing/SolutionSection.vue'
import UseCasesSection from '@/components/landing/UseCasesSection.vue'
```

newString:
```
import SolutionSection from '@/components/landing/SolutionSection.vue'
import HowItWorksSection from '@/components/landing/HowItWorksSection.vue'
import UseCasesSection from '@/components/landing/UseCasesSection.vue'
```

- Verification: the import block now lists `SolutionSection` -> `HowItWorksSection` -> `UseCasesSection` in order.

### Step 2 — Edit `src/App.vue`: add render tag
- File: `src/App.vue`
- Target: insert `<HowItWorksSection />` between `<SolutionSection />` (current line 24) and `<UseCasesSection />` (current line 25) inside `<main>`.

**Exact replacement:**

oldString (lines 24-25):
```
    <SolutionSection />
    <UseCasesSection />
```

newString:
```
    <SolutionSection />
    <HowItWorksSection />
    <UseCasesSection />
```

- Verification: template render order is now `... SolutionSection -> HowItWorksSection -> UseCasesSection ...`.
- After both edits, `App.vue` grows from 34 -> 36 lines (well under the 200-line `max-lines-per-file` rule).

### Step 3 — Lint check
- Command: `npm run lint`
- Expected: exits 0, no errors/warnings. If failures, fix and re-run (do not disable rules).

### Step 4 — Build / type-check
- Command: `npm run build`
- Expected: `vue-tsc -b` passes (no type errors) and `vite build` emits `dist/` successfully.
- Note: `dist/` is gitignored — do NOT stage it.

### Step 5 — Optional visual verification
- Command: `npm run dev` (background process via `background_process` tool, ready pattern `Local:` or port 5173).
- Open the local URL, scroll from Hero -> Problem -> Solution -> **Cómo funciona Cobranza App (new)** -> Use Cases.
- Confirm: section renders with the 7-step timeline; `data-reveal` elements animate on scroll; no layout shift or overlap with the fixed navbar; background shade shifts subtly from Solution (navy) to HowItWorks (dark) to UseCases (slate).
- Stop the dev server after verification.

### Step 6 — Commit
- Command: `git status --short` -> confirm only `src/App.vue` is modified (and not `dist/`, `node_modules/`, `*.tsbuildinfo`).
- Command: `git add src/App.vue`
- Command: `git commit -m "feat(landing): integrate HowItWorksSection after SolutionSection"`
  - (Match repo conventional-commit style; adjust scope prefix if repo history differs — check `git log --oneline -5` first.)
- Do NOT push (push happens at Critical Workflow Step 5, to `origin` only).

### Step 7 — Hand off
- Return summary to Plan Agent: App.vue integrated; lint + build pass; committed. Proceed to Step 4.3 (Code Review).

---

## 5. Verification Matrix (per atomic change)

| Change | File | How to verify | Pass criteria |
|---|---|---|---|
| Import added | `src/App.vue` line ~7 | Read file / `git diff` | `HowItWorksSection` import present, ordered between Solution and UseCases |
| Render tag added | `src/App.vue` line ~25 | Read file / `git diff` | `<HowItWorksSection />` between `<SolutionSection />` and `<UseCasesSection />` |
| Type safety | project | `npm run build` | `vue-tsc -b` exits 0 |
| Lint | project | `npm run lint` | exits 0, no warnings |
| Section in DOM | browser (optional) | `npm run dev`, inspect `#how-it-works` | element exists between `#solution` and `#use-cases` |
| Scroll-reveal | browser (optional) | scroll past section | timeline items animate in |
| Gitignore | repo | `git status` after build | `dist/`, `node_modules/`, `*.tsbuildinfo` NOT staged |

---

## 6. FloatingCta.vue Check — Result

- **Question**: Does `FloatingCta.vue` text need updating to match a new CTA?
- **Answer**: **No.** The integration introduces no new CTA. `FloatingCta` scrolls to `#contact` (unchanged) and shows "Probar Beta Gratis", consistent with Navbar CTA messaging. Its visibility logic (hide on hero/contact) correctly keeps it visible over `#how-it-works`.
- **Action for Task 4**: none.
- **Note for Task 5 (optional)**: if a unified CTA-text pass is desired, it can be addressed there, but there is no functional or integration reason to change it now.

---

## 7. Navbar Changes Needed for `how-it-works` Navigability (IDENTIFY — Task 5 scope)

To make `#how-it-works` navigable from the navbar (link + scroll-spy highlight), Task 5 should add one entry to the `menuItems` array in `src/components/landing/Navbar.vue`:

**Proposed menu item:**
```ts
{ label: 'Cómo funciona', sectionId: 'how-it-works' }
```

**Proposed position** (after `solution`, before `use-cases` — matches visual section order):
```ts
const menuItems: NavMenuItem[] = [
  { label: 'Inicio', sectionId: 'hero' },
  { label: 'El Problema', sectionId: 'problem' },
  { label: 'La Solución', sectionId: 'solution' },
  { label: 'Cómo funciona', sectionId: 'how-it-works' },   // NEW
  { label: 'Rubros', sectionId: 'use-cases' },
  { label: 'Funcionalidades', sectionId: 'features' },
  { label: 'Prueba Gratis', sectionId: 'beta' },
  { label: 'Precios', sectionId: 'pricing' },
  { label: 'Dudas', sectionId: 'faq' },
  { label: 'Contacto', sectionId: 'contact' }
]
```

**Why this single edit is sufficient (no other navbar changes needed):**
- Adding the entry makes a nav link render (template `v-for` over `menuItems`, lines 98-102).
- Clicking it calls `scrollToSection('how-it-works')` — already generic and working once `#how-it-works` is in the DOM (guaranteed by Task 4).
- The scroll-spy observer auto-observes the new `sectionId` because it iterates `menuItems` (lines 62-65), so active-link highlighting works with no extra code.

**Side effect to review in Task 5**: the navbar currently has 9 links + a desktop CTA. Adding a 10th link increases horizontal width; verify it does not overflow on desktop `lg` breakpoint (the collapse hides links below `lg`). If overflow occurs, consider shortening an existing label or dropping a low-priority link — that decision belongs to Task 5.

**Not in Task 4 scope**: per the caller note, navbar menu-item *implementation* is Task 5. Task 4 only renders the section so the target exists.

---

## 8. HeroSection "Cómo funciona" CTA Retarget — SCOPE FLAG (Plan Agent decision)

**Finding**: `HeroSection.vue` secondary CTA is labeled "Cómo funciona" (line 8) but scrolls to `#solution` via `scrollToSolution()` (lines 18-24). With the new dedicated `#how-it-works` section ("Cómo funciona Cobranza App"), this CTA semantically should target `#how-it-works`.

**Recommended change (if scoped in)**:
- Rename/retarget the handler: replace `scrollToSolution` with a `scrollToHowItWorks` function that looks up `document.getElementById('how-it-works')` and scrolls with `NAVBAR_HEIGHT_PX` offset (same pattern as existing handlers).
- Update the template `@click="scrollToSolution"` -> `@click="scrollToHowItWorks"` (line 50).
- Keep `secondaryCtaText = 'Cómo funciona'` unchanged (label already matches).

**Scope ambiguity — escalated to Plan Agent**:
- The TODO requirement says "Update all navbar links and smooth scrolling to include the new section".
- The caller note says "Navbar menu item updates are primarily Task 5 scope" and scopes Task 4 implementation to App.vue only.
- The Hero CTA is **not** a navbar menu item, so it is not clearly covered by the "Task 5" carve-out, yet the caller's explicit Task 4 implementation instruction is App.vue-only.
- **Decision needed from Plan Agent**: include the HeroSection CTA retarget in Task 4, or defer to Task 5 alongside the navbar menu item. This plan defaults to **defer** (Task 4 = App.vue only) unless the Plan Agent rules otherwise.

---

## 9. Documentation Updates (for Step 4.4 — Docs Specialist)

After implementation, update (only if not already current):

1. **`.agent/project-info/architecture.md`** — "Page Structure (DOM Hierarchy)" (lines 59-72): insert `HowItWorksSection` between `SolutionSection` and `UseCasesSection`. Also update the "Root Components" numbered list (lines 30-41) to mention `HowItWorksSection.vue`.
2. **`.agent/project-info/style-guide.md`** — Section 3.1 table (lines 96-108): add a HowItWorks row (background `--color-bg-dark`, text `--color-text-on-dark`), inserted as position 4 between Solution and Use Cases; renumber subsequent rows. Update §3.2 counts if needed.
3. **`.agent/project-info/context.md`** — add a "Recent Changes" entry for the integration and update "Current Work Focus" / "Active Tasks" (mark integration done). This is the critical closing step per project-info instructions.
4. **`.agent/project-structure.md`** — already lists `HowItWorksSection` under `components/landing/` (line 9). **No change needed.**

---

## 10. Verification Step (for Step 4.5 — Architect)

- Confirm `src/App.vue` matches the plan: import present and ordered; `<HowItWorksSection />` rendered between Solution and Use Cases.
- Confirm `npm run lint` and `npm run build` pass.
- Confirm the commit exists and contains only `src/App.vue` (no gitignored artifacts).
- Confirm no out-of-scope files were modified.
- Commit any unstaged files if present (per Critical Workflow).

---

## 11. Out-of-Scope / Deferred

- Navbar `menuItems` addition -> Task 5 (Section 7).
- HeroSection "Cómo funciona" CTA retarget -> Task 5 or Plan Agent decision (Section 8).
- FloatingCta text/behavior change -> none needed (Section 6).
- Style-guide/architecture/context docs -> Step 4.4 (Section 9).
- Version bump -> Critical Workflow Step 3 (already handled separately).
- Push to remote -> Critical Workflow Step 5 (`origin` only).

---

## 12. Rules Compliance Notes

- **max-lines-per-file**: `App.vue` 34 -> 36 lines (limit 200). OK.
- **max-lines-per-method**: no methods added. OK.
- **max-depth / single-section-boolean / max-arguments**: not applicable (no logic added).
- **prefer-private-members / self-documenting-code**: import name `HowItWorksSection` and tag are self-documenting; no comments needed.
- **no-commented-code / newline-prevention**: content uses real newlines; no commented code introduced.
- **gitignore-compliance**: Step 0 and Step 6 enforce `git status` checks; `dist/` from build must not be staged.
- **git-remote-safety**: no push in this step; push deferred to Step 5 (`origin` only).
- **tool-selection-priority**: prefer `vscode-mcp-server_replace_lines_code`/`edit` for the App.vue edits; `bash` reserved for `npm run lint`, `npm run build`, and git commands (run separately, no compound `&`/`&&`/`;` commands — PowerShell dependency chaining uses `; if ($?) {...}`).

---

## 13. Plan Self-Check vs. Original Task

| Requirement | Covered | Where |
|---|---|---|
| App.vue: import HowItWorksSection | Yes | Step 1 (Section 4) |
| App.vue: `<HowItWorksSection />` between Solution and UseCases | Yes | Step 2 (Section 4) |
| Identify other files for smooth scroll to `how-it-works` | Yes | Sections 7 (Navbar) & 8 (Hero) |
| Navbar changes needed for navigability (identify) | Yes | Section 7 |
| Check FloatingCta.vue text vs new CTA | Yes | Section 6 (no change needed) |
| Ensure consistent styling across sections | Yes | Section 2.6 (no change needed; dark-first alternation preserved) |
| Save plan to `.kilo/plans/20260618-task-4-integration.md` | Yes | This file |
| Return plan path and summary | Yes | Returned to caller |

**Status**: Plan complete and verified against the task. Ready for Plan Agent approval and delegation to Step 4.2 (Implementer).
