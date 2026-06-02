# Implementation Plan: Task A — Content + Component Update

**Date:** 2026-06-02
**Plan ID:** 20260602-task-a-content-update
**Scope:** Update `.agent/project-info/landing-content.es.md` §4 and `src/components/landing/UseCasesSection.vue` with improved Spanish text per TODO-09.

---

## Verification of Current State

### File 1: `.agent/project-info/landing-content.es.md`
- Line 60: `**Administración de Expensas**` (needs update)
- Line 62: `1. La administradora carga las expensas del mes (individual o masivamente).` (needs update)
- Line 63: `2. Cada propietario o inquilino accede con su ID de unidad y consulta el monto exacto y fecha de vencimiento.` (needs update)
- Line 64: `3. Realiza la transferencia y sube el comprobante (foto o PDF) directamente en la plataforma.` (needs update)
- Line 70: `El mismo flujo se aplica a honorarios profesionales, cuotas educativas, alquileres y otros cobros.` (needs update)

### File 2: `src/components/landing/UseCasesSection.vue`
- Line 24: `const detailedExampleTitle = 'Administración de Expensas'` (needs update)
- Line 27: `'La administradora carga las expensas del mes (individual o masivamente).'` (needs update)
- Line 28: `'Cada propietario o inquilino accede con su ID de unidad y consulta el monto exacto y fecha de vencimiento.'` (needs update)
- Line 29: `'Realiza la transferencia y sube el comprobante (foto o PDF) directamente en la plataforma.'` (needs update)
- Lines 36-37: `const closingNote = 'Un flujo similar se aplica a honorarios profesionales, cuotas educativas, alquileres y otros cobros.'` (needs update)

---

## Exact Edit Steps

### Edit 1: Content File — Detailed Example Title

**File:** `.agent/project-info/landing-content.es.md`
**Line:** 60
**Operation:** Replace title text.

```
**Administración de Expensas**
```
→
```
**Ejemplo práctico: Administración de Expensas con Cobranza App**
```

### Edit 2: Content File — Step 1 Wording

**File:** `.agent/project-info/landing-content.es.md`
**Line:** 62
**Operation:** Replace parenthetical phrasing.

```
1. La administradora carga las expensas del mes (individual o masivamente).
```
→
```
1. La administradora carga las expensas del mes (de forma individual o masiva).
```

### Edit 3: Content File — Step 2 Article Addition

**File:** `.agent/project-info/landing-content.es.md`
**Line:** 63
**Operation:** Add missing article "la".

```
2. Cada propietario o inquilino accede con su ID de unidad y consulta el monto exacto y fecha de vencimiento.
```
→
```
2. Cada propietario o inquilino accede con su ID de unidad y consulta el monto exacto y la fecha de vencimiento.
```

### Edit 4: Content File — Step 3 Subject Clarification

**File:** `.agent/project-info/landing-content.es.md`
**Line:** 64
**Operation:** Clarify subject and add "bancaria".

```
3. Realiza la transferencia y sube el comprobante (foto o PDF) directamente en la plataforma.
```
→
```
3. Cada propietario o inquilino realiza la transferencia bancaria y sube el comprobante (foto o PDF) directamente en la plataforma.
```

### Edit 5: Content File — Closing Note

**File:** `.agent/project-info/landing-content.es.md`
**Line:** 70
**Operation:** Replace closing note text.

```
El mismo flujo se aplica a honorarios profesionales, cuotas educativas, alquileres y otros cobros.
```
→
```
Este mismo flujo se aplica a honorarios profesionales, cuotas educativas, alquileres, gimnasios y cualquier otro tipo de cobro recurrente o variable.
```

### Edit 6: Component — Detailed Example Title

**File:** `src/components/landing/UseCasesSection.vue`
**Line:** 24
**Operation:** Update variable value.

```ts
const detailedExampleTitle = 'Administración de Expensas'
```
→
```ts
const detailedExampleTitle = 'Ejemplo práctico: Administración de Expensas con Cobranza App'
```

### Edit 7: Component — Step 1 Wording

**File:** `src/components/landing/UseCasesSection.vue`
**Line:** 27
**Operation:** Update string literal.

```ts
  'La administradora carga las expensas del mes (individual o masivamente).',
```
→
```ts
  'La administradora carga las expensas del mes (de forma individual o masiva).',
```

### Edit 8: Component — Step 2 Article Addition

**File:** `src/components/landing/UseCasesSection.vue`
**Line:** 28
**Operation:** Add missing article "la".

```ts
  'Cada propietario o inquilino accede con su ID de unidad y consulta el monto exacto y fecha de vencimiento.',
```
→
```ts
  'Cada propietario o inquilino accede con su ID de unidad y consulta el monto exacto y la fecha de vencimiento.',
```

### Edit 9: Component — Step 3 Subject Clarification

**File:** `src/components/landing/UseCasesSection.vue`
**Line:** 29
**Operation:** Clarify subject and add "bancaria".

```ts
  'Realiza la transferencia y sube el comprobante (foto o PDF) directamente en la plataforma.',
```
→
```ts
  'Cada propietario o inquilino realiza la transferencia bancaria y sube el comprobante (foto o PDF) directamente en la plataforma.',
```

### Edit 10: Component — Closing Note

**File:** `src/components/landing/UseCasesSection.vue`
**Lines:** 36-37
**Operation:** Update variable value.

```ts
const closingNote =
  'Un flujo similar se aplica a honorarios profesionales, cuotas educativas, alquileres y otros cobros.'
```
→
```ts
const closingNote =
  'Este mismo flujo se aplica a honorarios profesionales, cuotas educativas, alquileres, gimnasios y cualquier otro tipo de cobro recurrente o variable.'
```

---

## Post-Implementation Verification Steps

1. Read both files after edits to confirm all 10 replacements applied correctly.
2. Run `npm run build` to ensure no compilation errors.
3. Confirm `UseCasesSection.vue` renders the updated title, steps, and closing note without layout breakage.
4. Confirm content in `landing-content.es.md` matches the TODO-09 specification exactly.

---

## Compliance Checklist

- [ ] All user-visible text remains in neutral Spanish.
- [ ] Component logic and comments remain in English.
- [ ] No unrelated code or styles modified.
- [ ] Changes limited to the two files listed above.
