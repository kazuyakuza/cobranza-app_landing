# Plan — Task 0 (4.1): Update Spanish Content File

- **TODO file:** `.agent/todos/20260619/20260619-todo-3.md` (Task 0 only)
- **Target file:** `.agent/project-info/landing-content.es.md` (single file, 280 lines)
- **Scope:** Content/markdown edits ONLY in `landing-content.es.md`. No component code, no other files.
- **Language:** Visible text in Neutral Spanish (voseo). No code comments needed (markdown content file).

## Pre-Analysis

- The target file is the source-of-truth Spanish copy for the landing page, structured in 10 numbered sections.
- All 6 required changes map cleanly to existing sections; no structural reorganization needed.
- Edits are localized text replacements + a few insertions. Risk of line-number drift is high across multiple edits, so this plan uses **content anchors** (exact existing text) instead of line numbers.
- The FAQ section is a flat list (not grouped like `FaqSection.vue`); new entries are integrated thematically into the existing flow, matching the existing entry format.
- Out of scope (handled by other tasks): `HeroSection.vue`, `ProblemSection.vue`, `SolutionSection.vue`, `HowItWorksSection.vue`, `FeaturesSection.vue`, `FaqSection.vue`, navbar, tabs, accordion nesting.

## High-Level Approach

1. Read current `landing-content.es.md` to confirm exact anchor strings (done during planning).
2. Apply 6 edit groups in order (Hero → Problem → Solution → How it works → Features → FAQ).
3. Within FAQ: update existing extracto-format entry, then insert 10 new entries at thematic anchors.
4. Verify by re-reading the file and diffing against this plan's expected text.
5. Commit with a meaningful message (handled by implementer in Step 4.2).

## Detailed Steps

> All `Replace:` / `Insert:` blocks must be applied with **exact string matching** (use `edit` or `vscode-mcp-server_replace_lines_code`). Preserve trailing two-space line breaks and 2-space answer indentation in FAQ entries to match the existing format.

### Edit 1 — Hero Section: update Subtítulo

**Anchor (current line 9):**

Replace:

```text
Sistema web que permite a empresas y profesionales cargar deudas, recibir comprobantes de pago de sus clientes y conciliarlos de manera centralizada y sin complicaciones.
```

With:

```text
Sistema web que permite a empresas y profesionales centralizar el ciclo completo entre deudas, comprobantes, transferencias y conciliación, manteniendo siempre control manual cuando sea necesario.
```

### Edit 2 — Sección del Problema: replace closing paragraph with cases list

**Anchor (current line 31):**

Replace:

```text
Todo esto genera pérdida de tiempo, errores y estrés innecesario.
```

With:

```text
Todo esto genera pérdida de tiempo, errores, estrés innecesario y problemas frecuentes como:

- Un propietario dice que pagó pero no encontrás el comprobante.
- Recibiste una transferencia pero no sabés a qué deuda corresponde.
- Un cliente pregunta varias veces cuánto debe este mes.
- Tenés que revisar cientos de comprobantes al cierre del mes.
- Dificultad para saber rápidamente quién pagó y quién no.
```

### Edit 3 — La Solución: rename headers + add Excel/WhatsApp comparison

#### Edit 3a — Rename "Antes vs Después" heading and table header

Replace:

```text
**Antes vs Después:**

| Antes                              | Con Cobranza App                     |
|------------------------------------|---------------------------------------------|
```

With:

```text
**Sin Cobranza App vs Con Cobranza App:**

| Sin Cobranza App                   | Con Cobranza App                     |
|------------------------------------|---------------------------------------------|
```

> Note: Only the first column header (`Antes` → `Sin Cobranza App`) and the section label change. The second column is already `Con Cobranza App` (the "Después" equivalent). Keep the existing table rows unchanged.

#### Edit 3b — Add Excel/WhatsApp comparison block at end of section

**Anchor:** the closing statement (current line 53):

```text
De esta forma reducís drásticamente el tiempo dedicado a comunicación, verificación y conciliación de pagos.
```

