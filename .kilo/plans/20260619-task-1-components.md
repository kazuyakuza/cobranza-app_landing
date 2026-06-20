# Plan — TODO-12 Task 1: Update Relevant Components

- **Source TODO:** `.agent/todos/20260619/20260619-todo-3.md` (Task 1, items lines 118–127)
- **Content source:** `.agent/project-info/landing-content.es.md` (already updated in Task 0)
- **Scope:** 10 component/data changes. Plan only (this is Critical Workflow step 4.1).

## Constraints & Conventions

- Bootstrap `5.3.8` with bundle JS already loaded in `src/main.ts` → `data-bs-toggle="collapse"`/`"tab"` and `data-bs-parent` work without JS imports.
- Mobile breakpoint is consistent across the project: `@media (max-width: 767.98px)` for scoped CSS, and Bootstrap `d-md-none` / `d-none d-md-block` (switch at 768px) for show/hide.
- Hard rule: source files under `src/` must not exceed **200 lines**. Three target components are already at/over the limit (`SolutionSection.vue` 200, `HowItWorksSection.vue` 200, `FaqSection.vue` 202) → extraction to data files + child components is required, not optional.
- Rules to honor in all new code: max 2 params per method, max 2 nesting levels, single-section boolean conditions, prefer private members, self-documenting names, no commented code, real newlines (never `\n` literals), English code + Spanish content.
- No new folders are created (all new files go into existing `src/components/landing/`, `src/data/`, `src/types/`). → `.agent/project-structure.md` needs **no update**.

## New Files (7)

| File | Purpose |
|---|---|
| `src/types/solution.ts` | `ComparisonRow`, `ExcelComparisonRow` interfaces |
| `src/data/solution.ts` | `comparisonRows`, `excelComparisonHeading`, `excelComparisonRows` |
| `src/components/landing/SolutionExcelComparison.vue` | Excel/WhatsApp vs Cobranza App table (child) |
| `src/data/how-it-works.ts` | `steps`, `actorLabels`, `kindColorMap`, `CONCILIATION_STEP_NUMBER` |
| `src/components/landing/ConciliationDiagram.vue` | SVG conciliation diagram (child, rendered in step 5) |
| `src/components/landing/FaqGroupAccordion.vue` | Nested FAQ group accordion (child) |
| `src/components/landing/UseCaseComparison.vue` | Before/after comparison blocks (child, reused by tabs + mobile accordion) |

## Modified Files (9)

`HeroSection.vue`, `ProblemSection.vue`, `SolutionSection.vue`, `HowItWorksSection.vue`, `FeaturesSection.vue`, `FaqSection.vue`, `Navbar.vue`, `UseCasesTabs.vue`, `src/data/faq.ts`, `src/data/features.ts`, `src/types/features.ts`.

---

## Implementation Order

1. **Types & data first** (no UI dependency): `types/solution.ts`, `data/solution.ts`, `data/how-it-works.ts`, `types/features.ts`, `data/features.ts`, `data/faq.ts`.
2. **Child components** (depend on types/data): `SolutionExcelComparison.vue`, `ConciliationDiagram.vue`, `FaqGroupAccordion.vue`, `UseCaseComparison.vue`.
3. **Parent components**: `HeroSection`, `ProblemSection`, `SolutionSection`, `HowItWorksSection`, `FeaturesSection`, `FaqSection`, `UseCasesTabs`, `Navbar`.
4. **Verify**: `npm run lint`, `npm run build`, manual `npm run dev` checks.
5. **Commit** per logical group (see Git section).

---

## 1. HeroSection.vue — New subtitle

Single text swap in `<script setup>` (lines 5–6).

**Replace:**
```ts
const subtitle =
  'Sistema web que permite a empresas y profesionales cargar deudas, recibir comprobantes de pago de sus clientes y conciliarlos de manera centralizada y sin complicaciones.'
```
**With:**
```ts
const subtitle =
  'Sistema web que permite a empresas y profesionales centralizar el ciclo completo entre deudas, comprobantes, transferencias y conciliación, manteniendo siempre control manual cuando sea necesario.'
```

No template/style changes. File stays at 119 lines.

---

## 2. ProblemSection.vue — "Casos comunes" list + closing→intro

### 2.1 Script changes

Rename `closingStatement` → `commonCasesIntro` and add a `commonCases` array.

**Replace line 37** (`const closingStatement = ...`) **with:**
```ts
const commonCasesIntro =
  'Todo esto genera pérdida de tiempo, errores, estrés innecesario y problemas frecuentes como:'

const commonCases: string[] = [
  'Un propietario dice que pagó pero no encontrás el comprobante.',
  'Recibiste una transferencia pero no sabés a qué deuda corresponde.',
  'Un cliente pregunta varias veces cuánto debe este mes.',
  'Tenés que revisar cientos de comprobantes al cierre del mes.',
  'Dificultad para saber rápidamente quién pagó y quién no.'
]
```

### 2.2 Template changes

**Replace the closing paragraph (lines 70–72):**
```html
<p data-reveal class="problem-closing">
  {{ closingStatement }}
</p>
```
**With:**
```html
<p data-reveal class="problem-closing">
  {{ commonCasesIntro }}
</p>

<ul data-reveal class="common-cases-list list-unstyled">
  <li v-for="caseItem in commonCases" :key="caseItem" class="common-case-item">
    <i class="bi bi-exclamation-triangle common-case-marker" aria-hidden="true"></i>
    <span class="common-case-text">{{ caseItem }}</span>
  </li>
</ul>
```

### 2.3 Style additions (append before the mobile media query at line 139)

