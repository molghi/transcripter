import smoothScrollTo from "../utils/smoothScrollTo.ts";
import type { TranscriptData } from "../context/Context.tsx";
import { LOCAL_STORAGE_KEYS } from "../constants";
import { loadFromLS } from "../utils/localStorageFuncs";

export function restoreState(setVideoUrl: React.Dispatch<React.SetStateAction<string>>, setSelectedLanguage: React.Dispatch<React.SetStateAction<string>>, setVideoName: React.Dispatch<React.SetStateAction<string>>, setTranscriptData: React.Dispatch<React.SetStateAction<TranscriptData | null>>, setActiveCue: React.Dispatch<React.SetStateAction<number | null>>): void {
  //
  const { videoUrl, videoLang, fileName, transcriptData } = loadFromLS(); // get transcript data from LS

  if (!videoUrl || !videoLang || !fileName || !transcriptData || !Array.isArray(transcriptData)) {
    return alert("No data found.");
  }

  setVideoUrl(videoUrl);
  setSelectedLanguage(videoLang);
  setVideoName(fileName);

  const obj: TranscriptData = {
    data: transcriptData,
    format: "srt",
    name: fileName,
  };
  setTranscriptData(obj);

  // scroll to active cue
  const activeCueFromLS = localStorage.getItem(LOCAL_STORAGE_KEYS.ACTIVE_CUE);
  if (!activeCueFromLS) return;
  setActiveCue(Number(activeCueFromLS));

  // small timeout so it could render
  setTimeout(() => {
    const activeElement = document.getElementById(`cue-${activeCueFromLS}`);
    if (!activeElement) return;
    const rect = activeElement.getBoundingClientRect(); // get coords relative to viewport
    const offset = window.innerHeight * 0.4; // set offset from the top
    smoothScrollTo(window.scrollY + rect.top - offset);
  }, 100);
}