Insert immediately AFTER that line (and before the `---` separator):

```text
De esta forma reducís drásticamente el tiempo dedicado a comunicación, verificación y conciliación de pagos.

**¿Por qué no alcanza con Excel o WhatsApp?**

| Aspecto | Excel / WhatsApp | Cobranza App |
|---|---|---|
| Ubicación de comprobantes | Dispersos | Centralizados |
| Conciliación | Manual | Asistida + revisión manual |
| Portal para clientes | No existe | Sí, simple y sin registro |
| Trazabilidad | Baja | Completa |
| Tiempo administrativo | Alto | Significativamente reducido |
```

> The implementer can achieve this by replacing the single closing-statement line with the closing statement + blank line + new comparison block.

### Edit 4 — Cómo funciona: add conciliación visual for step 5

**Anchor:** step 7 (current line 70):

```text
7. Se genera y descarga el recibo una vez validado el pago.
```

Insert immediately AFTER step 7 (and before the `---` separator that closes section 3.5):

~~~~text
7. Se genera y descarga el recibo una vez validado el pago.

**Visualización del paso 5 — Conciliación:**

```text
         Cliente
          ╲
           ╲
            Deuda
             ╲
              ╲
Comprobante ──► Match ◄── Transferencia ◄── Extracto Bancario
              ╱
             ╱
      Validación final
```
~~~~