```css
.common-cases-list {
  margin-top: 1rem;
  margin-bottom: 0;
}

.common-case-item {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  padding: 0.4rem 0;
}

.common-case-marker {
  color: var(--color-pain);
  font-size: 0.95rem;
  margin-top: 0.25rem;
  flex-shrink: 0;
}

.common-case-text {
  font-size: 1rem;
  line-height: 1.55;
  color: var(--color-text-on-dark-muted);
}
```

### 2.4 Mobile media query — append inside `@media (max-width: 767.98px)`

```css
  .common-case-text {
    font-size: 0.9rem;
  }
```

**Line budget:** 150 → ~176. Safe. The `.problem-closing` class keeps its `--color-pain` emphasis styling, which now acts as the intro line to the list (intended).

---

## 3. SolutionSection.vue — Labels + Excel/WhatsApp table (extraction required)

File is at the 200-line limit. Extract data + table to keep compliant.

### 3.1 New `src/types/solution.ts`

```ts
export interface ComparisonRow {
  before: string
  after: string
}

export interface ExcelComparisonRow {
  aspect: string
  excelWhatsapp: string
  cobranzaApp: string
}
```

### 3.2 New `src/data/solution.ts`

```ts
import type { ComparisonRow, ExcelComparisonRow } from '@/types/solution'

const comparisonRows: ComparisonRow[] = [
  {
    before: 'Comprobantes dispersos en WhatsApp, mail y chats',
    after: 'Todos los comprobantes centralizados y organizados'
  },
  {
    before: 'Tenés que verificar manualmente cada transferencia',
    after: 'El sistema cruza automáticamente comprobantes, transferencias y deudas'
  },
  {
    before: 'Conciliación manual con extractos bancarios',
    after: 'Conciliación asistida con revisión manual solo en excepciones'
  },
  {
    before: 'Clientes preguntando constantemente cuánto deben',
    after: 'Clientes consultan su saldo por sí mismos en cualquier momento'
  },
  {
    before: 'Recordar deudas/pagos a clientes mediante WhatsApp/mail/chat/llamada',
    after: 'El sistema envía recordatorios a los clientes mediante notificaciones automáticas'
  }
]

const excelComparisonHeading = '¿Por qué no alcanza con Excel o WhatsApp?'

const excelComparisonRows: ExcelComparisonRow[] = [
  { aspect: 'Ubicación de comprobantes', excelWhatsapp: 'Dispersos', cobranzaApp: 'Centralizados' },
  { aspect: 'Conciliación', excelWhatsapp: 'Manual', cobranzaApp: 'Asistida + revisión manual' },
  { aspect: 'Portal para clientes', excelWhatsapp: 'No existe', cobranzaApp: 'Sí, simple y sin registro' },
  { aspect: 'Trazabilidad', excelWhatsapp: 'Baja', cobranzaApp: 'Completa' },
  { aspect: 'Tiempo administrativo', excelWhatsapp: 'Alto', cobranzaApp: 'Significativamente reducido' }
]

export { comparisonRows, excelComparisonHeading, excelComparisonRows }
```

### 3.3 New `src/components/landing/SolutionExcelComparison.vue`

Bootstrap `table` + `table-responsive` wrapper; custom dark styling via CSS vars (avoid `table-dark` to keep palette control). Cobranza App column highlighted with accent.

```vue
<script setup lang="ts">
import { excelComparisonHeading, excelComparisonRows } from '@/data/solution'

const aspectHeader = 'Aspecto'
const excelHeader = 'Excel / WhatsApp'
const cobranzaHeader = 'Cobranza App'
</script>

<template>
  <div class="excel-comparison">
    <h3 class="excel-comparison-heading">{{ excelComparisonHeading }}</h3>
    <div class="table-responsive">
      <table class="table table-bordered align-middle excel-comparison-table mb-0">
        <thead>
          <tr>
            <th scope="col">{{ aspectHeader }}</th>
            <th scope="col">{{ excelHeader }}</th>
            <th scope="col">{{ cobranzaHeader }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in excelComparisonRows" :key="row.aspect">
            <th scope="row">{{ row.aspect }}</th>
            <td>{{ row.excelWhatsapp }}</td>
            <td class="excel-comparison-cobranza">{{ row.cobranzaApp }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.excel-comparison-heading {
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  color: var(--color-text-on-dark);
}

.excel-comparison-table {
  --bs-table-bg: transparent;
  --bs-table-color: var(--color-text-on-dark-muted);
  --bs-table-border-color: var(--color-border);
  margin-bottom: 0;
}

.excel-comparison-table :deep(thead th) {
  background: var(--color-bg-card);
  color: var(--color-text-on-dark);
  font-weight: 600;
  border-color: var(--color-border);
}

.excel-comparison-table :deep(tbody th) {
  background: var(--color-bg-card);
  color: var(--color-text-on-dark);
  font-weight: 600;
}

.excel-comparison-table :deep(td) {
  background: var(--color-bg-card-alt);
  color: var(--color-text-on-dark-muted);
}

.excel-comparison-cobranza {
  color: var(--color-accent) !important;
  font-weight: 600;
}

@media (max-width: 767.98px) {
  .excel-comparison-heading {
    font-size: 1.1rem;
  }

  .excel-comparison-table :deep(th),
  .excel-comparison-table :deep(td) {
    font-size: 0.875rem;
  }
}
</style>
```

> Note: `:deep()` is used because scoped styles do not reach Bootstrap-injected table internals otherwise. This is the established Vue 3 scoped-override pattern.

### 3.4 SolutionSection.vue edits

