# Fix Plan: FeaturesSection.vue — Lint Error

## Issue
ESLint/Prettier reports 1 error in `src/components/landing/FeaturesSection.vue`:
- Line 121, column 9: `Insert ⏎` (prettier/prettier)
- **Root cause**: Missing trailing newline at end of file after `</style>` tag.

## Fix

### Step 1 — Add trailing newline

**File:** `src/components/landing/FeaturesSection.vue`

Ensure the file ends with a final newline character after the closing `</style>` tag. The file should end with:
```
</style>
```
where there is exactly one blank line (newline) after `</style>`.

### Step 2 — Verify lint passes

```bash
npm run lint
```

Expected: 0 errors, 0 warnings.

### Step 3 — Commit fix

```bash
git add src/components/landing/FeaturesSection.vue
git commit -m "fix(features): add missing trailing newline in FeaturesSection.vue"
```

## Scope
- One line fix only — no other changes.