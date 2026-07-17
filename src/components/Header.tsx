import { APP_NAME, APP_SLOGAN, BTN_STYLE } from "../constants";

function Header() {
  return (
    <header className="max-w-3xl mx-auto flex items-center justify-between px-6 py-4 bg-black text-white sm:flex-nowrap flex-wrap gap-4 mb-10">
      <h1 className="text-xl font-mono tracking-widest" title={APP_SLOGAN}>
        {APP_NAME}
      </h1>

      <div className="flex gap-4">
        <button onClick={() => console.log("Show Add screen")} className={BTN_STYLE} title="Add material through file import or text input" aria-label="Add material through file import or text input">
          Add
        </button>
        <button onClick={() => console.log("Restore transcript")} className={BTN_STYLE} title="Restore previously saved material from local storage" aria-label="Restore previously saved material from local storage">
          Restore
        </button>
      </div>
    </header>
  );
}

export default Header;
