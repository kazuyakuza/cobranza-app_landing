<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { NAVBAR_HEIGHT_PX } from '@/utils/constants'

const isHeroVisible = ref(false)
const isContactVisible = ref(false)

function isFloatingCtaVisible(): boolean {
  if (isHeroVisible.value) {
    return false
  }
  if (isContactVisible.value) {
    return false
  }
  return true
}

const isVisible = computed(isFloatingCtaVisible)

let observer: IntersectionObserver | null = null

function updateVisibility(entries: IntersectionObserverEntry[]): void {
  for (const entry of entries) {
    if (entry.target.id === 'hero') {
      isHeroVisible.value = entry.isIntersecting
    } else if (entry.target.id === 'contact') {
      isContactVisible.value = entry.isIntersecting
    }
  }
}

function scrollToContact(): void {
  const element = document.getElementById('contact')
  if (element) {
    const targetPosition = element.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT_PX
    window.scrollTo({ top: targetPosition, behavior: 'smooth' })
  }
}

onMounted(() => {
  observer = new IntersectionObserver(updateVisibility, { rootMargin: '0px', threshold: 0 })
  const hero = document.getElementById('hero')
  const contact = document.getElementById('contact')
  if (hero) observer.observe(hero)
  if (contact) observer.observe(contact)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <Transition name="float">
    <button
      v-show="isVisible"
      class="btn btn-success shadow floating-cta d-lg-none fw-semibold"
      @click="scrollToContact"
    >
      Solicitar acceso anticipado gratuito
    </button>
  </Transition>
</template>

<style scoped>
.floating-cta {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 1040;
  border-radius: 50rem;
  padding: 0.75rem 1.5rem;
}

.float-enter-active,
.float-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.float-enter-from,
.float-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>