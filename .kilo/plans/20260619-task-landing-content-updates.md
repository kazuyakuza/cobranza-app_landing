# Implementation Plan: Landing Page Content Updates (Task 4.1)

## Date

2026-06-19

## Source

- TODO file: `.agent/todos/20260619/20260619-todo-0.md`
- Global plan: `.kilo/plans/20260619-landing-content-updates.md`

## Task

Update Spanish landing content in the Solution section, How It Works section, and the content source file. Plus fix horizontal alignment of the Antes/Después comparison rows.

---

## Pre-Analysis

### Current State (verified)

**`src/components/landing/SolutionSection.vue` (189 lines)**

- `comparisonRows: ComparisonRow[]` holds 4 rows (lines 16-33).
- `upcomingNote` constant at line 38; rendered in template lines 84-86; styled by `.upcoming-note` (lines 158-167) and mobile rule (lines 185-187).
- Comparison layout = two separate `<ul>` lists inside two `col-md-6` columns (template lines 52-83). Each `<li>` is independent → per-row heights across the two columns do NOT match when text lengths differ.
- CSS variables used (`--color-pain`, `--color-accent`, `--color-bg-card`, `--color-border`, `--color-text-on-dark`, `--color-text-on-dark-muted`) already exist and are in use.

**`src/components/landing/HowItWorksSection.vue` (200 lines)**

- `stepTexts` array (lines 6-14), 7 entries.
- `stepKinds` array (lines 15-23): `empresa, cliente, cliente, empresa, sistema, empresa, resultado` — unchanged.
- `actorLabels` (lines 31-36): `empresa:'Empresa'`, `cliente:'Cliente'`, `sistema:'Automático'`, `resultado:'Recibo'`.
- Template/CSS unchanged.

**`src/types/how-it-works.ts` (8 lines)**

- `HowItWorksStepKind = 'empresa' | 'cliente' | 'sistema' | 'resultado'`. No new kind required → **no change**.

**`.agent/project-info/landing-content.es.md` (192 lines)**

- §3 table (lines 45-50) has 4 rows; header right column = "Con Cobranza App".
- §3 "Nota sobre carga masiva" at line 54.
- §3.5 steps (lines 65-71), 7 entries, no actor tags in this file.

### Usages (verified via search)

- `upcomingNote` / `upcoming-note` / "Próximamente podrás importar" → only in `SolutionSection.vue` (5 matches).
- "La empresa carga las deudas" / "La empresa sube el extracto" / "Automático" / "Recibo" → only in `HowItWorksSection.vue` (4 matches).
- No external references to any changed string. Safe to edit in place.

### Build / Lint / Test (verified from `package.json`)

- Scripts: `dev` (vite), `build` (`vue-tsc -b && vite build`), `preview`, `lint` (`eslint .`).
- No `test` script → no unit tests to run. Verification = `npm run lint` + `npm run build` + visual check.

### Ambiguities / Considerations

1. **Horizontal alignment requires DOM restructure.** Two separate `<ul>` lists cannot share per-row heights via CSS alone. Plan restructures to a single `<ul>` with one grid row `<li>` per comparison pair. This is the only robust way to satisfy "same height per row".
2. **Mobile behavior change (documented).** Original `col-md-6` stacked all-Antes then all-Después on `<768px`. New layout stacks the two cells per row (Antes cell, then Después cell) with mobile-only labels, which is a clearer before/after reading. This change is a direct consequence of the user's explicit alignment request.
3. **`resultado` tag becomes "Cliente".** After the change, `cliente:'Cliente'` and `resultado:'Cliente'` share the same label text. This is exactly what the TODO requests ("instead of tag 'Recibo', use 'Cliente'"). Step 7 (receipt download) is performed by the client, so the label is semantically acceptable. No type conflict (`Record<HowItWorksStepKind, string>` allows duplicate values).
4. **Spelling.** Use "envía" (with accent) per the task requirements (neutral Spanish correct form), not "envia".
5. **Content file vs component heading mismatch.** Content file §3 right-column header is "Con Cobranza App"; component uses "Después". This is pre-existing and out of scope — not modified.
6. **Line-count rules.** `SolutionSection.vue` net change stays < 200 lines (removes ~17 lines, adds grid rules). `HowItWorksSection.vue` stays at 200 (in-place string edits only). Both within `max-lines-per-file` (≤200).

