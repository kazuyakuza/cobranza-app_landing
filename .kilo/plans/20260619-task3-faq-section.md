# Plan — Task 3: Update FAQ Section

- **TODO**: `.agent/todos/20260619/20260619-todo-1.md` → Task 3 (Update FAQ Section)
- **Date**: 2026-06-19
- **Step**: Critical Workflow 4.1 (Analysis & Planning)
- **Target component**: `src/components/landing/FaqSection.vue`

---

## 1. Pre-Analysis

### 1.1 Current State

`src/components/landing/FaqSection.vue` (184 lines) renders a single Bootstrap 5 accordion
with **9** inline Spanish Q&A pairs. Behavior is **multi-open** (collapse divs have no
`data-bs-parent`, so multiple items can stay expanded). The first item is open by default
(`:class="{ collapsed: index !== 0 }"` / `:class="{ show: index === 0 }"`). Dark-theme
overrides use `--color-bg-card` / `--color-bg-card-alt` / `--color-text-on-dark` variables.
Background is `--color-bg-card-alt`. Scroll reveal via `useScrollReveal()`.

### 1.2 Required Change

Expand from 9 → **17** questions using the exact Spanish text in
`.agent/project-info/landing-content.es.md` §8 (Preguntas Frecuentes). The task suggests
grouping into categories (Empresa, Clientes, Conciliación, etc.) when the list becomes too
long. 17 items is too long for a flat list, so grouping is adopted.

### 1.3 Ambiguities Resolved

| Ambiguity | Resolution | Rationale |
|---|---|---|
| Group or not? | **Group** into 4 categories | 17 items is too long flat; task explicitly suggests categories; matches existing FeaturesSection grouped pattern |
| How many categories? | **4**: General, Para la empresa o profesional, Para tus clientes, Conciliación y pagos | Balances granularity vs clutter; reuses the company/user semantic split already in the codebase; covers all 17 questions cleanly |
| Single-open or multi-open accordion? | **Multi-open** (no `data-bs-parent`) | Consistent with existing FaqSection + FeaturesSection; better FAQ UX (users compare answers) |
| First item open on load? | **All collapsed on load** | 4 groups × first-item-open would show 4 expanded answers at once — overwhelming. All-collapsed is cleaner for 17 items (matches FeaturesSection) |
| Layout: grid or stacked? | **Single-column stacked groups** | FAQ accordions expand tall; 2-column grid causes uneven column heights. Stacked is the standard clean FAQ pattern and most robust for mobile |
| Color coding per group? | **Yes, restrained** — 4 variants mapped to 2 colors (blue/emerald) via `--group-color` | Reuses FeaturesSection `--group-color` pattern; visual rhythm without clutter |
| Q14 secondary italic text? | **New optional `note?` field** on `FaqItem` | Q14 has a main answer + an italic user-quote + contact line. Single `note` field rendered italic/muted preserves the content faithfully |
| Inline data vs extracted? | **Extract** to `src/types/faq.ts` + `src/data/faq.ts` | 17 items inline would exceed the 200-line file limit. Mirrors the FeaturesSection → features.ts convention |
| Navbar / App.vue changes? | **None** | `id="faq"` is preserved; navbar already links "Dudas" → `#faq`. No new IDs introduced |
| New folders? | **None** | `src/data/` and `src/types/` already exist; `.agent/project-structure.md` already lists them |

### 1.4 Constraints Check

- Max 200 lines per source file → data extracted; FaqSection.vue ≈ 150 lines, faq.ts ≈ 110 lines, types ≈ 15 lines. ✓
- Max 50 lines per method body → `collapseId` body is 1 line; no other functions. ✓
- Max 2 levels nesting → `v-for` nesting is 2 levels (group → item); no 3rd-level logic blocks. ✓
- Max 2 params per method → `collapseId(accordionId, index)` = 2 params. ✓
- English code, Spanish visible text → all identifiers English; all `question`/`answer`/`title` Spanish. ✓
- Bootstrap native Accordion → uses `accordion` / `accordion-item` / `accordion-button` / `collapse`. ✓
- Self-documenting, minimal comments → descriptive names (`faqGroups`, `collapseId`, `faq-note`). ✓
- Private members by default → no classes; module-scoped consts/functions are private to module by default. ✓
- Single-section boolean conditions → no compound boolean conditions present. ✓

---

## 2. High-Level Approach

