"use client";

import { motion } from "framer-motion";
import mediaContent from "@/content/media.json";
import { SceneHeader } from "@/components/experience/shared/SceneHeader";
import { SceneNav } from "@/components/layout/SceneNav";
import { GlassCard } from "@/components/ui/GlassCard";
import { Typography } from "@/components/ui/Typography";
import { useTranslation } from "@/hooks/useTranslation";

export function MediaScene() {
  const { t } = useTranslation();
  const { videos, music } = mediaContent;

  return (
    <motion.div className="flex flex-1 flex-col pb-28">
      <SceneHeader title={t("media.title")} subtitle={t("media.subtitle")} />

      <motion.div className="scene-scroll flex-1 space-y-10 px-6 pb-8">
        <section>
          <Typography variant="caption" className="mb-4 block">
            {t("media.videos")}
          </Typography>
          <motion.ul className="space-y-4">
            {videos.map((v) => (
              <li key={v.id}>
                <GlassCard className="!p-4">
                  <Typography variant="h2" className="mb-2 text-lg text-[#f5e6c8]">
                    {t(v.titleKey)}
                  </Typography>
                  <video
                    className="w-full rounded-lg bg-black"
                    controls
                    playsInline
                    preload="metadata"
                    poster={v.poster}
                  >
                    <source src={v.src} type="video/mp4" />
                  </video>
                </GlassCard>
              </li>
            ))}
          </motion.ul>
        </section>

        <section>
          <Typography variant="caption" className="mb-4 block">
            {t("media.music")}
          </Typography>
          <motion.ul className="space-y-3">
            {music.map((track) => (
              <li key={track.id}>
                <GlassCard className="!p-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <motion.div>
                    <Typography variant="h2" className="text-lg text-[#f5e6c8]">
                      {t(track.titleKey)}
                    </Typography>
                    <Typography variant="label">{t(track.artistKey)}</Typography>
                  </motion.div>
                  <audio controls preload="none" className="w-full sm:max-w-xs">
                    <source src={track.src} type="audio/mpeg" />
                  </audio>
                </GlassCard>
              </li>
            ))}
          </motion.ul>
        </section>
      </motion.div>

      <SceneNav sceneId="media" />
    </motion.div>
  );
}
