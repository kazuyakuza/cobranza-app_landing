<script setup lang="ts">
/**
 * FaqSection — Frequently Asked Questions section using Bootstrap 5
 * Accordion. Renders 9 Spanish Q&A pairs with dark theme overrides
 * and scroll reveal animations. Content from landing-content.es.md §8.
 */
import { useScrollReveal } from '@/composables/useScrollReveal'

interface FaqItem {
  question: string
  answer: string
}

useScrollReveal()

const sectionTitle = 'Preguntas Frecuentes'
const accordionId = 'faqAccordion'

const faqItems: FaqItem[] = [
  {
    question: '¿Para quién está pensado Cobranza App?',
    answer:
      'Principalmente para PyMEs, profesionales, monotributistas y administradores que necesitan organizar y agilizar su proceso de cobranza.'
  },
  {
    question: '¿Es una aplicación móvil o web?',
    answer:
      'Es un sistema web responsive. Los clientes finales pueden usarlo cómodamente desde el celular. La administración es más cómoda desde computadora, aunque también es accesible desde móvil.'
  },
  {
    question: '¿Hay límite de clientes?',
    answer:
      'No. No existe límite en la cantidad de clientes. El cobro depende únicamente del volumen de pagos procesados.'
  },
  {
    question: '¿Cómo funcionan las notificaciones?',
    answer:
      'Actualmente mediante email (recordatorios y alertas de nuevos comprobantes). Próximamente incorporaremos WhatsApp y otros canales según demanda.'
  },
  {
    question: '¿Qué medios de pago acepta?',
    answer:
      'El cliente paga por fuera (principalmente transferencia) y sube el comprobante. En etapas posteriores incorporaremos pasarelas de pago integradas.'
  },
  {
    question: '¿Cómo se realiza la conciliación?',
    answer:
      'En esta primera etapa es semi-automática: el sistema ayuda a cruzar extractos bancarios, comprobantes y deudas. No solicitamos ni guardamos credenciales bancarias.'
  },
  {
    question: '¿Los recibos tienen validez fiscal?',
    answer:
      'Actualmente generan recibos válidos internamente. La integración con AFIP (facturación electrónica) está planificada según necesidades de los usuarios.'
  },
  {
    question: '¿Cómo se protegen los datos y comprobantes?',
    answer:
      'La seguridad es una prioridad. Todos los datos y archivos se almacenan de forma segura, con acceso restringido y encriptado.'
  },
  {
    question: '¿Puedo solicitar funcionalidades específicas?',
    answer:
      'Sí. Estamos en etapa Beta y valoramos mucho el feedback. Si necesitás alguna funcionalidad, contáctanos.'
  }
]
</script>

<template>
  <section id="faq" class="faq-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-9">
          <h2 data-reveal class="faq-title">{{ sectionTitle }}</h2>
          <div :id="accordionId" data-reveal class="accordion faq-accordion">
            <div v-for="(item, index) in faqItems" :key="item.question" class="accordion-item">
              <h3 class="accordion-header">
                <button
                  class="accordion-button"
                  :class="{ collapsed: index !== 0 }"
                  type="button"
                  data-bs-toggle="collapse"
                  :data-bs-target="'#faqCollapse' + index"
                  :aria-expanded="index === 0"
                >
                  {{ item.question }}
                </button>
              </h3>
              <div
                :id="'faqCollapse' + index"
                class="accordion-collapse collapse"
                :class="{ show: index === 0 }"
              >
                <div class="accordion-body">{{ item.answer }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-section {
  background: var(--color-bg-slate);
  color: var(--color-text-on-dark);
}

.faq-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.25;
  color: var(--color-text-on-dark);
}

.faq-accordion {
  margin-top: 2rem;
}

.accordion-item {
  /* Rounded corners and consistent vertical spacing between items */
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  margin-bottom: 0.75rem;
  /* Clip content to preserve border-radius on child elements */
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
  font-weight: 600;
  padding: 1.25rem 1.5rem;
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
  font-size: 1rem;
  line-height: 1.6;
  padding: 1.25rem 1.5rem;
}

.accordion-collapse {
  transition: height 0.35s ease;
}

@media (max-width: 767.98px) {
  .faq-title {
    font-size: 1.75rem;
  }
}
</style>
