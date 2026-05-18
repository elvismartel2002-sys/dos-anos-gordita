import { cn } from "@/lib/utils/cn";

type Variant = "display" | "h1" | "h2" | "body" | "caption" | "label";

const variants: Record<Variant, string> = {
  display:
    "font-[family-name:var(--font-cormorant)] text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[1.1]",
  h1: "font-[family-name:var(--font-cormorant)] text-3xl sm:text-5xl font-light tracking-tight",
  h2: "font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl font-light",
  body: "text-base sm:text-lg text-stone-300 leading-relaxed",
  caption: "text-xs sm:text-sm text-stone-500 tracking-widest uppercase",
  label: "text-sm text-stone-400",
};

export function Typography({
  variant = "body",
  className,
  children,
  as: Tag = "p",
}: {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  as?: "p" | "h1" | "h2" | "h3" | "span" | "div";
}) {
  return <Tag className={cn(variants[variant], className)}>{children}</Tag>;
}
