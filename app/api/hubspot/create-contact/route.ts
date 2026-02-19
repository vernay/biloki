import { NextRequest, NextResponse } from 'next/server';

const CONSOLIDATED_QUESTION_NOTE_MARKER = '[BILOKI_CHATBOT_QUESTION_CONSOLIDATED]';

type NoteMode = 'standard' | 'question_consolidated';

function isTypeDemandeChatbotValidationError(errorData: unknown): boolean {
  const serialized = JSON.stringify(errorData).toLowerCase();
  return (
    serialized.includes('type_de_demande_chatbot') &&
    (
      serialized.includes('invalid') ||
      serialized.includes('not one of') ||
      serialized.includes('allowed') ||
      serialized.includes('enumeration') ||
      serialized.includes('option')
    )
  );
}

function normalizeTypeDemandeValue(value: unknown): string {
  if (typeof value !== 'string' || !value.trim()) {
    return 'Autre';
  }

  const normalized = value.trim().toLowerCase();

  if (normalized === 'demande de démo' || normalized === 'demande de demo') {
    return 'Demande de démo';
  }

  if (normalized === 'support technique' || normalized === 'problème technique' || normalized === 'probleme technique') {
    return 'Support technique';
  }

  if (normalized === 'question générale' || normalized === 'question generale') {
    return 'Question générale';
  }

  if (normalized === 'autre') {
    return 'Autre';
  }

  return value.trim();
}

function normalizeRoleValue(value: unknown): string | undefined {
  if (typeof value !== 'string' || !value.trim()) {
    return undefined;
  }

  const normalized = value.trim().toLowerCase();

  if (normalized === 'gestionnaire') {
    return 'gestionnaire';
  }

  if (normalized === 'propriétaire' || normalized === 'proprietaire') {
    return 'propriétaire';
  }

  if (normalized === 'autre') {
    return 'autre';
  }

  return value.trim();
}

