# Global Plan: Landing UI Fixes — 2026-06-20

## Pre-analysis

### Task 1: FAQ accordion style fix
- **File**: `src/components/landing/FaqGroupAccordion.vue`
- **Issue**: Bootstrap 5's `.accordion-button:not(.collapsed)` default `background-color: #e7f1ff` overrides the dark-themed background when a question accordion is expanded. The text color remains `var(--color-text-on-dark)` (#e2e8f0, light gray/white), resulting in white text on a light background and poor contrast.
- **Fix**: Add `background: var(--color-bg-card-alt);` to the `.faq-question-button:not(.collapsed)` CSS rule to override Bootstrap's light background and restore dark-theme contrast.

### Task 2: ConciliationDiagram node repositioning
- **File**: `src/components/landing/ConciliationDiagram.vue`
- **Issue**: The current node layout does not match the requested topology. "Extracto bancario" is positioned too low and right; the top row is not aligned; arrows are diagonal instead of straight down where desired.
- **Fix**: Reposition all nodes in the SVG to create a clear 3-tier layout:
  - Top row: Cliente, Deuda, Extracto Bancario
  - Middle row: Comprobante, Match, Transferencia
  - Bottom row: Validación final
  - Update all `<line>` and `<path>` coordinates to draw straight vertical/horizontal arrows matching the requested ASCII diagram.

## Steps

### Step 2: Git Feature Branch Setup
- Assign: implementer
- Checkout main, create `feat/landing-ui-fixes`

### Step 3: Version Update
- Assign: implementer
- Increment patch version in `package.json`

### Task 1: FAQ Accordion Style Fix
#### 4.1 Analysis & Planning
- Assign: architect
- Confirm root cause (Bootstrap override). Save task plan to `.kilo/plans/20260620-task-1-faq-accordion-fix.md`.

#### 4.2 Implementation
- Assign: implementer
- Edit `src/components/landing/FaqGroupAccordion.vue`: add `background: var(--color-bg-card-alt);` to `.faq-question-button:not(.collapsed)`.
- Commit.

#### 4.3 Code Review
- Assign: code-reviewer
- Verify CSS override fixes contrast and no scoped-style side effects.

#### 4.4 Documentation
- Assign: docs-specialist
- Update context if needed; no external docs needed.

#### 4.5 Verification
- Assign: architect
- Confirm fix resolves reported issue.

#### 4.6 Task Completion
- Assign: implementer
- Mark Task 1 as `[DONE]` in TODO file. Commit.

### Task 2: ConciliationDiagram Node Repositioning
#### 4.1 Analysis & Planning
- Assign: architect
- Calculate exact SVG coordinates for the 3-tier layout. Save task plan to `.kilo/plans/20260620-task-2-conciliation-diagram.md`.

#### 4.2 Implementation
- Assign: implementer
- Update `src/components/landing/ConciliationDiagram.vue`: reposition nodes, update arrows.
- Commit.

#### 4.3 Code Review
- Assign: code-reviewer
- Verify layout matches ASCII diagram, arrows render correctly, viewBox still fits.

#### 4.4 Documentation
- Assign: docs-specialist
- Update context if needed.

#### 4.5 Verification
- Assign: architect
- Confirm layout matches user request.

#### 4.6 Task Completion
- Assign: implementer
- Mark Task 2 as `[DONE]` in TODO file. Commit.

### Step 5: TODO File Completion
- Assign: implementer
- Rename TODO file with `-DONE` suffix.
- Merge `feat/landing-ui-fixes` into `main`.
- Push to `origin` if configured.

### Step 6: Continuation
- Check for remaining TODO files.
