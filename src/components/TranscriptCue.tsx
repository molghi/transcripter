import { useEffect, useRef } from "react";
import { useAppContext } from "../context/Context.tsx";
import type { SrtCueShape, VttCueShape } from "../context/Context.tsx";
import { LOCAL_STORAGE_KEYS } from "../constants.ts";
import { formatCueStartTime } from "../utils/formatSeconds.ts";
import { defineTransliteratorFn } from "../utils/defineTransliteratorFn.ts";
import { translateSelection } from "../utils/translateSelection.ts";
import { defineActiveCue } from "../utils/defineActiveCue.ts";

type Props = {
  cue: SrtCueShape | VttCueShape;
  index: number;
  type: "srt" | "vtt";
  setClickedCueStart: React.Dispatch<React.SetStateAction<number | null>>;
};

export default function TranscriptCue({ cue, index, type, setClickedCueStart }: Props) {
  //
  const { transcriptData, currentVideoTime, selectedLanguage, setTranslations, activeCue, setActiveCue, setClosestSentence } = useAppContext();

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

  // set active cue
  useEffect(() => {
    const myActiveCue: number | null = defineActiveCue(transcriptData, currentVideoTime);
    if (myActiveCue === null) return;
    setActiveCue(myActiveCue);
    localStorage.setItem(LOCAL_STORAGE_KEYS.ACTIVE_CUE, String(myActiveCue));
  }, [currentVideoTime, transcriptData]);

  // ====================================

  const translate = async (event: React.MouseEvent<HTMLParagraphElement>) => {
    const res = await translateSelection(event, cueRef.current, selectedLanguage);
    if (!res) return;

    const { results: translationResults, enclosingSentence } = res;

    setTranslations(translationResults);
    setClosestSentence(enclosingSentence);
  };

  // ====================================

  return (
    <p ref={cueRef} onMouseUp={translate} id={`cue-${index}`} className={`flex gap-4 border-l border-l-[3px] pl-4 transition ${activeCue === index ? "text-white/90 border-[cyan]" : "text-white/40 border-white/10"}`}>
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
