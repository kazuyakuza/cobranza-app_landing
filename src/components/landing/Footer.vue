<script setup lang="ts">
// Renders the site footer with navigation links, contact email,
// copyright notice, and beta-stage legal disclaimer in Spanish.

const currentYear = new Date().getFullYear()
const companyName = 'Cobranza App'
const contactEmail = 'cobranza360pro@gmail.com'
const closingPhrase = 'Un sistema en constante evolución, que crece junto a vos.'

interface FooterLink {
  label: string
  sectionId: string
}

const footerLinks: FooterLink[] = [
  { label: 'Inicio', sectionId: 'hero' },
  { label: 'Funcionalidades', sectionId: 'features' },
  { label: 'Contacto', sectionId: 'contact' }
]

const copyrightText = `\u00A9 ${currentYear} ${companyName}. Todos los derechos reservados.`
const legalDisclaimer =
  'El producto se encuentra en fase Beta. Las funcionalidades y precios están sujetos a cambios.'

function scrollToSection(sectionId: string): void {
  const element = document.getElementById(sectionId)
  if (!element) {
    return
  }
  const offset = 70
  const targetPosition = element.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top: targetPosition, behavior: 'smooth' })
}
</script>

<template>
  <footer class="footer-section">
    <div class="container">
      <!-- Accompanying phrase -->
      <div class="row">
        <div class="col-12 text-center">
          <p class="footer-phrase">{{ closingPhrase }}</p>
        </div>
      </div>

      <!-- Navigation links and contact email -->
      <div class="row mt-3">
        <div class="col-12 text-center">
          <nav class="footer-nav" aria-label="Footer navigation">
            <a
              v-for="link in footerLinks"
              :key="link.sectionId"
              :href="`#${link.sectionId}`"
              class="footer-link"
              @click.prevent="scrollToSection(link.sectionId)"
            >
              {{ link.label }}
            </a>

            <span class="footer-separator" aria-hidden="true">|</span>

            <a :href="`mailto:${contactEmail}`" class="footer-link">{{ contactEmail }}</a>
          </nav>
        </div>
      </div>

      <!-- Divider -->
      <hr class="footer-divider" />

      <!-- Copyright and legal disclaimer -->
      <div class="row">
        <div class="col-12 text-center">
          <p class="footer-copyright">{{ copyrightText }}</p>
          <p class="footer-legal">{{ legalDisclaimer }}</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-section {
  background: var(--color-bg-deepest);
  color: var(--color-text-on-dark-muted);
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.footer-phrase {
  font-size: 1.125rem;
  font-style: italic;
  color: var(--color-accent);
  font-weight: 600;
  margin-bottom: 0;
  line-height: 1.6;
}

.footer-nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.75rem 1.25rem;
  overflow-wrap: break-word;
}

.footer-link {
  color: var(--color-text-on-dark-muted);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: var(--color-text-on-dark);
}

.footer-separator {
  color: var(--color-text-on-dark-dim);
  user-select: none;
}

.footer-divider {
  border-color: var(--color-border);
  opacity: 0.5;
  margin: 1.5rem 0;
}

.footer-copyright {
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
  color: var(--color-text-on-dark-muted);
}

.footer-legal {
  font-size: 0.8rem;
  margin-bottom: 0;
  color: var(--color-text-on-dark-muted);
}

@media (max-width: 767.98px) {
  .footer-phrase {
    font-size: 1rem;
  }

  .footer-nav {
    gap: 0.5rem 0.75rem;
  }

  .footer-separator {
    display: none;
  }
}
</style>
