import { useAppContext } from "../context/Context.tsx";
import { LANGUAGES, APP_NAME } from "../constants";
import { useEffect, useState } from "react";
import TranscriptCue from "./TranscriptCue.tsx";
import YouTubePlayer from "./YouTubePlayer.tsx";
import smoothScrollTo from "../utils/smoothScrollTo.ts";

export default function Transcript() {
  const { transcriptData, videoUrl, selectedLanguage, videoName, isVideoPlaying } = useAppContext();

  const [activeCue, setActiveCue] = useState<number | null>(0);
  const [isScrollBtnShown, setIsScrollBtnShown] = useState<boolean>(false);
  const [clickedCueStart, setClickedCueStart] = useState<number | null>(null);

  if (!transcriptData) return null;

  let flag = "";
  if (selectedLanguage) {
    flag = LANGUAGES[selectedLanguage as keyof typeof LANGUAGES].flag;
  }

  let youtubeID = "";
  if (videoUrl.startsWith("https://youtu.be/")) {
    youtubeID = videoUrl.split("https://youtu.be/")[1];
    youtubeID = youtubeID.split("?")[0];
  }

  const isSRT = transcriptData.format === "srt";
  const data: any[] = isSRT ? transcriptData.data : transcriptData.data.cues;

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

    const element = document.getElementById(`cue-${activeCue}`);
    if (!element) return;

    const rect = element.getBoundingClientRect();

    const offset = window.innerHeight * 0.4;

    smoothScrollTo(window.scrollY + rect.top - offset);

    // NOTE: default browser smooth-scrolling is not smooth enough in this case:
    // window.scrollTo({
    //   top: window.scrollY + rect.top - offset,
    //   behavior: "smooth",
    // });
  }, [isVideoPlaying, activeCue]);

  // ============================================================================

  // to show btn to bring back to active cue
  useEffect(() => {
    function handleScroll() {
      if (activeCue === null || activeCue < 0) return;

      const activeElement = document.getElementById(`cue-${activeCue}`);
      if (!activeElement) return;

      const rect = activeElement.getBoundingClientRect();

      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      setIsScrollBtnShown(!isVisible);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeCue]);

  // ============================================================================

  return (
    <section className="border border-white/15 bg-black px-6 py-8 max-w-6xl mx-auto rounded font-mono">
      <YouTubePlayer videoId={youtubeID} clickedCueStart={clickedCueStart} />

      {isScrollBtnShown && (
        <button
          onClick={() => {
            const element = document.getElementById(`cue-${activeCue}`);
            if (!element) return;
            const rect = element.getBoundingClientRect();
            const offset = window.innerHeight * 0.4;
            smoothScrollTo(window.scrollY + rect.top - offset);
          }}
          className="font-mono text-[red] fixed bottom-8 left-1/2 -translate-x-1/2  rounded-full border border-cyan-300/30 bg-black/70 px-5 py-2 text-sm tracking-widest text-cyan-200 backdrop-blur-md shadow-[0_0_20px_rgba(34,211,238,0.25)] transition-all duration-300 opacity-60 hover:opacity-100 hover:border-cyan-300/70 hover:bg-cyan-950/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.45)]"
        >
          {" "}
          Return to current subtitle
        </button>
      )}

      <header className="mb-8 flex items-center justify-between border-b border-white/10 pb-3">
        {/* TITLE */}
        <h2 className="text-lg uppercase tracking-[0.25em] text-white flex gap-4 items-center">
          <span className="text-4xl">{flag}</span> <span>{videoName}</span>
        </h2>
      </header>

      {/* TRANSCRIPT CUES */}
      <div className="space-y-4 text-md leading-7">
        {isSRT && Array.isArray(data)
          ? data.map((cue, i) => {
              return <TranscriptCue key={i} index={i} cue={cue} type="srt" activeCue={activeCue} setActiveCue={setActiveCue} setClickedCueStart={setClickedCueStart} />;
            })
          : data && typeof data === "object"
            ? data.map((cue, i) => {
                return <TranscriptCue key={i} index={i} cue={cue} type="vtt" activeCue={activeCue} setActiveCue={setActiveCue} setClickedCueStart={setClickedCueStart} />;
              })
            : ""}
      </div>
    </section>
  );
}
