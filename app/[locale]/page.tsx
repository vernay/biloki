import Hero from "@/components/sections/Hero";
import PartnersScroll from "@/components/sections/PartnersScroll";
import FeaturesSection from "@/components/sections/FeaturesSection";
import IntegrationsSection from "@/components/sections/IntegrationsSection";
import AISection from "@/components/sections/AISection";
import TeamSection from "@/components/sections/TeamSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
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
      <BenefitsSection />
      <AppBanner />
      <PricingCalculator />
      <CTASection />
    </main>
  );
}
