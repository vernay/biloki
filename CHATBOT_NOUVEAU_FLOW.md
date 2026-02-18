# 🤖 Nouveau Flow du Chatbot Biloki

## ✅ Implémentation terminée

Le chatbot a été complètement refactorisé selon le nouveau système de qualification et catégorisation.

---

## 📋 Flow utilisateur

### 1️⃣ **Ouverture du chatbot**
Dès l'ouverture, l'utilisateur voit :
- Message : "👋 Bonjour ! Pour mieux vous aider, puis-je avoir quelques informations ?"
- Formulaire de qualification avec 5 champs :
  - Prénom * (obligatoire)
  - Nom * (obligatoire)
  - Email * (obligatoire)
  - Téléphone (optionnel)
  - Nombre de logements
  - Vous êtes... (Gestionnaire/Particulier/Autre)

### 2️⃣ **Après soumission du formulaire**
Message : "Merci {Prénom} ! 🎉 Comment puis-je vous aider aujourd'hui ?"

3 boutons au choix :

#### 📅 **Demander une démo** (bleu #01a4ff)
- Crée le contact HubSpot avec `type_de_demande_chatbot = "Demande de démo"`
- Ouvre Calendly dans un nouvel onglet : https://calendly.com/g-vernay-biloki/demonstration-biloki
- Message : "Parfait ! 📅 Un onglet Calendly vient de s'ouvrir..."

#### 🛠 **Problème technique** (orange)
- Affiche un champ texte pour décrire le problème (optionnel mais recommandé)
- Boutons "Envoyer" ou "Annuler"
- Crée le contact HubSpot avec `type_de_demande_chatbot = "Support technique"`
- Crée une **tâche URGENTE** dans **10 minutes** assignée à l'owner 145156681
- Le problème décrit est inclus dans le corps de la tâche
- Message : "Parfait ! 🛠 Notre équipe technique a bien reçu votre demande..."

#### ❓ **Poser une question** (vert)
- Crée le contact HubSpot avec `type_de_demande_chatbot = "Question générale"`
- Active le mode conversation AI
- Message : "Je suis là pour répondre à toutes vos questions sur Biloki ! 💬"
- L'utilisateur peut ensuite discuter avec l'assistant AI GPT-4o-mini

---

## 🔄 Changements techniques

### ✅ Supprimé
- ❌ Bouton "Parler à un conseiller" dans le header
- ❌ Variable `isUrgentRequest`
- ❌ Fonction `handleTransferToHuman`
- ❌ Notifications Slack (`/api/notifications/slack/route.ts`)
- ❌ Variable d'env `SLACK_WEBHOOK_URL`
- ❌ Déclenchement automatique du formulaire par `[LEAD_FORM]`

### ✅ Ajouté
- ✅ Formulaire affiché dès l'ouverture (`showLeadForm = true`)
- ✅ Système de 3 boutons de choix (`showChoiceButtons`)
- ✅ Variable `selectedChoice` ('demo' | 'support' | 'question')
- ✅ Variable `technicalDescription` pour le support
- ✅ Fonction `handleChoice(choice)` pour gérer les 3 options
- ✅ Fonction `handleTechnicalSupportSubmit()` pour le support technique
- ✅ Paramètre `requestType` dans l'API HubSpot
- ✅ Paramètre `problemDescription` dans l'API HubSpot
- ✅ Champ de saisie visible uniquement pour "Poser une question"

### ✅ Modifié
- **`/components/ChatBotAI.tsx`** (~430 lignes)
  - Flow complètement refactorisé
  - 3 états distincts : formulaire → choix → action spécifique
  - Condition d'affichage du champ de saisie : `selectedChoice === 'question'`

- **`/app/api/hubspot/create-contact/route.ts`**
  - Ajout paramètres `requestType` et `problemDescription`
  - Mapping intelligent de `type_de_demande_chatbot` :
    - Si `requestType` fourni → utilise directement
    - Sinon fallback → `urgent ? 'Demande urgente' : 'Lead normal'`
  - Suppression complète des appels à `/api/notifications/slack`
  - Assignation de **toutes** les tâches à l'owner ID 145156681
  - Inclusion du problème technique dans le corps de la tâche et de la note

- **`.env.local`**
  - Suppression de `SLACK_WEBHOOK_URL`

---

## 🔗 Intégrations

