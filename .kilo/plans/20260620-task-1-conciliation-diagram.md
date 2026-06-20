# Plan — Task 1: Conciliation Diagram Update & Mobile Overflow Fix

- **Date:** 2026-06-20
- **Branch:** `feat/landing-ui-fixes-20260620`
- **TODO file:** `.agent/todos/20260620/20260620-todo-0.md` (line 1 + graph-container part of line 4)
- **Step:** 4.1 Analysis & Planning (Critical Workflow)
- **Files in scope:** `src/components/landing/ConciliationDiagram.vue`, `src/components/landing/HowItWorksSection.vue`
- **Status:** Draft (pending Plan Agent approval)

---

## 1. Pre-Analysis

### Global context
- Vue 3 + TypeScript + Bootstrap 5 + Vite landing page (dark-first palette).
- No test suite exists (no `*.test.*`/`*.spec.*` files; `package.json` has no `test` script). Verification = `lint` + `build` + manual visual checks.
- `ConciliationDiagram.vue` is consumed **only** by `HowItWorksSection.vue` (grep confirmed: 1 import, 1 usage). Changes are fully localized.
- Diagram renders on **step 5** of "Cómo funciona Cobranza App" (`CONCILIATION_STEP_NUMBER = 5`, kind `sistema`, dashed timeline node) — see `src/data/how-it-works.ts`.
- CSS variables used by the diagram all exist in `src/assets/styles/variables.css`: `--color-text-on-dark-dim` (#64748b), `--color-accent` (#10b981), `--color-bg-card`, `--color-bg-card-alt`, `--color-border`, `--color-text-on-dark`.

### Per-task analysis
1. **Edge replacement:** Remove `Cliente → Deuda`; add `Cliente → Comprobante`. `Deuda` must remain connected to the graph (keep `Deuda → Match`). With `Deuda` staying at `(40,90)` (directly below `Cliente`), a `Cliente → Comprobante` diagonal would cross the `Deuda` node. Therefore `Deuda` must be **repositioned** to the top row (right of `Cliente`) so both new/kept diagonals are collision-free and parallel.
2. **Visual polish (Extracto → Transferencia arrow):** Current arrow is a straight `<line>` at `x=470` — the **left edge** of both nodes, not their center (`535`). This is a real misalignment. Fix: center on `x=535`, convert to a gentle quadratic curve, and refine the shared arrowhead marker. Add `stroke-linecap/linejoin: round` to all edges for overall softness. Align `Validación final` under `Match` so the result arrow lands at its center.
3. **Mobile overflow:** The SVG keeps `min-width: 480px` on mobile (intentional, for readability). The page scrolls horizontally because the flex item `.step-content` (child of `.step-row { display:flex }`) has the default `min-width: auto`, so it refuses to shrink below the SVG's 480px intrinsic width, overflowing the Bootstrap column/container. The `.conciliation-diagram-scroll` wrapper already has `overflow-x: auto`, but it never becomes narrower than 480px because its flex ancestor won't shrink — so internal scrolling never engages and the overflow spills to the page. **Root-cause fix:** `min-width: 0` on `.step-content` so the flex item shrinks; then the scroll wrapper takes the available width and the 480px SVG scrolls **internally**. The TODO line 4 navbar-width concern is a symptom of this same page-wide horizontal overflow; fixing the graph container resolves it.

---

## 2. High-Level Approach

Surgical edits only — no new files, no viewBox change (stays `0 0 620 300`), no new dependencies.

1. `ConciliationDiagram.vue`:
   - Update `diagramLabel` aria-label to match the new flow.
   - Refine the shared `conciliationArrow` marker (sleeker concave arrowhead, slightly larger).
   - Move `Deuda` node from `translate(40,90)` → `translate(200,20)` (top row, right of `Cliente`).
   - Move `Validación final` node from `translate(340,250)` → `translate(320,250)` (center under `Match`).
   - Replace the 6-edge block: remove `Cliente → Deuda`; add `Cliente → Comprobante`; re-coordinate `Deuda → Match`; convert `Extracto → Transferencia` to a centered curved `<path>`; keep the other 3 edges.
   - CSS: add `stroke-linecap/linejoin: round` to `.conciliation-edge`; add `max-width: 100%` to `.conciliation-diagram-scroll` (defensive clamp).
2. `HowItWorksSection.vue`:
   - CSS: add `min-width: 0` to `.step-content` (the actual overflow fix).
3. Verify: `npm run lint`, `npm run build`, manual visual checks at multiple viewports.
4. Commit (no push — push happens at Critical Workflow step 5, to `origin` only).

---

## 3. Current State (before)

viewBox `0 0 620 300`. Node `translate(x,y)` places the rect's top-left.

| Node | translate | rect (w×h) | center | key anchors |
|---|---|---|---|---|
| Cliente | (40,20) | 120×36 | (100,38) | bottom-center (100,56) |
| Deuda | (40,90) | 120×36 | (100,108) | bottom-center (100,126), right (160,108) |
| Comprobante | (170,170) | 140×36 | (240,188) | top-center (240,170), right (310,188) |
| Match | (340,170) | 90×40 | (385,190) | top (385,170), left (340,190), right (430,190), bottom (385,210) |
| Transferencia | (470,170) | 130×36 | (535,188) | top (535,170), left (470,188) |
| Extracto bancario | (470,90) | 130×36 | (535,108) | bottom-center (535,126) |
| Validación final | (340,250) | 130×36 | (405,268) | top-center (405,250) |

Current edges (all `<line>` with `marker-end="url(#conciliationArrow)"`):

1. `Cliente → Deuda`: (100,56) → (100,90) — vertical
2. `Deuda → Match`: (160,126) → (360,170) — diagonal
3. `Comprobante → Match`: (310,188) → (340,188) — horizontal
4. `Extracto → Transferencia`: (470,126) → (470,170) — vertical, **at left edge (misaligned from center 535)**
5. `Transferencia → Match`: (470,188) → (430,188) — horizontal
6. `Match → Validación`: (385,210) → (385,250) — vertical, lands left-of-center of Validación (center 405)

---

## 4. Target State (after)

viewBox unchanged `0 0 620 300`.

| Node | translate | Change |
|---|---|---|
| Cliente | (40,20) | unchanged |
| **Deuda** | **(200,20)** | **moved** (top row, right of Cliente; spans x[200,320] y[20,56], center (260,38)) |
| Comprobante | (170,170) | unchanged |
| Match | (340,170) | unchanged |
| Transferencia | (470,170) | unchanged |
| Extracto bancario | (470,90) | unchanged |
| **Validación final** | **(320,250)** | **moved** (center now 385, aligned under Match; spans x[320,450] y[250,286]) |

New edges:

| # | Edge | Geometry | Type |
|---|---|---|---|
| A | `Cliente → Comprobante` | (100,56) → (240,170) | `<line>` diagonal — **NEW (replaces old #1)** |
| B | `Deuda → Match` | (260,56) → (385,170) | `<line>` diagonal — **re-coordinated** |
| C | `Comprobante → Match` | (310,188) → (340,188) | `<line>` horizontal — unchanged |
| D | `Extracto → Transferencia` | `M 535 126 Q 548 148 535 170` | `<path>` centered gentle curve — **improved** |
| E | `Transferencia → Match` | (470,188) → (430,188) | `<line>` horizontal — unchanged |
| F | `Match → Validación` | (385,210) → (385,250) | `<line>` vertical — unchanged (Validación moved to align) |

### Collision checks (verified)
- Edge A (100,56→240,170) vs `Deuda` (x[200,320] y[20,56]): at x=200 the line is at y≈137 (below Deuda's y≤56). No crossing.
- Edge A vs `Deuda → Match` edge B (260,56→385,170): A spans x[100,240], B spans x[260,385] — no x-overlap; clean parallel diagonals.
- Edge B vs `Comprobante` (x[170,310] y[170,206]): B reaches y=170 only at x=385 (>310). No crossing; lands on Match top-center.
- Edge D curve (y[126,170], x≈535–548): no nodes in that gap; centered under Extracto/Transferencia (both center x=535).
- Edge F lands at (385,250) = new Validación top-center. Clean vertical.

---

## 5. Detailed Implementation Steps (exact edits)

Apply in order. All snippets match current file content exactly (indentation preserved). Use `vscode-mcp-server_replace_lines_code` / `edit` with the old/new pairs below.

### Edit 1 — `ConciliationDiagram.vue`: update aria-label (script)

**OLD:**
```
const diagramLabel =
  'Diagrama de conciliación: Cliente y Deuda, Comprobante, Extracto Bancario y Transferencia confluyen en un Match central que produce la Validación final.'
```
**NEW:**
```
const diagramLabel =
  'Diagrama de conciliación: el Cliente emite un Comprobante; la Deuda, el Comprobante y la Transferencia del Extracto bancario confluyen en un Match central que produce la Validación final.'
```

### Edit 2 — `ConciliationDiagram.vue`: refine shared arrowhead marker

**OLD:**
```
        <marker
          id="conciliationArrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" :fill="'var(--color-text-on-dark-dim)'" />
        </marker>
```
**NEW:**
```
        <marker
          id="conciliationArrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="8"
          markerHeight="8"
          orient="auto-start-reverse"
        >
          <path d="M 1 1 L 10 5 L 1 9 L 3.5 5 z" :fill="'var(--color-text-on-dark-dim)'" />
        </marker>
```
Rationale: concave-back triangle = sleeker arrowhead; `markerWidth/Height` 7→8 for slightly better visibility (applies to all arrows = overall polish). `refX=9`/`refY=5` unchanged so tip alignment is preserved.

### Edit 3 — `ConciliationDiagram.vue`: move `Deuda` node to top row

**OLD:**
```
      <g class="conciliation-node" transform="translate(40,90)">
        <rect width="120" height="36" rx="8" />
        <text x="60" y="23" text-anchor="middle">Deuda</text>
      </g>
```
**NEW:**
```
      <g class="conciliation-node" transform="translate(200,20)">
        <rect width="120" height="36" rx="8" />
        <text x="60" y="23" text-anchor="middle">Deuda</text>
      </g>
```

### Edit 4 — `ConciliationDiagram.vue`: move `Validación final` to center under Match

**OLD:**
```
      <g class="conciliation-node conciliation-node--result" transform="translate(340,250)">
        <rect width="130" height="36" rx="8" />
        <text x="65" y="23" text-anchor="middle">Validación final</text>
      </g>
```
**NEW:**
```
      <g class="conciliation-node conciliation-node--result" transform="translate(320,250)">
        <rect width="130" height="36" rx="8" />
        <text x="65" y="23" text-anchor="middle">Validación final</text>
      </g>
```

### Edit 5 — `ConciliationDiagram.vue`: replace the 6-edge block

**OLD:**
```
      <line
        x1="100"
        y1="56"
        x2="100"
        y2="90"
        class="conciliation-edge"
        marker-end="url(#conciliationArrow)"
      />
      <line
        x1="160"
        y1="126"
        x2="360"
        y2="170"
        class="conciliation-edge"
        marker-end="url(#conciliationArrow)"
      />
      <line
        x1="310"
        y1="188"
        x2="340"
        y2="188"
        class="conciliation-edge"
        marker-end="url(#conciliationArrow)"
      />
      <line
        x1="470"
        y1="126"
        x2="470"
        y2="170"
        class="conciliation-edge"
        marker-end="url(#conciliationArrow)"
      />
      <line
        x1="470"
        y1="188"
        x2="430"
        y2="188"
        class="conciliation-edge"
        marker-end="url(#conciliationArrow)"
      />
      <line
        x1="385"
        y1="210"
        x2="385"
        y2="250"
        class="conciliation-edge"
        marker-end="url(#conciliationArrow)"
      />
```
**NEW:**
```
      <line
        x1="100"
        y1="56"
        x2="240"
        y2="170"
        class="conciliation-edge"
        marker-end="url(#conciliationArrow)"
      />
      <line
        x1="260"
        y1="56"
        x2="385"
        y2="170"
        class="conciliation-edge"
        marker-end="url(#conciliationArrow)"
      />
      <line
        x1="310"
        y1="188"
        x2="340"
        y2="188"
        class="conciliation-edge"
        marker-end="url(#conciliationArrow)"
      />
      <path
        d="M 535 126 Q 548 148 535 170"
        class="conciliation-edge"
        marker-end="url(#conciliationArrow)"
      />
      <line
        x1="470"
        y1="188"
        x2="430"
        y2="188"
        class="conciliation-edge"
        marker-end="url(#conciliationArrow)"
      />
      <line
        x1="385"
        y1="210"
        x2="385"
        y2="250"
        class="conciliation-edge"
        marker-end="url(#conciliationArrow)"
      />
```
Edge order in NEW: A (Cliente→Comprobante), B (Deuda→Match), C (Comprobante→Match), D (Extracto→Transferencia curve), E (Transferencia→Match), F (Match→Validación). `.conciliation-edge` already sets `fill: none`, so the `<path>` renders as stroke-only.

### Edit 6 — `ConciliationDiagram.vue`: edge stroke caps (polish)

**OLD:**
```
.conciliation-edge {
  stroke: var(--color-text-on-dark-dim);
  stroke-width: 1.5;
  fill: none;
}
```
**NEW:**
```
.conciliation-edge {
  stroke: var(--color-text-on-dark-dim);
  stroke-width: 1.5;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}
```

### Edit 7 — `ConciliationDiagram.vue`: clamp scroll wrapper width

**OLD:**
```
.conciliation-diagram-scroll {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
```
**NEW:**
```
.conciliation-diagram-scroll {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  max-width: 100%;
}
```

### Edit 8 — `HowItWorksSection.vue`: the overflow root-cause fix

**OLD:**
```
.step-content {
  flex: 1;
}
```
**NEW:**
```
.step-content {
  flex: 1;
  min-width: 0;
}
```
Why this is the fix: `.step-content` is the flex item of `.step-row { display:flex }`. Default `min-width: auto` prevents it from shrinking below the SVG's 480px intrinsic min width, overflowing the page. `min-width: 0` lets it shrink; then `.conciliation-diagram-scroll` (block, clamped to 100% via Edit 7) takes the available width and the 480px SVG scrolls internally via `overflow-x: auto`. Desktop is unaffected (`.step-content` has ample width; `min-width: 0` is a no-op there).

---

## 6. CSS Changes Summary

| File | Selector | Change | Purpose |
|---|---|---|---|
| ConciliationDiagram.vue | `.conciliation-edge` | + `stroke-linecap: round; stroke-linejoin: round;` | overall edge polish |
| ConciliationDiagram.vue | `.conciliation-diagram-scroll` | + `max-width: 100%;` | defensive width clamp |
| HowItWorksSection.vue | `.step-content` | + `min-width: 0;` | **root-cause fix** for mobile page overflow |

No changes to `.conciliation-diagram` (keeps `max-width: 560px` + mobile `min-width: 480px`), node styles, or the mobile media query. The 480px min-width is intentionally retained so the diagram scrolls internally instead of being squished.

---

## 7. Build / Lint / Verification Commands

Run from project root (`C:\projects\cobranza-app\landing`):

```powershell
npm run lint
npm run build
```

- `npm run lint` → `eslint .` must exit 0 (no errors/warnings).
- `npm run build` → `vue-tsc -b && vite build` must succeed (type-check + production build).
- Optional manual run: `npm run dev` (Vite dev server) for live visual inspection; `npm run preview` to inspect the production build.

No unit tests to run (none exist in the project).

---

## 8. Manual Testing Instructions

Navigate to the deployed/dev page, scroll to **"Cómo funciona Cobranza App"** → **step 5** (the `Sistema` step with the dashed timeline node, containing the conciliation diagram).

### Viewports to check
- **360 × 640** (small Android)
- **375 × 667** (iPhone SE/8)
- **414 × 896** (iPhone Plus)
- **768 × 1024** (iPad portrait — md breakpoint boundary)
- **1280 × 800** (desktop)

### Acceptance checks
1. **No page horizontal scroll** at 360/375/414 widths: the body/page must not move horizontally. (This also resolves the TODO line 4 navbar-width symptom, which is caused by the same page overflow.)
2. **Internal scroll works**: at mobile widths, swipe/drag horizontally **inside** the diagram card → the diagram scrolls within its container; the page stays fixed.
3. **Diagram fits on desktop/tablet**: at ≥768px the diagram is centered, max 560px wide, no internal scroll needed.
4. **Edges correct** (all viewports):
   - `Cliente → Comprobante` diagonal (top-left down to Comprobante).
   - `Deuda → Match` diagonal (top, right of Cliente, down to Match).
   - `Comprobante → Match` horizontal (left into Match).
   - `Extracto bancario → Transferencia` **centered** gentle curve with a refined arrowhead (no longer hugging the left edge).
   - `Transferencia → Match` horizontal (right into Match).
   - `Match → Validación final` vertical, landing at the **center** of Validación's top edge.
5. **No edge crosses a node**; arrowheads point in the travel direction.
6. **Deuda** sits on the top row to the right of Cliente; **Validación final** is centered under Match.
7. Arrowheads look sleeker/concave and slightly larger; edge ends are softly rounded.
8. `aria-label` (inspect the `<svg>` element) reflects the new flow (Cliente emite Comprobante …).

---

## 9. Git Handling (for step 4.2 — Implementation)

- Already on branch `feat/landing-ui-fixes-20260620` (no branch creation in this step).
- Before commit: run `git status` and read `.gitignore`; ensure only the two intended files are staged; ensure no `node_modules/`, `dist/`, or other gitignored artifacts are staged (Gitignore Compliance Rule).
- Stage exactly: `src/components/landing/ConciliationDiagram.vue`, `src/components/landing/HowItWorksSection.vue`.
- Commit message (matches repo style — lowercase, scoped):
  ```
  fix(landing): update conciliation diagram edges and fix mobile overflow
  ```
- Do **not** push in this step (push happens at Critical Workflow step 5, to `origin` only — Git Remote Safety Rule).

---

## 10. Code Review Checklist (for step 4.3)

- [ ] All 8 edits applied exactly as specified; no stray changes.
- [ ] Edge coordinates match the Target State table; no edge crosses any node (re-run collision checks).
- [ ] `Extracto → Transferencia` is a centered `<path>` curve (x=535), not the old left-edge line.
- [ ] `Deuda` at `translate(200,20)`; `Validación final` at `translate(320,250)`.
- [ ] Marker refined (`markerWidth/Height=8`, concave path); arrowheads render correctly on all 6 edges.
- [ ] Mobile overflow fixed: `min-width: 0` on `.step-content`; `max-width: 100%` on `.conciliation-diagram-scroll`; verified at 360px (internal scroll, no page scroll).
- [ ] `aria-label` updated and accurate.
- [ ] No commented-out code (No Commented Code Rule); names self-documenting; no unrelated code removed (Preserve Existing Code).
- [ ] `npm run lint` and `npm run build` pass.
- [ ] File line counts: ConciliationDiagram.vue (~175) and HowItWorksSection.vue (~176) both under 200 (Max Lines per File Rule). No method bodies > 50 lines (N/A — markup/CSS only). Max depth ≤ 2 in logic (N/A — template markup only).

---

## 11. Documentation Update (for step 4.4 — Documentation)

- Append a dated entry to `.agent/project-info/context.md` under **Recent Changes**:
  - `2026-06-20`: Conciliation diagram updated — replaced `Cliente → Deuda` edge with `Cliente → Comprobante`; repositioned `Deuda` to top row (still feeds Match); repositioned `Validación final` to center under Match; improved `Extracto → Transferencia` arrow (centered gentle curve + refined concave arrowhead marker); added rounded stroke caps; fixed mobile page overflow via `min-width: 0` on `.step-content` (diagram now scrolls internally instead of breaking page width); updated diagram `aria-label`; self-documenting code; no comments needed.
- No README change required (component is internal).
- No `.agent/project-structure.md` change (no new folders/files).

---

## 12. Verification & Completion (for steps 4.5 / 4.6)

- **4.5 Verification:** Confirm implementation matches this plan; run `git status` and commit any unstaged intended changes; re-run `npm run lint` + `npm run build`.
- **4.6 Task Completion:** Mark the task done in `.agent/todos/20260620/20260620-todo-0.md`:
  - Line 1: append ` [DONE]` (the edge + visual-polish task).
  - Line 4: the graph-container overflow concern is resolved by this task; append ` [DONE]` to line 4 **only** for the graph-container part. **Note:** line 4 also mentions navbar width — that is the same page-overflow symptom and is resolved by the graph-container fix. If the reviewer confirms the navbar no longer overflows at 360px, mark line 4 ` [DONE]`; otherwise leave line 4 open and flag for a separate task. Do not delete or alter other TODO lines. Commit the TODO update with message like `chore: mark conciliation diagram task done`.

---

## 13. Rules Compliance Check

- **Project Structure:** edits only to existing files under `src/components/landing/` — compliant.
- **Max Lines per File / Method / Depth:** both files remain well under 200 lines; no logic methods; template/CSS markup only — compliant.
- **Self-Documenting Code / No Commented Code:** no comments added or left; existing top-of-file comment remains accurate — compliant.
- **Prefer Private Members / Max Arguments:** N/A (no class/method params) — compliant.
- **Newline Prevention:** all file content uses real newlines — compliant.
- **Gitignore Compliance / Git Remote Safety:** addressed in §9 — compliant.

---

## 14. Risks & Notes

- **Marker geometry change is global:** refining `conciliationArrow` affects all 6 arrowheads. This is intentional (overall polish). If the concave notch (`L 3.5 5`) renders undesirably at small sizes, fallback is to keep `markerWidth/Height=8` with the original triangle path `M 0 0 L 10 5 L 0 10 z` — still an improvement in size. Reviewer to visually confirm.
- **Deuda semantic link to Cliente is removed** (per the explicit requirement). The client→debt relationship is implied; `Deuda` still feeds `Match`, keeping the graph coherent.
- **`min-width: 0` on `.step-content` is the sole root-cause fix.** Edit 7 (`max-width: 100%`) is a defensive clamp only. Do not remove the SVG's mobile `min-width: 480px` — it is required so the diagram stays readable and scrolls internally rather than being squished.
- **No viewBox change** — coordinate plan is fully valid within `0 0 620 300` (max x used = 600 Transferencia right edge; max y = 286 Validación bottom).
