"use client";

import { AnimatePresence, motion } from "framer-motion";
import { theme } from "@/config/theme";
import type { SceneId } from "@/types/experience";

export function SceneWrapper({
  sceneId,
  children,
}: {
  sceneId: SceneId;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={sceneId}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{
          duration: theme.transition.scene.duration,
          ease: theme.transition.scene.ease,
        }}
        className="absolute inset-0 flex flex-col"
      >
        {children}
      </motion.section>
    </AnimatePresence>
  );
}
