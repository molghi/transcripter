import type { SelectionPopup } from "../components/Transcript.tsx";

export function handleTextSelection(setSelectionPopup: React.Dispatch<React.SetStateAction<SelectionPopup>>): void {
  //
  const selection = window.getSelection();

  if (!selection || selection.isCollapsed) return setSelectionPopup(null);

  const selectedText = selection.toString().trim();

  if (!selectedText) return setSelectionPopup(null);

  const range = selection.getRangeAt(0);

  const rect = range.getBoundingClientRect();

  setSelectionPopup({
    text: selectedText,
    // x: rect.left + rect.width / 2 + window.scrollX - 32,
    // y: rect.top + window.scrollY - 140,
    // x: rect.left + rect.width / 2 + window.scrollX,
    x: rect.left + window.scrollX,
    y: rect.top + window.scrollY - 16,
  });
}
