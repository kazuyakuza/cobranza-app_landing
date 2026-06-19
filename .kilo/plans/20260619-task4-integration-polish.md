# Plan — Task 4: Integration & Polish

- **TODO**: `.agent/todos/20260619/20260619-todo-1.md` (Task 4, lines 178–182)
- **Workflow step**: Critical Workflow 4.1 (Analysis & Planning) → produced for 4.2 Implementation
- **Branch context**: feature branch already created in Step 2 (assumed `feat/...`); implementer commits here
- **Scope**: Verify integration of Tasks 1–3 (Features, UseCases, FAQ) into the app shell and ensure consistent design, mobile experience, and content sourcing. **Plan only — no code execution in this step.**

---

## 1. Pre-Analysis Findings

### 1.1 Integration points (App.vue, Navbar, Footer) — INTACT

- `src/App.vue` imports and renders all 12 components in the correct order: Navbar → Hero → Problem → Solution → HowItWorks → **UseCases → Features** → Beta → Pricing → **Faq** → Contact → Footer → FloatingCta. No missing imports; no render gaps.
- Section-ID audit (navbar `menuItems` + footer `footerLinks` targets vs. component `id`):

  | Nav target id | Defined in component | Linked by Navbar | Linked by Footer |
  |---|---|---|---|
  | `hero` | HeroSection.vue:28 | yes | yes |
  | `problem` | ProblemSection.vue:41 | yes | no |
  | `solution` | SolutionSection.vue:41 | yes | yes |
  | `how-it-works` | HowItWorksSection.vue:45 | yes | yes |
  | `use-cases` | UseCasesSection.vue:12 | yes ("Rubros") | yes ("Rubros") |
  | `features` | FeaturesSection.vue:16 | **no** | **no** |
  | `pricing` | PricingSection.vue:35 | yes | no |
  | `faq` | FaqSection.vue:15 | yes ("Dudas") | no |
  | `contact` | ContactSection.vue:20 | yes (CTA) | yes |

- **Conclusion on "Update App.vue and navbar if new IDs are needed"**: Tasks 1–3 introduced **no new section IDs**. The `features`, `use-cases`, and `faq` IDs pre-existed. Accordion collapse IDs and tab pane IDs are component-scoped (`collapseId`, `paneId`, `tabControlId`) and are not navigation targets. **App.vue requires no changes.** The only integration gap is that the (now significantly expanded) **Features section is not reachable from Navbar/Footer** — see optional polish §3.2.
- No broken `getElementById`/`scrollToSection` references found. FloatingCta observes `hero` + `contact` (both exist). Navbar IntersectionObserver safely skips any missing target via the `if (el)` guard.

### 1.2 Design consistency audit

- **Section background rhythm** (from `variables.css`):
  - UseCases `--color-bg-slate` `#1a2740` → Features `--color-bg-dark` `#0c1528` → Beta (bright breaker). There is a visible step between slate (lighter) and dark; acceptable rhythm, no clash.
  - Faq `--color-bg-card-alt` `#243656` → Contact `--color-bg-dark`. Acceptable.
- **Accordion pattern (Features vs FAQ)** — structurally consistent:
  - Both: `.accordion-item` bg `--color-bg-card`, border `--color-border`, `border-radius: 8px`, `margin-bottom: 0.75rem`, `overflow: hidden`.
  - Both: `.accordion-button:not(.collapsed)` bg `--color-bg-card-alt`; chevron `filter: brightness(0) invert(0.85)`; focus `box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.5)`; `.accordion-collapse` `transition: height 0.35s ease`.
  - **Minor variance**: Features button padding `0.875rem 1.5rem` / `font-weight: 500` (icon + text); FAQ button padding `1.25rem 1.5rem` / `font-weight: 600` (question text). Justified by different content shape; not a defect. Optional alignment in §3.3.
- **Tabs (UseCasesTabs) dark-theme overrides** — complete: `.nav-link.active` sets `border-bottom-color: var(--color-bg-card)` to seam with `.tab-content`; `overflow-x: auto` + `flex-wrap: nowrap` for mobile horizontal scroll; full ARIA roles. **No changes needed.**
- **Mobile experience** — all three sections responsive, no defects:
  - Features: `col-12 col-lg-6` → single column <lg; accordion button/body padding reduced <768px.
  - UseCases rubros: `col-12 col-md-6 col-lg-4` → 1 col (mobile) / 2 (md) / 3 (lg); tabs nav scrolls horizontally; `.example-blocks` → 1 col <768px.
  - FAQ: groups stack (flex-column); button/body padding + font reduced <768px.

