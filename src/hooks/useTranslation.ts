"use client";

import { useMemo } from "react";
import { getDictionary, t, type Dictionary } from "@/i18n";
import { useExperienceStore } from "@/store/experience-store";

export function useTranslation() {
  const locale = useExperienceStore((s) => s.locale) ?? "es";

  const dict = useMemo(() => getDictionary(locale), [locale]);

  const translate = (key: string) => t(dict, key);

  return { locale, dict, t: translate };
}

export type { Dictionary };
