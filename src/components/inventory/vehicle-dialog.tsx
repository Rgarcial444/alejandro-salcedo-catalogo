import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Vehicle } from "@/data/vehicles";
import { formatMXN, waLink } from "@/lib/contact";
import { Button } from "@/components/ui/button";
import { Calendar, Fuel, Gauge, MessageCircle, Settings2, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";

export function VehicleDialog({
  vehicle,
  onOpenChange,
}: {
  vehicle: Vehicle | null;
  onOpenChange: (open: boolean) => void;
}) {
  const [active, setActive] = useState(0);
  if (!vehicle) return null;

  const v = vehicle;
  const msg = `Hola Alejandro, me interesa el ${v.brand} ${v.model} ${v.year} (${formatMXN(v.price)}). ¿Sigue disponible?`;

  return (
    <Dialog
      open={!!vehicle}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) setActive(0);
      }}
    >
      <DialogContent className="max-w-5xl p-0 overflow-hidden bg-card max-h-[92vh] overflow-y-auto">
        <DialogTitle className="sr-only">{v.brand} {v.model} {v.year}</DialogTitle>
        <DialogDescription className="sr-only">{v.description}</DialogDescription>

        <div className="grid lg:grid-cols-2">
          {/* Gallery */}
          <div className="bg-muted">
            <div className="aspect-[4/3] lg:aspect-auto lg:h-[420px] overflow-hidden">
              <img src={v.images[active]} alt={v.model} className="h-full w-full object-cover" />
            </div>
            <div className="p-4 flex gap-2 overflow-x-auto">
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
          </div>

          {/* Details */}
          <div className="p-6 lg:p-8 flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">{v.brand}</span>
              {v.featured && (
                <span className="inline-flex items-center gap-1 bg-foreground text-background text-[10px] font-medium px-2 py-0.5 rounded-full">
                  <Sparkles className="h-3 w-3" /> Destacado
                </span>
              )}
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-semibold tracking-tight">{v.model}</h2>
            <p className="text-sm text-muted-foreground mt-1">{v.year} · Inventario verificado</p>

            <div className="mt-5 p-4 rounded-xl bg-secondary/60 border border-border">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-semibold">{formatMXN(v.price)}</span>
                <span className="text-sm text-muted-foreground">
                  o <span className="text-foreground font-medium">{formatMXN(v.monthly)}</span>/mes
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Apoyo con financiamiento disponible
              </p>
            </div>

            <p className="mt-5 text-sm text-muted-foreground leading-relaxed">{v.description}</p>

            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-secondary/40 border border-border text-center">
                <Gauge className="h-4 w-4 mx-auto text-muted-foreground" />
                <p className="text-xs text-muted-foreground mt-1">Kilometraje</p>
                <p className="text-sm font-medium">{v.mileage.toLocaleString("es-MX")} km</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/40 border border-border text-center">
                <Fuel className="h-4 w-4 mx-auto text-muted-foreground" />
                <p className="text-xs text-muted-foreground mt-1">Combustible</p>
                <p className="text-sm font-medium">{v.fuel}</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/40 border border-border text-center">
                <Settings2 className="h-4 w-4 mx-auto text-muted-foreground" />
                <p className="text-xs text-muted-foreground mt-1">Transmisión</p>
                <p className="text-sm font-medium">{v.transmission}</p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {v.specs.map((s) => (
                <div key={s.label} className="flex justify-between border-b border-border/60 py-1.5">
                  <span className="text-muted-foreground">{s.label}</span>
                  <span className="font-medium">{s.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-2">
              <a href={waLink(msg)} target="_blank" rel="noreferrer" className="flex-1">
                <Button variant="whatsapp" size="lg" className="w-full">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </Button>
              </a>
              <a href="#contacto" onClick={() => onOpenChange(false)} className="flex-1">
                <Button variant="hero" size="lg" className="w-full">
                  <Calendar className="h-4 w-4" /> Solicitar información
                </Button>
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
