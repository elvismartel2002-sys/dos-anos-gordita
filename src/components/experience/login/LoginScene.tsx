"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Typography } from "@/components/ui/Typography";
import { GlassCard } from "@/components/ui/GlassCard";
import { CinematicButton } from "@/components/ui/CinematicButton";
import { useTranslation } from "@/hooks/useTranslation";
import { useExperienceStore } from "@/store/experience-store";

export function LoginScene() {
  const { t } = useTranslation();
  const goNext = useExperienceStore((s) => s.goNext);
  const setUnlocked = useExperienceStore((s) => s.setUnlocked);

  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setError(true);
        return;
      }

      setUnlocked(true);
      goNext();
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="flex flex-1 flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <GlassCard>
          <Typography variant="caption" className="mb-2 text-[#c9a962]/70">
            DOS AÑOS GORDITA
          </Typography>
          <Typography variant="h2" className="mb-2 text-[#f5e6c8]">
            {t("login.title")}
          </Typography>
          <Typography variant="body" className="mb-8 text-stone-500">
            {t("login.subtitle")}
          </Typography>

          <form onSubmit={submit} className="space-y-4">
            <input
              type="password"
              inputMode="numeric"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("login.placeholder")}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-center text-lg tracking-[0.3em] text-white outline-none transition focus:border-[#c9a962]/50 focus:ring-2 focus:ring-[#c9a962]/20"
            />
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-sm text-red-400/90"
              >
                {t("login.error")}
              </motion.p>
            )}
            <Typography variant="caption" className="block text-center normal-case tracking-normal text-stone-600">
              {t("login.hint")}
            </Typography>
            <CinematicButton type="submit" disabled={loading} className="w-full">
              {t("login.submit")}
            </CinematicButton>
          </form>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}
