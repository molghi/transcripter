import { LANGUAGES, BTN_STYLE } from "../constants";

import parseSubtitleFile from "../utils/parseSubtitleFile";

function AddForm() {
  //
  function onSubmitTextareaForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("onSubmitTextareaForm");
  }

  // ============================================================================

  return (
    <section className="sm:p-8 p-4 text-white font-mono">
      <h2 className="mb-10 text-xl sm:text-2xl  text-center tracking-wide">
        Add learning material from a <span className="text-[cyan]">subtitle file</span> or <span className="text-[cyan]">pasted text</span>
      </h2>

      {/* YT VIDEO URL */}
      <div className="max-w-xl mx-auto px-6 mb-6">
        <label htmlFor="video-url" className="mb-2 block font-mono text-sm text-[cyan]">
          1. Paste YouTube video URL:
        </label>

        <input autoFocus id="video-url" type="url" placeholder="https://youtube.com/watch?v=..." className="w-full border border-white/30 bg-black px-4 py-2 font-mono" />
      </div>

      {/* LANGUAGE SELECT */}
      <div className="max-w-xl mx-auto px-6 mb-8">
        <label className="mb-2 block text-sm text-[cyan]">2. Select language:</label>

        <select className="border border-white/30 rounded bg-transparent px-4 py-2 w-full cursor-pointer" defaultValue="">
          <option disabled value="">
            null
          </option>
          {Object.entries(LANGUAGES).map(([code, language]) => (
            <option key={code} title={language.name}>
              {language.flag} {language.nativeName}
            </option>
          ))}
        </select>
      </div>

      {/* CHOICE TO ADD MATERIAL */}
      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-[0.6fr_1fr]">
        <div className="col-span-2 block text-sm text-[cyan] text-center">3. Add material:</div>
        {/* CHOICE 1 */}
        <div className="border border-white/20 p-6 pb-8 rounded transition duration-700 hover:shadow-[inset_0_0_10px_rgba(255,255,255,0.5)]">
          <h3 className="mb-8 text-lg">
            Import subtitle file <span className="transition opacity-50 hover:opacity-100">(.srt or .vtt)</span>
          </h3>

          <input
            id="file-upload"
            type="file"
            accept=".srt,.vtt"
            onChange={async (e) => {
              const subtitles = await parseSubtitleFile(e);
              console.log("SUBTITLES:");
              console.log(subtitles);
            }}
            className="peer sr-only"
          />

          <label htmlFor="file-upload" className={`${BTN_STYLE} cursor-pointer peer-focus:ring-2 peer-focus:ring-blue/50`}>
            Choose File
          </label>
        </div>

        {/* CHOICE 2 */}
        <div className="border border-white/20 p-6 rounded transition duration-700 hover:shadow-[inset_0_0_10px_rgba(255,255,255,0.5)]">
          <h3 className="mb-6 text-lg">Paste transcript text</h3>
          <form onSubmit={(e) => onSubmitTextareaForm(e)}>
            <textarea required className="min-h-40 w-full border border-white/30 bg-black p-3 rounded" placeholder="Paste your transcript here..." />

            <button className={`${BTN_STYLE} mt-4`}>Submit</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AddForm;
