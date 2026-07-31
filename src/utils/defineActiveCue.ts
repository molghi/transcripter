import type { TranscriptData } from "../context/Context.tsx";

export function defineActiveCue(transcriptData: TranscriptData | null, currentVideoTime: number): number | null {
  //
  if (!transcriptData) return null;

  // define array of data
  const cuesData: any[] = Array.isArray(transcriptData.data) ? transcriptData.data : transcriptData.data.cues;

  // I need findLastIndex because one cue's start time can overlap with the previous cue end time
  // with findLastIndex, I look for the last one matching my condition, which removes overlapping issue
  return cuesData.findLastIndex((cue) => {
    if ("startSeconds" in cue) {
      return cue.startSeconds <= currentVideoTime && currentVideoTime < cue.endSeconds;
    }

    return cue.startTime <= currentVideoTime && currentVideoTime < cue.endTime;
  });

  // ============================================================================

  // const activeIndex = cuesData.findIndex((cue) => {
  //   if ("startSeconds" in cue) {
  //     // then it's SRT
  //     return cue.startSeconds <= currentVideoTime && currentVideoTime < cue.endSeconds;
  //   }
  //   // then it's VTT
  //   return cue.startTime <= currentVideoTime && currentVideoTime < cue.endTime;
  // });

  // return activeIndex;

  // ============================================================================

  // const myActiveCue = Math.max(0, activeIndex); // cannot be less than 0

  // return myActiveCue;
}
