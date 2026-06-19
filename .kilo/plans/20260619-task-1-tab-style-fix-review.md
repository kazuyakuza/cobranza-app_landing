# Fix Plan: UseCasesTabs Selected Tab Style — Code Review Findings

## Issues Found

1. **Redundant active tab declarations**
   - The `.nav-tabs` block overrides Bootstrap CSS variables:
     - `--bs-nav-tabs-link-active-color`
     - `--bs-nav-tabs-link-active-bg`
     - `--bs-nav-tabs-link-active-border-color`
   - The `.nav-tabs .nav-link.active` rule then repeats the same `color`, `background`, and `border-color` values explicitly.
   - This duplication means the active tab styles are defined twice and must be kept in sync, increasing maintenance burden and violating the project's self-documenting / minimal-redundancy guidelines.

2. **Specificity increase is appropriate, but the explicit rule should only contain non-variable properties**
   - Changing `.nav-link.active` to `.nav-tabs .nav-link.active` correctly matches Bootstrap's selector specificity.
   - However, once the Bootstrap variables are overridden, the explicit rule only needs to set properties not controlled by those variables (e.g., `font-weight`).

## Proposed Fix

In `src/components/landing/UseCasesTabs.vue`, keep the Bootstrap CSS variable overrides and the higher-specificity selector, but remove the redundant properties from `.nav-tabs .nav-link.active`.

### Change

```css
.nav-tabs .nav-link.active {
  font-weight: 600;
}
```

### Resulting scoped styles (relevant excerpt)

```css
.nav-tabs {
  --bs-nav-tabs-link-active-color: var(--color-text-on-dark);
  --bs-nav-tabs-link-active-bg: var(--color-bg-card);
  --bs-nav-tabs-link-active-border-color: var(--color-border) var(--color-border)
    var(--color-bg-card);
  border-bottom-color: var(--color-border);
  flex-wrap: nowrap;
}

.nav-link {
  color: var(--color-text-on-dark-muted);
  border-color: transparent;
  white-space: nowrap;
  font-weight: 500;
}

.nav-link:hover {
  color: var(--color-text-on-dark);
  border-color: transparent;
  background: var(--color-bg-card);
}

.nav-tabs .nav-link.active {
  font-weight: 600;
}
```

## Rationale

- The CSS variable overrides are the idiomatic Bootstrap 5 way to theme component states.
- The higher-specificity selector ensures the rule wins over Bootstrap's default `.nav-tabs .nav-link.active`.
- Keeping only `font-weight` in the explicit rule removes duplication while preserving the desired visual weight for the active tab.
- No functional change: the active tab will still render with `var(--color-text-on-dark)` text, `var(--color-bg-card)` background, and the custom border colors.

## Verification Steps

1. Run the development server.
2. Navigate to the landing page section that renders `UseCasesTabs`.
3. Confirm the active tab has the card background, dark text, and connected bottom border.
4. Confirm inactive tabs still show muted text and transparent borders.
5. Confirm hover state still applies the card background.
