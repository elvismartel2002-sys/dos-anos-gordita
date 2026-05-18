"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "ghost" | "outline";

const variants: Record<Variant, string> = {
  primary:
    "bg-[#c9a962]/15 text-[#f5e6c8] border border-[#c9a962]/40 hover:bg-[#c9a962]/25 gold-glow",
  ghost: "bg-transparent text-stone-300 hover:text-white",
  outline:
    "bg-transparent text-stone-400 border border-white/10 hover:border-[#c9a962]/50 hover:text-[#f5e6c8]",
};

export function CinematicButton({
  children,
  onClick,
  variant = "primary",
  className,
  disabled,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      className={cn(
        "px-8 py-3 rounded-full text-sm tracking-[0.2em] uppercase transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed",
        variants[variant],
        className,
      )}
    >
      {children}
    </motion.button>
  );
}
