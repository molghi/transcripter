import Header from "./components/Header";
import { APP_NAME, APP_SLOGAN } from "./constants";
import { useEffect } from "react";
import AddForm from "./components/AddForm";
import { useAppContext } from "./context/Context.tsx";
import Transcript from "./components/Transcript";
import ProgressBar from "./components/ProgressBar";

function App() {
  const { transcriptData } = useAppContext();

  useEffect(() => {
    // modify document title
    document.title = `${APP_NAME} | ${APP_SLOGAN}`;
  }, []);

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
