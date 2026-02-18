import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prenom, nom, email, telephone, entreprise, raison, message } = body;

    // Validation basique
    if (!prenom || !nom || !email || !message || !raison) {
      return NextResponse.json(
        { error: 'Champs obligatoires manquants' },
        { status: 400 }
      );
    }

    // Créer/mettre à jour le contact dans HubSpot
    try {
      // Construire l'URL absolue pour l'API HubSpot
      const url = new URL(request.url);
      const hubspotUrl = `${url.protocol}//${url.host}/api/hubspot/create-contact`;
      
      const hubspotResponse = await fetch(hubspotUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: prenom,
          lastName: nom,
          email: email,
          phone: telephone || '',
          company: entreprise || '',
          conversation: `Message depuis le formulaire de contact:\n\n${message}`,
          source: 'Formulaire de contact',
          locale: 'fr',
          requestType: raison,
        }),
      });

      if (!hubspotResponse.ok) {
        const errorText = await hubspotResponse.text();
        console.error('Erreur HubSpot:', errorText);
        return NextResponse.json(
          { error: 'Erreur lors de l\'enregistrement du contact' },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { success: true, message: 'Contact enregistré avec succès dans HubSpot' },
        { status: 200 }
      );
    } catch (hubspotError) {
      console.error('Erreur HubSpot:', hubspotError);
      return NextResponse.json(
        { error: 'Erreur lors de l\'enregistrement du contact' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Erreur API contact:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
