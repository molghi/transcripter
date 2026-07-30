import type { TranscriptData } from "../context/Context.tsx";

export function defineActiveCue(transcriptData: TranscriptData | null, currentVideoTime: number): number | null {
  //
  if (!transcriptData) return null;

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

  return myActiveCue;
}
