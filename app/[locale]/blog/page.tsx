import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getArticlesForLocale } from "@/lib/blog";
import { Locale } from "@/lib/blog/types";
import RelatedPages from "@/components/ui/RelatedPages";
import BlogGrid from "@/components/blog/BlogGrid";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("blogPage");
  return {
    title: `${t("title")} Biloki | Conseils et Guides pour Conciergeries Modernes`,
    description: "Guides et conseils sur la gestion de locations saisonnières : channel manager, PMS, automatisation, stratégies de conciergerie. Actualités et bonnes pratiques.",
    keywords: "blog conciergerie, gestion location saisonnière, channel manager, PMS, automatisation",
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const articles = getArticlesForLocale(locale);
  const t = await getTranslations("blogPage");
  const common = await getTranslations("common");
  const relatedT = await getTranslations("relatedPages");

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Back button */}
        <a href={`/${locale}`} className="flex items-center gap-2 text-gray-600 hover:text-primary mb-12 font-semibold">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {common("back")}
        </a>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            {t("title")} <span className="text-primary">Biloki</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* Articles Tendance - Pleine largeur */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("trendingArticles")}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {articles.slice(0, 3).map((article) => (
              <Link
                key={article.slug}
                href={`/${locale}/blog/${article.slug}`}
                className="group"
              >
                <div className="bg-primary rounded-lg p-5 text-white hover:shadow-lg hover:shadow-primary/50 transition-all min-h-40">
                  <h4 className="font-bold text-base line-clamp-3 group-hover:underline mb-2">
                    {article.title}
                  </h4>
                  <p className="text-sm text-white/80">{article.readTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Layout avec sidebar */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Articles Grid - Centre 3/4 */}
          <div className="lg:col-span-3">
            {/* Articles Grid avec filtres */}
            <BlogGrid
              articles={articles}
              locale={locale}
              readMoreLabel={common("readArticle")}
            />
          </div>

          {/* Sidebar CTA - Droite 1/4 */}
          <aside className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* CTA Principal */}
              <div className="bg-primary text-white rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-3">{t("sidebarCtaTitle")}</h3>
                <p className="text-white/90 text-sm mb-4">
                  {t("sidebarCtaText")}
                </p>
                <div className="space-y-3">
                  <Link
                    href={`/${locale}/commencer-gratuitement`}
                    className="block text-center px-4 py-2 bg-white text-primary font-semibold rounded-lg hover:shadow-lg transition-all"
                  >
                    {t("sidebarCtaFree")}
                  </Link>
                  <Link
                    href={`/${locale}/reserver-demo`}
                    className="block text-center px-4 py-2 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition-all border border-white/30"
                  >
                    {t("sidebarCtaDemo")}
                  </Link>
                </div>
              </div>

              {/* Newsletter Sidebar */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-3">{t("sidebarNewsletterTitle")}</h4>
                <p className="text-gray-600 text-sm mb-4">
                  {t("sidebarNewsletterText")}
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none text-sm"
                  />
                  <button className="w-full px-3 py-2 bg-primary text-white font-semibold rounded-lg hover:shadow-lg transition-all text-sm">
                    {t("sidebarNewsletterButton")}
                  </button>
                </div>
              </div>
            </div>
          </aside>
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

        {/* Pages connexes pour SEO */}
        <RelatedPages
          title={common('relatedPages')}
          links={[
            {
              href: `/${locale}/fonctionnalites/channel-manager`,
              title: relatedT('channelManager.title'),
              description: relatedT('channelManager.description')
            },
            {
              href: `/${locale}/fonctionnalites/pms`,
              title: relatedT('pms.title'),
              description: relatedT('pms.description')
            },
            {
              href: `/${locale}/tarifs`,
              title: relatedT('pricing.title'),
              description: relatedT('pricing.description')
            },
            {
              href: `/${locale}/reserver-demo`,
              title: relatedT('demo.title'),
              description: relatedT('demo.description')
            },
            {
              href: `/${locale}/connexions-api`,
              title: relatedT('apiConnections.title'),
              description: relatedT('apiConnections.description')
            },
            {
              href: `/${locale}/contact`,
              title: relatedT('contact.title'),
              description: relatedT('contact.description')
            }
          ]}
          className="mt-16"
        />
      </div>
    </main>
  );
}
