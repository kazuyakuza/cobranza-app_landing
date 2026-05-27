import { onMounted, onUnmounted } from 'vue'

export function useScrollReveal(): void {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const elements = document.querySelectorAll('[data-reveal]')

    if (elements.length === 0) {
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-on-scroll')
            entry.target.classList.add('is-visible')
            observer?.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.15 }
    )

    for (const element of elements) {
      observer.observe(element)
    }
  })

  onUnmounted(() => {
    observer?.disconnect()
  })
}
