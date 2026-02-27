/**
 * Event tracking utility for Google Analytics 4 via Google Tag Manager
 * Pushes events to the dataLayer for GTM to capture
 */

// Extend window type for dataLayer
declare global {
  interface Window {
    dataLayer?: Array<Record<string, any>>;
  }
}

interface Event {
  event: string;
  [key: string]: string | number | boolean | undefined;
}

/**
 * Push an event to GTM dataLayer
 * @param eventData - Event object with event name and custom properties
 */
export const trackEvent = (eventData: Event) => {
  // Check if window and dataLayer exist (client-side only)
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(eventData);
    console.log('[GTM Event]', eventData);
  }
};

/**
 * Track calculator usage (Calculateur ROI)
 * @param dwellings - Number of dwellings selected
 * @param billingCycle - 'monthly' or 'annual'
 * @param isParticulier - Is individual user
 */
export const trackCalculatorUse = (
  dwellings: number,
  billingCycle: 'monthly' | 'annual',
  isParticulier: boolean
) => {
  trackEvent({
    event: 'calculator_use',
    calculator_type: 'roi_calculator',
    calculator_dwellings: dwellings,
    calculator_billing: billingCycle,
    calculator_client_type: isParticulier ? 'individual' : 'professional',
  });
};

/**
 * Track demo booking click
 * @param location - Where the click happened (e.g., 'header', 'blog', 'homepage', 'calculator')
 */
export const trackDemoClick = (location?: string) => {
  trackEvent({
    event: 'demo_click',
    demo_source: location || 'unknown',
  });
};

/**
 * Track contact form submission
 * @param formType - Type of contact (e.g., 'support', 'demo_request', 'general_inquiry')
 * @param source - Page where form was submitted
 */
export const trackContactFormSubmit = (
  formType?: string,
  source?: string
) => {
  trackEvent({
    event: 'contact_form_submit',
    contact_type: formType || 'general',
    contact_source: source || 'contact_page',
  });
};

/**
 * Track blog article engagement
 * @param articleSlug - Blog article slug/title
 * @param scrollDepth - Scroll depth percentage (optional)
 */
export const trackArticleEngagement = (
  articleSlug: string,
  scrollDepth?: number
) => {
  trackEvent({
    event: 'article_engagement',
    article_slug: articleSlug,
    scroll_depth: scrollDepth,
  });
};
