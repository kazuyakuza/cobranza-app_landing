<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal'

// Displays a section listing target audiences that benefit from the product
useScrollReveal()

const sectionTitle = 'Ideal para:'

// Shape of each use case entry in the grid
interface UseCaseItem {
  icon: string
  text: string
}

const useCases: UseCaseItem[] = [
  { icon: 'bi-building', text: 'Administraciones de consorcios y expensas' },
  { icon: 'bi-house-door', text: 'Inmobiliarias y administradores de alquileres' },
  { icon: 'bi-briefcase', text: 'Profesionales y monotributistas (honorarios y servicios)' },
  { icon: 'bi-mortarboard', text: 'Colegios, academias, gimnasios y clubes' },
  { icon: 'bi-arrow-repeat', text: 'Cualquier cobro recurrente o variable' }
]

// Detailed example: Administración de Expensas walkthrough
const detailedExampleTitle = 'Administración de Expensas'

const detailedSteps: string[] = [
  'La administradora carga las expensas del mes (individual o masivamente).',
  'Cada propietario o inquilino accede con su ID de unidad y consulta el monto exacto y fecha de vencimiento.',
  'Realiza la transferencia y sube el comprobante (foto o PDF) directamente en la plataforma.',
  'La administradora sube el extracto bancario.',
  'El sistema facilita el cruzamiento entre comprobantes, transferencias y deudas.',
  'Queda registrado claramente el estado de cada unidad (pagado, pendiente, en revisión).',
  'El cliente puede descargar su recibo oficial una vez validado el pago.'
]

const closingNote =
  'Un flujo similar se aplica a honorarios profesionales, cuotas educativas, alquileres y otros cobros.'
</script>

<template>
  <section id="use-cases" class="use-cases-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-9">
          <h2 data-reveal class="use-cases-title">{{ sectionTitle }}</h2>

          <div data-reveal class="use-cases-grid">
            <ul class="list-unstyled row g-4 justify-content-center">
              <li v-for="item in useCases" :key="item.text" class="col-12 col-md-6 col-lg-4">
                <div class="use-case-card dark-card">
                  <i :class="item.icon" class="use-case-icon" aria-hidden="true"></i>
                  <span class="use-case-text">{{ item.text }}</span>
                </div>
              </li>
            </ul>
          </div>

          <div data-reveal class="detailed-example dark-card">
            <h3 class="detailed-example-title">{{ detailedExampleTitle }}</h3>
            <ol class="detailed-example-steps">
              <li v-for="step in detailedSteps" :key="step" class="detailed-example-step">
                {{ step }}
              </li>
            </ol>
            <p class="detailed-example-note">{{ closingNote }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.use-cases-section {
  background: var(--color-bg-slate);
  color: var(--color-text-on-dark);
}

.use-cases-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.25;
}

.use-cases-grid {
  margin-bottom: 2.5rem;
}

.use-case-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  height: 100%;
  transition: transform 0.25s ease, border-color 0.25s ease;
}

.use-case-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-primary);
}

.use-case-icon {
  font-size: 1.4rem;
  color: var(--color-text-on-dark-dim);
  flex-shrink: 0;
  margin-top: 0.15rem;
}

.use-case-text {
  font-size: 1rem;
  line-height: 1.55;
  font-weight: 500;
}

@media (max-width: 767.98px) {
  .use-cases-title {
    font-size: 1.75rem;
  }

  .detailed-example-title {
    font-size: 1.25rem;
  }
}

.detailed-example {
  border-left: 4px solid var(--color-primary);
  background: var(--color-bg-card-alt);
}

.detailed-example-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  line-height: 1.3;
}

.detailed-example-steps {
  padding-left: 1.25rem;
  margin-bottom: 1.5rem;
}

.detailed-example-step {
  font-size: 1rem;
  line-height: 1.6;
  padding-bottom: 0.75rem;
  color: var(--color-text-on-dark);
}

.detailed-example-step:last-child {
  padding-bottom: 0;
}

.detailed-example-note {
  font-size: 0.95rem;
  font-style: italic;
  color: var(--color-text-on-dark-muted);
  margin-bottom: 0;
}
</style>