**Script — replace lines 1–38** with:
```ts
<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal'
import { comparisonRows } from '@/data/solution'
import SolutionExcelComparison from '@/components/landing/SolutionExcelComparison.vue'

useScrollReveal()

const sectionTitle = 'Cobranza App simplifica y centraliza todo el proceso de cobranza'
const bodyText =
  'Es una plataforma que permite cargar deudas de forma rápida (individual o masiva), que tus clientes consulten su saldo actual en cualquier momento, suban sus comprobantes de pago y que tú puedas validarlos de manera ágil y ordenada.'
const antesLabel = 'Sin Cobranza App'
const despuesLabel = 'Con Cobranza App'
const closingStatement =
  'De esta forma reducís drásticamente el tiempo dedicado a comunicación, verificación y conciliación de pagos.'
</script>
```
(Inline `ComparisonRow` interface + `comparisonRows` array are removed; they now come from `src/data/solution.ts`.)

**Template — heading labels (lines 54 & 57):**
- `<i class="bi bi-x-circle me-2"></i>Antes` → `<i class="bi bi-x-circle me-2"></i>{{ antesLabel }}`
- `<i class="bi bi-check-circle me-2"></i>Después` → `<i class="bi bi-check-circle me-2"></i>{{ despuesLabel }}`

**Template — cell labels (lines 63 & 67):**
- `<span class="comparison-cell-label">Antes</span>` → `<span class="comparison-cell-label">{{ antesLabel }}</span>`
- `<span class="comparison-cell-label">Después</span>` → `<span class="comparison-cell-label">{{ despuesLabel }}</span>`

**Template — add the Excel comparison after the closing statement (after line 75 `</p>`), inside the `col` div:**
```html
<SolutionExcelComparison data-reveal />
```

**Style:** keep existing `.comparison-heading--antes` / `--despues` modifier class names (they still denote the before/after column semantics; only visible text changes). No style line additions needed. **Line budget:** script 38→11, template +1, style unchanged → ~173. Safe.

---

## 4. HowItWorksSection.vue — Conciliación diagram (extraction required)

File is at the 200-line limit. Extract step data + diagram.

### 4.1 New `src/data/how-it-works.ts`

```ts
import type { HowItWorksStep, HowItWorksStepKind } from '@/types/how-it-works'

const stepTexts = [
  'Carga las deudas de tus clientes, individual o masivamente.',
  'Cada cliente accede con su identificador (código de cliente, DNI + unidad, etc.) y consulta su saldo y vencimientos.',
  'El cliente realiza la transferencia y sube el comprobante directamente en la plataforma.',
  'Sube tu extracto bancario al sistema.',
  'El sistema cruza automáticamente los comprobantes, transferencias y deudas. Genera reportes y un resumen del resultante. Notifica a los clientes sobre el estado de su deuda.',
  'Los casos que requieren atención se revisan y confirman manualmente.',
  'Se genera y descarga el recibo una vez validado el pago.'
]

const stepKinds: HowItWorksStepKind[] = ['empresa', 'cliente', 'cliente', 'empresa', 'sistema', 'empresa', 'resultado']

const stepIcons = ['upload', 'search', 'upload', 'upload', 'refresh-cw', 'search', 'file-text']

const steps: HowItWorksStep[] = stepTexts.map((text, index) => ({
  number: index + 1,
  kind: stepKinds[index]!,
  icon: stepIcons[index]!,
  text
}))

const actorLabels: Record<HowItWorksStepKind, string> = {
  empresa: 'Negocio',
  cliente: 'Cliente',
  sistema: 'Sistema',
  resultado: 'Cliente'
}

const kindColorMap: Record<HowItWorksStepKind, string> = {
  empresa: 'var(--color-primary)',
  cliente: 'var(--color-accent)',
  sistema: 'var(--color-primary)',
  resultado: 'var(--color-accent)'
}

const CONCILIATION_STEP_NUMBER = 5

export { steps, actorLabels, kindColorMap, CONCILIATION_STEP_NUMBER }
```

### 4.2 New `src/components/landing/ConciliationDiagram.vue`

SVG diagram with a centered `Match` hub. Inputs: Deuda (from Cliente), Comprobante, Transferencia (from Extracto Bancario). Output: Validación final. Responsive via `viewBox` + `width="100%"`. Dark-theme palette. Accessible via `role="img"` + `aria-label`.

