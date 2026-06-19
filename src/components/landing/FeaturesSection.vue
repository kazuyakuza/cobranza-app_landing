<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal'
import { featureGroups } from '@/data/features'

useScrollReveal()

const sectionTitle = 'Cómo te ayuda Cobranza App'
const featuresSubtitle = 'Funcionalidades diseñadas para ambas partes del proceso de cobranza'

function collapseId(accordionId: string, index: number): string {
  return `${accordionId}Collapse${index}`
}
</script>

<template>
  <section id="features" class="features-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-9">
          <h2 data-reveal class="features-title">{{ sectionTitle }}</h2>
          <p data-reveal class="features-subtitle">{{ featuresSubtitle }}</p>

          <div class="row g-4">
            <div
              v-for="group in featureGroups"
              :key="group.accordionId"
              data-reveal
              class="col-12 col-lg-6"
            >
              <div :class="[`feature-group--${group.variant}`, 'feature-group']">
                <h3 class="feature-group-title">{{ group.title }}</h3>

                <div class="accordion">
                  <div
                    v-for="(item, index) in group.features"
                    :key="item.text"
                    class="accordion-item"
                  >
                    <h4 class="accordion-header">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        :data-bs-target="`#${collapseId(group.accordionId, index)}`"
                        aria-expanded="false"
                        :aria-controls="collapseId(group.accordionId, index)"
                      >
                        <i :class="[item.icon, 'bi feature-icon']" aria-hidden="true"></i>
                        <span class="feature-text">{{ item.text }}</span>
                      </button>
                    </h4>
                    <div
                      :id="collapseId(group.accordionId, index)"
                      class="accordion-collapse collapse"
                    >
                      <div class="accordion-body">{{ item.elaboration }}</div>
                    </div>
                  </div>
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

.feature-group {
  border-left: 4px solid var(--group-color);
  border-radius: 0 8px 8px 0;
  overflow: hidden;
}

.feature-group--company {
  --group-color: var(--color-primary);
}

.feature-group--user {
  --group-color: var(--color-accent);
}

.feature-group-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  line-height: 1.3;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  color: var(--group-color);
}

.accordion-item {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  margin-bottom: 0.75rem;
  overflow: hidden;
}

.accordion-item:first-of-type,
.accordion-item:last-of-type {
  border-radius: 8px;
}

.accordion-item:last-of-type {
  margin-bottom: 0;
}

.accordion-button {
  background: var(--color-bg-card);
  color: var(--color-text-on-dark);
  font-size: 1rem;
  font-weight: 500;
  padding: 0.875rem 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.accordion-button:not(.collapsed) {
  background: var(--color-bg-card-alt);
  color: var(--color-text-on-dark);
  box-shadow: none;
}

.accordion-button.collapsed {
  background: var(--color-bg-card);
  color: var(--color-text-on-dark);
}

.accordion-button::after {
  filter: brightness(0) invert(0.85);
}

.accordion-button:focus {
  box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.5);
  border-color: var(--color-primary);
}

.accordion-body {
  color: var(--color-text-on-dark-muted);
  font-size: 0.9375rem;
  line-height: 1.6;
  padding: 0 1.5rem 1rem 3.1rem;
}

.accordion-collapse {
  transition: height 0.35s ease;
}

.feature-icon {
  font-size: 1.1rem;
  color: var(--group-color);
  flex-shrink: 0;
  margin-top: 0.2rem;
}

.feature-text {
  flex: 1;
  line-height: 1.55;
}

@media (max-width: 767.98px) {
  .features-title {
    font-size: 1.75rem;
  }

  .feature-group-title {
    font-size: 1.125rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .accordion-button {
    font-size: 0.9375rem;
    padding: 0.75rem 1rem;
  }

  .accordion-body {
    padding: 0 1rem 0.75rem calc(1rem + 1.1rem + 0.75rem);
  }
}
</style>
