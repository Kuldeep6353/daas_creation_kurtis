import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import fabricImage from "@/assets/fabric-samples.jpg";

export function AboutPreview() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative animate-fade-up opacity-0 [animation-delay:100ms]">
            <div className="aspect-square overflow-hidden">
              <img
                src={fabricImage}
                alt="Premium fabric samples for kurti manufacturing"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary -z-10" />
          </div>

          {/* Content */}
          <div className="animate-fade-up opacity-0 [animation-delay:200ms]">
            <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">
              About Us
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
              A Legacy of Quality Manufacturing
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              DAAS CREATION KURTIS is a family-run manufacturing business dedicated 
              to producing premium women's kurtis for brands and businesses across India. 
              With our recently expanded facility housing over 130 machines, we combine 
              traditional craftsmanship with modern manufacturing efficiency.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our focus is exclusively on bulk manufacturing—no retail, no compromises. 
              We partner with clothing brands, wholesalers, dealers, and brokers who 
              value reliability, quality, and long-term relationships.
            </p>
            <Button asChild variant="outline" size="lg">
              <Link to="/about">
                Learn More About Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
