# Global Plan — TODO-02: Navbar + Hero Section

**Source**: `.agent/todos/20260521/20260521-todo-0.md`
**Date**: 2026-05-26
**Branch**: `feat/navbar-hero-section`

---

## Step 2: Git Feature Branch Setup

- Assign to Code sub-agent via `task` tool.
- Commit any unstaged/untracked files with a meaningful message.
- Ensure on `main`, create `feat/navbar-hero-section`, switch to it.

## Step 3: Version Update

- Assign to Code sub-agent via `task` tool.
- Bump `package.json` version from `0.1.0` to `0.2.0` (minor feature).
- Commit as `chore: bump version to 0.2.0`.

---

## Task 1: Create Reusable Navbar Component — 4.1 Analysis & Planning

- Assign to Plan sub-agent via `task` tool.
- Analyze Navbar requirements: sticky, Bootstrap 5, 9 menu items, CTA button, responsive hamburger.
- Generate implementation plan saved to `.kilo/plans/20260526-navbar-component.md`.
- Present for user approval.

## Task 1: Create Reusable Navbar Component — 4.2 Implementation

- Assign to Code sub-agent via `task` tool.
- Follow the implementation plan from 4.1.
- Implement `src/components/landing/Navbar.vue` with:
  - Sticky/fixed-top navbar using Bootstrap 5 classes.
  - Menu items: Inicio, El Problema, La Solución, Rubros, Funcionalidades, Prueba Gratis, Precios, Dudas, Contacto.
  - CTA button: "Quiero probar la Beta gratis".
  - Responsive hamburger menu (Bootstrap collapse).
  - Smooth scroll via anchor links to section IDs.
  - All code in English, user text in neutral Spanish.
- Commit with meaningful message.

## Task 1: Create Reusable Navbar Component — 4.3 Code Review

- Assign to Code Reviewer sub-agent via `task` tool.
- Review Navbar.vue for errors, plan deviations, rule compliance.
- Generate fix plan if needed; max 3 cycles.
- Assign fixes to Code sub-agent if required.

## Task 1: Create Reusable Navbar Component — 4.4 Documentation

- Assign to Docs Specialist sub-agent via `task` tool.
- Add code comments where needed.
- Update project docs if required.

## Task 1: Create Reusable Navbar Component — 4.5 Verification

- Assign to Code sub-agent via `task` tool.
- Verify implementation plan adherence.
- Run `npm run build` to check for TypeScript errors.
- Commit any unstaged files.

## Task 1: Create Reusable Navbar Component — 4.6 Task Completion

- Assign to Code sub-agent via `task` tool.
- Mark Task 1 as `[DONE]` in TODO file.
- Commit changes.
- Update `.kilo/state.json`.

---

## Task 2: Create Hero Section Component — 4.1 Analysis & Planning

- Assign to Plan sub-agent via `task` tool.
- Analyze HeroSection requirements: main title, subtitle, CTA buttons, visual impact, fintech style, mobile responsive.
- Generate implementation plan saved to `.kilo/plans/20260526-hero-section.md`.
- Present for user approval.

## Task 2: Create Hero Section Component — 4.2 Implementation

- Assign to Code sub-agent via `task` tool.
- Follow the implementation plan from 4.1.
- Implement `src/components/landing/HeroSection.vue` with:
  - Main Title: "Cobranza App — Gestioná tus cobros de forma simple, ordenada y eficiente."
  - Subtitle: "Sistema web que permite a empresas y profesionales cargar deudas, recibir comprobantes de pago de sus clientes y conciliarlos de manera centralizada y sin complicaciones."
  - Primary CTA: "Quiero probar la Beta gratis"
  - Optional secondary CTA: "Ver cómo funciona"
  - Professional fintech design, Bootstrap 5 layout.
  - Mobile responsive.
  - All code in English, user text in neutral Spanish.
- Commit with meaningful message.

## Task 2: Create Hero Section Component — 4.3 Code Review

- Assign to Code Reviewer sub-agent via `task` tool.
- Review HeroSection.vue for errors, plan deviations, rule compliance.
- Generate fix plan if needed; max 3 cycles.
- Assign fixes to Code sub-agent if required.

## Task 2: Create Hero Section Component — 4.4 Documentation

- Assign to Docs Specialist sub-agent via `task` tool.
- Add code comments where needed.
- Update project docs if required.