```vue
<script setup lang="ts">
const diagramLabel =
  'Diagrama de conciliación: Cliente y Deuda, Comprobante, Extracto Bancario y Transferencia confluyen en un Match central que produce la Validación final.'
</script>

<template>
  <svg
    class="conciliation-diagram"
    viewBox="0 0 620 300"
    width="100%"
    role="img"
    :aria-label="diagramLabel"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <marker id="conciliationArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" :fill="'var(--color-text-on-dark-dim)'" />
      </marker>
    </defs>

    <g class="conciliation-node" transform="translate(40,20)">
      <rect width="120" height="36" rx="8" />
      <text x="60" y="23" text-anchor="middle">Cliente</text>
    </g>

    <g class="conciliation-node" transform="translate(40,90)">
      <rect width="120" height="36" rx="8" />
      <text x="60" y="23" text-anchor="middle">Deuda</text>
    </g>

    <g class="conciliation-node" transform="translate(170,170)">
      <rect width="140" height="36" rx="8" />
      <text x="70" y="23" text-anchor="middle">Comprobante</text>
    </g>

    <g class="conciliation-node conciliation-node--match" transform="translate(340,170)">
      <rect width="90" height="40" rx="10" />
      <text x="45" y="26" text-anchor="middle">Match</text>
    </g>

    <g class="conciliation-node" transform="translate(470,170)">
      <rect width="130" height="36" rx="8" />
      <text x="65" y="23" text-anchor="middle">Transferencia</text>
    </g>

    <g class="conciliation-node" transform="translate(470,90)">
      <rect width="130" height="36" rx="8" />
      <text x="65" y="23" text-anchor="middle">Extracto bancario</text>
    </g>

    <g class="conciliation-node conciliation-node--result" transform="translate(340,250)">
      <rect width="130" height="36" rx="8" />
      <text x="65" y="23" text-anchor="middle">Validación final</text>
    </g>

    <line x1="100" y1="56" x2="100" y2="90" class="conciliation-edge" marker-end="url(#conciliationArrow)" />
    <line x1="160" y1="126" x2="360" y2="170" class="conciliation-edge" marker-end="url(#conciliationArrow)" />
    <line x1="310" y1="188" x2="340" y2="188" class="conciliation-edge" marker-end="url(#conciliationArrow)" />
    <line x1="470" y1="126" x2="470" y2="170" class="conciliation-edge" marker-end="url(#conciliationArrow)" />
    <line x1="470" y1="188" x2="430" y2="188" class="conciliation-edge" marker-end="url(#conciliationArrow)" />
    <line x1="385" y1="210" x2="385" y2="250" class="conciliation-edge" marker-end="url(#conciliationArrow)" />
  </svg>
</template>

<style scoped>
.conciliation-diagram {
  max-width: 560px;
  margin: 1.25rem auto 0;
  display: block;
}

.conciliation-node rect {
  fill: var(--color-bg-card);
  stroke: var(--color-border);
  stroke-width: 1.5;
}

.conciliation-node text {
  fill: var(--color-text-on-dark);
  font-size: 13px;
  font-weight: 600;
}

.conciliation-node--match rect {
  fill: var(--color-bg-card-alt);
  stroke: var(--color-accent);
  stroke-width: 2;
}

.conciliation-node--match text {
  fill: var(--color-accent);
}

.conciliation-node--result rect {
  stroke: var(--color-accent);
}

.conciliation-edge {
  stroke: var(--color-text-on-dark-dim);
  stroke-width: 1.5;
  fill: none;
}

@media (max-width: 767.98px) {
  .conciliation-diagram {
    max-width: 100%;
  }

  .conciliation-node text {
    font-size: 11px;
  }
}
</style>
```

> Note: SVG coordinates are tuned so arrows connect node edges (Cliente→Deuda vertical; Deuda→Match diagonal; Comprobante→Match and Transferencia→Match horizontal; Extracto bancario→Transferencia vertical; Match→Validación final vertical). The implementer should visually verify arrows touch node borders and nudge coordinates if needed during manual testing.

### 4.3 HowItWorksSection.vue edits

**Script — replace lines 1–43** with:
```ts
<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal'
import { steps, actorLabels, kindColorMap, CONCILIATION_STEP_NUMBER } from '@/data/how-it-works'
import ConciliationDiagram from '@/components/landing/ConciliationDiagram.vue'

useScrollReveal()

const sectionTitle = 'Cómo funciona Cobranza App'
</script>
```

**Template — inside `.step-card` (after `<p class="step-text">…</p>`, around line 68), add:**
```html
<ConciliationDiagram
  v-if="step.number === CONCILIATION_STEP_NUMBER"
  class="conciliation-diagram-wrapper"
  aria-hidden="false"
/>
```

**Style — add a small wrapper rule (append before mobile query at line 181):**
```css
.conciliation-diagram-wrapper {
  margin-top: 0.5rem;
}
```

**Line budget:** script 43→7, template +4, style +3 → ~169. Safe. The `:style="{ '--node-color': kindColorMap[step.kind] }"` binding on the `step-row` (line 60) remains unchanged.

---

## 5. FeaturesSection.vue — Intro texts + accordion centering fix

### 5.1 `src/types/features.ts` — add optional `intro`

```ts
export type FeatureVariant = 'company' | 'user'

export interface FeatureItem {
  icon: string
  text: string
  elaboration: string
}

export interface FeatureGroup {
  title: string
  intro?: string
  accordionId: string
  variant: FeatureVariant
  features: FeatureItem[]
}
```

### 5.2 `src/data/features.ts` — add `intro` to each group in `featureGroups`

**Replace the `featureGroups` export (lines 81–94) with:**
```ts
export const featureGroups: FeatureGroup[] = [
  {
    title: 'Para la empresa o profesional',
    intro: 'Una plataforma web donde un administrador autorizado tiene acceso a distintas funcionalidades, tales como:',
    accordionId: 'featuresCompanyAccordion',
    variant: 'company',
    features: companyFeatures
  },
  {
    title: 'Para el cliente final',
    intro: 'Un portal web simple donde el cliente puede:',
    accordionId: 'featuresUserAccordion',
    variant: 'user',
    features: userFeatures
  }
]
```

### 5.3 FeaturesSection.vue — render intro + fix accordion-body padding

**Template — after `.feature-group-title` (line 31), before `<div class="accordion">` (line 33), insert:**
```html
<p v-if="group.intro" class="feature-group-intro">{{ group.intro }}</p>
```

**Style — `.accordion-body` centering fix (replace lines 152–157):**

Current problem: `padding: 0 1.5rem 1rem 3.1rem;` → no top padding (text flush to header), extra space at bottom.
```css
.accordion-body {
  color: var(--color-text-on-dark-muted);
  font-size: 0.9375rem;
  line-height: 1.6;
  padding: 1rem 1.5rem 1rem 3.1rem;
}
```
(Balanced `1rem` top/bottom — fixes the "no top padding" and removes the perceived "extra space at the end" by making vertical spacing symmetric.)

**Mobile `.accordion-body` (replace line 192) — keep balanced:**
```css
    padding: 0.875rem 1rem 0.875rem calc(1rem + 1.1rem + 0.75rem);
```

