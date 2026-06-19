# Plan — Task 1: Improve Features Section (TODO-11)

**TODO:** `.agent/todos/20260619/20260619-todo-1.md` → Task 1
**Source content:** `.agent/project-info/landing-content.es.md` §5

---

## 1. Objective

Make each feature in `FeaturesSection.vue` individually expandable using a Bootstrap 5 Accordion; update content to match §5 (7 company + 5 user features); ensure excellent mobile responsiveness and a clean, professional dark-theme appearance; stay within the 200-line file limit.

---

## 2. Key Decision — "Extra Information"

§5 defines feature labels only — no extra detail per feature. The acceptance criterion requires "individually expandable with defined extra information." Chosen resolution = **Option (a): generate a brief elaboration (1–2 sentences, neutral Spanish) per feature** as the expandable extra information.

- **Accordion header (always visible)** = feature `text`, taken **verbatim** from §5.
- **Accordion body (revealed on expand)** = generated `elaboration` → the "defined extra information."
- No `v-html` (security-first).

---

## 3. High-Level Approach

- Replace the two static `<ul>` lists with **two Bootstrap 5 Accordions** (one per group: company, user).
- Each feature = one accordion item: header (icon + feature text) → body (elaboration).
- **Multi-open** behavior (omit `data-bs-parent`, mirroring `FaqSection.vue`); all items start **collapsed**.
- Group color accent preserved: company = `--color-primary` (blue), user = `--color-accent` (emerald), driven by a `--group-color` CSS custom property per group.
- Reuse the `FaqSection` dark-theme accordion override pattern.
- **Extract** types → `src/types/features.ts` and data → `src/data/features.ts` (inlining long elaborations would push the component to ~230 lines, exceeding the 200-line hard limit).
- **No App.vue / navbar changes** — `FeaturesSection` is already mounted with `id="features"`.

---

## 4. Files

| Action | Path | Purpose |
|---|---|---|
| NEW | `src/types/features.ts` | `FeatureVariant`, `FeatureItem`, `FeatureGroup` types |
| NEW | `src/data/features.ts` | `companyFeatures`, `userFeatures`, exported `featureGroups` |
| MODIFY | `src/components/landing/FeaturesSection.vue` | Accordion rewrite |
| MODIFY | `.agent/project-structure.md` | Add `data/` folder line |

---

## 5. Detailed Implementation Steps

### 5.1 Create `src/types/features.ts` (~12 lines)

```ts
export type FeatureVariant = 'company' | 'user'

export interface FeatureItem {
  icon: string
  text: string
  elaboration: string
}

export interface FeatureGroup {
  title: string
  accordionId: string
  variant: FeatureVariant
  features: FeatureItem[]
}
```

### 5.2 Create `src/data/features.ts` (~80 lines)

Holds the 7 company + 5 user items (text verbatim from §5) plus generated elaborations. Exports only `featureGroups`; the two arrays stay module-private.

**Company features (text from §5) + generated elaborations:**

| icon | text (§5) | elaboration (generated) |
|---|---|---|
| `bi-building` | Gestión centralizada de clientes y deudas | Todos tus clientes y sus saldos quedan en un único panel, sin repartir la información entre hojas de cálculo y mensajes sueltos. |
| `bi-upload` | Carga masiva de saldos y vencimientos | Cargá los importes de muchos clientes a la vez y actualizá los vencimientos en segundos, ahorrando trabajo repetitivo cada mes. |
| `bi-bar-chart` | Reportes claros de deudas, pagos y morosidad | Visualizá de un vistazo quién debe, cuánto y desde cuándo, para tomar decisiones rápidas y seguir la evolución de la cobranza. |
| `bi-bell` | Notificaciones automáticas al recibir comprobantes | Cuando un cliente sube un comprobante, el sistema te avisa al instante para que no tengas que revisar manualmente cada canal. |
| `bi-check2-circle` | Validación ágil de pagos y generación automática de recibos | Confirmá los pagos en pocos clics y dejá que el sistema arme el recibo correspondiente, sin trabajo manual extra. |
| `bi-clock-history` | Historial completo y trazabilidad por cliente | Reconstruí el recorrido de cada cliente: deudas, comprobantes y validaciones, todo ordenado y disponible para consulta. |
| `bi-diagram-3` | Conciliación asistida (el sistema cruza información automáticamente y permite revisión manual) | El sistema propone los cruces entre deudas, comprobantes y transferencias; vos solo revisás y confirmás los casos dudosos. |

**User features (text from §5) + generated elaborations:**