### 1.3 Content-sourcing audit (vs `.agent/project-info/landing-content.es.md`)

- **UseCases (§4)**: 100% sourced — rubros title "Ideal para:", 5 rubros + sub-items, tabs title "Seleccioná tu caso", 4 tab labels, and all `beforeText`/`afterText` match the content file. OK
- **FAQ (§8)**: All 17 Q&A texts match. Group titles ("General", "Para la empresa o profesional", "Para tus clientes", "Conciliación y pagos") are structural labels authorized by Task 3 ("Consider grouping FAQs into categories"). OK with one minor note:
  - The `note` field in `faq.ts` merges the italic quote and the "Contáctanos y podemos buscar una solución." sentence into one string; the content file (lines 241–243) presents them on separate lines. Meaning preserved; rendering as a single italic block is acceptable. Optional fidelity tweak in §3.3.
- **Features (§5)**: Title "Cómo te ayuda Cobranza App", subtitle, and all 12 feature bullet texts match. GAP: the 12 `elaboration` strings consumed by the accordion bodies (`src/data/features.ts`) are original copy **not present** in the content file. This breaks the single-source-of-truth expectation stated in acceptance criteria ("Spanish content file updated with all specified texts") and in Task 4 ("Verify all new content is pulled from the Spanish content file"). **Remedy in §3.1 (required).**

---

## 2. High-Level Approach

The task is primarily **verification + light polish**. No hard defects found in integration, design, or mobile behavior. The one substantive gap is content-sourcing: the Features accordion elaborations exist only in `features.ts` and must be mirrored into the Spanish content file. Two optional polish items (Navbar reachability of Features; accordion micro-consistency) are proposed for approver decision. Implementation is tiny, low-risk, and confined to one content doc plus at most one component. Build/lint and a mobile visual check close out the task.

---

## 3. Detailed Implementation Steps

> Severity tags: **[REQUIRED]** satisfies an acceptance criterion / fixes a finding. **[RECOMMENDED]** justified polish. **[OPTIONAL]** low-priority refinement.

### 3.1 [REQUIRED] Content sync — add Features elaborations to the Spanish content file

**Goal**: Make every visible Features string traceable to `landing-content.es.md` §5.

**File**: `.agent/project-info/landing-content.es.md`
**Location**: Section `## 5. Funcionalidades / Beneficios` (current lines 146–170).

**Action**: Under each existing bullet, add one nested detail line using a consistent format `  - _Detalle:_ <elaboration>`. Use the exact elaboration strings already present in `src/data/features.ts` (single source of truth for wording). Do not alter existing bullet text.

Mapping to insert (company block, after line 153 `**Para la empresa o profesional:**`):

- `- Gestión centralizada de clientes y deudas` → `  - _Detalle:_ Todos tus clientes y sus saldos quedan en un único panel, sin repartir la información entre hojas de cálculo y mensajes sueltos.`
- `- Carga masiva de saldos y vencimientos` → `  - _Detalle:_ Cargá los importes de muchos clientes a la vez y actualizá los vencimientos en segundos, ahorrando trabajo repetitivo cada mes.`
- `- Reportes claros de deudas, pagos y morosidad` → `  - _Detalle:_ Visualizá de un vistazo quién debe, cuánto y desde cuándo, para tomar decisiones rápidas y seguir la evolución de la cobranza.`
- `- Notificaciones automáticas al recibir comprobantes` → `  - _Detalle:_ Cuando un cliente sube un comprobante, el sistema te avisa al instante para que no tengas que revisar manualmente cada canal.`
- `- Validación ágil de pagos y generación automática de recibos` → `  - _Detalle:_ Confirmá los pagos en pocos clics y dejá que el sistema arme el recibo correspondiente, sin trabajo manual extra.`
- `- Historial completo y trazabilidad por cliente` → `  - _Detalle:_ Reconstruí el recorrido de cada cliente: deudas, comprobantes y validaciones, todo ordenado y disponible para consulta.`
- `- Conciliación asistida (el sistema cruza información automáticamente y permite revisión manual)` → `  - _Detalle:_ El sistema propone los cruces entre deudas, comprobantes y transferencias; vos solo revisás y confirmás los casos dudosos.`

