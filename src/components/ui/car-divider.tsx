import { useReducedMotion } from "framer-motion";

export function CarDivider({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className={`relative w-full h-16 sm:h-20 my-2 sm:my-4 select-none pointer-events-none ${className}`}
    >
      {/* Road line */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-foreground/25 to-transparent" />

      {/* Centered car silhouette */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <CarSvg className="h-12 w-auto sm:h-14 text-foreground" />
      </div>
    </div>
  );
}

function CarSvg({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
    >
      {/* Subtle ground reflection */}
      <ellipse
        cx="160"
        cy="92"
        rx="135"
        ry="3"
        fill="currentColor"
        opacity="0.08"
      />

      {/* Main body — sleek coupe profile */}
      <path
        d="M22 72
           C 30 72, 38 70, 46 66
           L 78 52
           C 92 46, 108 43, 124 42
           L 196 42
           C 214 42, 230 46, 244 54
           L 274 68
           C 282 70, 290 72, 298 72"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Lower sill line */}
      <path
        d="M28 78 C 60 80, 260 80, 292 78"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* Greenhouse / roofline — fastback curve */}
      <path
        d="M86 52
           C 100 32, 124 24, 152 24
           L 190 24
           C 210 24, 224 30, 236 42"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* A-pillar */}
      <path
        d="M118 30 L 110 50"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* B-pillar */}
      <path
        d="M168 24 L 168 50"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* C-pillar */}
      <path
        d="M218 30 L 226 46"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Window separator (subtle) */}
      <path
        d="M124 36 L 162 32 L 168 32 L 214 36"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* Character / shoulder line */}
      <path
        d="M52 60 C 130 56, 210 56, 268 62"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.55"
      />

      {/* Door cuts */}
      <path d="M114 56 L 114 70" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.7" />
      <path d="M168 52 L 168 72" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.7" />
      <path d="M222 56 L 222 70" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.7" />

      {/* Door handles */}
      <path d="M132 62 L 152 62" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M186 62 L 206 62" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />

      {/* Wheel arches */}
      <path
        d="M58 72 Q 92 40, 126 72"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M198 72 Q 232 40, 266 72"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* Wheels — multi-spoke alloy hint */}
      <g>
        <circle cx="92" cy="74" r="14" stroke="currentColor" strokeWidth="1.8" fill="white" />
        <circle cx="92" cy="74" r="9" stroke="currentColor" strokeWidth="0.9" fill="white" opacity="0.8" />
        <circle cx="92" cy="74" r="2.2" fill="currentColor" />
        <path d="M92 65 L 92 83 M83 74 L 101 74 M85.5 67.5 L 98.5 80.5 M98.5 67.5 L 85.5 80.5"
          stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" opacity="0.65" />
      </g>
      <g>
        <circle cx="232" cy="74" r="14" stroke="currentColor" strokeWidth="1.8" fill="white" />
        <circle cx="232" cy="74" r="9" stroke="currentColor" strokeWidth="0.9" fill="white" opacity="0.8" />
        <circle cx="232" cy="74" r="2.2" fill="currentColor" />
        <path d="M232 65 L 232 83 M223 74 L 241 74 M225.5 67.5 L 238.5 80.5 M238.5 67.5 L 225.5 80.5"
          stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" opacity="0.65" />
      </g>

      {/* Front fascia — headlight + grille hint */}
      <path d="M278 62 L 292 66" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M282 70 L 294 71" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />

      {/* Rear fascia — taillight */}
      <path d="M22 64 L 32 64" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M24 70 L 34 70" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />

      {/* Side mirror */}
      <path d="M120 46 L 116 42" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}