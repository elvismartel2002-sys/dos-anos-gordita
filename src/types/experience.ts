export type Locale = "es" | "en" | "pt";

export type SceneId =
  | "language"
  | "intro"
  | "login"
  | "profiles"
  | "timeline"
  | "story"
  | "gallery"
  | "media"
  | "letter"
  | "finale";

export type ProfileId = "her" | "him" | "us";

export type Mood = "joy" | "love" | "adventure" | "growth" | "home";

export type MediaRef = {
  type: "image" | "video";
  src: string;
  alt?: string;
  poster?: string;
};

export type TimelineEvent = {
  id: string;
  date: string;
  titleKey: string;
  bodyKey: string;
  mood: Mood;
  highlight?: boolean;
  media?: MediaRef[];
};

export type MemoryItem = {
  id: string;
  chapterKey: string;
  type: "photo" | "video" | "quote";
  src: string;
  captionKey?: string;
  poster?: string;
};

export type StoryChapter = {
  id: string;
  titleKey: string;
  bodyKey: string;
  media: MediaRef;
};

export type MusicTrack = {
  id: string;
  titleKey: string;
  artistKey: string;
  src: string;
  cover?: string;
};

export type VideoItem = {
  id: string;
  titleKey: string;
  src: string;
  poster: string;
};

export type Profile = {
  id: ProfileId;
  nameKey: string;
  taglineKey: string;
  avatar: string;
};