Mapping to insert (user block, after line 163 `**Para el cliente final:**`):

- `- Los clientes ingresan con un identificador ... **No necesitan registrarse ni crear cuenta**.` → `  - _Detalle:_ Sin contraseñas que olvidar ni formularios de registro. Tus clientes acceden directamente y consultan su estado al instante.`
- `- Consulta inmediata de deuda y vencimientos` → `  - _Detalle:_ En cualquier momento y desde el celular, tus clientes saben exactamente cuánto deben y cuándo vence cada concepto.`
- `- Subida sencilla de comprobantes desde el celular` → `  - _Detalle:_ Con una foto del comprobante alcanza: el cliente lo sube en segundos y queda asociado automáticamente a su deuda.`
- `- Seguimiento en tiempo real del estado de sus pagos` → `  - _Detalle:_ El cliente ve si su comprobante está pendiente, validado o rechazado, sin necesidad de preguntar por mensaje.`
- `- Descarga de un recibo una vez validado` → `  - _Detalle:_ Cuando el pago se valida, el cliente descarga su recibo en el momento, sin tener que pedírtelo ni esperar.`

**Tooling**: `edit` (or `vscode-mcp-server_replace_lines_code`) per `.kilo/rules/tool-selection-priority.md`. Preserve the existing bullet lines verbatim; insert the nested `_Detalle:_` line immediately after each bullet with a 2-space indent.
**Rules check**: markdown doc — `max-lines-per-file` does not apply; `newline-prevention` — ensure real newlines.

### 3.2 [RECOMMENDED] Navbar reachability for the Features section

**Goal**: The expanded Features section (accordions) is currently only scroll-reachable. Add a nav link so it is reachable, matching App.vue order (Rubros → Funcionalidades → Precios).

**File**: `src/components/landing/Navbar.vue`
**Change**: Insert one entry in `menuItems` (after the `Rubros` / `use-cases` entry, line 15):
```
{ label: 'Funcionalidades', sectionId: 'features' },
```
No other Navbar changes required — `scrollToSection` and the IntersectionObserver already handle any `sectionId` that exists (the `if (el)` guard plus the existing `#features` element). The `active` highlight will now track Features when in view.

**Mobile/desktop risk note**: this raises the menu to 9 items. On `lg` (>=992px) the full menu + the long CTA ("Solicitar acceso anticipado gratuito", `d-lg-inline-block`) must fit. The implementer **must** visually verify at 992–1200px width that the navbar does not overflow/clip. If it does, the fallback is to **drop this optional change** (keep 8 items) — it is not required by any acceptance criterion.

### 3.3 [OPTIONAL] Low-priority polish (approver may skip)

Only if the approver wants strict uniformity:

- **Accordion micro-consistency**: align FAQ `.accordion-button` `font-weight` to `500` to match Features (or align Features to `600`). Leave vertical padding as-is (content-driven). File: `FaqSection.vue` (line 133) and/or `FeaturesSection.vue` (line 130).
- **FAQ note fidelity**: split `conciliationFaqs[1].note` so the italic quote and the "Contáctanos y podemos buscar una solución." sentence render as two lines (e.g., a second `<p>`). Low value; current single-block rendering is acceptable.
- **DRY helper**: `collapseId(accordionId, index)` is duplicated in `FeaturesSection.vue` and `FaqSection.vue`. Could be extracted to `src/utils/accordion.ts`. Out of scope for "polish"; skip unless approver requests.

### 3.4 Build & lint verification

Run from repo root (`C:\projects\cobranza-app\landing`):
- `npm run build` — must succeed (TypeScript + Vite).
- `npm run lint` — must report no errors (ESLint + Prettier flat config).
- If a dev server is available, optional `npm run dev` for the visual check.

### 3.5 Visual / mobile verification

