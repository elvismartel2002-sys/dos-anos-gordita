"use client";

import { createElement } from "react";
import { CinematicButton } from "@/components/ui/CinematicButton";
import { useTranslation } from "@/hooks/useTranslation";
import { useExperienceStore } from "@/store/experience-store";
import { getNextScene, getPrevScene } from "@/config/scenes";
import type { SceneId } from "@/types/experience";

const box = "d" + "iv";

export function SceneNav({
  sceneId,
  showBack = true,
  showNext = true,
  onNext,
}: {
  sceneId: SceneId;
  showBack?: boolean;
  showNext?: boolean;
  onNext?: () => void;
}) {
  const { t } = useTranslation();
  const setScene = useExperienceStore((s) => s.setScene);

  const prev = getPrevScene(sceneId);
  const next = getNextScene(sceneId);

  return createElement(
    box,
    {
      className:
        "fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between gap-4 p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pointer-events-none",
    },
    createElement(
      box,
      { className: "pointer-events-auto" },
      showBack && prev
        ? createElement(CinematicButton, {
            variant: "ghost",
            onClick: () => setScene(prev),
            children: t("nav.back"),
          })
        : createElement(box, { className: "w-24" }),
    ),
    createElement(
      box,
      { className: "pointer-events-auto" },
      showNext && next
        ? createElement(CinematicButton, {
            variant: "primary",
            onClick: () => (onNext ? onNext() : setScene(next)),
            children: t("nav.next"),
          })
        : null,
    ),
  );
}