## Task 2: Create Hero Section Component — 4.5 Verification

- Assign to Code sub-agent via `task` tool.
- Verify implementation plan adherence.
- Run `npm run build` to check for TypeScript errors.
- Commit any unstaged files.

## Task 2: Create Hero Section Component — 4.6 Task Completion

- Assign to Code sub-agent via `task` tool.
- Mark Task 2 as `[DONE]` in TODO file.
- Commit changes.
- Update `.kilo/state.json`.

---

## Task 3: Integrate into Main App — 4.1 Analysis & Planning

- Assign to Plan sub-agent via `task` tool.
- Analyze integration needs: App.vue already imports all components; verify section IDs match navbar links, ensure smooth scrolling works.
- Generate implementation plan saved to `.kilo/plans/20260526-integration.md`.
- Present for user approval.

## Task 3: Integrate into Main App — 4.2 Implementation

- Assign to Code sub-agent via `task` tool.
- Follow the implementation plan from 4.1.
- Verify/update `src/App.vue` to include `<Navbar />` and `<HeroSection />` with correct integration.
- Ensure all section IDs match navbar anchor links:
  - `id="hero"`
  - `id="problem"`
  - `id="solution"`
  - `id="use-cases"` (Rubros)
  - `id="features"` (Funcionalidades)
  - `id="beta"` (Prueba Gratis)
  - `id="pricing"` (Precios)
  - `id="faq"` (Dudas)
  - `id="contact"` (Contacto)
- Implement smooth scrolling behavior.
- Commit with meaningful message.

## Task 3: Integrate into Main App — 4.3 Code Review

- Assign to Code Reviewer sub-agent via `task` tool.
- Review integration for correctness and plan adherence.
- Generate fix plan if needed; max 3 cycles.

## Task 3: Integrate into Main App — 4.4 Documentation

- Assign to Docs Specialist sub-agent via `task` tool.
- Update docs as needed.

## Task 3: Integrate into Main App — 4.5 Verification

- Assign to Code sub-agent via `task` tool.
- Verify all navbar links scroll to correct sections.
- Run `npm run build` for TypeScript errors.
- Commit any unstaged files.

## Task 3: Integrate into Main App — 4.6 Task Completion

- Assign to Code sub-agent via `task` tool.
- Mark Task 3 as `[DONE]` in TODO file.
- Commit changes.
- Update `.kilo/state.json`.

---

## Task 4: Styling & Polish — 4.1 Analysis & Planning

- Assign to Plan sub-agent via `task` tool.
- Analyze styling needs: Bootstrap 5 utilities + scoped styles, professional color palette, mobile UX, optional scroll animations.
- Generate implementation plan saved to `.kilo/plans/20260526-styling-polish.md`.
- Present for user approval.

## Task 4: Styling & Polish — 4.2 Implementation

- Assign to Code sub-agent via `task` tool.
- Follow the implementation plan from 4.1.
- Apply scoped styles to Navbar and HeroSection.
- Define consistent professional color palette (fintech style).
- Ensure excellent mobile UX.
- Add subtle scroll animations if specified.
- Commit with meaningful message.

## Task 4: Styling & Polish — 4.3 Code Review

- Assign to Code Reviewer sub-agent via `task` tool.
- Review styling for consistency and plan adherence.
- Generate fix plan if needed; max 3 cycles.

## Task 4: Styling & Polish — 4.4 Documentation

- Assign to Docs Specialist sub-agent via `task` tool.
- Update docs as needed.

## Task 4: Styling & Polish — 4.5 Verification

- Assign to Code sub-agent via `task` tool.
- Verify visual consistency across breakpoints.
- Run `npm run build` for TypeScript errors.
- Commit any unstaged files.

## Task 4: Styling & Polish — 4.6 Task Completion

- Assign to Code sub-agent via `task` tool.
- Mark Task 4 as `[DONE]` in TODO file.
- Commit changes.
- Update `.kilo/state.json`.

---

## Step 5: TODO File Completion

- Assign to Code sub-agent via `task` tool.
- Rename TODO file to `20260521-todo-0-DONE.md`.
- Commit.
- Merge `feat/navbar-hero-section` into `main`.
- Delete feature branch on success.
- Push `main` to `origin` (only if origin exists).

## Step 6: Continuation

- Check for remaining TODO files.
- If any, ask user to proceed with next file in new chat.
