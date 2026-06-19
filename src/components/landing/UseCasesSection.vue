<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal'
import { rubros } from '@/data/use-cases'
import UseCasesTabs from '@/components/landing/UseCasesTabs.vue'

useScrollReveal()

const rubrosTitle = 'Ideal para:'
</script>

<template>
  <section id="use-cases" class="use-cases-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-9">
          <h2 data-reveal class="use-cases-title">{{ rubrosTitle }}</h2>

          <ul data-reveal class="list-unstyled row g-4 justify-content-center use-cases-grid">
            <li v-for="rubro in rubros" :key="rubro.title" class="col-12 col-md-6 col-lg-4">
              <div class="rubro-card dark-card">
                <div class="rubro-card-header">
                  <i :class="rubro.icon" class="rubro-icon" aria-hidden="true"></i>
                  <h3 class="rubro-title">{{ rubro.title }}</h3>
                </div>
                <ul class="rubro-subitems">
                  <li v-for="subItem in rubro.subItems" :key="subItem" class="rubro-subitem">
                    <i class="bi bi-check2 rubro-subitem-icon" aria-hidden="true"></i>
                    <span>{{ subItem }}</span>
                  </li>
                </ul>
              </div>
            </li>
          </ul>

          <UseCasesTabs />
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
  margin-bottom: 3rem;
}

.rubro-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  transition:
    transform 0.25s ease,
    border-color 0.25s ease;
}

.rubro-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-primary);
}

.rubro-card-header {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.rubro-icon {
  font-size: 1.4rem;
  color: var(--color-primary);
  flex-shrink: 0;
  margin-top: 0.15rem;
}

.rubro-title {
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1.35;
  margin-bottom: 0;
}

.rubro-subitems {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.rubro-subitem {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.9375rem;
  line-height: 1.5;
  color: var(--color-text-on-dark-muted);
}

.rubro-subitem-icon {
  color: var(--color-accent);
  flex-shrink: 0;
  margin-top: 0.2rem;
  font-size: 0.85rem;
}

@media (max-width: 767.98px) {
  .use-cases-title {
    font-size: 1.75rem;
  }
}
</style>
