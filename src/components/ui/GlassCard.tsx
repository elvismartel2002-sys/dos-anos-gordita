import { createElement } from "react";
import { cn } from "@/lib/utils/cn";

export function GlassCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return createElement(
    "div",
    { className: cn("glass-panel rounded-2xl p-6 sm:p-8", className) },
    children,
  );
}
