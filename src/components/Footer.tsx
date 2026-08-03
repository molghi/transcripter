import AnimatedBackground from "./AnimatedBackground";
import ExportImport from "./ExportImport";

export default function Footer() {
  return (
    <>
      <div className="max-w-4xl w-full mx-auto flex sm:justify-between sm:gap-10 gap-5 font-mono text-sm text-emerald-200 mt-[50px] border-t border-emerald-800/50 py-5 px-4 sm:flex-row flex-col-reverse items-center">
        {/* transition duration-200 opacity-30 hover:opacity-100 */}
        {/* absolute bottom-[30px] left-1/2 -translate-x-1/2 */}
        <AnimatedBackground />

        {/* <div className="text-center">
          <button
            onClick={() => {
              //   window.scrollTo({ top: 0, behavior: "smooth" });
              //   setActiveView("about");
            }}
            title="About this app"
            className={`border-dashed border-emerald-600 transition duration-200 opacity-30 hover:opacity-100 inline-block`}
          >
            About
          </button>
        </div> */}

        <ExportImport />
      </div>
    </>
  );
}
