# Global Plan: Landing Page Polish Fixes

## Overview

This plan addresses 5 small polish items identified in `.agent/todos/20260619/20260619-todo-2.md`. Tasks 2–5 are pure content or minor CSS changes; Task 1 is a Bootstrap variable override fix. To keep execution efficient while respecting the Critical Workflow, Tasks 2–5 are batched under a single implementation cycle after individual analysis.

## Global Pre-Analysis

- **Project**: Cobranza App Landing Page (Vue 3 + TypeScript + Bootstrap 5 + Vite)
- **Scope**: Text replacements in data files + CSS fixes in two components
- **Risk**: Very low — no structural changes, no new dependencies
- **Tests**: Build (`npm run build`) and lint (`npm run lint`) must pass

## Step 2: Git Feature Branch Setup
- Switch to `main`, commit any unstaged changes
- Create and switch to branch `feat/landing-polish-fixes`

## Step 3: Version Update
- Increment patch version in `package.json` (`0.8.0` → `0.8.1`)
- Commit: `chore: bump version to 0.8.1`

---

## Task 1: Fix UseCasesTabs Selected Tab Style

**Task**: Inside the "Rubros" Section, in the "Seleccioná tu caso" part, the selected tab style is broken. It makes the selected tab background black, and that makes the text unreadable.

**Pre-Analysis**: Bootstrap 5 sets `.nav-tabs` CSS variables `--bs-nav-tabs-link-active-bg` to `var(--bs-body-bg)`, which is overridden in our theme to `#080d1a` (near-black). The scoped `.nav-link.active` rule in `UseCasesTabs.vue` lacks sufficient specificity to override Bootstrap's variable-driven rule, causing the active tab to render with a black background and dark text.

**Files**: `src/components/landing/UseCasesTabs.vue`

### 4.1 Analysis & Planning
- Confirm Bootstrap 5 variable override strategy
- Decide between CSS variable overrides on `.nav-tabs` or specificity bump

### 4.2 Implementation
- Add `.nav-tabs { --bs-nav-tabs-link-active-color: ...; --bs-nav-tabs-link-active-bg: ...; --bs-nav-tabs-link-active-border-color: ...; }` overrides inside `UseCasesTabs.vue` scoped style
- Ensure active tab background uses `var(--color-bg-card)` and text uses `var(--color-text-on-dark)`

### 4.3 Code Review
- Verify scoped styles do not leak
- Check visual contrast

### 4.4 Documentation
- No new docs needed (self-documenting CSS)

### 4.5 Verification
- Build passes
- Lint passes

### 4.6 Task Completion
- Mark `[DONE]` in TODO line 1

---

## Task 2: Content Updates — Features & FAQ Text + FAQ Note Style

**Task 2**: In the "Funcionalidades" section, replace the `bi-cloud-upload` feature elaboration text.
**Task 3**: In the FAQ section, replace the recibos/AFIP answer text.
**Task 4**: In the FAQ section, replace the notificaciones/WhatsApp answer text.
**Task 5**: In the FAQ section, improve the visual style of the conciliation note.

**Pre-Analysis**: Tasks 2–4 are exact string replacements in `src/data/features.ts` and `src/data/faq.ts`. Task 5 requires enhancing the `.faq-note` CSS in `src/components/landing/FaqSection.vue` to make the note block more visually distinct (e.g., card-like background, border-radius, padding).

**Files**: `src/data/features.ts`, `src/data/faq.ts`, `src/components/landing/FaqSection.vue`

### 4.1 Analysis & Planning
- Identify exact strings and replacement text
- Define improved `.faq-note` style (background, padding, border-radius)

### 4.2 Implementation
- Replace feature elaboration in `userFeatures`
- Replace FAQ answer in `companyFaqs`
- Replace FAQ answer in `userFaqs`
- Update `.faq-note` scoped CSS in `FaqSection.vue`

### 4.3 Code Review
- Verify text matches requirements exactly
- Verify CSS changes do not break layout

### 4.4 Documentation
- No new docs needed

### 4.5 Verification
- Build passes
- Lint passes

### 4.6 Task Completion
- Mark `[DONE]` in TODO lines 2–5

---

## Step 5: TODO File Completion
- Rename `.agent/todos/20260619/20260619-todo-2.md` to `20260619-todo-2-DONE.md`
- Merge `feat/landing-polish-fixes` into `main`
- Push `main` to `origin`
