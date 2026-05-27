import { onMounted, onUnmounted } from 'vue'

const REVEAL_THRESHOLD = 0.15

export function useScrollReveal(): void {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const elements = document.querySelectorAll('[data-reveal]')

    if (elements.length === 0) {
      return
    }

    for (const element of elements) {
      element.classList.add('reveal-on-scroll')
    }

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

  onUnmounted(() => {
    observer?.disconnect()
  })
}
