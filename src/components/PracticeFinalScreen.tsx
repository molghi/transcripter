import { useAppContext } from "../context/Context.tsx";
import { useState } from "react";
import saveSpacedRepetition from "../utils/saveSpacedRepetition.ts";

export default function PracticeFinalScreen() {
  const { userAnswers, practiceEntries, setButtonClicked, setPracticeEntries, setPracticeLanguage, setCurrentRound, setUserAnswers, setNotification } = useAppContext();

  const [answers, setAnswers] = useState<Record<string, string>>(() => Object.fromEntries(practiceEntries.map((entry) => [entry.id, ""])));

  const areAllEntriesRated = practiceEntries.length === Object.values(answers).filter((x) => x).length;

  if (!practiceEntries || !userAnswers || practiceEntries.length === 0 || userAnswers.length === 0) {
    console.log(`issues with practice entries or user answers`);
    return null;
  }

  const btnsConfig = [
    {
      text: "Poor",
      value: "poor",
      title: "You failed to recall this word",
      className: "border-red-500/30 hover:bg-red-500/10",
      activeClass: "bg-red-500/30",
    },

    {
      text: "Fair",
      value: "fair",
      title: "You recalled it with some difficulty",
      className: "border-yellow-500/30 hover:bg-yellow-500/10",
      activeClass: "bg-yellow-500/30",
    },

    {
      text: "Good",
      value: "good",
      title: "You recalled it correctly",
      className: "border-emerald-500/30 hover:bg-emerald-500/10",
      activeClass: "bg-emerald-500/30",
    },

    {
      text: "Perfect",
      value: "perfect",
      title: "You recalled it instantly and confidently",
      className: "border-cyan-500/30 hover:bg-cyan-500/10",
      activeClass: "bg-blue-500/30",
    },
  ];

  // ============================================================================

  function handleAnswer(entryId: string, answer: string) {
    setAnswers((prev) => ({
      ...prev,
      [entryId]: answer,
    }));
  }

  // ============================================================================

  return (
    <>
      <div className="mx-auto max-w-3xl font-mono text-emerald-100 px-4">
        {/* HEADING */}
        <h1 className="mb-14 text-emerald-400 mb-5 text-xl sm:text-3xl  text-center tracking-[0.2em]">PRACTICE SUMMARY</h1>
        <div className="mb-10 text-center text-sm leading-5 text-emerald-200/70 opacity-60 hover:opacity-100 transition">
          Evaluate how well you recalled each entry. <br /> Your ratings will be used to personalize future practice sessions.
        </div>

        {/* RENDER ROUNDS SUMMARY */}
        <div className="space-y-6">
          {practiceEntries.map((entry, i) => (
            <div key={i} className="rounded border border-emerald-500/30 bg-black/30 hover:bg-black/60 p-5 relative transition duration-700 hover:shadow-[inset_0_0_15px_rgba(156,163,175,0.4)]">
              <div title={`Round ${i + 1}`} className="absolute top-4 right-4 font-bold opacity-30 transition hover:opacity-60 text-5xl">
                {i + 1}
              </div>
              <div className="mb-4 text-xl text-emerald-100">{entry.word}</div>
              <div className="mb-4 text-sm text-emerald-200/70">
                Translation: <span className="text-emerald-100">{entry.translation}</span>
              </div>
              <div className="mb-4 text-sm text-emerald-200/70">
                <span className="text-[limegreen]">Your answer:</span> <span className="text-emerald-100">{userAnswers[i]}</span>
              </div>
              <div className="mb-4 text-sm text-emerald-200/70">
                In sentence: <span className="text-emerald-100">{entry.sentence}</span>
              </div>
              {entry.personalNote && (
                <div className="mb-4 text-sm text-emerald-200/70">
                  Note: <span className="text-emerald-100">{entry.personalNote}</span>
                </div>
              )}

              {/* EVALUATION BTNS */}
              <div className="mt-6 mb-3 text-xs uppercase tracking-wider text-emerald-300/60">Evaluate your recall:</div>
              <div className="flex flex-wrap gap-3">
                {btnsConfig.map((btnObj) => (
                  <button onClick={() => handleAnswer(entry.id, btnObj.value)} key={btnObj.value} type="button" title={btnObj.title} className={`rounded border px-2 py-1 text-md transition sm:px-3 sm:py-2 active:opacity-70 ${answers[entry.id] === btnObj.value ? btnObj.activeClass : ""} ${btnObj.className}`}>
                    {btnObj.text}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER BTN */}
        <div className="mt-10 flex justify-end">
          <button
            onClick={() => {
              saveSpacedRepetition(answers);
              setAnswers({});
              setPracticeEntries([]);
              setPracticeLanguage(null);
              setCurrentRound(null);
              setUserAnswers(null);
              setButtonClicked("dictionary");
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
              setNotification(["success", "Results saved!"]);
            }}
            disabled={!areAllEntriesRated}
            title={!areAllEntriesRated ? "You must rate each round before this action" : ""}
            className="rounded border border-emerald-500/40 bg-emerald-500/10 px-5 py-2 transition hover:bg-emerald-500/20 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
