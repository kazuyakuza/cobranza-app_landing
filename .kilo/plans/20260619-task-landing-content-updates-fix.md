# Fix Plan: Landing Page Content Updates — Code Review Findings

## Date

2026-06-19

## Source

- Implementation plan: `.kilo/plans/20260619-task-landing-content-updates.md`
- TODO file: `.agent/todos/20260619/20260619-todo-0.md`
- Reviewed files:
  - `src/components/landing/SolutionSection.vue`
  - `src/components/landing/HowItWorksSection.vue`
  - `.agent/project-info/landing-content.es.md`

---

## Issues Found

### 1. `SolutionSection.vue` exceeds max-lines-per-file rule

- **Rule**: `max-lines-per-file.md` — source files in `src/` must not exceed 200 lines.
- **Current state**: `SolutionSection.vue` is 203 lines.
- **Severity**: Must fix.
- **Cause**: The grid-based restructuring added new CSS rules; the file now slightly exceeds the limit.

### 2. Minor spelling deviation from literal TODO text (informational)

- **TODO requested**: `El sistema envia recordatorios...`
- **Implemented**: `El sistema envía recordatorios...`
- **Note**: The implementation uses the grammatically correct Spanish form (accented "envía"), as documented in the implementation plan. No change required unless the literal TODO spelling must be preserved.

---

## Fix Steps

### Step 1 — Reduce `SolutionSection.vue` to ≤ 200 lines

Remove redundant blank lines between the objects in `comparisonRows` and optionally tighten CSS whitespace.

#### 1.1 Compact `comparisonRows` array

Current block (lines 16-34) contains a blank line after every object. Change from:

```ts
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
```

To:

```ts
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
```

This removes 4 blank lines, bringing the file to 199 lines total.

#### 1.2 Alternative / additional CSS compaction (if desired)

If the array compaction alone is not enough or is deemed undesirable, also remove the blank line between `.comparison-heading` and `.comparison-heading--antes` by writing:

```css
.comparison-heading {
  font-size: 1.25rem;
  font-weight: 700;
  display: flex;
  align-items: center;
}
.comparison-heading--antes { color: var(--color-pain); }
.comparison-heading--despues { color: var(--color-accent); }
```

This saves one additional line.

### Step 2 — Verify line count

Run:

```powershell
(Get-Content src/components/landing/SolutionSection.vue).Length
```

Expected result: ≤ 200.

### Step 3 — Re-run lint and build

From project root:

```bash
npm run lint
npm run build
```

Expected: lint reports no errors in `SolutionSection.vue` or `HowItWorksSection.vue` (pre-existing errors in other files are out of scope), and `vue-tsc -b && vite build` succeeds.

### Step 4 — Visual regression check

Open the landing page and confirm:

- Solution section still renders 5 comparison rows.
- Antes/Después cells in each row remain equal height.
- Mobile view still stacks cells per row with Antes/Después labels.
- No "Próximamente..." note appears.

---

## Files Affected

- `src/components/landing/SolutionSection.vue` — remove redundant blank lines to satisfy `max-lines-per-file`.

## Files NOT Changed

- `src/components/landing/HowItWorksSection.vue` — complies with rules (200 lines, no new issues).
- `.agent/project-info/landing-content.es.md` — content matches component strings; no issues.

## Verification Checklist

| # | Check | Expected |
|---|-------|----------|
| 1 | `SolutionSection.vue` line count | ≤ 200 |
| 2 | `npm run lint` on reviewed files | No errors in `SolutionSection.vue` or `HowItWorksSection.vue` |
| 3 | `npm run build` | Success |
| 4 | Visual check | 5 rows, equal height, mobile stack, no upcoming note |
