"use client";

import { useState } from "react";
import Link from "next/link";
import { KeyRound, WifiOff, Bell, LayoutGrid, Headset, X, Star, ChevronDown } from "lucide-react";

const BENEFIT_ICONS = [KeyRound, LayoutGrid, WifiOff, Bell];

export interface IntegrationPageViewModel {
  slug: string;
  name: string;
  categoryLabel: string;
  logo: string;
  heroImage: string;
  benefitsImage: string;
  tagline: string;
  heroDescription: string;
  benefits: { title: string; description: string }[];
  howItWorks: { title: string; description: string; image: string }[];
  testimonial: { quote: string; name: string; role: string; photo: string };
  beforeAfter: { before: string[]; after: string[] };
  support: {
    description: string;
    items: { label: string; value: string; href?: string }[];
  };
  labels: {
    marketplaceLabel: string;
    tryFree: string;
    bookDemo: string;
    beforeTitle: string;
    afterTitle: string;
    howItWorksTitle: string;
    benefitsTitle: string;
    supportTitle: string;
    midCta: string;
    finalCtaTitle: string;
    finalCtaDescription: string;
  };
}

export default function IntegrationPageContent({ data }: { data: IntegrationPageViewModel }) {
  const [activeStep, setActiveStep] = useState(0);
  const { labels } = data;

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <div className="max-w-5xl mx-auto px-6 pt-44 md:pt-52 pb-20">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8 flex items-center flex-wrap gap-1">
          <Link href="/fonctionnalites/marketplace-api" className="hover:text-primary">
            {labels.marketplaceLabel}
          </Link>
          <span>/</span>
          <span>{data.categoryLabel}</span>
          <span>/</span>
          <span className="text-gray-900 font-medium">{data.name}</span>
        </nav>

        {/* Hero */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 mb-12 text-center">
          <div className="flex items-center justify-center gap-6 md:gap-10 mb-8">
            {/* TODO photo : remplacer par le visuel hero fourni par le partenaire */}
            <img
              src={data.heroImage}
              alt={data.name}
              className="h-20 md:h-28 w-auto max-w-[220px] object-contain"
            />
            <X className="h-6 w-6 md:h-8 md:w-8 text-gray-400 flex-shrink-0" strokeWidth={2.5} />
            <img
              src="/logos/biloki-logo-full.png"
              alt="Biloki"
              className="h-20 md:h-28 w-auto max-w-[220px] object-contain"
            />
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 max-w-3xl mx-auto">
            {data.tagline}
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {data.heroDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/commencer-gratuitement"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary text-white font-semibold hover:opacity-90 transition"
            >
              {labels.tryFree}
            </Link>
            <Link
              href="/reserver-demo"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-blue-50 transition"
            >
              {labels.bookDemo}
            </Link>
          </div>
        </div>

        {/* Testimonial */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 mb-12 flex items-start gap-6">
          <img
            src={data.testimonial.photo}
            alt={data.testimonial.name}
            className="aspect-square h-24 w-24 md:h-28 md:w-28 rounded-xl object-cover flex-shrink-0"
          />
          <div>
            <p className="text-gray-800">&laquo; {data.testimonial.quote} &raquo;</p>
            <p className="mt-4 font-semibold text-gray-900">{data.testimonial.name}</p>
            <p className="text-sm text-gray-500">{data.testimonial.role}</p>
          </div>
        </div>

        {/* Before / After */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gray-50 rounded-2xl p-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
              {labels.beforeTitle}
            </h2>
            <div className="flex flex-col gap-3">
              {data.beforeAfter.before.map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-xl p-4 flex items-center gap-4"
                >
                  <div className="h-8 w-8 rounded-full bg-gray-900 text-white flex items-center justify-center flex-shrink-0">
                    <X className="h-4 w-4" />
                  </div>
                  <p className="text-gray-900">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-blue-50 rounded-2xl p-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
              {labels.afterTitle}
            </h2>
            <div className="flex flex-col gap-3">
              {data.beforeAfter.after.map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-xl p-4 flex items-center gap-4"
                >
                  <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
                    <Star className="h-4 w-4" />
                  </div>
                  <p className="text-gray-900">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mid-page CTA */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8 mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-semibold text-gray-900 text-center sm:text-left">
            {labels.midCta}
          </p>
          <Link
            href="/reserver-demo"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:opacity-90 transition whitespace-nowrap"
          >
            {labels.bookDemo}
          </Link>
        </div>

        {/* How it works */}
        <div className="bg-white border border-gray-200 rounded-2xl mb-12 overflow-hidden grid grid-cols-1 md:grid-cols-2">
          <div className="relative self-stretch order-2 md:order-1 bg-gray-50 flex items-center justify-center p-6 md:p-10">
            <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-primary flex items-center justify-center shadow-md">
              <img src="/logos/logo-icon-white.svg" alt="Biloki" className="h-4 w-4" />
            </div>
            <div className="h-72 md:h-80 w-full flex items-center justify-center">
              <img
                key={data.howItWorks[activeStep].image}
                src={data.howItWorks[activeStep].image}
                alt={data.howItWorks[activeStep].title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
          <div className="p-8 md:p-12 order-1 md:order-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{labels.howItWorksTitle}</h2>
            <div className="flex flex-col gap-3">
              {data.howItWorks.map((step, index) => {
                const isOpen = activeStep === index;
                return (
                  <div key={step.title} className="rounded-xl border border-gray-200 px-5 py-4">
                    <button
                      type="button"
                      onClick={() => setActiveStep(index)}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 text-left font-semibold text-gray-900"
                    >
                      <span>{step.title}</span>
                      <ChevronDown
                        className={`h-5 w-5 flex-shrink-0 text-gray-400 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <p className="mt-3 text-gray-600 text-sm">{step.description}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white border border-gray-200 rounded-2xl mb-12 overflow-hidden grid grid-cols-1 md:grid-cols-2">
          <div className="h-64 md:h-auto">
            <img
              src={data.benefitsImage}
              alt={data.name}
              className="h-full w-full object-cover object-[center_65%]"
            />
          </div>
          <div className="p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{labels.benefitsTitle}</h2>
            <div className="flex flex-col gap-6">
              {data.benefits.map((benefit, index) => {
                const Icon = BENEFIT_ICONS[index % BENEFIT_ICONS.length];
                return (
                  <div key={benefit.title} className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-blue-50 text-primary flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                      <p className="text-gray-600 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{labels.supportTitle}</h2>
          <p className="text-gray-600 mb-6">{data.support.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {data.support.items.map((item) => {
              const content = (
                <div className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 h-full">
                  <Headset className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-gray-900">{item.label}</div>
                    <div className="text-sm text-gray-600">{item.value}</div>
                  </div>
                </div>
              );
              return item.href ? (
                <Link
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="hover:shadow-md transition-shadow rounded-xl"
                >
                  {content}
                </Link>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })}
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-white rounded-2xl p-12 border border-gray-200">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {labels.finalCtaTitle}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {labels.finalCtaDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/commencer-gratuitement"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary text-white font-semibold hover:opacity-90 transition"
              >
                {labels.tryFree}
              </Link>
              <Link
                href="/reserver-demo"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-blue-50 transition"
              >
                {labels.bookDemo}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
