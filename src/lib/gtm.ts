export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || ''
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ''

// Extend Window interface globally
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

// Helper function for GA4 events
export const pageview = (url: string): void => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'page_view',
      page: url,
    })
  }
}

interface EventProps {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

// Helper function for custom events
export const event = ({ action, category, label, value }: EventProps): void => {
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
