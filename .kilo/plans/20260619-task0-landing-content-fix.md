# Fix Plan: Task 0 — Update Spanish Content File

## Issue Found

**Location:** `.agent/project-info/landing-content.es.md`, section `8. Preguntas Frecuentes (FAQ)`.

**Question:** `¿Puedo exportar reportes e información?`

**Deviation:** The answer in the content file reads:

```text
Sí, podrás exportar listados de deudas, pagos y reportes de conciliación.
```

The TODO specifies:

```text
Sí, podrás exportar listados deudas, pagos y reportes de conciliación.
```

The content file contains an extra `de` between `listados` and `deudas`.

## Fix Steps

1. Open `.agent/project-info/landing-content.es.md`.
2. Locate the FAQ answer for `¿Puedo exportar reportes e información?`.
3. Update the answer to match the TODO exactly:

   ```text
   Sí, podrás exportar listados deudas, pagos y reportes de conciliación.
   ```

   Alternatively, if the grammatical correction was intentional, update the TODO file `.agent/todos/20260619/20260619-todo-1.md` to read `listados de deudas` so the specification matches the content file.

## Verification

- Confirm the FAQ answer matches the chosen source of truth word-for-word.
- Confirm no other FAQ, feature, or use-case text was modified.
