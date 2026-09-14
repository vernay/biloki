'use client';

import { useLocale, useTranslations } from 'next-intl';
import { CONTACT_EMAIL } from '@/lib/config';

function FrenchPrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 text-gray-800">
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-16 space-y-12">
        <header className="space-y-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            Politique de confidentialité et de gestion des cookies
          </h1>
          <p className="text-sm text-gray-600">Dernière mise à jour : 14/09/2026</p>
        </header>

        <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6 sm:p-10 space-y-10">
          <article className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">1. Qui sommes-nous ?</h2>
            <p>Le site biloki.fr et la plateforme Biloki sont édités par :</p>
            <p className="font-semibold">BILOKI SAS</p>
            <p>
              SIREN : 932 678 493<br />
              Capital social : 400 000 €<br />
              Siège social : 4 rue Voltaire, 44000 Nantes, France<br />
              Contact : <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a>
            </p>
            <p>BILOKI SAS est responsable du traitement des données décrites dans la présente politique.</p>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">2. Quelles données collectons-nous ?</h2>
            <p>Selon votre usage du site et de la plateforme, nous pouvons collecter :</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Des données de navigation (pages visitées, durée de visite, appareil, navigateur)</li>
              <li>Des données que vous nous transmettez volontairement (nom, prénom, adresse e-mail, numéro de téléphone) lorsque vous remplissez un formulaire, réservez une démonstration, ou créez un compte d'essai gratuit</li>
              <li>Des données techniques liées à votre interaction avec nos outils de mesure et de publicité (voir section Cookies ci-dessous)</li>
            </ul>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">3. Pourquoi collectons-nous ces données ?</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-2 pr-4 font-semibold">Finalité</th>
                    <th className="py-2 font-semibold">Base légale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-2 pr-4">Fonctionnement technique du site (cookies essentiels)</td>
                    <td className="py-2">Intérêt légitime</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Mesure d'audience et amélioration du site (Google Analytics, Microsoft Clarity)</td>
                    <td className="py-2">Consentement</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Publicité et mesure de nos campagnes (Google Ads)</td>
                    <td className="py-2">Consentement</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Gestion de la relation commerciale et suivi des demandes (HubSpot)</td>
                    <td className="py-2">Consentement / Exécution précontractuelle</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Réponse à vos demandes de contact ou de démonstration</td>
                    <td className="py-2">Exécution précontractuelle</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>

          <article className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">4. Les cookies et traceurs que nous utilisons</h2>
            <p>
              Un cookie est un petit fichier déposé sur votre appareil lors de votre navigation. Certains sont
              indispensables au fonctionnement du site, d'autres nécessitent votre consentement préalable.
            </p>

            <h3 className="text-lg font-semibold text-gray-900">4.1 Cookies strictement nécessaires</h3>
            <p>
              Ces cookies assurent le fonctionnement de base du site (mémorisation de votre choix de consentement,
              sécurité). Ils ne nécessitent pas votre consentement et ne peuvent pas être désactivés.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-2 pr-4 font-semibold">Nom</th>
                    <th className="py-2 pr-4 font-semibold">Finalité</th>
                    <th className="py-2 font-semibold">Durée de conservation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-2 pr-4">biloki_cookie_consent</td>
                    <td className="py-2 pr-4">Mémorise votre choix concernant les cookies</td>
                    <td className="py-2">13 mois</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-gray-900">4.2 Cookies de mesure d'audience (soumis à consentement)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-2 pr-4 font-semibold">Outil</th>
                    <th className="py-2 pr-4 font-semibold">Finalité</th>
                    <th className="py-2 font-semibold">Durée de conservation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-2 pr-4">Google Analytics (GA4)</td>
                    <td className="py-2 pr-4">Mesure de la fréquentation et du comportement des visiteurs sur le site</td>
                    <td className="py-2">13 mois (cookies), 14 mois (données côté Google)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Microsoft Clarity</td>
                    <td className="py-2 pr-4">Analyse du comportement de navigation (cartes de chaleur, enregistrements de session anonymisés)</td>
                    <td className="py-2">13 mois</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-gray-900">4.3 Cookies publicitaires et CRM (soumis à consentement)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-2 pr-4 font-semibold">Outil</th>
                    <th className="py-2 pr-4 font-semibold">Finalité</th>
                    <th className="py-2 font-semibold">Durée de conservation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-2 pr-4">Google Ads</td>
                    <td className="py-2 pr-4">Mesure de l'efficacité de nos campagnes publicitaires et suivi des conversions</td>
                    <td className="py-2">13 mois</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">HubSpot</td>
                    <td className="py-2 pr-4">Gestion de la relation client, suivi des formulaires et des demandes de contact ou de démonstration</td>
                    <td className="py-2">13 mois</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-gray-900">4.4 Transferts de données hors Union européenne</h3>
            <p>
              Google (Google Analytics, Google Ads) et HubSpot sont des sociétés établies aux États-Unis. Les données
              transférées à ces prestataires le sont dans le cadre de garanties reconnues par la Commission européenne
              (clauses contractuelles types, Data Privacy Framework UE-États-Unis selon les cas).
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">5. Comment gérer vos préférences ?</h2>
            <p>Lors de votre première visite, un bandeau vous permet de :</p>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-semibold">Tout accepter</span> : les cookies de mesure d'audience et de publicité sont activés</li>
              <li><span className="font-semibold">Tout refuser</span> : seuls les cookies strictement nécessaires sont déposés</li>
              <li><span className="font-semibold">Choisir mes préférences</span> : vous pouvez activer ou désactiver séparément la mesure d'audience et la publicité</li>
            </ul>
            <p>
              Vous pouvez à tout moment modifier votre choix en cliquant sur le lien{' '}
              <span className="font-semibold">« Gérer mes cookies »</span> situé en bas de chaque page du site.
            </p>
            <p>Votre consentement est conservé pendant 13 mois, à l'issue desquels il vous sera à nouveau demandé.</p>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">6. Vos droits</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et
              Libertés, vous disposez des droits suivants sur vos données personnelles :
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Droit d'accès</li>
              <li>Droit de rectification</li>
              <li>Droit à l'effacement</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit d'opposition</li>
              <li>Droit à la portabilité de vos données</li>
            </ul>
            <p>
              Pour exercer ces droits, vous pouvez nous contacter à l'adresse :{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a>
            </p>
            <p>
              Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la
              Commission Nationale de l'Informatique et des Libertés (CNIL) :{' '}
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                www.cnil.fr
              </a>
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">7. Durée de conservation des données</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Les données de contact et de prospection sont conservées pendant 3 ans à compter du dernier contact, sauf obligation légale de conservation plus longue</li>
              <li>Les données liées à un compte client actif sont conservées pendant toute la durée de la relation contractuelle, puis archivées conformément aux obligations légales</li>
              <li>Les cookies et données de mesure sont conservés selon les durées indiquées à la section 4</li>
            </ul>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">8. Sécurité</h2>
            <p>
              BILOKI SAS met en œuvre les mesures techniques et organisationnelles appropriées pour protéger vos
              données contre tout accès non autorisé, perte ou divulgation. Les données sont hébergées en France
              (Scaleway).
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">9. Modifications de la présente politique</h2>
            <p>
              Cette politique peut être mise à jour pour refléter l'évolution de nos pratiques ou de la
              réglementation. Nous vous invitons à la consulter régulièrement. La date de dernière mise à jour est
              indiquée en haut de ce document.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">10. Contact</h2>
            <p>Pour toute question relative à cette politique ou à vos données personnelles :</p>
            <p>
              <span className="font-semibold">BILOKI SAS</span><br />
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a><br />
              4 rue Voltaire, 44000 Nantes
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}

