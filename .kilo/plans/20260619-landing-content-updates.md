# Global Plan: Landing Page Content Updates

## Date
2026-06-19

## Source
TODO file: `.agent/todos/20260619/20260619-todo-0.md`

## Global Pre-Analysis

All requested changes are **content/text updates** to two existing Vue components and the content source file. No new components, no new dependencies, no structural changes. The work is purely editorial with one minor CSS adjustment for horizontal alignment in the comparison list.

**Files affected:**
- `src/components/landing/SolutionSection.vue`
- `src/components/landing/HowItWorksSection.vue`
- `src/types/how-it-works.ts` (possibly, if new kind needed)
- `.agent/project-info/landing-content.es.md`

**Risk level:** Very low.

---

## Task Definition

Update landing page Spanish content across Solution and How It Works sections, plus the content source file, per the TODO requirements.

### Requirements Breakdown

#### SolutionSection.vue
1. Remove the `upcomingNote` paragraph ("Próximamente podrás importar deudas desde Excel o CSV en segundos.").
2. Add a new comparison row:
   - Antes: "Recordar deudas/pagos a clientes mediante WhatsApp/mail/chat/llamada."
   - Después: "El sistema envía recordatorios a los clientes mediante notificaciones automáticas."
3. Ensure "Antes" and "Después" list items are horizontally aligned (same height per row). This likely requires CSS changes so each `li` pair has equal height, e.g., using flexbox or `min-height` / grid approach.

#### HowItWorksSection.vue
1. Change tag label from "Empresa" to "Negocio".
2. Change tag label from "Automático" to "Sistema".
3. Change tag label from "Recibo" to "Cliente".
4. Update step texts:
   - Step 1: "Carga las deudas de tus clientes, individual o masivamente."
   - Step 4: "Sube tu extracto bancario al sistema."
   - Step 5: Append " Genera reportes y un resumen del resultante. Notifica a los clientes sobre el estado de su deuda."

#### landing-content.es.md
Update §3 (La Solución) and §3.5 (Cómo funciona) to reflect the new texts.

---

## Execution Steps

| Step | Description | Sub-agent Type |
|------|-------------|----------------|
| 2 | Git Feature Branch Setup | implementer |
| 3 | Version Update (if version file exists) | implementer |
| 4.1 | Task: Analysis & Planning | architect |
| 4.2 | Task: Implementation | implementer |
| 4.3 | Task: Code Review | code-reviewer |
| 4.3-fix | Task: Code Review Fixes (if needed) | implementer |
| 4.4 | Task: Documentation | docs-specialist |
| 4.5 | Task: Verification | architect |
| 4.6 | Task: Completion | implementer |
| 5 | TODO File Completion | implementer |

---

## Constraints & Rules
- All user-facing text must be in neutral Spanish.
- All code (variables, components, types) must remain in English.
- Preserve existing code style and structure.
- Follow `.kilo/rules/tool-selection-priority.md`.
- Follow [Gitignore Compliance Rule](../.kilo/rules/gitignore-compliance.md).