Manual checks (dev server or built preview):
- Navigate via every Navbar link (incl. new "Funcionalidades" if §3.2 applied) → smooth scroll lands below the 70px navbar; active highlight updates.
- Features: expand/collapse each accordion in both groups; chevron + bg change correct.
- UseCases: rubros grid stacks 1/2/3 columns across mobile/tablet/desktop; tabs switch; horizontal tab scroll on mobile; before/after blocks stack on mobile.
- FAQ: all 4 groups render; expand items; italic note block renders under the banking-access question.
- Mobile (<768px): no horizontal overflow anywhere; FloatingCta does not overlap content; Footer bottom padding preserved.
- If §3.2 applied: verify navbar at 992–1200px width does not overflow; if it does, revert §3.2.

### 3.6 Code review (Step 4.3 hand-off)

Code-reviewer checks: plan adherence, no regressions, no `.gitignore`-matching files staged, rules compliance (`self-documenting-code`, `prefer-private-members`, `max-lines` for any touched `src/` file, `newline-prevention` for the content doc). Fix plan saved to `.kilo/plans/20260619-task4-code-review-fixes.md` only if issues found.

### 3.7 Documentation / context update (Step 4.4 hand-off)

Docs-specialist updates `.agent/project-info/CONTEXT.md` "Recent Changes" with: Task 4 integration verification result, content-file §5 elaboration sync, and (if applied) the Navbar "Funcionalidades" link. No README changes required unless §3.2 changes navigation behavior worth documenting.

### 3.8 Git handling (implementer)

- Before starting: `git status`; commit any unstaged unrelated changes per Gitignore Compliance Rule (read `.gitignore`, ensure `node_modules/`, `dist/` not staged).
- After changes: stage only the intended files; commit with a meaningful message, e.g.:
  - If only §3.1: `docs: sync Features accordion elaborations into Spanish content file`
  - If §3.1 + §3.2: `feat(navbar): add Funcionalidades link; docs: sync Features elaborations`
- Do NOT push (Step 5 handles merge + push to `origin` only).

---

## 4. Files Affected

- **REQUIRED**: `.agent/project-info/landing-content.es.md` (§5 elaboration sync).
- **RECOMMENDED (optional)**: `src/components/landing/Navbar.vue` (one `menuItems` entry).
- **OPTIONAL**: `src/components/landing/FaqSection.vue` and/or `FeaturesSection.vue` (accordion micro-consistency); possibly `src/data/faq.ts` + `FaqSection.vue` (note fidelity).
- **Not modified**: `App.vue`, `Footer.vue`, `FeaturesSection.vue` logic, `UseCasesSection.vue`, `UseCasesTabs.vue`, `faq.ts` (data), `features.ts`, `use-cases.ts`.

---

## 5. Verification Checklist (acceptance criteria mapping)

- [ ] App.vue renders all sections; no broken nav targets (§1.1) — verified, no change.
- [ ] Navbar/Footer integration intact; new IDs needed? → none (§1.1).
- [ ] Consistent design across Features & UseCases (backgrounds, accordion/tabs dark-theme) — verified (§1.2).
- [ ] Mobile experience solid across Features & UseCases — verified (§1.2).
- [ ] **All new content pulled from Spanish content file** → §3.1 closes the Features-elaboration gap; UseCases & FAQ confirmed sourced (§1.3).
- [ ] `npm run build` + `npm run lint` green (§3.4).
- [ ] Visual/mobile checks pass (§3.5).
- [ ] Commits on feature branch; no gitignored files staged (§3.8).

---

## 6. Out of Scope / NOT Done in This Step

- No implementation, no git commands, no non-`.md` file edits (this is the Plan step only).
- No changes to `features.ts`, `use-cases.ts`, `faq.ts` data (already correct and sourced).
- No restructuring of components; no new components.
- Task 4 TODO checkboxes (`[ ]` → `[x]`) and TODO file `-DONE` rename are handled in Steps 4.5–4.6, not here.
- Merge to `main` and push to `origin` handled in Step 5.

---

## 7. Risks & Notes

- **Only real risk**: §3.2 (Navbar 9th item) crowding at `lg` width. Mitigation: visual check §3.5; revert if overflow. Section is optional; dropping it keeps the task fully satisfied.
- **Content-file sync is ongoing maintenance**: after §3.1, future feature-text edits must keep `landing-content.es.md` and `features.ts` in lockstep. Noted for docs step.
- All proposed changes are tiny and reversible; no functional behavior changes beyond the optional nav link.
