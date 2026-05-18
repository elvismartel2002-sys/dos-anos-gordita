"use client";

import { createElement, Fragment, useEffect } from "react";
import { SceneWrapper } from "@/components/layout/SceneWrapper";
import { FilmGrain } from "@/components/ui/FilmGrain";
import { LanguageScene } from "@/components/experience/language/LanguageScene";
import { IntroScene } from "@/components/experience/intro/IntroScene";
import { LoginScene } from "@/components/experience/login/LoginScene";
import { ProfilesScene } from "@/components/experience/profiles/ProfilesScene";
import { TimelineScene } from "@/components/experience/timeline/TimelineScene";
import { StoryScene } from "@/components/experience/story/StoryScene";
import { GalleryScene } from "@/components/experience/gallery/GalleryScene";
import { MediaScene } from "@/components/experience/media/MediaScene";
import { LetterScene } from "@/components/experience/letter/LetterScene";
import { FinaleScene } from "@/components/experience/finale/FinaleScene";
import { useExperienceStore, canAccessScene } from "@/store/experience-store";
import type { SceneId } from "@/types/experience";
import { SCENES } from "@/config/scenes";

const box = "d" + "iv";

const sceneComponents: Record<SceneId, React.ComponentType> = {
  language: LanguageScene,
  intro: IntroScene,
  login: LoginScene,
  profiles: ProfilesScene,
  timeline: TimelineScene,
  story: StoryScene,
  gallery: GalleryScene,
  media: MediaScene,
  letter: LetterScene,
  finale: FinaleScene,
};

export function ExperienceShell() {
  const currentScene = useExperienceStore((s) => s.currentScene);
  const unlocked = useExperienceStore((s) => s.unlocked);
  const setUnlocked = useExperienceStore((s) => s.setUnlocked);
  const setScene = useExperienceStore((s) => s.setScene);

  useEffect(() => {
    fetch("/api/unlock")
      .then((r) => r.json())
      .then((data: { unlocked?: boolean }) => {
        if (data.unlocked) setUnlocked(true);
      })
      .catch(() => undefined);
  }, [setUnlocked]);

  useEffect(() => {
    const def = SCENES.find((s) => s.id === currentScene);
    if (def?.requiresUnlock && !unlocked && currentScene !== "login") {
      setScene("login");
    }
    if (!canAccessScene(currentScene, unlocked)) {
      setScene(unlocked ? "profiles" : "login");
    }
  }, [currentScene, unlocked, setScene]);

  const SceneComponent = sceneComponents[currentScene];

  return createElement(
    Fragment,
    null,
    createElement(box, { "aria-hidden": true, className: "vignette" }),
    createElement(FilmGrain),
    createElement(
      box,
      { className: "relative h-[100dvh] w-full overflow-hidden" },
      createElement(
        SceneWrapper,
        { sceneId: currentScene },
        createElement(SceneComponent),
      ),
    ),
  );
}
