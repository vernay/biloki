import type { Metadata } from "next";
import { getMessages } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const seoMetadata = (messages as any).seoMetadata;

  const title = seoMetadata?.["blog-salon"]?.title || "Biloki";
  const description = seoMetadata?.["blog-salon"]?.description || "";

  return {
    title,
    description,
  };
}

export default function SalonMarseille2026Page() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
            <a href="/" className="hover:text-primary">Accueil</a>
            <span>/</span>
            <a href="/blog" className="hover:text-primary">Blog</a>
            <span>/</span>
            <span className="text-gray-900">Salon Marseille</span>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
            <span className="bg-blue-100 text-primary px-4 py-1.5 rounded-full font-semibold">
              Événement
            </span>
            <time dateTime="2026-02-05">5 février 2026</time>
            <span>•</span>
            <span>4 min de lecture</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Biloki au salon de la conciergerie à Marseille : on vous attend !
          </h1>

          {/* Intro */}
          <p className="text-xl text-gray-700 leading-relaxed">
            Rendez-vous le <strong>24 mars à Marseille</strong> pour rencontrer l’équipe Biloki en vrai. Nous serons présents
            pour vous montrer toutes les fonctionnalités et répondre à vos questions.
          </p>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Pourquoi venir nous rencontrer ?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Rien ne vaut une démo en direct. Au salon, vous pourrez échanger avec notre équipe produit et découvrir
            comment Biloki simplifie la gestion de votre conciergerie.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Voir l’outil en action, avec des cas concrets du quotidien.</li>
            <li>Comprendre comment centraliser vos opérations sans friction.</li>
            <li>Identifier les automatisations les plus adaptées à votre organisation.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ce que nous allons présenter</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-2">PMS & opérations</h3>
              <p className="text-gray-700">
                Gérez vos séjours, logements et équipes depuis une interface unique, avec une vue claire de votre activité.
              </p>
            </div>
            <div className="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Channel Manager</h3>
              <p className="text-gray-700">
                Synchronisez vos calendriers et tarifs sur 120+ plateformes pour éviter les doubles réservations.
              </p>
            </div>
            <div className="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Messagerie automatisée</h3>
              <p className="text-gray-700">
                Réduisez les échanges répétitifs grâce à des scénarios intelligents et des réponses instantanées.
              </p>
            </div>
            <div className="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Serrures connectées</h3>
              <p className="text-gray-700">
                Automatisez l’accès voyageurs et prestataires avec des codes sécurisés selon les dates de séjour.
              </p>
            </div>
            <div className="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg md:col-span-2">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Marketplace API</h3>
              <p className="text-gray-700">
                Connectez Biloki à vos outils existants pour un écosystème sur mesure.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Infos pratiques</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
            <p className="text-gray-700 mb-2"><strong>Date :</strong> 24 mars 2026</p>
            <p className="text-gray-700 mb-2"><strong>Lieu :</strong> Salon de la conciergerie, Marseille</p>
            <p className="text-gray-700">
              Passez nous voir, même sans rendez-vous. Nous vous accueillerons pour une démo personnalisée.
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-primary text-white p-8 rounded-[32px] shadow-xl">
          <h3 className="text-2xl font-bold mb-3">Vous voulez une démo dédiée ?</h3>
          <p className="mb-6 opacity-90">
            Réservez un créneau à l’avance pour que l’équipe Biloki vous prépare une démonstration adaptée à votre activité.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/reserver-demo"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-lg hover:shadow-xl transition-all duration-300"
            >
              Réserver une démo
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/posts/salon-conciergerie-locative_d%C3%A9couvrez-biloki-exposant-activity-7416751054299729920-jfEn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-md"
            >
              Voir le post LinkedIn
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
