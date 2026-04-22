import { motion, useReducedMotion } from "framer-motion";

/**
 * Decorative hand-drawn car that travels left → right along a divider line.
 * Pure ornament. Respects prefers-reduced-motion.
 */
export function CarDivider({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className={`relative w-full h-16 sm:h-20 my-2 sm:my-4 select-none pointer-events-none ${className}`}
    >
      {/* Road line */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-foreground/25 to-transparent" />

      {/* Subtle dust trail behind car */}
      <motion.div
        initial={{ x: "-10%", opacity: 0 }}
        whileInView={{ x: "100%", opacity: [0, 0.5, 0] }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{
          duration: reduce ? 0 : 6,
          ease: [0.45, 0.05, 0.55, 0.95],
        }}
        className="absolute top-1/2 -translate-y-1/2 left-0 h-px w-24 bg-gradient-to-r from-transparent to-foreground/30"
      />

      {/* Car traveling along the line */}
      <motion.div
        initial={{ x: "-12%" }}
        whileInView={{ x: "calc(100vw - 100%)" }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{
          duration: reduce ? 0 : 6,
          ease: [0.45, 0.05, 0.55, 0.95],
        }}
        className="absolute top-1/2 -translate-y-1/2 left-0"
        style={{ willChange: "transform" }}
      >
        <CarSvg className="h-12 w-auto sm:h-14 text-foreground" />
      </motion.div>
    </div>
  );
}

function CarSvg({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
    >
      {/* Body — single elegant continuous line */}
      <path
        d="M8 56
           C 14 56, 18 52, 24 48
           L 44 38
           C 56 32, 70 28, 88 28
           L 132 28
           C 146 28, 158 32, 168 40
           L 188 50
           C 196 52, 204 54, 210 56"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Underbody / chassis line */}
      <path
        d="M14 56 L 60 56 M 86 56 L 152 56 M 178 56 L 210 56"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Greenhouse — windows */}
      <path
        d="M58 38
           L 72 22
           Q 76 19, 82 19
           L 124 19
           Q 130 19, 134 23
           L 148 38"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* B-pillar */}
      <path
        d="M104 19 L 104 38"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Door handle hint */}
      <path
        d="M86 44 L 96 44"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      {/* Headlight */}
      <path
        d="M198 48 L 206 50"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* Wheels */}
      <circle cx="72" cy="58" r="11" stroke="currentColor" strokeWidth="1.6" fill="white" />
      <circle cx="72" cy="58" r="4" stroke="currentColor" strokeWidth="1.2" fill="white" />
      <circle cx="166" cy="58" r="11" stroke="currentColor" strokeWidth="1.6" fill="white" />
      <circle cx="166" cy="58" r="4" stroke="currentColor" strokeWidth="1.2" fill="white" />
      {/* Wheel arches */}
      <path
        d="M58 56 Q 72 42, 86 56"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M152 56 Q 166 42, 180 56"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
