import type { DictionaryEntry } from "../context/Context.tsx";

export function findDictionaryEntry(entries: DictionaryEntry[] | null, selectedLanguage: string | null, selectedText: string | null): DictionaryEntry | null {
  //
  // No dictionary or empty dictionary guard clasue
  if (!entries || entries.length === 0) return null;
  if (!selectedLanguage) return null;
  if (!selectedText) return null;

  // Keep only entries from the current language
  const entriesInLanguage = entries.filter((entry) => entry.language === selectedLanguage);

  // No entries for this language guard clause
  if (entriesInLanguage.length === 0) return null;

  // Find an exact match for the selected text
  const entry = entriesInLanguage.find((entry) => entry.word.trim().toLowerCase() === selectedText.trim().toLowerCase()) ?? null;

  return entry;
}
