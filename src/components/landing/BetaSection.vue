<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal'

useScrollReveal()

const badgeText = 'Beta Abierta — 100% Gratis'
const sectionTitle = 'Estamos en versión Beta'

const leadParagraph =
  '<strong>Cobranza App</strong> se encuentra actualmente en fase <strong>Beta abierta</strong>. Durante toda esta etapa el servicio es <strong>100% gratuito</strong>.'

interface BetaFeature {
  text: string
}

const features: BetaFeature[] = [
  { text: 'Duración estimada de la Beta: 1 a 3 meses' },
  {
    text: 'Todos los usuarios que se sumen durante esta etapa recibirán una bonificación especial al lanzarse la versión paga'
  },
  {
    text: 'El producto se mejora constantemente según el feedback de los primeros usuarios'
  }
]

const closingPhrase = 'Un sistema en constante evolución, que crece junto a vos.'
</script>

<template>
  <section id="beta" class="beta-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8 text-center">
          <span data-reveal class="beta-badge">{{ badgeText }}</span>

          <h2 data-reveal class="beta-title">{{ sectionTitle }}</h2>

          <p data-reveal class="beta-lead" v-html="leadParagraph" />

          <ul data-reveal class="beta-features">
            <li v-for="feature in features" :key="feature.text" class="beta-feature-item">
              <i class="bi bi-check-circle-fill beta-feature-icon" aria-hidden="true" />
              <span class="beta-feature-text">{{ feature.text }}</span>
            </li>
          </ul>

          <p data-reveal class="beta-closing">{{ closingPhrase }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.beta-section {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-hover));
  color: var(--color-white);
}

.beta-badge {
  display: inline-block;
  background: var(--color-accent);
  color: var(--color-white);
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.4rem 1rem;
  border-radius: 9999px;
  margin-bottom: 1.25rem;
}

.beta-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.25;
  color: var(--color-white);
}

.beta-lead {
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: var(--color-white);
  opacity: 0.95;
}

.beta-features {
  list-style: none;
  padding-left: 0;
  margin: 1.5rem 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.beta-feature-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  text-align: left;
}

.beta-feature-icon {
  color: var(--color-accent);
  font-size: 1.25rem;
  flex-shrink: 0;
  margin-top: 0.15rem;
}

.beta-feature-text {
  font-size: 1rem;
  line-height: 1.55;
  font-weight: 500;
  color: var(--color-white);
}

.beta-closing {
  font-size: 1rem;
  font-style: italic;
  margin-top: 1.5rem;
  margin-bottom: 0;
  color: var(--color-white);
  opacity: 0.9;
}

@media (max-width: 767.98px) {
  .beta-title {
    font-size: 1.75rem;
  }

  .beta-lead {
    font-size: 1rem;
  }

  .beta-feature-text {
    font-size: 0.95rem;
  }
}
</style>