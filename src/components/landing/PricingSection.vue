<script setup lang="ts">
/**
 * PricingSection — Displays the pay-per-use pricing model with a
 * concrete example and transparency explanation. Spanish content
 * sourced from landing-content.es.md §7.
 */
import { useScrollReveal } from '@/composables/useScrollReveal'

useScrollReveal()

const sectionTitle = 'Pagás solo por lo que usás'
const explanationText =
  'No cobramos cuota fija mensual. Cobramos un pequeño porcentaje únicamente sobre los pagos que se procesan y concilian a través de la plataforma.'

interface PricingExampleData {
  totalDebts: string
  reconciled: string
  payableOn: string
}

const exampleData: PricingExampleData = {
  totalDebts: '$1.000.000',
  reconciled: '$400.000',
  payableOn: '$400.000'
}

const exampleTitle = 'Ejemplo'

const transparencyTitle = 'Cobro transparente y personalizado'
const transparencyText =
  'El cobro es mensual y transparente. Los porcentajes se definen de forma personalizada según volumen y características del cliente.'
</script>

<template>
  <section id="pricing" class="pricing-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-9">

          <h2 data-reveal class="pricing-title">{{ sectionTitle }}</h2>

          <p data-reveal class="pricing-explanation">{{ explanationText }}</p>

          <div data-reveal class="pricing-example dark-card">
            <h3 class="example-title">{{ exampleTitle }}</h3>
            <p class="example-body">
              Si generás
              <span class="highlight-number">{{ exampleData.totalDebts }}</span>
              en deudas en un mes y
              <span class="highlight-number">{{ exampleData.reconciled }}</span>
              se pagan mediante el sistema, solo abonás el porcentaje sobre esos
              <span class="highlight-number">{{ exampleData.payableOn }}</span>.
            </p>
          </div>

          <div data-reveal class="pricing-transparency">
            <h3 class="transparency-title">{{ transparencyTitle }}</h3>
            <p class="transparency-text">{{ transparencyText }}</p>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pricing-section {
  background: var(--color-bg-navy);
  color: var(--color-text-on-dark);
}

.pricing-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.25;
}

.pricing-explanation {
  font-size: 1.125rem;
  font-weight: 400;
  color: var(--color-text-on-dark-muted);
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.pricing-example {
  border-left: 4px solid var(--color-primary);
  background: var(--color-bg-card-alt);
  margin-bottom: 2.5rem;
}

.example-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  line-height: 1.3;
  color: var(--color-text-on-dark);
}

.example-body {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 0;
  color: var(--color-text-on-dark);
}

.highlight-number {
  color: var(--color-primary);
  font-weight: 700;
}

.transparency-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  line-height: 1.3;
  color: var(--color-text-on-dark);
}

.transparency-text {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 0;
  color: var(--color-text-on-dark-muted);
}

@media (max-width: 767.98px) {
  .pricing-title {
    font-size: 1.75rem;
  }

  .pricing-explanation {
    font-size: 1rem;
  }

  .example-title,
  .transparency-title {
    font-size: 1.125rem;
  }
}
</style>
