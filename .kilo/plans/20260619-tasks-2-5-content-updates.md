# Plan — Tasks 2-5: Content & FAQ Updates

- Date: 2026-06-19
- Step: 4.1 Analysis & Planning (Architect)
- Scope: Tasks 2, 3, 4 (text replacements) + Task 5 (`.faq-note` visual style enhancement)
- Status: Ready for approval

## Pre-Analysis

All target strings were verified verbatim against the current source. No test suite exists (`package.json` scripts: `dev`, `build` = `vue-tsc -b && vite build`, `preview`, `lint`). Verification will use `npm run build` (type-check + build) and `npm run lint`.

Files involved (all under `src/`):
- `src/data/features.ts` (94 lines) — Task 2
- `src/data/faq.ts` (121 lines) — Tasks 3 & 4
- `src/components/landing/FaqSection.vue` (200 lines) — Task 5

No new files. No structural changes. No type changes (string values only; CSS scoped).

## String Confirmation (Tasks 2-4)

### Task 2 — `src/data/features.ts`
- Target: `userFeatures` item with `icon: 'bi-cloud-upload'` (line 62), `elaboration` at line 65.
- FROM (exact, line 65):
  `'Con una foto del comprobante alcanza: el cliente lo sube en segundos y queda asociado automáticamente a su deuda.'`
- TO:
  `'Con una foto, captura de pantalla, o bien archivo del comprobante alcanza: el cliente lo sube en segundos y queda asociado automáticamente a su deuda.'`

### Task 3 — `src/data/faq.ts`
- Target: `companyFaqs` item with `question: '¿Los recibos tienen validez fiscal?'` (line 40), `answer` at line 42.
- FROM (exact, line 42):
  `'Actualmente generan recibos válidos internamente. La integración con AFIP (facturación electrónica) está planificada según necesidades de los usuarios.'`
- TO:
  `'Generamos recibos válidos internamente. La integración con AFIP/ARCA (facturación electrónica) está planificada según necesidades de los usuarios.'`

### Task 4 — `src/data/faq.ts`
- Target: `userFaqs` item with `question: '¿Cómo funcionan las notificaciones?'` (line 58), `answer` at line 60.
- FROM (exact, line 60):
  `'Actualmente mediante email (recordatorios y alertas de nuevos comprobantes). Próximamente incorporaremos WhatsApp y otros canales según demanda.'`
- TO:
  `'Actualmente mediante email (recordatorios y alertas de nuevos comprobantes). Incorporaremos WhatsApp y otros canales según demanda de nuestros usuarios.'`

## Task 5 — `.faq-note` Visual Style Enhancement

### Context
- Rendered by `src/components/landing/FaqSection.vue` line 54: `<p v-if="item.note" class="faq-note">{{ item.note }}</p>`.
- Note data only exists in `conciliationFaqs` (line 79 of `faq.ts`): the conciliation callout `"Me gustaría que el sistema acceda y descarga el resumen de mi banco de forma autónoma" Contáctanos y podemos buscar una solución.`
- Current CSS block: lines 163-170.

### Current style (lines 163-170)
```css
.faq-note {
  margin: 1rem 0 0;
  padding-left: 1rem;
  border-left: 2px solid var(--group-color);
  font-style: italic;
  font-size: 0.9375rem;
  color: var(--color-text-on-dark-dim);
}
```

### Design decision — background variable
The task brief suggested `var(--color-bg-card)`. Rejected: `.accordion-item` already uses `background: var(--color-bg-card)` (`#1e2d4a`, line 118), so the note would be invisible against its own container. Instead use `var(--color-bg-card-alt)` (`#243656`), which is lighter than the card surface and produces a subtle, visible callout. This is a deliberate, documented deviation from the literal suggestion to satisfy the "more visually distinct" requirement.

Also bumping text color from `--color-text-on-dark-dim` (`#64748b`) to `--color-text-on-dark-muted` (`#94a3b8`) for adequate contrast against the new background (accessibility for small italic text).

### New style (replace lines 163-170)
```css
.faq-note {
  margin: 1rem 0 0;
  padding: 0.75rem 1rem;
  background: var(--color-bg-card-alt);
  border-left: 2px solid var(--group-color);
  border-radius: 6px;
  font-style: italic;
  font-size: 0.9375rem;
  color: var(--color-text-on-dark-muted);
}
```

