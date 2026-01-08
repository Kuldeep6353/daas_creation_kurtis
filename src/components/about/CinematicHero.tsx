import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function CinematicHero() {
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();
  
  // Transform values for logo shrinking
  const logoScale = useTransform(scrollY, [0, 300], [1, 0.4]);
  const logoY = useTransform(scrollY, [0, 300], [0, -100]);
  const logoOpacity = useTransform(scrollY, [200, 350], [1, 0]);
  const overlayOpacity = useTransform(scrollY, [0, 200], [0.6, 0.8]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Video Background - replaced with static on mobile */}
        <div className="absolute inset-0">

           {/* Desktop / Laptop */}
           <video
             autoPlay
             muted
             loop
             playsInline
             className="hidden md:block w-full h-full object-cover"
           >
             <source src="/video/about-hero-landscape.mp4" type="video/mp4" />
           </video>
         
           {/* Mobile / Tablet */}
           <video
             autoPlay
             muted
             loop
             playsInline
             className="block md:hidden w-full h-full object-cover"
           >
             <source src="/video/about-hero-portrait.mp4" type="video/mp4" />
           </video>
         
        </div>
        <motion.div
               className="absolute inset-0 bg-gradient-to-b 
                       from-[hsl(352_81%_12%)] 
                       via-[hsl(352_81%_10%/0.85)] 
                       to-[hsl(0_65%_9%)]"
                      style={{ opacity: overlayOpacity }}
        />
      {/* Centered Large Logo */}
      <div className="relative h-full flex items-center justify-center">
        <motion.div
          className="text-center z-10"
          style={{
            scale: logoScale,
            y: logoY,
            opacity: logoOpacity,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-primary-foreground tracking-wider mb-4">
              DAAS CREATION
            </h1>
            <p className="text-lg md:text-2xl tracking-[0.5em] text-primary-foreground/80 uppercase">
              Kurtis
            </p>
          </motion.div>
          
          <motion.p
            className="mt-8 text-sm md:text-base text-primary-foreground/60 tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Premium Manufacturing Since Generations
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="w-6 h-10 border-2 border-primary-foreground/40 rounded-full flex justify-center">
          <motion.div
            className="w-1.5 h-3 bg-primary-foreground/60 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
