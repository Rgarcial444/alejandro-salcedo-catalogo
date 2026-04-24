import { Vehicle } from "@/data/vehicles";
import { formatMXN } from "@/lib/contact";
import { Fuel, Gauge, Settings2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function InventoryCard({ v, onClick }: { v: Vehicle; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="text-left bg-card border border-border rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300 group"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={v.images[0]}
          alt={`${v.brand} ${v.model}`}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          decoding="async"
        />
        {v.featured && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-foreground text-background text-[10px] font-medium px-2.5 py-1 rounded-full">
            <Sparkles className="h-3 w-3" /> Destacado
          </span>
        )}
        <span className="absolute top-3 right-3 bg-background/95 backdrop-blur text-xs font-medium px-2.5 py-1 rounded-full border border-border">
          {v.year}
        </span>
        <span
          className={`absolute bottom-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full ${
            v.condition === "Nuevo"
              ? "bg-green-500 text-white"
              : v.condition === "Próximamente"
                ? "bg-blue-500 text-white"
                : v.condition === "Apartado"
                  ? "bg-purple-500 text-white"
                  : "bg-amber-500 text-white"
          }`}
        >
          {v.condition}
        </span>
      </div>
      <div className="p-5">
        <p className="text-xs text-muted-foreground uppercase tracking-wide">{v.brand}</p>
        <h3 className="mt-1 text-lg font-semibold tracking-tight line-clamp-1">{v.model}</h3>

        <div className="mt-4 flex items-baseline justify-between">
          <p className="text-xl font-semibold">{formatMXN(v.price)}</p>
          <p className="text-xs text-muted-foreground">
            desde <span className="text-foreground font-medium">{formatMXN(v.monthly)}</span>/mes
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Gauge className="h-3.5 w-3.5" /> {v.mileage.toLocaleString("es-MX")} km
          </span>
          <span className="flex items-center gap-1.5">
            <Fuel className="h-3.5 w-3.5" /> {v.fuel}
          </span>
          <span className="flex items-center gap-1.5">
            <Settings2 className="h-3.5 w-3.5" /> {v.transmission.slice(0, 4)}.
          </span>
        </div>
      </div>
    </motion.button>
  );
}
