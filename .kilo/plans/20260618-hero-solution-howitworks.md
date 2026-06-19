# Global Plan: TODO-10 — Hero Update + Problem/Solution Improvements + "Cómo funciona" Section

## Overview

Update the Hero, strengthen the Problem → Solution narrative with a clear "Antes vs Después" comparison, and add a new visual section "Cómo funciona Cobranza App". All code and comments in English. All visible text in Neutral Spanish.

## Pre-Analysis

- **Tech Stack**: Vue 3 + TypeScript + Bootstrap 5 + Vite
- **Current Version**: 0.6.5
- **New Dependencies**: `@vue-flow/core` and related packages for the flowchart diagram
- **Affected Components**: `HeroSection.vue`, `SolutionSection.vue`, `Navbar.vue`, `App.vue`, `FloatingCta.vue`
- **New Component**: `HowItWorksSection.vue`
- **Content File**: `.agent/project-info/landing-content.es.md` requires updates
- **Mobile Responsiveness**: All changes must be fully responsive

## Global Steps

### Step 2: Git Feature Branch Setup
- Run `git status`, commit any unstaged files
- Switch to `main`, ensure it's up to date
- Create branch: `feat/hero-solution-how-it-works`

### Step 3: Version Update
- Increment patch version in `package.json` from `0.6.5` to `0.6.6`
- Commit: `chore: bump version to 0.6.6`

---

## Task 0: Update Spanish Content File

### 4.1 Analysis & Planning
- Identify exact changes needed in `landing-content.es.md`
- Plan: update Hero title, CTA text, Solution content with Antes vs Después table, add new section 3.5

### 4.2 Implementation
- Update Hero title to: "Centralizá deudas, comprobantes y conciliación bancaria en un solo lugar"
- Update Hero CTA to: "Solicitar acceso anticipado gratuito"
- Replace Solution content with improved version including Antes vs Después table
- Add new section 3.5 "Cómo funciona Cobranza App" with 7 steps

### 4.3 Code Review
- Verify exact text matches specification
- Check formatting and structure

### 4.4 Documentation
- No additional docs needed (content file update)

### 4.5 Verification
- Confirm all changes match TODO specification exactly

### 4.6 Task Completion
- Mark `[DONE]` in TODO file

---

## Task 1: Improve Hero & Solution Sections

### 4.1 Analysis & Planning
- Analyze current `HeroSection.vue` and `SolutionSection.vue`
- Plan new CTA text and Antes vs Después visual layout
- Decision: use Bootstrap grid with icons for clean two-column comparison

### 4.2 Implementation
- **HeroSection.vue**:
  - Update `mainTitle` constant
  - Update `primaryCtaText` to "Solicitar acceso anticipado gratuito"
  - Verify secondary CTA scrolls to `how-it-works` section (update if needed)
- **SolutionSection.vue**:
  - Keep section title
  - Update body text to match new content
  - Replace features grid with "Antes vs Después" two-column comparison
  - Use Bootstrap grid (`col-12 col-md-6`)
  - Add Bootstrap icons for each row (e.g., `bi-x-circle` for Antes, `bi-check-circle` for Después)
  - Add closing statement
  - Add note about bulk upload ("Próximamente podrás importar deudas desde Excel o CSV en segundos")
  - Ensure responsive: stack columns on mobile

### 4.3 Code Review
- Check visual balance and spacing
- Verify all text matches content file
- Ensure no TypeScript errors

### 4.4 Documentation
- No additional docs needed

### 4.5 Verification
- Confirm layout is visually appealing and balanced
- Test responsive behavior

### 4.6 Task Completion
- Mark `[DONE]` in TODO file

---

## Task 3: Create "Cómo funciona Cobranza App" Section

### 4.1 Analysis & Planning
- Research Vue Flow (`@vue-flow/core`) for modern flowchart
- Analyze if Vue Flow provides clear visual advantage while remaining lightweight
- Plan: install `@vue-flow/core`, `@vue-flow/background`, `@vue-flow/controls`, `@vue-flow/minimap` if needed
- Design 7-step vertical flow diagram
- Plan responsive behavior: horizontal on desktop, vertical on mobile

