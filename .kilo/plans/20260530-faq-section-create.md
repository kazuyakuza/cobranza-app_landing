# Plan: Create FAQ Section Component

## Date
2026-05-30

## Task
Implement the FaqSection.vue landing page component with a Bootstrap 5 Accordion containing 9 Spanish Q&A pairs, dark theme styling, and scroll reveal animations.

## High-Level Approach
Overwrite the existing 14-line stub at `src/components/landing/FaqSection.vue` with a fully scripted, templated, and styled component. The component imports the `useScrollReveal` composable, defines a typed array of FAQ items sourced from `.agent/project-info/landing-content.es.md` §8, renders them using Bootstrap's `.accordion` markup with the first item expanded by default, and applies scoped dark-theme CSS variable overrides for all accordion states. Integration into `src/App.vue` is already complete and requires only verification.

---

## Detailed Implementation Steps

### Step 1: Verify Existing Integration
- **File**: `src/App.vue`
- **Action**: Confirm that `import FaqSection from '@/components/landing/FaqSection.vue'` and `<FaqSection />` (after `<PricingSection />`) are present.
- **Action**: Confirm that the Navbar link object includes `{ label: 'Dudas', sectionId: 'faq' }` for smooth-scroll navigation.
- **Expected Result**: No changes required to `App.vue` or `Navbar.vue`.

### Step 2: Overwrite `src/components/landing/FaqSection.vue`
- **File**: `src/components/landing/FaqSection.vue`
- **Action**: Replace the entire file content with the complete implementation below.

#### 2.1 `<script setup lang="ts">`
- Import `useScrollReveal` from `@/composables/useScrollReveal`.
- Call `useScrollReveal()` immediately.
- Define a constant `sectionTitle` with value `'Preguntas Frecuentes'`.
- Define a constant `accordionId` with value `'faqAccordion'` for `data-bs-parent` binding.
- Define a TypeScript interface `FaqItem` with `question: string` and `answer: string`.
- Define a typed constant array `faqItems: FaqItem[]` containing exactly the 9 objects from landing-content.es.md §8 in this order:
  1. `question: '¿Para quién está pensado Cobranza App?'`, `answer: 'Principalmente para PyMEs, profesionales, monotributistas y administradores que necesitan organizar y agilizar su proceso de cobranza.'`
  2. `question: '¿Es una aplicación móvil o web?'`, `answer: 'Es un sistema web responsive. Los clientes finales pueden usarlo cómodamente desde el celular. La administración es más cómoda desde computadora, aunque también es accesible desde móvil.'`
  3. `question: '¿Hay límite de clientes?'`, `answer: 'No. No existe límite en la cantidad de clientes. El cobro depende únicamente del volumen de pagos procesados.'`
  4. `question: '¿Cómo funcionan las notificaciones?'`, `answer: 'Actualmente mediante email (recordatorios y alertas de nuevos comprobantes). Próximamente incorporaremos WhatsApp y otros canales según demanda.'`
  5. `question: '¿Qué medios de pago acepta?'`, `answer: 'El cliente paga por fuera (principalmente transferencia) y sube el comprobante. En etapas posteriores incorporaremos pasarelas de pago integradas.'`
  6. `question: '¿Cómo se realiza la conciliación?'`, `answer: 'En esta primera etapa es semi-automática: el sistema ayuda a cruzar extractos bancarios, comprobantes y deudas. No solicitamos ni guardamos credenciales bancarias.'`
  7. `question: '¿Los recibos tienen validez fiscal?'`, `answer: 'Actualmente generan recibos válidos internamente. La integración con AFIP (facturación electrónica) está planificada según necesidades de los usuarios.'`
  8. `question: '¿Cómo se protegen los datos y comprobantes?'`, `answer: 'La seguridad es una prioridad. Todos los datos y archivos se almacenan de forma segura, con acceso restringido y encriptado.'`
  9. `question: '¿Puedo solicitar funcionalidades específicas?'`, `answer: 'Sí. Estamos en etapa Beta y valoramos mucho el feedback. Si necesitás alguna funcionalidad, contáctanos.'`

