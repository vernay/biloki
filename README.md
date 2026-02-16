# 🏠 Biloki - Plateforme de gestion de locations saisonnières

Site web principal de Biloki construit avec **Next.js 16**, **React 19** et **Tailwind CSS 4**.

- 🌍 Multi-langues avec next-intl
- 📧 Intégration Resend pour les emails
- 🎯 Pages marketing + fonctionnalités produit
- 📱 Design responsive

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│              Next.js App Router                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Pages (/app)                                       │
│  ├─ Landing pages: /, /landing, /blog              │
│  ├─ Features: /fonctionnalites/*                   │
│  ├─ User: /connexion, /tarifs, /s-abonner          │
│  ├─ Legal: /cgv, /cookies, /mentions-legales       │
│  └─ API: /api/contact (POST)                       │
│                                                     │
│  Components (/components)                           │
│  ├─ /layout: Header, Footer (utilisés partout)     │
│  ├─ /sections: Hero, Features, Pricing, etc.       │
│  └─ /ui: Button, Logo, VideoPlayer (atomiques)     │
│                                                     │
│  Config (/lib)                                      │
│  └─ config.ts: constantes & variables d'env        │
│                                                     │
│  Assets (/public)                                   │
│  └─ images, logos, vidéos                          │
│                                                     │
└─────────────────────────────────────────────────────┘
          ↓ (Envoie emails vers)
      ┌────────────┐
      │   Resend   │ Service d'emails externes
      └────────────┘
```

---

## 📁 Structure détaillée

### `/app` - Pages et routes

#### **Pages landing** (`/`, `/landing`)
- Pages de présentation du produit
- Utilisent les composants de `/sections`
- Exemple: `Hero`, `Features`, `Pricing`, `Team`

#### **Blog** (`/blog`)
- **Route dynamique**: `/blog/[slug]/page.tsx`
- **Gestion centralisée**: `lib/blog/articles.ts`
- **5 articles multilingues** (fr/en/es/pt):
  - `automatiser-gestion-locations-saisonnieres`
  - `channel-manager-guide-complet-conciergeries`
  - `ia-location-courte-duree-conciergeries`
  - `messagerie-automatisee-conciergerie`
  - `nice-quotas-airbnb-reglementation-2025`

#### **Features** (`/fonctionnalites`)
- Détail de chaque fonctionnalité produit
- Structure: `/fonctionnalites/[feature]/page.tsx`
- Exemples: `channel-manager`, `pms`, `messagerie`, `ia-automatisation`, etc.

#### **Pages utilisateur**
- `/connexion` - Authentification
- `/tarifs` - Pricing
- `/s-abonner` - Inscription/Onboarding
- `/equipe` - Team
- `/reserver-demo` - Demander une démo

#### **Pages légales**
- `/cgv` - Conditions générales
- `/cookies` - Politique cookies
- `/mentions-legales` - Mentions légales

#### **API Routes** (`/api`)
```
/api/contact (POST)
├─ Récupère: prenom, nom, email, telephone, entreprise, message
├─ Valide les champs obligatoires
└─ Envoie via Resend vers CONTACT_EMAIL
```

### `/components` - Composants réutilisables

#### Layout
- **Header.tsx** - Navigation principale avec menu features déroulant
- **Footer.tsx** - Pied de page

#### Sections (pour pages marketing)
- `Hero.tsx`, `Hero 2.tsx`, `Hero 3.tsx` - Sections héros
- `FeaturesSection.tsx` - Liste des features
- `PricingCalculator.tsx` - Calculateur de prix
- `IntegrationsSection.tsx` - Partenaires/Intégrations
- `BenefitsSection.tsx` - Avantages
- `TeamSection.tsx` - Équipe
- `CTASection.tsx` - Call-to-action
- `PartnersScroll.tsx` - Scroll de partenaires

#### UI (Composants atomiques)
- `Button.tsx` - Boutons réutilisables
- `Logo.tsx` - Logo Biloki
- `VideoPlayer.tsx` - Lecteur vidéo
- `ChatBot.tsx` - Widget chat (stateful avec useState)

### `/lib` - Logique partagée

**config.ts** - Configuration centralisée
```typescript
export const CONTACT_EMAIL         // Email pour recevoir les messages
export const SUPPORT_PHONE         // Numéro de support
export const APP_STORE_URL         // Lien App Store
export const PLAY_STORE_URL        // Lien Play Store
export const RESEND_FROM_EMAIL     // Email d'envoi (Resend)
```

**blog/** - Gestion du blog
```typescript
types.ts         // Types TypeScript (Locale, BlogArticle, etc.)
articles.ts      // Base de données des articles (slug, date, contenu multilingue)
index.ts         // Fonctions: getArticlesForLocale(), getArticleBySlug()
```

### `/public` - Assets statiques
- **images/** - Dossiers par catégorie (equipe, footer, interfaces, etc.)
- **logos/** - Logos des partenaires
- **videos/** - Vidéos du site

---

## 🔄 Flux de données

### Exemple: Formulaire de contact

```
┌─────────────────────────────────────────────────────┐
│ 1. Utilisateur remplit le formulaire                │
│    (Composant non montré dans le code actuel)       │
└──────────────────┬──────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────┐
│ 2. Submit POST /api/contact/route.ts                │
│    Body: { prenom, nom, email, telephone, ...}      │
└──────────────────┬──────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────┐
│ 3. Validation des données                           │
│    ├─ Champs obligatoires: prenom, nom, email, msg │
│    └─ Si invalid → Erreur 400                       │
└──────────────────┬──────────────────────────────────┘
                   ↓ (valide)
┌─────────────────────────────────────────────────────┐
│ 4. Appel Resend API                                 │
│    ├─ From: RESEND_FROM_EMAIL (env var)             │
│    ├─ To: CONTACT_EMAIL (/lib/config.ts)            │
│    ├─ Reply-to: email de l'utilisateur              │
│    └─ Subject: "Nouveau message de contact de..."   │
└──────────────────┬──────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────┐
│ 5. Réponse au client                                │
│    ├─ Succès → { success: true }                    │
│    └─ Erreur → { error: message }                   │
└─────────────────────────────────────────────────────┘
```

### Pages statiques
- Aucune base de données
- Contenu défini directement dans les composants
- Configurations centralisées dans `lib/config.ts`
- Variables d'environnement pour les secrets

---

## 🛠️ Stack technique

| Couche | Tech | Version | Rôle |
|--------|------|---------|------|
| **Framework** | Next.js | 16.1.2 | Server-side rendering + API routes |
| **React** | React | 19.2.3 | Composants UI |
| **Styling** | Tailwind CSS | 4 | Utility-first CSS |
| **i18n** | next-intl | 4.7.0 | Internationalisation/Multi-langue |
| **Email** | Resend | 6.8.0 | Service d'emails transactionnels |
| **Langage** | TypeScript | 5 | Type safety |
| **Linting** | ESLint | 9 | Code quality |

### Configuration clé
- **Router**: App Router (nouvelle architecture Next.js)
- **Déploiement**: Prêt pour Vercel
- **Mode**: SSR/SSG (selon les pages)

---

## ⚙️ Logique métier (Scalable)

### Architecture centralisée: `/lib` = source unique de vérité

```
lib/
├─ config.ts (contact, URLs)
├─ pricing-config.ts ⭐ TOUS LES PRIX ET TARIFS
├─ features-config.ts ⭐ TOUTES LES FEATURES
├─ blog/ ⭐ GESTION DU BLOG
│  ├─ types.ts (types TypeScript)
│  ├─ articles.ts (base de données des articles)
│  └─ index.ts (fonctions utilitaires)
└─ (à ajouter: user-config.ts, modules-config.ts, etc.)
```

### Exemple: Modifier les tarifs

**Avant (mauvais)** : 5 fichiers à modifier
```
ChatBot.tsx → "16.99€"
PricingCalculator.tsx → calcul dupliqué
tarifs/page.tsx → calcul dupliqué
tarifs/data/pricing.ts → PRICING_TIERS
s-abonner/page.tsx → calcul dupliqué
```

**Après (bon)** : 1 seul fichier
```
lib/pricing-config.ts
├─ PRICING_TIERS = [...]  ✏️ Modifier ici
└─ Utilisé partout via imports
```

### Exemple: Ajouter une feature à la navigation

**Avant**: Modifier Header.tsx + créer page
**Après**:
```tsx
// 1. Ajouter dans lib/features-config.ts
export const FEATURES = [
  { id: 'ma-feature', label: 'Ma Feature', href: '/fonctionnalites/ma-feature' },
  // ...
];

// 2. Header.tsx utilise automatiquement cette liste
import { FEATURES } from '@/lib/features-config';
FEATURES.map(f => <a href={f.href}>{f.label}</a>)

// 3. Créer la page dans app/fonctionnalites/ma-feature/page.tsx
```

---

## 📝 Conventions du projet

### Nommage
- **Composants React**: PascalCase (`Header.tsx`, `HeroSection.tsx`)
- **Pages**: `page.tsx` (convention Next.js obligatoire)
- **Fichiers de config/utils**: camelCase (`config.ts`)
- **Dossiers**: kebab-case (`/api`, `/ui`, `/sections`)

### Structure des composants
```tsx
// Imports d'abord
import { useState } from 'react';
import Button from '@/components/ui/Button';

// Export default du composant
export default function MonComposant() {
  const [state, setState] = useState(false);
  
  return (
    <div>Contenu</div>
  );
}
```

### Styling
- **Tailwind CSS uniquement** - Pas de CSS modules ou styled-components
- Classes dans le JSX
- Styles globaux dans `app/globals.css`
- Couleurs/responsive: utiliser les classes Tailwind standards

---

## 📰 Ajouter un nouvel article de blog

Le blog utilise un **système de routage dynamique** centralisé. Pour ajouter un article :

### 1️⃣ Ajouter l'article dans `lib/blog/articles.ts`

```typescript
export const articles: BlogArticles = [
  // Vos articles existants...
  
  // ✨ Nouvel article
  {
    slug: "mon-nouvel-article",
    category: "Guide",
    date: "2026-02-16",
    readTime: "5 min",
    image: "/images/blog/mon-article.jpg",
    translations: {
      fr: {
        title: "Mon titre en français",
        excerpt: "Description courte en français...",
        content: `<p>Contenu HTML complet de l'article...</p>`
      },
      en: {
        title: "My English title",
        excerpt: "Short English description...",
        content: `<p>Full HTML article content...</p>`
      },
      es: { /* ... */ },
      pt: { /* ... */ }
    }
  }
];
```

### 2️⃣ Ajouter l'image

Placez votre image dans `/public/images/blog/mon-article.jpg`

### 3️⃣ C'est tout ! 🎉

- ✅ L'article apparaît automatiquement sur `/[locale]/blog`
- ✅ Accessible via `/[locale]/blog/mon-nouvel-article`
- ✅ Ajouté automatiquement au sitemap.xml
- ✅ Disponible dans les 4 langues (fr/en/es/pt)

---

## ✏️ Modifier une feature existante

### 1️⃣ **Structure : Où aller chercher quoi**

```
Pour modifier une page de feature (ex: /fonctionnalites/pms)
├─ Page elle-même: /app/fonctionnalites/pms/page.tsx
├─ Composants utilisés: /components/sections/Xxx.tsx
├─ Configurations: /lib/config.ts
└─ Styles globaux: /app/globals.css
```

### 2️⃣ **Patterns de données : Comment passer les infos**

#### Pattern 1: Props (composants réutilisables)
```tsx
// ❌ Mauvais: données en dur dans le composant
export default function Hero() {
  return <h1>Titre fixe</h1>;
}

