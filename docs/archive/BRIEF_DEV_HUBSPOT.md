# Brief Développeur : Intégration HubSpot Complète

**Date :** 16 février 2026  
**Projet :** Biloki - Site Web  
**Mission :** Connecter tous les points de contact du site à HubSpot et automatiser les emails

---

## 🎯 Objectif de la mission

Mettre en place une intégration complète entre le site Biloki et HubSpot pour :
1. **Capturer tous les leads** depuis les différents formulaires
2. **Envoyer les données à HubSpot** via API
3. **Automatiser les emails** de relance et de nurturing
4. **Tracker les conversions** et optimiser le tunnel

---

## 📊 État actuel

### ✅ Déjà en place

1. **API HubSpot configurée**
   - Route : `/app/api/hubspot/chatbot/route.ts`
   - Token : Configuré dans `.env.local`
   - Fonctionnel pour : Chatbot uniquement

2. **Package Resend installé**
   - Pour formulaire de contact
   - Route : `/app/api/contact/route.ts`

3. **Chatbot Biloki**
   - Fichier : `/components/ChatBot.tsx`
   - Envoie déjà à HubSpot
   - Propriétés envoyées : email, langue, role, propertyCount, needType

### ❌ À créer

1. Intégration HubSpot pour **3 formulaires** supplémentaires
2. Routes API manquantes
3. Workflows HubSpot
4. Automatisations email
5. Tracking des conversions

---

## 📋 Points de contact à intégrer

**Total : 7 points de conversion à tracker**

### 1. Chatbot Biloki ✅ (Déjà fait)

**Fichier :** `/components/ChatBot.tsx`  
**Route API :** `/api/hubspot/chatbot` ✅  
**Status :** Fonctionnel

**Données envoyées :**
```typescript
{
  email: string,
  language: 'fr' | 'en' | 'es' | 'pt',
  role: 'Gestionnaire' | 'Propriétaire' | 'Autre',
  propertyCount: number,
  needType: string,
  source: 'chatbot'
}
```

---

### 2. Formulaire "Réserver une démo" ⚠️ (À finaliser)

**Fichier :** `/app/[locale]/reserver-demo/page.tsx`  
**Route API :** `/api/hubspot/demo` ⚠️ (Partielle)  
**Status :** Code présent mais incomplet

**Ce qui existe :**
```typescript
// Ligne 50-66 dans reserver-demo/page.tsx
await fetch('/api/hubspot/demo', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: formData.email,
    language: formData.language,
    role: formData.role,
    propertyCount,
    source: 'reserver_demo',
  }),
});
```

**À FAIRE :**
1. ✅ Créer la route `/app/api/hubspot/demo/route.ts`
2. ✅ Dupliquer la logique de `/api/hubspot/chatbot/route.ts`
3. ✅ Mapper les propriétés HubSpot :
   - `email` → email
   - `language` → langue
   - `role` → role
   - `propertyCount` → biloki_property_count
   - `source_biloki` → 'formulaire_demo'
   - `type_de_besoin` → 'demo'

**Code à créer :**
```typescript
// /app/api/hubspot/demo/route.ts
import { NextRequest, NextResponse } from 'next/server';

const HUBSPOT_BASE_URL = 'https://api.hubapi.com';

type DemoPayload = {
  email: string;
  language?: string;
  role?: string;
  propertyCount?: number;
  source?: string;
};

async function hubspotFetch(path: string, options: RequestInit) {
  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
  if (!token) throw new Error('HUBSPOT_PRIVATE_APP_TOKEN manquante');

  return await fetch(`${HUBSPOT_BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
}

async function findContactIdByEmail(email: string): Promise<string | null> {
  const response = await hubspotFetch('/crm/v3/objects/contacts/search', {
    method: 'POST',
    body: JSON.stringify({
      filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: email }] }],
      properties: ['email'],
      limit: 1,
    }),
  });

  if (!response.ok) return null;
  const data = await response.json();
  return data?.results?.[0]?.id ?? null;
}

