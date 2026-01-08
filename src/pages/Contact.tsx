import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: "+91 95581 70882",
    subtext: "Mon-Sat, 9am-6pm IST",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    details: "+91 88666 85571",
    subtext: "Quick response on WhatsApp",
  },
  {
    icon: Mail,
    title: "Email",
    details: "",
    subtext: "We respond within 24 hours",
  },
  {
    icon: MapPin,
    title: "Location",
    details: "A-317 to 330,3rd floor,Atria business zone,Near by asarva railway station, Naroda road, Ahmedabad-380025",
    subtext: "Ahmedabad, India",
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: "Monday - Saturday",
    subtext: "9:00 AM - 8:00 PM IST",
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    businessType: "",
    quantity: "",
    productType: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('inquiries')
        .insert({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          business_type: formData.businessType,
          quantity: formData.quantity,
          product_type: formData.productType,
          message: formData.message,
        });

      if (error) throw error;

      toast({
        title: "Inquiry Submitted Successfully",
        description: "Thank you for reaching out. Our team will contact you within 24 hours.",
      });
      
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        businessType: "",
        quantity: "",
        productType: "",
        message: "",
      });
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your inquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Helmet>
        <title>Partner With Us | DAAS CREATION KURTIS - Manufacturing Inquiry</title>
        <meta
          name="description"
          content="Contact DAAS CREATION KURTIS for bulk kurti manufacturing inquiries. Partner with us for quality women's kurti production - brands, wholesalers, dealers, and brokers welcome."
        />
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="py-24 bg-muted/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-accent mb-4">
                Partner With Us
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6">
                Let's Build Something Together
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you're a clothing brand, wholesaler, dealer, or broker, we're ready to 
                explore how DAAS CREATION KURTIS can serve as your trusted manufacturing partner.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Grid */}
        <section className="py-24">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-1"
              >
                <h2 className="text-2xl font-heading font-bold text-foreground mb-8">
                  Get In Touch
                </h2>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex gap-4 group"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-sm flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                        <item.icon className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                        <p className="text-foreground">{item.details}</p>
                        <p className="text-sm text-muted-foreground">{item.subtext}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Trust note */}
                <div className="mt-10 p-6 bg-muted/50 border-l-4 border-primary">
                  <p className="text-sm text-muted-foreground italic">
                    "Every inquiry is handled personally by our team. We respond to all 
                    manufacturing inquiries within 24 hours."
                  </p>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-2"
                id="inquiry-form"
              >
                <div className="bg-background border border-border p-8 lg:p-12 shadow-lg">
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                    Manufacturing Inquiry Form
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Tell us about your manufacturing requirements. This form is designed 
                    exclusively for B2B inquiries.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Full name"
                          className="transition-all duration-300 focus:shadow-[0_0_15px_hsl(352_81%_18%/0.15)]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company / Brand Name *</Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          required
                          placeholder="Your company or brand name"
                          className="transition-all duration-300 focus:shadow-[0_0_15px_hsl(352_81%_18%/0.15)]"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="you@company.com"
                          className="transition-all duration-300 focus:shadow-[0_0_15px_hsl(352_81%_18%/0.15)]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone / WhatsApp *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="+91 XXXXX XXXXX"
                          className="transition-all duration-300 focus:shadow-[0_0_15px_hsl(352_81%_18%/0.15)]"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="businessType">Business Type *</Label>
                        <select
                          id="businessType"
                          name="businessType"
                          value={formData.businessType}
                          onChange={handleChange}
                          required
                          className="flex h-10 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all duration-300 focus:shadow-[0_0_15px_hsl(352_81%_18%/0.15)]"
                        >
                          <option value="">Select your business type</option>
                          <option value="brand">Clothing Brand</option>
                          <option value="wholesaler">Wholesaler</option>
                          <option value="dealer">Dealer</option>
                          <option value="broker">Broker</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="quantity">Estimated Monthly Quantity *</Label>
                        <select
                          id="quantity"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleChange}
                          required
                          className="flex h-10 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all duration-300 focus:shadow-[0_0_15px_hsl(352_81%_18%/0.15)]"
                        >
                          <option value="">Select quantity range</option>
                          <option value="500-1000">500 - 1,000 pieces</option>
                          <option value="1000-3000">1,000 - 3,000 pieces</option>
                          <option value="3000-5000">3,000 - 5,000 pieces</option>
                          <option value="5000-10000">5,000 - 10,000 pieces</option>
                          <option value="10000+">10,000+ pieces</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="productType">Product Type / Style Interest</Label>
                      <select
                        id="productType"
                        name="productType"
                        value={formData.productType}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all duration-300 focus:shadow-[0_0_15px_hsl(352_81%_18%/0.15)]"
                      >
                        <option value="">Select product type</option>
                        <option value="daily-wear">Daily Wear Kurtis</option>
                        <option value="festive">Festive Kurtis</option>
                        <option value="embroidered">Embroidered Styles</option>
                        <option value="printed">Printed / Casual Wear</option>
                        <option value="custom">Custom Brand Designs</option>
                        <option value="multiple">Multiple Categories</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message / Requirements *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell us about your requirements - product styles, fabrics, customization needs, timelines, or any specific questions..."
                        className="transition-all duration-300 focus:shadow-[0_0_15px_hsl(352_81%_18%/0.15)]"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      variant="heroGlow" 
                      size="xl" 
                      className="w-full md:w-auto"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Manufacturing Inquiry"}
                    </Button>
                    
                    <p className="text-xs text-muted-foreground mt-4">
                      By submitting this form, you agree to be contacted by our team regarding 
                      your manufacturing inquiry. All information is kept confidential.
                    </p>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trust Footer */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <p className="text-primary-foreground/90 text-lg font-heading">
              "A serious Indian manufacturing brand built for long-term global partnerships."
            </p>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Contact;
