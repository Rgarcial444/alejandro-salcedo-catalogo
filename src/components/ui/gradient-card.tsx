import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import { type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const cardVariants = cva(
  "relative flex flex-col justify-between h-full w-full overflow-hidden rounded-2xl p-6 sm:p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg",
  {
    variants: {
      gradient: {
        orange: "bg-gradient-to-br from-rose-100 to-red-200/50",
        gray: "bg-gradient-to-br from-slate-100 to-slate-200/60",
        purple: "bg-gradient-to-br from-blue-100 to-indigo-200/50",
        green: "bg-gradient-to-br from-sky-100 to-cyan-200/50",
        blue: "bg-gradient-to-br from-blue-100 to-sky-200/60",
        rose: "bg-gradient-to-br from-rose-100 to-pink-200/50",
      },
    },
    defaultVariants: {
      gradient: "gray",
    },
  },
);

export interface GradientCardProps
  extends Omit<HTMLMotionProps<"div">, "title">, VariantProps<typeof cardVariants> {
  badgeText: string;
  badgeColor: string;
  title: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  icon?: LucideIcon;
  imageUrl?: string;
}

const GradientCard = React.forwardRef<HTMLDivElement, GradientCardProps>(
  (
    {
      className,
      gradient,
      badgeText,
      badgeColor,
      title,
      description,
      icon: Icon,
      imageUrl,
      ...props
    },
    ref,
  ) => {
    const cardAnimation = {
      rest: { scale: 1, y: 0 },
      hover: { scale: 1.02, y: -4 },
    };

    const imageAnimation = {
      rest: { scale: 1, rotate: 0 },
      hover: { scale: 1.12, rotate: 3 },
    };

    return (
      <motion.div
        ref={ref}
        initial="rest"
        whileHover="hover"
        animate="rest"
        variants={cardAnimation}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={cn(cardVariants({ gradient }), className)}
        {...props}
      >
        {/* Decorative background image with animation */}
        {imageUrl && (
          <motion.div
            variants={imageAnimation}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
            className="pointer-events-none absolute -right-4 -bottom-4 sm:-right-6 sm:-bottom-6 h-32 w-32 sm:h-40 sm:w-40 rounded-full overflow-hidden opacity-50 z-0"
          >
            <img
              src={imageUrl}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
              draggable="false"
            />
          </motion.div>
        )}

        {/* Decorative icon backdrop (fallback if no image) */}
        {Icon && !imageUrl && (
          <motion.div
            variants={imageAnimation}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
            className="pointer-events-none absolute -right-6 -bottom-6 sm:-right-8 sm:-bottom-8"
          >
            <Icon className="h-32 w-32 sm:h-40 sm:w-40 text-foreground/[0.06]" strokeWidth={1.25} />
          </motion.div>
        )}

        {/* Card content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Subtle overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-white/40 to-transparent rounded-2xl pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center self-start gap-1.5 rounded-full bg-white/70 backdrop-blur px-2.5 py-1 text-[11px] font-medium text-slate-700 border border-white/60">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: badgeColor }}
            />
            {badgeText}
          </div>

          {/* Icon */}
          {Icon && (
            <div className="mt-5 h-11 w-11 rounded-xl bg-white/70 backdrop-blur border border-white/60 grid place-items-center">
              <Icon className="h-5 w-5 text-slate-800" />
            </div>
          )}

          {/* Title and description */}
          <div className="mt-4 flex-1 min-h-0">
            <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
              {title}
            </h3>
            <p className="mt-2 text-sm text-slate-800 leading-relaxed">{description}</p>
          </div>
        </div>
      </motion.div>
    );
  },
);
GradientCard.displayName = "GradientCard";

export { GradientCard, cardVariants };
