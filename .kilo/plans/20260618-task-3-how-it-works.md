# Plan — Task 3: "Cómo funciona Cobranza App" Section (How It Works)

- **TODO**: Task 3 — Create `HowItWorksSection.vue` (7-step flowchart)
- **Plan date**: 2026-06-18
- **Plan file**: `.kilo/plans/20260618-task-3-how-it-works.md`
- **Content source**: `.agent/project-info/landing-content.es.md` §3.5
- **Scope**: Plan only (architect step 4.1). No code execution in this step.

---

## 1. Task Summary

Create a new landing section component `src/components/landing/HowItWorksSection.vue` that presents the 7-step Cobranza App process as a modern, clean, fully responsive flowchart diagram. The section must:

- Use the exact 7 steps from content file §3.5.
- Carry `id="how-it-works"` for navigation.
- Be fully responsive and mobile-friendly.
- Integrate with the existing dark-first styling system and `useScrollReveal()` + `data-reveal` pattern.

The TODO states: *"Vue Flow should be installed only if it provides a clear visual advantage while remaining lightweight and responsive."* This plan evaluates that condition with evidence and makes a clear recommendation.

---

## 2. Recommendation: Vue Flow vs. Alternative

### Decision: DO NOT install Vue Flow. Use a custom CSS/Bootstrap vertical stepper.

### Evidence (Vue Flow `@vue-flow/core` v1.48.2)

| Criterion | Finding | Source |
|---|---|---|
| Bundle size | **164,115 B raw / 50,990 B gzipped (~51 KB)** JS, plus non-tree-shakeable CSS side-effects (`hasSideEffects: ["*.css"]`) | Bundlephobia API `@vue-flow/core@1.48.2` |
| Dependencies | **5 deps**, including D3.js (zoom/pan) and VueUse submodules; dependency tree ~316 KB | npm + Bundlephobia |
| Rendering requirement | Parent container **must have explicit width AND height** for the graph to render correctly | Vue Flow troubleshooting docs (Context7) |
| Mobile/scroll behavior | Captures wheel/touch events; requires `nowheel` / `nodrag` classes on inner content to prevent scroll-jacking and node-drag on touch | Vue Flow node/interaction docs (Context7) |
| Feature fit | Strengths are interactive editing: zoom, pan, drag, branching edges, minimap, controls | npm README + Context7 |

### Why Vue Flow fails the TODO condition for THIS use case

- The flow is **linear and static** (7 sequential steps, no branches). Vue Flow's core advantages (interactive zoom/pan/drag, branching edges) are unused.
- The **fixed-height container** requirement fights a content-driven, mobile-first landing page where section height is dynamic.
- **Touch/scroll interception** is a real UX regression on mobile (the primary browsing context for this product — see FAQ "es un sistema web responsive ... desde el celular").
- **~51 KB gzipped + CSS + 5 deps** is not "lightweight" for a single static diagram on a marketing page where performance matters.
- Its default theme would need heavy overriding to match the dark-first palette, adding more CSS.

### Why a custom CSS/Bootstrap stepper wins

- **Zero JS dependencies**, ~2–3 KB of scoped CSS, no extra bundle weight.
- **Fully responsive by default** — a left-rail vertical timeline collapses cleanly to mobile with no touch conflicts.
- **Accessible** — semantic `<ol>`/`<li>` (order is meaningful), decorative icons marked `aria-hidden`.
- **On-brand** — reuses the exact dark-first CSS variables, `.dark-card` pattern, and `useScrollReveal` + `data-reveal` animation system already used by every other section.
- Still reads clearly as a **flowchart/diagram**: numbered nodes on a gradient rail, directional top-to-bottom flow, kind-coded nodes (empresa/cliente/sistema/resultado), and a distinct terminal "recibo" node.

**Conclusion:** Vue Flow provides no clear visual advantage for a linear static 7-step flow, is not lightweight, and introduces mobile responsiveness risks. The custom stepper is the correct choice.

---

## 3. High-Level Approach

1. Create a small types file `src/types/how-it-works.ts` (step kind union + step interface).
2. Create `src/components/landing/HowItWorksSection.vue`: a vertical timeline with a gradient rail, 7 numbered nodes (Bootstrap Icons), and `.dark-card` text cards. Color-coded by actor/kind using existing palette via a `--node-color` CSS custom property.
3. Wire the component into `src/App.vue` between `<SolutionSection />` and `<UseCasesSection />` (matches §3.5 position between §3 and §4).
4. Add a nav entry to `src/components/landing/Navbar.vue` `menuItems` so the scroll-spy observes `#how-it-works` and users can navigate to it.
5. Verify with `npm run lint`, `npm run build`, and a manual `npm run dev` visual check across breakpoints.
6. Commit on the current feature branch with a meaningful message.

