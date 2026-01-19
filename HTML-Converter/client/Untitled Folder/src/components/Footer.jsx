import { Link } from "wouter";
import { Hammer, Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground">
                <Hammer className="w-6 h-6" />
              </div>
              <span className="text-2xl font-display font-bold text-white">
                Craft<span className="text-primary">Home</span>
              </span>
            </Link>
            <p className="text-secondary-foreground/70 leading-relaxed">
              Your trusted partner for home renovations, custom furniture, and professional craftsmanship. Verified experts at your doorstep.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Our Services", href: "/services" },
                { label: "Find Craftsmen", href: "/craftsmen" },
                { label: "Join as Professional", href: "/register" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-secondary-foreground/70 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {[
                "Modular Kitchens",
                "Custom Wardrobes",
                "Furniture Design",
                "Home Renovation",
                "Interior Decor",
              ].map((service) => (
                <li key={service} className="text-secondary-foreground/70">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-secondary-foreground/70">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span>123 Craft Lane, Workshop District,<br />Creative City, 110001</span>
              </li>
              <li className="flex items-center gap-3 text-secondary-foreground/70">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+919876543210" className="hover:text-primary transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-3 text-secondary-foreground/70">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:hello@crafthome.com" className="hover:text-primary transition-colors">hello@crafthome.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-sm text-secondary-foreground/50">
          © {new Date().getFullYear()} CraftHome. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
