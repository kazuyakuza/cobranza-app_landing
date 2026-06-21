# Plan — Task 2: ConciliationDiagram Node Repositioning

- Date: 2026-06-20
- Step: Critical Workflow 4.1 (Analysis & Planning)
- Target file: `src/components/landing/ConciliationDiagram.vue`
- Type: Layout-only change (SVG transforms + edge coordinates). No logic, CSS, sizes, or viewBox changes.

## 1. Goal

Reposition the SVG nodes in `ConciliationDiagram.vue` to match this exact layout:

```text
    Cliente       Deuda     Extracto Bancario
       ↓            ↓            ↓
  Comprobante ──► Match ◄── Transferencia
                    ↓
             Validación final
```

Three evenly-spaced columns. Top row feeds straight down into the middle row; the middle row converges horizontally into `Match`; `Match` feeds straight down into `Validación final`.

## 2. Current State Analysis

File confirmed identical to the task snippet (attributes are multi-line but values match).

Current node geometry (translate + rect w×h + text offset → center):

| Node | translate | rect | center | spans |
|---|---|---|---|---|
| Cliente | (40,20) | 120×36 | (100,38) | x[40,160] y[20,56] |
| Deuda | (200,20) | 120×36 | (260,38) | x[200,320] y[20,56] |
| Comprobante | (170,170) | 140×36 | (240,188) | x[170,310] y[170,206] |
| Match | (340,170) | 90×40 | (385,190) | x[340,430] y[170,210] |
| Transferencia | (470,170) | 130×36 | (535,188) | x[470,600] y[170,206] |
| Extracto bancario | (470,90) | 130×36 | (535,108) | x[470,600] y[90,126] |
| Validación final | (320,250) | 130×36 | (385,268) | x[320,450] y[250,286] |

Current edges:

| Edge | Element | Coords |
|---|---|---|
| Cliente→Comprobante | line | (100,56)→(240,170) diagonal |
| Deuda→Match | line | (260,56)→(385,170) diagonal |
| Comprobante→Match | line | (310,188)→(340,188) horizontal |
| Extracto→Transferencia | path | `M 535 126 Q 548 148 535 170` curved |
| Transferencia→Match | line | (470,188)→(430,188) horizontal |
| Match→Validación | line | (385,210)→(385,250) vertical |

Defects vs. desired layout:
- `Cliente` (center 100) is NOT centered above `Comprobante` (center 240); arrow is diagonal.
- `Deuda` (center 260) is NOT centered above `Match` (center 385); arrow is diagonal.
- `Extracto bancario` sits at y=90 (middle band) instead of the top row (y=20); arrow is curved.
- Middle row is right-heavy (left margin 170, right margin 20); columns are not evenly spaced.

## 3. Approach — Column Rebalancing

The ASCII target shows three EVEN columns. Keeping the current middle-row centers (240/385/535) and merely aligning the top nodes would push `Cliente` to x=180, leaving ~180px of left whitespace — unbalanced and not matching the target. Therefore the three columns are rebalanced evenly across the existing `viewBox="0 0 620 300"` (no viewBox change needed).

Middle-row widths: 140 (Comprobante) + 90 (Match) + 130 (Transferencia) = 360.
Free space: 620 − 360 = 260, split across 4 gaps (2 side margins + 2 internal) = 65 each.

Resulting column centers: **135 / 315 / 490** (evenly spaced, balanced margins: left 65–75, right 65).

Rows (per requirements): top **y=20**, middle **y=150**, bottom **y=250**.

## 4. New Node Transforms (old → new)

Only `transform="translate(x,y)"` changes. Rect widths/heights and `text` x/y stay identical.