function buildProperties(payload: DemoPayload) {
  const properties: Record<string, string | number> = {};
  const languageMap: Record<string, string> = { fr: 'Fr', en: 'En', es: 'Es', pt: 'Pt' };

  if (payload.email) properties.email = payload.email;
  if (payload.language) properties.langue = languageMap[payload.language] ?? payload.language;
  if (payload.role) properties.role = payload.role;
  if (typeof payload.propertyCount === 'number') properties.biloki_property_count = payload.propertyCount;
  
  properties.source_inbound = 'Site internet';
  properties.source_biloki = 'formulaire_demo';
  properties.type_de_besoin = 'demo';

  return properties;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as DemoPayload;
    if (!body?.email) return NextResponse.json({ error: 'Email manquant' }, { status: 400 });

    const properties = buildProperties(body);
    const existingId = await findContactIdByEmail(body.email);

    if (existingId) {
      const updateResponse = await hubspotFetch(`/crm/v3/objects/contacts/${existingId}`, {
        method: 'PATCH',
        body: JSON.stringify({ properties }),
      });

      if (!updateResponse.ok) {
        const details = await updateResponse.text();
        console.error('[HubSpot] Update failed:', details);
        return NextResponse.json({ error: 'Erreur HubSpot' }, { status: updateResponse.status });
      }

      return NextResponse.json({ success: true, updated: true });
    }

    const createResponse = await hubspotFetch('/crm/v3/objects/contacts', {
      method: 'POST',
      body: JSON.stringify({ properties }),
    });

    if (!createResponse.ok) {
      const details = await createResponse.text();
      console.error('[HubSpot] Create failed:', details);
      return NextResponse.json({ error: 'Erreur HubSpot' }, { status: createResponse.status });
    }

    return NextResponse.json({ success: true, created: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur', details: String(error) }, { status: 500 });
  }
}
```

---

### 3. Formulaire "Essai gratuit" ❌ (À créer)

**Fichier :** `/app/[locale]/commencer-gratuitement/page.tsx`  
**Route API :** `/api/hubspot/trial` ❌ (N'existe pas)  
**Status :** Formulaire existe mais n'envoie rien

**Code actuel (ligne 32-48) :**
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  // Simulate form submission ⚠️ FAUX - À REMPLACER
  setTimeout(() => {
    setLoading(false);
    setSubmitted(true);
    // ...
  }, 1000);
};
```

**À FAIRE :**

1. **Modifier le formulaire** pour envoyer à HubSpot :

```typescript
// Dans /app/[locale]/commencer-gratuitement/page.tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    // Parser propertyCount
    const propertyCount = parsePropertyCount(formData.logements);

    // Envoyer à HubSpot
    await fetch('/api/hubspot/trial', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstname: formData.prenom,
        lastname: formData.nom,
        email: formData.email,
        phone: formData.telephone,
        role: formData.role,
        propertyCount,
        message: formData.message,
        source: 'formulaire_essai',
      }),
    });

    setSubmitted(true);
    setFormData({ prenom: '', nom: '', email: '', telephone: '', role: '', logements: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  } catch (error) {
    console.error('Erreur HubSpot:', error);
    alert('Erreur lors de l\'envoi');
  } finally {
    setLoading(false);
  }
};

// Ajouter cette fonction helper
const parsePropertyCount = (value: string): number | undefined => {
  if (!value) return undefined;
  if (value.includes('-')) {
    const parts = value.split('-');
    const upper = Number.parseInt(parts[1], 10);
    return Number.isNaN(upper) ? undefined : upper;
  }
  if (value.endsWith('+')) {
    const base = Number.parseInt(value.replace('+', ''), 10);
    return Number.isNaN(base) ? undefined : base;
  }
  const num = Number.parseInt(value, 10);
  return Number.isNaN(num) ? undefined : num;
};
```

2. **Créer la route API** `/app/api/hubspot/trial/route.ts` :

```typescript
// /app/api/hubspot/trial/route.ts
import { NextRequest, NextResponse } from 'next/server';

const HUBSPOT_BASE_URL = 'https://api.hubapi.com';

type TrialPayload = {
  firstname?: string;
  lastname?: string;
  email: string;
  phone?: string;
  role?: string;
  propertyCount?: number;
  message?: string;
  source?: string;
};

async function hubspotFetch(path: string, options: RequestInit) {
  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
  if (!token) throw new Error('HUBSPOT_PRIVATE_APP_TOKEN manquante');

  return await fetch(`${HUBSPOT_BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
}

async function findContactIdByEmail(email: string): Promise<string | null> {
  const response = await hubspotFetch('/crm/v3/objects/contacts/search', {
    method: 'POST',
    body: JSON.stringify({
      filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: email }] }],
      properties: ['email'],
      limit: 1,
    }),
  });

  if (!response.ok) return null;
  const data = await response.json();
  return data?.results?.[0]?.id ?? null;
}

