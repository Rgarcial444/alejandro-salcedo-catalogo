import { Instagram, Facebook, MessageCircle, Phone, Mail } from "lucide-react";
import { PHONE, PHONE_TEL, waLink } from "@/lib/contact";

export function Footer() {
  return (
    <footer className="bg-foreground text-background mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2 max-w-md">
          <div className="flex items-center gap-2 font-semibold">
            <span className="h-8 w-8 rounded-lg bg-background text-foreground grid place-items-center text-sm font-bold">
              AS
            </span>
            Alejandro Salcedo
          </div>
          <p className="mt-4 text-sm text-background/70 leading-relaxed">
            Asesor automotriz independiente. Te ayudo a encontrar el auto correcto, con
            inventario verificado, atención personalizada y apoyo en cada paso del proceso.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">Enlaces</h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li><a href="#inventario" className="hover:text-background">Inventario</a></li>
            <li><a href="#beneficios" className="hover:text-background">Por qué elegirme</a></li>
            <li><a href="#proceso" className="hover:text-background">Proceso</a></li>
            <li><a href="#testimonios" className="hover:text-background">Testimonios</a></li>
            <li><a href="#contacto" className="hover:text-background">Contacto</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">Contacto</h4>
          <ul className="space-y-3 text-sm text-background/70">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> <a href={`tel:${PHONE_TEL}`}>{PHONE}</a></li>
            <li className="flex items-center gap-2"><MessageCircle className="h-4 w-4" /> <a href={waLink("Hola Alejandro")} target="_blank" rel="noreferrer">WhatsApp</a></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> contacto@alejandrosalcedo.mx</li>
          </ul>
          <div className="mt-5 flex gap-3">
            <a href="#" className="h-9 w-9 grid place-items-center rounded-full bg-background/10 hover:bg-background/20"><Instagram className="h-4 w-4" /></a>
            <a href="#" className="h-9 w-9 grid place-items-center rounded-full bg-background/10 hover:bg-background/20"><Facebook className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between gap-2 text-xs text-background/60">
          <p>© {new Date().getFullYear()} Alejandro Salcedo. Todos los derechos reservados.</p>
          <p>Asesor automotriz independiente · Ciudad de México</p>
        </div>
      </div>
    </footer>
  );
}
