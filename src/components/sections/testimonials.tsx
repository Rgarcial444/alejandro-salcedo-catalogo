import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Roberto Sánchez",
    car: "Mazda CX-5 2022",
    quote:
      "Excelente atención desde el primer contacto. Alejandro me ayudó a encontrar el auto perfecto para mi familia. Totalmente recomiendo su servicio.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Laura Martínez",
    car: "Toyota Corolla Híbrido 2021",
    quote:
      "Me sentía perdida buscando auto y Alejandro me guió en todo momento. Respondió mis dudas rápidamente y el proceso de compra fue muy transparente.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Miguel Torres",
    car: "Volkswagen Jetta GLI 2023",
    quote:
      "Profesionalismo total. Me explicó cada detalle del auto y me ayudó a conseguir un muy buen precio. El auto llegó en perfectas condiciones.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Patricia López",
    car: "Honda CR-V 2022",
    quote:
      "Segunda vez que compro con Alejandro. Su atención es consistente y siempre busca lo mejor para sus clientes. Es mi asesor de confianza.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Jorge Herrera",
    car: "Tesla Model 3 2023",
    quote:
      "Desde el primer mensaje sentí confianza. Me mantuvo informado en todo momento y el auto excedió mis expectativas. ¡Gracias Alejandro!",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Sandra Ruiz",
    car: "BMW Serie 3 2022",
    quote:
      "Proceso muy fluido y sin complicaciones. Alejandro se encargó de todo el papeleo y apenas tuve que ir a la entrega. Repetiría sin pensarlo.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Eduardo Campos",
    car: "Mazda CX-5 2022",
    quote:
      "Alejandro es honesto y no te push a comprar. Me dio opciones reales dentro de mi presupuesto y el auto quedó exactamente como lo wanted.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Fernanda Aguirre",
    car: "Toyota Corolla Híbrido 2021",
    quote:
      "Mi primer auto y Alejandro hizo que fuera una experiencia increíble. Explicó todo super claro y ahora tengo mi auto soñado. ¡100% recomendada!",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [shuffledTestimonials, setShuffledTestimonials] = useState(testimonials);

  useEffect(() => {
    setShuffledTestimonials(shuffleArray(testimonials));
  }, []);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(shuffledTestimonials.length / itemsPerPage);

  const prev = () => setCurrent((c) => (c === 0 ? totalPages - 1 : c - 1));
  const next = () => setCurrent((c) => (c === totalPages - 1 ? 0 : c + 1));

  const visibleTestimonials = useMemo(() => {
    const start = current * itemsPerPage;
    return shuffledTestimonials.slice(start, start + itemsPerPage);
  }, [current, shuffledTestimonials]);

  return (
    <section id="testimonios" className="py-20 sm:py-28 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary">Testimonios</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">
            Lo que dicen mis clientes
          </h2>
        </div>

        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === current ? "w-8 bg-foreground" : "w-2 bg-border hover:bg-foreground/50"
                  }`}
                  aria-label={`Ver página ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="p-2 rounded-full border border-border bg-background hover:bg-accent transition"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                className="p-2 rounded-full border border-border bg-background hover:bg-accent transition"
                aria-label="Siguiente"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {visibleTestimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 bg-card rounded-2xl border border-border shadow-[var(--shadow-card)] flex flex-col"
                >
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className="h-4 w-4 fill-foreground text-foreground" />
                    ))}
                  </div>
                  <p className="mt-4 text-foreground/90 leading-relaxed flex-grow">
                    {t.quote}
                  </p>
                  <div className="mt-6 flex items-center gap-3 pt-5 border-t border-border">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="h-11 w-11 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.car}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}