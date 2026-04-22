import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PHONE, PHONE_TEL, waLink } from "@/lib/contact";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const links = [
  { href: "#inventario", label: "Inventario" },
  { href: "#beneficios", label: "¿Por qué elegirme?" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#contacto", label: "Contacto" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/60"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="h-8 w-8 rounded-lg bg-foreground text-background grid place-items-center text-sm font-bold">
            AS
          </span>
          <span className="text-base">Alejandro Salcedo</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <a href={`tel:${PHONE_TEL}`}>
            <Button variant="ghost" size="sm" className="gap-2">
              <Phone className="h-4 w-4" /> {PHONE}
            </Button>
          </a>
          <a href={waLink("Hola Alejandro, vi tu sitio y me interesa información.")} target="_blank" rel="noreferrer">
            <Button variant="hero" size="sm">Contactar</Button>
          </a>
          <ThemeToggle />
          <Link to="/admin" className="text-xs text-muted-foreground hover:text-foreground ml-1" title="Panel">Admin</Link>
        </div>

        <div className="md:hidden flex items-center gap-1">
          <ThemeToggle />
          <button className="p-2" onClick={() => setOpen(!open)} aria-label="Menú">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-4 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm text-foreground/80 py-2"
              >
                {l.label}
              </a>
            ))}
            <a href={waLink("Hola Alejandro, vi tu sitio.")} target="_blank" rel="noreferrer">
              <Button variant="hero" className="w-full">Contactar</Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
