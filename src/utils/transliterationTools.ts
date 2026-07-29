function transliterateArabicAndPersian(text: string): string {
  const map: Record<string, string> = {
    // Arabic
    ا: "a",
    أ: "a",
    إ: "i",
    آ: "ā",
    ب: "b",
    ت: "t",
    ث: "s",
    ج: "g", // Egyptian pronunciation
    ح: "h",
    خ: "x",
    د: "d",
    ذ: "ż",
    ر: "r",
    ز: "z",
    س: "s",
    ش: "š",
    ص: "S",
    ض: "D",
    ط: "T",
    ظ: "Z",
    ع: "'",
    غ: "ğ",
    ف: "f",
    ق: "q",
    ك: "k",
    ل: "l",
    م: "m",
    ن: "n",
    ه: "h",
    و: "w",
    ي: "y",
    ء: "'",
    ؤ: "'",
    ئ: "'",
    ى: "a",
    ة: "a",

    // Persian-only letters
    پ: "p",
    چ: "č",
    ژ: "ž",
    گ: "g",

    // Persian variants of Arabic letters
    ی: "y",
    ک: "k",

    // Hamza / ligatures
    لا: "la",
    ٱ: "a",

    // Diacritics
    "َ": "a",
    "ِ": "i",
    "ُ": "u",
    "ً": "an",
    "ٍ": "in",
    "ٌ": "un",
    "ْ": "",
    "ّ": "",
    "ٰ": "ā",
  };

  return [...text].map((char) => map[char] ?? char).join("");
}

// ============================================================================

import { pinyin } from "pinyin-pro";

function transliterateChinese(text: string): string {
  return pinyin(text, {
    toneType: "symbol",
    type: "string",
    nonZh: "consecutive",
  });
}

// ============================================================================

function transliterateRussian(text: string): string {
  const map: Record<string, string> = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "jo",
    ж: "ž",
    з: "z",
    и: "i",
    й: "j",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "x",
    ц: "c",
    ч: "č",
    ш: "š",
    щ: "ş",
    ы: "y",
    э: "e",
    ю: "ju",
    я: "ja",
    ь: "'",
    ъ: "'",
  };

  return [...text]
    .map((char) => {
      const lower = char.toLowerCase();
      const transliterated = map[lower];

      if (transliterated === undefined) return char;

      const isUppercase = char !== lower;

      return isUppercase ? transliterated.charAt(0).toUpperCase() + transliterated.slice(1) : transliterated;
    })
    .join("");
}

// ============================================================================

import { transliterate as transliterateHebrew } from "hebrew-transliteration";

function transliterateHebrewText(text: string): string {
  return transliterateHebrew(text);
}

// ============================================================================

import { transliterate } from "transliteration";

function transliterateGreek(text: string): string {
  return transliterate(text);
}

// ============================================================================

import Kuroshiro from "@sglkc/kuroshiro";
import KuromojiAnalyzer from "@sglkc/kuroshiro-analyzer-kuromoji";

const kuroshiro = new Kuroshiro();

const japaneseInitialization = kuroshiro.init(new KuromojiAnalyzer());

async function transliterateJapanese(text: string): Promise<string> {
  await japaneseInitialization;

  return kuroshiro.convert(text, {
    to: "romaji",
    mode: "spaced",
    romajiSystem: "hepburn",
  });
}

// ============================================================================

import Sanscript from "@lorefnon/sanscript";

function transliterateHindi(text: string): string {
  return Sanscript.t(text, "devanagari", "iast");
}

// ============================================================================

export { transliterateArabicAndPersian, transliterateChinese, transliterateRussian, transliterateHebrewText, transliterateGreek, transliterateJapanese, transliterateHindi };
