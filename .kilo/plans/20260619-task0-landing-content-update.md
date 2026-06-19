# Plan — Task 0: Update Spanish Content File (`landing-content.es.md`)

- **Source TODO**: `.agent/todos/20260619/20260619-todo-1.md` (TODO-11, Task 0)
- **Target file**: `.agent/project-info/landing-content.es.md`
- **Plan date**: 2026-06-19
- **Workflow step**: 4.1 Analysis & Planning (architect)
- **Scope**: Content/reference markdown file ONLY. No `src/` code changes (those are Tasks 1–3).

## 1. Objective

Update the Spanish landing content reference file with three changes specified by TODO-11 Task 0:

1. **§5 Funcionalidades / Beneficios** — replace body with improved version (add subtitle, add conciliación bullet, restructure cliente list).
2. **§4 Ejemplos de Uso** — replace body with detailed structure (rubros + sub-items, plus tabbed practical examples).
3. **§8 Preguntas Frecuentes (FAQ)** — append 8 new questions at the end.

This file is the single source of truth consumed by Tasks 1–3 implementers (FeaturesSection, UseCasesSection, FaqSection Vue components).

## 2. Pre-Analysis (Current State)

Target file is 191 lines, a documentation/content file under `.agent/project-info/` (NOT in `src/`, so `max-lines-per-file` rule does not apply). Format conventions observed:

- Section headings: `## N. Title`
- Title labels: `**Título:**  ` (two trailing spaces = markdown hard line break) followed by title text on the next line.
- Sub-labels in `**bold:**`.
- Bullets with `- `; answers indented two spaces under `**question**  `.
- Sections separated by `---` horizontal rules with surrounding blank lines.

Current relevant line ranges (verified by reading the file):

| Section | Heading line | Body lines | Separator |
|---|---|---|---|
| §4 Ejemplos de Uso | 74 | 76–97 | 99 (`---`) |
| §5 Funcionalidades / Beneficios | 101 | 103–120 | 122 (`---`) |
| §8 Preguntas Frecuentes (FAQ) | 154 | 156–181 | 183 (`---`) |

§8 currently has 9 questions (lines 156–181). After this edit it will have 17.

No blocking ambiguities. All new text is taken verbatim from the TODO.

## 3. High-Level Approach

Three text replacements in a single file, applied **bottom-to-top** so line numbers referenced in this plan remain valid until each edit is applied:

1. §8 — insert 8 new Q&A blocks after the last existing question (line 181), before the blank line 182 / `---` (line 183).
2. §5 — replace body lines 105–120 (keep heading 101 + `**Título:**` 103 + title 104).
3. §4 — replace body lines 79–97 (keep heading 74 + `**Título:**` 76 + `Ideal para:` 77).

Then verify, commit. No build/test step (content file only; no code).

## 4. Detailed Steps

> Tool preference: use `edit` (or `vscode-mcp-server_replace_lines_code`) with exact `oldString` anchors. Each anchor below is unique within the file. Apply in the order given (§8 → §5 → §4).

### Step 1 — §5: Replace Funcionalidades body (lines 105–120)

**Keep** lines 101–104 (heading, blank, `**Título:**  `, `Cómo te ayuda Cobranza App`).

**oldString** (lines 105–120, exact current content):

```

**Para la empresa o profesional:**

- Gestión centralizada de clientes y deudas
- Carga masiva de saldos y vencimientos
- Reportes claros de deudas, pagos y morosidad
- Notificaciones automáticas al recibir comprobantes
- Validación ágil de pagos y generación automática de recibos
- Historial completo y trazabilidad por cliente

**Para el cliente final:**

- Consulta inmediata de su deuda y vencimientos
- Subida sencilla de comprobantes desde el celular
- Seguimiento en tiempo real del estado de sus pagos
- Descarga de recibo oficial una vez validado
```

**newString** (improved version per TODO):