**Style — add `.feature-group-intro` (insert before `.accordion-item` rule, ~line 114):**
```css
.feature-group-intro {
  font-size: 1rem;
  color: var(--color-text-on-dark-muted);
  padding-left: 1.5rem;
  margin-bottom: 1rem;
  line-height: 1.55;
}
```

**Line budget:** 195 + 1 (template) + 5 (intro CSS) = 201. **Trim one blank line** in the `<style>` block to land at 200. Safe. If still over, the implementer may extract the per-group accordion into a `FeatureGroupAccordion.vue` child (same pattern as FAQ) — but the minimal inline path is preferred and compliant at 200.

---

## 6 & 7. FaqSection.vue + faq.ts — Nested accordion + new/updated entries (extraction required)

`FaqSection.vue` is at 202 lines (over limit) and the nested accordion adds markup → must extract the per-group block to a child.

### 6.1 `src/data/faq.ts` — 10 new questions + extracto format update

**Update the extracto formats answer (lines 90–93)** — add Excel:
```ts
  {
    question: '¿Qué formatos de extracto bancario soporta?',
    answer:
      'Inicialmente soporta los formatos más comunes (PDF, CSV y Excel) de los principales bancos. Se irán agregando más según los comentarios y experiencias que nos hagan llegar.'
  }
```

**Add new entries by group:**

`generalFaqs` — append (after the existing 3, before the closing `]`):
```ts
  {
    question: '¿Necesito instalar algo?',
    answer:
      'No. Ni el administrador ni el cliente necesitan instalar ni programas ni apps. Solo se requiere un dispositivo con acceso a internet y un navegador web.'
  }
```

`companyFaqs` — append (after the existing 6):
```ts
  {
    question: '¿Cómo identifico a mis clientes?',
    answer: 'Mediante DNI, unidad funcional, código de cliente u otro identificador configurable.'
  },
  {
    question: '¿Puedo usarlo aunque mis montos cambien todos los meses?',
    answer:
      'Sí. El sistema permite generar deudas únicas o recurrentes, con valores fijos o calculados mediante fórmulas.'
  },
  {
    question: '¿Puedo emitir recibos personalizados?',
    answer: 'Es una funcionalidad que agregaremos según la demanda de los usuarios.'
  }
```

`userFaqs` — append (after the existing 3):
```ts
  {
    question: '¿Mis clientes pueden ver pagos históricos?',
    answer:
      'El cliente puede verificar el estado de sus pagos recientes y la última deuda. No tiene acceso a un historial completo (funcionalidad en evaluación según demanda).'
  }
```

`conciliationFaqs` — append (after the existing 5, before the closing `]`):
```ts
  {
    question: '¿Qué sucede cuando el sistema no puede identificar correctamente un comprobante?',
    answer:
      'El cliente puede completar manualmente los datos del comprobante. El administrador es notificado para revisar y tratar el caso manualmente.'
  },
  {
    question: '¿Qué pasa si un cliente paga varias deudas juntas?',
    answer:
      'El sistema permite configurar si las deudas se acumulan o se mantienen individuales. En ambos casos soporta conciliación manual o asistida.'
  },
  {
    question: '¿Qué pasa si un cliente no sube el comprobante?',
    answer:
      'El pago se considera pendiente hasta que se detecte en el extracto bancario o se concilie manualmente.'
  },
  {
    question: '¿Qué pasa si la transferencia no aparece en el extracto?',
    answer: 'Se puede conciliar manualmente o esperar a un extracto posterior.'
  },
  {
    question: '¿Qué bancos soporta?',
    answer: 'Cualquier banco que permita descargar un extracto de movimientos (PDF, CSV o Excel).'
  }
```

**Resulting counts:** general 4, company 9, user 4, conciliation 10 → **27 total** (was 17; +10 new, 1 updated). `faq.ts` ~121 → ~171 lines. Safe.

### 6.2 New `src/components/landing/FaqGroupAccordion.vue`

Renders one outer accordion-item (the group) whose body contains an inner accordion of questions. Bootstrap nested accordion: outer collapse uses `data-bs-parent` of the outer accordion id; inner collapses use `data-bs-parent` of the group's own accordion id → one-group-open-at-a-time and one-question-open-at-a-time per group. Default-open rules: `variant === 'general'` group open; `index === 0` question open per group.