function GenericCookiesPolicy() {
  const t = useTranslations('legalPages.cookies');

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 text-gray-800">
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-16 space-y-12">
        <header className="space-y-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">{t('title')}</h1>
          <p className="text-sm text-gray-600">{t('version')}</p>
        </header>

        <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6 sm:p-10 space-y-10">
          <article className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">{t('section1Title')}</h2>
            <p>{t('section1Content')}</p>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">{t('section2Title')}</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-semibold">{t('section2Items.technical')}</span></li>
              <li><span className="font-semibold">{t('section2Items.analytics')}</span></li>
              <li><span className="font-semibold">{t('section2Items.personalization')}</span></li>
            </ul>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">{t('section3Title')}</h2>
            <p>{t('section3Content')}</p>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">{t('section4Title')}</h2>
            <p className="whitespace-pre-line">{t('section4Content')}</p>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">{t('section5Title')}</h2>
            <p>{t('section5Content')}</p>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">{t('section6Title')}</h2>
            <p>{t('section6Content')}</p>
          </article>

          <article className="space-y-3">
            <h2 className="text-2xl font-semibold text-primary">{t('section7Title')}</h2>
            <p>
              {t('section7Content')}{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">{CONTACT_EMAIL}</a>
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}

export default function CookiesContent() {
  const locale = useLocale();
  return locale === 'fr' ? <FrenchPrivacyPolicy /> : <GenericCookiesPolicy />;
}
