import { motion } from "framer-motion";

const steps = [
  { n: "01", title: "Explora el inventario", desc: "Navega autos verificados con fotos, especificaciones y precios claros." },
  { n: "02", title: "Solicita información", desc: "Contáctame por WhatsApp o el formulario para resolver todas tus dudas." },
  { n: "03", title: "Agenda una cita", desc: "Coordinamos una cita para ver el auto en el horario que mejor te acomode." },
  { n: "04", title: "Cierra tu compra", desc: "Te acompaño con el papeleo, financiamiento y entrega de tu auto." },
];

export function Process() {
  return (
    <section id="proceso" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary">El proceso</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">
            Cuatro pasos hacia tu próximo auto
          </h2>
          <p className="mt-3 text-muted-foreground">Simple, transparente y a tu ritmo.</p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative p-6 bg-card border border-border rounded-2xl"
            >
              <span className="text-5xl font-bold tracking-tight bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
                {s.n}
              </span>
              <h3 className="mt-3 font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
