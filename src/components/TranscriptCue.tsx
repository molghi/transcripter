import formatSeconds from "../utils/formatSeconds.ts";
import type { SrtCueShape, VttCueShape } from "../context/Context.tsx";
import { useAppContext } from "../context/Context.tsx";
import { useEffect, useRef } from "react";
import { LOCAL_STORAGE_KEYS } from "../constants.ts";
import { translate2 } from "../utils/translate.ts";
import { handleMouseUp } from "../utils/handleMouseUp.ts";
import { getClosestSentence } from "../utils/getClosestSentence.ts";
import { transliterateArabicAndPersian, transliterateChinese, transliterateRussian, transliterateHebrewText, transliterateGreek, transliterateHindi } from "../utils/transliterationTools.ts";
// transliterateJapanese

type Props = {
  cue: SrtCueShape | VttCueShape;
  index: number;
  type: "srt" | "vtt";
  setClickedCueStart: React.Dispatch<React.SetStateAction<number | null>>;
};

export default function TranscriptCue({ cue, index, type, setClickedCueStart }: Props) {
  const { transcriptData, currentVideoTime, selectedLanguage, setTranslations, activeCue, setActiveCue, setClosestSentence } = useAppContext();
  const cueRef = useRef<HTMLParagraphElement>(null);

  const nonLatinLangs = ["ar", "fa", "zh", "ru", "he", "el", "ja", "hi"];
  const semiticLangs = ["ar", "fa", "he"];
  const isNonLatinLang = nonLatinLangs.includes(selectedLanguage);
  const isSemiticLang = semiticLangs.includes(selectedLanguage);

  let functionToTransliterate = null;
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
      break;
  }

  // format start time nicely
  let startTime = type === "vtt" && typeof cue.startTime === "number" ? formatSeconds(cue.startTime) : cue.startTime;
  startTime = String(startTime);
  startTime = startTime.split(",")[0];

  // ====================================

  // set active cue
  useEffect(() => {
    if (!transcriptData) return;

    const cuesData: any[] = Array.isArray(transcriptData.data) ? transcriptData.data : transcriptData.data.cues;

    const activeIndex = cuesData.findIndex((cue) => {
      if ("startSeconds" in cue) {
        // then it's SRT
        return cue.startSeconds <= currentVideoTime && currentVideoTime < cue.endSeconds;
      }
      // then it's VTT
      return cue.startTime <= currentVideoTime && currentVideoTime < cue.endTime;
    });

    const myActiveCue = Math.max(0, activeIndex); // cannot be less than 0
    setActiveCue(myActiveCue);
    localStorage.setItem(LOCAL_STORAGE_KEYS.ACTIVE_CUE, String(myActiveCue));
  }, [currentVideoTime, transcriptData]);

  // ====================================

  return (
    <p
      ref={cueRef}
      onMouseUp={async (e) => {
        if (!cueRef.current) return;
        const textToTranslate = handleMouseUp(cueRef.current);
        const enclosingSentence = getClosestSentence(e, textToTranslate || "");
        setClosestSentence(enclosingSentence || "");
        if (!textToTranslate) return;
        const results: string[] = await translate2(textToTranslate, selectedLanguage);
        setTranslations(results);
      }}
      id={`cue-${index}`}
      className={`flex gap-4 border-l border-l-[3px] pl-4 transition ${activeCue === index ? "text-white/90 border-[cyan]" : "text-white/40 border-white/10"}`}
    >
      {/* CUE START TIME */}
      <span
        onClick={() => {
          if ("startSeconds" in cue) {
            // if SRT
            setClickedCueStart(cue.startSeconds);
          } else {
            // if VTT
            setClickedCueStart(cue.startTime);
          }
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
