import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getArticleBySlug, getAllArticleSlugs } from "@/lib/blog";
import { Locale } from "@/lib/blog/types";
import RelatedPages from "@/components/ui/RelatedPages";

interface BlogArticlePageProps {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug, locale);

  if (!article) {
    return {
      title: "Article non trouvé",
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function BlogArticlePage({
  params,
}: BlogArticlePageProps) {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug, locale);
  const common = await getTranslations("common");
  const relatedT = await getTranslations("relatedPages");

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-12 md:py-20">
      <article className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Back button */}
        <a
          href={`/${locale}/blog`}
          className="flex items-center gap-2 text-gray-600 hover:text-primary mb-12 font-semibold"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {common("back")}
        </a>

        {/* Article Header */}
        <header className="mb-8">
          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <span className="bg-blue-100 text-primary px-3 py-1 rounded-full font-semibold">
              {article.category}
            </span>
            <span>{article.date}</span>
            <span>• {article.readTime}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {article.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-gray-700 leading-relaxed">
            {article.excerpt}
          </p>

          {/* Featured Image */}
          {article.image && (
            <div className="mt-12 mb-12 rounded-xl overflow-hidden shadow-md max-w-2xl mx-auto">
              <Image
                src={article.image}
                alt={article.title}
                width={800}
                height={450}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          )}
        </header>

        {/* Article Content */}
        <div
          className="prose prose-lg prose-blue max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* CTA Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {locale === "fr" && "Prêt à transformer votre conciergerie ?"}
            {locale === "en" && "Ready to transform your property management?"}
            {locale === "es" && "¿Listo para transformar tu conserjería?"}
            {locale === "pt" && "Pronto para transformar sua portaria?"}
          </h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            {locale === "fr" &&
              "Découvrez comment Biloki peut vous aider à automatiser votre gestion et à économiser jusqu'à 20 heures par semaine."}
            {locale === "en" &&
              "Discover how Biloki can help you automate your management and save up to 20 hours per week."}
            {locale === "es" &&
              "Descubre cómo Biloki puede ayudarte a automatizar tu gestión y ahorrar hasta 20 horas por semana."}
            {locale === "pt" &&
              "Descubra como o Biloki pode ajudá-lo a automatizar sua gestão e economizar até 20 horas por semana."}
          </p>
          <a
            href={`/${locale}/reserver-demo`}
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            {locale === "fr" && "Réserver une démo"}
            {locale === "en" && "Book a demo"}
            {locale === "es" && "Reservar una demo"}
            {locale === "pt" && "Reservar uma demo"}
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>

        {/* Pages connexes pour SEO */}
        <RelatedPages
          title={common('relatedPages')}
          links={[
            {
              href: `/${locale}/blog`,
              title: relatedT('blog.title'),
              description: relatedT('blog.description')
            },
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
              href: `/${locale}/commencer-gratuitement`,
              title: relatedT('trial.title'),
              description: relatedT('trial.description')
            },
            {
              href: `/${locale}/reserver-demo`,
              title: relatedT('demo.title'),
              description: relatedT('demo.description')
            }
          ]}
          className="mt-12"
        />

        {/* Back to Blog */}
        <div className="mt-8 text-center">
          <a
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {locale === "fr" && "Retour au blog"}
            {locale === "en" && "Back to blog"}
            {locale === "es" && "Volver al blog"}
            {locale === "pt" && "Voltar ao blog"}
          </a>
        </div>
      </article>
    </main>
  );
}
