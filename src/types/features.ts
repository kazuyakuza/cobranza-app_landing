export type FeatureVariant = 'company' | 'user'

export interface FeatureItem {
  icon: string
  text: string
  elaboration: string
}

export interface FeatureGroup {
  title: string
  intro?: string
  accordionId: string
  variant: FeatureVariant
  features: FeatureItem[]
}