#### 2.2 `<template>`
- Root element: `<section id="faq" class="faq-section">` (preserve existing id).
- Inside: `<div class="container">`, then `<div class="row justify-content-center">`, then `<div class="col-12 col-md-10 col-lg-9">`.
- Section title: `<h2 data-reveal class="faq-title">{{ sectionTitle }}</h2>`.
- Accordion container: `<div data-reveal class="accordion faq-accordion" :id="accordionId">`.
- Loop: `<div v-for="(item, index) in faqItems" :key="item.question" class="accordion-item">`.
  - Header: `<h3 class="accordion-header">` containing `<button class="accordion-button" :class="{ collapsed: index !== 0 }" type="button" data-bs-toggle="collapse" :data-bs-target="'#faqCollapse' + index" :aria-expanded="index === 0">` with `{{ item.question }}`.
  - Body wrapper: `<div class="accordion-collapse collapse" :class="{ show: index === 0 }" :id="'faqCollapse' + index" :data-bs-parent="'#' + accordionId">`.
    - Body: `<div class="accordion-body">{{ item.answer }}</div>`.

#### 2.3 `<style scoped>`
- `.faq-section`: `background: var(--color-bg-slate); color: var(--color-text-on-dark);` (preserve existing).
- `.faq-title`: `font-size: 2.25rem; font-weight: 700; margin-bottom: 1.5rem; line-height: 1.25; color: var(--color-text-on-dark);`
- `.faq-accordion`: `margin-top: 2rem;`
- `.accordion-item`: `background: var(--color-bg-card); border: 1px solid var(--color-border);`
- `.accordion-button`: `background: var(--color-bg-card); color: var(--color-text-on-dark); font-size: 1rem; font-weight: 600; padding: 1.25rem 1.5rem;`
- `.accordion-button:not(.collapsed)`: `background: var(--color-bg-card-alt); color: var(--color-text-on-dark); box-shadow: none;`
- `.accordion-button.collapsed`: `background: var(--color-bg-card); color: var(--color-text-on-dark);`
- `.accordion-button::after`: `filter: brightness(0) invert(0.85);` (lightens the default Bootstrap chevron).
- `.accordion-button:focus`: `box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.5); border-color: var(--color-primary);`
- `.accordion-body`: `color: var(--color-text-on-dark-muted); font-size: 1rem; line-height: 1.6; padding: 1.25rem 1.5rem;`
- `.accordion-collapse`: `transition: height 0.35s ease;`
- Responsive `@media (max-width: 767.98px)`: `.faq-title { font-size: 1.75rem; }`

### Step 3: Run Linter / Type-Check
- **Command**: `npm run lint` (or `npm run type-check` / `vue-tsc --noEmit` if available)
- **Expected Result**: Zero errors in `FaqSection.vue`.

### Step 4: Manual Verification
- **Action**: Launch dev server (`npm run dev` or `npm run preview`).
- **Action**: Navigate to the FAQ section via the "Dudas" navbar link; confirm smooth scroll to `#faq`.
- **Action**: Verify the section title "Preguntas Frecuentes" reveals on scroll.
- **Action**: Verify the first FAQ item is expanded by default and the other 8 are collapsed.
- **Action**: Click each accordion button; confirm expand/collapse animations are smooth.
- **Action**: Verify Bootstrap chevron icons are visible and rotate correctly on dark background.
- **Action**: Resize to mobile width; confirm readable typography and spacing.
- **Action**: Run `npm run build` and confirm no build errors.

### Step 5: Git Commit
- **Command**: `git add src/components/landing/FaqSection.vue`
- **Command**: `git commit -m "feat: implement FAQ section with Bootstrap 5 accordion"`
- **Compliance**: Before committing, run `git status` and ensure no `.gitignore`-matched files are staged.

---

## Code Review Checklist
- [ ] All 9 Q&A pairs match landing-content.es.md §8 exactly.
- [ ] No hardcoded hex colors in scoped styles; only CSS variables used.
- [ ] `useScrollReveal()` is imported and called.
- [ ] `data-reveal` attributes present on section title and accordion container.
- [ ] `id="faq"` preserved on `<section>`.
- [ ] First accordion item has `show` class; all others are collapsed.
- [ ] Accordion markup uses Bootstrap classes: `.accordion`, `.accordion-item`, `.accordion-header`, `.accordion-button`, `.accordion-collapse`, `.accordion-body`, `data-bs-toggle`, `data-bs-parent`.
- [ ] No commented-out code in the file.
- [ ] TypeScript interface `FaqItem` is defined and used.
- [ ] English used for all identifiers, constants, interfaces, and comments.
- [ ] Spanish used exclusively for user-facing template text.

---

## Exact File Path
`src/components/landing/FaqSection.vue`
