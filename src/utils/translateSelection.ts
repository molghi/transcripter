import { translate2 } from "../utils/translate.ts";
import { handleMouseUp } from "../utils/handleMouseUp.ts";
import { getClosestSentence } from "../utils/getClosestSentence.ts";

export async function translateSelection(e: React.MouseEvent<HTMLParagraphElement>, cueEl: HTMLParagraphElement | null, selectedLanguage: string): Promise<{ results: string[]; enclosingSentence: string | null } | null> {
  //

  if (!cueEl) return null;

  const textToTranslate = handleMouseUp(cueEl); // get string to be translated

  const enclosingSentence = getClosestSentence(e, textToTranslate || ""); // get closest enclosing sentence

  if (!textToTranslate) return null;

  const results: string[] = await translate2(textToTranslate, selectedLanguage); // translate

  return { results, enclosingSentence: enclosingSentence || "" };
}
