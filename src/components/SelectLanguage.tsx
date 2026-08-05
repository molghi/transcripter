import { LANGUAGES } from "../constants";
import { useAppContext } from "../context/Context.tsx";
import { useState } from "react";

export default function SelectLanguage() {
  const { entries, setPracticeLanguage } = useAppContext();
  const [clickedBtnEl, setClickedBtnEl] = useState<number | null>(null);

  const addedLangsRaw = [...new Set(entries.map((entry) => entry.language))];
  const addedLangsPretty = addedLangsRaw.map((langCode) => {
    const key = langCode as keyof typeof LANGUAGES;
    return `${LANGUAGES[key].flag} ${LANGUAGES[key].name}`;
  });

  return (
    <div className="mx-auto max-w-lg px-4 font-mono p-8">
      <h2 className="mb-4 text-xl sm:text-3xl  text-center tracking-[0.2em] uppercase  text-green-400">Select Language</h2>

      <div className="text-[12px] italic text-center text-emerald-200/60 opacity-50 hover:opacity-100 transition mb-10">Practice is available only for languages with existing entries</div>

      <div className="mb-8 flex flex-col gap-3">
        {/* Language buttons */}
        {addedLangsPretty.map((lang, index) => (
          <button
            key={index}
            onClick={() => {
              setClickedBtnEl(index);
              setPracticeLanguage(addedLangsRaw[index]);
            }}
            type="button"
            className={`rounded border px-4 py-3 text-left transition hover:border-emerald-300 hover:bg-emerald-300/10 hover:text-white ${clickedBtnEl === index ? "bg-emerald-500/20 border-emerald-300 text-white" : "text-white/70 border-emerald-400/30 bg-black/40"}`}
          >
            {lang}
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <button type="button" disabled={clickedBtnEl === null} className="rounded border border-emerald-400/40 px-5 py-2 text-emerald-300 transition hover:border-emerald-300 hover:bg-emerald-300/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40">
          Continue
        </button>
      </div>
    </div>
  );
}
