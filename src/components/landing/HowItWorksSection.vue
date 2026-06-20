<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal'
import { steps, actorLabels, kindColorMap, CONCILIATION_STEP_NUMBER } from '@/data/how-it-works'
import ConciliationDiagram from '@/components/landing/ConciliationDiagram.vue'

useScrollReveal()

const sectionTitle = 'Cómo funciona Cobranza App'
</script>
<template>
  <section id="how-it-works" class="how-it-works-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-9">
          <h2 data-reveal class="section-title">{{ sectionTitle }}</h2>
          <ol class="list-unstyled">
            <li
              v-for="step in steps"
              :key="step.number"
              data-reveal
              class="step-row"
              :class="[
                `step-${step.kind}`,
                { 'step-first': step.number === 1, 'step-last': step.number === steps.length }
              ]"
              :style="{ '--node-color': kindColorMap[step.kind] }"
            >
              <div class="step-timeline-col" aria-hidden="true">
                <div class="step-node">{{ step.number }}</div>
              </div>
              <div class="step-content">
                <span class="step-tag">{{ actorLabels[step.kind] }}</span>
                <div class="step-card">
                  <p class="step-text">{{ step.text }}</p>
                  <ConciliationDiagram
                    v-if="step.number === CONCILIATION_STEP_NUMBER"
                    class="conciliation-diagram-wrapper"
                    aria-hidden="false"
                  />
                </div>
              </div>
            </li>
          </ol>
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
  margin-bottom: 2rem;
}
.step-row:last-child {
  margin-bottom: 0;
}
.step-timeline-col {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  flex-shrink: 0;
}
.step-timeline-col::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  background: var(--node-color);
}
.step-first .step-timeline-col::before {
  top: 50%;
}
.step-last .step-timeline-col::before {
  bottom: 50%;
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
  background: var(--color-bg-dark);
  border: 2px solid var(--node-color);
  color: var(--node-color);
}
.step-content {
  flex: 1;
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
  border: 1px solid var(--node-color);
  color: var(--node-color);
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
.step-sistema .step-node,
.step-sistema .step-tag {
  border-style: dashed;
}
.step-sistema .step-timeline-col::before {
  background: repeating-linear-gradient(
    to bottom,
    var(--node-color) 0px,
    var(--node-color) 4px,
    transparent 4px,
    transparent 8px
  );
}
.step-resultado .step-node {
  background: var(--node-color);
  border-color: var(--node-color);
  color: var(--color-bg-dark);
}

.conciliation-diagram-wrapper {
  margin-top: 0.5rem;
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
