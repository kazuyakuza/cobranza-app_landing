<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { NAVBAR_HEIGHT_PX } from '@/utils/constants'

interface NavMenuItem {
  label: string
  sectionId: string
}

const menuItems: NavMenuItem[] = [
  { label: 'Inicio', sectionId: 'hero' },
  { label: 'El Problema', sectionId: 'problem' },
  { label: 'La Solución', sectionId: 'solution' },
  { label: 'Cómo funciona', sectionId: 'how-it-works' },
  { label: 'Rubros', sectionId: 'use-cases' },
  { label: 'Funcionalidades', sectionId: 'features' },
  { label: 'Precios', sectionId: 'pricing' },
  { label: 'Dudas', sectionId: 'faq' },
  { label: 'Contacto', sectionId: 'contact' }
]

const ctaText = 'Solicitar acceso anticipado gratuito'
const brandName = 'Cobranza App'
const activeSectionId = ref<string>('hero')
const sectionVisibility = new Map<string, number>()
let observer: IntersectionObserver | null = null

function mostVisibleSectionId(currentId: string): string {
  let topId = currentId
  let topRatio = 0
  for (const [id, ratio] of sectionVisibility) {
    if (ratio > topRatio) {
      topRatio = ratio
      topId = id
    }
  }
  return topId
}

function closeNavCollapse(): void {
  const navContent = document.getElementById('navbarContent')
  if (navContent) {
    navContent.classList.remove('show')
  }
}

function scrollToSection(sectionId: string): void {
  const element = document.getElementById(sectionId)
  if (element) {
    const targetPosition = element.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT_PX
    window.scrollTo({ top: targetPosition, behavior: 'smooth' })
  }
  closeNavCollapse()
}

function handleClickOutside(event: MouseEvent): void {
  const navbar = document.querySelector('.navbar')
  if (navbar && !navbar.contains(event.target as Node)) {
    closeNavCollapse()
  }
}

onMounted(() => {
  // Scroll-spy: track each section's visibility ratio via IntersectionObserver,
  // then highlight the nav link for the most visible section.
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        sectionVisibility.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
      }
      activeSectionId.value = mostVisibleSectionId(activeSectionId.value)
    },
    { rootMargin: '-70px 0px -50% 0px', threshold: [0, 0.25, 0.5] }
  )

  for (const item of menuItems) {
    const el = document.getElementById(item.sectionId)
    if (el) observer.observe(el)
  }
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', closeNavCollapse, { passive: true })
})

onUnmounted(() => {
  observer?.disconnect()
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', closeNavCollapse)
})
</script>

<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark">
    <div class="container">
      <a class="navbar-brand fw-bold" href="#" @click.prevent="scrollToSection('hero')">
        {{ brandName }}
      </a>

      <button
        class="navbar-toggler d-lg-none"
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
              :class="{ active: activeSectionId === item.sectionId }"
              href="#"
              @click.prevent="scrollToSection(item.sectionId)"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>

        <a
          class="btn btn-success px-4 py-2 fw-semibold d-none d-lg-inline-block"
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
  background: rgba(12, 21, 40, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
  transition: border-color 0.3s ease;
}

.nav-link {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--color-text-on-dark-muted);
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: var(--color-text-on-dark);
}

.nav-link.active {
  color: var(--color-primary);
  font-weight: 600;
}

.navbar .btn-success {
  border-radius: 8px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.navbar .btn-success:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(var(--bs-success-rgb), 0.35);
}
</style>
