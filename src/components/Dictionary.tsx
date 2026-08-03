import DictionaryEntry from "./DictionaryEntry";
import { LOCAL_STORAGE_KEYS } from "../constants";
import type { WordEntry } from "../context/Context.tsx";

export default function Dictionary() {
  const fromLS = localStorage.getItem(LOCAL_STORAGE_KEYS.VOCABULARY);
  let dictEntries: WordEntry[] = [];
  if (!fromLS) return (dictEntries = []);
  dictEntries = JSON.parse(fromLS).reverse();

  return (
    <>
      <section className="mx-auto max-w-6xl p-8 font-mono text-white/70">
        {/* HEADING */}

        {/* text-cyan-300 */}
        <h1 className="mb-10 text-xl sm:text-3xl  text-center tracking-[0.2em] uppercase  text-green-400">Dictionary</h1>

        {/* TOP BAR */}
        <div className="mb-8 flex items-center justify-between rounded px-4">
          {/* ENTRY COUNT */}

          <span className="text-sm uppercase tracking-[0.2em] text-green-400/70">{dictEntries.length} entries</span>

          {/* FILTER */}
          <div className="flex items-center gap-3">
            <label htmlFor="dictionary-filter" className="text-sm uppercase tracking-[0.2em] text-green-400">
              Filter:
            </label>

            <select id="dictionary-filter" className="cursor-pointer rounded border border-cyan-400/30 bg-black/40 px-3 py-2 text-sm text-white/70 outline-none transition hover:border-green-300 focus:border-green-300">
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
