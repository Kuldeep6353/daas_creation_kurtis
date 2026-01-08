import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ServicesSection } from "@/components/home/ServicesSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>DAAS CREATION KURTIS | Premium Women's Kurti Manufacturing Partner</title>
        <meta
          name="description"
          content="DAAS CREATION KURTIS - Your trusted manufacturing partner for bulk women's kurti production. 130+ machines, skilled workforce, family-run excellence for brands and wholesalers."
        />
      </Helmet>
      <Layout>
        <HeroSection />
        <StatsSection />
        <AboutPreview />
        <ServicesSection />
        <CTASection />
      </Layout>
    </>
  );
};

export default Index;
