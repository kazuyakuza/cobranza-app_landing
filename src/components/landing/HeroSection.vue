<script setup lang="ts">
import { NAVBAR_HEIGHT_PX } from '@/utils/constants'

const mainTitle = 'Centralizá deudas, comprobantes y conciliación bancaria en un solo lugar'
const subtitle =
  'Sistema web que permite a empresas y profesionales centralizar el ciclo completo entre deudas, comprobantes, transferencias y conciliación, manteniendo siempre control manual cuando sea necesario.'
const primaryCtaText = 'Solicitar acceso anticipado gratuito'
const secondaryCtaText = 'Cómo funciona'

function scrollToContact(): void {
  const element = document.getElementById('contact')
  if (element) {
    const targetPosition = element.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT_PX
    window.scrollTo({ top: targetPosition, behavior: 'smooth' })
  }
}

function scrollToHowItWorks(): void {
  const element = document.getElementById('how-it-works')
  if (element) {
    const targetPosition = element.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT_PX
    window.scrollTo({ top: targetPosition, behavior: 'smooth' })
  }
}
</script>

<template>
  <section id="hero" class="hero-section d-flex align-items-center">
    <div class="container">
      <div class="row justify-content-center text-center">
        <div class="col-12 col-md-10 col-lg-8">
          <h1 data-reveal class="hero-title display-4 fw-bold text-white mb-4">
            {{ mainTitle }}
          </h1>
          <p data-reveal class="hero-subtitle lead mb-5">
            {{ subtitle }}
          </p>
          <div
            data-reveal
            class="hero-cta-wrapper d-flex flex-column flex-sm-row justify-content-center gap-3"
          >
            <button
              class="btn btn-primary btn-lg px-4 py-3 fw-semibold hero-cta-primary"
              @click="scrollToContact"
            >
              {{ primaryCtaText }}
            </button>
            <button
              class="btn btn-outline-light btn-lg px-4 py-3 fw-semibold hero-cta-secondary"
              @click="scrollToHowItWorks"
            >
              {{ secondaryCtaText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  min-height: 100vh;
  padding-top: var(--navbar-height);
  background: linear-gradient(
    135deg,
    var(--color-bg-navy) 0%,
    var(--color-bg-dark) 40%,
    var(--color-bg-navy) 70%,
    var(--color-bg-dark) 100%
  );
}

.hero-title {
  letter-spacing: -0.02em;
}

.hero-subtitle {
  color: var(--color-text-on-dark-muted);
  opacity: 0.85;
}

.hero-cta-primary {
  border-radius: 8px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.hero-cta-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(var(--bs-primary-rgb), 0.35);
}

.hero-cta-secondary {
  border-radius: 8px;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease,
    color 0.2s ease;
}

.hero-cta-secondary:hover {
  transform: translateY(-2px);
  background-color: var(--color-primary);
  color: var(--color-white);
}

@media (max-width: 767.98px) {
  .hero-section {
    min-height: 90vh;
    padding-top: calc(var(--navbar-height) + 2rem);
  }

  .hero-title {
    font-size: 2rem;
  }
}
</style>
