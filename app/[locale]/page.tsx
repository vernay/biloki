import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import PartnersScroll from "@/components/sections/PartnersScroll";
import FeaturesSection from "@/components/sections/FeaturesSection";
import IntegrationsSection from "@/components/sections/IntegrationsSection";
import AISection from "@/components/sections/AISection";

export const metadata: Metadata = {
  title: "Biloki - Gagnez du temps dans la gestion de vos locations saisonnières",
  description: "Centralisez, automatisez et orchestrez le cycle de vie de vos séjours. PMS, Channel Manager, Messagerie IA pour conciergeries.",
};
import TeamSection from "@/components/sections/TeamSection";
import BenefitsIphoneSection from "@/components/sections/BenefitsIphoneSection";
import AppBanner from "@/components/sections/AppBanner";
import PricingCalculator from "@/components/sections/PricingCalculator";
import CTASection from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <PartnersScroll />
      <FeaturesSection />
      <IntegrationsSection />
      <AISection />
      <TeamSection />
      <BenefitsIphoneSection />
      <AppBanner />
      <PricingCalculator />
      <CTASection />
    </main>
  );
}
