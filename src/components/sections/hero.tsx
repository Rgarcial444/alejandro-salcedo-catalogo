import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, ShieldCheck, Star, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { PulseBeam } from "@/components/ui/pulse-beams";
import { waLink } from "@/lib/contact";

const heroImages = [
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=900&q=80",
];

export function Hero() {
  return (
    <HeroHighlight containerClassName="min-h-screen pt-24 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-background/60 backdrop-blur text-xs text-muted-foreground"
          >
            <span className="h-2 w-2 rounded-full bg-[oklch(0.65_0.17_150)] animate-pulse" />
            Asesor automotriz · CDMX
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]"
          >
            Encuentra tu próximo auto con{" "}
            <Highlight>total confianza</Highlight>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed"
          >
            Inventario verificado, atención personalizada y contacto directo conmigo.
            Te acompaño desde la búsqueda hasta la entrega de tu vehículo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a href="#inventario">
              <span className="relative inline-block">
                <PulseBeam />
                <Button variant="hero" size="xl" className="relative">
                  Ver inventario <ArrowRight className="h-4 w-4" />
                </Button>
              </span>
            </a>
            <a href={waLink("Hola Alejandro, me interesa conocer tu inventario.")} target="_blank" rel="noreferrer">
              <Button variant="whatsapp" size="xl">
                <MessageCircle className="h-4 w-4" /> Contactar por WhatsApp
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-10 flex flex-wrap items-center gap-6 text-sm"
          >
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-foreground text-foreground" />
              <span className="font-medium">4.9/5</span>
              <span className="text-muted-foreground">+200 clientes</span>
            </div>
            <div className="h-5 w-px bg-border" />
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">100% verificados</span>
            </div>
            <div className="h-5 w-px bg-border hidden sm:block" />
            <div className="flex items-center gap-2">
              <Car className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">+50 unidades disponibles</span>
            </div>
          </motion.div>
        </div>

        {/* Image collage */}
        <div className="relative h-[500px] lg:h-[560px] hidden md:block">
          <motion.div
            initial={{ opacity: 0, x: 40, rotate: 4 }}
            animate={{ opacity: 1, x: 0, rotate: 2 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="absolute top-0 right-0 w-[78%] h-[62%] rounded-3xl overflow-hidden shadow-[var(--shadow-elegant)] border border-border"
          >
            <img src={heroImages[0]} alt="Mazda CX-5 premium" className="h-full w-full object-cover" loading="eager" decoding="async" fetchpriority="high" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -4 }}
            animate={{ opacity: 1, y: 0, rotate: -3 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="absolute bottom-0 left-0 w-[60%] h-[48%] rounded-3xl overflow-hidden shadow-[var(--shadow-elegant)] border border-border"
          >
            <img src={heroImages[1]} alt="BMW Serie 3" className="h-full w-full object-cover" loading="lazy" decoding="async" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="absolute bottom-12 right-6 bg-background/95 backdrop-blur border border-border rounded-2xl p-4 shadow-[var(--shadow-card)] w-56"
          >
            <p className="text-xs text-muted-foreground">Promedio de respuesta</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight">{"<"} 5 min</p>
            <div className="mt-3 flex -space-x-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-7 w-7 rounded-full border-2 border-background bg-gradient-to-br from-primary to-accent" />
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="absolute top-8 left-2 bg-foreground text-background rounded-2xl p-4 shadow-xl w-48"
          >
            <p className="text-xs opacity-70">Inventario verificado</p>
            <p className="mt-1 text-xl font-semibold">+50 autos</p>
            <p className="mt-1 text-xs opacity-70">Listos para entrega</p>
          </motion.div>
        </div>
      </div>
    </HeroHighlight>
  );
}
