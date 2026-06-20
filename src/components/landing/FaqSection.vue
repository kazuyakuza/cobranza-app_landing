<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal'
import { faqGroups } from '@/data/faq'
import FaqGroupAccordion from '@/components/landing/FaqGroupAccordion.vue'

useScrollReveal()

const sectionTitle = 'Preguntas Frecuentes'
const outerAccordionId = 'faqOuterAccordion'
</script>

<template>
  <section id="faq" class="faq-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-9">
          <h2 data-reveal class="faq-title">{{ sectionTitle }}</h2>

          <div :id="outerAccordionId" data-reveal class="accordion faq-outer-accordion">
            <FaqGroupAccordion
              v-for="group in faqGroups"
              :key="group.accordionId"
              :group="group"
              :outer-parent-id="outerAccordionId"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-section {
  background: var(--color-bg-card-alt);
  color: var(--color-text-on-dark);
}

.faq-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.25;
  color: var(--color-text-on-dark);
}

.faq-outer-accordion {
  margin-top: 2rem;
}

@media (max-width: 767.98px) {
  .faq-title {
    font-size: 1.75rem;
  }
}
</style>
