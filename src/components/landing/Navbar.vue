<script setup lang="ts">
interface NavMenuItem {
  label: string
  sectionId: string
}

const menuItems: NavMenuItem[] = [
  { label: 'Inicio', sectionId: 'hero' },
  { label: 'El Problema', sectionId: 'problem' },
  { label: 'La Solución', sectionId: 'solution' },
  { label: 'Rubros', sectionId: 'use-cases' },
  { label: 'Funcionalidades', sectionId: 'features' },
  { label: 'Prueba Gratis', sectionId: 'beta' },
  { label: 'Precios', sectionId: 'pricing' },
  { label: 'Dudas', sectionId: 'faq' },
  { label: 'Contacto', sectionId: 'contact' },
]

const ctaText = 'Quiero probar la Beta gratis'
const brandName = 'Cobranza App'
const NAVBAR_OFFSET_PX = 70

function closeNavCollapse(): void {
  const navContent = document.getElementById('navbarContent')
  if (navContent) {
    navContent.classList.remove('show')
  }
}

function scrollToSection(sectionId: string): void {
  const element = document.getElementById(sectionId)
  if (element) {
    const targetPosition = element.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET_PX
    window.scrollTo({ top: targetPosition, behavior: 'smooth' })
  }
  closeNavCollapse()
}
</script>

<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-light bg-white shadow-sm">
    <div class="container">
      <a
        class="navbar-brand fw-bold text-primary"
        href="#"
        @click.prevent="scrollToSection('hero')"
      >
        {{ brandName }}
      </a>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="navbarContent" class="collapse navbar-collapse">
        <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
          <li v-for="item in menuItems" :key="item.sectionId" class="nav-item">
            <a
              class="nav-link"
              href="#"
              @click.prevent="scrollToSection(item.sectionId)"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>

        <a
          class="btn btn-success px-4 py-2 fw-semibold"
          href="#"
          @click.prevent="scrollToSection('contact')"
        >
          {{ ctaText }}
        </a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  transition: box-shadow 0.3s ease;
}

.nav-link {
  font-size: 0.95rem;
  transition: color 0.2s ease;
}
</style>
