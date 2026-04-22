import { motion } from "framer-motion";
import {
  CalendarCheck,
  HandCoins,
  Headphones,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from "lucide-react";
import { GradientCard } from "@/components/ui/gradient-card";

const u = (id: string, w = 320) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const benefits = [
  {
    icon: UserCheck,
    title: "Atención personalizada",
    description: "Trato directo conmigo en cada paso del proceso, sin intermediarios.",
    badgeText: "1 a 1",
    badgeColor: "#3B82F6",
    gradient: "blue" as const,
    imageUrl: u("photo-1511919884226-fd3cad34687c"),
  },
  {
    icon: ShieldCheck,
    title: "Inventario verificado",
    description: "Cada auto pasa por una revisión mecánica y documental completa.",
    badgeText: "Garantizado",
    badgeColor: "#0EA5E9",
    gradient: "green" as const,
    imageUrl: u("photo-1486006920555-c77dcf18193c"),
  },
  {
    icon: Headphones,
    title: "Respuesta rápida",
    description: "Te contesto en menos de 5 minutos por WhatsApp en horario laboral.",
    badgeText: "<5 min",
    badgeColor: "#2563EB",
    gradient: "purple" as const,
    imageUrl: u("photo-1556761175-5973dc0f32e7"),
  },
  {
    icon: HandCoins,
    title: "Apoyo con financiamiento",
    description: "Te ayudo a comparar opciones de crédito con las mejores tasas.",
    badgeText: "Mejor tasa",
    badgeColor: "#1D4ED8",
    gradient: "blue" as const,
    imageUrl: u("photo-1554224155-6726b3ff858f"),
  },
  {
    icon: Sparkles,
    title: "Seguimiento postventa",
    description: "Mi acompañamiento no termina con la entrega de tu auto.",
    badgeText: "Siempre contigo",
    badgeColor: "#FB7185",
    gradient: "rose" as const,
    imageUrl: u("photo-1502877338535-766e1452684a"),
  },
  {
    icon: CalendarCheck,
    title: "Citas flexibles",
    description: "Agenda cita para ver el auto en el horario que mejor te acomode.",
    badgeText: "A tu ritmo",
    badgeColor: "#64748B",
    gradient: "gray" as const,
    imageUrl: u("photo-1606744824163-985d376605aa"),
  },
];

export function WhyMe() {
  return (
    <section id="beneficios" className="force-light py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary">¿Por qué elegirme?</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">
            ¿Una experiencia de compra realmente diferente?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Como asesor independiente, mi prioridad es que encuentres el auto correcto, no cerrar
            una venta.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <GradientCard
                icon={b.icon}
                title={b.title}
                description={b.description}
                badgeText={b.badgeText}
                badgeColor={b.badgeColor}
                gradient={b.gradient}
                imageUrl={b.imageUrl}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