### 4.2 Implementation
- Install Vue Flow packages: `npm install @vue-flow/core @vue-flow/background @vue-flow/controls`
- Create `src/components/landing/HowItWorksSection.vue`
- Implement with Vue Flow using exact 7 steps:
  1. La empresa carga las deudas (individual o masivamente).
  2. Cada cliente accede con su identificador (código de cliente, DNI + unidad, etc.) y consulta su saldo y vencimientos.
  3. El cliente realiza la transferencia y sube el comprobante directamente en la plataforma.
  4. La empresa sube el extracto bancario.
  5. El sistema cruza automáticamente los comprobantes, transferencias y deudas.
  6. Los casos que requieren atención se revisan y confirman manualmente.
  7. Se genera y descarga el recibo una vez validado el pago.
- Use `id="how-it-works"` for navigation
- Add section title: "Cómo funciona Cobranza App"
- Style with dark theme consistent with other sections
- Ensure fully responsive and mobile-friendly
- Add scroll reveal animations

### 4.3 Code Review
- Check Vue Flow implementation for errors
- Verify all 7 steps are present and accurate
- Ensure responsive behavior

### 4.4 Documentation
- No additional docs needed

### 4.5 Verification
- Confirm diagram renders correctly
- Test on mobile viewport

### 4.6 Task Completion
- Mark `[DONE]` in TODO file

---

## Task 4: Integration

### 4.1 Analysis & Planning
- Plan `App.vue` integration order
- Plan navbar link updates for new section
- Plan smooth scroll integration

### 4.2 Implementation
- Update `App.vue`:
  - Import `HowItWorksSection`
  - Render `<HowItWorksSection />` right after `<SolutionSection />`
- Update all navbar links to include `how-it-works` section
- Update smooth scrolling targets
- Ensure consistent styling across all sections
- Update `FloatingCta.vue` text if needed (should match new CTA)

### 4.3 Code Review
- Verify import paths and component registration
- Check navigation flow

### 4.4 Documentation
- No additional docs needed

### 4.5 Verification
- Confirm all sections render in correct order
- Test navigation from navbar to new section

### 4.6 Task Completion
- Mark `[DONE]` in TODO file

---

## Task 5: Update Navbar

### 4.1 Analysis & Planning
- Plan reduced menu items list
- Plan CTA button text update
- Identify all references to old CTA text

### 4.2 Implementation
- Update `Navbar.vue`:
  - Reduce `menuItems` to:
    - Inicio (hero)
    - El Problema (problem)
    - La Solución (solution)
    - Cómo funciona (how-it-works)
    - Rubros (use-cases)
    - Precios (pricing)
    - Dudas (faq)
    - Contacto (contact)
  - Remove: Funcionalidades, Prueba Gratis
  - Update `ctaText` to "Solicitar acceso anticipado gratuito"
- Update `FloatingCta.vue` button text to "Solicitar acceso anticipado gratuito"

### 4.3 Code Review
- Verify all navigation links work correctly
- Check mobile menu behavior

### 4.4 Documentation
- No additional docs needed

### 4.5 Verification
- Test all navbar links scroll to correct sections
- Verify CTA button text is updated everywhere

### 4.6 Task Completion
- Mark `[DONE]` in TODO file

---

## Step 5: TODO File Completion
- Rename TODO file with `-DONE` suffix
- Ensure all files committed in feature branch
- Switch to `main`, merge feature branch
- Delete feature branch on success
- Push `main` to `origin` if remote is set

## Acceptance Criteria
- [ ] Spanish content file updated with exact texts specified
- [ ] Hero CTA updated to "Solicitar acceso anticipado gratuito"
- [ ] Solution section has clear visual "Antes vs Después" comparison
- [ ] New "Cómo funciona" section implemented with Vue Flow diagram
- [ ] Navbar cleaned up with reduced items
- [ ] Full mobile responsiveness
- [ ] No TypeScript errors
- [ ] Build passes successfully
