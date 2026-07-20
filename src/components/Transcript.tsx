import { useAppContext } from "../context/Context.tsx";
import { LANGUAGES } from "../constants";
import formatSeconds from "../utils/formatSeconds.ts";
import { useEffect } from "react";
import { APP_NAME } from "../constants";

export default function Transcript() {
  const { transcriptData, videoUrl, selectedLanguage, videoName } = useAppContext();

  console.log(videoUrl);
  console.log(transcriptData);
  if (!transcriptData) return null;

  let flag = "";
  if (selectedLanguage) {
    flag = LANGUAGES[selectedLanguage as keyof typeof LANGUAGES].flag;
  }

  useEffect(() => {
    // modify document title
    document.title = `${APP_NAME} | ${flag} ${videoName}`;
  }, []);

  const isSRT = transcriptData.format === "srt";
  const data: any[] = isSRT ? transcriptData.data : transcriptData.data.cues;

  const cueActiveStyles = "border-l border-cyan-400/40 pl-4 text-white/90";
  const cueInactiveStyles = "border-l border-white/10 pl-4 text-white/50 transition hover:border-cyan-400/40 hover:text-white";

  return (
    <section className="border border-white/15 bg-black px-6 py-8 max-w-6xl mx-auto rounded font-mono">
      <header className="mb-8 flex items-center justify-between border-b border-white/10 pb-3">
        <h2 className="text-lg uppercase tracking-[0.25em] text-white flex gap-4 items-center">
          <span className="text-4xl">{flag}</span> <span>{videoName}</span>
        </h2>
      </header>

      {/* TRANSCRIPT CUES */}
      <div className="space-y-4 text-md leading-7">
        {isSRT && Array.isArray(data)
          ? data.map((cue, i) => {
              return (
                <p key={i} className={`${i === 0 ? cueActiveStyles : cueInactiveStyles}`}>
                  <span className="mr-5 text-white/35">{cue.startTime}</span>
                  <span>{cue.text}</span>
                </p>
              );
            })
          : typeof data === "object" && data
            ? data.map((cue, i) => {
                return (
                  <p key={i} className={`${i === 0 ? cueActiveStyles : cueInactiveStyles}`}>
                    <span className="mr-5 text-white/35">{formatSeconds(cue.startTime)}</span>
                    <span>{cue.text}</span>
                  </p>
                );
              })
            : ""}
      </div>
    </section>
  );
}