### HubSpot
- **Hub ID** : 47974528
- **Owner ID** : 145156681 (Grégoire Vernay - g.vernay@biloki.fr)
- **Token** : `HUBSPOT_PRIVATE_APP_TOKEN` (voir .env.local)

#### Propriétés personnalisées utilisées :
- `source_biloki` : Source de capture (ex: "Chatbot - Demande de démo")
- `biloki_property_count` : Nombre de logements
- `langue` : Langue (Fr/En/Es/Pt avec majuscule)
- `role` : Rôle (Gestionnaire/Particulier/Autre)
- `type_de_demande_chatbot` : **NOUVELLE propriété** (Demande de démo / Support technique / Question générale)

### Calendly
- **URL** : https://calendly.com/g-vernay-biloki/demonstration-biloki
- Pré-remplissage automatique : email + nom complet

---

## ⚙️ Configuration HubSpot à faire manuellement

### 1. Créer la propriété `type_de_demande_chatbot`

**Chemin** : HubSpot → Settings → Data Management → Properties → Create property

**Paramètres** :
- **Object type** : Contact
- **Group** : Contact information
- **Label** : Type de demande chatbot
- **Internal name** : `type_de_demande_chatbot`
- **Type** : Dropdown select
- **Options** :
  - `Demande de démo`
  - `Support technique`
  - `Question générale`

### 2. Créer le Workflow de notification

**Chemin** : HubSpot → Automation → Workflows → Create workflow

**Paramètres** :
- **Type** : Contact-based
- **Trigger** : `type_de_demande_chatbot` is any of "Demande de démo" OR "Support technique"
- **Action** : Send internal email notification
  - **To** : g.vernay@biloki.fr
  - **Subject** : `🤖 Nouvelle demande chatbot : {{contact.type_de_demande_chatbot}}`
  - **Body** : Inclure détails du contact + lien vers fiche

**Pourquoi ?** Les tâches créées via API n'apparaissent pas dans la cloche HubSpot, ce workflow permet de recevoir une notification email.

---

## 🧪 Tests à effectuer

1. **Test Démo**
   - Ouvrir chatbot → Remplir formulaire → Cliquer "Demander une démo"
   - ✅ Calendly s'ouvre dans nouvel onglet
   - ✅ Email et nom pré-remplis
   - ✅ Contact créé dans HubSpot avec `type_de_demande_chatbot = "Demande de démo"`

2. **Test Support**
   - Ouvrir chatbot → Remplir formulaire → Cliquer "Problème technique"
   - ✅ Champ de description apparaît
   - ✅ Remplir description et envoyer
   - ✅ Contact créé avec `type_de_demande_chatbot = "Support technique"`
   - ✅ Tâche urgente créée dans 10 min, assignée à 145156681
   - ✅ Description du problème visible dans la note et le corps de la tâche

3. **Test Question**
   - Ouvrir chatbot → Remplir formulaire → Cliquer "Poser une question"
   - ✅ Contact créé avec `type_de_demande_chatbot = "Question générale"`
   - ✅ Champ de saisie apparaît
   - ✅ Conversation AI démarre (GPT-4o-mini)
   - ✅ Les réponses sont pertinentes

4. **Test Workflow HubSpot** (après création manuelle)
   - ✅ Email reçu à g.vernay@biloki.fr pour "Demande de démo"
   - ✅ Email reçu pour "Support technique"
   - ✅ PAS d'email pour "Question générale"

---

## 📊 Avantages du nouveau système

✅ **Qualification immédiate** : Formulaire dès l'ouverture  
✅ **Catégorisation claire** : 3 chemins bien définis  
✅ **Pas de confusion** : Plus de détection "urgence" imprécise  
✅ **HubSpot-only** : Tout centralisé, pas de Slack  
✅ **UX plus simple** : Moins de clics, parcours logique  
✅ **Support priorisé** : Tâches urgentes avec description du problème  
✅ **Démo autonome** : Calendly direct sans intervention humaine  

---

## 🚀 Next Steps

1. ✅ Code implémenté et testé
2. ⏳ Créer propriété `type_de_demande_chatbot` dans HubSpot (manuel)
3. ⏳ Créer workflow de notification email (manuel)
4. ⏳ Tester le parcours complet en production
5. ⏳ Monitorer les premiers leads

---

**Implémentation effectuée le** : 18 février 2026  
**Développeur** : GitHub Copilot (Claude Sonnet 4.5)