// ✅ Bon: données via props
interface HeroProps {
  title: string;
  subtitle: string;
}

export default function Hero({ title, subtitle }: HeroProps) {
  return (
    <>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </>
  );
}

// Utilisation dans une page:
import Hero from '@/components/sections/Hero';

export default function PmsPage() {
  return (
    <Hero 
      title="Gestion PMS"
      subtitle="Simplifiez votre gestion de locations"
    />
  );
}
```

#### Pattern 2: État local (useState) pour l'interactivité
```tsx
'use client'; // Nécessaire pour les composants interactifs

import { useState } from 'react';

export default function PricingCalculator() {
  const [nbLogements, setNbLogements] = useState(1);
  
  return (
    <div>
      <input 
        type="number"
        value={nbLogements}
        onChange={(e) => setNbLogements(Number(e.target.value))}
      />
      <p>Prix: {nbLogements * 29}€/mois</p>
    </div>
  );
}
```

#### Pattern 3: Constantes centralisées (lib/config.ts)
```tsx
// Pour les données partagées partout
// lib/config.ts
export const PRICING_PLANS = [
  { name: 'Starter', price: 29, features: ['PMS', 'Messagerie'] },
  { name: 'Pro', price: 79, features: ['PMS', 'Messagerie', 'Channel Manager'] },
];