```
Funcionalidades diseñadas para ambas partes del proceso de cobranza.

**Para la empresa o profesional:**

- Gestión centralizada de clientes y deudas
- Carga masiva de saldos y vencimientos
- Reportes claros de deudas, pagos y morosidad
- Notificaciones automáticas al recibir comprobantes
- Validación ágil de pagos y generación automática de recibos
- Historial completo y trazabilidad por cliente
- Conciliación asistida (el sistema cruza información automáticamente y permite revisión manual)

**Para el cliente final:**

- Los clientes ingresan con un identificador (código de cliente, DNI + unidad, etc.) preconfigurado. **No necesitan registrarse ni crear cuenta**.
- Consulta inmediata de deuda y vencimientos
- Subida sencilla de comprobantes desde el celular
- Seguimiento en tiempo real del estado de sus pagos
- Descarga de un recibo una vez validado
```

**Changes vs current:**

- Add subtitle line after title: `Funcionalidades diseñadas para ambas partes del proceso de cobranza.`
- Add new bullet to empresa list: `Conciliación asistida (el sistema cruza información automáticamente y permite revisión manual)`
- Replace cliente first bullet `Consulta inmediata de su deuda y vencimientos` with two bullets: the identificador/no-registration bullet, then `Consulta inmediata de deuda y vencimientos` (drops "su").
- Change last cliente bullet `Descarga de recibo oficial una vez validado` → `Descarga de un recibo una vez validado`.

### Step 2 — §4: Replace Ejemplos de Uso body (lines 79–97)

**Keep** lines 74–77 (heading, blank, `**Título:**  `, `Ideal para:`).

**oldString** (lines 79–97, exact current content):

```
- Administraciones de consorcios y expensas
- Inmobiliarias y administradores de alquileres
- Profesionales y monotributistas (honorarios y servicios)
- Colegios, academias, gimnasios y clubes
- Cualquier cobro recurrente o variable

**Caso de uso detallado:**

**Ejemplo práctico: Administración de Expensas con Cobranza App**

1. La administradora carga las expensas del mes (de forma individual o masiva).
2. Cada propietario o inquilino accede con su ID de unidad y consulta el monto exacto y la fecha de vencimiento.
3. Cada propietario o inquilino realiza la transferencia bancaria y sube el comprobante (foto o PDF) directamente en la plataforma.
4. La administradora sube el extracto bancario.
5. El sistema facilita el cruzamiento entre comprobantes, transferencias y deudas.
6. Queda registrado claramente el estado de cada unidad (pagado, pendiente, en revisión).
7. El cliente puede descargar su recibo oficial una vez validado el pago.

Este mismo flujo se aplica a honorarios profesionales, cuotas educativas, alquileres, gimnasios y cualquier otro tipo de cobro recurrente o variable.
```

**newString** (detailed structure per TODO — rubros with sub-items + tabbed examples):

```
**Rubros con sub-items:**

- **Administraciones de consorcios y expensas**
  - Expensas ordinarias y extraordinarias
  - Seguimiento de pagos por unidad
  - Recepción de comprobantes
  - Conciliación de transferencias

- **Inmobiliarias y administradores de alquileres**
  - Alquileres mensuales
  - Expensas y servicios
  - Control de vencimientos
  - Validación de pagos

- **Profesionales y monotributistas**
  - Honorarios
  - Abonos mensuales
  - Servicios recurrentes
  - Seguimiento de cobranzas

- **Colegios, academias, gimnasios y clubes**
  - Cuotas mensuales
  - Matrículas
  - Actividades especiales
  - Control de morosidad

- **Cualquier cobro recurrente o variable**
  - Cuotas
  - Membresías
  - Servicios
  - Pagos periódicos

**Ejemplo práctico con tabs:**

**Título:** Seleccioná tu caso

Incluir tabs:

- Administración de Consorcios
- Inmobiliaria
- Profesional o Estudio
- Colegio, Academia o Gimnasio

**Contenido para cada tab:**

**Administración de Consorcios**

- Situación habitual: Cada mes las expensas cambian. Los propietarios consultan montos, envían comprobantes por WhatsApp y la conciliación se realiza manualmente.
- Con Cobranza App: Se cargan las expensas del mes. Cada propietario consulta su saldo. Sube el comprobante de pago. Se carga el extracto bancario. El sistema ayuda a relacionar deudas, comprobantes y transferencias. Se valida el pago y se genera el recibo.

**Inmobiliaria**

- Situación habitual: Los inquilinos consultan alquileres, expensas y vencimientos por distintos canales. Los comprobantes llegan dispersos y el seguimiento consume tiempo administrativo.
- Con Cobranza App: Se cargan alquileres y conceptos asociados. Cada inquilino consulta su deuda actual. Realiza la transferencia y sube el comprobante. El sistema centraliza la información. El administrador valida los pagos desde un único lugar.

**Profesional o Estudio**

- Situación habitual: Los clientes realizan transferencias por honorarios o abonos mensuales y luego envían comprobantes por correo o WhatsApp.
- Con Cobranza App: Se generan los importes a cobrar. Los clientes consultan su saldo. Suben el comprobante directamente en la plataforma. El profesional revisa y valida los pagos. Todo queda registrado y disponible para consulta.

**Colegio, Academia o Gimnasio**

- Situación habitual: Las cuotas mensuales generan consultas frecuentes, comprobantes dispersos y seguimiento manual de morosidad.
- Con Cobranza App: Se cargan las cuotas del período. Los alumnos o socios consultan sus vencimientos. Suben comprobantes desde el celular. La administración controla pagos y pendientes desde un único panel.
```

