import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

interface PortfolioCategory {
  title: string;
  description: string;
  images: string[];
}


const portfolioCategories: PortfolioCategory[]= [
  {
    title: "Daily Wear Kurtis",
    description: "Comfortable, practical designs for everyday wear. Perfect for brands targeting working professionals and casual consumers.",
    images: ["/images/daily-wear-1.jpg",
            "/images/daily-wear-2.jpg",
            "/images/daily-wear-3.jpg",
            "/images/daily-wear-4.jpg",
            "/images/daily-wear-5.jpg",
            "/images/daily-wear-6.jpg",
            "/images/daily-wear-7.jpg"
            ],
  },
  {
    title: "Festive Kurtis",
    description: "Rich fabrics and intricate designs for celebrations. Ideal for premium festive collections and occasion wear lines.",
    images: ["/images/festive-kurtis-1.jpg",
            "/images/festive-kurtis-2.jpg",
            "/images/festive-kurtis-3.jpg"],
  },
  {
    title: "Embroidered Styles",
    description: "Traditional and contemporary embroidery work. Skilled artisans delivering detailed craftsmanship at scale.",
    images: ["/images/embroidered-wear-1.jpg",
            "/images/embroidered-wear-2.jpg",
            "/images/embroidered-wear-3.jpg",
            "/images/embroidered-wear-4.jpg",
            "/images/embroidered-wear-5.jpg",
            "/images/embroidered-wear-6.jpg",
            "/images/embroidered-wear-7.jpg"],
  },
  {
    title: "Printed / Casual Wear",
    description: "Modern prints and patterns for trendy collections. Quick turnaround on seasonal and trending designs.",
    images: [ "/images/daily-wear-2.jpg",
            "/images/daily-wear-3.jpg",
            "/images/daily-wear-4.jpg",
            "/images/daily-wear-5.jpg",],
  },
  {
    title: "Custom Brand Designs",
    description: "Your unique designs manufactured to specification. Full customization in fabric, sizing, and finishing.",
    images: ["/images/festive-kurtis-1.jpg",
            "/images/festive-kurtis-2.jpg",
            "/images/festive-kurtis-3.jpg",
            "/images/custom-designs-1.jpg",
            "/images/custom-designs-2.jpg",
            "/images/custom-designs-3.jpg"
            ],  
  },
];

export function ManufacturingPortfolio() {
  return (
    <section className="py-24 lg:py-32 bg-muted/30">
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
            Styles We Manufacture
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Manufacturing Portfolio
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore our production capabilities across various kurti styles. 
            Every category is fully customizable to match your brand requirements.
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-background border border-border overflow-hidden transition-all duration-500 card-glow"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden relative">
                <Swiper
                    modules={[Pagination]}
                    pagination={{ clickable: true }}
                    spaceBetween={0}
                    slidesPerView={1}
                    className="w-full h-full"
                  >
                    {category.images.map((img, i) => (
                      <SwiperSlide key={i}>
                        <img
                          src={img}
                          alt={`${category.title} ${i + 1}`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </SwiperSlide>
                    ))}
                </Swiper>

                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  {category.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {category.description}
                </p>
                <p className="text-xs text-accent italic mb-6">
                  Customizable in fabric, sizing, design, and bulk quantity.
                </p>
                <Button 
                  asChild 
                  variant="heroOutline" 
                  size="sm"
                  className="w-full group/btn"
                >
                  <Link to="/contact">
                    Discuss Manufacturing Requirements
                    <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            Looking for something specific? We can manufacture custom designs based on your brand requirements.
          </p>
          <Button asChild variant="heroGlow" size="xl">
            <Link to="/contact">
              Start a Partnership Discussion
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
