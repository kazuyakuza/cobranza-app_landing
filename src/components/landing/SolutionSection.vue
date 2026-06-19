<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal'

useScrollReveal()

const sectionTitle = 'Cobranza App simplifica y centraliza todo el proceso de cobranza'

const bodyText =
  'Es una plataforma que permite cargar deudas de forma rápida (individual o masiva), que tus clientes consulten su saldo actual en cualquier momento, suban sus comprobantes de pago y que tú puedas validarlos de manera ágil y ordenada.'

interface ComparisonRow {
  before: string
  after: string
}

const comparisonRows: ComparisonRow[] = [
  {
    before: 'Comprobantes dispersos en WhatsApp, mail y chats',
    after: 'Todos los comprobantes centralizados y organizados'
  },
  {
    before: 'Tenés que verificar manualmente cada transferencia',
    after: 'El sistema cruza automáticamente comprobantes, transferencias y deudas'
  },
  {
    before: 'Conciliación manual con extractos bancarios',
    after: 'Conciliación asistida con revisión manual solo en excepciones'
  },
  {
    before: 'Clientes preguntando constantemente cuánto deben',
    after: 'Clientes consultan su saldo por sí mismos en cualquier momento'
  }
]

const closingStatement =
  'De esta forma reducís drásticamente el tiempo dedicado a comunicación, verificación y conciliación de pagos.'

const upcomingNote = 'Próximamente podrás importar deudas desde Excel o CSV en segundos.'
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
            <div class="row">
              <div class="col-md-6">
                <h3 class="comparison-heading comparison-heading--antes">
                  <i class="bi bi-x-circle me-2"></i>Antes
                </h3>
                <ul class="comparison-list">
                  <li
                    v-for="(row, index) in comparisonRows"
                    :key="'antes-' + index"
                    class="comparison-item comparison-item--antes"
                  >
                    <span class="comparison-text">{{ row.before }}</span>
                  </li>
                </ul>
              </div>
              <div class="col-md-6">
                <h3 class="comparison-heading comparison-heading--despues">
                  <i class="bi bi-check-circle me-2"></i>Después
                </h3>
                <ul class="comparison-list">
                  <li
                    v-for="(row, index) in comparisonRows"
                    :key="'despues-' + index"
                    class="comparison-item comparison-item--despues"
                  >
                    <span class="comparison-text">{{ row.after }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <p data-reveal class="upcoming-note">
            {{ upcomingNote }}
          </p>
          <p data-reveal class="solution-closing">
            {{ closingStatement }}
          </p>
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
.comparison-heading {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
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
  margin: 0 0 2rem;
}
.comparison-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  margin-bottom: 0.75rem;
  border-radius: 8px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
}
.comparison-item--antes {
  border-left: 3px solid var(--color-pain);
}
.comparison-item--despues {
  border-left: 3px solid var(--color-accent);
}
.comparison-text {
  font-size: 0.95rem;
  line-height: 1.45;
  color: var(--color-text-on-dark-muted);
}
.comparison-item--despues .comparison-text {
  color: var(--color-text-on-dark);
}
.upcoming-note {
  background: var(--color-bg-card-alt);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1rem 1.25rem;
  font-size: 1rem;
  color: var(--color-text-on-dark-muted);
  margin-bottom: 2.5rem;
  text-align: center;
}
.solution-closing {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-accent);
  line-height: 1.65;
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
  .upcoming-note {
    font-size: 0.9rem;
  }
}
</style>
