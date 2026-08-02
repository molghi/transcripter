import Header from "./components/Header";
import { APP_NAME, APP_SLOGAN } from "./constants";
import { useEffect } from "react";
import AddForm from "./components/AddForm";
import { useAppContext } from "./context/Context.tsx";
import Transcript from "./components/Transcript";
import ProgressBar from "./components/ProgressBar";
import { handleKeyDown } from "./utils/handleKeyboard.ts";
import Dictionary from "./components/Dictionary";

function App() {
  const { transcriptData, isVideoPlaying, setPlayPauseAction, buttonClicked } = useAppContext();

  // ============================================================================

  useEffect(() => {
    // modify document title
    document.title = `${APP_NAME} | ${APP_SLOGAN}`;
  }, []);

  // ============================================================================

  // handle key presses
  useEffect(() => {
    const handlerFn = (e: KeyboardEvent) => handleKeyDown(e, isVideoPlaying, setPlayPauseAction);

    if (!transcriptData) return;

    document.addEventListener("keydown", handlerFn);

    return () => document.removeEventListener("keydown", handlerFn);
  }, [transcriptData, isVideoPlaying]);

  // ============================================================================

  return (
    <div className="pb-[200px]">
      <Header />
      {buttonClicked === "add" && <AddForm />}
      {transcriptData !== null && (
        <>
          <ProgressBar />
          <Transcript />
        </>
      )}
      {buttonClicked === "dictionary" && <Dictionary />}
      {buttonClicked === "practice" && <div className="text-white text-center font-mono">Practice will be here...</div>}
    </div>
  );
}

export default App;
