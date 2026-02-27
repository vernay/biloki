# Configuration des Événements Personnalisés - GTM & GA4

## Récapitulatif des Événements Créés

Les événements suivants sont maintenant tracés automatiquement et envoyés au `dataLayer` :

| Événement | Déclenchement | Données associées |
|---|---|---|
| **calculator_use** | Quand l'utilisateur change le nombre de logements ou le cycle de facturation dans le Calculateur ROI | `calculator_dwellings`, `calculator_billing`, `calculator_client_type` |
| **demo_click** | Quand on clique sur "Réserver démo" (via DemoButton) ou soumet le formulaire démo | `demo_source` (header, blog, homepage, etc.) |
| **contact_form_submit** | Quand le formulaire de contact est soumis avec succès | `contact_type` (Demande de démo, Support, etc.), `contact_source` |

---

## Configuration dans Google Tag Manager

### Étape 1 : Créer le Variable personnalisée pour `event` (si nécessaire)

1. **GTM > Variables > Variables personnalisées > Nouvelle variable**
2. **Type** : Variable de couche de données
3. **Nom de la variable de couche de données** : `event`
4. **Nom** : "Event Name" ou "Événement"
5. **Enregistrer**

### Étape 2 : Créer les Tags GA4 pour chaque événement

#### Tag 1 : calculator_use

1. **GTM > Tags > Nouveau > Nommer "GA4 - Calculator Use"**
2. **Type de balise** : Google Analytics : Événement GA4 (ou Balise Google)
3. **ID de la balise** : `G-W6DXNVEKT4` (votre Measurement ID)
4. **Nom d'événement** : `calculator_use`
5. **Paramètres d'événement** (cliquer "+ Ajouter ligne" pour chacun) :
   ```
   Nom du paramètre    | Valeur
   ---|---
   calculator_type     | {{DLV - calculator_type}}
   calculator_dwellings| {{DLV - calculator_dwellings}}
   calculator_billing  | {{DLV - calculator_billing}}
   calculator_client_type | {{DLV - calculator_client_type}}
   ```
6. **Déclencheur** : Créer nouveau
   - Nom : "Événement calculator_use"
   - Type : Événement personnalisé
   - Nom d'événement : `calculator_use`
   - **Enregistrer le déclencheur**
7. **Enregistrer le tag**

#### Tag 2 : demo_click

1. **GTM > Tags > Nouveau > Nommer "GA4 - Demo Click"**
2. **Type de balise** : Google Analytics : Événement GA4
3. **ID de la balise** : `G-W6DXNVEKT4`
4. **Nom d'événement** : `demo_click`
5. **Paramètres d'événement** :
   ```
   Nom du paramètre    | Valeur
   ---|---
   demo_source         | {{DLV - demo_source}}
   ```
6. **Déclencheur** : Créer nouveau
   - Nom : "Événement demo_click"
   - Type : Événement personnalisé
   - Nom d'événement : `demo_click`
   - **Enregistrer le déclencheur**
7. **Enregistrer le tag**

#### Tag 3 : contact_form_submit

1. **GTM > Tags > Nouveau > Nommer "GA4 - Contact Form Submit"**
2. **Type de balise** : Google Analytics : Événement GA4
3. **ID de la balise** : `G-W6DXNVEKT4`
4. **Nom d'événement** : `contact_form_submit`
5. **Paramètres d'événement** :
   ```
   Nom du paramètre    | Valeur
   ---|---
   contact_type        | {{DLV - contact_type}}
   contact_source      | {{DLV - contact_source}}
   ```
6. **Déclencheur** : Créer nouveau
   - Nom : "Événement contact_form_submit"
   - Type : Événement personnalisé
   - Nom d'événement : `contact_form_submit`
   - **Enregistrer le déclencheur**
7. **Enregistrer le tag**

---

## Étape 3 : Tester les événements

### Method 1 : Tag Assistant (Google Tag Manager)
1. **GTM > Tag Assistant > Entrer l'URL de production (biloki.fr)**
2. Parcourir le site et vérifier que les événements s'affichent en temps réel

### Method 2 : GA4 Real-time
1. **Google Analytics 4 > Temps réel > Événements**
2. Depuis votre navigateur, déclencher les actions (cambiar calculadora, demo click, etc.)
3. Les événements doivent apparaître immédiatement

---

## Étape 4 : Publier les changements

1. **GTM > Brouillons > [Sélectionner votre version]**
2. **Soumettre > GA4 Events - Biloki (ou versioning)** 
3. **Publier**

---

## Vérification dans GA4

Une fois publiés, vous verrez dans GA4 :

```
Engagement > Événements > explorer par :
- calculator_use               (nombre d'utilisations du calculateur)
- demo_click                   (nombre de clics démo)
- contact_form_submit          (nombre de soumissions contact)
```

Chaque événement aura ses propres paramètres pour analyser :
- D'où viennent les clics démo (source)
- Quel type de calculateur ROI est utilisé
- Quel type de contact (démo, support, etc.)

---

## Prochaines Étapes

1. **Créer des conversions GA4** pour les événements prioritaires :
   - `demo_click` → Conversion "Clic Démo"
   - `contact_form_submit` → Conversion "Soumission Contact"

2. **Connecter GSC à GA4** pour voir quels articles génèrent des leads

3. **Créer un rapport Looker Studio** :
   - Tableau : Événement | Nombre d'occurrences | Taux de conversion
   - Graphique : Événements par Source (article, homepage, calculateur)

---

## Variables de Couche de Données (DLV)

Pour que les paramètres d'événement fonctionnent, les variables suivantes doivent être créées dans GTM :

| Variable | Type | Chemin de couche de données |
|---|---|---|
| DLV - calculator_type | Couche de données | `calculator_type` |
| DLV - calculator_dwellings | Couche de données | `calculator_dwellings` |
| DLV - calculator_billing | Couche de données | `calculator_billing` |
| DLV - calculator_client_type | Couche de données | `calculator_client_type` |
| DLV - demo_source | Couche de données | `demo_source` |
| DLV - contact_type | Couche de données | `contact_type` |
| DLV - contact_source | Couche de données | `contact_source` |

**À créer dans GTM** : Variables > Nouvelle variable > Type "Variable de couche de données"
