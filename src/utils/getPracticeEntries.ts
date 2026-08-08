import type { WordEntry } from "../context/Context.tsx";
import { LOCAL_STORAGE_KEYS, ROUNDS_PER_PRACTICE } from "../constants.ts";

export function getPracticeEntries(practiceLanguage: string): WordEntry[] {
  const storedEntries = localStorage.getItem(LOCAL_STORAGE_KEYS.VOCABULARY);

  if (!storedEntries) return [];

  try {
    // parse
    const parsedEntries: WordEntry[] = JSON.parse(storedEntries);

    if (!Array.isArray(parsedEntries)) return [];

    const now = Date.now();

    // get entries in the language and that are due
    const dueEntries = parsedEntries.filter((entry) => {
      const isEntryInLanguage = entry.language === practiceLanguage;
      const timeIsNowOrInPast = new Date(entry.nextPractice).getTime() <= now;
      const nextPracticeUndefined = !entry.nextPractice;
      return isEntryInLanguage && (timeIsNowOrInPast || nextPracticeUndefined);
    });

    if (dueEntries.length === 0) return [];

    // get random 5 of thme
    return dueEntries
      .map((entry) => ({ entry, random: Math.random() }))
      .sort((a, b) => a.random - b.random)
      .map(({ entry }) => entry)
      .slice(0, ROUNDS_PER_PRACTICE);
  } catch {
    return [];
  }
}
