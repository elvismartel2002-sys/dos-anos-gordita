"use client";

import { Typography } from "@/components/ui/Typography";

export function SceneHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="mb-8 px-6 pt-12 text-center sm:pt-16">
      <Typography variant="h1" className="text-gradient-gold">
        {title}
      </Typography>
      {subtitle ? (
        <Typography variant="body" className="mt-3 text-stone-500">
          {subtitle}
        </Typography>
      ) : null}
    </header>
  );
}