**Changes vs current:**

- Remove flat 5-item bullet list, `**Caso de uso detallado:**`, the 7-step numbered "Administración de Expensas" walkthrough, and the closing note.
- Insert rubros block: 5 bolded rubro headings, each with 4 nested (2-space-indent) sub-bullets.
- Insert tabbed-examples block: `**Ejemplo práctico con tabs:**`, inline `**Título:** Seleccioná tu caso`, an `Incluir tabs:` instruction line + 4 tab labels, then 4 tab content blocks each with `Situación habitual` / `Con Cobranza App` bullets.

### Step 3 — §8: Append 8 new FAQ questions (insert after line 181, before blank line 182)

**Keep** all existing 9 questions (lines 156–181) unchanged.

**oldString** (anchor = last existing question + trailing blank + separator, lines 180–183):

```
- **¿Puedo solicitar funcionalidades específicas?**  
  Sí. Estamos en etapa Beta y valoramos mucho el feedback. Si necesitás alguna funcionalidad, contáctanos.

---
```

**newString** (existing last question + 8 new questions + separator):

```
- **¿Puedo solicitar funcionalidades específicas?**  
  Sí. Estamos en etapa Beta y valoramos mucho el feedback. Si necesitás alguna funcionalidad, contáctanos.

- **¿Mis clientes necesitan registrarse o crear una cuenta?**  
  No. Solo necesitan ingresar su código identificatorio y/o datos definidos por la empresa.

- **¿Puedo importar deudas desde Excel o CSV?**  
  Es una funcionalidad que será agregada según lo demanden nuestros usuarios.

- **¿Cobranza App accede a mis cuentas bancarias o mueve dinero?**  
  No. Los pagos se realizan por fuera de la plataforma (transferencias bancarias habituales). Cobranza App solo organiza y ayuda a conciliar la información.

  *"Me gustaría que el sistema acceda y descarga el resumen de mi banco de forma autónoma"*
  
  Contáctanos y podemos buscar una solución.

- **¿Qué pasa si el sistema no logra cruzar automáticamente un o mas pago/s?**  
  Puedes revisar y confirmar manualmente los casos excepcionales en cualquier momento.

- **¿Puedo tener varios usuarios administradores?**  
  Sí. Podrás invitar a otros miembros de tu equipo sin costo extra.

- **¿Puedo exportar reportes e información?**  
  Sí, podrás exportar listados de deudas, pagos y reportes de conciliación.

- **¿Funciona con pagos parciales, montos variables y cuotas?**  
  Sí. El sistema está diseñado para manejar cobros variables y recurrentes.

- **¿Qué formatos de extracto bancario soporta?**  
  Inicialmente soporta los formatos más comunes (PDF y CSV) de los principales bancos. Se irán agregando más según los comentarios y experiencias que nos hagan llegar.

---
```

