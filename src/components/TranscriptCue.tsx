import formatSeconds from "../utils/formatSeconds.ts";
import type { SrtCueShape, VttCueShape } from "../context/Context.tsx";
import { useAppContext } from "../context/Context.tsx";
import { useEffect } from "react";
import playerRef from "./YouTubePlayer.tsx";

type Props = {
  cue: SrtCueShape | VttCueShape;
  index: number;
  type: "srt" | "vtt";
  activeCue: number | null;
  setActiveCue: React.Dispatch<React.SetStateAction<number | null>>;
  setClickedCueStart: React.Dispatch<React.SetStateAction<number | null>>;
};

export default function TranscriptCue({ cue, index, type, activeCue, setActiveCue, setClickedCueStart }: Props) {
  const { transcriptData, currentVideoTime } = useAppContext();

  //
  let startTime = type === "vtt" && typeof cue.startTime === "number" ? formatSeconds(cue.startTime) : cue.startTime;
  startTime = String(startTime);
  startTime = startTime.split(",")[0];

  // ====================================

  useEffect(() => {
    // if ("startSeconds" in cue) {
    //   // SRT
    //   setActiveCue(cue.startSeconds / 1000 <= currentVideoTime && currentVideoTime < cue.endSeconds / 1000 ? index : 0);
    //   console.log(cue.startSeconds / 1000);
    //   console.log(currentVideoTime);
    // } else {
    //   // VTT
    //   setActiveCue(cue.startTime <= currentVideoTime && currentVideoTime < cue.endTime ? index : 0);
    // }
    if (!transcriptData) return;

    const cues: any[] = Array.isArray(transcriptData.data) ? transcriptData.data : transcriptData.data.cues;

    const activeIndex = cues.findIndex((cue) => {
      if ("startSeconds" in cue) {
        // SRT
        return cue.startSeconds <= currentVideoTime && currentVideoTime < cue.endSeconds;
      }
      // VTT
      return cue.startTime <= currentVideoTime && currentVideoTime < cue.endTime;
    });

    setActiveCue(Math.max(0, activeIndex));
  }, [currentVideoTime, transcriptData]);

  // ====================================

  return (
    <p id={`cue-${index}`} className={`border-l border-l-[3px] pl-4 transition ${activeCue === index ? "text-white/90 border-[cyan]" : "text-white/40 border-white/10"}`}>
      {/* START TIME */}
      <span
        onClick={() => {
          if ("startSeconds" in cue) {
            // if SRT
            setClickedCueStart(cue.startSeconds);
          } else {
            // VTT
            setClickedCueStart(cue.startTime);
          }
        }}
        className="mr-5 text-white/35 transition hover:text-white/100 cursor-pointer hover:underline active:no-underline active:opacity-75"
        title="Play at selected time"
      >
        {startTime}
      </span>
      {/* TEXT */}
      <span>{cue.text}</span>
    </p>
  );
}

// border-cyan-400/40
