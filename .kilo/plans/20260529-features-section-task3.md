# Plan: Features Section — Visual Presentation Enhancements (Task 3)

## Task
Enhance the visual presentation of `src/components/landing/FeaturesSection.vue` to make the two feature columns scannable, visually differentiated, and professionally polished — without overdesigning.

## Current State
- Component already has: two-column Bootstrap grid, Bootstrap Icons per feature, `.dark-card` styling, scroll-reveal animation, responsive breakpoints
- Section background is `--color-bg-dark` (per style guide alternation table)
- Cards currently look identical — no visual distinction between Company and User columns

## Reference Patterns
- `UseCasesSection.vue` uses `border-left: 4px solid var(--color-primary)` and `background: var(--color-bg-card-alt)` for nested contrast
- `.dark-card` base pattern is defined in `base.css`

---

## Step 1: Add Column Accent Borders

**File**: `src/components/landing/FeaturesSection.vue` — `<style scoped>`

### 1.1 Define scoped classes for each column card

Add two new classes to differentiate the two `.dark-card` containers:

- `.feature-group-company` — left border accent using `--color-primary`
- `.feature-group-user` — left border accent using `--color-accent`

### 1.2 Apply borders and optional alternate background

```css
.feature-group-company {
  border-left: 4px solid var(--color-primary);
}

.feature-group-user {
  border-left: 4px solid var(--color-accent);
}
```

> Note: Keep `.dark-card` base styles intact. These scoped classes layer on top.

### 1.3 Update template to bind the new classes

In the `<template>`, replace the generic `dark-card` divs:

- First column: `<div class="feature-group dark-card feature-group-company">`
- Second column: `<div class="feature-group dark-card feature-group-user">`

---

## Step 2: Differentiate Column Header Styling

### 2.1 Subtle background tint on headers (optional but recommended)

Add a scoped style that applies a very subtle background tint behind each group title, to reinforce the color coding:

```css
.feature-group-company .feature-group-title {
  color: var(--color-primary);
}

.feature-group-user .feature-group-title {
  color: var(--color-accent);
}
```

> This makes the group titles pop slightly while maintaining readability. If this feels too colorful, default back to `--color-text-on-dark` and only keep the left border accent.

### 2.2 Keep title sizing consistent

- `feature-group-title` remains `1.25rem` / `600` weight on desktop, `1.125rem` on mobile
- Do not enlarge beyond the style guide card-title spec

---

## Step 3: Icon & Spacing Polish

### 3.1 Ensure icon sizing is consistent and legible

Current `.feature-icon` is `1.1rem`. Keep it. Verify alignment with `margin-top: 0.2rem` is sufficient.

### 3.2 Add subtle hover on feature items

Add a lightweight hover effect on each `.feature-item` to improve interactivity feedback:

```css
.feature-item {
  transition: color 0.2s ease;
}

.feature-item:hover .feature-text {
  color: var(--color-text-on-dark);
}

.feature-item:hover .feature-icon {
  color: var(--color-text-on-dark);
}
```

> This is subtle — on dark cards, the text is already `--color-text-on-dark`, so this will only have a visible effect if the default text color is muted. If text is already full-brightness, skip this hover or use a `translateX(2px)` on the icon instead.

Alternative hover (preferred if text is already bright):

```css
.feature-item:hover .feature-icon {
  transform: translateX(2px);
  transition: transform 0.2s ease;
}
```

### 3.3 Ensure last-item padding reset is preserved

Current rule `.feature-item:last-child { padding-bottom: 0; }` must remain.

---

## Step 4: Responsive Behavior Verification

### 4.1 Mobile stacking

Current grid uses `col-12 col-md-6`. This already stacks cleanly on mobile. Verify that:

- The `g-4` gap between columns translates to vertical gap when stacked
- Cards do not overflow horizontally
- Left border accents remain visible and do not clip

### 4.2 Mobile padding adjustment (if needed)

If `.dark-card` padding (`2rem`) feels too large on very small screens, add a mobile override scoped to this component:

```css
@media (max-width: 575.98px) {
  .dark-card {
    padding: 1.5rem;
  }
}
```

> Only add this if visual testing shows padding is excessive on mobile. Prefer not to override global `.dark-card` if possible — instead target `.feature-group` specifically.

---

## Step 5: Visual Hierarchy & Scannability

### 5.1 Optional subtitle below main title

Add a short subtitle below `<h2>` to improve scannability and provide context before the two columns:

**Template addition**:

```vue
<p data-reveal class="features-subtitle">
  Herramientas pensadas para quien cobra y para quien paga.
</p>
```

**Style addition**:

```css
.features-subtitle {
  font-size: 1.125rem;
  font-weight: 400;
  color: var(--color-text-on-dark-muted);
  margin-bottom: 2.5rem;
  line-height: 1.6;
}
```

> This mirrors the UseCasesSection pattern and improves visual hierarchy by separating the section title from the card content.

### 5.2 Add `data-reveal` to cards if not already present

Verify that each `.feature-group` wrapper (or its parent column `div`) has `data-reveal`. Currently the `col-12 col-md-6` divs have it — this is correct. No change needed.

---

## Step 6: Final Style Checklist

- [ ] No hardcoded hex values — all colors via CSS variables
- [ ] Section background remains `--color-bg-dark`
- [ ] `.dark-card` base class is preserved, not duplicated
- [ ] All scoped styles live in `<style scoped>`
- [ ] Mobile breakpoints tested at `< 768px` and `< 576px`
- [ ] `data-reveal` attributes preserved on animated elements
- [ ] English variable names / Spanish user-facing text maintained
- [ ] No new external dependencies (Bootstrap Icons already loaded)

---

## Step 7: No Changes Required For

- **Bootstrap grid structure** — already correct (`col-12 col-md-6`)
- **Scroll reveal system** — already integrated
- **Icon definitions** — already using Bootstrap Icons
- **Component logic / TypeScript** — no changes needed
- **App.vue integration** — handled in Task 4

---

## Expected Result

A visually polished Features section where:
- The two columns are subtly but clearly differentiated by left border color (`--color-primary` for Company, `--color-accent` for User)
- Group titles may use matching color accents for stronger hierarchy
- Feature items are scannable with consistent icon alignment and spacing
- A subtitle bridges the section title and the card grid
- Hover effects provide light interactive feedback
- The entire section remains minimal, professional, and consistent with the dark-first financial SaaS aesthetic
