import { NextRequest, NextResponse } from 'next/server';
import { CONTACT_EMAIL, RESEND_FROM_EMAIL } from '@/lib/config';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prenom, nom, email, telephone, entreprise, message } = body;

    // Validation basique
    if (!prenom || !nom || !email || !message) {
      return NextResponse.json(
        { error: 'Champs obligatoires manquants' },
        { status: 400 }
      );
    }

    // Configuration pour l'email (utilise nodemailer ou un service d'email)
    // Pour cet exemple, nous utilisons Resend (à installer avec: npm install resend)
    
    try {
      // Essayer d'importer Resend
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      // Envoyer l'email
      const result = await resend.emails.send({
        from: RESEND_FROM_EMAIL,
        to: CONTACT_EMAIL,
        replyTo: email,
        subject: `Nouveau message de contact de ${prenom} ${nom}`,
        html: `
          <h2>Nouveau message de contact</h2>
          <p><strong>Prénom :</strong> ${prenom}</p>
          <p><strong>Nom :</strong> ${nom}</p>
          <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Téléphone :</strong> ${telephone || 'Non fourni'}</p>
          <p><strong>Entreprise :</strong> ${entreprise || 'Non fourni'}</p>
          <p><strong>Message :</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      });

      if (result.error) {
        console.error('Erreur Resend:', result.error);
        return NextResponse.json(
          { error: 'Erreur lors de l\'envoi de l\'email' },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { success: true, message: 'Email envoyé avec succès' },
        { status: 200 }
      );
    } catch (resendError) {
      // Si Resend n'est pas disponible, utiliser nodemailer ou afficher une erreur
      console.error('Resend non disponible:', resendError);
      
      // Fallback: retourner une erreur
      return NextResponse.json(
        { 
          error: 'Service d\'email non configuré. Veuillez configurer Resend ou un autre service d\'email.',
          details: 'Installez Resend avec: npm install resend'
        },
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
