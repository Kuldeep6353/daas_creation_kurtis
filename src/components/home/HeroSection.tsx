import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-manufacturing.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="DAAS Creation manufacturing facility with premium kurtis"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-accent mb-6 animate-fade-up opacity-0 [animation-delay:100ms]">
            Premium Manufacturing Partner
          </p>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight mb-6 animate-fade-up opacity-0 [animation-delay:200ms]">
            Crafting Excellence in
            <span className="text-primary block mt-2">Women's Kurti Manufacturing</span>
          </h1>
          
          <p className="text-lg text-muted-foreground leading-relaxed mb-10 animate-fade-up opacity-0 [animation-delay:300ms]">
            A trusted family-run manufacturing unit with 130+ machines, delivering 
            quality bulk production for brands, wholesalers, and business partners 
            seeking reliability and scale.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up opacity-0 [animation-delay:400ms]">
            <Button asChild variant="hero" size="xl">
              <Link to="/contact">
                Start Manufacturing Inquiry
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="heroOutline" size="xl">
              <Link to="/capabilities">Explore Capabilities</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
