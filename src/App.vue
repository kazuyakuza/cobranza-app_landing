<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal'
import Navbar from '@/components/landing/Navbar.vue'
import HeroSection from '@/components/landing/HeroSection.vue'
import ProblemSection from '@/components/landing/ProblemSection.vue'
import SolutionSection from '@/components/landing/SolutionSection.vue'
import HowItWorksSection from '@/components/landing/HowItWorksSection.vue'
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
    <HowItWorksSection />
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