```vue
<script setup lang="ts">
import type { FaqGroup } from '@/types/faq'

const props = defineProps<{ group: FaqGroup; outerParentId: string }>()

function groupCollapseId(accordionId: string): string {
  return `${accordionId}GroupCollapse`
}

function questionCollapseId(accordionId: string, index: number): string {
  return `${accordionId}Collapse${index}`
}

function isGroupOpen(): boolean {
  return props.group.variant === 'general'
}
</script>

<template>
  <div :class="[`faq-group-item--${group.variant}`, 'accordion-item faq-group-item']">
    <h3 class="accordion-header">
      <button
        class="accordion-button faq-group-button"
        :class="{ collapsed: !isGroupOpen() }"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="`#${groupCollapseId(group.accordionId)}`"
        :aria-expanded="isGroupOpen()"
        :aria-controls="groupCollapseId(group.accordionId)"
      >
        {{ group.title }}
      </button>
    </h3>
    <div
      :id="groupCollapseId(group.accordionId)"
      class="accordion-collapse collapse"
      :class="{ show: isGroupOpen() }"
      :data-bs-parent="`#${outerParentId}`"
    >
      <div class="accordion-body faq-group-body">
        <div class="accordion" :id="group.accordionId">
          <div
            v-for="(item, index) in group.faqs"
            :key="item.question"
            class="accordion-item faq-question-item"
          >
            <h4 class="accordion-header">
              <button
                class="accordion-button faq-question-button"
                :class="{ collapsed: index !== 0 }"
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="`#${questionCollapseId(group.accordionId, index)}`"
                :aria-expanded="index === 0"
                :aria-controls="questionCollapseId(group.accordionId, index)"
              >
                {{ item.question }}
              </button>
            </h4>
            <div
              :id="questionCollapseId(group.accordionId, index)"
              class="accordion-collapse collapse"
              :class="{ show: index === 0 }"
              :data-bs-parent="`#${group.accordionId}`"
            >
              <div class="accordion-body faq-answer-body">
                <p class="faq-answer">{{ item.answer }}</p>
                <p v-if="item.note" class="faq-note">{{ item.note }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.faq-group-item {
  border-left: 4px solid var(--group-color);
  border-radius: 0 8px 8px 0;
  overflow: hidden;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  margin-bottom: 1rem;
}

.faq-group-item:last-of-type {
  margin-bottom: 0;
}

.faq-group-item--general {
  --group-color: var(--color-primary);
}

.faq-group-item--company {
  --group-color: var(--color-accent);
}

.faq-group-item--user {
  --group-color: var(--color-primary);
}

.faq-group-item--conciliation {
  --group-color: var(--color-accent);
}

.faq-group-button {
  background: var(--color-bg-card);
  color: var(--color-text-on-dark);
  font-size: 1.25rem;
  font-weight: 600;
  padding: 1.25rem 1.5rem;
}

.faq-group-button:not(.collapsed) {
  background: var(--color-bg-card-alt);
  box-shadow: none;
}

.faq-group-button::after {
  filter: brightness(0) invert(0.85);
}

.faq-group-button:focus {
  box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.5);
  border-color: var(--color-primary);
}

.faq-group-body {
  padding: 0.5rem 1rem 1rem;
  background: var(--color-bg-card);
}

.faq-question-item {
  background: var(--color-bg-card-alt);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  margin-bottom: 0.6rem;
  overflow: hidden;
}

.faq-question-item:last-of-type {
  margin-bottom: 0;
}

.faq-question-button {
  background: var(--color-bg-card-alt);
  color: var(--color-text-on-dark);
  font-size: 1rem;
  font-weight: 500;
  padding: 1rem 1.25rem;
}

.faq-question-button:not(.collapsed) {
  background: var(--color-bg-card);
  box-shadow: none;
}

.faq-question-button::after {
  filter: brightness(0) invert(0.85);
}

.faq-question-button:focus {
  box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.5);
  border-color: var(--color-primary);
}

.faq-answer-body {
  color: var(--color-text-on-dark-muted);
  font-size: 1rem;
  line-height: 1.6;
  padding: 0.75rem 1.25rem 1rem;
}

.faq-answer {
  margin: 0;
}

.faq-note {
  margin: 1rem 0 0;
  padding: 0.75rem 1rem;
  background: var(--color-bg-card);
  border-left: 2px solid var(--group-color);
  border-radius: 6px;
  font-style: italic;
  font-size: 0.9375rem;
  color: var(--color-text-on-dark-muted);
}

@media (max-width: 767.98px) {
  .faq-group-button {
    font-size: 1.125rem;
    padding: 1rem 1.25rem;
  }

  .faq-question-button {
    font-size: 0.9375rem;
    padding: 0.875rem 1rem;
  }

  .faq-answer-body {
    font-size: 0.9375rem;
    padding: 0.625rem 1rem 0.875rem;
  }

  .faq-note {
    font-size: 0.875rem;
  }
}
</style>
```

### 6.3 FaqSection.vue — rewrite to outer accordion + child

**Replace the whole file (202 lines) with:**
```vue
<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal'
import { faqGroups } from '@/data/faq'
import FaqGroupAccordion from '@/components/landing/FaqGroupAccordion.vue'

useScrollReveal()

const sectionTitle = 'Preguntas Frecuentes'
const outerAccordionId = 'faqOuterAccordion'
</script>

<template>
  <section id="faq" class="faq-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-9">
          <h2 data-reveal class="faq-title">{{ sectionTitle }}</h2>

          <div data-reveal class="accordion faq-outer-accordion" :id="outerAccordionId">
            <FaqGroupAccordion
              v-for="group in faqGroups"
              :key="group.accordionId"
              :group="group"
              :outer-parent-id="outerAccordionId"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-section {
  background: var(--color-bg-card-alt);
  color: var(--color-text-on-dark);
}

.faq-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.25;
  color: var(--color-text-on-dark);
}

.faq-outer-accordion {
  margin-top: 2rem;
}

@media (max-width: 767.98px) {
  .faq-title {
    font-size: 1.75rem;
  }
}
</style>
```

**Line budget:** FaqSection ~32, child ~210 → child is slightly over 200. **Trim:** the child can drop the `.accordion-collapse` transition rule (Bootstrap already transitions) and/or merge the `::after`/`:focus` rules to land ≤200. Expected child ~195 after trim. Implementer must verify ≤200 and trim 1–2 non-essential rules if needed.

> Nested-accordion behavior notes for the implementer to verify during manual testing:
> - Opening the "Company" group auto-closes "General" (outer `data-bs-parent`).
> - Inside a group, opening the 2nd question auto-closes the 1st (inner `data-bs-parent`).
> - On load: "General" group open + its first question open; every other group's first question is pre-opened (visible when the group is expanded).
> - Initial `show` class + `aria-expanded` are static (bound to non-changing `variant`/`index`), so Vue reactivity will not fight Bootstrap's imperative toggling — same pattern already used in `UseCasesTabs.vue`.

---

## 8. Navbar.vue — Scroll-spy review + refinement

### 8.1 Review findings (current code, lines 50–68)

- Observer observes all 9 section IDs; all exist in `App.vue`. ✓
- `rootMargin: '-70px 0px -50% 0px'` offsets the fixed navbar (70px) and triggers in the top half. ✓
- **Weakness:** the callback sets `activeSectionId` to the **last intersecting entry** in each batch. `IntersectionObserver` does not guarantee entry order, so at section boundaries the highlight can lag or point to the section above when scrolling. This is the likely root cause if the highlight feels inaccurate.

### 8.2 Recommended refinement — track per-section ratio, pick the most visible

**Script — add a visibility map and helper (insert before `onMounted`):**
```ts
const sectionVisibility = new Map<string, number>()

