"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import timelineData from "@/content/timeline.json";
import { SceneHeader } from "@/components/experience/shared/SceneHeader";
import { SceneNav } from "@/components/layout/SceneNav";
import { GlassCard } from "@/components/ui/GlassCard";
import { Typography } from "@/components/ui/Typography";
import { useTranslation } from "@/hooks/useTranslation";
import type { TimelineEvent } from "@/types/experience";
import { cn } from "@/lib/utils/cn";

const events = timelineData as TimelineEvent[];

export function TimelineScene() {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState<string | null>(events.find((e) => e.highlight)?.id ?? null);

  const active = events.find((e) => e.id === activeId);

  return (
    <motion.div className="flex flex-1 flex-col pb-28">
      <SceneHeader title={t("timeline.title")} subtitle={t("timeline.subtitle")} />

      <motion.div className="scene-scroll flex-1 px-4 sm:px-8">
        <motion.ol className="relative mx-auto max-w-lg border-l border-[#c9a962]/20 pl-8">
          {events.map((event, i) => (
            <motion.li
              key={event.id}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.04 }}
              className="mb-10"
            >
              <button
                type="button"
                onClick={() => setActiveId(event.id)}
                className="group w-full text-left"
              >
                <span
                  className={cn(
                    "absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full border-2 transition-colors",
                    activeId === event.id
                      ? "border-[#c9a962] bg-[#c9a962] shadow-[0_0_12px_rgba(201,169,98,0.6)]"
                      : "border-stone-600 bg-stone-900 group-hover:border-[#c9a962]/60",
                    event.highlight && "h-3.5 w-3.5 -left-[7px]",
                  )}
                />
                <time className="text-xs uppercase tracking-widest text-[#c9a962]/70">
                  {new Date(event.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <Typography
                  variant="h2"
                  className={cn(
                    "mt-1 text-xl text-stone-200",
                    event.highlight && "text-[#f5e6c8]",
                  )}
                >
                  {t(event.titleKey)}
                </Typography>
              </button>
            </motion.li>
          ))}
        </motion.ol>

        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mx-auto mt-4 max-w-lg px-2 pb-8"
            >
              <GlassCard>
                <Typography variant="h2" className="mb-3 text-[#f5e6c8]">
                  {t(active.titleKey)}
                </Typography>
                <Typography variant="body">{t(active.bodyKey)}</Typography>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <SceneNav sceneId="timeline" />
    </motion.div>
  );
}
