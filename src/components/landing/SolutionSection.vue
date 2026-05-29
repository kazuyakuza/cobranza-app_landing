<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal'

useScrollReveal()

const sectionTitle = 'Cobranza App simplifica y centraliza todo el proceso de cobranza'

const bodyText =
  'Es una plataforma que permite cargar deudas de forma rápida (individual o masiva), que tus clientes consulten su saldo actual en cualquier momento, suban sus comprobantes de pago y que tú puedas validarlos de manera ágil y ordenada.'

interface SolutionFeature {
  icon: string
  label: string
  description: string
}

const features: SolutionFeature[] = [
  {
    icon: 'bi-lightning-charge',
    label: 'Carga rápida de deudas',
    description: 'Carga individual o masiva de deudas en segundos'
  },
  {
    icon: 'bi-graph-up',
    label: 'Consulta de saldo',
    description: 'Tus clientes consultan su saldo actual en cualquier momento'
  },
  {
    icon: 'bi-file-earmark-arrow-up',
    label: 'Subida de comprobantes',
    description: 'Los clientes suben sus comprobantes de pago directamente'
  },
  {
    icon: 'bi-clipboard2-check',
    label: 'Validación ágil',
    description: 'Validá pagos de manera ágil y ordenada'
  }
]

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

          <div data-reveal class="features-wrapper">
            <div class="features-grid row g-4">
              <div
                v-for="feature in features"
                :key="feature.label"
                class="feature-item col-12 col-md-6"
              >
                <div class="feature-content dark-card">
                  <i :class="feature.icon" class="feature-icon" aria-hidden="true"></i>
                  <div class="feature-text-wrapper">
                    <h3 class="feature-label">{{ feature.label }}</h3>
                    <p class="feature-description">{{ feature.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

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

.features-wrapper {
  margin-bottom: 2.5rem;
}

.features-grid {
  margin-bottom: 0;
}

.feature-content {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.feature-icon {
  font-size: 1.4rem;
  color: var(--color-primary);
  flex-shrink: 0;
  margin-top: 0.15rem;
}

.feature-text-wrapper {
  flex: 1;
}

.feature-label {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.35rem;
  line-height: 1.35;
}

.feature-description {
  font-size: 0.95rem;
  color: var(--color-text-on-dark-muted);
  line-height: 1.5;
  margin-bottom: 0;
}

.solution-closing {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-text-on-dark);
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

  .feature-label {
    font-size: 1.05rem;
  }

  .feature-description {
    font-size: 0.9rem;
  }
}
</style>
