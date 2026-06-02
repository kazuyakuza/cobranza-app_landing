# Task Plan: Add Pain Color to Problem Closing Statement

## Goal
Change the color of the phrase "Todo esto genera pérdida de tiempo, errores y estrés innecesario." in `ProblemSection.vue` from emerald green (`--color-accent`) to a "pain" color (red/orange) that conveys stress and warning on a dark background.

## Analysis

- **Current state**: `.problem-closing` uses `var(--color-accent)` (`#10b981`), which is emerald green and feels positive rather than painful.
- **Background**: The section uses `--color-bg-dark` (`#0c1528`), a very dark navy.
- **Design system**: Existing colors follow Tailwind-like naming and values (e.g., `#3b82f6` primary, `#10b981` accent).
- **Selected color**: `#ef4444` (red-500) — strong association with pain, warning, and stress; excellent contrast against `#0c1528` (well above WCAG AA); consistent with Tailwind palette used elsewhere.

## Implementation Steps

### 1. Add CSS Variable
- **File**: `src/assets/styles/variables.css`
- **Action**: Insert `--color-pain: #ef4444;` into the `/* Borders and accents */` section, after `--color-accent-hover`.
- **Snippet**:
  ```css
  --color-accent: #10b981;
  --color-accent-hover: #059669;
  --color-pain: #ef4444;
  ```

### 2. Update Component Style
- **File**: `src/components/landing/ProblemSection.vue`
- **Action**: In the `<style scoped>` block, change the `.problem-closing` rule's `color` property from `var(--color-accent)` to `var(--color-pain)`.
- **Snippet**:
  ```css
  .problem-closing {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--color-pain);
    line-height: 1.65;
  }
  ```

## Verification
- Open the landing page and scroll to the Problem section.
- Confirm the closing sentence is rendered in red (`#ef4444`).
- Confirm the red text is clearly readable against the dark background.

## Files Changed
- `src/assets/styles/variables.css`
- `src/components/landing/ProblemSection.vue`
