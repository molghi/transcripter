import { useAppContext } from "../context/Context.tsx";
import { useEffect, useState } from "react";

export default function Notification() {
  const { notification, setNotification } = useAppContext();
  const [visible, setVisible] = useState(false);

  if (!notification) return null;

  useEffect(() => {
    // const timeout = setTimeout(() => {
    //   setNotification(null);
    // }, 4000);

    // return () => clearTimeout(timeout);

    requestAnimationFrame(() => setVisible(true));

    const fadeOut = setTimeout(() => setVisible(false), 3500);
    const remove = setTimeout(() => setNotification(null), 4000);

    return () => {
      clearTimeout(fadeOut);
      clearTimeout(remove);
    };
  }, [setNotification]);

  let [_, notiText] = notification; // [notiType, notiText]

  //   let [notiType, notiText] = ["success", "Results saved!"];

  return (
    <div className={`fixed top-[15px] left-1/2 z-50 -translate-x-1/2 transition-all duration-500 ${visible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}>
      {/* CONTENTS */}
      <div>
        <div className="min-w-[280px] rounded-md border border-emerald-400/40 bg-black/30 px-5 py-3 font-mono text-sm tracking-wide text-[limegreen] shadow-[inset_0_0_10px_limegreen] backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-300 shadow-[0_0_8px_currentColor]" />
            <span>{notiText}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
