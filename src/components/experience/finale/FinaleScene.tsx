"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Typography } from "@/components/ui/Typography";
import { CinematicButton } from "@/components/ui/CinematicButton";
import { useTranslation } from "@/hooks/useTranslation";
import { useExperienceStore } from "@/store/experience-store";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const CanvasRoot = dynamic(
  () => import("@/components/three/CanvasRoot").then((m) => m.CanvasRoot),
  { ssr: false },
);

export function FinaleScene() {
  const { t } = useTranslation();
  const resetExperience = useExperienceStore((s) => s.resetExperience);
  const reduced = useReducedMotion();

  return (
    <motion.div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 text-center">
      {!reduced && <CanvasRoot className="absolute inset-0 -z-10 opacity-70" />}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="max-w-2xl space-y-6"
      >
        <Typography variant="caption" className="text-[#c9a962]">
          18 · 04 · 2024 — ∞
        </Typography>
        <Typography variant="display" className="text-gradient-gold">
          {t("finale.title")}
        </Typography>
        <Typography variant="h2" className="text-stone-300">
          {t("finale.line1")}
        </Typography>
        <Typography variant="body" className="text-stone-500">
          {t("finale.line2")}
        </Typography>
        <Typography variant="h1" className="pt-4 text-[#f5e6c8]">
          {t("finale.line3")}
        </Typography>

        <motion.div className="pt-10">
          <CinematicButton variant="outline" onClick={resetExperience}>
            {t("finale.cta")}
          </CinematicButton>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