Downstream critical-workflow steps (4.3 review, 4.4 docs, 4.5 verification, 4.6 completion) are referenced in §10 and are handled by separate sub-agents.

---

## 4. Pre-Implementation Checks (Git)

The feature branch for this TODO is already created at critical-workflow step 2. Before writing code:

1. `git status` — confirm a clean tree and that the current branch is the TODO feature branch.
2. If unstaged changes exist from a prior step, commit them first with a meaningful message (follow Gitignore Compliance Rule: no `node_modules/`, `dist/`, etc. staged).
3. Do NOT create a new branch (branch setup is step 2, already done).

---

## 5. Atomic Implementation Steps

### Step 5.1 — Create types file `src/types/how-it-works.ts`

The `src/types/` folder currently only contains `.gitkeep`. Add a new file (keeps the data model type-safe and satisfies project-structure + max-arguments rules).

**File**: `src/types/how-it-works.ts`

```ts
export type HowItWorksStepKind = 'empresa' | 'cliente' | 'sistema' | 'resultado'

export interface HowItWorksStep {
  number: number
  kind: HowItWorksStepKind
  icon: string
  text: string
}
```

### Step 5.2 — Create component `src/components/landing/HowItWorksSection.vue`

**Line budget**: ≤200 lines total (max-lines-per-file rule). Target ~150 lines using the `--node-color` CSS pattern to avoid duplicating per-kind rules. The skeleton below is the reference implementation.

#### `<script setup lang="ts">`

```ts
import { useScrollReveal } from '@/composables/useScrollReveal'
import type { HowItWorksStep, HowItWorksStepKind } from '@/types/how-it-works'

useScrollReveal()

const sectionTitle = 'Cómo funciona Cobranza App'

const kindLabels: Record<HowItWorksStepKind, string> = {
  empresa: 'Empresa',
  cliente: 'Cliente',
  sistema: 'Automático',
  resultado: 'Recibo'
}

const steps: HowItWorksStep[] = [
  { number: 1, kind: 'empresa', icon: 'bi-upload', text: 'La empresa carga las deudas (individual o masivamente).' },
  { number: 2, kind: 'cliente', icon: 'bi-person-badge', text: 'Cada cliente accede con su identificador (código de cliente, DNI + unidad, etc.) y consulta su saldo y vencimientos.' },
  { number: 3, kind: 'cliente', icon: 'bi-receipt', text: 'El cliente realiza la transferencia y sube el comprobante directamente en la plataforma.' },
  { number: 4, kind: 'empresa', icon: 'bi-bank', text: 'La empresa sube el extracto bancario.' },
  { number: 5, kind: 'sistema', icon: 'bi-diagram-3', text: 'El sistema cruza automáticamente los comprobantes, transferencias y deudas.' },
  { number: 6, kind: 'empresa', icon: 'bi-clipboard-check', text: 'Los casos que requieren atención se revisan y confirman manualmente.' },
  { number: 7, kind: 'resultado', icon: 'bi-file-earmark-check', text: 'Se genera y descarga el recibo una vez validado el pago.' }
]
```

