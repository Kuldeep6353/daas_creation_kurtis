import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Users, Handshake, Scale, Clock, Shield } from "lucide-react";

const reasons = [
  {
    icon: Building2,
    title: "Expanded Manufacturing Facility",
    description:
      "Our recently expanded unit houses over 130 machines, providing the capacity to handle large orders without compromising on quality or timelines.",
  },
  {
    icon: Users,
    title: "Skilled Workforce",
    description:
      "Our team of experienced craftspeople brings expertise and dedication to every piece they create, ensuring consistent quality across all orders.",
  },
  {
    icon: Handshake,
    title: "Partnership Approach",
    description:
      "We don't just take orders—we build relationships. Your success is our priority, and we work collaboratively to meet your specific needs.",
  },
  {
    icon: Scale,
    title: "Scalable Production",
    description:
      "From your first bulk order to regular large-scale production runs, we have the infrastructure to grow with your business.",
  },
  {
    icon: Clock,
    title: "Reliable Timelines",
    description:
      "We understand the importance of delivery schedules. Our streamlined processes ensure consistent, on-time delivery.",
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description:
      "Multi-stage quality checks at every production phase ensure that only the best pieces carry your brand name.",
  },
];

const clientTypes = [
  {
    title: "Clothing Brands",
    description: "Looking for reliable manufacturing partners to produce your kurti collections at scale.",
  },
  {
    title: "Wholesalers",
    description: "Seeking quality products in bulk quantities for distribution networks.",
  },
  {
    title: "Dealers & Brokers",
    description: "Connecting businesses with manufacturing capabilities they can trust.",
  },
  {
    title: "Large Businesses",
    description: "Enterprises requiring substantial production capacity for their apparel needs.",
  },
];

const WhyPartner = () => {
  return (
    <>
      <Helmet>
        <title>Why Partner With Us | DAAS CREATION KURTIS - Trusted Manufacturing</title>
        <meta
          name="description"
          content="Discover why brands choose DAAS CREATION KURTIS as their manufacturing partner - expanded facility, skilled workforce, reliable delivery, and quality assurance."
        />
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4 animate-fade-up opacity-0">
                Why Partner With Us
              </p>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 animate-fade-up opacity-0 [animation-delay:100ms]">
                Your Success Is Our Business
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed animate-fade-up opacity-0 [animation-delay:200ms]">
                We're not just a manufacturing facility—we're a partner committed to your 
                brand's growth and success. Here's what makes us different.
              </p>
            </div>
          </div>
        </section>

        {/* Reasons Grid */}
        <section className="py-24">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reasons.map((reason, index) => (
                <div
                  key={reason.title}
                  className="p-8 border border-border bg-background hover:border-primary/30 transition-all duration-300 animate-fade-up opacity-0"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <reason.icon className="h-10 w-10 text-primary mb-6" />
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Client Types */}
        <section className="py-24 bg-secondary">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary-foreground mb-4">
                Who We Work With
              </h2>
              <p className="text-muted-foreground">
                We serve businesses across the apparel industry looking for reliable 
                bulk manufacturing partners
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {clientTypes.map((client, index) => (
                <div
                  key={client.title}
                  className="bg-background p-6 border border-border animate-fade-up opacity-0"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                    {client.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {client.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Commitment */}
        <section className="py-24">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                Our Commitment to You
              </h2>
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  We believe in honest, transparent business relationships. No exaggerated 
                  claims, no unrealistic promises—just reliable manufacturing that you 
                  can count on.
                </p>
                <p>
                  When you partner with DAAS CREATION KURTIS, you're working with a team 
                  that understands the apparel industry and is committed to helping your 
                  business succeed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-primary">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-6">
              Let's Start a Conversation
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
              Tell us about your manufacturing needs and let's explore how we can 
              work together.
            </p>
            <Button asChild variant="heroOutline" size="xl" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link to="/contact">
                Contact Us Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default WhyPartner;