function mapRequestTypeToTypeDeBesoin(requestType: string): string {
  switch (requestType) {
    case 'Demande de démo':
      return 'Logiciel_gestion';
    case 'Support technique':
      return 'Aide_compte';
    case 'Question générale':
    default:
      return 'Visite_site';
  }
}

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, phone, company, propertyCount, conversation, source, locale, role, urgent, requestType, problemDescription, integrationObjective, noteMode } = await req.json();

    console.log('📥 Requête HubSpot reçue:', {
      firstName,
      lastName,
      email,
      source,
      requestType,
      urgent,
      hasConversation: !!conversation,
      hasProblemDescription: !!problemDescription,
    });

    // Vérifier que HubSpot API key existe
    const hubspotApiKey = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
    if (!hubspotApiKey) {
      console.error('❌ HUBSPOT_PRIVATE_APP_TOKEN manquante');
      return NextResponse.json(
        { error: 'HubSpot API key manquante' },
        { status: 500 }
      );
    }

    // Préparer les propriétés du contact avec les noms internes exacts
    const properties: any = {
      firstname: firstName,
      lastname: lastName,
      email: email,
    };

    // Propriétés optionnelles standard
    if (phone) properties.phone = phone;
    if (company) properties.company = company;
    
    // Ne pas envoyer la propriété HubSpot "source" : elle n'existe pas sur ce portail
    // On utilise les propriétés Biloki dédiées (source_biloki / source_inbound si configurée)
    
    // Propriétés personnalisées Biloki
    if (propertyCount) properties.biloki_property_count = propertyCount;
    if (source) properties.source_biloki = source;
    if (locale) {
      // Capitaliser la première lettre pour correspondre aux options HubSpot (Fr, En, Es, Pt)
      properties.langue = locale.charAt(0).toUpperCase() + locale.slice(1);
    }
    const normalizedRole = normalizeRoleValue(role);
    if (normalizedRole) properties.role = normalizedRole;
    
    // Objectif d'intégration API (spécifique à la page marketplace)
    if (integrationObjective) properties.type_dintegration = integrationObjective;
    
    // Isolation des workflows : éviter que le chatbot déclenche le workflow
    // "formulaire de contact" tout en gardant une source lisible dans HubSpot.
    if (source === 'chatbot') {
      properties.source_inbound = 'Chatbot';
    } else if (source) {
      properties.source_inbound = 'Site internet';
    }

    // Type de demande pour workflow de notification
    const normalizedRequestType = normalizeTypeDemandeValue(requestType);
    properties.type_de_demande_chatbot = normalizedRequestType;

    // Ne pas alimenter `type_de_besoin` pour le chatbot,
    // car cette propriété peut déclencher les workflows du formulaire contact.
    if (source !== 'chatbot') {
      properties.type_de_besoin = mapRequestTypeToTypeDeBesoin(normalizedRequestType);
    }

    const effectiveNoteMode: NoteMode = noteMode === 'question_consolidated' ? 'question_consolidated' : 'standard';
    const shouldUseConsolidatedQuestionNote =
      source === 'chatbot' &&
      normalizedRequestType === 'Question générale' &&
      effectiveNoteMode === 'question_consolidated';

    const hasConversation = typeof conversation === 'string' && conversation.trim().length > 0;
    const hasProblemDescription = typeof problemDescription === 'string' && problemDescription.trim().length > 0;
    const hasPropertyCount = typeof propertyCount === 'string' && propertyCount.trim().length > 0;

    const shouldAddNote = shouldUseConsolidatedQuestionNote
      ? hasConversation
      : hasConversation || hasPropertyCount || hasProblemDescription;

    console.log('📋 Propriétés à envoyer à HubSpot:', properties);

    // Créer le contact dans HubSpot
    const contactResponse = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${hubspotApiKey}`,
      },
      body: JSON.stringify({ properties }),
    });

    if (!contactResponse.ok) {
      const errorData = await contactResponse.json();
      console.error('Erreur HubSpot:', errorData);

      if (isTypeDemandeChatbotValidationError(errorData)) {
        console.warn('⚠️ type_de_demande_chatbot rejeté par HubSpot, retry sans cette propriété (create)');
        const fallbackProperties = { ...properties };
        delete fallbackProperties.type_de_demande_chatbot;

        const fallbackCreateResponse = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${hubspotApiKey}`,
          },
          body: JSON.stringify({ properties: fallbackProperties }),
        });

        if (fallbackCreateResponse.ok) {
          const fallbackContactData = await fallbackCreateResponse.json();
          const fallbackContactId = fallbackContactData.id;
          console.log('✅ Contact créé avec succès après fallback - ID:', fallbackContactId);

          if (shouldAddNote) {
            await addNoteToContact(fallbackContactId, conversation, propertyCount, source, problemDescription, normalizedRequestType, effectiveNoteMode, hubspotApiKey);
          }

          return NextResponse.json({
            success: true,
            contactId: fallbackContactId,
            created: true,
            fallbackApplied: true,
          });
        }

        const fallbackErrorData = await fallbackCreateResponse.json();
        console.error('❌ Erreur fallback création contact:', fallbackErrorData);
      }
      
      // Si le contact existe déjà, on le met à jour
      if (errorData.category === 'CONFLICT') {
        // Récupérer l'ID du contact existant via email
        const searchResponse = await fetch(
          `https://api.hubapi.com/crm/v3/objects/contacts/search`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${hubspotApiKey}`,
            },
            body: JSON.stringify({
              filterGroups: [{
                filters: [{
                  propertyName: 'email',
                  operator: 'EQ',
                  value: email,
                }],
              }],
            }),
          }
        );

        const searchData = await searchResponse.json();
        if (searchData.results && searchData.results.length > 0) {
          const contactId = searchData.results[0].id;
          
          console.log('♻️ Contact existant trouvé - ID:', contactId);
          console.log('📝 Mise à jour avec les propriétés:', properties);

          // Forcer un changement de valeur pour garantir la réinscription workflow
          // dans HubSpot quand la demande reste "Question générale".
          if (source === 'chatbot' && normalizedRequestType === 'Question générale') {
            await forceQuestionWorkflowReenrollment(contactId, hubspotApiKey);
          }
          
          // Mettre à jour le contact existant
          const updateResponse = await fetch(
            `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`,
            {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${hubspotApiKey}`,
              },
              body: JSON.stringify({ properties }),
            }
          );

          if (!updateResponse.ok) {
            const updateError = await updateResponse.json();
            console.error('❌ Erreur lors de la mise à jour du contact:', updateError);

            if (isTypeDemandeChatbotValidationError(updateError)) {
              console.warn('⚠️ type_de_demande_chatbot rejeté par HubSpot, retry sans cette propriété (update)');
              const fallbackProperties = { ...properties };
              delete fallbackProperties.type_de_demande_chatbot;

              const fallbackUpdateResponse = await fetch(
                `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`,
                {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${hubspotApiKey}`,
                  },
                  body: JSON.stringify({ properties: fallbackProperties }),
                }
              );

              if (fallbackUpdateResponse.ok) {
                console.log('✅ Contact mis à jour avec succès après fallback - ID:', contactId);

                if (shouldAddNote) {
                  await addNoteToContact(contactId, conversation, propertyCount, source, problemDescription, normalizedRequestType, effectiveNoteMode, hubspotApiKey);
                }

                return NextResponse.json({
                  success: true,
                  contactId,
                  updated: true,
                  fallbackApplied: true,
                });
              }

              const fallbackUpdateError = await fallbackUpdateResponse.json();
              console.error('❌ Erreur fallback mise à jour:', fallbackUpdateError);
            }

            return NextResponse.json(
              { 
                error: 'Erreur lors de la mise à jour du contact',
                details: updateError.message || updateError,
              },
              { status: 500 }
            );
          }

          const updatedContact = await updateResponse.json();
          console.log('✅ Contact mis à jour avec succès - ID:', contactId);
          
          // Ajouter une note avec la conversation
          if (shouldAddNote) {
            await addNoteToContact(contactId, conversation, propertyCount, source, problemDescription, normalizedRequestType, effectiveNoteMode, hubspotApiKey);
          }

          // Les tâches sont maintenant gérées par les workflows HubSpot

          return NextResponse.json({
            success: true,
            contactId,
            updated: true,
          });
        }
      }
      
      return NextResponse.json(
        { 
          error: 'Erreur lors de la création du contact',
          details: errorData.message || errorData,
          category: errorData.category
        },
        { status: 500 }
      );
    }

    const contactData = await contactResponse.json();
    const contactId = contactData.id;

    console.log('✅ Contact HubSpot créé avec succès - ID:', contactId);

    // Ajouter une note avec la conversation + infos complémentaires
    if (shouldAddNote) {
      await addNoteToContact(contactId, conversation, propertyCount, source, problemDescription, normalizedRequestType, effectiveNoteMode, hubspotApiKey);
    }

    // Les tâches sont maintenant gérées par les workflows HubSpot

    return NextResponse.json({
      success: true,
      contactId,
      created: true,
    });

  } catch (error) {
    console.error('Erreur serveur:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

async function forceQuestionWorkflowReenrollment(contactId: string, apiKey: string) {
  const response = await fetch(
    `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        properties: {
          type_de_demande_chatbot: 'Autre',
        },
      }),
    }
  );

  if (!response.ok) {
    const details = await response.text();
    console.warn('⚠️ Impossible de forcer la réinscription workflow (reset temporaire):', details);
  }
}

