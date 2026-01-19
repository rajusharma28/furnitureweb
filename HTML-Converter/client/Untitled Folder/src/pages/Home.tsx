import { motion } from "framer-motion";
import { ArrowRight, Star, Users, Briefcase, Award } from "lucide-react";
import { Link } from "wouter";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useServices, useTestimonials } from "@/hooks/use-content";

export default function Home() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);
  const { data: services } = useServices();
  const { data: testimonials } = useTestimonials();

  // Hero Slides
  const slides = [
    {
      title: "Custom Furniture That Tells a Story",
      desc: "Handcrafted by expert carpenters to fit your unique style and space.",
      image: "https://images.unsplash.com/photo-1538688536322-a290f84859ce?q=80&w=2070&auto=format&fit=crop", /* Interior design furniture */
      cta: "Explore Designs"
    },
    {
      title: "Modular Kitchens for Modern Living",
      desc: "Ergonomic, stylish, and durable kitchen solutions tailored for you.",
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=2168&auto=format&fit=crop", /* Modern kitchen */
      cta: "Plan Your Kitchen"
    },
    {
      title: "Wardrobes Built for Organization",
      desc: "Maximize storage with custom sliding and walk-in wardrobe designs.",
      image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=2070&auto=format&fit=crop", /* Wardrobe closet */
      cta: "Get a Quote"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden bg-gray-900" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div key={index} className="relative flex-[0_0_100%] min-w-0">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-black/50" />
              </div>
              <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-start text-white max-w-4xl pt-20">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight"
                >
                  {slide.title}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl"
                >
                  {slide.desc}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex gap-4"
                >
                  <Button size="lg" className="text-base h-12 px-8" asChild>
                    <Link href="/services">{slide.cta} <ArrowRight className="ml-2 w-5 h-5" /></Link>
                  </Button>
                  <Button size="lg" variant="outline" className="text-base h-12 px-8 bg-transparent text-white border-white hover:bg-white hover:text-black">
                    Contact Us
                  </Button>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Counters */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Users, count: "500+", label: "Happy Clients" },
              { icon: Briefcase, count: "15+", label: "Years Experience" },
              { icon: Award, count: "100+", label: "Verified Pros" },
              { icon: Star, count: "4.9", label: "Average Rating" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <stat.icon className="w-8 h-8 opacity-80" />
                <div className="text-4xl font-bold font-display">{stat.count}</div>
                <div className="text-sm opacity-90 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4">
              Craftsmanship for Every Corner
            </h2>
            <p className="text-muted-foreground text-lg">
              Whether you need a quick fix or a complete renovation, our experts deliver quality that lasts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services?.slice(0, 6).map((service) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow duration-300 overflow-hidden group border-none shadow-md">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={service.imageUrl} 
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                      <h3 className="text-2xl font-bold text-white font-display">{service.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                      {service.description}
                    </p>
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors border-primary/20" asChild>
                      <Link href="/services">Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4">
              What Our Clients Say
            </h2>
            <p className="text-muted-foreground text-lg">
              Don't just take our word for it. Here's what homeowners like you have to say about our work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials?.map((t) => (
              <Card key={t.id} className="border-none shadow-lg bg-white relative">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-lg text-foreground italic mb-6 leading-relaxed">"{t.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl font-display">
                      {t.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{t.name}</h4>
                      <p className="text-sm text-muted-foreground">{t.role || "Homeowner"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        {/* Abstract background shape */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 -skew-x-12 translate-x-1/4" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">Ready to Transform Your Home?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Connect with our expert craftsmen today and bring your vision to life. Quality work, verified professionals.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="h-14 px-8 text-lg" asChild>
                  <Link href="/contact">Get a Free Quote</Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-white text-white hover:bg-white hover:text-black" asChild>
                  <Link href="/craftsmen">Find a Pro</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