1. Create `src/types/faq.ts` with `FaqVariant`, `FaqItem` (with optional `note`), `FaqGroup`.
2. Create `src/data/faq.ts` exporting `faqGroups` — 4 groups, 17 questions total, exact Spanish text from §8.
3. Rewrite `FaqSection.vue` to import `faqGroups`, render grouped accordions (single-column stacked, color-coded group headings, multi-open, all collapsed), with a `collapseId` helper and conditional `note` rendering.
4. Verify line counts, run `npm run lint` and `npm run build`.
5. Verify content parity (17 questions, exact text) and mobile responsiveness.
6. Commit with a meaningful message.

The pattern is a direct adaptation of `FeaturesSection.vue` + `src/data/features.ts` + `src/types/features.ts`, already proven in this codebase.

---

## 3. Detailed Implementation Steps

### Step 1 — Create types file `src/types/faq.ts`

**Path**: `src/types/faq.ts` (new file)
**Action**: create with `vscode-mcp-server_create_file_code`.

```ts
export type FaqVariant = 'general' | 'company' | 'user' | 'conciliation'

export interface FaqItem {
  question: string
  answer: string
  note?: string
}

export interface FaqGroup {
  title: string
  accordionId: string
  variant: FaqVariant
  faqs: FaqItem[]
}
```

**Verify**: file exists, ~15 lines, no lint errors.

---

### Step 2 — Create data file `src/data/faq.ts`

**Path**: `src/data/faq.ts` (new file)
**Action**: create with `vscode-mcp-server_create_file_code`.

Content (exact Spanish text from `landing-content.es.md` §8):

```ts
import type { FaqItem, FaqGroup } from '@/types/faq'

const generalFaqs: FaqItem[] = [
  {
    question: '¿Para quién está pensado Cobranza App?',
    answer:
      'Principalmente para PyMEs, profesionales, monotributistas y administradores que necesitan organizar y agilizar su proceso de cobranza.'
  },
  {
    question: '¿Es una aplicación móvil o web?',
    answer:
      'Es un sistema web responsive. Los clientes finales pueden usarlo cómodamente desde el celular. La administración es más cómoda desde computadora, aunque también es accesible desde móvil.'
  },
  {
    question: '¿Puedo solicitar funcionalidades específicas?',
    answer:
      'Sí. Estamos en etapa Beta y valoramos mucho el feedback. Si necesitás alguna funcionalidad, contáctanos.'
  }
]

const companyFaqs: FaqItem[] = [
  {
    question: '¿Hay límite de clientes?',
    answer:
      'No. No existe límite en la cantidad de clientes. El cobro depende únicamente del volumen de pagos procesados.'
  },
  {
    question: '¿Puedo tener varios usuarios administradores?',
    answer: 'Sí. Podrás invitar a otros miembros de tu equipo sin costo extra.'
  },
  {
    question: '¿Puedo exportar reportes e información?',
    answer:
      'Sí, podrás exportar listados de deudas, pagos y reportes de conciliación.'
  },
  {
    question: '¿Puedo importar deudas desde Excel o CSV?',
    answer:
      'Es una funcionalidad que será agregada según lo demanden nuestros usuarios.'
  },
  {
    question: '¿Los recibos tienen validez fiscal?',
    answer:
      'Actualmente generan recibos válidos internamente. La integración con AFIP (facturación electrónica) está planificada según necesidades de los usuarios.'
  },
  {
    question: '¿Cómo se protegen los datos y comprobantes?',
    answer:
      'La seguridad es una prioridad. Todos los datos y archivos se almacenan de forma segura, con acceso restringido y encriptado.'
  }
]

const userFaqs: FaqItem[] = [
  {
    question: '¿Mis clientes necesitan registrarse o crear una cuenta?',
    answer:
      'No. Solo necesitan ingresar su código identificatorio y/o datos definidos por la empresa.'
  },
  {
    question: '¿Cómo funcionan las notificaciones?',
    answer:
      'Actualmente mediante email (recordatorios y alertas de nuevos comprobantes). Próximamente incorporaremos WhatsApp y otros canales según demanda.'
  },
  {
    question: '¿Qué medios de pago acepta?',
    answer:
      'El cliente paga por fuera (principalmente transferencia) y sube el comprobante. En etapas posteriores incorporaremos pasarelas de pago integradas.'
  }
]

const conciliationFaqs: FaqItem[] = [
  {
    question: '¿Cómo se realiza la conciliación?',
    answer:
      'En esta primera etapa es semi-automática: el sistema ayuda a cruzar extractos bancarios, comprobantes y deudas. No solicitamos ni guardamos credenciales bancarias.'
  },
  {
    question: '¿Cobranza App accede a mis cuentas bancarias o mueve dinero?',
    answer:
      'No. Los pagos se realizan por fuera de la plataforma (transferencias bancarias habituales). Cobranza App solo organiza y ayuda a conciliar la información.',
    note: '"Me gustaría que el sistema acceda y descarga el resumen de mi banco de forma autónoma" Contáctanos y podemos buscar una solución.'
  },
  {
    question: '¿Qué pasa si el sistema no logra cruzar automáticamente uno o más pagos?',
    answer:
      'Puedes revisar y confirmar manualmente los casos excepcionales en cualquier momento.'
  },
  {
    question: '¿Funciona con pagos parciales, montos variables y cuotas?',
    answer:
      'Sí. El sistema está diseñado para manejar cobros variables y recurrentes.'
  },
  {
    question: '¿Qué formatos de extracto bancario soporta?',
    answer:
      'Inicialmente soporta los formatos más comunes (PDF y CSV) de los principales bancos. Se irán agregando más según los comentarios y experiencias que nos hagan llegar.'
  }
]

export const faqGroups: FaqGroup[] = [
  {
    title: 'General',
    accordionId: 'faqGeneralAccordion',
    variant: 'general',
    faqs: generalFaqs
  },
  {
    title: 'Para la empresa o profesional',
    accordionId: 'faqCompanyAccordion',
    variant: 'company',
    faqs: companyFaqs
  },
  {
    title: 'Para tus clientes',
    accordionId: 'faqUserAccordion',
    variant: 'user',
    faqs: userFaqs
  },
  {
    title: 'Conciliación y pagos',
    accordionId: 'faqConciliationAccordion',
    variant: 'conciliation',
    faqs: conciliationFaqs
  }
]
```

