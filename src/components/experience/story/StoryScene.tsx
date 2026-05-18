"use client";

import { motion } from "framer-motion";
import storyData from "@/content/story.json";
import { SceneHeader } from "@/components/experience/shared/SceneHeader";
import { SceneNav } from "@/components/layout/SceneNav";
import { Typography } from "@/components/ui/Typography";
import { useTranslation } from "@/hooks/useTranslation";
import type { StoryChapter } from "@/types/experience";

const chapters = storyData as StoryChapter[];

export function StoryScene() {
  const { t } = useTranslation();

  return (
    <motion.div className="flex flex-1 flex-col pb-28">
      <SceneHeader title={t("story.title")} subtitle={t("story.subtitle")} />

      <motion.div className="scene-scroll flex-1 space-y-24 px-6 py-8">
        {chapters.map((ch, i) => (
          <motion.article
            key={ch.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: i * 0.05 }}
            className="mx-auto max-w-2xl text-center"
          >
            <Typography variant="caption" className="mb-4">
              {String(i + 1).padStart(2, "0")}
            </Typography>
            <Typography variant="h1" className="mb-6 text-[#f5e6c8]">
              {t(ch.titleKey)}
            </Typography>
            <Typography variant="body" className="text-stone-400">
              {t(ch.bodyKey)}
            </Typography>
            <motion.div className="mx-auto mt-8 h-48 max-w-md rounded-2xl border border-white/10 bg-stone-900/50 glass-panel flex items-center justify-center text-stone-600 text-sm">
              {ch.media.type === "video" ? "▶ Video" : "📷 Foto"} — {ch.media.src}
            </motion.div>
          </motion.article>
        ))}
      </motion.div>

      <SceneNav sceneId="story" />
    </motion.div>
  );
}
