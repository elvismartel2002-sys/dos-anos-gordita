import { create } from "zustand";

type AudioState = {
  isPlaying: boolean;
  volume: number;
  currentTrackId: string | null;
  setPlaying: (playing: boolean) => void;
  setVolume: (volume: number) => void;
  setCurrentTrack: (id: string | null) => void;
};

export const useAudioStore = create<AudioState>((set) => ({
  isPlaying: false,
  volume: 0.6,
  currentTrackId: null,
  setPlaying: (isPlaying) => set({ isPlaying }),
  setVolume: (volume) => set({ volume }),
  setCurrentTrack: (currentTrackId) => set({ currentTrackId }),
}));
