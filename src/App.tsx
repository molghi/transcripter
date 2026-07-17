import Header from "./components/Header";
import { APP_NAME, APP_SLOGAN } from "./constants";
import { useEffect } from "react";
import AddForm from "./components/AddForm";

function App() {
  useEffect(() => {
    // modify document title
    document.title = `${APP_NAME} | ${APP_SLOGAN}`;
  }, []);

  return (
    <div className="pb-[150px]">
      <Header />
      <AddForm />
    </div>
  );
}

export default App;
