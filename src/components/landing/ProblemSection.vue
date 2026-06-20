<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal'

useScrollReveal()

const sectionTitle = '¿Cuántas horas por mes dedicás a gestionar cobros y seguimiento de pagos?'

const bodyParagraph =
  'En muchos negocios (expensas, alquileres, honorarios, cuotas, etc.) el monto a cobrar varía mes a mes. Esto genera una carga constante de consultas, recordatorios y seguimientos.'

const painPointsIntro = 'Además, se pierde tiempo valioso en:'

interface PainPoint {
  icon: string
  text: string
}

const painPoints: PainPoint[] = [
  {
    icon: 'bi-chat-dots',
    text: 'Buscar comprobantes entre WhatsApp, correo y chats'
  },
  {
    icon: 'bi-check2-circle',
    text: 'Verificar que las transferencias correspondan a las deudas correctas'
  },
  {
    icon: 'bi-journal-text',
    text: 'Conciliar manualmente con los movimientos bancarios'
  },
  {
    icon: 'bi-person-x',
    text: 'Resolver confusiones y reclamos de clientes'
  }
]

const commonCasesIntro =
  'Todo esto genera pérdida de tiempo, errores, estrés innecesario y problemas frecuentes como:'

const commonCases: string[] = [
  'Un propietario dice que pagó pero no encontrás el comprobante.',
  'Recibiste una transferencia pero no sabés a qué deuda corresponde.',
  'Un cliente pregunta varias veces cuánto debe este mes.',
  'Tenés que revisar cientos de comprobantes al cierre del mes.',
  'Dificultad para saber rápidamente quién pagó y quién no.'
]
</script>

<template>
  <section id="problem" class="problem-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-9">
          <h2 data-reveal class="problem-title">
            {{ sectionTitle }}
          </h2>

          <p data-reveal class="problem-body">
            {{ bodyParagraph }}
          </p>

          <p data-reveal class="problem-intro">{{ painPointsIntro }}</p>

          <div data-reveal class="pain-points-wrapper">
            <ul class="pain-points-list list-unstyled row g-4">
              <li
                v-for="point in painPoints"
                :key="point.text"
                class="pain-point-item col-12 col-md-6"
              >
                <div class="pain-point-content dark-card h-100">
                  <i :class="point.icon" class="pain-point-icon" aria-hidden="true"></i>
                  <span class="pain-point-text">{{ point.text }}</span>
                </div>
              </li>
            </ul>
          </div>

          <p data-reveal class="problem-closing">
            {{ commonCasesIntro }}
          </p>

          <ul data-reveal class="common-cases-list list-unstyled">
            <li v-for="caseItem in commonCases" :key="caseItem" class="common-case-item">
              <i class="bi bi-exclamation-triangle common-case-marker" aria-hidden="true"></i>
              <span class="common-case-text">{{ caseItem }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.problem-section {
  background: var(--color-bg-dark);
  color: var(--color-text-on-dark);
}

.problem-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.25;
}

.problem-body {
  font-size: 1.125rem;
  color: var(--color-text-on-dark-muted);
  margin-bottom: 2.5rem;
  line-height: 1.65;
}

.problem-intro {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-on-dark);
  margin-bottom: 1.5rem;
  line-height: 1.65;
}

.pain-points-wrapper {
  margin-bottom: 2.5rem;
}

.pain-points-list {
  margin-bottom: 0;
}

.pain-point-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.pain-point-icon {
  font-size: 1.4rem;
  color: var(--color-text-on-dark-dim);
  flex-shrink: 0;
}

.pain-point-text {
  font-size: 1rem;
  line-height: 1.55;
}

.problem-closing {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-pain);
  line-height: 1.65;
}

.common-cases-list {
  margin-top: 1rem;
  margin-bottom: 0;
}

.common-case-item {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  padding: 0.4rem 0;
}

.common-case-marker {
  color: var(--color-pain);
  font-size: 0.95rem;
  margin-top: 0.25rem;
  flex-shrink: 0;
}

.common-case-text {
  font-size: 1rem;
  line-height: 1.55;
  color: var(--color-text-on-dark-muted);
}

@media (max-width: 767.98px) {
  .problem-title {
    font-size: 1.75rem;
  }

  .problem-body,
  .problem-intro,
  .problem-closing {
    font-size: 1rem;
  }

  .common-case-text {
    font-size: 0.9rem;
  }
}
</style>
