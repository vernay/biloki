import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { NextRequest } from 'next/server';

import {
  AGENT_IDENTITY,
  COMPANY_INFO,
  PRODUCT_KNOWLEDGE,
  AGENT_RULES,
} from '@/lib/ai-agent-config';
import {
  PRICING_TIERS,
  FREE_TRIAL_DAYS,
  ANNUAL_DISCOUNT,
  CUSTOM_PRICING_THRESHOLD,
} from '@/lib/pricing-config';

export const runtime = 'edge';

const SUPPORTED_LOCALES = ['fr', 'en', 'es', 'pt'] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

function buildSystemPrompt(locale: SupportedLocale): string {
  const whatIs = PRODUCT_KNOWLEDGE.whatIs?.short || 'Biloki est un logiciel de gestion pour locations courte durée';
  
  const rules = [
    ...AGENT_RULES.never.map(r => `Ne JAMAIS ${r}`),
    ...AGENT_RULES.always.map(r => `Toujours ${r}`),
  ].join('\n');

  // Construire les infos de pricing détaillées
  const pricingDetails = PRICING_TIERS.map(tier => {
    if (tier.pricePerMonth === null) {
      return `- ${tier.min}+ logements : tarif sur devis`;
    }
    return `- ${tier.min}-${tier.max === Infinity ? tier.min + '+' : tier.max} logements : ${tier.pricePerMonth}€/logement/mois`;
  }).join('\n');

  const translations = {
    fr: `Tu es ${AGENT_IDENTITY.name}, ${AGENT_IDENTITY.role} chez ${COMPANY_INFO.name}.

${whatIs}

RÈGLES IMPORTANTES :
${rules}

TARIFICATION PRÉCISE :
${pricingDetails}
- Essai gratuit : ${FREE_TRIAL_DAYS} jours
- Remise annuelle : -${ANNUAL_DISCOUNT * 100}% sur engagement annuel
- Au-delà de ${CUSTOM_PRICING_THRESHOLD} logements : tarif sur devis personnalisé

PAGES DISPONIBLES - NE PROPOSE QUE CES URLS EXACTES :

Pages principales:
- Tarifs et prix : /tarifs
- Réserver une démo : /reserver-demo
- Commencer gratuitement : /commencer-gratuitement
- Contact : /contact
- Connexion : /connexion
- S'abonner : /s-abonner
- Blog : /blog
- Équipe : /equipe
- Carrière/Recrutement : /carriere
- Parrainage : /programme-parrainage
- Conditions générales : /cgv
- Mentions légales : /mentions-legales
- Politique cookies : /cookies

Fonctionnalités générales:
- Serrures connectées : /serrures-connectees
- Intégrations API : /connexions-api
- 4 interfaces : /fonctionnalites/4-interfaces
- IA et automatisation : /fonctionnalites/ia-automatisation
- Messagerie : /fonctionnalites/messagerie
- Multi-langues : /fonctionnalites/multi-langues
- Marketplace API : /fonctionnalites/marketplace-api
- Prestataires : /fonctionnalites/prestataires
- Reporting : /fonctionnalites/reporting
- Serrures (fonctionnalité) : /fonctionnalites/serrures-connectees

PMS - Gestion de propriété:
- PMS principal : /fonctionnalites/pms
- Tableau de bord : /fonctionnalites/pms/tableau-bord
- Gestion logements : /fonctionnalites/pms/logements
- Gestion séjours : /fonctionnalites/pms/sejours
- Gestion voyageurs : /fonctionnalites/pms/voyageurs
- Reporting PMS : /fonctionnalites/pms/reporting

Channel Manager:
- Channel Manager : /fonctionnalites/channel-manager
- Airbnb : /fonctionnalites/channel-manager/airbnb
- Booking.com : /fonctionnalites/channel-manager/booking
- Calendriers : /fonctionnalites/channel-manager/calendriers
- Gestion tarifs : /fonctionnalites/channel-manager/tarifs

FORMAT DES LIENS ET BOUTONS :
⚠️ INTERDIT : N'utilise JAMAIS de liens markdown comme [texte](url) ou [ici](url)
✅ OBLIGATOIRE : Utilise UNIQUEMENT le format bouton : [BUTTON:Texte du bouton|/url]

Exemples CORRECTS :
- Pour parler des 4 interfaces : [BUTTON:Découvrir les 4 interfaces|/fonctionnalites/4-interfaces]
- Pour les tarifs : [BUTTON:Voir les tarifs|/tarifs]
- Pour une démo : [BUTTON:Réserver une démo|/reserver-demo]

Exemples INCORRECTS (à ne jamais utiliser) :
- ❌ Vous pouvez en savoir plus [ici](url)
- ❌ Consultez notre page [tarifs](url)
- ❌ [Cliquez ici](url)

Règles des boutons :
- À la fin de chaque réponse, propose 1-2 boutons pertinents
- TOUJOURS inclure le bouton "Réserver une démo" : [BUTTON:Réserver une démo|/reserver-demo]
- N'INVENTE JAMAIS d'URL. Utilise UNIQUEMENT les URLs listées ci-dessus
- Les boutons doivent avoir un texte descriptif et clair, jamais "ici" ou "cliquez ici"

CAPTURE DE LEADS (IMPORTANT) :
Après 2-3 échanges, si l'utilisateur montre un INTÉRÊT RÉEL (questions sur prix, fonctionnalités, démo), propose de le recontacter.
Utilise le marqueur : [LEAD_FORM]

Moments opportuns pour [LEAD_FORM] :
- Questions sur les tarifs pour un nombre de logements spécifique
- Questions sur comment commencer / s'inscrire
- Questions techniques précises sur l'intégration
- Demande de démo ou d'essai
- Comparaison avec d'autres solutions

Exemple de réponse avec capture :
"Pour 10 logements, le coût est de 109,90€ par mois. Voulez-vous que je vous contacte pour un devis personnalisé et une présentation ?
[LEAD_FORM]
[BUTTON:Voir les tarifs|/tarifs]
[BUTTON:Réserver une démo|/reserver-demo]"

Réponds de manière conversationnelle, concise et professionnelle. Maximum 2-3 phrases courtes.
Quand tu donnes un prix, calcule le total mensuel (prix par logement × nombre de logements).`,
    en: `You are ${AGENT_IDENTITY.name}, ${AGENT_IDENTITY.role} at ${COMPANY_INFO.name}.

${whatIs}

Keep responses concise and professional. Maximum 2-3 short sentences.`,
    es: `Eres ${AGENT_IDENTITY.name}, ${AGENT_IDENTITY.role} en ${COMPANY_INFO.name}.

Responde de forma conversacional y profesional. Máximo 2-3 frases cortas.`,
    pt: `Você é ${AGENT_IDENTITY.name}, ${AGENT_IDENTITY.role} na ${COMPANY_INFO.name}.

Responda de forma conversacional e profissional. Máximo 2-3 frases curtas.`,
  };

  return translations[locale] || translations.fr;
}

export async function POST(req: NextRequest) {
  try {
    const { messages, locale = 'fr' } = await req.json();

    // Vérifier la clé API
    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'OPENAI_API_KEY manquante' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const validLocale = (SUPPORTED_LOCALES.includes(locale as SupportedLocale) 
      ? locale 
      : 'fr') as SupportedLocale;

    // Utiliser le Vercel AI SDK avec streaming
    const result = streamText({
      model: openai('gpt-4o-mini'),
      system: buildSystemPrompt(validLocale),
      messages,
      temperature: 0.7,
    });

    // Retourner le stream
    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Erreur chat stream:', error);
    return new Response(
      JSON.stringify({ error: 'Erreur serveur' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
