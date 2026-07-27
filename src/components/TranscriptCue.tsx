import formatSeconds from "../utils/formatSeconds.ts";
import type { SrtCueShape, VttCueShape } from "../context/Context.tsx";
import { useAppContext } from "../context/Context.tsx";
import { useEffect, useRef } from "react";
import { LOCAL_STORAGE_KEYS } from "../constants.ts";
import { translate2 } from "../utils/translate.ts";

type Props = {
  cue: SrtCueShape | VttCueShape;
  index: number;
  type: "srt" | "vtt";
  activeCue: number | null;
  setActiveCue: React.Dispatch<React.SetStateAction<number | null>>;
  setClickedCueStart: React.Dispatch<React.SetStateAction<number | null>>;
};

export default function TranscriptCue({ cue, index, type, activeCue, setActiveCue, setClickedCueStart }: Props) {
  const { transcriptData, currentVideoTime, selectedLanguage } = useAppContext();
  const cueRef = useRef<HTMLParagraphElement>(null);

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

    // const activeCueFromLS = localStorage.getItem(LOCAL_STORAGE_KEYS.ACTIVE_CUE);
    // if (!activeCueFromLS) return;
    // const myActiveCue = Number(activeCueFromLS) >= 0 ? Number(activeCueFromLS) : Math.max(0, activeIndex); // cannot be less than 0
    const myActiveCue = Math.max(0, activeIndex); // cannot be less than 0
    setActiveCue(myActiveCue);
    localStorage.setItem(LOCAL_STORAGE_KEYS.ACTIVE_CUE, String(myActiveCue));
  }, [currentVideoTime, transcriptData]);

  // ====================================

  function handleMouseUp(): string | null {
    const selection = window.getSelection(); // get global text selection

    if (!selection || selection.isCollapsed) return null; // check if selection contains sth

    const range = selection.getRangeAt(0); // take what text that selection contains

    const cueElement = cueRef.current; // get current cue

    if (!cueElement || !cueElement.contains(range.commonAncestorContainer)) {
      // if no cue, or current cue doesn't contain the deepest DOM node containing both start and  end of the selection
      return null;
    }

    const selectedText = selection.toString().trim(); // get selection's text

    if (!selectedText) return null;

    return selectedText; // selectedText will be translated
  }

  // ====================================

  return (
    <p
      ref={cueRef}
      onMouseUp={async () => {
        const textToTranslate = handleMouseUp();
        if (!textToTranslate) return;
        const results: string[] = await translate2(textToTranslate, selectedLanguage);
        console.log(results);
      }}
      id={`cue-${index}`}
      className={`border-l border-l-[3px] pl-4 transition ${activeCue === index ? "text-white/90 border-[cyan]" : "text-white/40 border-white/10"}`}
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

      {/* CUE TEXT */}
      <span>{cue.text}</span>
    </p>
  );
}
