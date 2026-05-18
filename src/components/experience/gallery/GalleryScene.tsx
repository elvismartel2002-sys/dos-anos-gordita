"use client";

import { motion } from "framer-motion";
import memories from "@/content/memories.json";
import { SceneHeader } from "@/components/experience/shared/SceneHeader";
import { SceneNav } from "@/components/layout/SceneNav";
import { Typography } from "@/components/ui/Typography";
import { useTranslation } from "@/hooks/useTranslation";
import type { MemoryItem } from "@/types/experience";

const items = memories as MemoryItem[];

export function GalleryScene() {
  const { t } = useTranslation();

  return (
    <motion.div className="flex flex-1 flex-col pb-28">
      <SceneHeader title={t("gallery.title")} subtitle={t("gallery.subtitle")} />

      <motion.div className="scene-scroll flex-1 px-4 pb-8">
        <motion.ul className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {items.map((item, i) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10 bg-stone-900/80"
            >
              <motion.div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
                <span className="text-2xl opacity-30">{item.type === "video" ? "▶" : "♥"}</span>
                <Typography variant="caption" className="mt-2 normal-case tracking-normal text-stone-500">
                  {t(item.chapterKey)}
                </Typography>
              </motion.div>
              <motion.div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 transition group-hover:opacity-100 flex items-end p-3">
                <Typography variant="label" className="text-xs text-[#f5e6c8]">
                  {item.captionKey ? t(item.captionKey) : item.src.split("/").pop()}
                </Typography>
              </motion.div>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      <SceneNav sceneId="gallery" />
    </motion.div>
  );
}
