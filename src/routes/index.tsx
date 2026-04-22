import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { Hero } from "@/components/sections/hero";
import { Inventory } from "@/components/sections/inventory";
import { WhyMe } from "@/components/sections/why-me";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alejandro Salcedo · Asesor Automotriz | Autos verificados en CDMX" },
      {
        name: "description",
        content:
          "Encuentra tu próximo auto con total confianza. Inventario verificado, atención personalizada y apoyo con financiamiento. Asesor automotriz en CDMX.",
      },
      { property: "og:title", content: "Alejandro Salcedo · Asesor Automotriz" },
      {
        property: "og:description",
        content: "Inventario verificado y atención personalizada para encontrar tu próximo auto.",
      },
      {
        property: "og:image",
        content: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  }),
  component: Index,
});

// Página principal
function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased scroll-smooth">
      <Navbar />
      <main>
        <Hero />
        <Inventory />
        <WhyMe />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}