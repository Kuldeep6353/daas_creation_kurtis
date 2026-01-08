import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary-foreground mb-6 animate-fade-up opacity-0">
            Ready to Partner With Us?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 animate-fade-up opacity-0 [animation-delay:100ms]">
            Whether you're a clothing brand, wholesaler, dealer, or broker, 
            we're ready to discuss your bulk manufacturing needs. Let's build 
            a lasting partnership.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up opacity-0 [animation-delay:200ms]">
            <Button asChild variant="hero" size="xl">
              <Link to="/contact">
                Start Your Inquiry
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="heroOutline" size="xl">
              <Link to="/why-partner">Why Choose Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
