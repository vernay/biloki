import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { getArticleBySlug, getAllArticleSlugs, getArticlesForLocale } from "@/lib/blog";
import { Locale } from "@/lib/blog/types";
import BlogTableOfContents from "@/components/blog/BlogTableOfContents";
import BlogRelatedArticles from "@/components/blog/BlogRelatedArticles";
import Breadcrumbs from "@/components/blog/Breadcrumbs";
import BlogAuthorInfo from "@/components/blog/BlogAuthorInfo";
import BlogTags from "@/components/blog/BlogTags";
import ShareButtons from "@/components/blog/ShareButtons";
import ReadingProgressBar from "@/components/blog/ReadingProgressBar";
import { translateCategory } from "@/lib/blog/categories";
import { SITE_BASE_URL } from "@/lib/config";

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

// Optimize description to max 155 characters (Google SERP limit)
function optimizeDescription(text: string): string {
  if (text.length <= 155) return text;
  const trimmed = text.substring(0, 155);
  const lastSpace = trimmed.lastIndexOf(' ');
  return lastSpace > 120 ? trimmed.substring(0, lastSpace) + '...' : trimmed + '...';
}

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug, locale);

  if (!article) {
    return {
      title: locale === 'en' ? 'Article not found' : locale === 'es' ? 'Artículo no encontrado' : locale === 'pt' ? 'Artigo não encontrado' : 'Article non trouvé',
    };
  }

  const absoluteImageUrl = new URL(article.image, SITE_BASE_URL).toString();
  const absoluteUrl = `${SITE_BASE_URL}/${locale}/blog/${slug}`;

  return {
    title: article.title,
    description: optimizeDescription(article.excerpt),
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages: {
        fr: `/fr/blog/${slug}`,
        en: `/en/blog/${slug}`,
        es: `/es/blog/${slug}`,
        pt: `/pt/blog/${slug}`,
        "x-default": `/fr/blog/${slug}`,
      },
    },
    openGraph: {
      title: article.title,
      description: optimizeDescription(article.excerpt),
      url: absoluteUrl,
      siteName: 'Biloki',
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      locale: locale,
      type: 'article',
      publishedTime: article.date,
      modifiedTime: article.updatedDate || article.date,
      authors: article.author ? [article.author.name] : ['Biloki'],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: optimizeDescription(article.excerpt),
      images: [absoluteImageUrl],
      creator: article.author?.linkedin ? '@biloki' : undefined,
    },
  };
}

