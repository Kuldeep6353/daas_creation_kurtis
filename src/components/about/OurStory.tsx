import { motion } from "framer-motion";
import { Factory, Users, Handshake, ShieldCheck } from "lucide-react";
import manufacturingImage from "@/assets/machines.jpeg";

const highlights = [
  {
    icon: Factory,
    title: "130+ Machines",
    description: "Industrial-scale production capacity",
  },
  {
    icon: Users,
    title: "Family-Run",
    description: "Personal commitment to every partnership",
  },
  {
    icon: Handshake,
    title: "B2B Exclusive",
    description: "No retail, no competition with partners",
  },
  {
    icon: ShieldCheck,
    title: "Quality First",
    description: "Rigorous standards on every piece",
  },
];

export function OurStory() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">
            Our Story
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Built on Family Values, Scaled for Industry
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
              <p>
                DAAS CREATION KURTIS began as a family vision to create a manufacturing 
                facility that prioritizes quality, reliability, and genuine partnership 
                with the businesses we serve.
              </p>
              <p>
                With our recently expanded facility, we now operate{" "}
                <span className="text-foreground font-semibold">over 130 manufacturing machines</span>, 
                enabling us to handle substantial bulk orders while maintaining 
                the quality standards that our partners depend on.
              </p>
              <p>
                Our focus is clear:{" "}
                <span className="text-foreground font-semibold">
                  we are exclusively a B2B manufacturing unit
                </span>
                . We do not operate retail channels or compete with the brands we serve. 
                Our entire operation is designed to support your success in the market.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-6 mt-12">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="group p-4 border border-border bg-muted/30 transition-all duration-300 card-glow"
                >
                  <item.icon className="h-6 w-6 text-primary mb-3" />
                  <h3 className="font-heading font-semibold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={manufacturingImage}
                alt="DAAS Creation manufacturing floor with skilled workers"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 -z-10" />
            <div className="absolute -top-6 -right-6 w-24 h-24 border-2 border-primary/20 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