function mostVisibleSectionId(currentId: string): string {
  let topId = currentId
  let topRatio = 0
  for (const [id, ratio] of sectionVisibility) {
    if (ratio > topRatio) {
      topRatio = ratio
      topId = id
    }
  }
  return topId
}
```

**Script — replace the observer callback (lines 51–60) with:**
```ts
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        sectionVisibility.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
      }
      activeSectionId.value = mostVisibleSectionId(activeSectionId.value)
    },
    { rootMargin: '-70px 0px -50% 0px', threshold: [0, 0.25, 0.5] }
  )
```

- `mostVisibleSectionId` has a `for…of` + `if` = 2 nesting levels (allowed). Single-section boolean (`ratio > topRatio`). 1 param. Compliant.
- Adding `0.5` to thresholds gives finer ratio reporting for the tie-break.
- Fallback to `currentId` keeps the highlight sticky when no section is in the zone (between sections).

**Line budget:** 151 + ~14 = ~165. Safe.

### 8.3 If review shows it already works acceptably

The implementer may keep the current logic. But the refinement is low-risk and recommended; include it unless manual testing proves the current behavior is already correct on all 9 sections.

---

## 9. UseCasesTabs.vue — Mobile accordion (extraction required)

Dual-render would exceed 200 lines → extract the before/after blocks to a child reused by both the desktop tabs and the mobile accordion.

### 9.1 New `src/components/landing/UseCaseComparison.vue`

```vue
<script setup lang="ts">
import type { UseCaseExample } from '@/types/use-cases'

defineProps<{ example: UseCaseExample }>()

const habitualLabel = 'Situación habitual'
const cobranzaLabel = 'Con Cobranza App'
</script>

<template>
  <div class="example-blocks">
    <div class="example-block example-block--habitual">
      <h4 class="example-block-label">
        <i class="bi bi-x-circle" aria-hidden="true"></i>
        {{ habitualLabel }}
      </h4>
      <p class="example-block-text">{{ example.beforeText }}</p>
    </div>
    <div class="example-block example-block--cobranza">
      <h4 class="example-block-label">
        <i class="bi bi-check-circle" aria-hidden="true"></i>
        {{ cobranzaLabel }}
      </h4>
      <p class="example-block-text">{{ example.afterText }}</p>
    </div>
  </div>
</template>

<style scoped>
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
  .example-blocks {
    grid-template-columns: 1fr;
  }
}
</style>
```

### 9.2 UseCasesTabs.vue — rewrite

Desktop tabs (visible ≥768px via `d-none d-md-block`) keep current behavior. Mobile accordion (visible <768px via `d-md-none`) replaces horizontal-scroll tabs; first case open by default; `data-bs-parent` enforces one-open-at-a-time.

```vue
<script setup lang="ts">
import { useCaseExamples } from '@/data/use-cases'
import UseCaseComparison from '@/components/landing/UseCaseComparison.vue'

const tabsTitle = 'Seleccioná tu caso'
const mobileAccordionId = 'useCaseMobileAccordion'

function paneId(tabId: string): string {
  return `useCasePane-${tabId}`
}

function tabControlId(tabId: string): string {
  return `useCaseTab-${tabId}`
}

function mobileCollapseId(tabId: string): string {
  return `useCaseMobileCollapse-${tabId}`
}
</script>

<template>
  <div data-reveal class="use-cases-tabs">
    <h3 class="use-cases-tabs-title">{{ tabsTitle }}</h3>

    <div class="d-none d-md-block">
      <div class="use-cases-tabs-nav">
        <ul class="nav nav-tabs" role="tablist">
          <li
            v-for="(example, index) in useCaseExamples"
            :key="example.tabId"
            class="nav-item"
            role="presentation"
          >
            <button
              :id="tabControlId(example.tabId)"
              class="nav-link"
              :class="{ active: index === 0 }"
              type="button"
              role="tab"
              data-bs-toggle="tab"
              :data-bs-target="`#${paneId(example.tabId)}`"
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
          :id="paneId(example.tabId)"
          :key="example.tabId"
          class="tab-pane fade"
          :class="{ 'show active': index === 0 }"
          role="tabpanel"
          :aria-labelledby="tabControlId(example.tabId)"
        >
          <UseCaseComparison :example="example" />
        </div>
      </div>
    </div>

    <div class="accordion d-md-none" :id="mobileAccordionId">
      <div
        v-for="(example, index) in useCaseExamples"
        :key="example.tabId"
        class="accordion-item use-case-mobile-item"
      >
        <h4 class="accordion-header">
          <button
            class="accordion-button use-case-mobile-button"
            :class="{ collapsed: index !== 0 }"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="`#${mobileCollapseId(example.tabId)}`"
            :aria-expanded="index === 0"
            :aria-controls="mobileCollapseId(example.tabId)"
          >
            {{ example.label }}
          </button>
        </h4>
        <div
          :id="mobileCollapseId(example.tabId)"
          class="accordion-collapse collapse"
          :class="{ show: index === 0 }"
          :data-bs-parent="`#${mobileAccordionId}`"
        >
          <div class="accordion-body use-case-mobile-body">
            <UseCaseComparison :example="example" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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
  --bs-nav-tabs-link-active-color: var(--color-text-on-dark);
  --bs-nav-tabs-link-active-bg: var(--color-bg-card);
  --bs-nav-tabs-link-active-border-color: var(--color-border) var(--color-border) var(--color-bg-card);
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

