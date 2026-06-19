<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal'
import type { HowItWorksStep, HowItWorksStepKind } from '@/types/how-it-works'

useScrollReveal()

const sectionTitle = 'Cómo funciona Cobranza App'

const steps: HowItWorksStep[] = [
  { kind: 'empresa', text: 'La empresa carga las deudas (individual o masivamente).' },
  {
    kind: 'cliente',
    text: 'Cada cliente accede con su identificador (código de cliente, DNI + unidad, etc.) y consulta su saldo y vencimientos.'
  },
  {
    kind: 'cliente',
    text: 'El cliente realiza la transferencia y sube el comprobante directamente en la plataforma.'
  },
  { kind: 'empresa', text: 'La empresa sube el extracto bancario.' },
  {
    kind: 'sistema',
    text: 'El sistema cruza automáticamente los comprobantes, transferencias y deudas.'
  },
  {
    kind: 'sistema',
    text: 'Los casos que requieren atención se revisan y confirman manualmente.'
  },
  { kind: 'resultado', text: 'Se genera y descarga el recibo una vez validado el pago.' }
]

const actorLabels: Record<HowItWorksStepKind, string> = {
  empresa: 'Empresa',
  cliente: 'Cliente',
  sistema: 'Automático',
  resultado: 'Recibo'
}
</script>

<template>
  <section id="how-it-works" class="how-it-works-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-9">
          <h2 data-reveal class="section-title">{{ sectionTitle }}</h2>

          <div class="steps-container">
            <div
              v-for="(step, index) in steps"
              :key="index"
              data-reveal
              class="step-row"
              :class="[
                `step-${step.kind}`,
                { 'step-first': index === 0, 'step-last': index === steps.length - 1 }
              ]"
            >
              <div class="step-timeline-col">
                <div class="step-line step-line-top" aria-hidden="true"></div>
                <div class="step-node" aria-hidden="true">{{ index + 1 }}</div>
                <div class="step-line step-line-bottom" aria-hidden="true"></div>
              </div>

              <div class="step-content">
                <span class="step-tag">{{ actorLabels[step.kind] }}</span>
                <div class="step-card">
                  <p class="step-text">{{ step.text }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.how-it-works-section {
  background: var(--color-bg-dark);
  color: var(--color-text-on-dark);
}

.section-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 3rem;
  line-height: 1.25;
  text-align: center;
}

.step-row {
  display: flex;
  gap: 1rem;
}

.step-timeline-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 44px;
  flex-shrink: 0;
}

.step-line {
  width: 2px;
  background: var(--color-border);
  flex: 1;
  min-height: 10px;
}

.step-first .step-line-top,
.step-last .step-line-bottom {
  opacity: 0;
}

.step-node {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
  z-index: 1;
  flex-shrink: 0;
  background: var(--color-bg-dark);
  border: 2px solid var(--color-border);
  color: var(--color-text-on-dark-dim);
}

.step-content {
  flex: 1;
  padding-bottom: 2rem;
}

.step-last .step-content {
  padding-bottom: 0;
}

.step-tag {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  border: 1px solid var(--color-border);
  color: var(--color-text-on-dark-muted);
}

.step-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1.2rem 1.5rem;
}

.step-text {
  font-size: 1rem;
  line-height: 1.55;
  margin-bottom: 0;
  color: var(--color-text-on-dark-muted);
}

/* kind: empresa — blue */
.step-empresa .step-node {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.step-empresa .step-tag {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.step-empresa .step-line {
  background: var(--color-primary);
}

/* kind: cliente — green */
.step-cliente .step-node {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.step-cliente .step-tag {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.step-cliente .step-line {
  background: var(--color-accent);
}

/* kind: sistema — blue dashed */
.step-sistema .step-node {
  border-color: var(--color-primary);
  border-style: dashed;
  color: var(--color-primary);
}

.step-sistema .step-tag {
  border-color: var(--color-primary);
  border-style: dashed;
  color: var(--color-primary);
}

.step-sistema .step-line {
  background: repeating-linear-gradient(
    to bottom,
    var(--color-primary) 0px,
    var(--color-primary) 4px,
    transparent 4px,
    transparent 8px
  );
}

/* kind: resultado — emerald filled */
.step-resultado .step-node {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: var(--color-bg-dark);
}

.step-resultado .step-tag {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.step-resultado .step-line {
  background: var(--color-accent);
}

@media (max-width: 767.98px) {
  .section-title {
    font-size: 1.75rem;
  }

  .step-card {
    padding: 1rem;
  }

  .step-text {
    font-size: 0.95rem;
  }

  .step-timeline-col {
    width: 36px;
  }

  .step-node {
    width: 30px;
    height: 30px;
    font-size: 0.75rem;
  }
}
</style>
