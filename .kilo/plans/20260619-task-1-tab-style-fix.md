# Plan — Task 1: Fix UseCasesTabs Selected Tab Style

- **Date:** 2026-06-19
- **TODO task:** Task 1 — Fix UseCasesTabs selected tab style (Rubros section, "Seleccioná tu caso")
- **Step:** 4.1 Analysis & Planning (architect)
- **Target file:** `src/components/landing/UseCasesTabs.vue`
- **Scope:** Single-file, scoped-CSS only. No template/script/logic changes.

## 1. Problem Statement

Inside the "Rubros" section, in the "Seleccioná tu caso" tabs (`UseCasesTabs.vue`), the **active tab** renders with a near-black background and unreadable styling instead of the intended card-colored, connected-to-panel look.

## 2. Root Cause (Verified)

Bootstrap 5.3 `_nav.scss` defines, on the `.nav-tabs` selector, three CSS custom properties that drive the active tab:

- `--bs-nav-tabs-link-active-color: var(--bs-emphasis-color)`
- `--bs-nav-tabs-link-active-bg: var(--bs-body-bg)`
- `--bs-nav-tabs-link-active-border-color: var(--bs-border-color) var(--bs-border-color) var(--bs-nav-tabs-link-active-bg)`

Bootstrap's active rule `.nav-tabs .nav-link.active` (specificity `0,3,0`) consumes those vars:

- `color: var(--bs-nav-tabs-link-active-color)`
- `background-color: var(--bs-nav-tabs-link-active-bg)`
- `border-color: var(--bs-nav-tabs-link-active-border-color)`

Our theme (`src/assets/styles/variables.css:29`) overrides:

- `--bs-body-bg: var(--color-bg-deepest)` → `#080d1a` (near-black)

Therefore the active tab `background-color` resolves to `#080d1a` (near-black) — the bug.

The existing scoped rule `.nav-link.active` (specificity `0,2,0` + scoped attr `[data-v-x]` = `0,3,0`) **ties** with Bootstrap's `.nav-tabs .nav-link.active` (`0,3,0`). Equal specificity makes the winner depend on stylesheet source order (fragile), so the explicit `background`/`color` declarations do not reliably override Bootstrap's variable-driven rule.

## 3. Fix Strategy (Confirmed)

Two complementary, in-scope changes — both inside the existing scoped `<style>` block of `UseCasesTabs.vue`:

1. **Essential — override the Bootstrap nav-tabs CSS variables** on the `.nav-tabs` selector. Our scoped `.nav-tabs[data-v-x]` (`0,2,0`) beats Bootstrap's `.nav-tabs` (`0,1,0`), so our variable definitions win at the declaration site. Custom properties inherit to `.nav-link.active`, and Bootstrap's own active rule then resolves to our theme values. This is the idiomatic Bootstrap theming mechanism.
2. **Hardening — bump specificity** of the existing explicit active rule from `.nav-link.active` to `.nav-tabs .nav-link.active` (`0,3,0` + scoped attr = `0,3,1`), so the explicit `background`/`color`/`border-*` declarations deterministically beat Bootstrap's `0,3,0` regardless of import order.

No template, script, data, or type changes. No new files. No global CSS changes (scoped → affects this component only).

### CSS variables used (all verified present in `src/assets/styles/variables.css`)

- `--color-text-on-dark` = `#e2e8f0` (line 22)
- `--color-bg-card` = `#1e2d4a` (line 10)
- `--color-border` = `#2a3f5f` (line 14)

## 4. Implementation Steps (for 4.2 implementer)

All edits in `src/components/landing/UseCasesTabs.vue`, inside `<style scoped>`.

### Step 4.1 — Edit A: Add variable overrides to `.nav-tabs`

Replace the existing `.nav-tabs` block (current lines 93–96):

```css
.nav-tabs {
  border-bottom-color: var(--color-border);
  flex-wrap: nowrap;
}
```

With:

