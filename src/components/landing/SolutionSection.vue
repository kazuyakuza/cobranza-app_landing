<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal'
import { comparisonRows } from '@/data/solution'
import SolutionExcelComparison from '@/components/landing/SolutionExcelComparison.vue'

useScrollReveal()

const sectionTitle = 'Cobranza App simplifica y centraliza todo el proceso de cobranza'
const bodyText =
  'Es una plataforma que permite cargar deudas de forma rápida (individual o masiva), que tus clientes consulten su saldo actual en cualquier momento, suban sus comprobantes de pago y que tú puedas validarlos de manera ágil y ordenada.'
const antesLabel = 'Sin Cobranza App'
const despuesLabel = 'Con Cobranza App'
const closingStatement =
  'De esta forma reducís drásticamente el tiempo dedicado a comunicación, verificación y conciliación de pagos.'
</script>

<template>
  <section id="solution" class="solution-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-9">
          <h2 data-reveal class="solution-title">
            {{ sectionTitle }}
          </h2>
          <p data-reveal class="solution-body">
            {{ bodyText }}
          </p>
          <div data-reveal class="comparison-wrapper">
            <div class="comparison-headers">
              <h3 class="comparison-heading comparison-heading--antes">
                <i class="bi bi-x-circle me-2"></i>{{ antesLabel }}
              </h3>
              <h3 class="comparison-heading comparison-heading--despues">
                <i class="bi bi-check-circle me-2"></i>{{ despuesLabel }}
              </h3>
            </div>
            <ul class="comparison-list">
              <li v-for="(row, index) in comparisonRows" :key="index" class="comparison-row">
                <div class="comparison-cell comparison-cell--antes">
                  <span class="comparison-cell-label">{{ antesLabel }}</span>
                  <span class="comparison-text">{{ row.before }}</span>
                </div>
                <div class="comparison-cell comparison-cell--despues">
                  <span class="comparison-cell-label">{{ despuesLabel }}</span>
                  <span class="comparison-text">{{ row.after }}</span>
                </div>
              </li>
            </ul>
          </div>
          <p data-reveal class="solution-closing">
            {{ closingStatement }}
          </p>
          <SolutionExcelComparison data-reveal />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.solution-section {
  background: var(--color-bg-navy);
  color: var(--color-text-on-dark);
}
.solution-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.25;
}
.solution-body {
  font-size: 1.125rem;
  color: var(--color-text-on-dark-muted);
  margin-bottom: 2.5rem;
  line-height: 1.65;
}
.comparison-wrapper {
  margin-bottom: 2rem;
}
.comparison-headers {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}
.comparison-heading {
  font-size: 1.25rem;
  font-weight: 700;
  display: flex;
  align-items: center;
}
.comparison-heading--antes {
  color: var(--color-pain);
}
.comparison-heading--despues {
  color: var(--color-accent);
}
.comparison-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.comparison-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}
.comparison-row:last-child {
  margin-bottom: 0;
}
.comparison-cell {
  display: flex;
  flex-direction: column;
  padding: 0.85rem 1rem;
  border-radius: 8px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
}
.comparison-cell--antes {
  border-left: 3px solid var(--color-pain);
}
.comparison-cell--despues {
  border-left: 3px solid var(--color-accent);
}
.comparison-cell-label {
  display: none;
}
.comparison-text {
  font-size: 0.95rem;
  line-height: 1.45;
  color: var(--color-text-on-dark-muted);
}
.comparison-cell--despues .comparison-text {
  color: var(--color-text-on-dark);
}
.solution-closing {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-accent);
  line-height: 1.65;
  margin-bottom: 1rem;
}
@media (max-width: 767.98px) {
  .solution-title {
    font-size: 1.75rem;
  }
  .solution-body,
  .solution-closing {
    font-size: 1rem;
  }
  .comparison-heading {
    font-size: 1.1rem;
  }
  .comparison-headers {
    display: none;
  }
  .comparison-row {
    grid-template-columns: 1fr;
  }
  .comparison-cell-label {
    display: block;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 0.35rem;
  }
  .comparison-cell--antes .comparison-cell-label {
    color: var(--color-pain);
  }
  .comparison-cell--despues .comparison-cell-label {
    color: var(--color-accent);
  }
  .comparison-text {
    font-size: 0.9rem;
  }
}
</style>
