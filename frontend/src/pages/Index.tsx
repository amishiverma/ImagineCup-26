import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { ComparisonSection } from "@/components/landing/ComparisonSection";
import { AhaMomentSection } from "@/components/landing/AhaMomentSection";
import { ImpactSection } from "@/components/landing/ImpactSection";
import { EnterpriseSection } from "@/components/landing/EnterpriseSection";
import { AudienceSection } from "@/components/landing/AudienceSection";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";
import { CursorEffect } from "@/components/landing/CursorEffect";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>ReturnIQ - AI-Powered Return Intelligence for Retail</title>
        <meta 
          name="description" 
          content="Turn product returns into clear business intelligence. Our AI explains why products are returned and tells brands exactly what to fix — automatically." 
        />
        <meta name="keywords" content="return intelligence, AI analytics, retail returns, product returns, e-commerce optimization" />
        <link rel="canonical" href="https://returniq.com" />
        
        {/* Open Graph */}
        <meta property="og:title" content="ReturnIQ - AI-Powered Return Intelligence" />
        <meta property="og:description" content="Turn product returns into clear business intelligence with AI-powered root cause analysis." />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ReturnIQ - AI-Powered Return Intelligence" />
        <meta name="twitter:description" content="Turn product returns into clear business intelligence with AI-powered root cause analysis." />
      </Helmet>
      
      <main className="min-h-screen bg-background relative">
        <CursorEffect />
        <Navbar />
        <HeroSection />
        <ProblemSection />
        <ComparisonSection />
        <AhaMomentSection />
        <ImpactSection />
        <EnterpriseSection />
        <AudienceSection />
        <CTASection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
