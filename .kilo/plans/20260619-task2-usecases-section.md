# Plan — Task 2: Enhance UseCasesSection

- **TODO**: `.agent/todos/20260619/20260619-todo-1.md` → Task "2. Enhance UseCasesSection"
- **Source content**: `.agent/project-info/landing-content.es.md` §4 (Ejemplos de Uso)
- **Critical Workflow step**: 4.1 Analysis & Planning (architect)
- **Target branch**: feature branch created in Step 2 of the Critical Workflow (do NOT create/switch branches here — that is a separate step)

## 1. Task Summary

Replace the current simple use-case card list and the single "Administración de Expensas" walkthrough in `src/components/landing/UseCasesSection.vue` with a richer, two-part structure sourced from `landing-content.es.md` §4:

1. **Rubros grid** — 5 cards, each with an icon + title + 4 bullet sub-items.
2. **"Seleccioná tu caso"** — Bootstrap 5 Tabs with 4 tabs; each tab shows two content blocks: "Situación habitual" (pain) vs "Con Cobranza App" (solution).

Tabs must be fully responsive (horizontal scroll on mobile) and visually clear on the dark theme.

## 2. High-Level Approach

### 2.1 Why split into multiple files

The current `UseCasesSection.vue` is 160 lines and holds inline data. The new structure adds substantially more data (5 rubros × 4 sub-items + 4 tab examples × 2 paragraphs) and notable CSS for dark-theme Bootstrap Tabs and the two-block comparison. Putting everything in one `.vue` file would exceed the project hard limit of **200 lines per source file** (rule: `max-lines-per-file.md`).

Following the established pattern in the codebase (`FeaturesSection` → `src/types/features.ts` + `src/data/features.ts`; `HowItWorksSection` → `src/types/how-it-works.ts`), the plan extracts types and data to dedicated files and splits the tabs into a small presentational sub-component. This keeps every `src/` file under 200 lines, honors modular design (rule 11), and keeps methods tiny.

> Note on scope: a **new** component (`UseCasesTabs.vue`) is created. No **existing** component other than `UseCasesSection.vue` is modified. `App.vue`, `Navbar.vue`, and `Footer.vue` already reference the section id `use-cases` / `UseCasesSection`, which remain unchanged on the section root, so no integration edits are required.

### 2.2 File plan (all under 200 lines)

| File | Action | Purpose |
|---|---|---|
| `src/types/use-cases.ts` | **Create** | `RubroItem` and `UseCaseExample` interfaces |
| `src/data/use-cases.ts` | **Create** | `rubros` (5) + `useCaseExamples` (4) data arrays |
| `src/components/landing/UseCasesTabs.vue` | **Create** | Tabs sub-component (nav + panes + two-block comparison) |
| `src/components/landing/UseCasesSection.vue` | **Rewrite** | Container: rubros grid + render `<UseCasesTabs />` |
| `.agent/project-structure.md` | **No change** | `types/` and `data/` already documented; new component sits in already-documented `components/landing/` |

### 2.3 Bootstrap Tabs strategy

`src/main.ts` already imports `bootstrap/dist/js/bootstrap.bundle.min.js` globally, so the **Bootstrap data-API** (`data-bs-toggle="tab"`) works with zero JavaScript wiring — the same approach used by `FeaturesSection.vue` / `FaqSection.vue` for accordions (`data-bs-toggle="collapse"`). The component only sets the initial active tab/pane via Vue `:class` bindings; Bootstrap handles switching on click.

### 2.4 Scroll reveal strategy

Only `UseCasesSection.vue` calls `useScrollReveal()`. The composable runs in the parent's `onMounted` (which fires after child mount), and `document.querySelectorAll('[data-reveal]')` then finds the child's `[data-reveal]` elements too. Therefore `UseCasesTabs.vue` must **not** call `useScrollReveal()` (avoids double-observing the same nodes).

### 2.5 Visual / design language (consistency)

- Section background stays `--color-bg-slate` (per style-guide §3.1 row 4).
- Rubro cards reuse the global `.dark-card` class (defined in `base.css`) plus a hover lift (`translateY(-4px)` + `--color-primary` border) like the existing use-case cards.
- Sub-item bullets use a `bi-check2` icon in `--color-accent` (emerald) — success/positive signal.
- The two content blocks per tab reuse the **"Antes vs Después" pattern** already established in `SolutionSection.vue`:
  - "Situación habitual" → left border `--color-pain` (red) + `bi-x-circle`.
  - "Con Cobranza App" → left border `--color-accent` (emerald) + `bi-check-circle`.
