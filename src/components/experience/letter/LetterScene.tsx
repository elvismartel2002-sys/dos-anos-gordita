"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SceneHeader } from "@/components/experience/shared/SceneHeader";
import { SceneNav } from "@/components/layout/SceneNav";
import { GlassCard } from "@/components/ui/GlassCard";
import { Typography } from "@/components/ui/Typography";
import { useTranslation } from "@/hooks/useTranslation";

const PARAGRAPHS = ["letterBody.p1", "letterBody.p2", "letterBody.p3", "letterBody.p4", "letterBody.p5"] as const;

export function LetterScene() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <motion.div className="flex flex-1 flex-col pb-28">
      <SceneHeader title={t("letter.title")} subtitle={t("letter.subtitle")} />

      <motion.div className="flex flex-1 flex-col items-center justify-center px-6">
        <AnimatePresence mode="wait">
          {!open ? (
            <motion.div
              key="closed"
              initial={{ opacity: 0, rotateX: -8 }}
              animate={{ opacity: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="perspective-[800px]"
            >
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="glass-panel group relative mx-auto flex h-48 w-72 flex-col items-center justify-center rounded-2xl border-[#c9a962]/30 transition hover:gold-glow sm:h-56 sm:w-80"
              >
                <span className="mb-2 text-4xl opacity-60 transition group-hover:scale-110">✉</span>
                <Typography variant="caption">{t("letter.open")}</Typography>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-xl"
            >
              <GlassCard>
                {PARAGRAPHS.map((key, i) => (
                  <motion.p
                    key={key}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="mb-4 font-[family-name:var(--font-cormorant)] text-lg leading-relaxed text-stone-300 last:mb-0"
                  >
                    {i === PARAGRAPHS.length - 1 ? (
                      <span className="text-gradient-gold text-2xl">{t(key)}</span>
                    ) : (
                      t(key)
                    )}
                  </motion.p>
                ))}
                <Typography variant="caption" className="mt-8 block text-right text-[#c9a962]">
                  {t("letter.signature")}
                </Typography>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <SceneNav sceneId="letter" showNext={open} />
    </motion.div>
  );
}
