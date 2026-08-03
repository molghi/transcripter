import { APP_NAME, APP_SLOGAN, BTN_STYLE } from "../constants";
import { useAppContext } from "../context/Context.tsx";

import { restoreState } from "../utils/restoreState.ts";

function Header() {
  const { setSelectedLanguage, setVideoUrl, setVideoName, setTranscriptData, setActiveCue, setButtonClicked, buttonClicked } = useAppContext();

  // ===========================

  function resetAll() {
    setVideoUrl("");
    setSelectedLanguage("");
    setVideoName("");
    setTranscriptData(null);
  }

  // ===========================

  const btns = [
    {
      name: "Add",
      title: "Add material through file import or text input",
      callbackFn: () => {
        resetAll();
        setButtonClicked("add");
      },
    },
    {
      name: "Restore",
      title: "Restore previously saved material from local storage",
      callbackFn: () => {
        restoreState(setVideoUrl, setSelectedLanguage, setVideoName, setTranscriptData, setActiveCue);
        setButtonClicked("restore");
      },
    },
    {
      name: "Dictionary",
      title: "Browse and manage your saved words and phrases",
      callbackFn: () => {
        resetAll();
        setButtonClicked("dictionary");
      },
    },
    {
      name: "Practice",
      title: "Review your saved vocabulary with spaced repetition",
      callbackFn: () => {
        resetAll();
        setButtonClicked("practice");
      },
    },
  ];

  // ===========================

  return (
    <header className="max-w-4xl mx-auto flex items-center justify-between px-6 py-4 text-white md:flex-nowrap flex-wrap gap-4 mb-10">
      <h1 className="text-xl font-mono tracking-widest select-none text-green-400" title={APP_SLOGAN}>
        {APP_NAME}
      </h1>

      {/* RENDER BTNS */}
      <div className="flex gap-4 flex-wrap sm:flex-nowrap">
        {btns.map((btn, i) => {
          return (
            <button key={i} onClick={btn.callbackFn} title={btn.title} aria-label={btn.title} className={`${BTN_STYLE} select-none focus:outline-none focus:ring-1 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black ${buttonClicked === btn.name.toLowerCase() && "bg-green-900"}`}>
              {btn.name}
            </button>
          );
        })}
      </div>
    </header>
  );
}

export default Header;
