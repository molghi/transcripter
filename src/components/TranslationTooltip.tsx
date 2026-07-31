// import { useEffect, useState } from "react";
import type { SelectionPopup } from "./Transcript.tsx";
import { useAppContext } from "../context/Context.tsx";
import { useEffect } from "react";
import { addToDict } from "../utils/addToDict.ts";

export default function TranslationTooltip({ selectionPopup }: { selectionPopup: SelectionPopup }) {
  const { translations, setTranslations, selectedLanguage, videoUrl, videoName, closestSentence } = useAppContext();

  useEffect(() => {
    setTranslations([""]);
  }, []);

  if (!translations) return null;

  return (
    <>
      <style>{`
    @keyframes tooltip-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `}</style>

      <div
        className={`absolute w-[322px] border border-cyan-400/40 bg-black p-4 font-mono text-white/60 rounded -translate-y-full animate-[tooltip-in_160ms_ease-out]`}
        style={{
          left: selectionPopup?.x,
          top: selectionPopup?.y,
        }}
      >
        <div className="mb-3 flex items-center justify-between gap-4">
          {/* HEADING */}
          <h3 className="text-xs uppercase tracking-[0.2em] text-cyan-300">Possible translations:</h3>

          {/* ADD TO DICT BTN */}
          <button onClick={() => addToDict(selectionPopup, closestSentence, translations, selectedLanguage, videoName, videoUrl)} type="button" title="Add to my dictionary" className="rounded border border-cyan-400/40 px-3 py-1 text-sm uppercase tracking-wider text-cyan-300 transition hover:border-cyan-300 hover:bg-cyan-300/10 hover:text-white active:opacity-60">
            Add
          </button>
        </div>

        {/* LIST: SHOW FIRST 5 */}
        <ol className="list-decimal pl-7 space-y-2 text-sm text-white/60">
          {translations.slice(0, 5).map((translation) => (
            <li key={translation} className="border-l border-white/15 pl-3 transition hover:border-cyan-300 hover:text-white">
              {translation}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