// Ajouter une note au contact avec le transcript de conversation
async function addNoteToContact(
  contactId: string, 
  conversation: string | undefined, 
  propertyCount: string | undefined,
  source: string | undefined,
  problemDescription: string | undefined,
  requestType: string,
  noteMode: NoteMode,
  apiKey: string
) {
  if (noteMode === 'question_consolidated' && source === 'chatbot' && requestType === 'Question générale') {
    await addOrUpdateConsolidatedQuestionNote(contactId, conversation, apiKey);
    return;
  }

  // Adapter le titre et le footer en fonction de la source
  let noteTitle = '📝 Nouveau lead';
  let noteFooter = 'Capturé automatiquement';
  
  switch (source) {
    case 'chatbot':
      noteTitle = '🤖 Nouveau lead capturé via chatbot';
      noteFooter = 'Capturé automatiquement via le chatbot du site';
      break;
    case 'formulaire_connexions_api':
      noteTitle = '🔌 Demande de connexion API reçue';
      noteFooter = 'Soumise via le formulaire Connexions API';
      break;
    case 'formulaire_demo':
      noteTitle = '📅 Demande de démo reçue';
      noteFooter = 'Soumise via le formulaire Réserver une démo';
      break;
    case 'formulaire_contact':
      noteTitle = '📧 Demande de contact reçue';
      noteFooter = 'Soumise via le formulaire de contact';
      break;
    case 'formulaire_essai':
      noteTitle = '🆓 Inscription essai gratuit';
      noteFooter = 'Soumise via le formulaire d\'essai gratuit';
      break;
    default:
      noteTitle = '📝 Nouveau lead';
      noteFooter = 'Capturé automatiquement';
  }
  
  let noteBody = noteTitle + '\n\n';
  
  if (propertyCount) {
    noteBody += `🏠 Nombre de logements : ${propertyCount}\n`;
  }
  
  if (source) {
    noteBody += `📍 Source : ${source}\n`;
  }
  
  if (problemDescription) {
    noteBody += `\n🛠 Problème technique décrit :\n${problemDescription}\n`;
  }
  
  if (conversation) {
    noteBody += `\n---\n\n💬 Détails :\n\n${conversation}\n`;
  }
  
  noteBody += `\n---\n${noteFooter}`;

  await createNoteForContact(contactId, noteBody, apiKey);
}

async function createNoteForContact(contactId: string, noteBody: string, apiKey: string) {
  await fetch('https://api.hubapi.com/crm/v3/objects/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      properties: {
        hs_note_body: noteBody,
        hs_timestamp: new Date().toISOString(),
      },
      associations: [
        {
          to: { id: contactId },
          types: [
            {
              associationCategory: 'HUBSPOT_DEFINED',
              associationTypeId: 202,
            },
          ],
        },
      ],
    }),
  });
}