function buildProperties(payload: TrialPayload) {
  const properties: Record<string, string | number> = {};

  if (payload.email) properties.email = payload.email;
  if (payload.firstname) properties.firstname = payload.firstname;
  if (payload.lastname) properties.lastname = payload.lastname;
  if (payload.phone) properties.phone = payload.phone;
  if (payload.role) properties.role = payload.role;
  if (typeof payload.propertyCount === 'number') properties.biloki_property_count = payload.propertyCount;
  if (payload.message) properties.message = payload.message;
  
  properties.source_inbound = 'Site internet';
  properties.source_biloki = 'formulaire_essai';
  properties.type_de_besoin = 'essai_gratuit';
  properties.lifecyclestage = 'lead'; // Important pour HubSpot

  return properties;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as TrialPayload;
    if (!body?.email) return NextResponse.json({ error: 'Email manquant' }, { status: 400 });

    const properties = buildProperties(body);
    const existingId = await findContactIdByEmail(body.email);

    if (existingId) {
      const updateResponse = await hubspotFetch(`/crm/v3/objects/contacts/${existingId}`, {
        method: 'PATCH',
        body: JSON.stringify({ properties }),
      });

      if (!updateResponse.ok) {
        const details = await updateResponse.text();
        console.error('[HubSpot] Update failed:', details);
        return NextResponse.json({ error: 'Erreur HubSpot' }, { status: updateResponse.status });
      }

      return NextResponse.json({ success: true, updated: true });
    }

    const createResponse = await hubspotFetch('/crm/v3/objects/contacts', {
      method: 'POST',
      body: JSON.stringify({ properties }),
    });

    if (!createResponse.ok) {
      const details = await createResponse.text();
      console.error('[HubSpot] Create failed:', details);
      return NextResponse.json({ error: 'Erreur HubSpot' }, { status: createResponse.status });
    }

    return NextResponse.json({ success: true, created: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur', details: String(error) }, { status: 500 });
  }
}
```

---

### 4. Formulaire "Contact" ⚠️ (À améliorer)

**Fichier :** `/app/[locale]/contact/page.tsx`  
**Route API actuelle :** `/api/contact/route.ts` (utilise Resend)  
**Status :** Fonctionne mais devrait AUSSI envoyer à HubSpot

**À FAIRE :**

Modifier `/app/api/contact/route.ts` pour **double envoi** :
1. Email via Resend (existant) ✅
2. Lead vers HubSpot (à ajouter) ❌

**Code à ajouter :**

```typescript
// Dans /app/api/contact/route.ts
// Après l'envoi Resend réussi (ligne ~50), ajouter :

// Envoyer aussi à HubSpot
try {
  await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/hubspot/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firstname: prenom,
      lastname: nom,
      email,
      phone: telephone,
      company: entreprise,
      message,
      source: 'formulaire_contact',
    }),
  });
} catch (hubspotError) {
  console.error('Erreur HubSpot (non bloquant):', hubspotError);
  // On continue même si HubSpot échoue
}
```

**Créer la route** `/app/api/hubspot/contact/route.ts` :

```typescript
// /app/api/hubspot/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';

const HUBSPOT_BASE_URL = 'https://api.hubapi.com';

type ContactPayload = {
  firstname?: string;
  lastname?: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  source?: string;
};

