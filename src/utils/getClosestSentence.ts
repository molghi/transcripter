export function getClosestSentence(e: React.MouseEvent<HTMLParagraphElement>, myEntireSelection: string): string | null {
  if (!myEntireSelection) return null;

  const currentCueElement = e.currentTarget;
  if (!currentCueElement) return null;

  const currentCueTextSpan: HTMLSpanElement | null = currentCueElement.querySelector("span:nth-child(2)");

  let myFullCueText = currentCueTextSpan?.innerText || "";

  const selectionStart = myFullCueText.indexOf(myEntireSelection);

  if (selectionStart === -1) return myFullCueText;

  const selectionEnd = selectionStart + myEntireSelection.length;

  const punctuation = [".", "!", "?", "…"];

  const previousEnds = punctuation.map((mark) => myFullCueText.lastIndexOf(mark, selectionStart - 1));

  const nextEnds = punctuation.map((mark) => myFullCueText.indexOf(mark, selectionEnd)).filter((index) => index !== -1);

  const sentenceStart = Math.max(...previousEnds) + 1;

  const sentenceEnd = nextEnds.length > 0 ? Math.min(...nextEnds) + 1 : myFullCueText.length;

  return myFullCueText.slice(sentenceStart, sentenceEnd).trim();
}
