import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Search, X, ChevronDown, ChevronUp } from "lucide-react";
import { brands, fuels, transmissions } from "@/data/vehicles";
import { useVehicles } from "@/hooks/use-vehicles";
import { InventoryCard } from "@/components/inventory/inventory-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "@tanstack/react-router";

const priceRanges = [
  { label: "Todos los precios", min: 0, max: Infinity },
  { label: "Hasta $400k", min: 0, max: 400000 },
  { label: "$400k - $600k", min: 400000, max: 600000 },
  { label: "$600k+", min: 600000, max: Infinity },
];

export function Inventory() {
  const { vehicles } = useVehicles();
  const navigate = useNavigate();
  const [brand, setBrand] = useState("Todas");
  const [fuel, setFuel] = useState("Todos");
  const [trans, setTrans] = useState("Todas");
  const [priceIdx, setPriceIdx] = useState(0);
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    const range = priceRanges[priceIdx];
    return vehicles.filter((v) => {
      if (brand !== "Todas" && v.brand !== brand) return false;
      if (fuel !== "Todos" && v.fuel !== fuel) return false;
      if (trans !== "Todas" && v.transmission !== trans) return false;
      if (v.price < range.min || v.price > range.max) return false;
      if (query && !`${v.brand} ${v.model}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [vehicles, brand, fuel, trans, priceIdx, query]);

  const reset = () => {
    setBrand("Todas"); setFuel("Todos"); setTrans("Todas"); setPriceIdx(0); setQuery("");
  };

  const Chip = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition ${
        active
          ? "bg-foreground text-background border-foreground"
          : "bg-card text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );

  return (
    <section id="inventario" className="py-12 sm:py-16 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-sm font-medium text-primary">Inventario disponible</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">
              Autos verificados, listos para ti
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl">
              Cada vehículo pasa por una revisión mecánica y documental completa antes de ofrecerse.
            </p>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar marca o modelo..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 h-11 rounded-full bg-card"
            />
          </div>
        </div>

        {/* Filters - expandable */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-card border border-border">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center gap-2 text-sm font-medium">
              <Filter className="h-4 w-4" /> Filtros
              {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); reset(); }} 
              className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
            >
              <X className="h-3 w-3" /> Limpiar
            </button>
          </button>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="space-y-3 pt-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-2">Marca</p>
                    <div className="flex flex-wrap gap-2">
                      <Chip label="Todas" active={brand === "Todas"} onClick={() => setBrand("Todas")} />
                      {brands.map((b) => <Chip key={b} label={b} active={brand === b} onClick={() => setBrand(b)} />)}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-2">Precio</p>
                      <div className="flex flex-wrap gap-2">
                        {priceRanges.map((p, i) => <Chip key={p.label} label={p.label} active={priceIdx === i} onClick={() => setPriceIdx(i)} />)}
                      </div>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-2">Combustible</p>
                      <div className="flex flex-wrap gap-2">
                        <Chip label="Todos" active={fuel === "Todos"} onClick={() => setFuel("Todos")} />
                        {fuels.map((f) => <Chip key={f} label={f} active={fuel === f} onClick={() => setFuel(f)} />)}
                      </div>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-2">Transmisión</p>
                      <div className="flex flex-wrap gap-2">
                        <Chip label="Todas" active={trans === "Todas"} onClick={() => setTrans("Todas")} />
                        {transmissions.map((t) => <Chip key={t} label={t} active={trans === t} onClick={() => setTrans(t)} />)}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Grid */}
        <div className="mt-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <p>No encontramos vehículos con esos filtros.</p>
              <Button variant="outline" className="mt-4" onClick={reset}>Limpiar filtros</Button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((v) => (
                <InventoryCard key={v.id} v={v} onClick={() => navigate({ to: "/auto/$id", params: { id: v.id } })} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