---

## High-Level Approach

1. Edit `SolutionSection.vue`: add 5th comparison row, remove `upcomingNote` (script + template + CSS), restructure comparison block to grid-per-row with equal-height cells + mobile labels.
2. Edit `HowItWorksSection.vue`: update 3 `actorLabels` values and 3 `stepTexts` entries (in-place).
3. Edit `landing-content.es.md`: add comparison table row, remove "Nota sobre carga masiva", update 3 step texts in §3.5.
4. Verify: `npm run lint`, `npm run build`, optional `npm run dev` visual check.
5. Commit with a meaningful message (implementer step 4.2).

---

## Detailed Steps

### Step 1 — `src/components/landing/SolutionSection.vue`

#### 1.1 Script: add 5th comparison row

In the `comparisonRows` array, append a 5th object after the "Clientes preguntando..." row (after current line 32, before the closing `]`):

```ts
  {
    before: 'Recordar deudas/pagos a clientes mediante WhatsApp/mail/chat/llamada',
    after: 'El sistema envía recordatorios a los clientes mediante notificaciones automáticas'
  }
```

#### 1.2 Script: remove `upcomingNote`

Delete the line:

```ts
const upcomingNote = 'Próximamente podrás importar deudas desde Excel o CSV en segundos.'
```

(Also remove the now-unused blank line if it leaves a double blank, to keep tidy.)

#### 1.3 Template: restructure comparison block

Replace the entire `<div data-reveal class="comparison-wrapper"> ... </div>` block (current lines 52-83) with:

```html
          <div data-reveal class="comparison-wrapper">
            <div class="comparison-headers">
              <h3 class="comparison-heading comparison-heading--antes">
                <i class="bi bi-x-circle me-2"></i>Antes
              </h3>
              <h3 class="comparison-heading comparison-heading--despues">
                <i class="bi bi-check-circle me-2"></i>Después
              </h3>
            </div>
            <ul class="comparison-list">
              <li
                v-for="(row, index) in comparisonRows"
                :key="index"
                class="comparison-row"
              >
                <div class="comparison-cell comparison-cell--antes">
                  <span class="comparison-cell-label">Antes</span>
                  <span class="comparison-text">{{ row.before }}</span>
                </div>
                <div class="comparison-cell comparison-cell--despues">
                  <span class="comparison-cell-label">Después</span>
                  <span class="comparison-text">{{ row.after }}</span>
                </div>
              </li>
            </ul>
          </div>
```

#### 1.4 Template: remove upcoming-note paragraph

Delete:

```html
          <p data-reveal class="upcoming-note">
            {{ upcomingNote }}
          </p>
```

#### 1.5 CSS: replace comparison rules + remove `.upcoming-note`

Replace the block from `.comparison-wrapper {` through the `.upcoming-note { ... }` rule (current lines 113-167) with:

```css
.comparison-wrapper {
  margin-bottom: 2rem;
}
.comparison-headers {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}
.comparison-heading {
  font-size: 1.25rem;
  font-weight: 700;
  display: flex;
  align-items: center;
}
.comparison-heading--antes {
  color: var(--color-pain);
}
.comparison-heading--despues {
  color: var(--color-accent);
}
.comparison-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.comparison-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}
.comparison-row:last-child {
  margin-bottom: 0;
}
.comparison-cell {
  display: flex;
  flex-direction: column;
  padding: 0.85rem 1rem;
  border-radius: 8px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
}
.comparison-cell--antes {
  border-left: 3px solid var(--color-pain);
}
.comparison-cell--despues {
  border-left: 3px solid var(--color-accent);
}
.comparison-cell-label {
  display: none;
}
.comparison-text {
  font-size: 0.95rem;
  line-height: 1.45;
  color: var(--color-text-on-dark-muted);
}
.comparison-cell--despues .comparison-text {
  color: var(--color-text-on-dark);
}
```

