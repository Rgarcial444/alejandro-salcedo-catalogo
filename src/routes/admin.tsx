import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useVehicles, slugify } from "@/hooks/use-vehicles";
import type { Vehicle } from "@/data/vehicles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Pencil, Plus, RotateCcw, Trash2, X, Save } from "lucide-react";
import { formatMXN } from "@/lib/contact";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Panel de administración · Alejandro Salcedo" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

const empty = (): Vehicle => ({
  id: "",
  brand: "",
  model: "",
  year: new Date().getFullYear(),
  price: 0,
  monthly: 0,
  mileage: 0,
  fuel: "Gasolina",
  transmission: "Automática",
  featured: false,
  images: [""],
  description: "",
  specs: [
    { label: "Motor", value: "" },
    { label: "Color", value: "" },
  ],
});

function AdminPage() {
  const { vehicles, upsert, remove, reset } = useVehicles();
  const [editing, setEditing] = useState<Vehicle | null>(null);
  const [isNew, setIsNew] = useState(false);

  const startNew = () => {
    setEditing(empty());
    setIsNew(true);
  };
  const startEdit = (v: Vehicle) => {
    setEditing({ ...v, images: [...v.images], specs: v.specs.map((s) => ({ ...s })) });
    setIsNew(false);
  };
  const close = () => {
    setEditing(null);
    setIsNew(false);
  };

  const save = () => {
    if (!editing) return;
    const id = editing.id?.trim() || slugify(`${editing.brand}-${editing.model}-${editing.year}`);
    const cleaned: Vehicle = {
      ...editing,
      id,
      images: editing.images.map((i) => i.trim()).filter(Boolean),
      specs: editing.specs.filter((s) => s.label.trim() && s.value.trim()),
    };
    if (!cleaned.brand || !cleaned.model || cleaned.images.length === 0) {
      alert("Marca, modelo y al menos una imagen son obligatorios.");
      return;
    }
    upsert(cleaned);
    close();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Volver al sitio
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => { if (confirm("¿Restablecer al inventario inicial?")) reset(); }}>
              <RotateCcw className="h-4 w-4" /> Restablecer
            </Button>
            <Button variant="hero" size="sm" onClick={startNew}>
              <Plus className="h-4 w-4" /> Nuevo auto
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <p className="text-sm font-medium text-primary">Panel de administración</p>
          <h1 className="mt-1 text-3xl sm:text-4xl font-semibold tracking-tight">Inventario</h1>
          <p className="mt-2 text-muted-foreground">
            Gestiona los autos disponibles. Los cambios se guardan localmente en este navegador (modo demo).
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/50 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="text-left px-4 py-3 font-medium">Auto</th>
                  <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Año</th>
                  <th className="text-left px-4 py-3 font-medium">Precio</th>
                  <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Km</th>
                  <th className="text-right px-4 py-3 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((v) => (
                  <tr key={v.id} className="border-t border-border hover:bg-secondary/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={v.images[0]} alt="" className="h-12 w-16 object-cover rounded-md bg-muted" />
                        <div>
                          <p className="font-medium">{v.brand} {v.model}</p>
                          <p className="text-xs text-muted-foreground">{v.fuel} · {v.transmission}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">{v.year}</td>
                    <td className="px-4 py-3 font-medium">{formatMXN(v.price)}</td>
                    <td className="px-4 py-3 hidden lg:table-cell">{v.mileage.toLocaleString("es-MX")}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => startEdit(v)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => { if (confirm(`¿Eliminar ${v.brand} ${v.model}?`)) remove(v.id); }}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {vehicles.length === 0 && (
                  <tr><td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">Sin autos. Agrega el primero.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {editing && (
        <div className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6 overflow-y-auto">
          <div className="bg-card w-full sm:max-w-3xl sm:rounded-2xl shadow-[var(--shadow-elegant)] max-h-[95vh] overflow-y-auto">
            <div className="sticky top-0 bg-card/95 backdrop-blur border-b border-border px-6 py-4 flex items-center justify-between">
              <h2 className="font-semibold tracking-tight">{isNew ? "Nuevo auto" : "Editar auto"}</h2>
              <Button variant="ghost" size="icon" onClick={close}><X className="h-4 w-4" /></Button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Marca"><Input value={editing.brand} onChange={(e) => setEditing({ ...editing, brand: e.target.value })} /></Field>
                <Field label="Modelo"><Input value={editing.model} onChange={(e) => setEditing({ ...editing, model: e.target.value })} /></Field>
                <Field label="Año"><Input type="number" value={editing.year} onChange={(e) => setEditing({ ...editing, year: +e.target.value })} /></Field>
                <Field label="Kilometraje"><Input type="number" value={editing.mileage} onChange={(e) => setEditing({ ...editing, mileage: +e.target.value })} /></Field>
                <Field label="Precio (MXN)"><Input type="number" value={editing.price} onChange={(e) => setEditing({ ...editing, price: +e.target.value })} /></Field>
                <Field label="Mensualidad estimada"><Input type="number" value={editing.monthly} onChange={(e) => setEditing({ ...editing, monthly: +e.target.value })} /></Field>
                <Field label="Combustible">
                  <select className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm" value={editing.fuel} onChange={(e) => setEditing({ ...editing, fuel: e.target.value as Vehicle["fuel"] })}>
                    {["Gasolina", "Híbrido", "Eléctrico", "Diésel"].map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </Field>
                <Field label="Transmisión">
                  <select className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm" value={editing.transmission} onChange={(e) => setEditing({ ...editing, transmission: e.target.value as Vehicle["transmission"] })}>
                    {["Automática", "Manual"].map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </Field>
              </div>

              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={!!editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} />
                Marcar como destacado
              </label>

              <Field label="Descripción">
                <Textarea rows={3} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
              </Field>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Imágenes (URLs)</Label>
                  <Button variant="ghost" size="sm" onClick={() => setEditing({ ...editing, images: [...editing.images, ""] })}>
                    <Plus className="h-3 w-3" /> Agregar
                  </Button>
                </div>
                <div className="space-y-2">
                  {editing.images.map((img, i) => (
                    <div key={i} className="flex gap-2">
                      <Input value={img} placeholder="https://..." onChange={(e) => {
                        const next = [...editing.images]; next[i] = e.target.value;
                        setEditing({ ...editing, images: next });
                      }} />
                      <Button variant="ghost" size="icon" onClick={() => setEditing({ ...editing, images: editing.images.filter((_, j) => j !== i) })}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Especificaciones</Label>
                  <Button variant="ghost" size="sm" onClick={() => setEditing({ ...editing, specs: [...editing.specs, { label: "", value: "" }] })}>
                    <Plus className="h-3 w-3" /> Agregar
                  </Button>
                </div>
                <div className="space-y-2">
                  {editing.specs.map((s, i) => (
                    <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2">
                      <Input placeholder="Etiqueta" value={s.label} onChange={(e) => {
                        const next = [...editing.specs]; next[i] = { ...next[i], label: e.target.value };
                        setEditing({ ...editing, specs: next });
                      }} />
                      <Input placeholder="Valor" value={s.value} onChange={(e) => {
                        const next = [...editing.specs]; next[i] = { ...next[i], value: e.target.value };
                        setEditing({ ...editing, specs: next });
                      }} />
                      <Button variant="ghost" size="icon" onClick={() => setEditing({ ...editing, specs: editing.specs.filter((_, j) => j !== i) })}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-card/95 backdrop-blur border-t border-border px-6 py-4 flex justify-end gap-2">
              <Button variant="outline" onClick={close}>Cancelar</Button>
              <Button variant="hero" onClick={save}><Save className="h-4 w-4" /> Guardar</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="mb-1.5 block text-xs uppercase tracking-wide text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
