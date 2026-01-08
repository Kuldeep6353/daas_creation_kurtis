import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CinematicHero } from "@/components/about/CinematicHero";
import { OurStory } from "@/components/about/OurStory";
import OurPeople from "@/components/about/ourpeople";

import { VideoSection } from "@/components/about/VideoSection";
import { ManufacturingPortfolio } from "@/components/about/ManufacturingPortfolio";
import { TeamSection } from "@/components/about/TeamSection";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";


const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | DAAS CREATION KURTIS - Premium B2B Kurti Manufacturing</title>
        <meta
          name="description"
          content="Discover DAAS CREATION KURTIS - a trusted family-run B2B women's kurti manufacturing unit with 130+ machines. Premium bulk production for brands, wholesalers, and dealers."
        />
      </Helmet>
      
      {/* Header overlays on cinematic hero */}
      <Header />
      
      {/* Cinematic Hero with Logo Animation */}
      <CinematicHero />
      
      {/* Our Story Section */}
      <OurStory />

      {/* Our People Section */}
      <OurPeople />
      
      {/* Full-width Video Section */}
      <VideoSection />
      
      {/* Manufacturing Portfolio */}
      <ManufacturingPortfolio />
      
      {/* Team / Direct Contact Section */}
      <TeamSection />
      
      {/* Final CTA */}
      <section className="py-24 bg-primary relative overflow-hidden">
        {/* Subtle edge lighting */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
        
        <div className="container mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary-foreground mb-6">
              Ready to Build a Manufacturing Partnership?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
              Whether you're an established brand or an emerging label, we're here to 
              support your growth with reliable, scalable production.
            </p>
            <Button 
              asChild 
              variant="heroOutline" 
              size="xl" 
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Link to="/contact">
                Start a Conversation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default About;