**Verify**:
- 4 groups, item counts 3 + 6 + 3 + 5 = **17** total.
- Only `conciliationFaqs[1]` (¿Cobranza App accede a mis cuentas bancarias...?) has a `note`.
- Text matches §8 verbatim (note: §8 uses corrected "uno o más pagos", NOT the TODO's typo "uno o mas pago/s" — use the content file version).
- File < 200 lines (≈110 lines).

---

### Step 3 — Rewrite `src/components/landing/FaqSection.vue`

**Path**: `src/components/landing/FaqSection.vue` (existing file, full rewrite)
**Action**: read current file first (already done in planning), then overwrite with
`vscode-mcp-server_create_file_code` (`overwrite: true`).

Full content:

```vue
<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal'
import { faqGroups } from '@/data/faq'

useScrollReveal()

const sectionTitle = 'Preguntas Frecuentes'

function collapseId(accordionId: string, index: number): string {
  return `${accordionId}Collapse${index}`
}
</script>

<template>
  <section id="faq" class="faq-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-9">
          <h2 data-reveal class="faq-title">{{ sectionTitle }}</h2>

          <div class="faq-groups">
            <div
              v-for="group in faqGroups"
              :key="group.accordionId"
              :class="[`faq-group--${group.variant}`, 'faq-group']"
              data-reveal
            >
              <h3 class="faq-group-title">{{ group.title }}</h3>

              <div class="accordion">
                <div
                  v-for="(item, index) in group.faqs"
                  :key="item.question"
                  class="accordion-item"
                >
                  <h4 class="accordion-header">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      :data-bs-target="`#${collapseId(group.accordionId, index)}`"
                      aria-expanded="false"
                      :aria-controls="collapseId(group.accordionId, index)"
                    >
                      {{ item.question }}
                    </button>
                  </h4>
                  <div
                    :id="collapseId(group.accordionId, index)"
                    class="accordion-collapse collapse"
                  >
                    <div class="accordion-body">
                      <p class="faq-answer">{{ item.answer }}</p>
                      <p v-if="item.note" class="faq-note">{{ item.note }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

.faq-groups {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.faq-group {
  border-left: 4px solid var(--group-color);
  border-radius: 0 8px 8px 0;
  overflow: hidden;
}

.faq-group--general {
  --group-color: var(--color-primary);
}

.faq-group--company {
  --group-color: var(--color-accent);
}

.faq-group--user {
  --group-color: var(--color-primary);
}

.faq-group--conciliation {
  --group-color: var(--color-accent);
}

.faq-group-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  line-height: 1.3;
  padding-left: 1.5rem;
  color: var(--group-color);
}

.accordion-item {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  margin-bottom: 0.75rem;
  overflow: hidden;
}

.accordion-item:last-of-type {
  margin-bottom: 0;
}

.accordion-button {
  background: var(--color-bg-card);
  color: var(--color-text-on-dark);
  font-size: 1rem;
  font-weight: 600;
  padding: 1.25rem 1.5rem;
}

.accordion-button:not(.collapsed) {
  background: var(--color-bg-card-alt);
  color: var(--color-text-on-dark);
  box-shadow: none;
}

.accordion-button::after {
  filter: brightness(0) invert(0.85);
}

.accordion-button:focus {
  box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.5);
  border-color: var(--color-primary);
}

.accordion-body {
  color: var(--color-text-on-dark-muted);
  font-size: 1rem;
  line-height: 1.6;
  padding: 1.25rem 1.5rem;
}

.faq-answer {
  margin: 0;
}

.faq-note {
  margin: 1rem 0 0;
  padding-left: 1rem;
  border-left: 2px solid var(--group-color);
  font-style: italic;
  font-size: 0.9375rem;
  color: var(--color-text-on-dark-dim);
}

.accordion-collapse {
  transition: height 0.35s ease;
}

@media (max-width: 767.98px) {
  .faq-title {
    font-size: 1.75rem;
  }

  .faq-group-title {
    font-size: 1.125rem;
    padding-left: 1rem;
  }

  .accordion-button {
    font-size: 0.9375rem;
    padding: 1rem 1.25rem;
  }

  .accordion-body {
    font-size: 0.9375rem;
    padding: 1rem 1.25rem;
  }

  .faq-note {
    font-size: 0.875rem;
  }
}
</style>
```

**Key points**:
- `id="faq"` preserved → navbar "Dudas" link and scroll-spy keep working; no App.vue/navbar changes.
- Multi-open accordion: no `data-bs-parent` on collapse divs (multiple items can stay open).
- All items collapsed on load: `class="accordion-button collapsed"` + `aria-expanded="false"`, no `show` class.
- Unique collapse IDs per group via `collapseId(group.accordionId, index)`.
- Conditional `note` rendering: `<p v-if="item.note" class="faq-note">`.
- Color-coded group headings via `--group-color` (blue for general/user, emerald for company/conciliation).
- `.faq-note`: italic, `--color-text-on-dark-dim`, left-border accent in the group color.
- Mobile media query scales title (1.75rem), group-title (1.125rem), button/body font (0.9375rem) and padding.
- Background unchanged: `--color-bg-card-alt` (per style-guide §3.1 row 8).

**Verify**: file ≈ 150 lines (< 200).

---

### Step 4 — Line-count verification

Run a quick check on the three files (exclude blank/comment lines mentally; rule is 200 max for src files):
- `src/types/faq.ts` ≈ 15 lines ✓
- `src/data/faq.ts` ≈ 110 lines ✓
- `src/components/landing/FaqSection.vue` ≈ 150 lines ✓

If any file exceeds 200 lines, refactor before proceeding (e.g., split data further — not expected here).

---

### Step 5 — Lint and build

Console commands (run from project root `C:\projects\cobranza-app\landing`):

```powershell
npm run lint
```

Expected: no errors. If ESLint reports issues (e.g., prettier formatting), fix them — do not disable rules.

```powershell
npm run build
```

Expected: `vue-tsc -b` type-check passes (validates `FaqItem.note?` optional usage and imports) and `vite build` produces `dist/`. No TypeScript errors.

**No test suite exists** (`package.json` has no `test` script) — skip unit tests. Note this in the completion summary.

---

### Step 6 — Content parity & responsiveness verification

**Content parity** (manual diff against `landing-content.es.md` §8):
- [ ] All 17 questions present (9 original + 8 new).
- [ ] Each `answer` matches §8 verbatim.
- [ ] Q14 (`¿Cobranza App accede a mis cuentas bancarias o mueve dinero?`) has its `note` with the italic quote + contact line.
- [ ] Q15 uses §8's "uno o más pagos" (not the TODO typo).
- [ ] Group titles: General / Para la empresa o profesional / Para tus clientes / Conciliación y pagos.

**Responsiveness** (run `npm run dev`, inspect in browser + mobile viewport ≤ 767px):
- [ ] Section title scales to 1.75rem on mobile.
- [ ] Group titles scale to 1.125rem on mobile.
- [ ] Accordion buttons are tappable (≥44px effective height via 1rem vertical padding).
- [ ] Accordion expand/collapse animation smooth (`height 0.35s ease`).
- [ ] Multiple items can be open simultaneously (multi-open).
- [ ] All items collapsed on initial load.
- [ ] `.faq-note` (Q14) readable on mobile (0.875rem, italic, left border visible).
- [ ] No horizontal overflow; groups stack vertically with 2rem gap.
- [ ] Navbar "Dudas" link still scrolls to `#faq`; scroll-spy highlights FAQ section.

---

### Step 7 — Git commit

Follow [Gitignore Compliance Rule](../.kilo/rules/gitignore-compliance.md):

```powershell
git status
```

Ensure no `.gitignore`-matching files are staged (no `node_modules/`, `dist/`, `.tsbuildinfo`, `.kilo/agent-manager.json`). Only the three source files should appear.

Stage only the intended files (do NOT use `git add .` blindly):

```powershell
git add src/types/faq.ts src/data/faq.ts src/components/landing/FaqSection.vue
```

Commit (conventional commits style, matching repo history):

```powershell
git commit -m "feat(faq): expand FAQ to 17 questions grouped by category"
```

**Do NOT push** — push happens at Critical Workflow Step 5 (TODO File Completion) to `origin` only.

---

## 4. Verification Checklist (for Step 4.5)

- [ ] `src/types/faq.ts` created with `FaqVariant`, `FaqItem` (optional `note`), `FaqGroup`.
- [ ] `src/data/faq.ts` exports `faqGroups` (4 groups, 17 items, exact §8 Spanish text).
- [ ] `FaqSection.vue` imports `faqGroups`, renders grouped accordions, multi-open, all-collapsed.
- [ ] `id="faq"` preserved; no App.vue / Navbar changes.
- [ ] All three files < 200 lines.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes (type-check + build).
- [ ] 17 questions match §8 verbatim; Q14 note present; Q15 wording corrected.
- [ ] Mobile responsiveness confirmed (title/group-title/button scaling, no overflow, tappable).
- [ ] Commit created with meaningful message; no gitignored files staged.

---

## 5. Documentation Notes (for Step 4.4 — Docs Specialist)

The docs-specialist step should update `.agent/project-info/context.md` "Recent Changes"
with an entry such as:

> **2026-06-19**: FaqSection expanded — 9 → 17 questions grouped into 4 categories
> (General, Para la empresa o profesional, Para tus clientes, Conciliación y pagos);
> types extracted to `src/types/faq.ts` (`FaqVariant`, `FaqItem` with optional `note`,
> `FaqGroup`); data extracted to `src/data/faq.ts` (`faqGroups`); multi-open accordion,
> all-collapsed on load; color-coded group headings via `--group-color` (blue/emerald);
> `.faq-note` renders Q14 italic secondary text; self-documenting code; no comments needed.

Also update the "FaqSection Component Details" block in context.md: change "9 Spanish
Q&A pairs" → "17 Spanish Q&A pairs across 4 categories", note multi-open + all-collapsed
behavior, and reference the new types/data files.

No README or style-guide changes required (no new CSS variables, no new sections, no new
folders — `data/` and `types/` already listed in `.agent/project-structure.md`).

---

## 6. Out of Scope (must NOT be done in this task)

- Do NOT modify `App.vue`, `Navbar.vue`, `Footer.vue`, or any other component.
- Do NOT change the FAQ section background (`--color-bg-card-alt`) or section `id`.
- Do NOT add new CSS variables to `variables.css` or global rules to `base.css`.
- Do NOT create new folders (data/ and types/ already exist).
- Do NOT update `.agent/project-structure.md` (no folder changes).
- Do NOT push to any remote (handled at Critical Workflow Step 5).
- Do NOT mark Task 3 as `[DONE]` in the TODO file (that is Step 4.6).
- Task 4 (Integration & Polish) is a separate task — do NOT start it here.

---

## 7. Files Touched

| File | Action | Lines (est.) |
|---|---|---|
| `src/types/faq.ts` | create | ~15 |
| `src/data/faq.ts` | create | ~110 |
| `src/components/landing/FaqSection.vue` | rewrite | ~150 |

No other files modified.
