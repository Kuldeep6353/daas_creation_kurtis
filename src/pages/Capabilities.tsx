import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

const capabilities = [
  {
    title: "Stitching Excellence",
    items: [
      "130+ industrial sewing machines",
      "Overlock and chain stitch capabilities",
      "Precision pattern cutting",
      "Consistent stitch quality",
    ],
  },
  {
    title: "Design Production",
    items: [
      "Custom pattern development",
      "Sample creation and approval",
      "Design modification support",
      "Size grading expertise",
    ],
  },
  {
    title: "Finishing & Quality",
    items: [
      "Multi-stage quality inspection",
      "Pressing and ironing",
      "Packaging to specification",
      "Labeling and tagging",
    ],
  },
  {
    title: "Production Scale",
    items: [
      "10,000+ pieces monthly capacity",
      "Scalable workforce",
      "Bulk order specialization",
      "Consistent delivery timelines",
    ],
  },
];

const productTypes = [
  "Cotton Kurtis",
  "Rayon Kurtis",
  "Printed Kurtis",
  "Embroidered Kurtis",
  "Anarkali Styles",
  "Straight Cut Kurtis",
  "A-Line Kurtis",
  "Kaftan Styles",
];

const Capabilities = () => {
  return (
    <>
      <Helmet>
        <title>Manufacturing Capabilities | DAAS CREATION KURTIS - 130+ Machines</title>
        <meta
          name="description"
          content="Explore DAAS CREATION KURTIS manufacturing capabilities - 130+ machines, 10,000+ monthly capacity, bulk kurti production for brands and wholesalers."
        />
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4 animate-fade-up opacity-0">
                Capabilities
              </p>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 animate-fade-up opacity-0 [animation-delay:100ms]">
                Manufacturing Capabilities Built for Scale
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed animate-fade-up opacity-0 [animation-delay:200ms]">
                Our expanded facility and skilled workforce are designed to meet the demands 
                of bulk manufacturing while maintaining the quality your brand requires.
              </p>
            </div>
          </div>
        </section>

        {/* Capabilities Grid */}
        <section className="py-24">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {capabilities.map((capability, index) => (
                <div
                  key={capability.title}
                  className="p-8 border border-border bg-background animate-fade-up opacity-0"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-6">
                    {capability.title}
                  </h3>
                  <ul className="space-y-4">
                    {capability.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Types */}
        <section className="py-24 bg-secondary">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary-foreground mb-4">
                Product Types We Manufacture
              </h2>
              <p className="text-muted-foreground">
                Our versatile production line handles various kurti styles and fabrics
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {productTypes.map((product, index) => (
                <div
                  key={product}
                  className="bg-background p-6 text-center border border-border animate-fade-up opacity-0"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="text-foreground font-medium">{product}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-24">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Our Manufacturing Process
              </h2>
            </div>
            <div className="grid md:grid-cols-5 gap-8">
              {[
                { step: "01", title: "Design Review" },
                { step: "02", title: "Material Sourcing" },
                { step: "03", title: "Pattern & Cutting" },
                { step: "04", title: "Stitching" },
                { step: "05", title: "Quality & Delivery" },
              ].map((item, index) => (
                <div
                  key={item.step}
                  className="text-center animate-fade-up opacity-0"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-5xl font-heading font-bold text-secondary mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-primary">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-6">
              Ready to Discuss Your Requirements?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
              Share your production needs and let's explore how we can serve as your 
              manufacturing partner.
            </p>
            <Button asChild variant="heroOutline" size="xl" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link to="/contact">
                Submit Manufacturing Inquiry
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Capabilities;
