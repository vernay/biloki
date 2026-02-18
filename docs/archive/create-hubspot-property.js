// Script pour créer la propriété personnalisée "type_demande_chatbot" dans HubSpot
// Lancer avec: node scripts/create-hubspot-property.js

const HUBSPOT_API_KEY = process.env.HUBSPOT_PRIVATE_APP_TOKEN || 'VOTRE_TOKEN_ICI';

async function createProperty() {
  const response = await fetch('https://api.hubapi.com/crm/v3/properties/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
    },
    body: JSON.stringify({
      name: 'type_demande_chatbot',
      label: 'Type de demande chatbot',
      type: 'enumeration',
      fieldType: 'select',
      groupName: 'contactinformation',
      description: 'Catégorie de la demande issue du chatbot pour déclencher les workflows de notification',
      options: [
        {
          label: 'Lead normal',
          value: 'Lead normal',
          displayOrder: 1,
          hidden: false
        },
        {
          label: 'Demande urgente',
          value: 'Demande urgente',
          displayOrder: 2,
          hidden: false
        },
        {
          label: 'Question simple',
          value: 'Question simple',
          displayOrder: 3,
          hidden: false
        }
      ]
    }),
  });

  if (response.ok) {
    const data = await response.json();
    console.log('✅ Propriété créée avec succès:', data);
  } else {
    const error = await response.json();
    if (error.category === 'CONFLICT') {
      console.log('ℹ️  La propriété existe déjà');
    } else {
      console.error('❌ Erreur:', error);
    }
  }
}

createProperty();
