<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal'

// Activates scroll-reveal animation for elements with [data-reveal]
useScrollReveal()

const sectionTitle = 'Cómo te ayuda Cobranza App'
</script>

<template>
  <section id="features" class="features-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-9">
          <h2 data-reveal class="features-title">{{ sectionTitle }}</h2>

          <div class="row g-4">
            <!-- Placeholder: Company / Professional -->
            <div data-reveal class="col-12 col-md-6">
              <div class="feature-group dark-card">
                <h3 class="feature-group-title">Para la empresa o profesional</h3>
                <ul class="feature-list list-unstyled">
                  <li class="feature-item">Gestión centralizada de clientes y deudas</li>
                  <li class="feature-item">Carga masiva de saldos y vencimientos</li>
                  <li class="feature-item">Reportes claros de deudas, pagos y morosidad</li>
                  <li class="feature-item">Notificaciones automáticas al recibir comprobantes</li>
                  <li class="feature-item">Validación ágil de pagos y generación automática de recibos</li>
                  <li class="feature-item">Historial completo y trazabilidad por cliente</li>
                </ul>
              </div>
            </div>

            <!-- Placeholder: End User -->
            <div data-reveal class="col-12 col-md-6">
              <div class="feature-group dark-card">
                <h3 class="feature-group-title">Para el cliente final</h3>
                <ul class="feature-list list-unstyled">
                  <li class="feature-item">Consulta inmediata de su deuda y vencimientos</li>
                  <li class="feature-item">Subida sencilla de comprobantes desde el celular</li>
                  <li class="feature-item">Seguimiento en tiempo real del estado de sus pagos</li>
                  <li class="feature-item">Descarga de recibo oficial una vez validado</li>
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
  margin-bottom: 2rem;
  line-height: 1.25;
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
  font-size: 1rem;
  line-height: 1.55;
  padding-bottom: 0.75rem;
  padding-left: 1.5rem;
  position: relative;
}

.feature-item:last-child {
  padding-bottom: 0;
}

.feature-item::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--color-accent);
  font-weight: 700;
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