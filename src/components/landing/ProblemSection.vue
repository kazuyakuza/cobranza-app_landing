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
    text: 'Conciliar manualmente con los extractos bancarios'
  },
  {
    icon: 'bi-person-x',
    text: 'Resolver confusiones y reclamos de clientes'
  }
]

const closingStatement = 'Todo esto genera pérdida de tiempo, errores y estrés innecesario.'
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
                <div class="pain-point-content dark-card">
                  <i :class="point.icon" class="pain-point-icon" aria-hidden="true"></i>
                  <span class="pain-point-text">{{ point.text }}</span>
                </div>
              </li>
            </ul>
          </div>

          <p data-reveal class="problem-closing">
            {{ closingStatement }}
          </p>
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
  align-items: flex-start;
  gap: 1rem;
}

.pain-point-icon {
  font-size: 1.4rem;
  color: var(--color-text-on-dark-dim);
  flex-shrink: 0;
  margin-top: 0.15rem;
}

.pain-point-text {
  font-size: 1rem;
  line-height: 1.55;
}

.problem-closing {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-on-dark);
  line-height: 1.65;
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
}
</style>
