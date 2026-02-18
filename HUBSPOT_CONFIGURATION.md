# Configuration HubSpot pour le Chatbot Biloki

Ce guide explique comment configurer HubSpot pour recevoir et traiter les leads capturés par le chatbot Biloki.

## 📋 Vue d'ensemble

Le chatbot Biloki envoie automatiquement les informations des visiteurs vers HubSpot via l'API. Cette intégration permet de :
- Centraliser tous les leads dans votre CRM
- Automatiser le suivi commercial
- Segmenter les contacts par profil (Gestionnaire / Propriétaire)
- Prioriser les leads selon le nombre de logements

### ⚠️ Important : Envoi d'emails

**Le chatbot Biloki ne gère PAS l'envoi d'emails directement.** Voici comment ça fonctionne :

```
Visiteur → Chatbot Biloki → API HubSpot → Contact créé → Workflows HubSpot → Emails envoyés
```

- **Site web (Resend)** : Uniquement pour le formulaire de contact classique
- **Chatbot → HubSpot** : Les emails sont envoyés par les **Workflows HubSpot**, pas par le site
- **Avantage** : Tracking complet, A/B testing, séquences automatiques dans HubSpot

---

## 🔧 Étape 1 : Créer les propriétés personnalisées

### 1.1 Accéder aux propriétés de contact

1. Connectez-vous à HubSpot
2. Accédez à **Paramètres** (icône engrenage en haut à droite)
3. Dans le menu de gauche : **Propriétés** > **Propriétés de contact**
4. Cliquez sur **Créer une propriété**

### 1.2 Créer les propriétés suivantes

#### Propriété : `langue`

```
Nom de l'objet : Contact
Groupe : Informations de contact
Label : Langue
Nom : langue
Type de champ : Sélection déroulante
Type : Énumération

Options :
- Fr (Français)
- En (Anglais)
- Es (Espagnol)
- Pt (Portugais)
```

#### Propriété : `role`

```
Nom de l'objet : Contact
Groupe : Informations de contact
Label : Rôle
Nom : role
Type de champ : Sélection déroulante
Type : Énumération

Options :
- Gestionnaire
- Propriétaire
- Autre
```

#### Propriété : `type_de_besoin`

```
Nom de l'objet : Contact
Groupe : Informations de contact
Label : Type de besoin
Nom : type_de_besoin
Type de champ : Texte sur une ligne
Type : Texte
```

#### Propriété : `biloki_property_count`

```
Nom de l'objet : Contact
Groupe : Informations de contact
Label : Nombre de logements Biloki
Nom : biloki_property_count
Type de champ : Nombre
Type : Nombre
Format : Nombre sans décimales
```

#### Propriété : `source_inbound`

```
Nom de l'objet : Contact
Groupe : Informations de contact
Label : Source Inbound
Nom : source_inbound
Type de champ : Texte sur une ligne
Type : Texte
Valeur par défaut : Site internet
```

#### Propriété : `source_biloki`

```
Nom de l'objet : Contact
Groupe : Informations de contact
Label : Source Biloki
Nom : source_biloki
Type de champ : Sélection déroulante
Type : Énumération

Options :
- chatbot
- formulaire_demo
- formulaire_contact
- formulaire_essai
```

---

## 🔑 Étape 2 : Vérifier le Token d'API

### 2.1 Accéder aux tokens d'application privée

1. Dans HubSpot : **Paramètres** > **Intégrations** > **Applications privées**
2. Vérifiez que l'application **Biloki Chatbot** existe
3. Si non, créez-la :
   - Nom : `Biloki Chatbot`
   - Description : `Intégration chatbot site Biloki`

### 2.2 Permissions requises

Cochez les permissions suivantes :

**CRM - Contacts :**
- ✅ `crm.objects.contacts.read`
- ✅ `crm.objects.contacts.write`

**CRM - Propriétés :**
- ✅ `crm.schemas.contacts.read`

