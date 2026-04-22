import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "María González",
    car: "Mazda CX-5 2022",
    quote: "Alejandro me asesoró desde el primer mensaje. Encontré exactamente el auto que buscaba y a un precio justo.",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Carlos Hernández",
    car: "BMW Serie 3 2022",
    quote: "Profesional, transparente y muy paciente. Me ayudó con el financiamiento y la entrega fue impecable.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Ana Ramírez",
    car: "Tesla Model 3 2023",
    quote: "Cero presión, mucha información y respuestas rápidas por WhatsApp. Repetiría la experiencia sin dudar.",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
  },
];

export function Testimonials() {
  return (
    <section id="testimonios" className="py-20 sm:py-28 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary">Testimonios</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">
            Lo que dicen mis clientes
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-7 bg-card rounded-2xl border border-border shadow-[var(--shadow-card)]"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-foreground text-foreground" />
                ))}
              </div>
              <p className="mt-4 text-foreground/90 leading-relaxed">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3 pt-5 border-t border-border">
                <img src={t.photo} alt={t.name} className="h-11 w-11 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.car}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
