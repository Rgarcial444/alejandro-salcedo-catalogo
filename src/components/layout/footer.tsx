import { Instagram, Facebook, MessageCircle, Phone, Mail, ArrowRight, MessageSquare } from "lucide-react";
import { PHONE, PHONE_TEL, waLink } from "@/lib/contact";

export function Footer() {
  return (
    <footer className="bg-background text-foreground mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2 max-w-md">
          <div className="flex items-center gap-2 font-semibold">
            <span className="h-8 w-8 rounded-lg bg-foreground text-background grid place-items-center text-sm font-bold">
              AS
            </span>
            Alejandro Salcedo
          </div>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Asesor automotriz independiente. Te ayudo a encontrar el auto correcto, con
            inventario verificado, atención personalizada y apoyo en cada paso del proceso.
          </p>
          <a
            href={waLink("Hola Alejandro, me interesa información.")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-foreground text-background rounded-full text-sm font-medium hover:bg-foreground/90 transition"
          >
            <MessageSquare className="h-4 w-4" />
            Escríbeme
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">Enlaces</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#inventario" className="hover:text-foreground transition">Inventario</a></li>
            <li><a href="#beneficios" className="hover:text-foreground transition">Por qué elegirme</a></li>
            <li><a href="#proceso" className="hover:text-foreground transition">Proceso</a></li>
            <li><a href="#testimonios" className="hover:text-foreground transition">Testimonios</a></li>
            <li><a href="#contacto" className="hover:text-foreground transition">Contacto</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">Contacto</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> <a href={`tel:${PHONE_TEL}`}>{PHONE}</a></li>
            <li className="flex items-center gap-2"><MessageCircle className="h-4 w-4" /> <a href={waLink("Hola Alejandro")} target="_blank" rel="noreferrer">WhatsApp</a></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /><span>contacto@alejandrosalcedo.mx</span></li>
          </ul>
          <div className="mt-5 flex gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="group h-11 w-11 rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 flex items-center justify-center hover:scale-110 transition"
            >
              <Instagram className="h-4 w-4 text-white" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="group h-11 w-11 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center hover:scale-110 transition"
            >
              <Facebook className="h-4 w-4 text-white" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Alejandro Salcedo. Todos los derechos reservados.</p>
          <p>Asesor automotriz independiente · Ciudad de México</p>
        </div>
      </div>
    </footer>
  );
}