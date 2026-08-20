import { useAppContext } from "../context/Context.tsx";
import { LANGUAGES } from "../constants.ts";
import { useState, useEffect } from "react";

export default function Round() {
  const { practiceLanguage, practiceEntries, currentRound, setUserAnswers, setCurrentRound } = useAppContext();
  const [input, setInput] = useState("");

  if (!practiceEntries || practiceEntries.length === 0 || currentRound === null || !practiceLanguage) {
    console.log("Insufficient data: missing practiceLanguage, practiceEntries, of currentRound.");
    return null;
  }

  useEffect(() => {
    setInput("");
  }, [currentRound]);

  const key = practiceLanguage as keyof typeof LANGUAGES;
  const language = LANGUAGES[key];

  const currentRoundData = practiceEntries[currentRound];

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    setCurrentRound((prev) => prev! + 1);
    setUserAnswers((prev) => [...prev!, input]);
  };

  // ============================================================================

  return (
    <section className="mx-auto max-w-xl px-4 font-mono text-white/70">
      {/* TOP BAR */}
      <div className="mb-9 flex items-center justify-between gap-5">
        <span title={language.name} className="text-3xl">
          {language.flag}
        </span>

        <span className="text-sm uppercase tracking-[0.2em] text-emerald-300/70">
          Round {currentRound + 1} of {practiceEntries.length}
        </span>

        <div className="h-1 flex-1 rounded bg-emerald-900/20">
          <div className="h-1 rounded bg-emerald-300/70 transition-all duration-300" style={{ width: `${((currentRound + 1) / practiceEntries.length) * 100}%` }} />
        </div>
      </div>

      {/* PROMPT */}
      <p className="mb-8 text-center text-lg italic text-white/50">Recall what this means:</p>

      {/* WORD */}
      <h2 className="mb-10 text-center text-4xl text-green-500">{currentRoundData.word}</h2>

      <h2 className="mb-10 text-left text-xl text-white-200 italic">
        <span className="text-gray-400 opacity-65">In sentence:</span> {currentRoundData.sentence}
      </h2>

      <h2 className="hidden mb-10 text-left text-sm text-gray-300 italic opacity-50 transition hover:opacity-100">
        <span className="text-gray-300 opacity-60 mr-2">Appeared in:</span> {currentRoundData.videoName}
      </h2>

      {/* ANSWER */}
      <form onSubmit={submitForm}>
        <input value={input} onChange={(e) => setInput(e.target.value)} autoFocus required type="text" placeholder="Type your answer..." className="w-full rounded border border-emerald-400/30 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-emerald-300" />

        <div className="mt-10 flex justify-end">
          <button type="submit" disabled={!input.trim()} className="rounded border border-emerald-400/40 px-5 py-2 text-emerald-300 transition hover:border-emerald-300 hover:bg-emerald-300/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40">
            {currentRound + 1 === practiceEntries.length ? "Finish" : "Continue"}
          </button>
        </div>
      </form>
    </section>
  );
}