async function hubspotFetch(path: string, options: RequestInit) {
  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
  if (!token) throw new Error('HUBSPOT_PRIVATE_APP_TOKEN manquante');

  return await fetch(`${HUBSPOT_BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
}

async function findContactIdByEmail(email: string): Promise<string | null> {
  const response = await hubspotFetch('/crm/v3/objects/contacts/search', {
    method: 'POST',
    body: JSON.stringify({
      filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: email }] }],
      properties: ['email'],
      limit: 1,
    }),
  });

  if (!response.ok) return null;
  const data = await response.json();
  return data?.results?.[0]?.id ?? null;
}

function buildProperties(payload: ContactPayload) {
  const properties: Record<string, string | number> = {};

  if (payload.email) properties.email = payload.email;
  if (payload.firstname) properties.firstname = payload.firstname;
  if (payload.lastname) properties.lastname = payload.lastname;
  if (payload.phone) properties.phone = payload.phone;
  if (payload.company) properties.company = payload.company;
  if (payload.message) properties.message = payload.message;
  
  properties.source_inbound = 'Site internet';
  properties.source_biloki = 'formulaire_contact';
  properties.type_de_besoin = 'contact_general';

  return properties;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ContactPayload;
    if (!body?.email) return NextResponse.json({ error: 'Email manquant' }, { status: 400 });

    const properties = buildProperties(body);
    const existingId = await findContactIdByEmail(body.email);

    if (existingId) {
      const updateResponse = await hubspotFetch(`/crm/v3/objects/contacts/${existingId}`, {
        method: 'PATCH',
        body: JSON.stringify({ properties }),
      });

      if (!updateResponse.ok) {
        const details = await updateResponse.text();
        console.error('[HubSpot] Update failed:', details);
        return NextResponse.json({ error: 'Erreur HubSpot' }, { status: updateResponse.status });
      }

      return NextResponse.json({ success: true, updated: true });
    }

    const createResponse = await hubspotFetch('/crm/v3/objects/contacts', {
      method: 'POST',
      body: JSON.stringify({ properties }),
    });

    if (!createResponse.ok) {
      const details = await createResponse.text();
      console.error('[HubSpot] Create failed:', details);
      return NextResponse.json({ error: 'Erreur HubSpot' }, { status: createResponse.status });
    }

    return NextResponse.json({ success: true, created: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur', details: String(error) }, { status: 500 });
  }
}
```

---

### 5. Demande API / Connexion Partenaire ✅ (Déjà fait)

**Fichier :** `/app/[locale]/connexions-api/page.tsx`  
**Formulaire HubSpot :** Intégré directement via script  
**Status :** Fonctionnel ✅

**Formulaire HubSpot embarqué :**
```javascript
window.hbspt.forms.create({
  region: 'eu1',
  portalId: '48192046',
  formId: '2e53ea17-c6f7-4e33-ad78-2dc48c3c7cdd',
  target: '#hubspot-form-api'
});
```

**À FAIRE :** ❌ Rien ! 
- Le formulaire est déjà géré par HubSpot
- Les données vont directement dans HubSpot
- Créer le workflow d'automatisation email dans HubSpot

---

### 6. Newsletter Blog ❌ (À créer)

**Fichier :** `/app/[locale]/blog/page.tsx` (ligne 97-120)  
**Route API :** `/api/hubspot/newsletter` ❌ (N'existe pas)  
**Status :** UI existe mais pas de fonctionnalité

**Code actuel :**
```tsx
// Ligne 103-113 dans blog/page.tsx
<input
  type="email"
  placeholder="your@email.com"
  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
/>
<button className="px-8 py-3 bg-primary text-white font-semibold rounded-lg">
  {t("subscribeNewsletter")}
</button>
```

**À FAIRE :**

1. **Modifier le composant Newsletter** pour capturer l'email :

```tsx
// Dans /app/[locale]/blog/page.tsx
// Remplacer la section Newsletter (ligne 97-120) par :

const [newsletterEmail, setNewsletterEmail] = useState('');
const [newsletterLoading, setNewsletterLoading] = useState(false);
const [newsletterSuccess, setNewsletterSuccess] = useState(false);

const handleNewsletterSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!newsletterEmail) return;
  
  setNewsletterLoading(true);
  
  try {
    await fetch('/api/hubspot/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: newsletterEmail,
        source: 'newsletter_blog',
      }),
    });
    
    setNewsletterSuccess(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSuccess(false), 3000);
  } catch (error) {
    console.error('Erreur newsletter:', error);
  } finally {
    setNewsletterLoading(false);
  }
};

// Dans le JSX :
<div className="mt-16 bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
  <h2 className="text-3xl font-bold text-gray-900 mb-4">
    {t("newsletter")}
  </h2>
  
  {newsletterSuccess && (
    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
      <p className="text-green-800 font-semibold">✅ Inscription réussie !</p>
    </div>
  )}
  
  <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
    {t("description")}
  </p>
  
  <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
    <input
      type="email"
      value={newsletterEmail}
      onChange={(e) => setNewsletterEmail(e.target.value)}
      placeholder="your@email.com"
      required
      className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
    />
    <button 
      type="submit"
      disabled={newsletterLoading}
      className="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50"
    >
      {newsletterLoading ? '...' : t("subscribeNewsletter")}
    </button>
  </form>
</div>
```

2. **Créer la route API** `/app/api/hubspot/newsletter/route.ts` :

```typescript
// /app/api/hubspot/newsletter/route.ts
import { NextRequest, NextResponse } from 'next/server';

const HUBSPOT_BASE_URL = 'https://api.hubapi.com';

type NewsletterPayload = {
  email: string;
  source?: string;
};

async function hubspotFetch(path: string, options: RequestInit) {
  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
  if (!token) throw new Error('HUBSPOT_PRIVATE_APP_TOKEN manquante');

  return await fetch(`${HUBSPOT_BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
}

async function findContactIdByEmail(email: string): Promise<string | null> {
  const response = await hubspotFetch('/crm/v3/objects/contacts/search', {
    method: 'POST',
    body: JSON.stringify({
      filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: email }] }],
      properties: ['email'],
      limit: 1,
    }),
  });

  if (!response.ok) return null;
  const data = await response.json();
  return data?.results?.[0]?.id ?? null;
}

