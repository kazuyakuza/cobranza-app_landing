# Plan: Task 1 — Create Features Section Component Shell

## Task Origin

- **TODO File**: `.agent/todos/20260529/20260529-todo-0.md` — Task 1 "Create Features Section Component"
- **Target File**: `src/components/landing/FeaturesSection.vue`
- **Reference Pattern**: `src/components/landing/UseCasesSection.vue`
- **Tech Stack**: Vue 3 + TypeScript + Bootstrap 5

---

## High-Level Approach

Expand the existing `FeaturesSection.vue` stub into a structured shell that follows the `UseCasesSection.vue` pattern. The shell will include:

1. `useScrollReveal()` activation in `<script setup>`
2. A section title constant matching the Spanish content brief (`Cómo te ayuda Cobranza App`)
3. A Bootstrap container/row layout with two column placeholders representing the two beneficiary groups from the content brief:
   - **Company / Professional** (`Para la empresa o profesional:`)
   - **End User** (`Para el cliente final:`)
4. Refined scoped styles (background already present; add title typography)
5. Build verification and commit

---

## Atomic Steps

### Step 1 — Expand `<script setup>`

**File**: `src/components/landing/FeaturesSection.vue`

Replace the empty `<script setup lang="ts">` block with:

```ts
<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal'

// Activates scroll-reveal animation for elements with [data-reveal]
useScrollReveal()

const sectionTitle = 'Cómo te ayuda Cobranza App'
</script>
```

**Rationale**:
- Follows the exact import/call pattern from `UseCasesSection.vue`
- Section title is defined as a Spanish string constant per the content brief §5
- Code language is English (comments, variable names); content is Spanish

---

### Step 2 — Expand Template with Container, Row, and Two Column Placeholders

**File**: `src/components/landing/FeaturesSection.vue`

Replace the current template with:

```vue
<template>
  <section id="features" class="features-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-9">
          <h2 data-reveal class="features-title">{{ sectionTitle }}</h2>

          <div class="row g-4">
            <!-- Placeholder: Company / Professional -->
            <div data-reveal class="col-12 col-md-6">
              <div class="feature-group dark-card">
                <h3 class="feature-group-title">Para la empresa o profesional</h3>
                <ul class="feature-list list-unstyled">
                  <li class="feature-item">Gestión centralizada de clientes y deudas</li>
                  <li class="feature-item">Carga masiva de saldos y vencimientos</li>
                  <li class="feature-item">Reportes claros de deudas, pagos y morosidad</li>
                  <li class="feature-item">Notificaciones automáticas al recibir comprobantes</li>
                  <li class="feature-item">Validación ágil de pagos y generación automática de recibos</li>
                  <li class="feature-item">Historial completo y trazabilidad por cliente</li>
                </ul>
              </div>
            </div>

            <!-- Placeholder: End User -->
            <div data-reveal class="col-12 col-md-6">
              <div class="feature-group dark-card">
                <h3 class="feature-group-title">Para el cliente final</h3>
                <ul class="feature-list list-unstyled">
                  <li class="feature-item">Consulta inmediata de su deuda y vencimientos</li>
                  <li class="feature-item">Subida sencilla de comprobantes desde el celular</li>
                  <li class="feature-item">Seguimiento en tiempo real del estado de sus pagos</li>
                  <li class="feature-item">Descarga de recibo oficial una vez validado</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
```

**Rationale**:
- `id="features"` preserved for navbar anchor navigation
- Outer `.container` > `.row.justify-content-center` > `.col-12.col-md-10.col-lg-9` matches `UseCasesSection.vue` width constraint pattern
- `h2` uses `data-reveal` for scroll animation
- Inner `.row.g-4` creates two-column grid with Bootstrap gutter spacing
- Each column uses `.dark-card` (global class from `base.css`) for the card surface
- Feature lists use `.list-unstyled` to remove default bullets; custom styling will be added in scoped styles
- Content pulled directly from `.agent/project-info/landing-content.es.md` §5

---

### Step 3 — Refine Scoped Styles

**File**: `src/components/landing/FeaturesSection.vue`

Replace the existing `<style scoped>` block with:

```vue
<style scoped>
.features-section {
  background: var(--color-bg-dark);
  color: var(--color-text-on-dark);
}

.features-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 2rem;
  line-height: 1.25;
}

.feature-group-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
  line-height: 1.3;
}

.feature-list {
  margin-bottom: 0;
}

.feature-item {
  font-size: 1rem;
  line-height: 1.55;
  padding-bottom: 0.75rem;
  padding-left: 1.5rem;
  position: relative;
}

.feature-item:last-child {
  padding-bottom: 0;
}

.feature-item::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--color-accent);
  font-weight: 700;
}

@media (max-width: 767.98px) {
  .features-title {
    font-size: 1.75rem;
  }

  .feature-group-title {
    font-size: 1.125rem;
  }
}
</style>
```

**Rationale**:
- Background and text color remain per the style guide (Features section = `--color-bg-dark`)
- `.features-title` matches the section title typography from the style guide (2.25rem / 700)
- `.feature-group-title` matches card title scale (1.25rem / 600)
- Feature items use a checkmark pseudo-element with `--color-accent` (emerald green) for visual consistency with the success/CTA color
- Mobile breakpoint reduces title sizes, matching the responsive pattern in `UseCasesSection.vue`

---

### Step 4 — Build Verification

**Command**:

```bash
npm run build
```

**Expected Result**: Build completes with zero errors and zero warnings.

**If Build Fails**:
- Review TypeScript errors in `FeaturesSection.vue`
- Verify `useScrollReveal` import path resolves (`@/composables/useScrollReveal`)
- Confirm no syntax errors in template or styles
- Fix and re-run `npm run build`

---

### Step 5 — Commit Strategy

**Before committing**:
1. Run `git status` to confirm only intended files are modified
2. Verify `.gitignore` compliance (no `node_modules/`, `dist/`, or other ignored files staged)

**Commit command**:

```bash
git add src/components/landing/FeaturesSection.vue
git commit -m "feat(landing): add FeaturesSection shell with title and dual-column placeholders

- Import and call useScrollReveal for scroll animations
- Add section title 'Cómo te ayuda Cobranza App'
- Create two-column layout: Company/Professional + End User
- Use dark-card pattern with accent checkmark bullets
- Responsive typography for mobile"
```

---

## Verification Checklist

- [ ] `FeaturesSection.vue` imports `useScrollReveal` and calls it
- [ ] `sectionTitle` constant is set to `"Cómo te ayuda Cobranza App"`
- [ ] Template contains `.container` > `.row` > `.col-12.col-md-10.col-lg-9` wrapper
- [ ] Two `.col-12.col-md-6` columns exist with `.feature-group.dark-card`
- [ ] Each column has an `h3` group title and `ul.feature-list` with `li.feature-item` items
- [ ] `data-reveal` attributes present on `h2` and both column containers
- [ ] Scoped styles define `.features-section`, `.features-title`, `.feature-group-title`, `.feature-item`
- [ ] No hardcoded hex values in styles — only CSS variables used
- [ ] `npm run build` passes cleanly
- [ ] Commit created with meaningful message

---

## Out of Scope (Future Tasks)

- Adding icons to feature items
- Advanced card hover animations
- Refining bullet styling beyond the basic checkmark placeholder
- Any changes to `App.vue` (already imported)

---

## References

- **Stub**: `src/components/landing/FeaturesSection.vue` (current)
- **Pattern**: `src/components/landing/UseCasesSection.vue`
- **Style Guide**: `.agent/project-info/style-guide.md`
- **Content**: `.agent/project-info/landing-content.es.md` §5
