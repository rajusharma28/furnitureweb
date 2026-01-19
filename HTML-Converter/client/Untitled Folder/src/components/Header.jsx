import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X, Hammer, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const links = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/craftsmen", label: "Find Craftsmen" },
    { href: "/register", label: "Join as Pro" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg group-hover:scale-105 transition-transform">
            <Hammer className="w-6 h-6" />
          </div>
          <span className="text-2xl font-display font-bold text-foreground">
            Craft<span className="text-primary">Home</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location === link.href 
                  ? "text-primary font-semibold" 
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button size="sm" className="ml-4 gap-2 bg-primary hover:bg-primary/90">
            <Phone className="w-4 h-4" />
            <a href="tel:+919876543210" className="no-underline">Call Now</a>
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 hover:bg-accent rounded-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-background border-b shadow-xl animate-in slide-in-from-top-5">
          <nav className="flex flex-col p-4 gap-2">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={cn(
                  "px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-accent",
                  location === link.href 
                    ? "bg-accent text-accent-foreground" 
                    : "text-foreground"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t px-4">
              <Button className="w-full gap-2" size="lg">
                <Phone className="w-4 h-4" />
                <a href="tel:+919876543210">Call Now</a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
