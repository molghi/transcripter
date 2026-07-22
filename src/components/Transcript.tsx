import { useAppContext } from "../context/Context.tsx";
import { LANGUAGES, APP_NAME } from "../constants";
import { useEffect, useState } from "react";
import TranscriptCue from "./TranscriptCue.tsx";
import YouTubePlayer from "./YouTubePlayer.tsx";

export default function Transcript() {
  const { transcriptData, videoUrl, selectedLanguage, videoName } = useAppContext();
  const [activeCue, setActiveCue] = useState<number | null>(0);

  if (!transcriptData) return null;

  let flag = "";
  if (selectedLanguage) {
    flag = LANGUAGES[selectedLanguage as keyof typeof LANGUAGES].flag;
  }

  useEffect(() => {
    // modify document title
    document.title = `${APP_NAME} | ${flag} ${videoName}`;
  }, []);

  let youtubeID = "";
  if (videoUrl.startsWith("https://youtu.be/")) {
    youtubeID = videoUrl.split("https://youtu.be/")[1];
    youtubeID = youtubeID.split("?")[0];
  }

  const isSRT = transcriptData.format === "srt";
  const data: any[] = isSRT ? transcriptData.data : transcriptData.data.cues;

  return (
    <section className="border border-white/15 bg-black px-6 py-8 max-w-6xl mx-auto rounded font-mono">
      <YouTubePlayer videoId={youtubeID} />
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
              return <TranscriptCue key={i} index={i} cue={cue} type="srt" activeCue={activeCue} setActiveCue={setActiveCue} />;
            })
          : data && typeof data === "object"
            ? data.map((cue, i) => {
                return <TranscriptCue key={i} index={i} cue={cue} type="vtt" activeCue={activeCue} setActiveCue={setActiveCue} />;
              })
            : ""}
      </div>
    </section>
  );
}
