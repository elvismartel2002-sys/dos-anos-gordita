import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Locale, ProfileId, SceneId } from "@/types/experience";

type ExperienceState = {
  locale: Locale | null;
  currentScene: SceneId;
  unlocked: boolean;
  activeProfile: ProfileId | null;
  audioEnabled: boolean;
  introComplete: boolean;
  setLocale: (locale: Locale) => void;
  setScene: (scene: SceneId) => void;
  goNext: () => void;
  goBack: () => void;
  setUnlocked: (value: boolean) => void;
  setActiveProfile: (profile: ProfileId) => void;
  setAudioEnabled: (value: boolean) => void;
  setIntroComplete: (value: boolean) => void;
  resetExperience: () => void;
};

import { getNextScene, getPrevScene, SCENE_ORDER } from "@/config/scenes";

const initialScene: SceneId = "language";

export const useExperienceStore = create<ExperienceState>()(
  persist(
    (set, get) => ({
      locale: null,
      currentScene: initialScene,
      unlocked: false,
      activeProfile: null,
      audioEnabled: false,
      introComplete: false,

      setLocale: (locale) => set({ locale }),

      setScene: (scene) => set({ currentScene: scene }),

      goNext: () => {
        const next = getNextScene(get().currentScene);
        if (next) set({ currentScene: next });
      },

      goBack: () => {
        const prev = getPrevScene(get().currentScene);
        if (prev) set({ currentScene: prev });
      },

      setUnlocked: (unlocked) => set({ unlocked }),

      setActiveProfile: (activeProfile) => set({ activeProfile }),

      setAudioEnabled: (audioEnabled) => set({ audioEnabled }),

      setIntroComplete: (introComplete) => set({ introComplete }),

      resetExperience: () =>
        set({
          currentScene: "language",
          unlocked: false,
          activeProfile: null,
          introComplete: false,
          audioEnabled: false,
        }),
    }),
    {
      name: "dos-anos-gordita",
      partialize: (state) => ({
        locale: state.locale,
        unlocked: state.unlocked,
        activeProfile: state.activeProfile,
        introComplete: state.introComplete,
      }),
    },
  ),
);

export function canAccessScene(
  scene: SceneId,
  unlocked: boolean,
): boolean {
  const def = SCENE_ORDER.includes(scene);
  if (!def) return false;
  const requiresUnlock = [
    "profiles",
    "timeline",
    "story",
    "gallery",
    "media",
    "letter",
    "finale",
  ].includes(scene);
  return !requiresUnlock || unlocked;
}
