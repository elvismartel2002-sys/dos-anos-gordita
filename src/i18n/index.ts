import type { Locale } from "@/types/experience";
import en from "./locales/en.json";
import es from "./locales/es.json";
import pt from "./locales/pt.json";

export type Dictionary = typeof es;

const dictionaries: Record<Locale, Dictionary> = { es, en, pt };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.es;
}

/** Resuelve claves anidadas: "intro.line1" */
export function t(
  dict: Dictionary,
  key: string,
): string {
  const parts = key.split(".");
  let current: unknown = dict;

  for (const part of parts) {
    if (current === null || typeof current !== "object") return key;
    current = (current as Record<string, unknown>)[part];
  }

  return typeof current === "string" ? current : key;
}