- Two blocks sit in a `grid-template-columns: 1fr 1fr` on desktop, stacked (`1fr`) on mobile (`max-width: 767.98px`).

## 3. Detailed Steps

### Step 1 — Create `src/types/use-cases.ts`

New file. Self-documenting interfaces; no comments needed.

```ts
export interface RubroItem {
  icon: string
  title: string
  subItems: string[]
}

export interface UseCaseExample {
  tabId: string
  label: string
  beforeText: string
  afterText: string
}
```

~10 lines. ✓

### Step 2 — Create `src/data/use-cases.ts`

New file. Imports the two interfaces and exports `rubros` and `useCaseExamples`. Visible text is neutral Spanish (from `landing-content.es.md` §4). Code identifiers are English. The leading "Situación habitual: " / "Con Cobranza App: " labels are **stripped** from the example texts because the UI renders them as separate headings.

```ts
import type { RubroItem, UseCaseExample } from '@/types/use-cases'

const rubros: RubroItem[] = [
  {
    icon: 'bi-building',
    title: 'Administraciones de consorcios y expensas',
    subItems: [
      'Expensas ordinarias y extraordinarias',
      'Seguimiento de pagos por unidad',
      'Recepción de comprobantes',
      'Conciliación de transferencias'
    ]
  },
  {
    icon: 'bi-house-door',
    title: 'Inmobiliarias y administradores de alquileres',
    subItems: [
      'Alquileres mensuales',
      'Expensas y servicios',
      'Control de vencimientos',
      'Validación de pagos'
    ]
  },
  {
    icon: 'bi-briefcase',
    title: 'Profesionales y monotributistas',
    subItems: [
      'Honorarios',
      'Abonos mensuales',
      'Servicios recurrentes',
      'Seguimiento de cobranzas'
    ]
  },
  {
    icon: 'bi-mortarboard',
    title: 'Colegios, academias, gimnasios y clubes',
    subItems: [
      'Cuotas mensuales',
      'Matrículas',
      'Actividades especiales',
      'Control de morosidad'
    ]
  },
  {
    icon: 'bi-arrow-repeat',
    title: 'Cualquier cobro recurrente o variable',
    subItems: [
      'Cuotas',
      'Membresías',
      'Servicios',
      'Pagos periódicos'
    ]
  }
]

const useCaseExamples: UseCaseExample[] = [
  {
    tabId: 'consorcios',
    label: 'Administración de Consorcios',
    beforeText:
      'Cada mes las expensas cambian. Los propietarios consultan montos, envían comprobantes por WhatsApp y la conciliación se realiza manualmente.',
    afterText:
      'Se cargan las expensas del mes. Cada propietario consulta su saldo. Sube el comprobante de pago. Se carga el extracto bancario. El sistema ayuda a relacionar deudas, comprobantes y transferencias. Se valida el pago y se genera el recibo.'
  },
  {
    tabId: 'inmobiliaria',
    label: 'Inmobiliaria',
    beforeText:
      'Los inquilinos consultan alquileres, expensas y vencimientos por distintos canales. Los comprobantes llegan dispersos y el seguimiento consume tiempo administrativo.',
    afterText:
      'Se cargan alquileres y conceptos asociados. Cada inquilino consulta su deuda actual. Realiza la transferencia y sube el comprobante. El sistema centraliza la información. El administrador valida los pagos desde un único lugar.'
  },
  {
    tabId: 'profesional',
    label: 'Profesional o Estudio',
    beforeText:
      'Los clientes realizan transferencias por honorarios o abonos mensuales y luego envían comprobantes por correo o WhatsApp.',
    afterText:
      'Se generan los importes a cobrar. Los clientes consultan su saldo. Suben el comprobante directamente en la plataforma. El profesional revisa y valida los pagos. Todo queda registrado y disponible para consulta.'
  },
  {
    tabId: 'colegio',
    label: 'Colegio, Academia o Gimnasio',
    beforeText:
      'Las cuotas mensuales generan consultas frecuentes, comprobantes dispersos y seguimiento manual de morosidad.',
    afterText:
      'Se cargan las cuotas del período. Los alumnos o socios consultan sus vencimientos. Suben comprobantes desde el celular. La administración controla pagos y pendientes desde un único panel.'
  }
]

export { rubros, useCaseExamples }
```

