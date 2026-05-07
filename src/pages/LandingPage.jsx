import { HeroSection } from "../sections/landing/HeroSection";
import { StatsStrip } from "../sections/landing/StatsStrip";
import { HowItWorksSection } from "../sections/landing/HowItWorksSection";
import { FeaturesSection } from "../sections/landing/FeaturesSection";
import { TestimonialsSection } from "../sections/landing/TestimonialsSection";
import { CTASection } from "../sections/landing/CTASection";

export const LandingPage = ({ onOpenApp }) => {
  return (
    <>
      <HeroSection onOpenApp={onOpenApp} />
      <StatsStrip />
      <HowItWorksSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection onOpenApp={onOpenApp} />
    </>
  );
};