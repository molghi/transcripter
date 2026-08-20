import type { WordEntry } from "../context/Context.tsx";
import { APP_LANGUAGES } from "../constants.ts";

export default function DictionaryEntry({ data, deleteEntry, editEntry }: { data: WordEntry; deleteEntry: Function; editEntry: Function }) {
  //

  const language: string[] | undefined = Object.values(APP_LANGUAGES).find((arr) => Array.isArray(arr) && arr[0] === data.language);
  const [langCode, langColor, langFlag, langName] = language ?? ["", "", "", ""];

  const editNote = () => {
    const newNote = prompt(`Enter a new personal note for this entry:`, data.personalNote)?.trim();
    // if (!newNote) return;
    editEntry(data.id, newNote);
  };

  const startDeletion = () => {
    const answer = confirm(`Are you sure you want to delete this entry?\n
${langFlag} ${langCode.toUpperCase()} — ${data.word}\n
This action is irreversible.`);
    if (!answer) return;
    deleteEntry(data.id);
  };

  return (
    <>
      <div className={`relative rounded border border-[${langColor}] bg-black/40 p-4 font-mono text-white/70 backdrop-blur-sm transition`}>
        {/* ACTIONS */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button onClick={editNote} type="button" title="Edit personal note" className="rounded border border-cyan-400/30 px-2 py-1 text-xs text-green-400 transition hover:border-green-300 hover:bg-cyan-300/10 hover:text-green-200">
            Edit note
          </button>

          <button onClick={startDeletion} type="button" title="Delete entry" className="rounded border border-red-400/30 px-2 py-1 text-xs text-red-300 transition hover:border-red-300 hover:bg-red-400/10 hover:text-red-100">
            Delete
          </button>
        </div>

        {/* WORD */}
        <div className="mb-4 flex items-center gap-3">
          <span title={langName}>{langFlag}</span>
          <h2 className={`text-lg text-[${langColor}]`}>{data.word}</h2>
        </div>

        {/* DETAILS */}
        <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-white/40">Translation:</span>
            <span className="relative group">
              <span className="inline-flex relative">
                <span className="text-emerald-100 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">{data.translation}</span>
              </span>
              <span className="absolute inset-0 px-2 py-0.5 rounded-sm border border-gray-300/30 bg-gradient-to-b from-gray-500/50 to-gray-700/90 backdrop-blur-[1px] pointer-events-none group-hover:opacity-0 transition-opacity duration-700 overflow-hidden">
                <span className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_6px,rgba(255,255,255,0.98)_6px,rgba(255,255,255,0.98)_12px)]"></span>
              </span>
            </span>
          </div>

          <div className="flex gap-2 min-w-[350px]">
            <span className="text-white/40 whitespace-nowrap">From video:</span>
            <span>
              <a href={`https://www.youtube.com/watch?v=${data.videoUrl}`} target="_blank" className="underline hover:no-underline" title={`Go to video: https://youtu.be/${data.videoUrl}`}>
                {/* {data.videoName.slice(0, 38).trim() + "..."} */}
                {`https://youtu.be/${data.videoUrl}`}
              </a>
            </span>
          </div>

          <div className="flex gap-2">
            <span className="text-white/40 whitespace-nowrap">In sentence:</span>
            <span>{data.sentence}</span>
          </div>

          <div className="flex gap-2">
            <span className="text-white/40">Appears at:</span>
            <span>{data.videoTime}</span>
          </div>

          {data.personalNote && (
            <div className="flex gap-2">
              <span className="text-white/40">Note:</span>
              <span>{data.personalNote}</span>
            </div>
          )}

          <div className="flex gap-2 text-[12px] opacity-30 transition duration-500 hover:opacity-100">
            <span className="text-white/50">Created:</span>
            <span>{formatDateTime(data.createdAt)}</span>
          </div>
        </div>
      </div>
    </>
  );
}

function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
