"use client";

import { createElement, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ParticleField } from "./ParticleField";

const box = "d" + "iv";

export function CanvasRoot({ className }: { className?: string }) {
  return createElement(
    box,
    { className, "aria-hidden": true },
    createElement(
      Canvas,
      {
        camera: { position: [0, 0, 5], fov: 50 },
        dpr: [1, 1.5],
        gl: { antialias: true, alpha: true },
        style: { background: "transparent" },
      },
      createElement(Suspense, {
        fallback: null,
        children: [
          createElement("ambientLight", { intensity: 0.3, key: "a" }),
          createElement("pointLight", {
            position: [2, 2, 2],
            intensity: 0.6,
            color: "#c9a962",
            key: "p",
          }),
          createElement(ParticleField, { key: "particles" }),
        ],
      }),
    ),
  );
}
