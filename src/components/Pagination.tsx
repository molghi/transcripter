import { ENTRIES_PER_PAGE } from "../constants";
import type { WordEntry } from "../context/Context.tsx";

type Props = {
  filteredEntries: WordEntry[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function Pagination({ filteredEntries, currentPage, setCurrentPage }: Props) {
  return (
    <>
      <div className="flex flex-wrap justify-center mt-20 gap-6 text-md max-w-full overflow-x-auto px-2">
        <button onClick={() => paginate(filteredEntries.length, setCurrentPage, "decrement", undefined)} className={`border-dashed border-emerald-600 border rounded px-2 py-1 hover:bg-[#222] transition active:bg-[#000]`}>
          Prev
        </button>

        {Array.from({ length: Math.ceil(filteredEntries.length / ENTRIES_PER_PAGE) }, (_, i) => (
          <button key={i + 1} className={`min-w-[17px] border rounded px-2 py-1 hover:bg-[#222] transition active:bg-[#000] ${i + 1 === currentPage ? "border-solid border-emerald-400" : "border-dashed border-emerald-600"}`} onClick={() => paginate(filteredEntries.length, setCurrentPage, undefined, i + 1)}>
            {i + 1}
          </button>
        ))}

        <button onClick={() => paginate(filteredEntries.length, setCurrentPage, "increment", undefined)} className={`border-dashed border-emerald-600 border rounded px-2 py-1 hover:bg-[#222] transition active:bg-[#000]`}>
          Next
        </button>
      </div>
    </>
  );
}

// ============================================================================

type PaginateFlag = "increment" | "decrement";

function paginate(filteredEntriesLength: number, setCurrentPage: React.Dispatch<React.SetStateAction<number>>, flag?: PaginateFlag, pageToShow?: number) {
  // calc total pages
  const totalPages: number = Math.ceil(filteredEntriesLength / ENTRIES_PER_PAGE);

  if (flag === undefined && pageToShow === undefined) {
    console.log("Either flag or pageToShow must be provided");
    throw new Error("Either flag or pageToShow must be provided");
  }

  if (flag === "increment") {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    return;
  }

  if (flag === "decrement") {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    return;
  }

  if (typeof pageToShow === "number") {
    setCurrentPage(pageToShow);
  }
}
