import type { SceneId } from "@/types/experience";

export type SceneDefinition = {
  id: SceneId;
  requiresUnlock?: boolean;
  preload?: ("audio" | "images" | "video")[];
};

/** Orden narrativo tipo app — una escena full-screen a la vez */
export const SCENES: SceneDefinition[] = [
  { id: "language", preload: [] },
  { id: "intro", preload: ["audio"] },
  { id: "login" },
  { id: "profiles", requiresUnlock: true },
  { id: "timeline", requiresUnlock: true, preload: ["images"] },
  { id: "story", requiresUnlock: true, preload: ["images", "video"] },
  { id: "gallery", requiresUnlock: true, preload: ["images"] },
  { id: "media", requiresUnlock: true, preload: ["video", "audio"] },
  { id: "letter", requiresUnlock: true },
  { id: "finale", requiresUnlock: true, preload: ["video", "audio"] },
];

export const SCENE_ORDER = SCENES.map((s) => s.id);

export function getSceneIndex(id: SceneId): number {
  return SCENE_ORDER.indexOf(id);
}

export function getNextScene(id: SceneId): SceneId | null {
  const i = getSceneIndex(id);
  return i >= 0 && i < SCENE_ORDER.length - 1 ? SCENE_ORDER[i + 1] : null;
}

export function getPrevScene(id: SceneId): SceneId | null {
  const i = getSceneIndex(id);
  return i > 0 ? SCENE_ORDER[i - 1] : null;
}
