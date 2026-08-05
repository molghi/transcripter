import DictionaryEntry from "./DictionaryEntry";
import { LOCAL_STORAGE_KEYS, LANGUAGES, ENTRIES_PER_PAGE } from "../constants";
import type { WordEntry } from "../context/Context.tsx";
import { useState } from "react";
import Pagination from "./Pagination";
import { useAppContext } from "../context/Context.tsx";

export default function Dictionary() {
  const { entries, setEntries } = useAppContext();

  const [select, setSelect] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // const fromLS = localStorage.getItem(LOCAL_STORAGE_KEYS.VOCABULARY);
  // let entries: WordEntry[] = [];
  // if (!fromLS) return (entries = []);
  // entries = JSON.parse(fromLS).reverse();

  let filteredEntries: WordEntry[] = [];
  let paginatedEntries: WordEntry[] = [];

  // ====================================

  const addedLangsRaw = [...new Set(entries.map((entry) => entry.language))];
  const addedLangsPretty = addedLangsRaw.map((langCode) => {
    const key = langCode as keyof typeof LANGUAGES;
    return `${LANGUAGES[key].flag} ${LANGUAGES[key].name}`;
  });
  const addedPeriodsRaw = [...new Set(entries.map((entry) => entry.createdAt.slice(0, 7)))];
  const addedPeriodsPretty = addedPeriodsRaw.map((x) => formatYearMonth(x));

  // ====================================

  function reactToSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newValue = e.target.value;
    setSelect(newValue);
    filterAndPaginate(newValue);
  }

  // ====================================

  function filterAndPaginate(filterValue: string) {
    if (filterValue === "") {
      filteredEntries = entries;
    } else {
      filteredEntries = filterEntries(entries, filterValue);
    }

    // sort all by date, newest first
    const sortedEntries = [...filteredEntries].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const startIndex = ENTRIES_PER_PAGE * (currentPage - 1);
    const endIndex = startIndex + ENTRIES_PER_PAGE;

    paginatedEntries = sortedEntries.slice(startIndex, endIndex);
  }
  filterAndPaginate("");

  // ====================================

  function deleteEntry(id: string) {
    const newEntries = entries.filter((entry) => entry.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEYS.VOCABULARY, JSON.stringify(newEntries));
    setEntries(newEntries);
  }

  // ====================================

  function editEntry(id: string, newNote: string) {
    const newEntries = entries.map((entry) => {
      if (entry.id === id) {
        entry.personalNote = newNote;
      }
      return entry;
    });
    localStorage.setItem(LOCAL_STORAGE_KEYS.VOCABULARY, JSON.stringify(newEntries));
    setEntries(newEntries);
  }

  // ====================================

  return (
    <>
      <section className="mx-auto max-w-5xl p-8 font-mono text-white/70">
        {/* HEADING */}

        {/* text-cyan-300 */}
        <h1 className="mb-10 text-xl sm:text-3xl  text-center tracking-[0.2em] uppercase  text-green-400">Dictionary</h1>

        {/* TOP BAR */}
        <div className="mb-8 flex items-center justify-between rounded px-4">
          {/* ENTRY COUNT */}

          <span className="text-sm uppercase tracking-[0.2em] text-green-400/70">{filteredEntries.length} entries</span>

          {/* FILTER */}
          <div className="flex items-center gap-3">
            <label htmlFor="dictionary-filter" className="text-sm uppercase tracking-[0.2em] text-green-400">
              Filter:
            </label>

            <select value={select} onChange={reactToSelectChange} id="dictionary-filter" className="cursor-pointer rounded border border-cyan-400/30 bg-black/40 px-3 py-2 text-sm text-white/70 outline-none transition hover:border-green-300 focus:border-green-300">
              <option value="">None</option>
              {addedLangsPretty.map((lang, index) => (
                <option key={index} value={addedLangsRaw[index]}>
                  By lang: {lang}
                </option>
              ))}
              {addedPeriodsPretty.map((period, index) => (
                <option key={index} value={addedPeriodsRaw[index]}>
                  By added in: {period}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ENTRIES */}
        <div className="space-y-6">{paginatedEntries.length > 0 ? paginatedEntries.map((dictEntry) => <DictionaryEntry key={dictEntry.id} data={dictEntry} deleteEntry={deleteEntry} editEntry={editEntry} />) : <div className="text-center">No entries</div>}</div>

        {/* PAGINATION */}
        {filteredEntries.length > 10 && <Pagination filteredEntries={filteredEntries} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
      </section>
    </>
  );
}

// ============================================================================

function formatYearMonth(yearMonth: string): string {
  const [year, month] = yearMonth.split("-").map(Number);

  return new Date(year, month - 1).toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });
}

// ============================================================================

export function filterEntries(entries: WordEntry[], filter: string): WordEntry[] {
  if (filter.startsWith("20")) {
    return entries.filter((entry) => {
      return entry.createdAt.startsWith(filter);
    });
  } else {
    return entries.filter((entry) => {
      return entry.language === filter;
    });
  }
}
