import { motion } from "framer-motion";
import { CalendarCheck, HandCoins, Headphones, ShieldCheck, Sparkles, UserCheck } from "lucide-react";

const benefits = [
  { icon: UserCheck, title: "Atención personalizada", desc: "Trato directo conmigo en cada paso del proceso, sin intermediarios." },
  { icon: ShieldCheck, title: "Inventario verificado", desc: "Cada auto pasa por una revisión mecánica y documental completa." },
  { icon: Headphones, title: "Respuesta rápida", desc: "Te contesto en menos de 5 minutos por WhatsApp en horario laboral." },
  { icon: HandCoins, title: "Apoyo con financiamiento", desc: "Te ayudo a comparar opciones de crédito con las mejores tasas." },
  { icon: Sparkles, title: "Seguimiento postventa", desc: "Mi acompañamiento no termina con la entrega de tu auto." },
  { icon: CalendarCheck, title: "Citas flexibles", desc: "Agenda pruebas de manejo en horarios que se ajusten a ti." },
];

export function WhyMe() {
  return (
    <section id="beneficios" className="py-20 sm:py-28 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary">Por qué elegirme</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">
            Una experiencia de compra realmente diferente
          </h2>
          <p className="mt-3 text-muted-foreground">
            Como asesor independiente, mi prioridad es que encuentres el auto correcto, no cerrar una venta.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group p-6 bg-card rounded-2xl border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="h-11 w-11 rounded-xl bg-secondary border border-border grid place-items-center group-hover:bg-foreground group-hover:text-background group-hover:border-foreground transition-colors">
                <b.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold tracking-tight">{b.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