~85 lines. ✓ Icons reuse the existing use-case icons for continuity.

### Step 3 — Create `src/components/landing/UseCasesTabs.vue`

New presentational sub-component. Holds the tabs title, Bootstrap nav-tabs, tab-content panes, and the two-block comparison. Does **not** call `useScrollReveal()` (parent covers it). Two tiny helpers generate unique, stable IDs (1-line bodies; ≤2 params; private-by-default via local `function`).

Template (full):

```vue
<script setup lang="ts">
import { useCaseExamples } from '@/data/use-cases'

const tabsTitle = 'Seleccioná tu caso'

function paneId(tabId: string): string {
  return `useCasePane-${tabId}`
}

function tabControlId(tabId: string): string {
  return `useCaseTab-${tabId}`
}
</script>

<template>
  <div data-reveal class="use-cases-tabs">
    <h3 class="use-cases-tabs-title">{{ tabsTitle }}</h3>

    <div class="use-cases-tabs-nav">
      <ul class="nav nav-tabs" role="tablist">
        <li
          v-for="(example, index) in useCaseExamples"
          :key="example.tabId"
          class="nav-item"
          role="presentation"
        >
          <button
            class="nav-link"
            :class="{ active: index === 0 }"
            type="button"
            role="tab"
            data-bs-toggle="tab"
            :data-bs-target="`#${paneId(example.tabId)}`"
            :id="tabControlId(example.tabId)"
            :aria-controls="paneId(example.tabId)"
            :aria-selected="index === 0"
          >
            {{ example.label }}
          </button>
        </li>
      </ul>
    </div>

    <div class="tab-content">
      <div
        v-for="(example, index) in useCaseExamples"
        :key="example.tabId"
        class="tab-pane fade"
        :class="{ 'show active': index === 0 }"
        :id="paneId(example.tabId)"
        role="tabpanel"
        :aria-labelledby="tabControlId(example.tabId)"
      >
        <div class="example-blocks">
          <div class="example-block example-block--habitual">
            <h4 class="example-block-label">
              <i class="bi bi-x-circle" aria-hidden="true"></i>
              Situación habitual
            </h4>
            <p class="example-block-text">{{ example.beforeText }}</p>
          </div>
          <div class="example-block example-block--cobranza">
            <h4 class="example-block-label">
              <i class="bi bi-check-circle" aria-hidden="true"></i>
              Con Cobranza App
            </h4>
            <p class="example-block-text">{{ example.afterText }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
```

Scoped style (dark-theme Bootstrap Tabs + comparison blocks + responsive):

```css
<style scoped>
.use-cases-tabs {
  margin-top: 1rem;
}

.use-cases-tabs-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
  line-height: 1.3;
}

.use-cases-tabs-nav {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin-bottom: 1.5rem;
}

.nav-tabs {
  border-bottom-color: var(--color-border);
  flex-wrap: nowrap;
}

.nav-link {
  color: var(--color-text-on-dark-muted);
  border-color: transparent;
  white-space: nowrap;
  font-weight: 500;
}

.nav-link:hover {
  color: var(--color-text-on-dark);
  border-color: transparent;
  background: var(--color-bg-card);
}

.nav-link.active {
  color: var(--color-text-on-dark);
  background: var(--color-bg-card);
  border-color: var(--color-border);
  border-bottom-color: var(--color-bg-card);
  font-weight: 600;
}

.nav-link:focus {
  box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.5);
}

.tab-content {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-top: none;
  border-radius: 0 0 12px 12px;
  padding: 1.75rem;
}

.example-blocks {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.example-block {
  padding: 1.25rem;
  border-radius: 8px;
  background: var(--color-bg-card-alt);
  border: 1px solid var(--color-border);
}

.example-block--habitual {
  border-left: 3px solid var(--color-pain);
}

.example-block--cobranza {
  border-left: 3px solid var(--color-accent);
}

.example-block-label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
}

.example-block--habitual .example-block-label {
  color: var(--color-pain);
}

.example-block--cobranza .example-block-label {
  color: var(--color-accent);
}

.example-block-text {
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 0;
  color: var(--color-text-on-dark);
}

