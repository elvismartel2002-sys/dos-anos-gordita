export const theme = {
  colors: {
    bgDeep: "#0a0a0b",
    bgElevated: "#121214",
    textPrimary: "#f5f5f4",
    textMuted: "#a8a29e",
    gold: "#c9a962",
    goldDim: "#8a7340",
  },
  transition: {
    scene: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
    micro: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const;