// Utilisation:
import { PRICING_PLANS } from '@/lib/config';

export default function PricingSection() {
  return (
    <div>
      {PRICING_PLANS.map(plan => (
        <div key={plan.name}>
          <h3>{plan.name}</h3>
          <p>{plan.price}€</p>
        </div>
      ))}
    </div>
  );
}
```

#### Pattern 4: API routes pour la logique serveur
```tsx
// Exemple: Envoyer un formulaire

// app/api/contact/route.ts (déjà existant)
export async function POST(request: NextRequest) {
  const body = await request.json();
  // Validation, appel Resend, etc...
  return NextResponse.json({ success: true });
}

// Utilisation dans un composant:
'use client';

export default function ContactForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        prenom: 'Jean',
        nom: 'Dupont',
        email: 'jean@example.com',
        message: 'Demande info',
      }),
    });
    
    const data = await response.json();
    if (data.success) {
      alert('Email envoyé!');
    }
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}
```

### 3️⃣ **Dépendances entre composants : Comment savoir ce qui casse**

```
Header.tsx
├─ Apparaît sur: TOUTES les pages
├─ Importe: Logo.tsx
└─ ⚠️ Si vous le modifiez → tout le site est affecté

Hero.tsx
├─ Utilisé dans: app/page.tsx
├─ Importe: Button.tsx
└─ Si vous le modifiez → seul app/page.tsx change

