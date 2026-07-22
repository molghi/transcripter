import formatSeconds from "../utils/formatSeconds.ts";
import type { SrtCueShape, VttCueShape } from "../context/Context.tsx";

type Props = {
  cue: SrtCueShape | VttCueShape;
  index: number;
  type: "srt" | "vtt";
  activeCue: number | null;
  setActiveCue: React.Dispatch<React.SetStateAction<number | null>>;
};

export default function TranscriptCue({ cue, index, type, activeCue, setActiveCue }: Props) {
  //
  let startTime = type === "vtt" && typeof cue.startTime === "number" ? formatSeconds(cue.startTime) : cue.startTime;
  startTime = String(startTime);
  startTime = startTime.split(",")[0];

  return (
    <p onMouseEnter={() => setActiveCue(index)} className={`border-l border-l-[3px] pl-4 transition ${activeCue === index ? "text-white/90 border-[cyan]" : "text-white/40 border-white/10"}`}>
      <span className="mr-5 text-white/35 transition hover:text-white/100 cursor-pointer hover:underline" title="Play at selected time">
        {startTime}
      </span>
      <span>{cue.text}</span>
    </p>
  );
}

// border-cyan-400/40