Keep `.solution-closing { ... }` unchanged.

Rationale: each `.comparison-row` is a 2-column grid; both cells stretch to the tallest cell's height → equal height per row (horizontal alignment).

#### 1.6 CSS: update mobile media query

Inside `@media (max-width: 767.98px)`, replace:

```css
  .comparison-heading {
    font-size: 1.1rem;
  }
  .upcoming-note {
    font-size: 0.9rem;
  }
```

with:

```css
  .comparison-heading {
    font-size: 1.1rem;
  }
  .comparison-headers {
    display: none;
  }
  .comparison-row {
    grid-template-columns: 1fr;
  }
  .comparison-cell-label {
    display: block;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 0.35rem;
  }
  .comparison-cell--antes .comparison-cell-label {
    color: var(--color-pain);
  }
  .comparison-cell--despues .comparison-cell-label {
    color: var(--color-accent);
  }
  .comparison-text {
    font-size: 0.9rem;
  }
```

Mobile result: headings hidden; each row stacks its two cells (Antes-labeled card above Después-labeled card); labels visible only on mobile.

---

### Step 2 — `src/components/landing/HowItWorksSection.vue`

#### 2.1 Update `actorLabels` (lines 31-36)

Replace:

```ts
const actorLabels: Record<HowItWorksStepKind, string> = {
  empresa: 'Empresa',
  cliente: 'Cliente',
  sistema: 'Automático',
  resultado: 'Recibo'
}
```

with:

```ts
const actorLabels: Record<HowItWorksStepKind, string> = {
  empresa: 'Negocio',
  cliente: 'Cliente',
  sistema: 'Sistema',
  resultado: 'Cliente'
}
```

#### 2.2 Update `stepTexts` (lines 6-14)

- Step 1 (index 0): replace `'La empresa carga las deudas (individual o masivamente).'` with `'Carga las deudas de tus clientes, individual o masivamente.'`
- Step 4 (index 3): replace `'La empresa sube el extracto bancario.'` with `'Sube tu extracto bancario al sistema.'`
- Step 5 (index 4): replace `'El sistema cruza automáticamente los comprobantes, transferencias y deudas.'` with `'El sistema cruza automáticamente los comprobantes, transferencias y deudas. Genera reportes y un resumen del resultante. Notifica a los clientes sobre el estado de su deuda.'`

No changes to `stepKinds`, `stepIcons`, `steps` mapping, template, or CSS.

---

### Step 3 — `.agent/project-info/landing-content.es.md`

#### 3.1 §3 — add comparison table row

After the 4th table row (line 50: `| Clientes preguntando constantemente cuánto deben | Clientes consultan su saldo por sí mismos en cualquier momento |`), add:

```
| Recordar deudas/pagos a clientes mediante WhatsApp/mail/chat/llamada | El sistema envía recordatorios a los clientes mediante notificaciones automáticas |
```

#### 3.2 §3 — remove "Nota sobre carga masiva"

Delete line 54:

```
**Nota sobre carga masiva:** Próximamente podrás importar deudas desde Excel o CSV en segundos.
```

Also delete the adjacent blank line (line 55) to avoid a double blank before the `---` separator. Result: closing statement (line 52), blank (line 53), `---` (line 56).

#### 3.3 §3.5 — update step texts (lines 65-71)

- Line 65: `1. La empresa carga las deudas (individual o masivamente).` → `1. Carga las deudas de tus clientes, individual o masivamente.`
- Line 68: `4. La empresa sube el extracto bancario.` → `4. Sube tu extracto bancario al sistema.`
- Line 69: `5. El sistema cruza automáticamente los comprobantes, transferencias y deudas.` → `5. El sistema cruza automáticamente los comprobantes, transferencias y deudas. Genera reportes y un resumen del resultante. Notifica a los clientes sobre el estado de su deuda.`

§3.5 contains no actor tags in this file, so no tag-label edits are needed here.

---

### Step 4 — Verify

Run from project root (`C:\projects\cobranza-app\landing`):