### 2.3 Récupérer le token

1. Copiez le token d'accès (commence par `pat-eu1-...`)
2. Vérifiez qu'il est bien dans votre `.env.local` :

```env
HUBSPOT_PRIVATE_APP_TOKEN=votre_token_hubspot_ici
```

---

## 🤖 Étape 3 : Créer les workflows automatiques (Recommandé)

### Workflow 1 : Notification équipe Sales

**Objectif** : Alerter l'équipe commerciale quand un lead chatbot arrive

1. **Workflows** > **Créer un workflow**
2. Type : **À partir de zéro**
3. Type de workflow : **Basé sur un contact**

**Déclencheur :**
```
Quand : Propriété de contact "source_biloki" est égal à "chatbot"
```

**Actions :**
```
1. Envoyer une notification interne
   → À : Équipe Sales
   → Message : "Nouveau lead chatbot : {firstname} {lastname} - {role} - {biloki_property_count} logements"

2. Créer une tâche
   → Assignée à : Propriétaire du contact
   → Type : Email
   → Titre : "Contacter {firstname} {lastname} (chatbot)"
   → Échéance : Dans 2 heures
```

### Workflow 2 : Email automatique au lead

**Objectif** : Envoyer un email de bienvenue personnalisé

**Déclencheur :**
```
Quand : Propriété de contact "source_biloki" est égal à "chatbot"
```

**Actions avec branchement :**

```
SI role = "Gestionnaire"
  → Envoyer l'email "Bienvenue Gestionnaire"
  
SINON SI role = "Propriétaire"
  → Envoyer l'email "Bienvenue Propriétaire"
  
SINON
  → Envoyer l'email "Bienvenue Général"
```

### Workflow 3 : Lead Scoring

**Objectif** : Prioriser les leads selon la taille

**Déclencheur :**
```
Quand : Propriété de contact "biloki_property_count" est connu
```

**Actions :**
```
SI biloki_property_count >= 50
  → Définir "HubSpot Score" à 100
  → Définir "Lead Status" à "Hot Lead"
  → Notifier directement le responsable commercial

SINON SI biloki_property_count >= 10
  → Définir "HubSpot Score" à 70
  → Définir "Lead Status" à "Warm Lead"

SINON SI biloki_property_count >= 4
  → Définir "HubSpot Score" à 50
  → Définir "Lead Status" à "Qualified Lead"

SINON
  → Définir "HubSpot Score" à 30
  → Définir "Lead Status" à "New Lead"
```

---

## 📊 Étape 4 : Créer des listes de segmentation

### Liste 1 : Leads Chatbot Gestionnaires

```
Filtres :
- source_biloki est égal à "chatbot"
- role est égal à "Gestionnaire"
- biloki_property_count est supérieur ou égal à 4
```

### Liste 2 : Leads Chatbot Propriétaires

```
Filtres :
- source_biloki est égal à "chatbot"
- role est égal à "Propriétaire"
- biloki_property_count est compris entre 1 et 3
```

### Liste 3 : Leads Chatbot Haute Priorité

```
Filtres :
- source_biloki est égal à "chatbot"
- biloki_property_count est supérieur ou égal à 20
- Date de création est inférieure à 7 jours
```

---

## 📧 Étape 5 : Créer les templates d'email

### Template : Bienvenue Gestionnaire

**Sujet :** Simplifiez la gestion de vos {biloki_property_count} logements avec Biloki

**Contenu :**
```html
Bonjour {firstname},

Merci pour votre intérêt pour Biloki ! 👋

J'ai vu que vous gérez actuellement {biloki_property_count} logements. 
C'est une belle activité, et je comprends que la gestion quotidienne 
peut être chronophage.

Biloki est conçu spécifiquement pour les conciergeries comme la vôtre :

✅ Channel Manager avec +120 OTAs synchronisés
✅ Automatisation complète des opérations
✅ Interface dédiée pour vos prestataires
✅ Reporting avancé pour vos propriétaires

Seriez-vous disponible pour une démo de 15 minutes cette semaine ?

Je vous propose :
📅 [Lien Calendly]

Au plaisir d'échanger !

{owner_signature}
```

