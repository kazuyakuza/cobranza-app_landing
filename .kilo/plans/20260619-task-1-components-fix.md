# Fix Plan — TODO-12 Task 1: Update Relevant Components

**Source review:** Task 1 implementation code review (step 4.3)  
**Scope:** Address the findings below so the task can pass verification.

---

## Findings Summary

| # | File | Issue | Severity |
|---|---|---|---|
| 1 | `src/components/landing/FaqGroupAccordion.vue` | 211 lines — exceeds the `src/` 200-line hard limit by 11 lines. | Blocking |
| 2 | `src/components/landing/FeaturesSection.vue` | 204 lines — exceeds the `src/` 200-line hard limit by 4 lines. | Blocking |
| 3 | `src/components/landing/UseCasesTabs.vue` | 203 lines — exceeds the `src/` 200-line hard limit by 3 lines. | Blocking |
| 4 | `src/components/landing/HowItWorksSection.vue` | `step.icon` is present in the data model/type but never rendered in the template, leaving `stepIcons` dead data. | Low |
| 5 | `src/data/faq.ts` | Minor wording drift from `landing-content.es.md` (AFIP/ARCA, notification wording). | Low |
| 6 | `src/data/features.ts` | Feature elaboration for mobile upload drifts from `landing-content.es.md` (extra capture/file wording). | Low |

TypeScript build passes. Pre-existing lint errors exist in `BetaSection.vue`, `ContactSection.vue`, `FloatingCta.vue`, and `PricingSection.vue`; those are **out of scope** for Task 1.

---

## Fix 1: `FaqGroupAccordion.vue` — Reduce to ≤200 lines

**Goal:** Trim non-essential CSS without breaking the nested accordion behavior or accessibility.

### Suggested trims (≈14–18 lines saved)

1. Remove the duplicate Bootstrap transition override for `.accordion-collapse` (Bootstrap already transitions collapses). Saves 3 lines.
2. Merge the identical `::after` filter rules for group and question buttons using a multi-selector. Saves ~3 lines.
3. Merge the identical `:focus` rules for group and question buttons using a multi-selector. Saves ~6 lines.
4. Remove the `:not(.collapsed)` background override for `.faq-question-button` if the default Bootstrap + `.faq-question-item` background already looks acceptable. Saves 3 lines.

Verify the file is ≤200 lines and that the nested accordion still behaves correctly:
- "General" group open by default.
- First question of each group open by default.
- Opening another group closes the previous one.
- Opening a second question inside a group closes the first.

---

## Fix 2: `FeaturesSection.vue` — Reduce to ≤200 lines

**Goal:** Trim CSS that is redundant or low-impact.

### Suggested trims (≈4–6 lines saved)

1. Remove the custom `.accordion-collapse { transition: height 0.35s ease; }` rule. Bootstrap 5 already applies a collapse transition. Saves 3 lines.
2. Remove one blank line in the `<style>` block. Saves 1 line.

Verify:
- Accordion open/close animation still works.
- Intro texts render for both groups.
- Accordion body padding is balanced (top and bottom `1rem`).

---

## Fix 3: `UseCasesTabs.vue` — Reduce to ≤200 lines

**Goal:** Trim CSS while preserving desktop tabs and mobile accordion.

### Suggested trims (≈3–5 lines saved)

1. Remove the `.nav-tabs .nav-link.active { font-weight: 600; }` rule. The active tab already gains contrast from the Bootstrap active state + custom variables. Saves 3 lines.

Alternative if visual weight is required:
1. Remove the `.nav-link:focus` box-shadow rule (3 lines) and rely on Bootstrap's default focus ring.

Verify:
- Desktop tabs still highlight the active tab.
- Mobile accordion shows cases, first open, one-open-at-a-time.
- `UseCaseComparison` content stacks correctly on mobile.

---

## Fix 4: `HowItWorksSection.vue` — Use or remove step icons

**Decision required.** Either:

- **Option A (use icons):** Render the icon inside `.step-node` or next to the step tag. This requires template changes and possibly CSS adjustments.
- **Option B (remove dead data):** Drop the `icon` field from `HowItWorksStep` in `src/types/how-it-works.ts` and remove `stepIcons` from `src/data/how-it-works.ts`.

Recommended: **Option A** if the design intends icons; **Option B** if the numbered node is sufficient. Either choice removes the dead-data smell.

---

## Fix 5: Content sync with `landing-content.es.md`

### `src/data/faq.ts`

- Line ~47: Change answer for `¿Los recibos tienen validez fiscal?` from
  ```ts
  'Generamos recibos válidos internamente. La integración con AFIP/ARCA (facturación electrónica) está planificada según necesidades de los usuarios.'
  ```
  to
  ```ts
  'Actualmente generan recibos válidos internamente. La integración con AFIP (facturación electrónica) está planificada según necesidades de los usuarios.'
  ```
- Line ~78: Change notification answer from
  ```ts
  'Actualmente mediante email (recordatorios y alertas de nuevos comprobantes). Incorporaremos WhatsApp y otros canales según demanda de nuestros usuarios.'
  ```
  to
  ```ts
  'Actualmente mediante email (recordatorios y alertas de nuevos comprobantes). Próximamente incorporaremos WhatsApp y otros canales según demanda.'
  ```

### `src/data/features.ts`

- Line ~65: Change elaboration for mobile upload from
  ```ts
  'Con una foto, captura de pantalla, o bien archivo del comprobante alcanza: el cliente lo sube en segundos y queda asociado automáticamente a su deuda.'
  ```
  to
  ```ts
  'Con una foto del comprobante alcanza: el cliente lo sube en segundos y queda asociado automáticamente a su deuda.'
  ```

---

## Verification After Fixes

1. `npm run build` — must pass with no TypeScript errors.
2. `wc -l` on each changed `src/` file — must be ≤200.
3. `npm run lint` — Task 1 files must not introduce new lint errors (existing errors in other files are acceptable).
4. Manual checks:
   - FAQ nested accordion behavior remains correct.
   - Features intros and accordion padding look correct.
   - UseCases mobile accordion and desktop tabs work.
   - Content matches `landing-content.es.md` after sync.

---

## Out of Scope

- Pre-existing lint errors in `BetaSection.vue`, `ContactSection.vue`, `FloatingCta.vue`, `PricingSection.vue`.
- Task 2 (Polish & Consistency).
