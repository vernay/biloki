import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("blogPage");
  return {
    title: `${t("title")} Biloki | Conseils et Guides pour Conciergeries Modernes`,
    description: "Découvrez nos guides, conseils et actualités sur la gestion de locations saisonnières, les channel managers, l'automatisation et les meilleures pratiques pour conciergeries.",
    keywords: "blog conciergerie, gestion location saisonnière, channel manager, PMS, automatisation",
  };
}

const articles = [
  {
    slug: "nice-quotas-airbnb-reglementation-2025",
    title: "Nice : Quotas par quartier pour les locations Airbnb",
    excerpt: "Nice durcit sa réglementation : quotas par quartier, 90 jours max, autorisations de 3 ans. Ce que les conciergeries doivent savoir.",
    date: "26 janvier 2026",
    readTime: "6 min",
    category: "Actualité",
    image: "/images/blog/nice-airbnb.jpg",
  },
  {
    slug: "channel-manager-guide-complet-conciergeries",
    title: "Channel Manager : Le Guide Complet 2026 pour Conciergeries",
    excerpt: "Découvrez comment un channel manager peut transformer votre conciergerie en synchronisant automatiquement vos annonces sur toutes les plateformes.",
    date: "20 janvier 2026",
    readTime: "8 min",
    category: "Guide",
    image: "/images/blog/channel-manager-guide.jpg",
  },
  {
    slug: "automatiser-gestion-locations-saisonnieres",
    title: "Comment Automatiser la Gestion de ses Locations Saisonnières en 2026",
    excerpt: "Gagnez jusqu'à 20 heures par semaine en automatisant vos tâches répétitives. Découvrez les 5 automatisations essentielles.",
    date: "À venir",
    readTime: "7 min",
    category: "Automatisation",
    image: "/images/blog/automatisation.jpg",
  },
  {
    slug: "messagerie-automatisee-conciergerie",
    title: "Messagerie automatisée : scripts et workflows pour conciergeries",
    excerpt: "Les messages clés à automatiser pour gagner du temps et améliorer l'expérience voyageurs sur Airbnb et Booking.",
    date: "20 janvier 2026",
    readTime: "9 min",
    category: "Automatisation",
    image: "/images/blog/messagerie-automatisee.jpg",
  },
];

export default function BlogPage() {
  const t = useTranslations("blogPage");
  const common = useTranslations("common");

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Back button */}
        <a href="/" className="flex items-center gap-2 text-gray-600 hover:text-primary mb-12 font-semibold">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {common("back")}
        </a>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            {t("title")} <span className="text-primary">Biloki</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article 
              key={article.slug}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 flex flex-col"
            >
              {/* Image */}
              <div className="h-48 relative overflow-hidden bg-gradient-to-br from-primary to-blue-600">
                <Image 
                  src={article.image} 
                  alt={article.title}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div className="p-6 flex flex-col flex-1">
                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span className="bg-blue-100 text-primary px-3 py-1 rounded-full font-semibold">
                    {article.category}
                  </span>
                  <span>{article.date}</span>
                  <span>• {article.readTime}</span>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {article.title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-700 mb-4 flex-1 line-clamp-3">
                  {article.excerpt}
                </p>

                {/* CTA */}
                <a
                  href={`/blog/${article.slug}`}
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                >
                  {common("readArticle")}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t("newsletter")}
          </h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            {t("description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
            />
            <button className="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300">
              {t("subscribeNewsletter")}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