| Node | Old translate | New translate | New center | New spans |
|---|---|---|---|---|
| Cliente | (40,20) | **(75,20)** | (135,38) | x[75,195] y[20,56] |
| Deuda | (200,20) | **(255,20)** | (315,38) | x[255,375] y[20,56] |
| Comprobante | (170,170) | **(65,150)** | (135,168) | x[65,205] y[150,186] |
| Match | (340,170) | **(270,150)** | (315,170) | x[270,360] y[150,190] |
| Transferencia | (470,170) | **(425,150)** | (490,168) | x[425,555] y[150,186] |
| Extracto bancario | (470,90) | **(425,20)** | (490,38) | x[425,555] y[20,56] |
| Validación final | (320,250) | **(250,250)** | (315,268) | x[250,380] y[250,286] |

Alignment verification:
- Top→middle vertical alignment: Cliente(135)↔Comprobante(135); Deuda(315)↔Match(315); Extracto(490)↔Transferencia(490). ✓
- Middle→bottom: Match(315)↔Validación(315). ✓
- Top-row no overlap: Cliente[75,195], Deuda[255,375] (gap 60), Extracto[425,555] (gap 50). ✓
- All within viewBox: min x=65, max x=555, min y=20, max y=286. ✓

## 5. New Edge Coordinates (old → new)

