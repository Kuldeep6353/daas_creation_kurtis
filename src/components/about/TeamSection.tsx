import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle } from "lucide-react";
import kirpalImage from "@/assets/kirpal.jpeg";
import arjunbhaiImage from "@/assets/arjunbhai.jpg";
import rizwanbhaiImage from "@/assets/rizwanbhai.jpeg";

const teamMembers = [
  {
    name: "KIRPAL AHIR",
    role: "Managing Director",
    description: "Strategic partnerships and business development",
    phone: "+91 8469900642",
    email: "",
    image: kirpalImage,
  },
  {
    name: "ARJUNBHAI AHIR",
    role: "Operations Head",
    description: "Production planning and quality assurance",
    phone: "+91 9558170647",
    email: "",
    image: arjunbhaiImage,
  },
  {
    name: "RIZWANBHAI",
    role: "Production Coordinator",
    description: "Order management and delivery coordination",
    phone: "+91 9558170882",
    email: "",
    image: rizwanbhaiImage,
  },
];

export function TeamSection() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">
            Direct Contact
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Real People, Real Partnerships
          </h2>
          <p className="text-lg text-muted-foreground">
            We believe in transparent business relationships. Connect directly with 
            our leadership team for any manufacturing inquiries.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.role}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group text-center"
            >
              {/* Photo */}
              <div className="relative w-40 h-40 mx-auto mb-6 overflow-hidden rounded-full border-2 border-secondary transition-all duration-500 group-hover:border-primary group-hover:shadow-[0_0_20px_hsl(352_81%_18%/0.25)]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Info */}
              <h3 className="text-xl font-heading font-bold text-foreground mb-1">
                {member.name}
              </h3>
              <p className="text-sm uppercase tracking-widest text-accent mb-3">
                {member.role}
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                {member.description}
              </p>

              {/* Contact Icons */}
              <div className="flex items-center justify-center gap-4">
                <a
                  href={`tel:${member.phone.replace(/\s/g, '')}`}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center transition-all duration-300 hover:bg-primary hover:text-primary-foreground edge-glow-hover"
                  title="Call"
                >
                  <Phone className="h-4 w-4" />
                </a>
                <a
                  href={`https://wa.me/${member.phone.replace(/\s/g, '').replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center transition-all duration-300 hover:bg-primary hover:text-primary-foreground edge-glow-hover"
                  title="WhatsApp"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
                <a
                  href={`mailto:${member.email}`}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center transition-all duration-300 hover:bg-primary hover:text-primary-foreground edge-glow-hover"
                  title="Email"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16 pt-16 border-t border-border"
        >
          <p className="text-muted-foreground italic">
            "We're not a faceless factory. We're a family business committed to being 
            accessible, responsive, and accountable to every partner we work with."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
