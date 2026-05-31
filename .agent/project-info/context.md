# Project Context: Cobranza App Landing Page

## Current Work Focus

**Phase**: PricingSection & FaqSection Documentation Complete
**Status**: Code comments added, context updated

## Recent Changes

- **2026-05-30**: Applied FaqSection design polish — accordion item border-radius (8px), vertical spacing (0.75rem), overflow clipping
- **2026-05-30**: Implemented FaqSection component — Bootstrap 5 Accordion with 9 Spanish Q&A pairs, dark theme overrides, scroll reveal animations

- **2026-05-29**: Task 3 (Design & UX) — verified all design requirements met: Beta emerald trust signals, Pricing clear layout, dark-card usage, accompanying phrase in BetaSection. No code changes needed.
- **2026-05-29**: Implemented PricingSection component — pay-per-use model, concrete example with highlighted numbers, Spanish content from landing-content.es.md §7
- **2026-05-29**: Implemented BetaSection component — emerald trust accents, Spanish content from landing-content.es.md §6, accompanying phrase included
- **2026-05-27**: Task 4 Sub-step 4.4 — Documentation: Added minimal CSS comments, created `.agent/project-info/style-guide.md`, updated context
- **2026-05-27**: Task 4 Sub-step 4.3 — Code Review: Styling polish reviewed
- **2026-05-27**: Task 4 Sub-step 4.2 — Implementation: Dark-first CSS variables, base styles, typography, scroll animations, navbar glass-morphism, hero gradient
- **2026-05-27**: Task 3 Sub-steps 4.2–4.6 — Verified App Integration (already complete; no code changes needed)
- **2026-05-27**: Task 2 Sub-step 4.4 — Added minimal code comments to HeroSection.vue
- **2026-05-26**: Completed TODO-01 — Project Initial Setup
- **2026-05-26**: Configured Vue 3 + TypeScript + Vite project with Bootstrap 5
- **2026-05-26**: Set up ESLint + Prettier with flat config
- **2026-05-26**: Created component stubs in `src/components/landing/`
- **2026-05-26**: Updated README.md with project information
- **2026-05-26**: Implemented Navbar component with smooth scroll navigation
- **2026-05-26**: Implemented HeroSection component with smooth scroll navigation and CTAs

## Immediate Next Steps

1. Complete Task 1 sub-steps (4.5 Verification, 4.6 Task Completion)
2. Implement remaining landing page sections (ProblemSection, SolutionSection, BenefitsSection)
3. Implement ContactSection with form integration
4. Integrate Spanish content from `landing-content.es.md` into all sections
5. Responsive design and polish

## Project Status

**Current State**: Dark-first styling system implemented and documented
**Development Stage**: Active UI component development
**Tech Stack**: Vue.js 3, TypeScript, Bootstrap 5, Vite
**Content**: Landing page content ready in Spanish
**Structure**: Complete folder structure with component stubs

## Active Tasks

- [x] Initialize project (TODO-01 complete)
- [x] Add Navbar component — implemented with smooth scroll navigation
- [x] HeroSection component — implemented with scroll-to-section CTAs, documented
- [x] Styling system — CSS variables, base styles, typography, scroll animations, style guide
- [x] FaqSection component — Bootstrap 5 Accordion, 9 Spanish Q&A pairs, documented
- [ ] Implement remaining landing page sections (ProblemSection, SolutionSection, BenefitsSection)
- [ ] Integrate Spanish content
- [ ] Responsive design polish

### Styling System Details

**CSS Variables**: `src/assets/styles/variables.css` — dark-first palette (6 bg shades, 4 interactive, 5 text, Bootstrap overrides)
**Base Styles**: `src/assets/styles/base.css` — section padding, scroll reveal animations, dark card pattern
**Typography**: Inter (Google Fonts), variable weights 400–800, type scale for sections/cards/nav
**Scroll Animations**: `useScrollReveal()` composable + `[data-reveal]` attribute pattern
**Section Pattern**: 8 dark sections, 1 Beta bright breaker, 1 deepest footer
**Style Guide**: `.agent/project-info/style-guide.md` — complete reference for colors, typography, components, AI agent rules

### HeroSection Component Details

**File**: `src/components/landing/HeroSection.vue`
**Purpose**: Full-viewport hero section with gradient background, main title, subtitle, and two call-to-action buttons.
**Key Features**:

- Navy gradient background using CSS variables (`--color-bg-navy`, `--color-bg-dark`)
- Primary CTA: "Quiero probar la Beta gratis" — scrolls to `#contact` section
- Secondary CTA: "Cómo funciona" — scrolls to `#solution` section
- Smooth scroll with 70px offset for fixed navbar
- Responsive: reduces to 90vh height and smaller font on mobile (<768px)
- Hover animations on buttons (translateY + shadow/background changes)
- Scroll reveal animations via `data-reveal` attribute

### FaqSection Component Details

**File**: `src/components/landing/FaqSection.vue`
**Purpose**: FAQ accordion section with 9 Spanish Q&A pairs about Cobranza App.
**Key Features**:

- Bootstrap 5 Accordion with only-first-expanded behavior
- Dark theme overrides for accordion button, body, and chevron icon
- Scroll reveal animations via `data-reveal` attribute
- Responsive title sizing (2.25rem desktop, 1.75rem mobile)

**Design Details**:

- Accordion items: 8px border-radius, 0.75rem vertical spacing, overflow hidden to clip child content to rounded corners
- Card backgrounds use `--color-bg-card` with `--color-border` borders
- Expanded state uses `--color-bg-card-alt` for visual distinction

## Pending TODO Files

Check `.agent/todos/` for upcoming tasks.

## Context Window Management

Project is initialized and actively building landing page components. Build and lint pass cleanly. Dark-first styling system documented in style guide.
