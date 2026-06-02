# Task 5: Change FAQ Section Background to Lighter Shade

## Task Origin
From TODO: `- "Dudas" section: change the bkg color to something more lightly.`

## Current State
- **File**: `src/components/landing/FaqSection.vue`
- **Current background** (line 105): `background: var(--color-bg-slate);` — value `#1a2740`
- **Available lighter variables**:
  - `--color-bg-card` = `#1e2d4a` (slightly lighter)
  - `--color-bg-card-alt` = `#243656` (noticeably lighter, best fit)

## Proposed Change
Switch the `.faq-section` background from `--color-bg-slate` to `--color-bg-card-alt` to create a lighter contrast while maintaining the dark theme.

## Implementation Steps

1. Open `src/components/landing/FaqSection.vue`.
2. Locate `.faq-section` block (line 103–106).
3. Replace:
   ```css
   background: var(--color-bg-slate);
   ```
   with:
   ```css
   background: var(--color-bg-card-alt);
   ```
4. Save the file.

## Verification Steps
- Confirm the change appears on line 105.
- No other styles or variables need modification.
- The accordion items already use `--color-bg-card` and `--color-bg-card-alt`, so this change keeps the section harmonious.

## Git Action
- Commit as `style: lighten FAQ section background`.
