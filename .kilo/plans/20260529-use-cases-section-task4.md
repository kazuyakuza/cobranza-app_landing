# Use Cases Section — Task 4: Integrate into Main App

## Assessment

No code changes are required. The integration is already present and consistent in the codebase.

## Evidence

### 1. `src/App.vue` — Component Import & Render

- `UseCasesSection` is imported: `import UseCasesSection from '@/components/landing/UseCasesSection.vue'`
- It is rendered in the `<main>` block: `<UseCasesSection />`

### 2. `src/components/landing/Navbar.vue` — Navigation Link

- The menu item exists: `{ label: 'Rubros', sectionId: 'use-cases' }`
- Clicking "Rubros" calls `scrollToSection('use-cases')`, which scrolls to the element with `id="use-cases"`

### 3. `src/components/landing/UseCasesSection.vue` — Section ID

- The root `<section>` element already has `id="use-cases"`:
  ```vue
  <section id="use-cases" class="use-cases-section">
  ```

## Discrepancy Resolution

The TODO template referenced `id="sectors"`. The existing codebase uses `id="use-cases"`, which is fully wired with the navbar. Changing to `id="sectors"` would be a breaking, unnecessary modification. The correct approach is to leave the existing, working `id="use-cases"` in place.

## Steps (No Implementation Required)

1. **Verify** `App.vue` imports and renders `UseCasesSection` — already done.
2. **Verify** Navbar has a link with `sectionId: 'use-cases'` — already done.
3. **Verify** `UseCasesSection` has `<section id="use-cases">` — already done.

## Conclusion

Task 4 is **pre-completed**. No edits, commits, or further action are necessary.