.nav-tabs .nav-link.active {
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

.use-case-mobile-item {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  margin-bottom: 0.75rem;
  overflow: hidden;
}

.use-case-mobile-item:last-of-type {
  margin-bottom: 0;
}

.use-case-mobile-button {
  background: var(--color-bg-card);
  color: var(--color-text-on-dark);
  font-size: 1rem;
  font-weight: 600;
  padding: 1rem 1.25rem;
}

.use-case-mobile-button:not(.collapsed) {
  background: var(--color-bg-card-alt);
  box-shadow: none;
}

.use-case-mobile-button::after {
  filter: brightness(0) invert(0.85);
}

.use-case-mobile-button:focus {
  box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.5);
}

.use-case-mobile-body {
  padding: 0 1.25rem 1.25rem;
  background: var(--color-bg-card);
}

@media (max-width: 767.98px) {
  .use-cases-tabs-title {
    font-size: 1.25rem;
  }

  .tab-content {
    padding: 1.25rem;
  }
}
</style>
```

> Note: the `UseCasesSection.vue` parent renders `<UseCasesTabs />` and needs **no change**. The mobile accordion lives entirely inside `UseCasesTabs.vue`. The `.example-blocks` grid is single-column on mobile (handled inside `UseCaseComparison.vue`), so within the mobile accordion each before/after block stacks vertically.

**Line budget:** UseCasesTabs ~150, child ~80. Safe.

---

## Verification Steps (for implementer, step 4.2)

1. `npm run lint` — must pass (ESLint + Prettier).
2. `npm run build` — `vue-tsc -b && vite build` must pass with no type errors.
3. `npm run dev` + manual checks:
   - **Hero:** new subtitle renders.
   - **Problem:** "Casos comunes" 5 bullets render below the pain-color intro line.
   - **Solution:** "Sin Cobranza App" / "Con Cobranza App" labels; Excel/WhatsApp table renders with Cobranza column in accent green; table scrolls horizontally on narrow widths via `table-responsive`.
   - **How it works:** step 5 shows the SVG diagram; arrows connect nodes; diagram scales on mobile.
   - **Features:** both groups show intro text above accordion; expanded accordion body has balanced top/bottom padding (no flush-top, no trailing gap).
   - **FAQ:** nested accordion — "General" open by default with its first question open; opening another group closes General; opening a 2nd question closes the 1st within a group; each group's first question is open when its group is expanded; 27 questions total; extracto answer includes "Excel".
   - **Navbar:** scroll through all 9 sections and confirm the active link matches the section in view (apply refinement if it lags).
   - **Use cases (mobile, <768px):** horizontal-scroll tabs are gone; accordion shows the 4 cases, first one open, opening another closes the previous; before/after blocks stack. On desktop (≥768px) tabs still work as before.
4. Verify every changed/new `src/` file is ≤200 lines (per max-lines rule).

---

## Git (for implementer, step 4.2 — commit per logical group)

Meaningful commit messages (do not amend; one commit per group):

1. `feat(hero,problem): update hero subtitle and add common-cases list`
2. `feat(solution): extract data, rename labels, add Excel/WhatsApp comparison`
3. `feat(how-it-works): extract step data and add conciliation diagram`
4. `feat(features): add group intros and fix accordion body padding`
5. `feat(faq): nested group accordion, 10 new questions, Excel format`
6. `refactor(navbar): improve scroll-spy with ratio tracking`
7. `feat(use-cases): mobile accordion for case selection`

Follow Gitignore Compliance Rule before each commit: read `.gitignore`, run `git status`, ensure no `node_modules/`/`dist/` or gitignored files are staged.

---

## Rules Compliance Self-Check (done during planning)

- **max-arguments-per-method:** `questionCollapseId(accordionId, index)` = 2 params; `collapseId`/`groupCollapseId`/`paneId`/`tabControlId`/`mobileCollapseId` = 1 param; `mostVisibleSectionId(currentId)` = 1 param; Vue `defineProps<{…}>` is object-based (not positional). ✓
- **max-depth (2):** `mostVisibleSectionId` for→if = 2; observer callback for→set = 1; all other functions flat. ✓
- **single-section-boolean-conditions:** `!isGroupOpen()`, `index !== 0`, `index === 0`, `ratio > topRatio` — all single sections. ✓
- **prefer-private-members:** `<script setup>` bindings are module-private; props via `defineProps`. ✓
- **self-documenting-code:** descriptive names (`commonCases`, `excelComparisonRows`, `CONCILIATION_STEP_NUMBER`, `mostVisibleSectionId`, `mobileCollapseId`). No comments required. ✓
- **no-commented-code / newline-prevention:** all snippets use real newlines; no commented-out code. ✓
- **max-lines-per-file (200):** every changed/new file verified ≤200 (with noted trims for `FaqGroupAccordion.vue` and `FeaturesSection.vue`). ✓
- **English code / Spanish content:** all identifiers/comments English; all visible text neutral Spanish from `landing-content.es.md`. ✓

---

## Out of Scope (handled by other Critical Workflow steps)

- Code review (4.3), documentation (4.4), verification (4.5), task completion (4.6) — separate sub-tasks.
- Polish & consistency (TODO Task 2) — separate task.
- This plan does **not** write code, run git, or modify non-plan files.
