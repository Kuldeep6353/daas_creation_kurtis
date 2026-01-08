import { Factory, Scissors, Shield, Truck } from "lucide-react";

const services = [
  {
    icon: Factory,
    title: "Bulk Manufacturing",
    description:
      "Large-scale production capabilities with 130+ machines to meet your volume requirements efficiently.",
  },
  {
    icon: Scissors,
    title: "Custom Design Production",
    description:
      "Bring your designs to life with our skilled workforce and precise pattern-making expertise.",
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description:
      "Rigorous multi-stage quality checks ensuring every piece meets the highest standards.",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    description:
      "Consistent on-time delivery with transparent communication throughout the production cycle.",
  },
];

export function ServicesSection() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4 animate-fade-up opacity-0">
            Our Services
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground animate-fade-up opacity-0 [animation-delay:100ms]">
            Manufacturing Excellence
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="bg-background p-8 border border-border hover:border-primary/30 transition-all duration-300 group animate-fade-up opacity-0"
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              <service.icon className="h-10 w-10 text-primary mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
