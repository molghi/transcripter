import type { WordEntry } from "../context/Context.tsx";
import { LOCAL_STORAGE_KEYS } from "../constants.ts";

type PracticeGrade = "poor" | "fair" | "good" | "perfect";

export default function saveSpacedRepetition(answers: Record<string, string>): void {
  const storedEntries = localStorage.getItem(LOCAL_STORAGE_KEYS.VOCABULARY);

  if (!storedEntries) return;

  let entries: WordEntry[];

  try {
    entries = JSON.parse(storedEntries);
  } catch {
    return;
  }

  if (!Array.isArray(entries) || entries.length === 0) return;

  entries.forEach((entry) => {
    if (!(entry.id in answers)) return;

    const answer = answers[entry.id];

    if (!["poor", "fair", "good", "perfect"].includes(answer)) return;

    const grade = answer as PracticeGrade;

    // const now = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -1);
    const now = new Date().toISOString();

    entry.nextPractice = spacedRepetition(grade);
    entry.modifiedAt = now;
  });

  // console.log(entries);
  localStorage.setItem(LOCAL_STORAGE_KEYS.VOCABULARY, JSON.stringify(entries));
}

// ============================================================================

export function spacedRepetition(grade: "poor" | "fair" | "good" | "perfect"): string {
  const now = new Date();

  switch (grade) {
    case "poor":
      now.setMinutes(now.getMinutes() + 10);
      break;

    case "fair":
      now.setDate(now.getDate() + 1);
      break;

    case "good":
      now.setDate(now.getDate() + 3);
      break;

    case "perfect":
      now.setDate(now.getDate() + 7);
      break;
  }

  return now.toISOString();
}