| icon | text (§5) | elaboration (generated) |
|---|---|---|
| `bi-person-badge` | Los clientes ingresan con un identificador (código de cliente, DNI + unidad, etc.) preconfigurado. No necesitan registrarse ni crear cuenta. | Sin contraseñas que olvidar ni formularios de registro. Tus clientes acceden directamente y consultan su estado al instante. |
| `bi-search` | Consulta inmediata de deuda y vencimientos | En cualquier momento y desde el celular, tus clientes saben exactamente cuánto deben y cuándo vence cada concepto. |
| `bi-cloud-upload` | Subida sencilla de comprobantes desde el celular | Con una foto del comprobante alcanza: el cliente lo sube en segundos y queda asociado automáticamente a su deuda. |
| `bi-eye` | Seguimiento en tiempo real del estado de sus pagos | El cliente ve si su comprobante está pendiente, validado o rechazado, sin necesidad de preguntar por mensaje. |
| `bi-download` | Descarga de un recibo una vez validado | Cuando el pago se valida, el cliente descarga su recibo en el momento, sin tener que pedírtelo ni esperar. |

Structure:
```ts
import type { FeatureItem, FeatureGroup } from '@/types/features'

const companyFeatures: FeatureItem[] = [ /* 7 items */ ]
const userFeatures: FeatureItem[] = [ /* 5 items */ ]

export const featureGroups: FeatureGroup[] = [
  { title: 'Para la empresa o profesional', accordionId: 'featuresCompanyAccordion', variant: 'company', features: companyFeatures },
  { title: 'Para el cliente final', accordionId: 'featuresUserAccordion', variant: 'user', features: userFeatures }
]
```

### 5.3 Rewrite `src/components/landing/FeaturesSection.vue` (~155 lines)

**Script:** import `useScrollReveal` + `featureGroups`; title/subtitle constants; `collapseId(accordionId, index)` helper (2 params, 1-line body).

**Template:** section → container → title/subtitle → `row g-4` → `v-for="group in featureGroups"` (`col-12 col-lg-6`) → group container with `:class="feature-group--${group.variant}"` → `<h3>` group title → `<div class="accordion">` → `v-for` items → `<h4 class="accordion-header">` → `<button class="accordion-button collapsed" data-bs-toggle="collapse" :data-bs-target :aria-expanded="false" :aria-controls>` with `<i :class="item.icon">` + `<span class="feature-text">` → collapse div (no `data-bs-parent` → multi-open) → `.accordion-body` with `{{ item.elaboration }}`.

**Heading hierarchy:** `<h2>` section → `<h3>` group → `<h4>` item.

**Style (scoped):** reuse `FaqSection` dark accordion overrides — `.accordion-item` (bg `--color-bg-card`, border, 8px radius, overflow hidden), `.accordion-button` (flex, `align-items: flex-start`, gap, chevron `::after` invert, primary focus ring), `.accordion-button:not(.collapsed)` (bg `--color-bg-card-alt`), `.accordion-body` (muted, indented `padding-left: 3.1rem` to align under header text). Group accent via `--group-color` on `.feature-group--company/--user`, applied to left border, title, and icons. Responsive `@media (max-width: 767.98px)`: title 1.75rem, group title 1.125rem, reduced button padding/font, body indent 2.6rem.

### 5.4 Update `.agent/project-structure.md`

Add under `# Folders in src/`:
```
- data/ - Static data collections (feature lists, content arrays)
```

### 5.5 Build & Lint

- `npm run build` (`vue-tsc -b && vite build`) — type-check + production build.
- `npm run lint` — ESLint + Prettier.
- Fix any reported errors; re-run until green.

### 5.6 Git

- Confirm on the feature branch created in critical-workflow Step 2.
- Read `.gitignore` + run `git status`; ensure `node_modules/`/`dist/` are not staged.
- Stage only: `src/types/features.ts`, `src/data/features.ts`, `src/components/landing/FeaturesSection.vue`, `.agent/project-structure.md`.
- Commit: `feat(features): expandable accordion features with per-item elaborations`.

---

## 6. Content Fidelity

- 7 company + 5 user `text` values = **verbatim** from §5.
- `elaboration` values = generated extra info (documented deviation, authorized by task option a).

---

## 7. Responsiveness

- Two columns (`col-lg-6`) desktop → single column (`col-12`) mobile.
- Accordion button = comfortable tap target; flex layout (icon left, text wraps, chevron right via Bootstrap `::after`).
- Mobile: smaller title/group-title, reduced button padding + font, reduced body indent, reduced group left padding.

---

## 8. Constraints Compliance

- File lines: types ~12, data ~80, component ~155 — all < 200; component < 125 ideal.
- Method body ≤ 50 lines; nesting ≤ 2; `collapseId` has 2 params.
- English code, Spanish visible text; private module arrays (only `featureGroups` exported); self-documenting; Bootstrap native Accordion; no `v-html`.

---

## 9. Out of Scope

- No code/file modifications in this step.
- UseCasesSection, FaqSection, App.vue/navbar belong to other tasks.
