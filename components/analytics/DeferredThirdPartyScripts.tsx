'use client';

import { useEffect } from 'react';

/**
 * Charge les scripts tiers lourds (Google Tag Manager, widget de chat HubSpot)
 * seulement après la première interaction utilisateur (scroll, clic, touch,
 * déplacement de souris) ou après un court délai de secours. Ces scripts ne
 * sont pas nécessaires au premier rendu et représentaient plusieurs secondes
 * de blocage du thread principal (Total Blocking Time) sur mobile.
 */
export default function DeferredThirdPartyScripts() {
  useEffect(() => {
    let loaded = false;

    const loadScripts = () => {
      if (loaded) return;
      loaded = true;
      events.forEach((event) => window.removeEventListener(event, loadScripts));
      clearTimeout(fallbackTimer);

      // Google Tag Manager
      (function (w: any, d: Document, s: string, l: string, i: string) {
        w[l] = w[l] || [];
        w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
        const f = d.getElementsByTagName(s)[0];
        const j = d.createElement(s) as HTMLScriptElement;
        const dl = l !== 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode?.insertBefore(j, f);
      })(window, document, 'script', 'dataLayer', 'GTM-K8Z2WL7B');

      // Chatbot HubSpot
      const hsScript = document.createElement('script');
      hsScript.src = '//js-eu1.hs-scripts.com/145156681.js';
      hsScript.async = true;
      hsScript.defer = true;
      document.body.appendChild(hsScript);
    };

    const events: Array<keyof WindowEventMap> = ['scroll', 'mousemove', 'touchstart', 'keydown', 'click'];
    events.forEach((event) => window.addEventListener(event, loadScripts, { once: true, passive: true }));

    // Filet de sécurité : charge quand même après 5s si aucune interaction
    // n'a eu lieu, pour ne pas perdre le tracking des sessions passives.
    const fallbackTimer = setTimeout(loadScripts, 5000);

    return () => {
      events.forEach((event) => window.removeEventListener(event, loadScripts));
      clearTimeout(fallbackTimer);
    };
  }, []);

  return null;
}
