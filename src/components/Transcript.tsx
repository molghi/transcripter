import { useAppContext } from "../context/Context.tsx";
import { LANGUAGES, APP_NAME } from "../constants";
import { useEffect, useState } from "react";
import TranscriptCue from "./TranscriptCue.tsx";
import YouTubePlayer from "./YouTubePlayer.tsx";
import smoothScrollTo from "../utils/smoothScrollTo.ts";
import TranslationTooltip from "../components/TranslationTooltip";

export type SelectionPopup = {
  text: string;
  x: number;
  y: number;
} | null;

export default function Transcript() {
  const { transcriptData, videoUrl, selectedLanguage, videoName, isVideoPlaying, activeCue } = useAppContext();

  const [isScrollBtnShown, setIsScrollBtnShown] = useState<boolean>(false);
  const [clickedCueStart, setClickedCueStart] = useState<number | null>(null);
  const [selectionPopup, setSelectionPopup] = useState<SelectionPopup>(null);

  if (!transcriptData) return null;

  // get current lang's flag
  let flag = "";
  if (selectedLanguage) {
    flag = LANGUAGES[selectedLanguage as keyof typeof LANGUAGES].flag;
  }

  // get YT ivideo video ID
  let youtubeID = "";
  if (videoUrl.startsWith("https://youtu.be/")) {
    youtubeID = videoUrl.split("https://youtu.be/")[1];
    youtubeID = youtubeID.split("?")[0];
  }

  const isSRT = transcriptData.format === "srt";
  const data: any[] = isSRT ? transcriptData.data : transcriptData.data.cues;

  // ===================================

  function handleTextSelection() {
    const selection = window.getSelection();

    if (!selection || selection.isCollapsed) return setSelectionPopup(null);

    const selectedText = selection.toString().trim();

    if (!selectedText) return setSelectionPopup(null);

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    setSelectionPopup({
      text: selectedText,
      // x: rect.left + rect.width / 2 + window.scrollX - 32,
      // y: rect.top + window.scrollY - 140,
      // x: rect.left + rect.width / 2 + window.scrollX,
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY - 16,
    });
  }

  // ===================================

  useEffect(() => {
    document.addEventListener("mouseup", handleTextSelection);
    return () => document.removeEventListener("mouseup", handleTextSelection);
  }, []);

  // ============================================================================

  // modify document title
  useEffect(() => {
    document.title = `${APP_NAME} | ${flag} ${videoName}`;
  }, []);

  // ============================================================================

  // auto-scroll to active cue on play
  useEffect(() => {
    if (!isVideoPlaying) return;
    if (activeCue === null || activeCue < 0) return;

    const activeElement = document.getElementById(`cue-${activeCue}`);
    if (!activeElement) return;

    const rect = activeElement.getBoundingClientRect(); // get coords relative to viewport

    const offset = window.innerHeight * 0.4; // set offset from the top

    smoothScrollTo(window.scrollY + rect.top - offset); // scroll to current subtitle

    // NOTE: default browser smooth-scrolling is not smooth enough in this case:
  }, [isVideoPlaying, activeCue]);

  // ============================================================================

  // to show the btn to return to active cue
  useEffect(() => {
    function handleScroll() {
      if (activeCue === null || activeCue < 0) return;

      const activeElement = document.getElementById(`cue-${activeCue}`);
      if (!activeElement) return;

      const rect = activeElement.getBoundingClientRect(); // get coords relative to viewport

      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      setIsScrollBtnShown(!isVisible);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeCue]);

  // ============================================================================

  return (
    <section className="border border-white/15 bg-black px-6 py-8 max-w-6xl mx-auto rounded font-mono">
      <header className="mb-8 flex items-center justify-between border-b border-white/10 pb-3">
        {/* PAGE TITLE */}
        <h2 className="text-lg uppercase tracking-[0.25em] text-white flex gap-4 items-center">
          <span className="text-4xl">{flag}</span> <span>{videoName}</span>
        </h2>
      </header>

      {/* RENDER TRANSCRIPT CUES */}
      <div className="space-y-4 text-md leading-7">
        {isSRT && Array.isArray(data)
          ? data.map((cue, i) => {
              return <TranscriptCue key={i} index={i} cue={cue} type="srt" setClickedCueStart={setClickedCueStart} />;
            })
          : data && typeof data === "object"
            ? data.map((cue, i) => {
                return <TranscriptCue key={i} index={i} cue={cue} type="vtt" setClickedCueStart={setClickedCueStart} />;
              })
            : ""}
      </div>

      <YouTubePlayer videoId={youtubeID} clickedCueStart={clickedCueStart} />

      {/* BTN to return to active/current subtitle */}
      {isScrollBtnShown && (
        <button
          onClick={() => {
            const element = document.getElementById(`cue-${activeCue}`);
            if (!element) return;
            const rect = element.getBoundingClientRect(); // get coords relative to viewport
            const offset = window.innerHeight * 0.4; // set offset from the top
            smoothScrollTo(window.scrollY + rect.top - offset); // scroll to current subtitle
          }}
          className="font-mono text-[red] fixed bottom-8 left-1/2 -translate-x-1/2  rounded-full border border-cyan-300/30 bg-black/70 px-5 py-2 text-sm tracking-widest text-cyan-200 backdrop-blur-md shadow-[0_0_20px_rgba(34,211,238,0.25)] transition-all duration-300 opacity-60 hover:opacity-100 hover:border-cyan-300/70 hover:bg-cyan-950/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.45)]"
        >
          Return to current subtitle
        </button>
      )}

      {selectionPopup !== null && <TranslationTooltip selectionPopup={selectionPopup} />}
    </section>
  );
}
