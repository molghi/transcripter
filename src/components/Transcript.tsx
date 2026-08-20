import { useAppContext } from "../context/Context.tsx";
import { LANGUAGES, APP_NAME, LOCAL_STORAGE_KEYS } from "../constants";
import { useEffect, useState } from "react";
import TranscriptCue from "./TranscriptCue.tsx";
import YouTubePlayer from "./YouTubePlayer.tsx";
import TranslationTooltip from "../components/TranslationTooltip";
import { handleTextSelection } from "../utils/handleTextSelection.ts";
import { autoScrollToActiveCue } from "../utils/autoScrollToActiveCue.ts";
import { handleScroll } from "../utils/handleScroll.ts";
import { returnToActiveCue } from "../utils/returnToActiveCue.ts";
import { defineActiveCue } from "../utils/defineActiveCue.ts";

export type SelectionPopup = {
  text: string;
  x: number;
  y: number;
} | null;

export default function Transcript() {
  const { transcriptData, videoUrl, selectedLanguage, videoName, isVideoPlaying, currentVideoTime, setActiveCue, activeCue } = useAppContext();

  const [isScrollBtnShown, setIsScrollBtnShown] = useState<boolean>(false);
  const [clickedCueStart, setClickedCueStart] = useState<number | null>(null);
  const [selectionPopup, setSelectionPopup] = useState<SelectionPopup>(null);

  if (!transcriptData) return null;

  // get current lang's flag
  let flag = "";
  if (selectedLanguage) {
    flag = LANGUAGES[selectedLanguage as keyof typeof LANGUAGES].flag;
  }

  // get YT video ID
  let youtubeID = videoUrl;
  // let youtubeID = "";
  // if (videoUrl.startsWith("https://youtu.be/")) {
  //   youtubeID = videoUrl.split("https://youtu.be/")[1];
  //   youtubeID = youtubeID.split("?")[0];
  // }
  // let videoIdInLS = localStorage.getItem(LOCAL_STORAGE_KEYS.VIDEO_URL);
  // if (videoIdInLS) {
  //   youtubeID = videoIdInLS;
  // }

  const isSRT = transcriptData.format === "srt";
  const data: any[] = isSRT ? transcriptData.data : transcriptData.data.cues;

  // ============================================================================

  // handle text selection
  useEffect(() => {
    document.addEventListener("mouseup", () => handleTextSelection(setSelectionPopup));
    return () => document.removeEventListener("mouseup", () => handleTextSelection(setSelectionPopup));
  }, []);

  // ============================================================================

  // modify document title
  useEffect(() => {
    // document.title = `${APP_NAME} | ${flag} ${videoName}`;
    const key = selectedLanguage as keyof typeof LANGUAGES;
    document.title = `${APP_NAME} | ${flag} ${LANGUAGES[key].nativeName}`;
  }, []);

  // ============================================================================

  // set active cue
  useEffect(() => {
    if (!isVideoPlaying) return;
    const myActiveCue: number | null = defineActiveCue(transcriptData, currentVideoTime);
    console.log(`set active cue`, myActiveCue);
    if (myActiveCue === null) return;
    setActiveCue(myActiveCue);
    localStorage.setItem(LOCAL_STORAGE_KEYS.ACTIVE_CUE, String(myActiveCue));
  }, [isVideoPlaying, currentVideoTime, transcriptData]);

  // auto-scroll to active cue when playing video
  useEffect(() => {
    if (!isVideoPlaying) return;
    autoScrollToActiveCue(activeCue);
  }, [isVideoPlaying, activeCue]);

  // ============================================================================

  // show the btn to return to active cue
  useEffect(() => {
    const handlerFunction = () => handleScroll(activeCue, setIsScrollBtnShown);

    window.addEventListener("scroll", handlerFunction);

    return () => window.removeEventListener("scroll", handlerFunction);
  }, [activeCue]);

  // ============================================================================

  const key = selectedLanguage as keyof typeof LANGUAGES;

  // ============================================================================

  return (
    <section className="border border-white/15 bg-black/50 px-6 py-8 max-w-6xl mx-auto rounded font-mono">
      <header className="mb-8 flex items-center justify-between border-b border-white/10 pb-3">
        {/* PAGE TITLE */}
        <h2 className="text-lg uppercase tracking-[0.25em] text-white flex gap-4 items-center">
          <span className="text-4xl">{flag}</span>
          <span>{videoName.length > 2 ? videoName : LANGUAGES[key].name} practice</span>
        </h2>
      </header>

      {/* RENDER TRANSCRIPT CUES */}
      <div className="space-y-4 text-md leading-7">
        {isSRT && Array.isArray(data)
          ? data.map((cue, i) => {
              return <TranscriptCue key={i} index={i} cue={cue} type="srt" activeCue={activeCue} setClickedCueStart={setClickedCueStart} />;
            })
          : data && typeof data === "object"
            ? data.map((cue, i) => {
                return <TranscriptCue key={i} index={i} cue={cue} type="vtt" activeCue={activeCue} setClickedCueStart={setClickedCueStart} />;
              })
            : ""}
      </div>

      <YouTubePlayer videoId={youtubeID} clickedCueStart={clickedCueStart} />

      {/* BTN to return to active/current cue */}
      {isScrollBtnShown && (
        <button onClick={() => returnToActiveCue(activeCue)} className="font-mono text-[red] fixed bottom-8 left-1/2 -translate-x-1/2  rounded-full border border-cyan-300/30 bg-black/70 px-5 py-2 text-sm tracking-widest text-cyan-200 backdrop-blur-lg shadow-[0_0_20px_rgba(34,211,238,0.25)] transition-all duration-300 opacity-60 hover:opacity-100 hover:border-cyan-300/70 hover:bg-cyan-950/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.45)]">
          Return to current subtitle
        </button>
      )}

      {selectionPopup !== null && <TranslationTooltip selectionPopup={selectionPopup} />}
    </section>
  );
}