function buildProperties(payload: NewsletterPayload) {
  const properties: Record<string, string | number> = {};

  if (payload.email) properties.email = payload.email;
  
  properties.source_inbound = 'Site internet';
  properties.source_biloki = 'newsletter_blog';
  properties.type_de_besoin = 'newsletter';
  
  // Marquer comme abonné newsletter
  properties.newsletter_subscription = 'true';
  properties.newsletter_subscription_date = new Date().toISOString();

  return properties;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as NewsletterPayload;
    if (!body?.email) return NextResponse.json({ error: 'Email manquant' }, { status: 400 });

    const properties = buildProperties(body);
    const existingId = await findContactIdByEmail(body.email);

    if (existingId) {
      const updateResponse = await hubspotFetch(`/crm/v3/objects/contacts/${existingId}`, {
        method: 'PATCH',
        body: JSON.stringify({ properties }),
      });

      if (!updateResponse.ok) {
        const details = await updateResponse.text();
        console.error('[HubSpot] Update failed:', details);
        return NextResponse.json({ error: 'Erreur HubSpot' }, { status: updateResponse.status });
      }

      return NextResponse.json({ success: true, updated: true });
    }

    const createResponse = await hubspotFetch('/crm/v3/objects/contacts', {
      method: 'POST',
      body: JSON.stringify({ properties }),
    });

    if (!createResponse.ok) {
      const details = await createResponse.text();
      console.error('[HubSpot] Create failed:', details);
      return NextResponse.json({ error: 'Erreur HubSpot' }, { status: createResponse.status });
    }

    return NextResponse.json({ success: true, created: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur', details: String(error) }, { status: 500 });
  }
}
```

3. **Ajouter les propriétés HubSpot** :

Dans HubSpot, créer ces 2 nouvelles propriétés :

```
newsletter_subscription
  Type: Checkbox (Oui/Non)
  Label: Abonné Newsletter

newsletter_subscription_date
  Type: Date
  Label: Date d'inscription Newsletter
```

---

### 7. Clics sur boutons "Commencer" / "S'abonner" ❌ (Tracking à ajouter)

**Fichiers concernés :**
- `/components/sections/Hero.tsx`
- `/components/layout/Header.tsx`
- `/components/ui/WebappLink.tsx`

**Boutons qui redirigent vers l'app :**
- "Commencer gratuitement" → `https://beta.biloki.fr/register`
- "Se connecter" → `https://beta.biloki.fr/login`

**À FAIRE :**

Ajouter un tracking HubSpot lors du clic **avant** la redirection :

```typescript
// Dans /components/ui/WebappLink.tsx
'use client';

import { WEBAPP_LOGIN_URL, WEBAPP_REGISTER_URL } from '@/lib/config';

interface WebappLinkProps {
  type: 'login' | 'register';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function WebappLink({ type, className, children, onClick }: WebappLinkProps) {
  const url = type === 'login' ? WEBAPP_LOGIN_URL : WEBAPP_REGISTER_URL;

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    // Tracker le clic dans HubSpot
    try {
      await fetch('/api/hubspot/track-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          buttonType: type,
          timestamp: new Date().toISOString(),
          page: window.location.pathname,
        }),
      });
    } catch (error) {
      console.error('Tracking error:', error);
    }

    // Callback si fourni
    if (onClick) onClick();

    // Redirection
    window.location.href = url;
  };

  return (
    <a href={url} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
```

**Créer** `/app/api/hubspot/track-click/route.ts` :

```typescript
// /app/api/hubspot/track-click/route.ts
import { NextRequest, NextResponse } from 'next/server';

type ClickPayload = {
  buttonType: 'login' | 'register';
  timestamp: string;
  page: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ClickPayload;
    
    // TODO: Implémenter le tracking via HubSpot Analytics API
    // ou via Custom Behavioral Events
    // https://developers.hubspot.com/docs/api/events/custom-behavioral-events

    console.log('[Track] Click:', body);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
```

---

## 🔧 Configuration HubSpot (côté CRM)

### Propriétés personnalisées à créer

Dans **HubSpot > Paramètres > Propriétés > Contacts**, créer :

| Nom interne | Label | Type | Options |
|-------------|-------|------|---------|
| `langue` | Langue | Dropdown | Fr, En, Es, Pt |
| `role` | Rôle | Dropdown | Gestionnaire, Propriétaire, Autre |
| `type_de_besoin` | Type de besoin | Text | - |
| `biloki_property_count` | Nombre de logements | Number | - |
| `source_inbound` | Source Inbound | Text | Défaut: "Site internet" |
| `source_biloki` | Source Biloki | Dropdown | chatbot, formulaire_demo, formulaire_essai, formulaire_contact |
| `message` | Message | Multi-line text | - |

### Workflows à créer

Voir le fichier `HUBSPOT_CONFIGURATION.md` pour les workflows détaillés.

**Résumé des workflows nécessaires :**

1. **Workflow "Notification équipe Sales"**
   - Trigger : `source_biloki` = n'importe quelle valeur
   - Action : Notifier l'équipe + créer une tâche

2. **Workflow "Email automatique Chatbot"**
   - Trigger : `source_biloki` = 'chatbot'
   - Action : Envoyer email personnalisé selon `role`

3. **Workflow "Email automatique Demo"**
   - Trigger : `source_biloki` = 'formulaire_demo'
   - Action : Email de confirmation + lien Calendly

4. **Workflow "Email automatique Essai"**
   - Trigger : `source_biloki` = 'formulaire_essai'
   - Action : Email avec instructions essai + lien webapp

5. **Workflow "Lead Scoring"**
   - Trigger : `biloki_property_count` connu
   - Action : Scorer selon le nombre de logements

6. **Workflow "Relance J+3"**
   - Trigger : Contact créé + pas d'activité
   - Délai : 3 jours
   - Action : Email de relance

---

## 📧 Templates d'email à créer dans HubSpot

### 1. Email Chatbot (Gestionnaire)

**Sujet :** Simplifiez la gestion de vos {{contact.biloki_property_count}} logements

**Corps :**
```html
Bonjour {{contact.firstname}},

Merci pour votre intérêt via notre chatbot ! 👋

J'ai vu que vous gérez {{contact.biloki_property_count}} logements. 
C'est une belle activité, et je comprends que la gestion quotidienne 
peut être chronophage.

Biloki est conçu pour les conciergeries comme la vôtre :

✅ Channel Manager (120+ OTAs)
✅ Automatisation complète
✅ Interface prestataires
✅ Reporting propriétaires

Seriez-vous disponible pour une démo de 15 minutes ?

📅 [Lien Calendly]

Cordialement,
L'équipe Biloki
```

### 2. Email Demo Confirmée

**Sujet :** Votre démo Biloki est réservée ✅

**Corps :**
```html
Bonjour {{contact.firstname}},

Votre demande de démo a bien été enregistrée !

Un membre de notre équipe vous contactera très prochainement 
pour fixer un créneau.

En attendant, découvrez :
🎥 [Vidéo de présentation]
📄 [Guide des fonctionnalités]

À très bientôt !
L'équipe Biloki
```

### 3. Email Essai Activé

**Sujet :** Bienvenue chez Biloki ! Votre essai gratuit est prêt 🚀

**Corps :**
```html
Bonjour {{contact.firstname}},

Félicitations, votre compte Biloki est prêt !

🎉 1 mois d'essai gratuit activé
📧 Identifiants envoyés par email
🔗 Accéder à votre compte : https://beta.biloki.fr

Premiers pas recommandés :
1️⃣ Ajouter votre premier logement
2️⃣ Connecter Airbnb ou Booking
3️⃣ Configurer les automatisations

Besoin d'aide ? Notre équipe est là pour vous 💪

Support : contact@biloki.fr

L'équipe Biloki
```Newsletter Bienvenue

**Sujet :** Bienvenue dans la communauté Biloki ! 📬

**Corps :**
```html
Bonjour {{contact.firstname}},

Merci de vous être abonné(e) à notre newsletter ! 🎉

Vous recevrez désormais :
📰 Nos derniers articles de blog
💡 Des conseils pour optimiser votre gestion
🚀 Les nouveautés produit en avant-première

Premier article recommandé :
👉 [Comment automatiser 70% de votre gestion locative]

À très bientôt !
L'équipe Biloki

PS: Vous pouvez vous désabonner à tout moment.
```

### 5. Email Demande API

**Sujet :** Votre demande de connexion API - Biloki

**Corps :**
```html
Bonjour {{contact.firstname}},

Nous avons bien reçu votre demande de connexion API ! 🔌

Notre équipe technique va analyser votre besoin et vous recontactera 
sous 24-48h pour discuter de :
- La faisabilité technique
- Le scope de l'intégration
- Les délais de mise en œuvre

Documentation disponible :
📚 [Documentation API Biloki]

À très vite !
L'équipe Technique Biloki
```

### 6. Email 

### 4. Email Relance J+3

**Sujet :** {{contact.firstname}}, des questions sur Biloki ?

**Corps :**Newsletter
1. Aller sur `/blog`
2. Scroller jusqu'à la newsletter
3. Entrer un email
4. Soumettre
5. Vérifier HubSpot (propriété `newsletter_subscription` = true)
6. Vérifier l'email de bienvenue

### Test 6 : Demande API
1. Aller sur `/connexions-api`
2. Remplir le formulaire HubSpot embarqué
3. Soumettre
4. Vérifier HubSpot
5. Vérifier l'email de confirmation

### Test 7 : 
```html
Bonjour {{contact.firstname}},

Je remarque que vous vous êtes intéressé(e) à Biloki il y a quelques jours.

Avez-vous des questions ? Je serais ravi de vous aider à :
- Mieux comprendre comment Biloki fonctionne
- Voir si notre solution correspond à vos besoins
- Organiser une démonstration personnalisée

N'hésitez pas à me répondre directement !

Cordialement,
[Signature commerciale]
```

---

## 🧪 Tests à effectuer

### Test 1 : Chatbot
1. Ouvrir le site
2. Cliquer sur le chatbot
3. Engager une conversation
4. Donner son email
5. Vérifier dans HubSpot que le contact est créé avec toutes les propriétés

### Test 2 : Formulaire Démo
1. Aller sur `/reserver-demo`
2. Remplir le formulaire
3. Soumettre
4. Vérifier HubSpot
5. Vérifier que le workflow "Email Demo" s'est déclenché

### Test 3 : Formulaire Essai
1. Aller sur `/commencer-gratuitement`
2. Remplir le formulaire
3. Soumettre
4. Vérifier HubSpot
5. Vérifier l'email automatique reçu

### Test 4 : Formulaire Contact
1. Aller sur `/contact`
2. Remplir le formulaire
3. Soumettre
4. Vérifier HubSpot (contact créé)
5. Vérifier Resend (email interne envoyé)

### Test 5 : Tracking clics
1. Cliquer sur "Commencer gratuitement"
2. Vérifier les logs de tracking
3. Vérifier la redirection vers l'app

---

## 📝 Checklist de mise en œuvre

### Phase 1 : Routes API (3-4h)
- [ ] Créer `/app/api/hubspot/demo/route.ts`
- [ ] Créer `/app/api/hubspot/trial/route.ts`
- [ ] Créer `/app/api/hubspot/contact/route.ts`
- [ ] Créer `/app/api/hubspot/newsletter/route.ts`
- [ ] Créer `/app/api/hubspot/track-click/route.ts`
- [ ] Tester chaque route avec cURL ou Postman

### Phase 2 : Modification des formulaires (2-3h)
- [ ] Modifier `/app/[locale]/commencer-gratuitement/page.tsx`
- [ ] Modifier `/app/[locale]/blog/page.tsx` (newsletter)
- [ ] Modifier `/app/api/contact/route.ts` (double envoi)
- [ ] Modifier `/components/ui/WebappLink.tsx` (tracking)
- [ ] Ajouter la fonction `parsePropertyCount` où nécessaire

### Phase 3 : Configuration HubSpot (2-3h)
- [ ] Créer les 9 propriétés personnalisées (+ newsletter_subscription + newsletter_subscription_date)
- [ ] Créer les 7 workflows (+ workflow newsletter)
- [ ] Créer les 5 templates d'email (+ email newsletter)
- [ ] Créer le workflow pour demande API (déjà dans HubSpot, vérifier)
- [ ] Activer tous les workflows

### Phase 4 : Tests (1-2h)
- [ ] Test chatbot → HubSpot
- [ ] Test formulaire démo → HubSpot + email
- [ ] Test formulaire essai → HubSpot + email
- [ ] Test formulaire contact → HubSpot + Resend
- [ ] Test newsletter → HubSpot + email
- [ ] Test demande API (formulaire HubSpot existant)
- [ ] Test tracking clics
- [ ] Vérifier les workflows déclenchés

### Phase 5 : Monitoring et optimisation (ongoing)
- [ ] Dashboard HubSpot créé
- [ ] Rapports de conversion configurés
- [ ] A/B testing des emails programmé
- [ ] Segmentation newsletter configurée

**Total estimé :** 8-12 heures de développement

---

## 🚨 Points d'attention

1. **Ne pas casser l'existant**
   - Le chatbot fonctionne déjà, ne pas le modifier
   - Le formulaire contact envoie déjà via Resend, garder cette fonctionnalité

2. **Gestion des erreurs**
   - Si HubSpot échoue, ne pas bloquer l'utilisateur
   - Logger les erreurs pour debugging
   - Afficher un message de succès à l'utilisateur même si HubSpot rate

3. **Variables d'environnement**
   - `HUBSPOT_PRIVATE_APP_TOKEN` : Déjà configuré ✅
   - Vérifier que le token a les bonnes permissions

4. **RGPD / Consentement**
   - Tous les formulaires incluent implicitement le consentement en soumettant
   - Mentions légales présentes sur le site

---

## 📚 Documentation de référence

- **HubSpot Contacts API :** https://developers.hubspot.com/docs/api/crm/contacts
- **HubSpot Workflows :** https://knowledge.hubspot.com/workflows
- **Configuration complète :** Voir `HUBSPOT_CONFIGURATION.md`

---

## 💬 Support

**Questions ?** Contactez l'équipe technique Biloki

**Token HubSpot :** Déjà dans `.env.local` (ne pas partager !)

**Accès HubSpot :** Demander les accès à l'administrateur

---

**Dernière mise à jour :** 16 février 2026  
**Prochaine revue :** Après phase de tests
