# Task 2 Plan: Change ProblemSection Text

## Objective
Update the text of one pain point item in `src/components/landing/ProblemSection.vue`.

## Current State
- **File**: `src/components/landing/ProblemSection.vue`
- **Line**: 29 (inside `painPoints` array)
- **Current text**: `'Conciliar manualmente con los extractos bancarios'`

## Target State
- **New text**: `'Conciliar manualmente con los movimientos bancarios'`

## Implementation Steps

1. **Edit**
   - Open `src/components/landing/ProblemSection.vue`.
   - Replace the string literal on line 29:
     - From: `text: 'Conciliar manualmente con los extractos bancarios'`
     - To: `text: 'Conciliar manualmente con los movimientos bancarios'`

2. **Verify**
   - Read `src/components/landing/ProblemSection.vue` line 29 to confirm the change.
   - Run project lint/build if available (e.g., `npm run lint` or `npm run build`) to ensure no syntax errors were introduced.

3. **Git**
   - Stage the modified file.
   - Commit with message: `fix: update pain point text from extractos to movimientos bancarios`

## Constraints
- No structural, script, or style changes.
- Only the single string literal inside the `painPoints` array must be modified.
