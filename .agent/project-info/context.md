# Project Context: Cobranza App Landing Page

## Current Work Focus

**Phase**: TODO-09 — Task 3 Step 4.4 Documentation (ContactSection Changes)
**Status**: ContactSection ctaText changed to 'Enviar Correo', pre-form text added, CSS rule added; context updated

## Recent Changes

- **2026-06-03**: ContactSection changes — `ctaText` changed from 'Quiero probar la Beta gratis' to 'Enviar Correo'; pre-form text `<p>` added before Google Form iframe with class `contact-form-pretext`; scoped CSS rule added for `.contact-form-pretext`; code is self-documenting (clear variable names: `ctaText`, `ctaHref`, `contact-form-pretext`); no comments needed
- **2026-06-03**: ProblemSection text change — pain point updated from "extractos bancarios" to "movimientos bancarios" in `src/components/landing/ProblemSection.vue`
- **2026-06-03**: Navbar mobile reorder — CTA button now renders before hamburger toggle in mobile controls container; code is self-documenting (clear variable names: `mobileCtaText`, `ctaText`, `closeNavCollapse`, `scrollToSection`); no comments needed
- **2026-06-02**: Task C Step 4.4 — Documentation: Reviewed README.md Deployment section (clear build commands, two deployment options, live URL, important notes including missing OG image); no code comments needed for config files; Task C changes include: `vite.config.ts` base path set for GitHub Pages, `package.json` homepage field added, `index.html` OG URLs fixed, README Deployment section added
- **2026-06-02**: Task B Step 4.4 — Documentation: Reviewed HeroSection.vue, Navbar.vue, index.html (all self-documenting; CSS changes use clear variable names; SEO tags are self-explanatory); no comments added; Task B changes include: Hero CTA shadow now uses `--bs-primary-rgb` CSS variable, secondary CTA color transition added, Navbar CTA border-radius and hover lift applied, SEO meta tags (description, keywords, OG) added to index.html
- **2026-06-02**: Task A Step 4.4 — Documentation: Reviewed UseCasesSection.vue (self-documenting code, existing comments sufficient); content text updated in commit `bbac0b9`
- **2026-06-01**: TODO-08 Step 4.4 — Documentation update for styling polish; full landing page now complete (10 sections + Navbar + Footer)
- **2026-06-01**: Applied 3 minor CSS fixes — contrast improvements and overflow corrections across landing sections
- **2026-06-01**: Task 3 (Design & UX) — ContactSection & Footer review pass; minor CSS variable fix on CTA hover shadow; no new patterns emerged
- **2026-06-01**: Implemented Footer component — navigation links, contact email, copyright, beta legal disclaimer, smooth scroll, dark theme, documented
- **2026-06-01**: Implemented ContactSection component — email contact link, Google Form iframe embed, mailto CTA button, Spanish content, scroll reveal animations, dark theme
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

1. Complete TODO-08 remaining sub-steps (4.5 Verification, 4.6 Task Completion)
2. Implement remaining landing page sections (ProblemSection, SolutionSection, BenefitsSection)
3. Integrate Spanish content from `landing-content.es.md` into all sections

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
- [x] ContactSection component — email link, Google Form embed, mailto CTA, dark theme, documented
- [x] Footer component — nav links, contact email, copyright, beta disclaimer, smooth scroll, documented
- [x] Landing page structure — all 10 sections + Navbar + Footer with styling polish applied
- [x] UseCasesSection — content update (Task A), detailed example text refined
- [x] Visual review & SEO — Hero CTA variable fix, Navbar CTA consistency, SEO meta tags (Task B)
- [x] Deployment preparation — vite base path, homepage field, OG URLs fixed, README docs added (Task C)
- [ ] Implement remaining landing page sections (ProblemSection, SolutionSection, BenefitsSection)
- [ ] Integrate Spanish content

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

- Bootstrap 5 Accordion with multi-open behavior (multiple items can be expanded simultaneously)
- Dark theme overrides for accordion button, body, and chevron icon
- Scroll reveal animations via `data-reveal` attribute
- Responsive title sizing (2.25rem desktop, 1.75rem mobile)

**Design Details**:

- Accordion items: 8px border-radius, 0.75rem vertical spacing, overflow hidden to clip child content to rounded corners
- Card backgrounds use `--color-bg-card` with `--color-border` borders
- Expanded state uses `--color-bg-card-alt` for visual distinction

### ContactSection Component Details

**File**: `src/components/landing/ContactSection.vue`
**Purpose**: Contact/CTA section with email link, embedded Google Form, and mailto call-to-action button.
**Key Features**:

- Email contact link to `cobranza360pro@gmail.com` with hover styling
- Google Form embedded via responsive iframe with 90% padding-top ratio
- Mailto CTA button with subject pre-filled for beta access request
- All Spanish content from landing requirements
- Scroll reveal animations via `data-reveal` attribute
- Dark theme with `--color-bg-dark` background and muted text colors
- Responsive: iframe scales to container width, font sizes reduce on mobile (<768px)

### UseCasesSection Component Details

**File**: `src/components/landing/UseCasesSection.vue`
**Purpose**: Displays target audiences that benefit from Cobranza App, plus a detailed walkthrough example of expense management workflow.
**Key Features**:

- Grid of 5 use case cards with Bootstrap icons (consorcios, inmobiliarias, profesionales, educación/gimnasios, cobros recurrentes)
- Detailed example section: step-by-step "Administración de Expensas" workflow (7 steps)
- Closing note extending the workflow to other use cases (honorarios, cuotas, alquileres, gimnasios)
- Scroll reveal animations via `data-reveal` attribute
- Dark theme with `--color-bg-slate` background, `--color-bg-card-alt` for detailed example card
- Responsive title sizing (2.25rem desktop, 1.75rem/1.25rem mobile)
- All content in neutral Spanish

### Footer Component Details

**File**: `src/components/landing/Footer.vue`
**Purpose**: Site footer with closing phrase, navigation links, contact email, copyright notice, and beta-stage legal disclaimer.
**Key Features**:

- Closing phrase: "Un sistema en constante evolución, que crece junto a vos."
- Navigation links: Inicio, Funcionalidades, Contacto — smooth scroll with 70px offset
- Contact email link: `cobranza360pro@gmail.com` via mailto
- Copyright: dynamic year with company name
- Legal disclaimer: beta-stage notice about features and pricing subject to change
- Dark theme with `--color-bg-deepest` background and muted text colors
- Responsive: nav links wrap on mobile, separator pipes hidden on small screens

## Pending TODO Files

Check `.agent/todos/` for upcoming tasks.

## Context Window Management

Project is initialized and actively building landing page components. Build and lint pass cleanly. Dark-first styling system documented in style guide.
