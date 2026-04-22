import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PHONE, PHONE_TEL, waLink } from "@/lib/contact";

export function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hola Alejandro, soy ${form.name} (${form.phone}). ${form.message}`;
    window.open(waLink(msg), "_blank");
    setSent(true);
  };

  return (
    <section id="contacto" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
        <div>
          <p className="text-sm font-medium text-primary">Contacto</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">
            Hablemos de tu próximo auto
          </h2>
          <p className="mt-3 text-muted-foreground max-w-md">
            Escríbeme por WhatsApp para una respuesta inmediata, o llena el formulario y te contacto en menos de 5 minutos.
          </p>

          <div className="mt-8 space-y-3">
            <a href={waLink("Hola Alejandro, me interesa información.")} target="_blank" rel="noreferrer"
              className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card hover:border-foreground/30 transition group">
              <span className="h-11 w-11 rounded-xl bg-[oklch(0.65_0.17_150)] text-white grid place-items-center">
                <MessageCircle className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-medium">WhatsApp</p>
                <p className="text-xs text-muted-foreground">Respuesta en menos de 5 minutos</p>
              </div>
            </a>
            <a href={`tel:${PHONE_TEL}`}
              className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card hover:border-foreground/30 transition">
              <span className="h-11 w-11 rounded-xl bg-foreground text-background grid place-items-center">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-medium">{PHONE}</p>
                <p className="text-xs text-muted-foreground">Lun a Sáb · 9:00 - 19:00</p>
              </div>
            </a>
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card">
              <span className="h-11 w-11 rounded-xl bg-secondary border border-border grid place-items-center">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-medium">contacto@alejandrosalcedo.mx</p>
                <p className="text-xs text-muted-foreground">Te respondo el mismo día</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card">
              <span className="h-11 w-11 rounded-xl bg-secondary border border-border grid place-items-center">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-medium">Ciudad de México</p>
                <p className="text-xs text-muted-foreground">Citas con previa confirmación</p>
              </div>
            </div>
          </div>
        </div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-7 sm:p-9 bg-card border border-border rounded-3xl shadow-[var(--shadow-card)] h-fit lg:sticky lg:top-24"
        >
          <h3 className="text-xl font-semibold tracking-tight">Solicita información</h3>
          <p className="text-sm text-muted-foreground mt-1">Cuéntame qué auto buscas y te contacto.</p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-medium">Nombre</label>
              <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1.5 h-11 rounded-xl" placeholder="Tu nombre completo" />
            </div>
            <div>
              <label className="text-xs font-medium">Teléfono</label>
              <Input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1.5 h-11 rounded-xl" placeholder="55 1234 5678" />
            </div>
            <div>
              <label className="text-xs font-medium">¿En qué te ayudo?</label>
              <textarea
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={4}
                placeholder="Estoy buscando un SUV familiar..."
                className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
              />
            </div>
          </div>

          <Button type="submit" variant="hero" size="lg" className="w-full mt-6">
            <Send className="h-4 w-4" /> Enviar mensaje
          </Button>
          {sent && <p className="text-xs text-center text-muted-foreground mt-3">Abriendo WhatsApp...</p>}
          <p className="text-[11px] text-center text-muted-foreground mt-3">
            Al enviar, aceptas ser contactado por Alejandro Salcedo.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
