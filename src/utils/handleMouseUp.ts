export function handleMouseUp(cueRef: HTMLParagraphElement): string | null {
  if (!cueRef) return null;

  const selection = window.getSelection(); // get global text selection

  if (!selection || selection.isCollapsed) return null; // check if selection contains sth

  const range = selection.getRangeAt(0); // take what text that selection contains

  const cueElement = cueRef; // get current cue

  if (!cueElement || !cueElement.contains(range.commonAncestorContainer)) {
    // if no cue, or current cue doesn't contain the deepest DOM node containing both start and  end of the selection
    return null;
  }

  const selectedText = selection.toString().trim(); // get selection's text

  if (!selectedText) return null;

  return selectedText; // selectedText will be translated
}
