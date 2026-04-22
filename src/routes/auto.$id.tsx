import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Fuel, Gauge, MessageCircle, Settings2, ShieldCheck, Sparkles } from "lucide-react";
import { vehicles as seedVehicles, type Vehicle } from "@/data/vehicles";
import { getVehicleById } from "@/hooks/use-vehicles";
import { formatMXN, waLink } from "@/lib/contact";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";

export const Route = createFileRoute("/auto/$id")({
  loader: ({ params }) => {
    const v = seedVehicles.find((x) => x.id === params.id);
    if (!v) throw notFound();
    return { vehicle: v };
  },
  head: ({ loaderData }) => {
    const v = loaderData?.vehicle;
    if (!v) return { meta: [{ title: "Auto no encontrado" }] };
    const title = `${v.brand} ${v.model} ${v.year} · ${formatMXN(v.price)}`;
    const desc = v.description.slice(0, 155);
    return {
      meta: [
        { title: `${title} | Alejandro Salcedo` },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:image", content: v.images[0] },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center text-center px-4">
      <div>
        <h1 className="text-3xl font-semibold">Auto no encontrado</h1>
        <p className="text-muted-foreground mt-2">Es posible que ya no esté disponible.</p>
        <Link to="/" className="inline-block mt-6"><Button variant="hero">Ver inventario</Button></Link>
      </div>
    </div>
  ),
  component: AutoPage,
});

function AutoPage() {
  const { vehicle: ssrVehicle } = Route.useLoaderData();
  const { id } = Route.useParams();
  const [vehicle, setVehicle] = useState<Vehicle>(ssrVehicle);
  const [active, setActive] = useState(0);

  // Hydrate with localStorage version if available
  useEffect(() => {
    const local = getVehicleById(id);
    if (local) setVehicle(local);
  }, [id]);

  const v = vehicle;
  const msg = `Hola Alejandro, me interesa el ${v.brand} ${v.model} ${v.year} (${formatMXN(v.price)}). ¿Sigue disponible?`;

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Volver al inventario
          </Link>
        </div>

        {/* Editorial hero */}
        <section className="mt-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* uppercase eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[11px] sm:text-xs tracking-[0.3em] uppercase text-muted-foreground"
          >
            {v.brand} · {v.year} · {v.fuel}
          </motion.p>

          <div className="mt-6 grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Image — overlapping editorial portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 relative"
            >
              <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-2xl bg-muted shadow-[var(--shadow-elegant)]">
                <motion.img
                  key={active}
                  src={v.images[active]}
                  alt={`${v.brand} ${v.model}`}
                  initial={{ scale: 1.05, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="h-full w-full object-cover"
                />
                {/* Grain overlay */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
                  }}
                />
                {v.featured && (
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1 bg-foreground text-background text-[10px] font-medium px-3 py-1.5 rounded-full">
                    <Sparkles className="h-3 w-3" /> Destacado
                  </span>
                )}
              </div>

              {v.images.length > 1 && (
                <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                  {v.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`shrink-0 h-16 w-24 rounded-lg overflow-hidden border-2 transition ${
                        active === i ? "border-foreground" : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Info block — editorial typography, overlapping on lg */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 lg:-ml-16 xl:-ml-24 lg:mt-16 relative z-10"
            >
              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 lg:p-10 shadow-[var(--shadow-card)]">
                <h1 className="font-semibold tracking-tight leading-[0.95] text-4xl sm:text-5xl lg:text-6xl">
                  <span className="block">{v.brand}</span>
                  <span className="block text-muted-foreground/60 italic font-light">{v.model}</span>
                </h1>

                <div className="mt-8 flex items-baseline justify-between gap-4 pb-6 border-b border-border">
                  <div>
                    <p className="text-3xl sm:text-4xl font-semibold tracking-tight">{formatMXN(v.price)}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      o <span className="font-medium text-foreground">{formatMXN(v.monthly)}</span>/mes
                    </p>
                  </div>
                  <ShieldCheck className="h-6 w-6 text-primary shrink-0" />
                </div>

                <div className="mt-6 flex items-start gap-4">
                  <a href={waLink(msg)} target="_blank" rel="noreferrer">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="h-14 w-14 rounded-full bg-foreground text-background grid place-items-center shadow-[var(--shadow-elegant)] relative"
                    >
                      <ArrowRight className="h-5 w-5" />
                      <span className="absolute inset-0 rounded-full border border-foreground/30 animate-ping opacity-30" />
                    </motion.div>
                  </a>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 pt-1">
                    {v.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Specs grid */}
        <section className="mt-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <SpecBlock icon={<Gauge className="h-5 w-5" />} label="Kilometraje" value={`${v.mileage.toLocaleString("es-MX")} km`} />
            <SpecBlock icon={<Fuel className="h-5 w-5" />} label="Combustible" value={v.fuel} />
            <SpecBlock icon={<Settings2 className="h-5 w-5" />} label="Transmisión" value={v.transmission} />
          </div>

          {v.specs.length > 0 && (
            <div className="mt-10 grid md:grid-cols-2 gap-x-12 gap-y-3 max-w-3xl">
              {v.specs.map((s) => (
                <div key={s.label} className="flex justify-between border-b border-border py-3">
                  <span className="text-muted-foreground text-sm">{s.label}</span>
                  <span className="font-medium text-sm">{s.value}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CTA strip */}
        <section className="mt-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-foreground text-background rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">¿Te interesa este auto?</h3>
              <p className="mt-2 text-background/70">Agenda una prueba de manejo o resuelve cualquier duda al instante.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <a href={waLink(msg)} target="_blank" rel="noreferrer">
                <Button variant="whatsapp" size="lg" className="w-full"><MessageCircle className="h-4 w-4" /> WhatsApp</Button>
              </a>
              <Link to="/" hash="contacto">
                <Button size="lg" className="w-full bg-background text-foreground hover:bg-background/90"><Calendar className="h-4 w-4" /> Agendar</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

function SpecBlock({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <div className="text-muted-foreground">{icon}</div>
      <p className="text-xs text-muted-foreground mt-3 uppercase tracking-wide">{label}</p>
      <p className="mt-1 font-semibold tracking-tight">{value}</p>
    </div>
  );
}
