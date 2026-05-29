# Plan: Split Content into Two Columns / Areas — FeaturesSection.vue

## Task
Refactor `src/components/landing/FeaturesSection.vue` to use typed data arrays with Bootstrap Icons, replacing hardcoded placeholder `<li>` elements with `v-for` loops.

## High-Level Approach
1. Add a `FeatureItem` interface and two typed arrays (`companyFeatures`, `userFeatures`) in the `<script setup>` block.
2. Replace static `<li>` elements inside each column with `v-for` loops that render a Bootstrap Icon `<i>` and the feature text.
3. Update scoped styles to replace the `::before` checkmark with proper icon styling aligned with the existing dark-first design system.
4. Verify the build passes with no lint/type errors.
5. Commit the change with a meaningful message.

---

## Step-by-Step Implementation

### Step 1 — Define `FeatureItem` Interface

**File:** `src/components/landing/FeaturesSection.vue`

Inside `<script setup lang="ts">`, after `const sectionTitle`, add:

```ts
interface FeatureItem {
  icon: string
  text: string
}
```

*Rationale:* Matches the pattern established in `UseCasesSection.vue` for typed icon+text items.

---

### Step 2 — Create `companyFeatures` Array

**File:** `src/components/landing/FeaturesSection.vue`

Add after the interface:

```ts
const companyFeatures: FeatureItem[] = [
  { icon: 'bi-building', text: 'Gestión centralizada de clientes y deudas' },
  { icon: 'bi-upload', text: 'Carga masiva de saldos y vencimientos' },
  { icon: 'bi-bar-chart', text: 'Reportes claros de deudas, pagos y morosidad' },
  { icon: 'bi-bell', text: 'Notificaciones automáticas al recibir comprobantes' },
  { icon: 'bi-check2-circle', text: 'Validación ágil de pagos y generación automática de recibos' },
  { icon: 'bi-clock-history', text: 'Historial completo y trazabilidad por cliente' }
]
```

*Icon justification:*
- `bi-building` — represents organization/centralized management.
- `bi-upload` — represents bulk uploading of data.
- `bi-bar-chart` — represents reports and analytics.
- `bi-bell` — represents notifications and alerts.
- `bi-check2-circle` — represents validation and completion.
- `bi-clock-history` — represents history and traceability.

---

### Step 3 — Create `userFeatures` Array

**File:** `src/components/landing/FeaturesSection.vue`

Add after `companyFeatures`:

```ts
const userFeatures: FeatureItem[] = [
  { icon: 'bi-search', text: 'Consulta inmediata de su deuda y vencimientos' },
  { icon: 'bi-cloud-upload', text: 'Subida sencilla de comprobantes desde el celular' },
  { icon: 'bi-eye', text: 'Seguimiento en tiempo real del estado de sus pagos' },
  { icon: 'bi-download', text: 'Descarga de recibo oficial una vez validado' }
]
```

*Icon justification:*
- `bi-search` — represents consulting/checking debt.
- `bi-cloud-upload` — represents uploading receipts from mobile.
- `bi-eye` — represents viewing/tracking payment status.
- `bi-download` — represents downloading the official receipt.

---

### Step 4 — Replace Hardcoded `<li>` Elements with `v-for`

**File:** `src/components/landing/FeaturesSection.vue`

Replace the static `<ul>` and `<li>` elements in the **company column** (lines 22–29) with:

```html
<ul class="feature-list list-unstyled">
  <li v-for="item in companyFeatures" :key="item.text" class="feature-item">
    <i :class="item.icon" class="feature-icon bi" aria-hidden="true"></i>
    <span class="feature-text">{{ item.text }}</span>
  </li>
</ul>
```

Replace the static `<ul>` and `<li>` elements in the **user column** (lines 37–42) with:

```html
<ul class="feature-list list-unstyled">
  <li v-for="item in userFeatures" :key="item.text" class="feature-item">
    <i :class="item.icon" class="feature-icon bi" aria-hidden="true"></i>
    <span class="feature-text">{{ item.text }}</span>
  </li>
</ul>
```

*Rationale:* `v-for` loops over typed arrays eliminate duplication and align with the `UseCasesSection.vue` pattern. `:key="item.text"` is safe because each text string is unique within its array.

---

### Step 5 — Update Scoped Styles

**File:** `src/components/landing/FeaturesSection.vue`

Replace the `.feature-item` and `.feature-item::before` rules (lines 76–94) with:

```css
.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 1rem;
  line-height: 1.55;
  padding-bottom: 0.75rem;
}

.feature-item:last-child {
  padding-bottom: 0;
}

.feature-icon {
  font-size: 1.1rem;
  color: var(--color-accent);
  flex-shrink: 0;
  margin-top: 0.2rem;
}
```

*Rationale:*
- Removes the `::before` pseudo-element checkmark (replaced by dynamic Bootstrap Icons).
- Uses `display: flex` and `gap` for clean icon+text alignment, consistent with `use-case-card` in `UseCasesSection.vue`.
- `flex-shrink: 0` prevents the icon from squishing on narrow viewports.
- Icon color uses `--color-accent` to maintain the existing accent color usage (previously applied to the checkmark).

---

### Step 6 — Verify Build

**Command:**

```bash
npm run build
```

*Expected result:* Build completes with 0 errors and 0 warnings.

---

### Step 7 — Commit

**Command sequence:**

```bash
git add src/components/landing/FeaturesSection.vue
git commit -m "feat(features): split content into two columns with typed arrays and Bootstrap Icons

- Add FeatureItem interface and typed companyFeatures / userFeatures arrays
- Replace hardcoded <li> placeholders with v-for loops
- Assign context-appropriate Bootstrap Icons to each feature
- Update styles to flex-based icon+text layout using --color-accent
- Aligns with UseCasesSection.vue data-driven pattern"
```

*Commit type:* `feat` because this adds functionality (icons, typed data) to an existing section.

---

## Code Review Checklist

- [ ] `FeatureItem` interface is defined exactly as `{ icon: string; text: string }`.
- [ ] `companyFeatures` contains exactly 6 items with correct text and icons.
- [ ] `userFeatures` contains exactly 4 items with correct text and icons.
- [ ] Both `<ul>` blocks use `v-for` with `:key="item.text"`.
- [ ] `<i>` elements include `:class="item.icon"`, `class="feature-icon bi"`, and `aria-hidden="true"`.
- [ ] Old hardcoded `<li>` elements are fully removed.
- [ ] `.feature-item::before` rule is removed.
- [ ] New `.feature-icon` rule uses `var(--color-accent)`.
- [ ] Build passes (`npm run build` exits 0).
- [ ] No lint errors (`npm run lint` exits 0).

---

## Documentation Updates

- No external documentation changes required for this refactor.
- The component remains self-documenting via the typed interface and descriptive array names.
