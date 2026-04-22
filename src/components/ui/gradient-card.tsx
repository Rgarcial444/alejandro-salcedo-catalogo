import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import { ArrowRight, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const cardVariants = cva(
  "relative flex flex-col justify-between h-full w-full overflow-hidden rounded-2xl p-6 sm:p-7 shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-elegant)]",
  {
    variants: {
      gradient: {
        orange: "bg-gradient-to-br from-rose-50 to-red-100/60 dark:from-rose-950/30 dark:to-red-900/20",
        gray: "bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/60 dark:to-slate-900/60",
        purple: "bg-gradient-to-br from-blue-50 to-sky-100 dark:from-blue-950/40 dark:to-sky-900/30",
        green: "bg-gradient-to-br from-sky-50 to-cyan-100 dark:from-sky-950/40 dark:to-cyan-900/30",
        blue: "bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/40 dark:to-indigo-900/30",
        rose: "bg-gradient-to-br from-rose-50/80 to-pink-50 dark:from-rose-950/30 dark:to-pink-900/20",
      },
    },
    defaultVariants: {
      gradient: "gray",
    },
  },
);

export interface GradientCardProps
  extends Omit<HTMLMotionProps<"div">, "title">,
    VariantProps<typeof cardVariants> {
  badgeText: string;
  badgeColor: string;
  title: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  icon?: LucideIcon;
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
      ctaText,
      ctaHref,
      icon: Icon,
      ...props
    },
    ref,
  ) => {
    const cardAnimation = {
      rest: { y: 0 },
      hover: { y: -4 },
    };
    const iconAnimation = {
      rest: { scale: 1, rotate: 0 },
      hover: { scale: 1.1, rotate: 6 },
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
        {/* Decorative icon backdrop */}
        {Icon && (
          <motion.div
            variants={iconAnimation}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
            className="pointer-events-none absolute -right-6 -bottom-6 sm:-right-8 sm:-bottom-8"
          >
            <Icon className="h-32 w-32 sm:h-40 sm:w-40 text-foreground/[0.06]" strokeWidth={1.25} />
          </motion.div>
        )}

        <div className="relative flex flex-col h-full">
          {/* Badge */}
          <div
            className="inline-flex items-center self-start gap-1.5 rounded-full bg-white/70 backdrop-blur px-2.5 py-1 text-[11px] font-medium text-foreground/80 border border-white/60"
          >
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
              <Icon className="h-5 w-5 text-foreground" />
            </div>
          )}

          {/* Title + description */}
          <div className="mt-4 flex-1">
            <h3 className="text-lg font-semibold tracking-tight text-foreground">{title}</h3>
            <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{description}</p>
          </div>

          {/* CTA */}
          {ctaText && (
            <a
              href={ctaHref ?? "#"}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:gap-2.5 transition-all duration-300"
            >
              {ctaText}
              <ArrowRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </motion.div>
    );
  },
);
GradientCard.displayName = "GradientCard";

export { GradientCard, cardVariants };