1. `npm run lint` — must pass with no errors.
2. `npm run build` — `vue-tsc -b && vite build` must succeed (type-check + production build).

If either fails, fix the reported issue and re-run before committing.

### Step 5 — Visual check (optional but recommended)

Start dev server (background): `npm run dev`. Open the printed local URL.

- Verify Solution section: 5 comparison rows; Antes/Después cells in each row have equal height; no "Próximamente..." note; new "Recordar deudas... / El sistema envía recordatorios..." row present.
- Resize to <768px: rows stack per pair with "Antes"/"Después" labels; no headings row.
- Verify How It Works section: tags show "Negocio" (steps 1,4,6), "Cliente" (steps 2,3,7), "Sistema" (step 5); step 1, 4, 5 texts match the new strings.
- Stop the dev server after checking.

### Step 6 — Commit (implementer, step 4.2)

Stage only the three changed files:

- `src/components/landing/SolutionSection.vue`
- `src/components/landing/HowItWorksSection.vue`
- `.agent/project-info/landing-content.es.md`

Suggested message:

```
feat(landing): update Solution & How It Works content, align comparison rows

- SolutionSection: add reminders comparison row, remove upcoming-import note,
  restructure Antes/Después to grid rows for equal-height alignment
- HowItWorksSection: relabel tags (Negocio/Sistema/Cliente), update step texts
- landing-content.es.md: sync §3 table and §3.5 steps with new texts
```

Follow [Gitignore Compliance Rule]: read `.gitignore`, run `git status`, ensure no `node_modules/` or other ignored paths are staged.

---

## Verification Checklist (mapped to TODO requirements)

| # | Requirement | Verified by |
|---|-------------|-------------|
| 1 | Remove "Próximamente podrás importar..." from La Solución | `upcomingNote` const, template `<p>`, and `.upcoming-note` CSS all deleted; grep returns 0 matches |
| 2 | Add comparison row (Antes: "Recordar deudas...", Después: "El sistema envía recordatorios...") | 5th entry in `comparisonRows`; renders as 5th row in both component and content file table |
| 3 | Antes/Después items horizontally aligned (same height per row) | `.comparison-row` grid 1fr 1fr; cells stretch to row height; visual check confirms aligned pairs |
| 4 | "empresa" tag → "negocio" | `actorLabels.empresa === 'Negocio'`; step 1/4/6 tags render "Negocio" |
| 5 | Step 1 text → "Carga las deudas de tus clientes, individual o masivamente." | `stepTexts[0]` matches; content file §3.5 line 1 matches |
| 6 | Step 4 text → "Sube tu extracto bancario al sistema." | `stepTexts[3]` matches; content file §3.5 line 4 matches |
| 7 | "Automático" tag → "Sistema" | `actorLabels.sistema === 'Sistema'`; step 5 tag renders "Sistema" |
| 8 | Step 5 text appends "Genera reportes y un resumen... Notifica a los clientes..." | `stepTexts[4]` ends with the appended sentence; content file §3.5 line 5 matches |
| 9 | "Recibo" tag → "Cliente" | `actorLabels.resultado === 'Cliente'`; step 7 tag renders "Cliente" |
| 10 | Update `landing-content.es.md` (§3 + §3.5) | Table row added, nota removed, 3 step texts updated; matches component strings exactly |
| 11 | Lint + build pass | `npm run lint` and `npm run build` exit 0 |

---

## Files Affected (summary)

- `src/components/landing/SolutionSection.vue` — edit (script + template + CSS)
- `src/components/landing/HowItWorksSection.vue` — edit (strings only)
- `.agent/project-info/landing-content.es.md` — edit (§3 table + nota, §3.5 steps)

## Files NOT changed

- `src/types/how-it-works.ts` — no new `HowItWorksStepKind` needed.

## Risks

- **Low.** Content/CSS-only edits; no new dependencies, no API/type changes.
- **Watch:** mobile comparison behavior changes from "grouped by column" to "per-row before/after with labels" — intentional and documented; confirm in visual check.
- **Watch:** ensure no leftover references to removed `upcomingNote` / `.upcoming-note` (grep after edit must return 0).
