import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { waLink } from "@/lib/contact";
import { PulseBeam } from "@/components/ui/pulse-beams";

export function FloatingWhatsApp() {
  return (
    <motion.a
      href={waLink("Hola Alejandro, me interesa conocer más sobre tu inventario.")}
      target="_blank"
      rel="noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      className="fixed bottom-6 right-6 z-40"
      aria-label="WhatsApp"
    >
      <span className="relative inline-flex h-14 w-14">
        <PulseBeam />
        <span className="relative h-14 w-14 rounded-full bg-[oklch(0.65_0.17_150)] text-white grid place-items-center shadow-xl hover:scale-110 transition-transform">
          <MessageCircle className="h-6 w-6" />
        </span>
      </span>
    </motion.a>
  );
}
