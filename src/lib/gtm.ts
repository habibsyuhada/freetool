export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || ''
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ''

// Helper function for GA4 events
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'page_view',
      page: url,
    })
  }
}

// Helper function for custom events
export const event = ({ action, category, label, value }: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'custom_event',
      event_action: action,
      event_category: category,
      event_label: label,
      value: value
    })
  }
}
