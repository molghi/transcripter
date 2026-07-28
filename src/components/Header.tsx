import { APP_NAME, APP_SLOGAN, BTN_STYLE, LOCAL_STORAGE_KEYS } from "../constants";
import { loadFromLS } from "../utils/localStorageFuncs";
import { useAppContext } from "../context/Context.tsx";
import type { TranscriptData } from "../context/Context.tsx";
import smoothScrollTo from "../utils/smoothScrollTo.ts";

function Header() {
  const { setSelectedLanguage, setVideoUrl, setVideoName, setTranscriptData, setActiveCue } = useAppContext();

  // ===========================

  function restoreState() {
    const { videoUrl, videoLang, fileName, transcriptData } = loadFromLS();

    if (!videoUrl || !videoLang || !fileName || !transcriptData || !Array.isArray(transcriptData)) {
      return alert("No data found.");
    }

    setVideoUrl(videoUrl);
    setSelectedLanguage(videoLang);
    setVideoName(fileName);

    const obj: TranscriptData = {
      data: transcriptData,
      format: "srt",
      name: fileName,
    };
    setTranscriptData(obj);

    // scroll to active cue
    const activeCueFromLS = localStorage.getItem(LOCAL_STORAGE_KEYS.ACTIVE_CUE);
    if (!activeCueFromLS) return;
    setActiveCue(Number(activeCueFromLS));
    const activeElement = document.getElementById(`cue-${activeCueFromLS}`);
    if (!activeElement) return;
    const rect = activeElement.getBoundingClientRect(); // get coords relative to viewport
    const offset = window.innerHeight * 0.4; // set offset from the top
    smoothScrollTo(window.scrollY + rect.top - offset);
  }

  // ===========================

  function resetAll() {
    setVideoUrl("");
    setSelectedLanguage("");
    setVideoName("");
    setTranscriptData(null);
  }

  // ===========================

  const btns = [
    { name: "Add", title: "Add material through file import or text input", callbackFn: resetAll },
    { name: "Restore", title: "Restore previously saved material from local storage", callbackFn: restoreState },
    { name: "Dictionary", title: "Browse and manage your saved words and phrases", callbackFn: () => console.log("go to Dictionary") },
    { name: "Practice", title: "Review your saved vocabulary with spaced repetition", callbackFn: () => console.log("go to Practice") },
  ];

  // ===========================

  return (
    <header className="max-w-4xl mx-auto flex items-center justify-between px-6 py-4 bg-black text-white md:flex-nowrap flex-wrap gap-4 mb-10">
      <h1 className="text-xl font-mono tracking-widest select-none" title={APP_SLOGAN}>
        {APP_NAME}
      </h1>

      <div className="flex gap-4 flex-wrap sm:flex-nowrap">
        {btns.map((btn, i) => {
          return (
            <button key={i} onClick={btn.callbackFn} title={btn.title} aria-label={btn.title} className={`${BTN_STYLE} select-none`}>
              {btn.name}
            </button>
          );
        })}
      </div>
    </header>
  );
}

export default Header;
