import formatSeconds from "../utils/formatSeconds.ts";
import type { SrtCueShape, VttCueShape } from "../context/Context.tsx";

type Props = { cue: SrtCueShape | VttCueShape; index: number; type: "srt" | "vtt" };

export default function TranscriptCue({ cue, index, type }: Props) {
  //
  const cueActiveStyles = "border-l border-cyan-400/40 pl-4 text-white/90";
  const cueInactiveStyles = "border-l border-white/10 pl-4 text-white/50 transition hover:border-cyan-400/40 hover:text-white";

  let startTime = type === "vtt" && typeof cue.startTime === "number" ? formatSeconds(cue.startTime) : cue.startTime;
  startTime = String(startTime);
  startTime = startTime.split(",")[0];

  return (
    <p className={`${index === 0 ? cueActiveStyles : cueInactiveStyles}`}>
      <span className="mr-5 text-white/35 transition hover:text-white/100 cursor-pointer hover:underline" title="Play at selected time">
        {startTime}
      </span>
      <span>{cue.text}</span>
    </p>
  );
}