### Template : Bienvenue Propriétaire

**Sujet :** Gérez votre location courte durée sans effort avec Biloki

**Contenu :**
```html
Bonjour {firstname},

Merci pour votre intérêt pour Biloki ! 👋

En tant que propriétaire, vous connaissez les défis de la gestion 
locative : calendriers à synchroniser, messages voyageurs, ménages...

Biloki automatise tout cela :

✅ Synchronisation automatique Airbnb, Booking, etc.
✅ Messagerie IA disponible 24/7
✅ Gestion des accès avec serrures connectées
✅ Suivi de vos revenus en temps réel

Je serais ravi de vous montrer comment ça fonctionne en 15 minutes.

Réservez votre créneau :
📅 [Lien Calendly]

Cordialement,

{owner_signature}
```

---

## 🧪 Étape 6 : Tester l'intégration

### Test manuel via le chatbot

1. Allez sur votre site : `https://www.biloki.fr`
2. Ouvrez le chatbot (bouton en bas à droite)
3. Engagez une conversation :
   ```
   Vous : Bonjour
   Bot : [Message d'accueil]
   Vous : Je suis gestionnaire de 25 logements
   Bot : [Qualification]
   [Le bot demande votre email]
   Vous : test@biloki.fr
   ```
4. Vérifiez dans HubSpot :
   - Contacts > Recherchez `test@biloki.fr`
   - Vérifiez que toutes les propriétés sont remplies
   - Vérifiez que les workflows se sont déclenchés

### Test via l'API directement

Utilisez cURL pour tester :

```bash
curl -X POST https://www.biloki.fr/api/hubspot/chatbot \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test-api@biloki.fr",
    "language": "fr",
    "role": "Gestionnaire",
    "propertyCount": 35,
    "needType": "demo",
    "source": "chatbot"
  }'
```

---

## 📈 Étape 7 : Tableaux de bord (Dashboards)

### Dashboard : Performance Chatbot

**Widgets recommandés :**

1. **Nombre de leads chatbot**
   - Type : Nombre
   - Filtre : `source_biloki = chatbot`
   - Plage : 30 derniers jours

2. **Répartition par rôle**
   - Type : Graphique en secteurs
   - Propriété : `role`
   - Filtre : `source_biloki = chatbot`

3. **Distribution nombre de logements**
   - Type : Graphique en barres
   - Propriété : `biloki_property_count`
   - Groupes : 1-3, 4-10, 11-50, 51-100, 100+

4. **Taux de conversion chatbot → client**
   - Type : Entonnoir
   - Étapes :
     1. Lead chatbot créé
     2. Démo réservée
     3. Essai lancé
     4. Client converti

5. **Langues des visiteurs**
   - Type : Graphique en barres
   - Propriété : `langue`

---

## 🔍 Étape 8 : Rapports personnalisés

### Rapport : Leads chatbot à forte valeur

**Configuration :**
```
Source de données : Contacts
Filtres :
- source_biloki = "chatbot"
- biloki_property_count >= 20

Colonnes :
- Nom complet
- Email
- Rôle
- Nombre de logements (biloki_property_count)
- Langue
- Date de création
- Lead Status
- Propriétaire du contact

Tri : Par nombre de logements (décroissant)
```

---

## ⚠️ Dépannage

### Problème : Les contacts ne sont pas créés

**Solutions :**
1. Vérifier le token HubSpot dans `.env.local`
2. Vérifier les permissions du token (contacts.write)
3. Vérifier les logs dans la console navigateur
4. Tester l'API directement avec cURL

### Problème : Les propriétés sont vides

