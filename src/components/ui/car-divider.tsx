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
      viewBox="0 0 280 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
    >
      {/* Sleek luxury sedan silhouette */}
      <path
        d="M10 68
           C 18 68, 26 62, 36 56
           L 72 42
           C 90 36, 108 34, 124 33
           L 168 33
           C 182 33, 196 35, 208 42
           L 244 58
           C 256 62, 268 66, 272 68"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Lower body */}
      <path
        d="M16 68 L 264 68"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Roof line - elegant curve */}
      <path
        d="M80 42
           L 108 26
           Q 116 22, 128 22
           L 152 22
           Q 162 22, 170 28
           L 200 42"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* B-pillar */}
      <path
        d="M136 22 L 136 42"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Front pillar */}
      <path
        d="M108 26 L 100 42"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Rear pillar */}
      <path
        d="M170 28 L 178 42"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Door line */}
      <path
        d="M100 52 L 100 60"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M160 52 L 160 60"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Handle hints */}
      <path
        d="M108 56 L 126 56"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M172 56 L 190 56"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Front wheel well */}
      <path
        d="M56 68 Q 88 38, 120 68"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Rear wheel well */}
      <path
        d="M152 68 Q 184 38, 216 68"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Wheels - sleek design */}
      <circle cx="88" cy="68" r="14" stroke="currentColor" strokeWidth="2" fill="white" />
      <circle cx="88" cy="68" r="6" stroke="currentColor" strokeWidth="1.5" fill="white" />
      <circle cx="184" cy="68" r="14" stroke="currentColor" strokeWidth="2" fill="white" />
      <circle cx="184" cy="68" r="6" stroke="currentColor" strokeWidth="1.5" fill="white" />
      {/* Headlight */}
      <path
        d="M252 56 L 264 58"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Taillight */}
      <path
        d="M16 58 L 22 58"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Side accent line */}
      <path
        d="M36 62 L 244 62"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}