@media (max-width: 767.98px) {
  .use-cases-tabs-title {
    font-size: 1.25rem;
  }

  .nav-link {
    font-size: 0.9rem;
  }

  .tab-content {
    padding: 1.25rem;
  }

  .example-blocks {
    grid-template-columns: 1fr;
  }
}
</style>
```

Total `UseCasesTabs.vue` ≈ 150–160 lines. ✓ Under 200.

Key responsiveness notes:
- `.use-cases-tabs-nav { overflow-x: auto }` + `.nav-tabs { flex-wrap: nowrap }` + `.nav-link { white-space: nowrap }` → tabs scroll horizontally on narrow screens (keeps the tab affordance, no wrapping/clipping).
- `.example-blocks` collapses to a single column on mobile.

### Step 4 — Rewrite `src/components/landing/UseCasesSection.vue`

Replace the entire file. The old `UseCaseItem` interface, inline `useCases` array, `detailedExampleTitle`, `detailedSteps`, and `closingNote` are **removed** — the new rubros-with-sub-items and the tabs replace that single walkthrough (this is the intended replacement per the task and the updated §4 content; it is not unrelated code removal). The `useScrollReveal()` call stays here (covers both the rubros grid and the child's `[data-reveal]`).

Full new file:

```vue
<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal'
import { rubros } from '@/data/use-cases'
import UseCasesTabs from '@/components/landing/UseCasesTabs.vue'

useScrollReveal()

const rubrosTitle = 'Ideal para:'
</script>

<template>
  <section id="use-cases" class="use-cases-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-9">
          <h2 data-reveal class="use-cases-title">{{ rubrosTitle }}</h2>

          <ul data-reveal class="list-unstyled row g-4 justify-content-center use-cases-grid">
            <li v-for="rubro in rubros" :key="rubro.title" class="col-12 col-md-6 col-lg-4">
              <div class="rubro-card dark-card">
                <div class="rubro-card-header">
                  <i :class="rubro.icon" class="rubro-icon" aria-hidden="true"></i>
                  <h3 class="rubro-title">{{ rubro.title }}</h3>
                </div>
                <ul class="rubro-subitems">
                  <li v-for="subItem in rubro.subItems" :key="subItem" class="rubro-subitem">
                    <i class="bi bi-check2 rubro-subitem-icon" aria-hidden="true"></i>
                    <span>{{ subItem }}</span>
                  </li>
                </ul>
              </div>
            </li>
          </ul>

          <UseCasesTabs />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.use-cases-section {
  background: var(--color-bg-slate);
  color: var(--color-text-on-dark);
}

.use-cases-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.25;
}

.use-cases-grid {
  margin-bottom: 3rem;
}

.rubro-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  transition: transform 0.25s ease, border-color 0.25s ease;
}

.rubro-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-primary);
}

