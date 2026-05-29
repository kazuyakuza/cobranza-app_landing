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
  margin-bottom: 2.5rem;
  line-height: 1.25;
  text-align: center;
}

.use-cases-grid {
  margin-bottom: 2.5rem;
}

.use-case-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  height: 100%;
}

.use-case-icon {
  font-size: 1.5rem;
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
}
</style>
