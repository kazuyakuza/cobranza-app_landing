# Plan: App.vue — Integrate FloatingCta Component

**Task:** Import and render `FloatingCta` in `src/App.vue`
**Source:** `.agent/todos/20260603/20260603-todo-1.md`, line 4

---

## 1. Objective

Add the existing `FloatingCta.vue` component to the root application template so it renders on all landing-page sections except where its internal visibility logic hides it.

---

## 2. Target File

- `src/App.vue`

---

## 3. Current State of `src/App.vue`

```vue
<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal'
import Navbar from '@/components/landing/Navbar.vue'
import HeroSection from '@/components/landing/HeroSection.vue'
import ProblemSection from '@/components/landing/ProblemSection.vue'
import SolutionSection from '@/components/landing/SolutionSection.vue'
import UseCasesSection from '@/components/landing/UseCasesSection.vue'
import FeaturesSection from '@/components/landing/FeaturesSection.vue'
import BetaSection from '@/components/landing/BetaSection.vue'
import PricingSection from '@/components/landing/PricingSection.vue'
import FaqSection from '@/components/landing/FaqSection.vue'
import ContactSection from '@/components/landing/ContactSection.vue'
import Footer from '@/components/landing/Footer.vue'

useScrollReveal()
</script>

<template>
  <Navbar />
  <main>
    <HeroSection />
    <ProblemSection />
    <SolutionSection />
    <UseCasesSection />
    <FeaturesSection />
    <BetaSection />
    <PricingSection />
    <FaqSection />
    <ContactSection />
  </main>
  <Footer />
</template>
```

---

## 4. Changes Required

### Change 1 — Add import statement

Insert a new `import` line for `FloatingCta` after the `Footer` import and before the `useScrollReveal()` call.

**Original snippet:**
```ts
import Footer from '@/components/landing/Footer.vue'

useScrollReveal()
```

**New snippet:**
```ts
import Footer from '@/components/landing/Footer.vue'
import FloatingCta from '@/components/landing/FloatingCta.vue'

useScrollReveal()
```

### Change 2 — Add component to template

Insert `<FloatingCta />` immediately after `<Footer />` and before the closing `</template>` tag.

**Original snippet:**
```vue
  <Footer />
</template>
```

**New snippet:**
```vue
  <Footer />
  <FloatingCta />
</template>
```

---

## 5. Expected Final File

```vue
<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal'
import Navbar from '@/components/landing/Navbar.vue'
import HeroSection from '@/components/landing/HeroSection.vue'
import ProblemSection from '@/components/landing/ProblemSection.vue'
import SolutionSection from '@/components/landing/SolutionSection.vue'
import UseCasesSection from '@/components/landing/UseCasesSection.vue'
import FeaturesSection from '@/components/landing/FeaturesSection.vue'
import BetaSection from '@/components/landing/BetaSection.vue'
import PricingSection from '@/components/landing/PricingSection.vue'
import FaqSection from '@/components/landing/FaqSection.vue'
import ContactSection from '@/components/landing/ContactSection.vue'
import Footer from '@/components/landing/Footer.vue'
import FloatingCta from '@/components/landing/FloatingCta.vue'

useScrollReveal()
</script>

<template>
  <Navbar />
  <main>
    <HeroSection />
    <ProblemSection />
    <SolutionSection />
    <UseCasesSection />
    <FeaturesSection />
    <BetaSection />
    <PricingSection />
    <FaqSection />
    <ContactSection />
  </main>
  <Footer />
  <FloatingCta />
</template>
```

---

## 6. Verification Steps

1. Run the development server (`npm run dev` or equivalent) and confirm the application compiles without errors.
2. Visually verify that the floating CTA appears on the landing page (except on hero/contact sections, as per `FloatingCta.vue` internal logic).
3. Ensure no console warnings or errors related to component registration.

---

## 7. Git Actions

- Commit the change with message: `feat: integrate FloatingCta into App.vue`
