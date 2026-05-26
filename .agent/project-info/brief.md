# Project Brief: Cobranza App Landing Page

## Project Overview

**Project Name:** Cobranza App Landing Page

**Type:** Single Page Landing Page (Marketing Website)

**Objective:**  
Develop a professional, modern and high-converting landing page to promote **Cobranza App**, a SaaS platform for debt management and payment reconciliation. The main goal is to generate leads and onboard users to the Beta program.

---

## Language Rules

- **All user-facing content** (texts, headings, buttons, etc.): Must be in **neutral Spanish**.
- **All development artifacts**: Code, component names, folders, comments, variables, documentation, etc. must be in **English**.
- This project is **only** the landing page. It does **not** include any part of the actual Cobranza App system.

---

## Technical Stack

- **Framework**: Vue.js 3 (Composition API + `<script setup>`)
- **Styling**: Bootstrap 5
- **Language**: TypeScript
- **Architecture**: Component-based with independent sections

---

## Content Source

The Spanish initial content for the landing page can be found [in this file](./landing-content.es.md).

All visible texts must be taken from that file.

---

## Page Structure

The landing page must be developed as a **single full-scrolling page** composed of independent sections/components:

1. **Hero** (`HeroSection.vue`)
2. **Problem** (`ProblemSection.vue`)
3. **Solution** (`SolutionSection.vue`)
4. **Use Cases** (`UseCasesSection.vue`)
5. **Features / Benefits** (`FeaturesSection.vue`)
6. **Beta Status** (`BetaSection.vue`)
7. **Pricing** (`PricingSection.vue`)
8. **FAQ** (`FaqSection.vue`)
9. **Contact** (`ContactSection.vue`)
10. **Footer** (`Footer.vue`)

Additional elements:

- Sticky Navbar with smooth scroll navigation
- Multiple Calls to Action throughout the page
- Responsive design (mobile-first)

---

## Additional Requirements

- Professional, clean and trustworthy design (financial SaaS style)
- Smooth scrolling between sections
- Fully responsive with Bootstrap 5
- SEO-friendly semantic HTML structure
- Contact section including:
  - Visible contact email
  - Embedded form (Google Form or similar) that saves data to Google Sheets
- Include the accompanying phrase: “Un sistema en constante evolución, que crece junto a vos.”

---

## Deliverables

- Complete Vue 3 + TypeScript + Bootstrap 5 project
- Well-organized, clean and maintainable code (English)
- Reusable and independent components
- Ready for deployment as a static site

---

This brief establishes the scope and rules for the development of the landing page.

<!-- DO NOT DELETE NEXT SECTION -->

## Important Note for AI Agents

All agents working on this project MUST adhere to the workflows and rules outlined in [AI Agent Onboarding document](../../AGENTS.md).

Before starting any task:

1. **Review `AGENTS.md`**: is the primary source of instructions for agents.
2. **Follow Workflows**: follow the procedures defined in `.agent/WORKFLOWS.md`, especially the `.kilo/commands/critical-workflow.md`.

<!-- END DO NOT DELETE -->
