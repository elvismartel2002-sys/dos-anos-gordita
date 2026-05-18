"use client";

import { motion } from "framer-motion";
import profiles from "@/content/profiles.json";
import { Typography } from "@/components/ui/Typography";
import { useTranslation } from "@/hooks/useTranslation";
import { useExperienceStore } from "@/store/experience-store";
import type { Profile, ProfileId } from "@/types/experience";
import { cn } from "@/lib/utils/cn";

export function ProfilesScene() {
  const { t } = useTranslation();
  const setActiveProfile = useExperienceStore((s) => s.setActiveProfile);
  const goNext = useExperienceStore((s) => s.goNext);
  const active = useExperienceStore((s) => s.activeProfile);

  const select = (id: ProfileId) => setActiveProfile(id);

  const continueFlow = () => {
    if (active) goNext();
  };

  return (
    <motion.div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
      <Typography variant="h1" className="mb-2 text-center text-[#f5e6c8]">
        {t("profiles.title")}
      </Typography>
      <Typography variant="caption" className="mb-12 block text-center normal-case text-stone-500">
        Netflix · Perfiles
      </Typography>

      <ul className="grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
        {(profiles as Profile[]).map((profile, i) => (
          <motion.li
            key={profile.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <button
              type="button"
              onClick={() => select(profile.id)}
              className={cn(
                "group w-full text-left transition-transform hover:scale-[1.03]",
                active === profile.id && "scale-[1.03]",
              )}
            >
              <motion.div
                className={cn(
                  "glass-panel overflow-hidden rounded-2xl p-4",
                  active === profile.id && "border-[#c9a962]/50 gold-glow",
                )}
              >
                <motion.div
                  className="relative mb-4 flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-stone-900 to-stone-950"
                  style={{
                    backgroundImage: `url(${profile.avatar})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <motion.span className="text-5xl font-light text-[#c9a962]/30">
                    {t(profile.nameKey).charAt(0)}
                  </motion.span>
                  <motion.div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </motion.div>
                <Typography variant="h2" className="text-lg text-[#f5e6c8]">
                  {t(profile.nameKey)}
                </Typography>
                <Typography variant="label" className="mt-1 line-clamp-2">
                  {t(profile.taglineKey)}
                </Typography>
              </motion.div>
            </button>
          </motion.li>
        ))}
      </ul>

      {active && (
        <motion.button
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={continueFlow}
          className="mt-10 rounded-full border border-[#c9a962]/40 px-10 py-3 text-sm uppercase tracking-[0.2em] text-[#f5e6c8] hover:bg-[#c9a962]/10"
        >
          {t("profiles.continue")}
        </motion.button>
      )}
    </motion.div>
  );
}