**Changes vs current:** append 8 new Q&A blocks. Question 3 (`¿Cobranza App accede a mis cuentas bancarias o mueve dinero?`) has a multi-paragraph answer with an italic quote and a `Contáctanos` follow-up — preserve the blank-line-separated structure exactly as shown. Match existing format: `**question**  ` (two trailing spaces) + 2-space-indented answer.

### Step 4 — Verify

After the three edits, re-read the file and confirm:

- File still has all 10 section headings (`## 1.` through `## 10.`) and all `---` separators intact.
- §5: subtitle present; empresa list has 7 bullets (incl. `Conciliación asistida`); cliente list has 5 bullets (identificador bullet first, last bullet reads `Descarga de un recibo una vez validado`).
- §4: rubros block with 5 bolded rubros + sub-bullets; tabs block with `Seleccioná tu caso` + 4 tabs + 4 content blocks; old `Caso de uso detallado` / 7-step list / closing note are gone.
- §8: 17 total questions (9 original + 8 new); new question 3 retains its italic-quote + `Contáctanos` sub-paragraph.
- No literal `\n` escape sequences in the file (real newlines only — per newline-prevention rule).

### Step 5 — Git (for implementer, step 4.2)

- Follow Gitignore Compliance Rule: read `.gitignore`, run `git status`, ensure no gitignored files staged.
- Stage only `.agent/project-info/landing-content.es.md`.
- Commit message: `docs: update landing-content.es.md §4/§5/§8 (features, use cases tabs, FAQ expansion)`.

## 5. Decisions & Notes

- **§4 "Incluir tabs:" line preserved verbatim**: this content file is the source of truth for Tasks 1–3 implementers; the instruction line documents intended tab labels. Removing it would lose intent. Kept as-is from the TODO.
- **§4 `**Ejemplo práctico con tabs:**` and `**Título:** Seleccioná tu caso`** placed with a blank line between them for readability, consistent with the file's block-separation convention (TODO lists them on consecutive lines; blank line added for format consistency).
- **§5 cliente list restructured**: the TODO's new first bullet (identificador / no-registration) replaces the old first bullet; the old "Consulta inmediata de su deuda..." becomes the second bullet with "su" dropped, matching the TODO exactly.
- **Trailing two-space hard breaks** on `**Título:**  ` and `**question**  ` labels preserved to match existing rendering convention.
- **Edit order bottom-to-top** (§8 → §5 → §4) keeps the line numbers in this plan valid until each edit is applied. Each `oldString` anchor is section-specific and unique.
- **No code/build/test**: target is a content markdown file; no `src/` changes, no lint/build impact. Tasks 1–3 will consume this content later.

## 6. Boundaries (Out of Scope — Must NOT Be Done in This Task)

- Do NOT modify any Vue component (`FeaturesSection.vue`, `UseCasesSection.vue`, `FaqSection.vue`, `App.vue`, navbar, etc.) — those are Tasks 1–3.
- Do NOT change section numbering, section order, or other sections (§1–3, §3.5, §6, §7, §9, §10).
- Do NOT run build/lint/test as a verification gate for this content-only change.
- Do NOT alter `.agent/project-structure.md` (no folder changes).

## 7. Verification Checklist (for step 4.5)

- [ ] §5 subtitle line present directly under `Cómo te ayuda Cobranza App`.
- [ ] §5 empresa list contains the `Conciliación asistida` bullet (7 total).
- [ ] §5 cliente list first bullet is the identificador/no-registration bullet; last bullet is `Descarga de un recibo una vez validado`.
- [ ] §4 contains `**Rubros con sub-items:**` with 5 bolded rubros, each with 4 sub-bullets.
- [ ] §4 contains `**Ejemplo práctico con tabs:**` and `**Título:** Seleccioná tu caso`.
- [ ] §4 lists 4 tab labels and 4 tab content blocks (Situación habitual / Con Cobranza App).
- [ ] §4 old "Caso de uso detallado" + 7-step list + closing note are fully removed.
- [ ] §8 has 17 questions total; new question 3 retains italic-quote + `Contáctanos` sub-paragraph.
- [ ] All 10 section headings and `---` separators intact.
- [ ] Only `.agent/project-info/landing-content.es.md` changed in the commit.
