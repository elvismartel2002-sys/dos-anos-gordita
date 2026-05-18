"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typography } from "@/components/ui/Typography";
import { CinematicButton } from "@/components/ui/CinematicButton";
import { useTranslation } from "@/hooks/useTranslation";
import { useExperienceStore } from "@/store/experience-store";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const CanvasRoot = dynamic(
  () => import("@/components/three/CanvasRoot").then((m) => m.CanvasRoot),
  { ssr: false },
);

const LINES = ["intro.line1", "intro.line2", "intro.line3"] as const;

export function IntroScene() {
  const { t } = useTranslation();
  const goNext = useExperienceStore((s) => s.goNext);
  const setIntroComplete = useExperienceStore((s) => s.setIntroComplete);
  const setAudioEnabled = useExperienceStore((s) => s.setAudioEnabled);
  const reduced = useReducedMotion();

  const [loading, setLoading] = useState(true);
  const [lineIndex, setLineIndex] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), reduced ? 400 : 2200);
    return () => clearTimeout(timer);
  }, [reduced]);

  useEffect(() => {
    if (loading || reduced) {
      setReady(true);
      return;
    }
    const interval = setInterval(() => {
      setLineIndex((i) => {
        if (i >= LINES.length - 1) {
          clearInterval(interval);
          setReady(true);
          return i;
        }
        return i + 1;
      });
    }, 2400);
    return () => clearInterval(interval);
  }, [loading, reduced]);

  const begin = () => {
    setIntroComplete(true);
    setAudioEnabled(true);
    goNext();
  };

  return (
    <motion.div className="relative flex flex-1 flex-col overflow-hidden">
      {!reduced && (
        <CanvasRoot className="pointer-events-none absolute inset-0 -z-10 opacity-80" />
      )}

      <motion.div className="absolute inset-0 -z-20 bg-gradient-to-b from-black via-[#0a0a0b] to-black" />

      <motion.div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="load"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <motion.div
                className="mx-auto h-px w-32 bg-gradient-to-r from-transparent via-[#c9a962] to-transparent"
                animate={{ scaleX: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <Typography variant="caption">{t("intro.preload")}</Typography>
            </motion.div>
          ) : (
            <motion.div
              key="story"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-2xl space-y-8"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={lineIndex}
                  initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                  transition={{ duration: 1 }}
                >
                  <Typography variant="display" className="text-gradient-gold">
                    {t(LINES[lineIndex])}
                  </Typography>
                </motion.div>
              </AnimatePresence>

              {ready && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col items-center gap-4 pt-8"
                >
                  <CinematicButton onClick={begin}>{t("intro.cta")}</CinematicButton>
                  <button
                    type="button"
                    onClick={begin}
                    className="text-xs uppercase tracking-widest text-stone-600 hover:text-stone-400"
                  >
                    {t("intro.skip")}
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
