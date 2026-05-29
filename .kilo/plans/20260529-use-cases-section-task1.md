# Implementation Plan — Task 1: Create Use Cases Section Component

**Date**: 2026-05-29  
**Task**: Task 1 from `.agent/todos/20260521/20260521-todo-2.md`  
**Branch**: `feat/use-cases-section`  
**Target File**: `src/components/landing/UseCasesSection.vue`

---

## 1. Current State

- `UseCasesSection.vue` exists as a 14-line stub with `id="use-cases"`, `--color-bg-slate` background, and a placeholder `<h2 data-reveal>Rubros</h2>`.
- `App.vue` already imports and renders `<UseCasesSection />`; no integration work needed.
- `Navbar.vue` links "Rubros" → `#use-cases`; no navigation work needed.
- Reference pattern: `ProblemSection.vue` — content constants, `useScrollReveal()`, `data-reveal`, `.dark-card`, Bootstrap Icons, scoped CSS, responsive breakpoints.

---

## 2. High-Level Approach

Replace the stub with a full section that presents the 5 target sectors as icon cards in a responsive Bootstrap grid. Follow the `ProblemSection.vue` pattern exactly: content constants in `<script setup>`, `useScrollReveal()` composable, `data-reveal` attributes, `.dark-card` class, Bootstrap Icons, scoped CSS with CSS variables only, mobile-first responsive layout.

Leave structural room below the sector grid for the Task 2 detailed example ("Administración de Expensas") to be inserted later without refactoring the template layout.

---

## 3. Detailed Implementation Steps

### Step 3.1 — Script Section

Replace the empty `<script setup lang="ts">` with:

1. Import `useScrollReveal` from `@/composables/useScrollReveal` and call it.
2. Define `sectionTitle` constant: `'Ideal para:'`
3. Define `UseCaseItem` interface with `icon: string` and `text: string`.
4. Define `useCases` array with 5 items (see Icon Mapping table below).

### Step 3.2 — Template Structure

Use the standard section pattern:

```html
<section id="use-cases" class="use-cases-section">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-10 col-lg-9">
        <!-- Title -->
        <h2 data-reveal class="use-cases-title">{{ sectionTitle }}</h2>

        <!-- Sector cards grid -->
        <div data-reveal class="use-cases-grid">
          <ul class="list-unstyled row g-4 justify-content-center">
            <li
              v-for="item in useCases"
              :key="item.text"
              class="col-12 col-md-6 col-lg-4"
            >
              <div class="use-case-card dark-card">
                <i :class="item.icon" class="use-case-icon" aria-hidden="true"></i>
                <span class="use-case-text">{{ item.text }}</span>
              </div>
            </li>
          </ul>
        </div>

        <!-- Reserved area for Task 2 detailed example -->
      </div>
    </div>
  </div>
</section>
```

Key layout decisions:
- `col-12 col-md-6 col-lg-4` → 1 col mobile, 2 cols tablet, 3 cols desktop. First 3 fill row 1; last 2 center in row 2 via `justify-content-center` on the row.
- Each sector is a `.dark-card` with an icon + text flex layout.
- `data-reveal` on the `<h2>` and on the grid wrapper (not each individual card) to keep animation simple and consistent with `ProblemSection`.

### Step 3.3 — Scoped CSS

Define the following scoped styles (no hardcoded hex values):

| Selector | Properties |
|---|---|
| `.use-cases-section` | `background: var(--color-bg-slate); color: var(--color-text-on-dark);` |
| `.use-cases-title` | `font-size: 2.25rem; font-weight: 700; margin-bottom: 2.5rem; line-height: 1.25; text-align: center;` |
| `.use-cases-grid` | `margin-bottom: 2.5rem;` |
| `.use-case-card` | `display: flex; align-items: flex-start; gap: 1rem; height: 100%;` |
| `.use-case-icon` | `font-size: 1.5rem; color: var(--color-text-on-dark-dim); flex-shrink: 0; margin-top: 0.15rem;` |
| `.use-case-text` | `font-size: 1rem; line-height: 1.55; font-weight: 500;` |
| `@media (max-width: 767.98px)` `.use-cases-title` | `font-size: 1.75rem;` |

### Step 3.4 — Bootstrap Icon Mapping

| Sector | Bootstrap Icon | Rationale |
|---|---|---|
| Administraciones de consorcios y expensas | `bi-building` | Buildings / property management |
| Inmobiliarias y administradores de alquileres | `bi-house-door` | Real estate / rental |
| Profesionales y monotributistas | `bi-briefcase` | Professional services |
| Colegios, academias, gimnasios y clubes | `bi-mortarboard` | Education / institutions |
| Cualquier cobro recurrente o variable | `bi-arrow-repeat` | Recurring / cyclic payments |

---

## 4. Style Guide Compliance Checklist

- [ ] Background uses `var(--color-bg-slate)` (Section 4 in alternation table)
- [ ] Text color uses `var(--color-text-on-dark)`
- [ ] Section title: `2.25rem`, weight `700`
- [ ] Cards use `.dark-card` class (no shadow, border + bg contrast)
- [ ] Icons are Bootstrap Icons (`bi-*`)
- [ ] `data-reveal` on heading and key content wrapper
- [ ] `useScrollReveal()` imported and called in script
- [ ] No hardcoded hex values anywhere
- [ ] Responsive: mobile-first (`col-12` base, `col-md-6`, `col-lg-4`)
- [ ] Scoped styles only (`<style scoped>`)
- [ ] Content constants defined in script (English variables, Spanish text)
- [ ] Section pattern: `<section><div class="container"><div class="row">...</div></div></section>`

---

## 5. File Size Considerations

After Task 1, the component should be ~70–85 lines, well under the 200-line limit.  
After Task 2 inserts the detailed example (~+40 lines), the file will be ~110–125 lines, still compliant.  
If Task 3–5 additions push the file beyond 200 lines, extract the detailed example into a child component `UseCasesDetailedExample.vue`.

---

## 6. Acceptance Criteria (Task 1)

- [ ] Section displays "Ideal para:" as the centered `<h2>` heading
- [ ] All 5 sectors appear as cards with correct Bootstrap Icons
- [ ] Cards are responsive: stacked on mobile, 2-up on tablet, 3-up on desktop
- [ ] `data-reveal` scroll animation works on heading and card grid
- [ ] No TypeScript or lint errors
- [ ] No hardcoded hex values; all colors via CSS variables
- [ ] Scoped styles only; no global style leakage
