'use client';

import { useTranslations } from "next-intl";

export default function SalonContent() {
  const t = useTranslations("blog.salon");

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-50 to-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
            <a href="/" className="hover:text-primary">{t("breadcrumb.home")}</a>
            <span>/</span>
            <a href="/blog" className="hover:text-primary">{t("breadcrumb.blog")}</a>
            <span>/</span>
            <span className="text-gray-900">{t("breadcrumb.current")}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
            <span className="bg-blue-100 text-primary px-4 py-1.5 rounded-full font-semibold">
              {t("meta.category")}
            </span>
            <time dateTime="2026-02-05">{t("meta.date")}</time>
            <span>•</span>
            <span>{t("meta.readTime")}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {t("hero.title")}
          </h1>

          <p className="text-xl text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.raw("hero.lead") }} />
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Section 1 */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{t("sections.0.heading")}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">{t("sections.0.content")}</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {(t.raw("sections.0.items") as string[]).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>

        {/* Section 2 */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{t("sections.1.heading")}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {(t.raw("sections.1.items") as Array<{ title: string; description: string }>).map((item, idx) => (
              <div
                key={idx}
                className={`bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg ${idx === 4 ? "md:col-span-2" : ""}`}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Infos pratiques</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
            <p className="text-gray-700 mb-2"><strong>{t("infoPratique.date")}</strong></p>
            <p className="text-gray-700 mb-2"><strong>{t("infoPratique.lieu")}</strong></p>
            <p className="text-gray-700">{t("infoPratique.text")}</p>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-primary text-white p-8 rounded-[32px] shadow-xl">
          <h3 className="text-2xl font-bold mb-3">{t("cta.title")}</h3>
          <p className="mb-6 opacity-90">{t("cta.description")}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/reserver-demo" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-lg hover:shadow-xl transition-all duration-300">
              {t("cta.button1")}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-md">
              {t("cta.button2")}
            </a>
          </div>
        </div>
      </article>

      {/* Back to blog */}
      <div className="text-center mt-12 pt-8 border-t max-w-4xl mx-auto px-4 sm:px-6">
        <a href="/blog" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Retour au blog
        </a>
      </div>
    </main>
  );
}