Button.tsx
├─ Utilisé dans: Hero.tsx, Footer.tsx, intégrations...
└─ ⚠️ Si vous le modifiez → impacts sur plusieurs pages
```

**Pour éviter les surprises:**
- Recherchez les imports avant de modifier: `grep -r "import.*Button" components/`
- Testez sur la page cible ET les pages qui utilisent le composant

### 4️⃣ **Déployer une feature : Checklist**

**Avant de dire "c'est fini":**
- [ ] Modifier/créer la page dans `/app/fonctionnalites/xxx/page.tsx`
- [ ] Créer les composants sections dans `/components/sections/`
- [ ] Ajouter les lien dans `Header.tsx` (menu features)
- [ ] Ajouter les constantes dans `lib/config.ts` si besoin
- [ ] Tester en local: `npm run dev` → vérifier visuel + interactions
- [ ] Vérifier lint: `npm run lint` → pas d'erreurs TypeScript
- [ ] Tester les pages parentes si vous avez modifié Header/Footer
- [ ] Faire un build test: `npm run build` → vérifier pas d'erreurs

**Pour pusher en prod:**
```bash
git add .
git commit -m "feat: ajouter page feature PMS v2"
git push
# → Vercel déploie automatiquement
```

---

## ➕ Ajouter une nouvelle feature

### Exemple: Ajouter une nouvelle page de feature

**Étape 1: Créer la structure**
```
app/fonctionnalites/ma-nouvelle-feature/
└─ page.tsx
```

**Étape 2: Créer le composant section**
```
components/sections/MaNouvelleFeatureSection.tsx
```

**Étape 3: Implémenter la page**
```tsx
// app/fonctionnalites/ma-nouvelle-feature/page.tsx
import MaNouvelleFeatureSection from '@/components/sections/MaNouvelleFeatureSection';

export default function MaFeaturePage() {
  return <MaNouvelleFeatureSection />;
}
```

**Étape 4: Ajouter à la navigation**
- Ouvrir `components/layout/Header.tsx`
- Ajouter le lien dans le menu déroulant des features

### Exemple: Ajouter une nouvelle section à une page existante

1. Créer le composant dans `/components/sections/MaSectionXxx.tsx`
2. L'importer dans la page cible (`app/page.tsx`, `/app/fonctionnalites/xxx/page.tsx`)
3. L'ajouter dans le JSX de la page

---

## 🔐 Variables d'environnement

Créer un fichier `.env.local` à la racine:

```env
# Resend API Key (Obligatoire pour envoyer des emails)
RESEND_API_KEY=your_resend_api_key_here

# Email d'envoi (qui envoie les emails)
RESEND_FROM_EMAIL=onboarding@resend.dev

# Configuration publique (accessible au frontend)
NEXT_PUBLIC_CONTACT_EMAIL=contact@biloki.fr
NEXT_PUBLIC_SUPPORT_PHONE=0964180069
NEXT_PUBLIC_APP_STORE_URL=https://apps.apple.com/app/biloki/VOTRE_APP_ID
NEXT_PUBLIC_PLAY_STORE_URL=https://play.google.com/store/apps/details?id=com.biloki.app
```

⚠️ **Ne pas commiter `.env.local`** - Ajouter à `.gitignore`

---

## 🚀 Développement

### Installation
```bash
npm install
```

### Démarrer le serveur de développement
```bash
npm run dev
```
Accès: [http://localhost:3000](http://localhost:3000)
Auto-refresh à la sauvegarde des fichiers

### Build pour production
```bash
npm run build
```

### Lancer en production
```bash
npm start
```

### Vérifier les erreurs ESLint
```bash
npm run lint
```

---

## 📚 Ressources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [next-intl](https://next-intl-docs.vercel.app/)
- [Resend Documentation](https://resend.com/docs)

---

## 📧 Support

Pour des questions sur l'architecture, contactez l'équipe Biloki: contact@biloki.fr