.rubro-card-header {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.rubro-icon {
  font-size: 1.4rem;
  color: var(--color-primary);
  flex-shrink: 0;
  margin-top: 0.15rem;
}

.rubro-title {
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1.35;
  margin-bottom: 0;
}

.rubro-subitems {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.rubro-subitem {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.9375rem;
  line-height: 1.5;
  color: var(--color-text-on-dark-muted);
}

.rubro-subitem-icon {
  color: var(--color-accent);
  flex-shrink: 0;
  margin-top: 0.2rem;
  font-size: 0.85rem;
}

@media (max-width: 767.98px) {
  .use-cases-title {
    font-size: 1.75rem;
  }
}
</style>
```

Total `UseCasesSection.vue` ≈ 135 lines. ✓ Under 200. The section id `use-cases` is preserved on the root `<section>`, so Navbar/Footer anchor links keep working with **no** integration edits.

### Step 5 — Verify line limits & rules (self-check before build)

- `src/types/use-cases.ts` ~10 lines ✓
- `src/data/use-cases.ts` ~85 lines ✓
- `src/components/landing/UseCasesTabs.vue` ~150–160 lines ✓
- `src/components/landing/UseCasesSection.vue` ~135 lines ✓
- Method bodies: `paneId`, `tabControlId` = 1 line each ✓ (≤50)
- Params per function: each helper takes 1 param ✓ (≤2)
- Nesting: template `v-for` loops are sibling iterations rendering flat lists (no 3-level nested conditionals); matches the already-approved `FeaturesSection` nested `v-for` pattern ✓
- No commented-out code; self-documenting names; private local functions ✓

### Step 6 — Type-check, build, lint

From the project root (current branch from Step 2 of the Critical Workflow):

```powershell
npm run build
```

`build` runs `vue-tsc -b && vite build` — this type-checks the new types/data/imports and produces the static bundle. Then:

```powershell
npm run lint
```

(`eslint .`.) Fix any reported issues (e.g., unused imports, prettier formatting) and re-run until both pass.

> There is **no test script** in `package.json` (only `dev`, `build`, `preview`, `lint`), so no unit tests are applicable for this task. Verification = successful `build` + clean `lint`.

### Step 7 — Manual smoke check (optional but recommended)

```powershell
npm run dev
```

Open the local URL, scroll to "Rubros" (`#use-cases`) and confirm:
- 5 rubro cards render with title + 4 green-check sub-items; hover lifts the card.
- "Seleccioná tu caso" shows 4 tabs; first tab active; clicking each tab swaps content without page jump.
- Each tab shows two blocks: red-accented "Situación habitual" and emerald-accented "Con Cobranza App".
- On a narrow viewport, the tab row scrolls horizontally; the two blocks stack vertically.
- Navbar/Footer "Rubros" link still scrolls to this section.

Stop the dev server when done.

### Step 8 — Commit

Stage only the four intended files (no `node_modules/`, no dist). Commit message (matches repo style, English):

```text
feat(use-cases): add rubros sub-items and Bootstrap tabs with situacion vs cobranza examples
```

Files to stage:
- `src/types/use-cases.ts`
- `src/data/use-cases.ts`
- `src/components/landing/UseCasesTabs.vue`
- `src/components/landing/UseCasesSection.vue`

Follow [Gitignore Compliance Rule]: read `.gitignore`, run `git status`, ensure no gitignored paths are staged.

### Step 9 — Documentation update (handled by Step 4.4 docs-specialist, noted here for completeness)

Update `.agent/project-info/context.md` "Recent Changes" with:
- `UseCasesSection.vue` redesigned → rubros grid (title + 4 sub-items each) + new `UseCasesTabs.vue` sub-component with Bootstrap 5 Tabs (4 tabs) and "Situación habitual" vs "Con Cobranza App" two-block comparison.
- New `src/types/use-cases.ts` (`RubroItem`, `UseCaseExample`) and `src/data/use-cases.ts` (`rubros`, `useCaseExamples`).
- Dark-theme tab overrides; responsive horizontal-scroll nav; comparison blocks reuse SolutionSection's pain/accent border pattern.

No changes to `AGENTS.md`, `README.md`, or `style-guide.md` are required (no new CSS variables, no new sections, no new global patterns beyond existing `.dark-card` reuse).

## 4. Code Review Checklist (for Step 4.3)

- [ ] Content matches `landing-content.es.md` §4 exactly (5 rubros + sub-items; 4 tabs + before/after texts; labels stripped of "Situación habitual:" / "Con Cobranza App:" prefixes).
- [ ] No hardcoded hex in components — only CSS variables from `variables.css`.
- [ ] Section background `--color-bg-slate` preserved; section id `use-cases` preserved.
- [ ] Bootstrap Tabs use the data-API (`data-bs-toggle="tab"`); no manual JS tab wiring.
- [ ] First tab/pane initialized with `active` / `show active` + `aria-selected="true"`.
- [ ] ARIA roles present: `tablist`, `tab`, `tabpanel`, `aria-controls`, `aria-labelledby`.
- [ ] `useScrollReveal()` called once (parent only); `[data-reveal]` present on title, rubros grid, and tabs wrapper.
- [ ] All four files ≤ 200 lines; method bodies ≤ 50 lines; ≤ 2 params per function.
- [ ] English code / Spanish visible text; self-documenting; no commented-out code.
- [ ] `npm run build` and `npm run lint` pass clean.
- [ ] No existing component other than `UseCasesSection.vue` was modified; no changes to `App.vue` / `Navbar.vue` / `Footer.vue`.

## 5. Verification Against Original Task

| Requirement (TODO Task 2) | Covered by |
|---|---|
| Update `UseCasesSection.vue` | Step 4 (rewrite) |
| Rubros boxes with title + bullet sub-items (per §4) | Step 2 data + Step 4 template |
| Section "Seleccioná tu caso" with Bootstrap tabs | Step 3 (`UseCasesTabs.vue`) |
| Each tab shows "Situación habitual" vs "Con Cobranza App" | Step 3 template + data (beforeText/afterText) |
| Tabs fully responsive and visually clear | Step 3 CSS (horizontal-scroll nav, stacked blocks on mobile) |
| Clean, professional appearance | Reuses `.dark-card` + SolutionSection pain/accent comparison language |

All requirements satisfied. Plan is ready for approval.
