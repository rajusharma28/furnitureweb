import { motion } from "framer-motion";
import { useServices } from "@/hooks/use-content";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";

export default function Services() {
  const { data: services, isLoading } = useServices();

  return (
    <div className="min-h-screen py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-6 text-foreground">Our Services</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            From custom furniture to complete home renovations, our expert craftsmen deliver excellence in every project.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-64 w-full rounded-2xl" />
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-20 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services?.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="h-full overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-72 overflow-hidden">
                    <img 
                      src={service.imageUrl} 
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-wider text-white uppercase bg-primary rounded-full">
                        {service.skillCategory}
                      </div>
                      <h3 className="text-2xl font-bold text-white font-display">{service.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <p className="text-muted-foreground leading-relaxed mb-8">
                      {service.description}
                    </p>
                    <div className="flex gap-4">
                      <Button className="w-full bg-secondary hover:bg-secondary/90" asChild>
                        <Link href="/contact">Get Quote</Link>
                      </Button>
                      <Button variant="outline" className="w-full border-primary/20 text-primary hover:bg-primary/5" asChild>
                        <Link href={`/craftsmen?skill=${service.skillCategory}`}>Find Pros</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
