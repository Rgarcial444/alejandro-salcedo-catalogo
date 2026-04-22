import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Roberto Sánchez",
    car: "Mazda CX-5 2022",
    quote: "Excelente atención desde el primer contacto. Alejandro me ayudó a encontrar elauto perfecto para mi familia. Totalmente recomiendo su servicio.",
  },
  {
    name: "Laura Martínez",
    car: "Toyota Corolla Híbrido 2021",
    quote: "Me sentía perdida buscando auto y Alejandro me guió en todo momento. Respondiómis dudas rápidamente y el proceso de compra fue muy transparente.",
  },
  {
    name: "Miguel Torres",
    car: "Volkswagen Jetta GLI 2023",
    quote: "Profesionalismo total. Me explicó cada detalle del auto y me ayudó a conseguir unbajón muy bueno. El auto llegó en perfectas condiciones.",
  },
  {
    name: "Patricia López",
    car: "Honda CR-V 2022",
    quote: "Segunda vez que compro con Alejandro. Su atención es consistente y siempre busca lo mejorpara sus clientes. Es mi asesor de confianza.",
  },
  {
    name: "Jorge Herrera",
    car: "Tesla Model 3 2023",
    quote: "Desde el primer mensaje sentí confianza. Me mantuvo informado en todo momento yel auto exceeded mis expectativas. ¡Gracias Alejandro!",
  },
  {
    name: "Sandra Ruiz",
    car: "BMW Serie 3 2022",
    quote: "Proceso muy fluido y sin complicaciones. Alejandro se encargó de todo el papeleo yapenas tuve que ir a la entrega. Repetiría sin pensarlo.",
  },
  {
    name: "Eduardo Campos",
    car: "Mazda CX-5 2022",
    quote: "Alejandro es honesto y no te pushing a comprar. Me dio opciones reales dentro de mi presupuesto y el auto quedó exactamente como lo wanted.",
  },
  {
    name: "Fernanda Aguirre",
    car: "Toyota Corolla Híbrido 2021",
    quote: "Mi primer auto y Alejandro hizo que fuera una experiencia increíble. Explicó todo superclario y ahora tengo mi auto soñado. ¡100% recomendada!",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

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
          {/* Navigation buttons */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === current ? "w-8 bg-foreground" : "w-2 bg-border hover:bg-foreground/50"
                  }`}
                  aria-label={`Ver testimonio ${i + 1}`}
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

          {/* Testimonial carousel */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="p-7 bg-card rounded-2xl border border-border shadow-[var(--shadow-card)]"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-foreground text-foreground" />
                  ))}
                </div>
                <p className="mt-4 text-foreground/90 leading-relaxed">{testimonials[current].quote}</p>
                <div className="mt-6 flex items-center gap-3 pt-5 border-t border-border">
                  <div className="h-11 w-11 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
                    {testimonials[current].name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{testimonials[current].name}</p>
                    <p className="text-xs text-muted-foreground">{testimonials[current].car}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile swipe hint */}
          <p className="mt-4 text-xs text-muted-foreground text-center sm:hidden">
            Desliza para ver más testimonios
          </p>
        </div>
      </div>
    </section>
  );
}