```css
.nav-tabs {
  --bs-nav-tabs-link-active-color: var(--color-text-on-dark);
  --bs-nav-tabs-link-active-bg: var(--color-bg-card);
  --bs-nav-tabs-link-active-border-color: var(--color-border) var(--color-border) var(--color-bg-card);
  border-bottom-color: var(--color-border);
  flex-wrap: nowrap;
}
```

### Step 4.2 — Edit B: Bump active-rule specificity

Change the selector of the existing active block (current lines 111–117) from `.nav-link.active` to `.nav-tabs .nav-link.active`. Keep all declarations unchanged:

```css
.nav-tabs .nav-link.active {
  color: var(--color-text-on-dark);
  background: var(--color-bg-card);
  border-color: var(--color-border);
  border-bottom-color: var(--color-bg-card);
  font-weight: 600;
}
```

Leave `.nav-link`, `.nav-link:hover`, `.nav-link:focus`, and the mobile media-query rules untouched.

## 5. Verification Steps (for 4.2 implementer / 4.5 verifier)

1. `npm run lint` — must pass (no new lint errors).
2. `npm run build` — `vue-tsc -b && vite build` must succeed (type-check + production build).
3. Manual visual check (`npm run dev`):
   - Navigate to the "Rubros" section, "Seleccioná tu caso".
   - Default active tab (first tab) background = card color `#1e2d4a` (NOT near-black).
   - Active tab text readable (`#e2e8f0`), `font-weight: 600`.
   - Active tab bottom border = `--color-bg-card`, visually connecting to the `.tab-content` panel below (no black gap).
   - Click each other tab; active styling moves correctly; inactive tabs keep muted text and transparent border.
   - Mobile (≤767.98px): horizontal tab scroll still works; active styling correct.
4. `git status` — confirm only `src/components/landing/UseCasesTabs.vue` changed; no stray files staged (Gitignore Compliance Rule).

No unit-test step — project has no test suite (`package.json` scripts: `dev`, `build`, `preview`, `lint` only).

## 6. Git Actions (for 4.2 implementer)

- Work occurs on the feature branch already created in Critical Workflow Step 2.
- Commit message: `fix(UseCasesTabs): override Bootstrap nav-tabs active vars for dark theme`
- Stage only `src/components/landing/UseCasesTabs.vue`.

## 7. Code Review Checklist (for 4.3 code-reviewer)

- [ ] Only `UseCasesTabs.vue` modified; no template/script/data/type changes.
- [ ] Three `--bs-nav-tabs-link-active-*` overrides present inside `.nav-tabs`.
- [ ] Active rule selector is `.nav-tabs .nav-link.active` (specificity hardened).
- [ ] No commented-out code; no magic numbers (all colors via existing CSS vars).
- [ ] File ≤ 200 lines (was 195; +3 lines from Edit A → ~198; Edit B adds 0 net lines).
- [ ] No global/side-effect leakage (scoped style).
- [ ] `npm run lint` and `npm run build` pass.

## 8. Documentation (4.4 docs-specialist scope — NOT part of this plan's code changes)

- Update `.agent/project-info/CONTEXT.md` "Recent Changes" with a one-line note: UseCasesTabs active-tab dark-theme fix via Bootstrap nav-tabs variable overrides + specificity hardening.
- No `style-guide.md` change required (pattern already covered by dark-theme overrides).

## 9. Risk / Side-Effect Analysis

- **Scoped isolation:** Variable overrides apply only within `UseCasesTabs.vue` (scoped `[data-v-x]`). No effect on other `nav-tabs` usages elsewhere (none currently exist; future ones unaffected).
- **Bootstrap import-order independence:** Gained via Edit B — no longer reliant on source order.
- **Border shorthand:** `--bs-nav-tabs-link-active-border-color` 3-value form (top / sides / bottom) matches Bootstrap's expected shape; bottom = `--color-bg-card` connects active tab to the content panel, consistent with the existing `border-bottom-color` declaration.
- **Line budget:** Stays within the 200-line `src/` file cap.

## 10. Task Mapping

- This plan covers TODO Task 1 only (the UseCasesTabs active-tab style fix).
- Subsequent workflow steps (4.2 implementation, 4.3 review, 4.4 docs, 4.5 verification, 4.6 completion) are out of this step's scope.
