import Header from "./components/Header";
import { APP_NAME, APP_SLOGAN } from "./constants";
import { useEffect } from "react";
import AddForm from "./components/AddForm";
import { useAppContext } from "./context/Context.tsx";
import Transcript from "./components/Transcript";
import { translate2 } from "./utils/translate.ts";

function App() {
  const { transcriptData } = useAppContext();

  useEffect(() => {
    // modify document title
    document.title = `${APP_NAME} | ${APP_SLOGAN}`;

    // test
    (async function () {
      const res = await translate2("brillante", "es");
      console.log(res);
    })();
  }, []);

  return (
    <div className="pb-[200px]">
      <Header />
      {!transcriptData && <AddForm />}
      {transcriptData !== null && <Transcript />}
    </div>
  );
}

export default App;
