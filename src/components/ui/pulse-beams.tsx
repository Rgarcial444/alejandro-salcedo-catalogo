import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const PulseBeam = ({ className }: { className?: string }) => {
  return (
    <span aria-hidden className={cn("pointer-events-none absolute inset-0 rounded-full", className)}>
      <motion.span
        className="absolute inset-0 rounded-full bg-primary/30"
        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.span
        className="absolute inset-0 rounded-full bg-accent/20"
        animate={{ scale: [1, 1.7, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
      />
    </span>
  );
};