- The 7 `text` values are **exact copies** from `landing-content.es.md` §3.5.
- `sectionTitle` is the exact §3.5 title. **No subtitle is added** (none exists in the source content — do not fabricate content per the brief's "All visible texts must be taken from that file").
- `kindLabels` are short actor tags derived directly from each step's subject ("La empresa" / "El cliente" / "El sistema" / "recibo"). See §12 (Open Decision) — flag for approver.

#### `<template>`

```html
<section id="how-it-works" class="how-it-works-section">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-10 col-lg-9">
        <h2 data-reveal class="how-it-works-title">{{ sectionTitle }}</h2>

        <ol data-reveal class="how-it-works-steps">
          <li
            v-for="step in steps"
            :key="step.number"
            class="how-it-works-step"
          >
            <div class="how-it-works-node" :class="`how-it-works-node--${step.kind}`">
              <i :class="step.icon" class="how-it-works-icon" aria-hidden="true"></i>
              <span class="how-it-works-number" aria-hidden="true">{{ step.number }}</span>
            </div>

            <div class="how-it-works-card dark-card">
              <span class="how-it-works-tag">{{ kindLabels[step.kind] }}</span>
              <p class="how-it-works-text">{{ step.text }}</p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </div>
</section>
```

- `<ol>` conveys ordered flow semantically; the visible number badge is decorative (`aria-hidden`).
- The `<i :class="step.icon" ...>` pattern matches the existing `UseCasesSection.vue` icon binding. `bootstrap-icons` is imported globally in `main.ts`, so no per-component import is needed.

#### `<style scoped>`

```css
.how-it-works-section {
  background: var(--color-bg-dark);
  color: var(--color-text-on-dark);
}

.how-it-works-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 2.5rem;
  line-height: 1.25;
  text-align: center;
}

.how-it-works-steps {
  list-style: none;
  padding-left: 0;
  margin-bottom: 0;
  position: relative;
}

.how-it-works-steps::before {
  content: '';
  position: absolute;
  left: 23px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(var(--color-primary), var(--color-accent));
  opacity: 0.55;
}

.how-it-works-step {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}

.how-it-works-step:last-child {
  margin-bottom: 0;
}

.how-it-works-node {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-card-alt);
  border: 2px solid var(--node-color, var(--color-primary));
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.how-it-works-icon {
  font-size: 1.1rem;
  color: var(--node-color, var(--color-primary));
}

.how-it-works-number {
  position: absolute;
  top: -6px;
  right: -6px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border-radius: 9px;
  background: var(--color-bg-deepest);
  border: 1px solid var(--color-border);
  color: var(--color-text-on-dark-muted);
  font-size: 0.7rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.how-it-works-node--empresa { --node-color: var(--color-primary); }
.how-it-works-node--cliente { --node-color: var(--color-accent); }
.how-it-works-node--sistema {
  --node-color: var(--color-primary);
  border-style: dashed;
  animation: how-it-works-auto 3s linear infinite;
}
.how-it-works-node--resultado {
  --node-color: var(--color-accent);
  background: var(--color-accent);
}
.how-it-works-node--resultado .how-it-works-icon {
  color: var(--color-bg-deepest);
}

@keyframes how-it-works-auto {
  0%   { border-color: var(--color-primary); }
  50%  { border-color: var(--color-primary-hover); }
  100% { border-color: var(--color-primary); }
}

.how-it-works-step:hover .how-it-works-node {
  transform: translateY(-2px);
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.06);
}

.how-it-works-card {
  flex: 1;
  padding: 1rem 1.25rem;
  border-radius: 12px;
}

.how-it-works-tag {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-text-on-dark-dim);
  margin-bottom: 0.25rem;
}

.how-it-works-text {
  margin-bottom: 0;
  font-size: 1rem;
  line-height: 1.55;
  color: var(--color-text-on-dark);
}

@media (max-width: 767.98px) {
  .how-it-works-title {
    font-size: 1.75rem;
    margin-bottom: 1.75rem;
  }
  .how-it-works-step {
    gap: 1rem;
    margin-bottom: 1.25rem;
  }
  .how-it-works-text {
    font-size: 0.95rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .how-it-works-node--sistema { animation: none; }
  .how-it-works-step:hover .how-it-works-node { transform: none; }
}
```

### Step 5.3 — Wire into `src/App.vue`

Two edits in `App.vue`:

1. **Import** (after the `SolutionSection` import line):
```ts
import HowItWorksSection from '@/components/landing/HowItWorksSection.vue'
```
2. **Render** (between `<SolutionSection />` and `<UseCasesSection />`, matching §3.5 position):
```html
<SolutionSection />
<HowItWorksSection />
<UseCasesSection />
```

### Step 5.4 — Wire into `src/components/landing/Navbar.vue`

Add a nav entry to the `menuItems` array **after** the `'La Solución'` entry so the scroll-spy `IntersectionObserver` tracks the new section and the nav link scrolls to it:

```ts
const menuItems: NavMenuItem[] = [
  { label: 'Inicio', sectionId: 'hero' },
  { label: 'El Problema', sectionId: 'problem' },
  { label: 'La Solución', sectionId: 'solution' },
  { label: 'Cómo funciona', sectionId: 'how-it-works' },
  { label: 'Rubros', sectionId: 'use-cases' },
  { label: 'Funcionalidades', sectionId: 'features' },
  { label: 'Prueba Gratis', sectionId: 'beta' },
  { label: 'Precios', sectionId: 'pricing' },
  { label: 'Dudas', sectionId: 'faq' },
  { label: 'Contacto', sectionId: 'contact' }
]
```

No other Navbar changes are required — the existing `scrollToSection` and `IntersectionObserver` logic auto-handles any `sectionId` in `menuItems`.

### Step 5.5 — Lint

```bash
npm run lint
```
Fix any ESLint/Prettier issues before proceeding.

### Step 5.6 — Build (type-check + production build)

```bash
npm run build
```
`vue-tsc -b && vite build` type-checks the new types file and component, then builds. Must succeed with no errors.

### Step 5.7 — Dev visual verification

```bash
npm run dev
```
Manually verify (developer, not automated):
- Section appears between Solution and Use Cases.
- `#how-it-works` anchor scrolls correctly (70px navbar offset via existing Navbar logic).
- Navbar link "Cómo funciona" highlights via scroll-spy when the section is in view.
- All 7 steps render in order with correct icons and exact text.
- Responsive: check at ≥992px, 768–991px, and <768px (DevTools device toolbar). Rail aligns to node centers; cards do not overflow; fonts/spacing scale down on mobile.
- Scroll-reveal: title and steps container fade/translate in on scroll into view.
- `prefers-reduced-motion`: the sistema dashed-border animation and hover lift are disabled.

### Step 5.8 — Git commit

Follow Gitignore Compliance Rule: read `.gitignore`, run `git status`, ensure no `node_modules/`, `dist/`, `.env`, etc. are staged.

Stage only the intended source files:
```bash
git add src/types/how-it-works.ts src/components/landing/HowItWorksSection.vue src/App.vue src/components/landing/Navbar.vue
```

Commit:
```bash
git commit -m "feat(how-it-works): add 7-step vertical flowchart section"
```

---

## 6. Styling Approach (Summary)

- **Background**: `--color-bg-dark`. Fits the section alternation: Solution (`--color-bg-navy`) → **HowItWorks (`--color-bg-dark`)** → Use Cases (`--color-bg-slate`) — a smooth 2–4% luminance descent with no adjacent equal shades.
- **Rail**: vertical 2px pseudo-element on `.how-it-works-steps`, gradient `--color-primary → --color-accent`, 55% opacity, positioned at node center (`left: 23px` for 46px nodes).
- **Nodes**: 46px circles, `--color-bg-card-alt` background, 2px border + icon color driven by a per-kind `--node-color` custom property (single source of truth → fewer CSS lines).
- **Kind treatments** (only existing palette colors; no new shades per style guide):
  - `empresa` → blue (`--color-primary`), solid border.
  - `cliente` → emerald (`--color-accent`), solid border.
  - `sistema` → blue, **dashed animated** border (signals "automático").
  - `resultado` → emerald, **filled** background + dark icon (signals terminal success/recibo).
- **Cards**: reuse global `.dark-card` (depth via bg contrast + border, no shadow) with a tighter `1rem 1.25rem` padding and 12px radius.
- **Actor tag**: uppercase, `--color-text-on-dark-dim`, 0.72rem — small structural label above each step text.
- **Number badge**: small pill at node top-right, `--color-bg-deepest` background, decorative (`aria-hidden`).
- **Hover**: node lifts 2px with a subtle white glow; respects reduced-motion.
- **No hardcoded hex** except the neutral `rgba(255,255,255,0.06)` glow (theme-agnostic, not a brand color).

---

## 7. Responsive Behavior

- **Desktop (≥992px)**: single centered column (`col-12 col-md-10 col-lg-9`), left-rail timeline, full-width cards.
- **Tablet (768–991px)**: same single-column timeline; column narrows to `col-md-10`.
- **Mobile (<768px)**: title scales to `1.75rem`, step gap reduces to `1rem`, vertical spacing to `1.25rem`, step text to `0.95rem`. Rail + nodes remain on the left; cards fill remaining width. No horizontal overflow.
- **No fixed heights anywhere** (unlike Vue Flow) — height is content-driven, so mobile scroll is never intercepted.

---

## 8. Accessibility

- Semantic `<ol>`/`<li>`: step order is meaningful and exposed to assistive tech.
- Visible number and icon are decorative (`aria-hidden="true"`); the `<ol>` provides the ordering semantics.
- Sufficient contrast: text uses `--color-text-on-dark` (WCAG AA per style guide); tags use `--color-text-on-dark-dim` for de-emphasis.
- `prefers-reduced-motion`: disables the sistema animation and hover lift.
- Keyboard: no custom interactive widgets; standard page scroll + anchor navigation (existing Navbar `scrollToSection`).

---

## 9. Rules-Compliance Notes

- **project-structure**: types in `src/types/`, component in `src/components/landing/` — matches `.agent/project-structure.md`.
- **max-lines-per-file**: component target ~150 lines (≤200 hard limit). The `--node-color` pattern keeps CSS compact. If the file exceeds 200 lines after implementation, trim the optional number badge or consolidate media queries.
- **max-depth**: JS/CSS logic stays within 2 nesting levels. Template HTML depth follows the existing `UseCasesSection.vue` pattern (the rule is applied to logic blocks, not markup).
- **single-section-boolean-conditions**: N/A (no compound boolean conditions).
- **prefer-private-members**: N/A (no class; `<script setup>` consts are module-scoped).
- **no-commented-code / self-documenting-code**: names are descriptive (`sectionTitle`, `kindLabels`, `steps`, `HowItWorksStepKind`); no commented-out code.
- **CSS variables only**: all colors reference `variables.css`; the only literal is the neutral glow `rgba(255,255,255,0.06)`.
- **Language rules**: user-facing text in Spanish (from content file); all code artifacts in English.

---

## 10. Downstream Critical-Workflow Steps (handled by separate sub-agents)

- **4.3 Code Review** (code-reviewer): review against this plan; if deviations, produce a fix plan in `.kilo/plans/` and reassign to implementer (max 3 cycles).
- **4.4 Documentation** (docs-specialist):
  - Update `.agent/project-structure.md`: add `HowItWorksSection.vue` to the `components/landing/` comment and note `types/how-it-works.ts`.
  - Update `.agent/project-info/style-guide.md`: add a "HowItWorksSection" component section (file, purpose, key features) and insert a row in the §3.1 Section Background Pattern table between Solution and Use Cases.
  - Update `.agent/project-info/CONTEXT.md`: log the new section per the project-info closing step.
- **4.5 Verification** (architect): confirm implementation matches this plan; commit any unstaged files.
- **4.6 Task Completion** (implementer): mark Task 3 done in the TODO file; commit.

---

## 11. Verification Checklist (for implementer self-check before commit)

- [ ] `src/types/how-it-works.ts` exists with `HowItWorksStepKind` + `HowItWorksStep`.
- [ ] `src/components/landing/HowItWorksSection.vue` exists, `id="how-it-works"`, ≤200 lines.
- [ ] 7 step texts are **exact** matches to `landing-content.es.md` §3.5.
- [ ] Title is exactly "Cómo funciona Cobranza App".
- [ ] No fabricated subtitle or extra marketing content.
- [ ] `useScrollReveal()` imported and called; `data-reveal` on title and steps container.
- [ ] `App.vue` renders `<HowItWorksSection />` between Solution and Use Cases.
- [ ] `Navbar.vue` `menuItems` includes `{ label: 'Cómo funciona', sectionId: 'how-it-works' }` after 'La Solución'.
- [ ] All colors use CSS variables from `variables.css` (no hardcoded brand hex).
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes (type-check + build).
- [ ] Manual responsive + scroll-spy + scroll-reveal verification done via `npm run dev`.
- [ ] Git: only intended files staged; commit message follows conventional-commits style.

---

## 12. Open Decision (flag for approver)

**Actor tag labels** (`Empresa` / `Cliente` / `Automático` / `Recibo`) are rendered as small uppercase tags above each step text. These words are derived directly from each step's subject in the content ("La empresa" / "El cliente" / "El sistema" / "recibo") and improve diagram clarity, but they are not standalone labels in §3.5.

- **Default in this plan**: include the tags (they come from the content sentences and make the flowchart self-documenting).
- **Alternative**: remove the tags entirely and rely on icon + node color alone, for the strictest "only literal §3.5 text" interpretation.

The approver may choose to keep or drop the tags; the rest of the plan is unaffected.

---

## 13. What Was NOT Done in This Step

- No code files were written or modified (plan only, per architect role).
- No git commands were run.
- Vue Flow was **not** installed (recommendation: do not install it).
- No documentation files were modified (doc updates are step 4.4).
