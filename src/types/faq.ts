export type FaqVariant = 'general' | 'company' | 'user' | 'conciliation'

export interface FaqItem {
  question: string
  answer: string
  note?: string
}

export interface FaqGroup {
  title: string
  accordionId: string
  variant: FaqVariant
  faqs: FaqItem[]
}
