import { transliterateArabicAndPersian, transliterateChinese, transliterateRussian, transliterateHebrewText, transliterateGreek, transliterateHindi } from "../utils/transliterationTools.ts";

export function defineTransliteratorFn(selectedLanguage: string) {
  let functionToTransliterate;

  switch (selectedLanguage) {
    case "ar":
    case "fa":
      functionToTransliterate = transliterateArabicAndPersian;
      break;
    case "zh":
      functionToTransliterate = transliterateChinese;
      break;
    case "ru":
      functionToTransliterate = transliterateRussian;
      break;
    case "he":
      functionToTransliterate = transliterateHebrewText;
      break;
    case "el":
      functionToTransliterate = transliterateGreek;
      break;
    case "ja":
      // functionToTransliterate = transliterateJapanese;
      functionToTransliterate = null;
      break;
    case "hi":
      functionToTransliterate = transliterateHindi;
      break;
    default:
      functionToTransliterate = null;
      break;
  }

  return functionToTransliterate;
}