async function addOrUpdateConsolidatedQuestionNote(contactId: string, conversation: string | undefined, apiKey: string) {
  const cleanedConversation = (conversation || '').trim();
  if (!cleanedConversation) return;

  const noteBody = [
    CONSOLIDATED_QUESTION_NOTE_MARKER,
    '🤖 Questions utilisateur (chatbot)',
    '',
    cleanedConversation,
    '',
    '---',
    'Mise à jour automatique depuis le chatbot du site',
  ].join('\n');

  const associationResponse = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}/associations/notes?limit=100`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
    },
  });

  if (!associationResponse.ok) {
    await createNoteForContact(contactId, noteBody, apiKey);
    return;
  }

  const associationData = await associationResponse.json() as { results?: Array<{ id: string }> };
  const noteIds = associationData.results?.map((item) => item.id).filter(Boolean) ?? [];

  if (noteIds.length === 0) {
    await createNoteForContact(contactId, noteBody, apiKey);
    return;
  }

  const batchReadResponse = await fetch('https://api.hubapi.com/crm/v3/objects/notes/batch/read', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      properties: ['hs_note_body'],
      inputs: noteIds.map((id) => ({ id })),
    }),
  });

  if (!batchReadResponse.ok) {
    await createNoteForContact(contactId, noteBody, apiKey);
    return;
  }

  const notesData = await batchReadResponse.json() as {
    results?: Array<{ id: string; properties?: { hs_note_body?: string } }>;
  };

  const existingConsolidatedNote = notesData.results?.find((note) =>
    note.properties?.hs_note_body?.includes(CONSOLIDATED_QUESTION_NOTE_MARKER)
  );

  if (!existingConsolidatedNote?.id) {
    await createNoteForContact(contactId, noteBody, apiKey);
    return;
  }

  await fetch(`https://api.hubapi.com/crm/v3/objects/notes/${existingConsolidatedNote.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      properties: {
        hs_note_body: noteBody,
        hs_timestamp: new Date().toISOString(),
      },
    }),
  });
}

// Créer une tâche de suivi
async function createFollowUpTask(contactId: string, firstName: string, urgent: boolean, problemDescription: string | undefined, apiKey: string) {
  console.log(`📋 Création tâche ${urgent ? 'URGENTE' : 'normale'} pour contact ${contactId}...`);
  
  // Si urgente : tâche immédiate (dans 10 minutes)
  // Sinon : tâche pour demain matin à 10h
  const now = new Date();
  let taskTimestamp: Date;
  
  if (urgent) {
    // Dans 10 minutes
    taskTimestamp = new Date(now.getTime() + (10 * 60 * 1000));
  } else {
    // Demain à 10h
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);
    taskTimestamp = tomorrow;
  }

  let taskBody = urgent 
    ? `🛠 SUPPORT TECHNIQUE URGENT - Contacter le visiteur rapidement.\n\n`
    : `Nouveau lead capturé via chatbot. Recontacter ${firstName} pour qualifier le besoin.\n\n`;
  
  if (problemDescription) {
    taskBody += `Problème décrit :\n${problemDescription}\n\n`;
  }
  
  taskBody += `Consulter la conversation complète et les coordonnées dans la fiche contact.`;

  const taskProperties: any = {
    hs_task_body: taskBody,
    hs_task_subject: urgent
      ? `🛠 URGENT - Support technique pour ${firstName}`
      : `🤖 Suivre lead chatbot: ${firstName}`,
    hs_task_status: 'NOT_STARTED',
    hs_task_priority: urgent ? 'HIGH' : 'MEDIUM',
    hs_timestamp: taskTimestamp.toISOString(),
  };

  // Assigner à Grégoire Vernay pour toutes les tâches (urgentes ou non)
  taskProperties.hubspot_owner_id = '31178324';
  console.log(`✅ Tâche assignée à l'owner ID: 31178324`);

  const taskResponse = await fetch('https://api.hubapi.com/crm/v3/objects/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      properties: taskProperties,
      associations: [
        {
          to: { id: contactId },
          types: [
            {
              associationCategory: 'HUBSPOT_DEFINED',
              associationTypeId: 204, // Task to Contact
            },
          ],
        },
      ],
    }),
  });

  if (!taskResponse.ok) {
    const errorData = await taskResponse.json();
    console.error('❌ Erreur création tâche HubSpot:', errorData);
    throw new Error(`Erreur création tâche: ${errorData.message || 'Unknown error'}`);
  }

  const taskData = await taskResponse.json();
  console.log(`✅ Tâche HubSpot créée avec succès - ID: ${taskData.id}`);
  return taskData;
}