> Formatting notes:
> - The diagram is placed AFTER the full numbered steps list (not nested inside step 5) to keep the numbered list intact and to render the ASCII art with exact alignment. The bold label "Visualización del paso 5 — Conciliación:" explicitly ties it to step 5 per the TODO requirement.
> - Use a fenced `text` code block so the box-drawing characters (`╲` U+2572, `╱` U+2571), arrows (`►` U+25BA, `◄` U+25C4), and `──` (U+2500 U+2500) render literally and monospaced.
> - Preserve the exact leading-space alignment shown above; do not reflow or trim spaces.
> - In the actual file, use a standard 3-backtick fence (` ```text `). The 4-backtick fence above is only used inside THIS plan document to nest the code block.

### Edit 5 — Funcionalidades / Beneficios: add intro texts

#### Edit 5a — Company intro

**Anchor (current line 153):**

Replace:

```text
**Para la empresa o profesional:**
```

With:

```text
**Para la empresa o profesional:**

Una plataforma web donde un administrador autorizado tiene acceso a distintas funcionalidades, tales como:
```

#### Edit 5b — Client intro

**Anchor (current line 170):**

Replace:

```text
**Para el cliente final:**
```

With:

```text
**Para el cliente final:**

Un portal web simple donde el cliente puede:
```

> Note: The existing list items below each heading remain unchanged; only the intro line is inserted between the bold heading and the first list item.

### Edit 6 — FAQ: add 10 entries + update extracto-format entry

The FAQ is a flat bulleted list. New entries use the existing format: `- **¿Question?**` followed by two trailing spaces, then a new line with a 2-space-indented answer.

#### Edit 6.0 — Update existing extracto-format question to include Excel

**Anchor (current lines 269–270):**

Replace:

```text
- **¿Qué formatos de extracto bancario soporta?**  
  Inicialmente soporta los formatos más comunes (PDF y CSV) de los principales bancos. Se irán agregando más según los comentarios y experiencias que nos hagan llegar.
```

With:

```text
- **¿Qué formatos de extracto bancario soporta?**  
  Inicialmente soporta los formatos más comunes (PDF, CSV y Excel) de los principales bancos. Se irán agregando más según los comentarios y experiencias que nos hagan llegar.
```

#### Edit 6.1 — Insert "¿Necesito instalar algo?"

Insert AFTER the "¿Es una aplicación móvil o web?" entry (its answer ends with "...aunque también es accesible desde móvil."):

```text

- **¿Necesito instalar algo?**  
  No. Ni el administrador ni el cliente necesitan instalar ni programas ni apps. Solo se requiere un dispositivo con acceso a internet y un navegador web.
```

#### Edit 6.2 — Insert "¿Puedo emitir recibos personalizados?"

Insert AFTER the "¿Los recibos tienen validez fiscal?" entry (its answer ends with "...planificada según necesidades de los usuarios."):

```text

- **¿Puedo emitir recibos personalizados?**  
  Es una funcionalidad que agregaremos según la demanda de los usuarios.
```

#### Edit 6.3 — Insert "¿Cómo identifico a mis clientes?"

Insert AFTER the "¿Mis clientes necesitan registrarse o crear una cuenta?" entry (its answer ends with "...y/o datos definidos por la empresa."):

```text

- **¿Cómo identifico a mis clientes?**  
  Mediante DNI, unidad funcional, código de cliente u otro identificador configurable.
```

#### Edit 6.4 — Insert "¿Mis clientes pueden ver pagos históricos?"

Insert immediately AFTER the new "¿Cómo identifico a mis clientes?" entry added in Edit 6.3:

```text

- **¿Mis clientes pueden ver pagos históricos?**  
  El cliente puede verificar el estado de sus pagos recientes y la última deuda. No tiene acceso a un historial completo (funcionalidad en evaluación según demanda).
```

#### Edit 6.5 — Insert four conciliación edge-case questions

Insert AFTER the "¿Qué pasa si el sistema no logra cruzar automáticamente uno o más pagos?" entry (its answer ends with "...en cualquier momento."):

```text

- **¿Qué sucede cuando el sistema no puede identificar correctamente un comprobante?**  
  El cliente puede completar manualmente los datos del comprobante. El administrador es notificado para revisar y tratar el caso manualmente.

- **¿Qué pasa si un cliente no sube el comprobante?**  
  El pago se considera pendiente hasta que se detecte en el extracto bancario o se concilie manualmente.

- **¿Qué pasa si la transferencia no aparece en el extracto?**  
  Se puede conciliar manualmente o esperar a un extracto posterior.

- **¿Qué pasa si un cliente paga varias deudas juntas?**  
  El sistema permite configurar si las deudas se acumulan o se mantienen individuales. En ambos casos soporta conciliación manual o asistida.
```

#### Edit 6.6 — Insert "¿Puedo usarlo aunque mis montos cambien todos los meses?"

Insert AFTER the "¿Funciona con pagos parciales, montos variables y cuotas?" entry (its answer ends with "...manejar cobros variables y recurrentes."):

```text

- **¿Puedo usarlo aunque mis montos cambien todos los meses?**  
  Sí. El sistema permite generar deudas únicas o recurrentes, con valores fijos o calculados mediante fórmulas.
```

#### Edit 6.7 — Insert "¿Qué bancos soporta?"

Insert AFTER the (updated) "¿Qué formatos de extracto bancario soporta?" entry:

```text

- **¿Qué bancos soporta?**  
  Cualquier banco que permita descargar un extracto de movimientos (PDF, CSV o Excel).
```

## Resulting FAQ Order (verification reference)

1. ¿Para quién está pensado Cobranza App?
2. ¿Es una aplicación móvil o web?
3. ¿Necesito instalar algo? **(NEW)**
4. ¿Hay límite de clientes?
5. ¿Cómo funcionan las notificaciones?
6. ¿Qué medios de pago acepta?
7. ¿Cómo se realiza la conciliación?
8. ¿Los recibos tienen validez fiscal?
9. ¿Puedo emitir recibos personalizados? **(NEW)**
10. ¿Cómo se protegen los datos y comprobantes?
11. ¿Puedo solicitar funcionalidades específicas?
12. ¿Mis clientes necesitan registrarse o crear una cuenta?
13. ¿Cómo identifico a mis clientes? **(NEW)**
14. ¿Mis clientes pueden ver pagos históricos? **(NEW)**
15. ¿Puedo importar deudas desde Excel o CSV?
16. ¿Cobranza App accede a mis cuentas bancarias o mueve dinero?
17. ¿Qué pasa si el sistema no logra cruzar automáticamente uno o más pagos?
18. ¿Qué sucede cuando el sistema no puede identificar correctamente un comprobante? **(NEW)**
19. ¿Qué pasa si un cliente no sube el comprobante? **(NEW)**
20. ¿Qué pasa si la transferencia no aparece en el extracto? **(NEW)**
21. ¿Qué pasa si un cliente paga varias deudas juntas? **(NEW)**
22. ¿Puedo tener varios usuarios administradores?
23. ¿Puedo exportar reportes e información?
24. ¿Funciona con pagos parciales, montos variables y cuotas?
25. ¿Puedo usarlo aunque mis montos cambien todos los meses? **(NEW)**
26. ¿Qué formatos de extracto bancario soporta? **(UPDATED — adds Excel)**
27. ¿Qué bancos soporta? **(NEW)**

Total: 27 FAQ entries (was 17; +10 new, 1 updated).

## Formatting Notes

- **FAQ entry format:** `- **¿Question?**` + two trailing spaces (markdown line break) + newline + `  Answer.` (2-space indent). All new entries MUST follow this exact pattern for consistent rendering.
- **Tables:** GitHub-flavored markdown pipe tables. Column padding/alignment is cosmetic; functional correctness depends only on pipe structure. The Excel/WhatsApp table (Edit 3b) uses a compact 3-column form as given in the TODO.
- **ASCII art (Edit 4):** Must be inside a fenced `text` code block. Preserve box-drawing characters and exact leading spaces. Do NOT replace `╲`/`╱` with ASCII `\`/`/`.
- **Neutral Spanish / voseo:** Maintain existing tone ("centralizá", "encontrás", "sabés", "tenés", "podés"). All new text already uses voseo per TODO source.
- **Newline prevention:** All inserted content uses real newline characters, never literal `\n`.
- **No commented code / no code comments:** This is a content markdown file; no code-comment rules apply, but do not add stray `//` or `<!-- -->` markers.

## Verification Checklist (for implementer & reviewer)

- [ ] Hero subtitle matches Edit 1 exact text.
- [ ] Problem section closing paragraph replaced by the 5-item cases list (Edit 2).
- [ ] "Antes vs Después" renamed to "Sin Cobranza App vs Con Cobranza App"; first table column header is "Sin Cobranza App" (Edit 3a).
- [ ] Excel/WhatsApp comparison table present at end of La Solución section (Edit 3b).
- [ ] Conciliación ASCII diagram present after the steps list with the "Visualización del paso 5 — Conciliación:" label, inside a `text` fenced block, box-drawing chars intact (Edit 4).
- [ ] Company and Client intros inserted under their respective bold headings (Edit 5a/5b).
- [ ] Extracto-format question updated to "PDF, CSV y Excel" (Edit 6.0).
- [ ] All 10 new FAQ entries present with correct text and format (Edits 6.1–6.7).
- [ ] FAQ order matches the "Resulting FAQ Order" list above (27 entries).
- [ ] No other sections/files modified.
- [ ] File still parses as valid markdown (no broken fences, no list numbering reset).
- [ ] `git status` shows only `.agent/project-info/landing-content.es.md` changed (plus optionally `context.md` if updated by a later step — NOT this task).

## Out of Scope (do NOT touch in this task)

- `src/components/landing/*.vue` and `src/data/*.ts`, `src/types/*.ts` (Task 1).
- Navbar, tabs/accordion behavior, FAQ grouping/nesting (Task 1).
- `.agent/project-info/context.md` update (handled by a later workflow step, not 4.1).
- Any git branch/commit operations beyond what the implementer (4.2) will perform.

## Git Handling (for Step 4.2 implementer)

- This is a content-only change on the current feature branch.
- After applying all edits, run `git status` to confirm only `landing-content.es.md` is modified.
- Commit message suggestion: `docs: expand landing ES content (hero subtitle, problem cases, Excel/WhatsApp comparison, conciliación visual, features intros, FAQ +10)`.
- Follow Gitignore Compliance Rule: read `.gitignore`, ensure no gitignored files are staged.
