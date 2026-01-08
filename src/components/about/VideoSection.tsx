import { motion } from "framer-motion";

export function VideoSection() {
  return (
    <section className="relative h-[70vh] lg:h-[80vh] overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=2000"
        >
          <source 
            src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761" 
            type="video/mp4" 
          />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(352_81%_10%/0.9)] via-[hsl(352_81%_12%/0.75)] to-[hsl(0_65%_9%/0.85)]" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-4xl"
          >
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-sm uppercase tracking-[0.4em] text-primary-foreground/60 mb-6"
            >
              Manufacturing at Scale
            </motion.p>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-primary-foreground leading-tight mb-8">
              130+ Machines.
              <br />
              <span className="text-primary-foreground/80">Built for Scale.</span>
              <br />
              <span className="text-secondary">Trusted for Quality.</span>
            </h2>

            <motion.div
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: "100px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="h-0.5 bg-secondary"
            />
          </motion.div>
        </div>
      </div>

      {/* Subtle edge lighting at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
    </section>
  );
}
