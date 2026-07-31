import { LANGUAGES, BTN_STYLE, APP_NAME, APP_SLOGAN } from "../constants";
import parseSubtitleFile from "../utils/parseSubtitleFile";
import { useState } from "react";
import isValidYouTubeUrl from "../utils/urlValidator";
import { useAppContext } from "../context/Context.tsx";
import { saveProcessedData } from "../utils/localStorageFuncs.ts";
import { useEffect } from "react";
import { getYoutubeVideoID } from "../utils/getYoutubeVideoID.ts";

function AddForm() {
  const [videoUrlError, setVideoUrlError] = useState("");
  const [videoUrlField, setVideoUrlField] = useState("");

  const { setTranscriptData, videoUrl, setVideoUrl, selectedLanguage, setSelectedLanguage, setVideoName } = useAppContext();

  useEffect(() => {
    // modify document title
    document.title = `${APP_NAME} | ${APP_SLOGAN}`;
  }, []);

  // ============================================================================

  const onSubmitTextareaForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("on submit textarea form");
  };

  // ============================================================================

  // input type="file" accept=".srt,.vtt" onChange:
  const processSubtitleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const subtitles = await parseSubtitleFile(e);

    if (subtitles === null) {
      setTranscriptData(null);
    } else {
      setTranscriptData(subtitles);

      let videoName = subtitles.name;
      if (videoName.includes(".srt") || videoName.includes(".vtt")) {
        videoName = videoName.replace(".srt", "").replace(".vtt", "");
      }
      setVideoName(videoName.trim());

      let cuesArr = subtitles.format === "srt" ? subtitles.data : subtitles.data.cues;

      saveProcessedData(videoUrl, selectedLanguage, videoName.trim(), cuesArr); // to localStorage
    }
  };

  // ============================================================================

  // input type="url" onChange:
  const defineVideoUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    const urlIsValid = isValidYouTubeUrl(e.target.value);
    if (urlIsValid) {
      setVideoUrlField(e.target.value.trim());
      const videoID = getYoutubeVideoID(e.target.value.trim());
      setVideoUrl(videoID);
      setVideoUrlError("");
    } else {
      setVideoUrlField(e.target.value.trim());
      setVideoUrlError("Not a valid YouTube video URL");
    }
  };

  // ============================================================================

  return (
    <section className="sm:p-8 p-4 text-white font-mono">
      <h2 className="mb-10 text-xl sm:text-2xl  text-center tracking-wide">
        Add learning material from a <span className="text-[cyan]">subtitle file</span> or <span className="text-[cyan]">pasted text</span>
      </h2>

      {/* STEP 1 */}
      {/* SET YT VIDEO URL */}
      <div className="max-w-xl mx-auto px-6 mb-6">
        <label htmlFor="video-url" className="mb-2 block font-mono text-sm text-[cyan]">
          1. Paste YouTube video URL:
        </label>

        <input autoFocus id="video-url" type="url" value={videoUrlField} onChange={defineVideoUrl} placeholder="https://youtube.com/watch?v=..." className="w-full border border-white/30 bg-black px-4 py-2 font-mono" />

        {videoUrlError && <div className="text-red-500 ml-2 text-sm my-2">{videoUrlError}</div>}
      </div>

      {/* STEP 2 */}
      {/* SET LANGUAGE */}
      <div className="max-w-xl mx-auto px-6 mb-8">
        <label className="mb-2 block text-sm text-[cyan]">2. Select language:</label>

        <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)} className="border border-white/30 rounded bg-transparent px-4 py-2 w-full cursor-pointer">
          <option disabled value="">
            none selected
          </option>
          {/* return app langs */}
          {Object.entries(LANGUAGES).map(([code, language]) => (
            <option key={code} title={language.name} value={code}>
              {language.flag} {language.nativeName}
            </option>
          ))}
        </select>
      </div>

      {/* STEP 3 */}
      {/* ADD MATERIAL */}
      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-[0.6fr_1fr]">
        <div className="col-span-2 block text-sm text-[cyan] text-center">3. Add material:</div>
        {/* CHOICE 1: file picker */}
        <div className="border border-white/20 p-6 pb-8 rounded transition duration-700 hover:shadow-[inset_0_0_10px_rgba(255,255,255,0.5)]">
          <h3 className="mb-8 text-lg">
            Import subtitle file <span className="transition opacity-50 hover:opacity-100">(.srt or .vtt)</span>
          </h3>

          <input id="file-upload" type="file" accept=".srt,.vtt" disabled={!videoUrl || !selectedLanguage} onChange={processSubtitleFile} className="peer sr-only" />

          <label htmlFor="file-upload" className={`${BTN_STYLE} cursor-pointer peer-focus:ring-2 peer-focus:ring-blue/50 peer-disabled:opacity-50 peer-disabled:cursor-not-allowed`} title={!videoUrl || !selectedLanguage ? "Video URL & language must be specified to enable this step." : ""}>
            Choose File
          </label>
        </div>

        {/* CHOICE 2: textarea */}
        <div className="border border-white/20 p-6 rounded transition duration-700 hover:shadow-[inset_0_0_10px_rgba(255,255,255,0.5)]">
          <h3 className="mb-6 text-lg">Paste transcript text</h3>
          <form onSubmit={(e) => onSubmitTextareaForm(e)}>
            <textarea disabled={!videoUrl || !selectedLanguage} required className={`min-h-30 w-full border border-white/30 bg-black p-3 rounded ${!videoUrl || !selectedLanguage ? "disabled:opacity-50 disabled:cursor-not-allowed" : ""}`} placeholder="Paste your transcript here..." title={!videoUrl || !selectedLanguage ? "Video URL & language must be specified to enable this step." : ""} />

            <button disabled={!videoUrl || !selectedLanguage} className={`${BTN_STYLE} mt-4 ${!videoUrl || !selectedLanguage ? "disabled:opacity-50 disabled:cursor-not-allowed" : ""}`} title={!videoUrl || !selectedLanguage ? "Video URL & language must be specified to enable this step." : ""}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AddForm;
