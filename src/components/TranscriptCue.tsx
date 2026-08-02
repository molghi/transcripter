import { useRef } from "react";
import { useAppContext } from "../context/Context.tsx";
import type { SrtCueShape, VttCueShape, WordEntry } from "../context/Context.tsx";
import { formatCueStartTime } from "../utils/formatSeconds.ts";
import { defineTransliteratorFn } from "../utils/defineTransliteratorFn.ts";
import { translateSelection } from "../utils/translateSelection.ts";
import { findDictionaryEntry } from "../utils/findDictionaryEntry.ts";
import { handleMouseUp } from "../utils/handleMouseUp.ts";
import { LOCAL_STORAGE_KEYS } from "../constants.ts";

type Props = {
  cue: SrtCueShape | VttCueShape;
  index: number;
  type: "srt" | "vtt";
  setClickedCueStart: React.Dispatch<React.SetStateAction<number | null>>;
  activeCue: number | null;
};

export default function TranscriptCue({ cue, index, type, setClickedCueStart, activeCue }: Props) {
  //
  const { selectedLanguage, setTranslations, setClosestSentence, setClickedCueTime, setIsBeingFetched } = useAppContext();

  const cueRef = useRef<HTMLParagraphElement>(null);

  const nonLatinLangs = ["ar", "fa", "zh", "ru", "he", "el", "ja", "hi"]; // not using latin script
  const semiticLangs = ["ar", "fa", "he"]; // written right to left
  const isNonLatinLang = nonLatinLangs.includes(selectedLanguage);
  const isSemiticLang = semiticLangs.includes(selectedLanguage);

  // define fn to transliterate non-latin langs
  const functionToTransliterate = defineTransliteratorFn(selectedLanguage);

  // format start time nicely
  const startTime = formatCueStartTime(type, cue);

  // ====================================

  // on mouse up from text selection: fetch translations, set enclosing sentence
  const translate = async (event: React.MouseEvent<HTMLParagraphElement>): Promise<void> => {
    // search my dict before sending API req
    const dictEntries = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.VOCABULARY) ?? "[]");
    const textSelection = cueRef.current ? handleMouseUp(cueRef.current) : null;
    const foundEntry: WordEntry | null = findDictionaryEntry(dictEntries, selectedLanguage, textSelection);

    const clickedCueStartTime = event.currentTarget.closest("p")?.querySelector("span")?.textContent ?? "";
    setClickedCueTime(clickedCueStartTime);

    setTranslations([""]);
    if (foundEntry) {
      setIsBeingFetched(false);
      setTranslations(foundEntry.translations);
      setClosestSentence(foundEntry.sentence);
    } else {
      setIsBeingFetched(true);
      const res = await translateSelection(event, cueRef.current, selectedLanguage);
      if (!res) return;
      const { results: translationResults, enclosingSentence } = res;
      setTranslations(translationResults);
      setClosestSentence(enclosingSentence);
    }
  };

  // ====================================

  return (
    <p ref={cueRef} onMouseUp={translate} id={`cue-${index}`} className={`flex gap-4 border-l border-l-[3px] pl-4 transition ${activeCue === index ? "text-white/90 border-[cyan]" : "text-white/40 border-white/10"}`}>
      {/* CUE START TIME */}
      <span
        onClick={() => {
          // if SRT and if VTT
          const startTime = "startSeconds" in cue ? cue.startSeconds : cue.startTime;
          setClickedCueStart(startTime);
        }}
        className="select-none mr-5 text-white/35 transition hover:text-white/100 cursor-pointer hover:underline active:no-underline active:opacity-75"
        title="Play at selected time"
      >
        {startTime}
      </span>

      <span className="flex flex-col gap-2">
        {/* CUE TEXT */}
        <span className="text-[18px]" lang={selectedLanguage} dir={isSemiticLang ? "rtl" : "ltr"}>
          {cue.text}
        </span>

        {/* TRANSLITERATE NON-LATIN LANGUAGE */}
        {isNonLatinLang && <span className="text-[14px] transition opacity-50 hover:opacity-100 italic">{functionToTransliterate && functionToTransliterate(cue.text)}</span>}
      </span>
    </p>
  );
}
