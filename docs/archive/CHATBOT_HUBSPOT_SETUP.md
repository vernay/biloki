# 🤖 Configuration Chatbot → HubSpot

## ✅ Ce qui a été implémenté

### 1. Capture naturelle de leads
- Le chatbot détecte automatiquement les moments opportuns (questions sur prix, fonctionnalités, démo)
- Après 2-3 échanges, il propose un formulaire de contact
- Les visiteurs peuvent cliquer "Plus tard" s'ils ne veulent pas donner leurs infos

### 2. Formulaire inline élégant
- Prénom, Nom, Email (obligatoires)
- Téléphone, Nombre de logements (optionnels)
- Design responsive mobile/desktop

### 3. Intégration HubSpot complète
✅ **Création automatique du contact** avec toutes les infos  
✅ **Note avec transcript complet** de la conversation  
✅ **Tâche automatique** créée pour le suivi (J+1 à 10h)  
✅ **Propriétés personnalisées** : `nombre_logements`, `source_lead`  
✅ **Gestion des doublons** : mise à jour si le contact existe déjà  

### 4. Notifications
- Tâche HubSpot assignée automatiquement
- Notification mobile HubSpot
- Email de notification (configurable dans HubSpot)

---

## 🔧 Configuration requise

### 1. Obtenir la clé API HubSpot

**Étapes :**
1. Connecte-toi à ton compte HubSpot
2. Va dans **Paramètres** (icône ⚙️ en haut à droite)
3. **Intégrations** → **Clés API privées**
4. Clique sur **Créer une clé API**
5. Copie la clé générée

### 2. Ajouter la clé dans `.env.local`

Créer/modifier le fichier `.env.local` à la racine du projet :

```bash
# OpenAI (déjà configuré)
OPENAI_API_KEY=sk-...

# HubSpot (NOUVEAU)
HUBSPOT_API_KEY=pat-eu1-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

### 3. Propriétés personnalisées HubSpot (optionnel mais recommandé)

Pour afficher correctement les infos dans HubSpot, crée ces propriétés personnalisées :

**Propriété 1 : Nombre de logements**
- Nom interne : `nombre_logements`
- Type : Nombre
- Groupe : Informations du contact

**Propriété 2 : Source du lead**
- Nom interne : `source_lead`
- Type : Texte court
- Groupe : Informations du contact

---

## 🎯 Comment ça fonctionne

### Flow utilisateur

```
1. Visiteur ouvre le chatbot
   ↓
2. Il pose 2-3 questions sur prix/fonctionnalités
   ↓
3. L'IA détecte l'intérêt et propose :
   "Voulez-vous que je vous contacte pour un devis personnalisé ?"
   [Formulaire s'affiche]
   ↓
4. Le visiteur remplit le formulaire
   ↓
5. Clic sur "Envoyer"
   ↓
6. Contact créé dans HubSpot avec :
   - Toutes les infos du formulaire
   - Note avec transcript complet
   - Tâche de suivi pour demain
```

### Exemple de note HubSpot

```
📝 Transcript conversation chatbot:

Visiteur: Combien ça coûte pour 10 logements ?
Assistant: Pour 10 logements, le coût est de 10,99€ par logement par mois, soit 109,90€/mois au total...

Visiteur: Vous intégrez Airbnb ?
Assistant: Oui ! Biloki s'intègre avec Airbnb, Booking.com et plus de 50 plateformes...

---
Capturé automatiquement via le chatbot du site
```

### Exemple de tâche HubSpot

```
Titre: 🤖 Suivre lead chatbot: Jean
Description: Nouveau lead capturé via chatbot. Recontacter Jean pour qualifier le besoin.
Priorité: HAUTE
Date: Demain à 10h00
```

---

## 📊 Monitoring et optimisation

### Voir les leads capturés

1. **HubSpot → Contacts**
2. Filtre : `source_lead` = "Chatbot site web"
3. Tu verras tous les leads du chatbot avec leurs conversations

### Analytics suggérés

- **Taux de conversion** : Visiteurs chatbot → Leads capturés
- **Nombre de logements moyen** des leads chatbot
- **Questions les plus fréquentes** (dans les notes)
- **Taux de qualification** des leads chatbot

### Améliorations futures possibles

- [ ] Lead scoring automatique selon nb de logements
- [ ] Assignation automatique à un commercial selon la région
- [ ] Email automatique de bienvenue aux leads
- [ ] Création de deal automatique dans le pipeline
- [ ] Intégration Slack pour notifications temps réel

---

## 🧪 Tester l'intégration

### Test manuel

1. Ouvre le chatbot sur le site
2. Pose 2-3 questions :
   - "Combien ça coûte pour 10 logements ?"
   - "Vous intégrez Airbnb ?"
3. Le formulaire devrait apparaître
4. Remplis avec des infos de test :
   - Prénom : Test
   - Nom : Chatbot
   - Email : test-chatbot@biloki.com
   - Nb logements : 10
5. Clique sur "Envoyer"
6. Vérifie dans HubSpot que :
   ✅ Le contact "Test Chatbot" est créé
   ✅ Une note avec la conversation est présente
   ✅ Une tâche est créée pour demain

### Test avec curl (backend uniquement)

```bash
curl -X POST http://localhost:3000/api/hubspot/create-contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "API",
    "email": "test-api@biloki.com",
    "phone": "+33612345678",
    "propertyCount": "15",
    "conversation": "Test conversation\nVisiteur: Bonjour\nAssistant: Bonjour !",
    "source": "Test API"
  }'
```

---

## ⚠️ Important

### Sécurité
- ✅ Clé API HubSpot dans `.env.local` (jamais commité)
- ✅ API protégée côté serveur (Edge runtime)
- ✅ Validation des données côté client et serveur

### Limites API HubSpot
- **Gratuit** : 250 000 appels/jour
- Le chatbot fait 1-2 appels par lead (création + note)
- Très largement suffisant pour un site web

### RGPD / Conformité
- ⚠️ Ajouter un texte de consentement dans le formulaire si besoin
- Les données sont stockées dans HubSpot (conforme RGPD si configuré)
- Pense à ajouter une checkbox "J'accepte..." si légalement requis

---

## 🚀 Pour aller plus loin

### Améliorer la détection des moments opportuns

Modifier le système prompt dans `/app/api/agent/chat-stream/route.ts` :

```typescript
Moments opportuns pour [LEAD_FORM] :
- Questions sur les tarifs pour un nombre de logements spécifique
- Comparaison avec Lodgify, Smoobu, ou autres concurrents
- Questions sur l'onboarding / mise en place
- Mention d'un projet concret ou timeline
```

### Personnaliser le message de confirmation

Dans `/components/ChatBotAI.tsx`, ligne ~155 :

```typescript
content: `Merci ${leadFormData.firstName} ! 🎉 Nos experts vont analyser votre besoin pour ${leadFormData.propertyCount} logements et vous contacter sous 24h.`,
```

### Ajouter des champs personnalisés

1. Ajouter dans l'interface `LeadFormData`
2. Ajouter dans le formulaire HTML
3. Envoyer à HubSpot dans `handleLeadSubmit`

---

## 📞 Support

Si tu as des questions sur cette intégration :
- Vérifie les logs du serveur pour les erreurs HubSpot
- Teste avec curl pour isoler backend/frontend
- Vérifie que la clé API HubSpot a les bonnes permissions

Fichiers clés :
- `/app/api/hubspot/create-contact/route.ts` - API HubSpot
- `/components/ChatBotAI.tsx` - Chatbot avec formulaire
- `/app/api/agent/chat-stream/route.ts` - Détection des moments