export default async function BlogArticlePage({
  params,
}: BlogArticlePageProps) {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug, locale);
  const allArticles = getArticlesForLocale(locale);

  if (!article) {
    notFound();
  }

  // Default author if not specified
  const defaultAuthorByLocale: Record<string, { name: string; role: string; avatar: string; bio: string }> = {
    fr: {
      name: "Équipe Biloki",
      role: "Expert en location saisonnière",
      avatar: "/images/equipe/Sebastien.png",
      bio: "L'équipe Biloki partage ses connaissances pour aider les conciergeries à optimiser leur gestion."
    },
    en: {
      name: "Biloki Team",
      role: "Short-term rental expert",
      avatar: "/images/equipe/Sebastien.png",
      bio: "The Biloki team shares its knowledge to help concierge services optimize their management."
    },
    es: {
      name: "Equipo Biloki",
      role: "Experto en alquiler vacacional",
      avatar: "/images/equipe/Sebastien.png",
      bio: "El equipo de Biloki comparte su conocimiento para ayudar a las consejerías a optimizar su gestión."
    },
    pt: {
      name: "Equipa Biloki",
      role: "Especialista em arrendamento de curta duração",
      avatar: "/images/equipe/Sebastien.png",
      bio: "A equipa Biloki partilha o seu conhecimento para ajudar as conciergeries a otimizar a sua gestão."
    },
  };

  const defaultAuthor = defaultAuthorByLocale[locale] || defaultAuthorByLocale.fr;

  const author = article.author || defaultAuthor;
  const currentUrl = `${SITE_BASE_URL}/${locale}/blog/${slug}`;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });

  const breadcrumbLabels = {
    fr: { home: 'Accueil', blog: 'Blog' },
    en: { home: 'Home', blog: 'Blog' },
    es: { home: 'Inicio', blog: 'Blog' },
    pt: { home: 'Início', blog: 'Blog' }
  }[locale] || { home: 'Accueil', blog: 'Blog' };

  // Calculate word count from article content (strip HTML)
  const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '');
  const wordCount = stripHtml(article.content).trim().split(/\s+/).length;
  
  // Build absolute URL with correct domain
  const absoluteUrl = `${SITE_BASE_URL}/${locale}/blog/${slug}`;

  // Schema.org BlogPosting structured data
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    image: new URL(article.image, SITE_BASE_URL).toString(),
    datePublished: article.date,
    dateModified: article.updatedDate || article.date,
    author: {
      "@type": "Person",
      name: author.name,
      url: `${SITE_BASE_URL}/${locale}`
    },
    publisher: {
      "@type": "Organization",
      name: "Biloki",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_BASE_URL}/images/logo.png`
      }
    },
    description: optimizeDescription(article.excerpt),
    articleBody: stripHtml(article.content).substring(0, 5000),
    wordCount: wordCount,
    timeRequired: `PT${article.readTime.replace(/\D/g, '')}M`
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      
      {/* FAQ Schema for featured snippets on rental profitability queries */}
      {slug === 'rentabilite-location-courte-duree-2026' && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "La location courte durée est-elle rentable ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Oui, la location courte durée peut être très rentable, avec des rendements nets de 8-15% annuels selon les stratégies d'optimisation. Cependant, cela dépend fortement des frais d'exploitation, du taux d'occupation, et des configurations fiscales (LMNP vs BIC)."
              }
            },
            {
              "@type": "Question",
              "name": "Quelle est la différence de rentabilité entre location courte durée et location longue durée ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "La LCD offre des rendements 50-200% supérieurs à la location traditionnelle, avec un yield locatif de 10-15% vs 3-5% en LT. Mais les charges d'exploitation (ménage, linge, maintenance) sont proportionnellement plus élevées."
              }
            },
            {
              "@type": "Question",
              "name": "Quel impact ont les réformes fiscales 2025-2026 sur la rentabilité ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Les réformes 2025-2026 réduisent les avantages fiscaux antérieurs, augmentent les charges sociales en BIC, et imposent des plafonds de revenus. Cela diminue la rentabilité de 2-4 points mais reste intéressant en LMNP ou via des stratégies de diversification."
              }
            },
            {
              "@type": "Question",
              "name": "Quelles sont les meilleures stratégies pour maximiser la rentabilité en LCD ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Les meilleures stratégies incluent : optimiser le taux d'occupation (85%+ minimal), automatiser la gestion avec des outils, réduire les charges (mutualisation, services externalisés), diversifier les canaux de distribution, et adapter la tarification dynamiquement."
              }
            }
          ]
        }) }} />
      )}
      
      {/* BreadcrumbList Schema for Google SERP breadcrumbs */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": breadcrumbLabels.home,
            "item": `${SITE_BASE_URL}/${locale}`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": breadcrumbLabels.blog,
            "item": `${SITE_BASE_URL}/${locale}/blog`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": article.title,
            "item": `${SITE_BASE_URL}/${locale}/blog/${slug}`
          }
        ]
      }) }} />
      
      <ReadingProgressBar />
      <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: breadcrumbLabels.home, href: `/${locale}` },
              { label: breadcrumbLabels.blog, href: `/${locale}/blog` },
              { label: article.title }
            ]}
          />

          {/* 3-column layout: Related Articles | Article | TOC */}
          <div className="flex gap-6 xl:gap-8 items-start" style={{ overflow: 'visible' }}>

            {/* Left: Related Articles (Desktop only) */}
            <div className="hidden lg:block lg:w-[260px] xl:w-[280px] flex-shrink-0 sticky top-20 self-start">
              <BlogRelatedArticles 
                currentSlug={slug}
                articles={allArticles}
                locale={locale}
                relatedSlugs={article.relatedSlugs}
              />
            </div>

            {/* Center: Article Content */}
            <article className="flex-1 min-w-0">
              {/* Mobile TOC Accordion */}
              <div className="lg:hidden mb-6">
                <BlogTableOfContents content={article.content} locale={locale} variant="mobile" />
              </div>

              {/* Article Header */}
              <header className="mb-8">
                {/* Category badge and meta */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="bg-blue-100 text-primary px-3 py-1 rounded-full font-semibold">
                    {translateCategory(article.category, locale)}
                  </span>
                  <span>{formatDate(article.date)}</span>
                  <span>• {article.readTime}</span>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {article.title}
                </h1>

                {/* Excerpt */}
                <p className="text-xl text-gray-700 leading-relaxed mb-8">
                  {article.excerpt}
                </p>

                {/* Author Info */}
                <BlogAuthorInfo
                  author={author}
                  date={article.date}
                  updatedDate={article.updatedDate}
                  readTime={article.readTime}
                  locale={locale}
                />
              </header>

              {/* Article Content */}
              <div
                className="prose prose-lg prose-blue max-w-none 
                  prose-headings:scroll-mt-24 
                  prose-headings:group
                  prose-h2:relative prose-h2:flex prose-h2:items-center
                  prose-h3:relative prose-h3:flex prose-h3:items-center"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <BlogTags tags={article.tags} locale={locale} />
              )}

              {/* Share Buttons */}
              <ShareButtons 
                title={article.title}
                url={currentUrl}
                locale={locale}
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

            {/* Right: Table of Contents only (Desktop) */}
            <div className="hidden lg:block lg:w-[300px] xl:w-[320px] flex-shrink-0">
              <BlogTableOfContents content={article.content} locale={locale} variant="desktop" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
