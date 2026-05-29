<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal'

useScrollReveal()

const sectionTitle = 'Cómo te ayuda Cobranza App'
const featuresSubtitle = 'Funcionalidades diseñadas para ambas partes del proceso de cobranza'

interface FeatureItem {
  icon: string
  text: string
}

const companyFeatures: FeatureItem[] = [
  { icon: 'bi-building', text: 'Gestión centralizada de clientes y deudas' },
  { icon: 'bi-upload', text: 'Carga masiva de saldos y vencimientos' },
  { icon: 'bi-bar-chart', text: 'Reportes claros de deudas, pagos y morosidad' },
  { icon: 'bi-bell', text: 'Notificaciones automáticas al recibir comprobantes' },
  { icon: 'bi-check2-circle', text: 'Validación ágil de pagos y generación automática de recibos' },
  { icon: 'bi-clock-history', text: 'Historial completo y trazabilidad por cliente' }
]

const userFeatures: FeatureItem[] = [
  { icon: 'bi-search', text: 'Consulta inmediata de su deuda y vencimientos' },
  { icon: 'bi-cloud-upload', text: 'Subida sencilla de comprobantes desde el celular' },
  { icon: 'bi-eye', text: 'Seguimiento en tiempo real del estado de sus pagos' },
  { icon: 'bi-download', text: 'Descarga de recibo oficial una vez validado' }
]
</script>

<template>
  <section id="features" class="features-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-9">
          <h2 data-reveal class="features-title">{{ sectionTitle }}</h2>
          <p data-reveal class="features-subtitle">{{ featuresSubtitle }}</p>

          <div class="row g-4">
            <div data-reveal class="col-12 col-md-6">
              <div class="feature-group dark-card feature-group-company">
                <h3 class="feature-group-title">Para la empresa o profesional</h3>
                <ul class="feature-list list-unstyled">
                  <li v-for="item in companyFeatures" :key="item.text" class="feature-item">
                    <i :class="item.icon" class="feature-icon bi" aria-hidden="true"></i>
                    <span class="feature-text">{{ item.text }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div data-reveal class="col-12 col-md-6">
              <div class="feature-group dark-card feature-group-user">
                <h3 class="feature-group-title">Para el cliente final</h3>
                <ul class="feature-list list-unstyled">
                  <li v-for="item in userFeatures" :key="item.text" class="feature-item">
                    <i :class="item.icon" class="feature-icon bi" aria-hidden="true"></i>
                    <span class="feature-text">{{ item.text }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features-section {
  background: var(--color-bg-dark);
  color: var(--color-text-on-dark);
}

.features-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  line-height: 1.25;
}

.features-subtitle {
  font-size: 1.125rem;
  font-weight: 400;
  color: var(--color-text-on-dark-muted);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.feature-group-company {
  border-left: 4px solid var(--color-primary);
}

.feature-group-user {
  border-left: 4px solid var(--color-accent);
}

.feature-group-company .feature-group-title {
  color: var(--color-primary);
}

.feature-group-user .feature-group-title {
  color: var(--color-accent);
}

.feature-group-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
  line-height: 1.3;
}

.feature-list {
  margin-bottom: 0;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 1rem;
  line-height: 1.55;
  padding-bottom: 0.75rem;
}

.feature-item:last-child {
  padding-bottom: 0;
}

.feature-icon {
  font-size: 1.1rem;
  color: var(--color-accent);
  flex-shrink: 0;
  margin-top: 0.2rem;
  transition: transform 0.2s ease;
}

.feature-item:hover .feature-icon {
  transform: translateX(2px);
}

@media (max-width: 767.98px) {
  .features-title {
    font-size: 1.75rem;
  }

  .feature-group-title {
    font-size: 1.125rem;
  }
}
</style>