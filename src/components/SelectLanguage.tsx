import { LANGUAGES } from "../constants";
import { useAppContext } from "../context/Context.tsx";
import { useState, useEffect } from "react";
import { getPracticeEntries } from "../utils/getPracticeEntries.ts";
import type { WordEntry } from "../context/Context.tsx";

export default function SelectLanguage() {
  const { entries, setPracticeLanguage, practiceLanguage, setPracticeEntries, setCurrentRound, setUserAnswers } = useAppContext();
  const [clickedBtnEl, setClickedBtnEl] = useState<number | null>(null);
  const [noPracticeNow, setNoPracticeNow] = useState<boolean>(false);

  const addedLangsRaw = [...new Set(entries.map((entry) => entry.language))];
  const addedLangsPretty = addedLangsRaw.map((langCode) => {
    const key = langCode as keyof typeof LANGUAGES;
    return `${LANGUAGES[key].flag} ${LANGUAGES[key].name}`;
  });

  return (
    <div className="mx-auto max-w-lg px-4 font-mono p-8">
      <h2 className="mb-4 text-xl sm:text-3xl  text-center tracking-[0.2em] uppercase  text-green-400">Select Language</h2>

      <div className="text-[12px] italic text-center text-emerald-200/60 opacity-50 hover:opacity-100 transition mb-10">Practice is available only for languages with existing entries</div>

      {entries.length === 0 && <div className="text-center my-6 text-white/80">You have no entries.</div>}

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

      {entries.length > 0 && (
        <div className="flex justify-end">
          <button
            onClick={() => {
              setNoPracticeNow(false);
              if (!practiceLanguage) return console.log("Practice language is null");
              const practiceEntries = getPracticeEntries(practiceLanguage);
              if (practiceEntries.length === 0) return setNoPracticeNow(true);
              setPracticeEntries(practiceEntries);
              setCurrentRound(0);
              setUserAnswers([]);
            }}
            type="button"
            disabled={clickedBtnEl === null}
            className="rounded border border-emerald-400/40 px-5 py-2 text-emerald-300 transition hover:border-emerald-300 hover:bg-emerald-300/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 active:opacity-60"
          >
            Continue
          </button>
        </div>
      )}

      {noPracticeNow && (
        <>
          <div className="mt-10 mx-auto max-w-xl rounded border border-orange-400 bg-black/40 px-6 py-10 text-center font-mono backdrop-blur-sm shadow-[0_0_10px_rgba(251,146,60,0.5)]">
            <div className="mb-4 text-xs uppercase tracking-[0.35em] text-emerald-400/60">No practice for now</div>

            <h2 className="mb-3 text-2xl tracking-wide text-orange-300">Nothing due for review</h2>

            <p className="mb-6 text-[13px] leading-relaxed text-emerald-100/50">Add more entries to your dictionary, or return when the next review for this language becomes due.</p>

            {/* <div className="border-t border-emerald-400/15 pt-5">
              <span className="text-xs uppercase tracking-[0.2em] text-emerald-400/40">Next review</span>

              <div className="mt-2 text-sm text-emerald-200">{practiceLanguage && getNextReviewDate(entries, practiceLanguage)}</div>
            </div> */}
            <div className="flex justify-between gap-8 border-t border-emerald-400/15 pt-5">
              {/* NEXT REVIEW */}
              <div className="flex-1 text-center">
                <span className="text-xs uppercase tracking-[0.2em] text-emerald-400/40">Next review</span>

                <div className="mt-2 text-sm text-emerald-200">{practiceLanguage && getNextReviewDate(entries, practiceLanguage)}</div>
              </div>

              {/* NOW */}
              <div className="flex-1 text-center">
                <span className="text-xs uppercase tracking-[0.2em] text-emerald-400/40">Now</span>

                <div className="mt-2 text-sm text-emerald-200">
                  {new Date().toLocaleString("en-UK", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ============================================================================

function getNextReviewDate(
  entries: WordEntry[],

  selectedLanguage: string,
): string | null {
  const timestamps = entries

    .filter((entry) => entry.language === selectedLanguage)

    .map((entry) => new Date(entry.nextPractice).getTime())

    .filter((time) => !Number.isNaN(time));

  if (timestamps.length === 0) return null;

  const soonest = Math.min(...timestamps);

  return new Date(soonest).toLocaleString("en-UK", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
