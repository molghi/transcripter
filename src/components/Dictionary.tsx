import DictionaryEntry from "./DictionaryEntry";
import { LOCAL_STORAGE_KEYS } from "../constants";
import type { WordEntry } from "../context/Context.tsx";

export default function Dictionary() {
  const fromLS = localStorage.getItem(LOCAL_STORAGE_KEYS.VOCABULARY);
  let dictEntries: WordEntry[] = [];
  if (!fromLS) return (dictEntries = []);
  dictEntries = JSON.parse(fromLS); //.slice(11);

  return (
    <>
      <section className="mx-auto max-w-6xl p-8 font-mono text-white/70">
        {/* HEADING */}

        <h1 className="mb-10 text-xl sm:text-3xl  text-center tracking-[0.2em] uppercase text-cyan-300">Dictionary</h1>

        {/* TOP BAR */}
        <div className="mb-8 flex items-center justify-between rounded px-4">
          {/* ENTRY COUNT */}

          <span className="text-sm uppercase tracking-[0.2em] text-white/50">{dictEntries.length} entries</span>

          {/* FILTER */}
          <div className="flex items-center gap-3">
            <label htmlFor="dictionary-filter" className="text-sm uppercase tracking-[0.2em] text-cyan-300">
              Filter:
            </label>

            <select id="dictionary-filter" className="rounded border border-cyan-400/30 bg-black/40 px-3 py-2 text-sm text-white/70 outline-none transition hover:border-cyan-300 focus:border-cyan-300">
              <option value="">None</option>
            </select>
          </div>
        </div>

        {/* ENTRIES */}
        <div className="space-y-6">{dictEntries.length > 0 && dictEntries.map((dictEntry) => <DictionaryEntry key={dictEntry.id} data={dictEntry} />)}</div>
      </section>
    </>
  );
}
