# Plan — Task 4: SolutionSection Fix 4 Boxes Alignment/Size + Color Closing Phrase

**Task**: Fix equal height for 4 feature cards and change closing phrase color to emerald accent.
**File**: `src/components/landing/SolutionSection.vue`
**Branch**: `feat/styling-polish-10-tasks`

---

## 1. Analysis

The `SolutionSection.vue` component renders a 2×2 grid of feature cards inside Bootstrap columns (`col-12 col-md-6`).

- **Issue A — Unequal card heights**: The `.feature-content` element lacks `height: 100%`, so each card only expands to the height of its own content. When descriptions differ in length, cards in the same row have different heights, breaking visual alignment.
- **Issue B — Closing phrase lacks emphasis**: The `.solution-closing` text uses `color: var(--color-text-on-dark)`, which blends in with the dark background. The user has confirmed that closing phrases across tasks should use `--color-accent` (emerald `#10b981`) for visual emphasis.

---

## 2. Implementation Steps

### Step 2.1 — Add `height: 100%` to `.feature-content`

**Location**: `<style scoped>` block, `.feature-content` rule (currently lines 100–103).

**Current**:
```css
.feature-content {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}
```

**Change to**:
```css
.feature-content {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  height: 100%;
}
```

**Rationale**: This forces each `.feature-content` card to fill the full height of its Bootstrap column, making all four cards in a row the same height regardless of internal content length.

### Step 2.2 — Change `.solution-closing` color to accent

**Location**: `<style scoped>` block, `.solution-closing` rule (currently lines 129–134).

**Current**:
```css
.solution-closing {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-on-dark);
  line-height: 1.65;
}
```

**Change to**:
```css
.solution-closing {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-accent);
  line-height: 1.65;
}
```

**Rationale**: Uses the confirmed emerald accent color (`--color-accent`) to give the closing statement visual weight and distinguish it from body text.

---

## 3. Verification Steps

1. **Visual check**: Render the landing page and scroll to the Solution section.
2. **Card height**: Confirm all 4 feature cards in the 2×2 grid have identical heights, even though description text lengths differ.
3. **Closing phrase color**: Confirm the text "De esta forma reducís drásticamente..." renders in emerald (`#10b981`) instead of the default light text color.
4. **Responsive check**: Verify cards still stack properly and maintain equal heights on mobile (`< 768px`).
5. **No regression**: Ensure existing scroll-reveal animations, dark-card styling, and icon colors remain unchanged.

---

## 4. Git Actions

- Commit the changes with message: `fix(SolutionSection): equal card heights + accent color for closing phrase`
- Ensure no unrelated files are staged.

---

## 5. Plan Validation

- [x] Matches original task description: fix 4 boxes alignment/size + color closing phrase.
- [x] Uses exact file path and CSS rules identified in analysis.
- [x] Changes are minimal, scoped, and verifiable.
- [x] No assumptions beyond confirmed design decisions (`--color-accent` for closing phrases).