Changes:
1. `padding-left: 1rem` -> `padding: 0.75rem 1rem` (vertical breathing room + keep horizontal inset so text clears the left border).
2. Added `background: var(--color-bg-card-alt)` (subtle, distinct from card surface).
3. Added `border-radius: 6px`.
4. `color` -> `var(--color-text-on-dark-muted)` (improved contrast).
5. `border-left: 2px solid var(--group-color)` preserved (left accent kept).

Mobile rule (lines 196-198) only overrides `font-size: 0.875rem`; it remains valid with the new block. No change required to the media query.

## Implementation Steps (Step 4.2 — implementer)

Work on the current feature branch (set by Step 2). Commit after each task.

### Task 2 — features.ts
1. Open `src/data/features.ts`.
2. Replace the `bi-cloud-upload` item `elaboration` value (line 65) with the TO string above.
   - Tool: `vscode-mcp-server_replace_lines_code` (startLine 65, endLine 65) or `edit` with unique surrounding context (the `'bi-cloud-upload'` block).
3. Verify the replacement is unique (only one occurrence of the FROM string).

### Task 3 — faq.ts (recibos)
4. Open `src/data/faq.ts`.
5. Replace the `¿Los recibos tienen validez fiscal?` item `answer` value (line 42) with the TO string above.
   - Tool: `vscode-mcp-server_replace_lines_code` (startLine 42, endLine 42) or `edit`.

### Task 4 — faq.ts (notificaciones)
6. In the same file, replace the `¿Cómo funcionan las notificaciones?` item `answer` value (line 60) with the TO string above.
   - Tool: `vscode-mcp-server_replace_lines_code` (startLine 60, endLine 60) or `edit`.
7. Re-read `src/data/faq.ts` to confirm both Task 3 and Task 4 edits landed and no other answers were touched.

### Task 5 — FaqSection.vue
8. Open `src/components/landing/FaqSection.vue`.
9. Replace the `.faq-note` CSS block (lines 163-170) with the New style block above.
   - Tool: `vscode-mcp-server_replace_lines_code` (startLine 163, endLine 170); `originalCode` = current block exactly.
10. Confirm the mobile media query (lines 196-198) is untouched.

### Commits
11. Commit after Task 2: `feat(content): ampliar métodos de subida de comprobantes en features`
12. Commit after Tasks 3-4: `feat(content): actualizar respuestas FAQ recibos y notificaciones`
13. Commit after Task 5: `style(faq): mejorar estilo visual de la nota de conciliación`

Follow Gitignore Compliance Rule before each commit (`git status`, no `node_modules/` or dist staged).

## Code Review (Step 4.3 — code-reviewer)
- Verify Tasks 2-4: exact string matches (TO text verbatim, no typos, Spanish accents intact).
- Verify Task 5: only lines 163-170 changed; left border accent preserved; background var is `--color-bg-card-alt`; no regression to mobile rule.
- Verify no unrelated edits; no commented-out code introduced.
- If deviations found, save fix plan to `.kilo/plans/20260619-tasks-2-5-content-updates-fix.md` and reassign to implementer (max 3 cycles).

## Documentation (Step 4.4 — docs-specialist)
- No external docs reference these strings. No README/docs update required unless project docs list FAQ/feature copy (none found). Skip if not applicable.

## Verification (Step 4.5 — architect)
1. `npm run build` — must succeed (`vue-tsc -b` type-check + `vite build`).
2. `npm run lint` — must pass (no new eslint/prettier issues).
3. Visual check (optional): `npm run dev`, open `#faq`, expand the conciliation group, confirm the note shows a subtle rounded background with green left accent and readable text.
4. Confirm all changes committed; no unstaged files left.

## Task Completion (Step 4.6 — implementer)
- Mark Tasks 2, 3, 4, 5 as `[DONE]` in the TODO file per its format (append `[DONE]` to each line/section title; check sub-items `[x]`).
- Preserve original TODO content; append only the done marks.
- Commit: `chore: mark tasks 2-5 done`.

## Out of Scope
- Version bump (Step 3 of Critical Workflow — separate step).
- Other TODO tasks.
- Any refactor beyond the listed edits.
