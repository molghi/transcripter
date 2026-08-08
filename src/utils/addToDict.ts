import { LOCAL_STORAGE_KEYS } from "../constants.ts";
import type { WordEntry } from "../context/Context.tsx";
import type { SelectionPopup } from "../components/Transcript.tsx";

export function addToDict(selectionPopup: SelectionPopup, closestSentence: string | null, translations: string[], selectedLanguage: string, videoName: string, videoUrl: string, clickedCueTime: string) {
  if (!selectionPopup) return;

  // const now = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -1);
  const now = new Date().toISOString();

  const entry: WordEntry = {
    word: selectionPopup.text ?? "",
    sentence: closestSentence ?? "",
    translations: translations?.slice(0, 5) ?? [],
    translation: translations?.slice(0, 5).join(", ") ?? "",
    language: selectedLanguage,
    createdAt: now,
    modifiedAt: now,
    videoName,
    videoUrl,
    videoTime: clickedCueTime,
    nextPractice: "",
    id: crypto.randomUUID(),
  };

  const dictInLS = localStorage.getItem(LOCAL_STORAGE_KEYS.VOCABULARY);

  try {
    const dictionary = dictInLS ? JSON.parse(dictInLS) : [];

    localStorage.setItem(LOCAL_STORAGE_KEYS.VOCABULARY, JSON.stringify([...dictionary, entry]));
  } catch {
    localStorage.setItem(LOCAL_STORAGE_KEYS.VOCABULARY, JSON.stringify([entry]));
  }
}