All edges keep `class="conciliation-edge"` and `marker-end="url(#conciliationArrow)"`. Horizontal arrows use y=170 (Match's vertical center; within Comprobante/Transferencia span [150,186]).

| # | Edge | Old | New element + coords |
|---|---|---|---|
| 1 | Cliente→Comprobante | line (100,56)→(240,170) | `<line x1="135" y1="56" x2="135" y2="150" />` |
| 2 | Deuda→Match | line (260,56)→(385,170) | `<line x1="315" y1="56" x2="315" y2="150" />` |
| 3 | Extracto→Transferencia | path `M 535 126 Q 548 148 535 170` | `<line x1="490" y1="56" x2="490" y2="150" />` (curved path → straight line) |
| 4 | Comprobante→Match | line (310,188)→(340,188) | `<line x1="205" y1="170" x2="270" y2="170" />` |
| 5 | Transferencia→Match | line (470,188)→(430,188) | `<line x1="425" y1="170" x2="360" y2="170" />` |
| 6 | Match→Validación | line (385,210)→(385,250) | `<line x1="315" y1="190" x2="315" y2="250" />` |

Notes:
- Edge #3 converts the old curved `<path>` into a straight vertical `<line>` to satisfy the "straight down" requirement. This is the only element-type change; it is minimal and keeps the same class/marker.
- Arrowhead direction is handled by `orient="auto-start-reverse"`: vertical (y increasing) → down; edge #4 (x increasing) → right; edge #5 (x decreasing) → left. The original already relied on vertical orientation (old Match→Validación), so this is proven to render correctly.

## 6. Exact Edits (atomic, verifiable)

Use `vscode-mcp-server_replace_lines_code` (or equivalent) with the exact original strings below. Line numbers refer to the confirmed current file; verify with `read_file_code` before each edit.

### Edit A — Cliente transform
- Find: `      <g class="conciliation-node" transform="translate(40,20)">`
- Replace: `      <g class="conciliation-node" transform="translate(75,20)">`

### Edit B — Deuda transform
- Find: `      <g class="conciliation-node" transform="translate(200,20)">`
- Replace: `      <g class="conciliation-node" transform="translate(255,20)">`

### Edit C — Comprobante transform
- Find: `      <g class="conciliation-node" transform="translate(170,170)">`
- Replace: `      <g class="conciliation-node" transform="translate(65,150)">`

### Edit D — Match transform
- Find: `      <g class="conciliation-node conciliation-node--match" transform="translate(340,170)">`
- Replace: `      <g class="conciliation-node conciliation-node--match" transform="translate(270,150)">`

### Edit E — Transferencia transform
- Find: `      <g class="conciliation-node" transform="translate(470,170)">`
- Replace: `      <g class="conciliation-node" transform="translate(425,150)">`

### Edit F — Extracto bancario transform
- Find: `      <g class="conciliation-node" transform="translate(470,90)">`
- Replace: `      <g class="conciliation-node" transform="translate(425,20)">`

### Edit G — Validación final transform
- Find: `      <g class="conciliation-node conciliation-node--result" transform="translate(320,250)">`
- Replace: `      <g class="conciliation-node conciliation-node--result" transform="translate(250,250)">`

### Edit H — Edge 1 (Cliente→Comprobante)
- Find:
```
      <line
        x1="100"
        y1="56"
        x2="240"
        y2="170"
        class="conciliation-edge"
        marker-end="url(#conciliationArrow)"
      />
```
- Replace:
```
      <line
        x1="135"
        y1="56"
        x2="135"
        y2="150"
        class="conciliation-edge"
        marker-end="url(#conciliationArrow)"
      />
```

### Edit I — Edge 2 (Deuda→Match)
- Find:
```
      <line
        x1="260"
        y1="56"
        x2="385"
        y2="170"
        class="conciliation-edge"
        marker-end="url(#conciliationArrow)"
      />
```
- Replace:
```
      <line
        x1="315"
        y1="56"
        x2="315"
        y2="150"
        class="conciliation-edge"
        marker-end="url(#conciliationArrow)"
      />
```

### Edit J — Edge 3 (Comprobante→Match)
- Find:
```
      <line
        x1="310"
        y1="188"
        x2="340"
        y2="188"
        class="conciliation-edge"
        marker-end="url(#conciliationArrow)"
      />
```
- Replace:
```
      <line
        x1="205"
        y1="170"
        x2="270"
        y2="170"
        class="conciliation-edge"
        marker-end="url(#conciliationArrow)"
      />
```

### Edit K — Edge 4 (Extracto→Transferencia): path → straight line
- Find:
```
      <path
        d="M 535 126 Q 548 148 535 170"
        class="conciliation-edge"
        marker-end="url(#conciliationArrow)"
      />
```
- Replace:
```
      <line
        x1="490"
        y1="56"
        x2="490"
        y2="150"
        class="conciliation-edge"
        marker-end="url(#conciliationArrow)"
      />
```

### Edit L — Edge 5 (Transferencia→Match)
- Find:
```
      <line
        x1="470"
        y1="188"
        x2="430"
        y2="188"
        class="conciliation-edge"
        marker-end="url(#conciliationArrow)"
      />
```
- Replace:
```
      <line
        x1="425"
        y1="170"
        x2="360"
        y2="170"
        class="conciliation-edge"
        marker-end="url(#conciliationArrow)"
      />
```

### Edit M — Edge 6 (Match→Validación)
- Find:
```
      <line
        x1="385"
        y1="210"
        x2="385"
        y2="250"
        class="conciliation-edge"
        marker-end="url(#conciliationArrow)"
      />
```
- Replace:
```
      <line
        x1="315"
        y1="190"
        x2="315"
        y2="250"
        class="conciliation-edge"
        marker-end="url(#conciliationArrow)"
      />
```

## 7. Reference — Resulting `<template>` Block (after edits)

```vue
<template>
  <div class="conciliation-diagram-scroll">
    <svg
      class="conciliation-diagram"
      viewBox="0 0 620 300"
      width="100%"
      role="img"
      :aria-label="diagramLabel"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
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
      </defs>

      <g class="conciliation-node" transform="translate(75,20)">
        <rect width="120" height="36" rx="8" />
        <text x="60" y="23" text-anchor="middle">Cliente</text>
      </g>

      <g class="conciliation-node" transform="translate(255,20)">
        <rect width="120" height="36" rx="8" />
        <text x="60" y="23" text-anchor="middle">Deuda</text>
      </g>

      <g class="conciliation-node" transform="translate(65,150)">
        <rect width="140" height="36" rx="8" />
        <text x="70" y="23" text-anchor="middle">Comprobante</text>
      </g>

      <g class="conciliation-node conciliation-node--match" transform="translate(270,150)">
        <rect width="90" height="40" rx="10" />
        <text x="45" y="26" text-anchor="middle">Match</text>
      </g>

      <g class="conciliation-node" transform="translate(425,150)">
        <rect width="130" height="36" rx="8" />
        <text x="65" y="23" text-anchor="middle">Transferencia</text>
      </g>

      <g class="conciliation-node" transform="translate(425,20)">
        <rect width="130" height="36" rx="8" />
        <text x="65" y="23" text-anchor="middle">Extracto bancario</text>
      </g>

      <g class="conciliation-node conciliation-node--result" transform="translate(250,250)">
        <rect width="130" height="36" rx="8" />
        <text x="65" y="23" text-anchor="middle">Validación final</text>
      </g>

      <line
        x1="135"
        y1="56"
        x2="135"
        y2="150"
        class="conciliation-edge"
        marker-end="url(#conciliationArrow)"
      />
      <line
        x1="315"
        y1="56"
        x2="315"
        y2="150"
        class="conciliation-edge"
        marker-end="url(#conciliationArrow)"
      />
      <line
        x1="205"
        y1="170"
        x2="270"
        y2="170"
        class="conciliation-edge"
        marker-end="url(#conciliationArrow)"
      />
      <line
        x1="490"
        y1="56"
        x2="490"
        y2="150"
        class="conciliation-edge"
        marker-end="url(#conciliationArrow)"
      />
      <line
        x1="425"
        y1="170"
        x2="360"
        y2="170"
        class="conciliation-edge"
        marker-end="url(#conciliationArrow)"
      />
      <line
        x1="315"
        y1="190"
        x2="315"
        y2="250"
        class="conciliation-edge"
        marker-end="url(#conciliationArrow)"
      />
    </svg>
  </div>
</template>
```

## 8. Verification Steps (for step 4.5)

1. `read_file_code src/components/landing/ConciliationDiagram.vue` — confirm all 7 transforms and 6 edges match Section 4/5 exactly.
2. `vscode-mcp-server_get_diagnostics_code` on the file — expect 0 errors / 0 warnings.
3. Build/type-check (if available): `npm run build` (or project equivalent) — expect success.
4. Visual check (dev server or screenshot): confirm 3 even columns, 3 straight top→middle arrows, 2 horizontal arrows into Match (right from Comprobante, left from Transferencia), 1 straight Match→Validación arrow, no node overlaps, no arrow crossing a node border.
5. Confirm `viewBox`, all `rect` widths/heights, all `text` x/y, all CSS classes, and `diagramLabel` are unchanged.

## 9. Compliance Notes

- **Preserve Existing Code**: only `transform` attributes and edge coordinates change; CSS, sizes, text, marker, viewBox, and `diagramLabel` untouched.
- **max-lines-per-file**: file stays ~140 lines (< 200 limit). N/A for rules anyway (template/markup).
- **max-depth / max-arguments / max-lines-per-method / single-section-boolean**: N/A (no logic added).
- **self-documenting / no-commented-code**: no comments introduced or removed; existing top comment retained.
- **No new files/folders**: single existing file edited; `.agent/project-structure.md` unchanged.
- **Gitignore**: no dependency dirs touched; no install step.

## 10. Out of Scope (handled by other workflow steps)

- Git branch/commit (step 4.2 implementation + commits).
- Code review (step 4.3).
- Documentation (step 4.4) — none needed; `diagramLabel` already describes the flow accurately.
- TODO marking (step 4.6).

## 11. Open Decisions / Assumptions

- **Middle row y=150**: used the explicitly stated requirement value (current is y=170). If the intent was to keep y=170, only the middle-row `y` values change (Comprobante/Match/Transferencia → y=170 instead of 150) and edges #1/#2/#3 `y2` → 170, edge #4/#5 `y` → 190 (Match center at y=170 row), edge #6 `y1` → 210. The column x rebalancing (135/315/490) stays the same either way. Flagged for confirmation.
- **Column rebalancing**: chose even spacing (centers 135/315/490) to match the ASCII target, over keeping the original right-heavy middle-row x positions. This is the only non-minimal aspect; it is required to "match this exact layout."