**Solutions :**
1. Vérifier que les noms de propriétés sont exacts (sensible à la casse)
2. Vérifier le mapping dans `/app/api/hubspot/chatbot/route.ts`
3. Vérifier que les propriétés existent bien dans HubSpot

### Problème : Les workflows ne se déclenchent pas

**Solutions :**
1. Vérifier que les workflows sont activés (statut "ON")
2. Vérifier les critères de déclenchement
3. Tester en mode "Révision" dans HubSpot
4. Vérifier l'historique du contact

---

## 📞 Support

Si vous rencontrez des difficultés :

1. Consultez les logs du chatbot dans la console navigateur
2. Vérifiez les logs d'API HubSpot : `Paramètres > Intégrations > Applications privées > [Votre app] > Logs`
3. Contactez le support HubSpot si nécessaire
4. Consultez la documentation officielle : https://developers.hubspot.com/docs/api/crm/contacts

---

## 📝 Checklist complète

- [ ] Propriété `langue` créée
- [ ] Propriété `role` créée
- [ ] Propriété `type_de_besoin` créée
- [ ] Propriété `biloki_property_count` créée
- [ ] Propriété `source_inbound` créée
- [ ] Propriété `source_biloki` créée
- [ ] Token d'API configuré avec les bonnes permissions
- [ ] Token ajouté dans `.env.local`
- [ ] Workflow notification équipe créé et activé
- [ ] Workflow email automatique créé et activé
- [ ] Workflow lead scoring créé et activé
- [ ] Listes de segmentation créées
- [ ] Templates d'email créés
- [ ] Dashboard de performance créé
- [ ] Test manuel effectué avec succès
- [ ] Chatbot Biloki activé sur le site

---

## 🎯 Prochaines étapes

Une fois la configuration terminée :

1. **Activez le chatbot** : Mettez `NEXT_PUBLIC_ENABLE_BILOKI_CHATBOT=true` dans `.env.local`
2. **Configurez le domaine d'envoi HubSpot** :
   - HubSpot > Paramètres > Marketing > Email
   - Ajouter `biloki.fr` comme domaine d'envoi
   - Configurer SPF/DKIM pour authentifier les emails
3. **Formez votre équipe** : Partagez cette documentation avec l'équipe Sales
4. **Surveillez les premiers leads** : Vérifiez que tout fonctionne correctement
5. **Optimisez** : Ajustez les workflows selon vos retours

---

## 📧 Bonus : Configuration Resend (pour formulaire contact)

Si vous voulez aussi que le **formulaire de contact** du site fonctionne :

### 1. Créer un compte Resend
- Aller sur https://resend.com
- Créer un compte
- Obtenir une clé API

### 2. Configurer le domaine
- Dans Resend : **Domains > Add Domain**
- Ajouter `biloki.fr`
- Configurer les DNS chez votre registrar :

```dns
Type   Nom                          Valeur
TXT    @                            v=spf1 include:resend.net ~all
TXT    resend._domainkey            [votre clé DKIM fournie par Resend]
```

### 3. Ajouter dans `.env.local`

```env
# Resend (pour formulaire contact du site)
RESEND_API_KEY=re_votre_cle_api_ici
RESEND_FROM_EMAIL=noreply@biloki.fr
NEXT_PUBLIC_CONTACT_EMAIL=contact@biloki.fr
```

**Note :** Ceci est **indépendant** de HubSpot. Resend est uniquement pour le formulaire de contact classique, pas pour le chatbot.

---

## 📚 Ressources complémentaires

- [Documentation API HubSpot Contacts](https://developers.hubspot.com/docs/api/crm/contacts)
- [Guide Workflows HubSpot](https://knowledge.hubspot.com/workflows/create-workflows)
- [Best Practices Lead Scoring](https://blog.hubspot.com/sales/lead-scoring)

---

**Dernière mise à jour :** 16 février 2026
**Version :** 1.0
**Auteur :** Équipe Technique Biloki
