<script setup lang="ts">
// Renders the contact/CTA section with email link, Google Form embed,
// Spanish content, and scroll reveal animations.
import { useScrollReveal } from '@/composables/useScrollReveal'

useScrollReveal()

const sectionTitle = '¿Listo para probar Cobranza App?'
const sectionSubtitle = 'Dejanos tu consulta o solicitud de acceso. Respondemos a la brevedad.'
const contactEmail = 'cobranza360pro@gmail.com'
const emailLabel = 'Email de contacto:'
const ctaText = 'Quiero probar la Beta gratis'
const ctaHref = 'mailto:cobranza360pro@gmail.com?subject=Solicitud%20de%20acceso%20a%20la%20Beta'
const googleFormUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLSfrzXRY9nH9iQ6o2lyXvrZw_B8WxKGekqDzaG5JRRzTM0tGXQ/viewform?embedded=true'
const formNotice = 'Tus respuestas se guardan automáticamente en Google Sheets.'
</script>

<template>
  <section id="contact" class="contact-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8 text-center">
          <h2 data-reveal class="contact-title">
            {{ sectionTitle }}
          </h2>

          <p data-reveal class="contact-subtitle">
            {{ sectionSubtitle }}
          </p>

          <div data-reveal class="contact-email-wrapper">
            <span class="contact-email-label">{{ emailLabel }}</span>
            <a :href="'mailto:' + contactEmail" class="contact-email-link">
              {{ contactEmail }}
            </a>
          </div>

          <a
            data-reveal
            :href="ctaHref"
            class="btn btn-primary btn-lg px-4 py-3 fw-semibold contact-cta"
          >
            {{ ctaText }}
          </a>

          <div data-reveal class="contact-form-wrapper">
            <iframe
              :src="googleFormUrl"
              width="640"
              height="576"
              frameborder="0"
              marginheight="0"
              marginwidth="0"
              title="Formulario de contacto"
            >
              Loading…
            </iframe>
          </div>

          <p data-reveal class="contact-form-notice">
            {{ formNotice }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  background: var(--color-bg-dark);
  color: var(--color-text-on-dark);
}

.contact-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.25;
  color: var(--color-text-on-dark);
}

.contact-subtitle {
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: var(--color-text-on-dark-muted);
}

.contact-email-wrapper {
  margin-bottom: 1.5rem;
}

.contact-email-label {
  display: block;
  font-size: 1rem;
  color: var(--color-text-on-dark-muted);
  margin-bottom: 0.25rem;
}

.contact-email-link {
  font-size: 1.125rem;
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}

.contact-email-link:hover {
  color: var(--color-primary-hover);
  text-decoration: underline;
}

.contact-cta {
  display: inline-block;
  border-radius: 8px;
  margin-bottom: 2.5rem;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.contact-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 123, 255, 0.35);
}

.contact-form-wrapper {
  position: relative;
  width: 100%;
  max-width: 640px;
  margin: 0 auto 1rem;
  padding-top: 90%;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
}

.contact-form-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.contact-form-notice {
  font-size: 0.875rem;
  color: var(--color-text-on-dark-dim);
  margin-bottom: 0;
}

@media (max-width: 767.98px) {
  .contact-title {
    font-size: 1.75rem;
  }

  .contact-subtitle {
    font-size: 1rem;
  }
}
</style>
