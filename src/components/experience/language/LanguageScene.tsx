"use client";

import { motion } from "framer-motion";
import { Typography } from "@/components/ui/Typography";
import { useTranslation } from "@/hooks/useTranslation";
import { useExperienceStore } from "@/store/experience-store";
import type { Locale } from "@/types/experience";
import { cn } from "@/lib/utils/cn";

const locales: { id: Locale; labelKey: string }[] = [
  { id: "es", labelKey: "language.es" },
  { id: "en", labelKey: "language.en" },
  { id: "pt", labelKey: "language.pt" },
];

export function LanguageScene() {
  const { t } = useTranslation();
  const setLocale = useExperienceStore((s) => s.setLocale);
  const goNext = useExperienceStore((s) => s.goNext);

  const pick = (locale: Locale) => {
    setLocale(locale);
    goNext();
  };

  return (
    <motion.div className="relative flex flex-1 flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-lg"
      >
        <Typography variant="caption" className="mb-4 text-[#c9a962]/80">
          DOS AÑOS GORDITA
        </Typography>
        <Typography variant="h1" className="text-gradient-gold mb-3">
          {t("language.title")}
        </Typography>
        <Typography variant="body" className="mb-12 text-stone-500">
          {t("language.subtitle")}
        </Typography>

        <ul className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          {locales.map((loc, i) => (
            <motion.li
              key={loc.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 * i }}
            >
              <button
                type="button"
                onClick={() => pick(loc.id)}
                className={cn(
                  "glass-panel w-full min-w-[140px] rounded-2xl px-8 py-4 text-lg tracking-wide transition-all",
                  "hover:border-[#c9a962]/50 hover:text-[#f5e6c8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a962]/60",
                )}
              >
                {t(loc.labelKey)}
              </button>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
