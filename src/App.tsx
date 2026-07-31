import Header from "./components/Header";
import { APP_NAME, APP_SLOGAN } from "./constants";
import { useEffect } from "react";
import AddForm from "./components/AddForm";
import { useAppContext } from "./context/Context.tsx";
import Transcript from "./components/Transcript";
import ProgressBar from "./components/ProgressBar";
import { handleKeyDown } from "./utils/handleKeyboard.ts";

function App() {
  const { transcriptData, isVideoPlaying, setPlayPauseAction } = useAppContext();

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
      {!transcriptData && <AddForm />}
      {transcriptData !== null && (
        <>
          <ProgressBar />
          <Transcript />
        </>
      )}
    </div>
  );
}

export default App;
