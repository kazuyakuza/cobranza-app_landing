import { onMounted, onUnmounted } from 'vue'

// Minimum viewport intersection ratio before element reveals
const REVEAL_THRESHOLD = 0.15

// Adds scroll-reveal animations to all [data-reveal] elements via IntersectionObserver.
// Each element reveals once and is then unobserved.
export function useScrollReveal(): void {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const elements = document.querySelectorAll('[data-reveal]')

    if (elements.length === 0) {
      return
    }

    // Attach initial hidden state to all reveal elements
    for (const element of elements) {
      element.classList.add('reveal-on-scroll')
    }

    // Observe elements and add .is-visible when they enter viewport
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer?.unobserve(entry.target)
          }
        }
      },
      { threshold: REVEAL_THRESHOLD }
    )

    for (const element of elements) {
      observer.observe(element)
    }
  })

  // Cleanup observer on component teardown
  onUnmounted(() => {
    observer?.disconnect()
  })
}
