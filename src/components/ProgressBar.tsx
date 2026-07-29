import { useAppContext } from "../context/Context.tsx";

export default function ProgressBar() {
  const { videoDuration, currentVideoTime } = useAppContext();

  function formatVideoDuration(seconds: number): string | null {
    if (!seconds) return null;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return [hours, minutes, secs].map((value) => value.toString().padStart(2, "0")).join(":");
  }

  const currentTimeFormatted = formatVideoDuration(+currentVideoTime.toFixed());
  const totalTimeFormatted = formatVideoDuration(videoDuration ? videoDuration : 0);
  const percentage = ((currentVideoTime ?? 0) / (videoDuration ?? 1)) * 100;

  return (
    <div className="fixed top-0 left-0 z-50 h-[7px] w-full">
      <div
        className="h-full bg-white transition hover:opacity-100 opacity-50"
        title={`Video progress — ${percentage.toFixed()}% — ${currentTimeFormatted} / ${totalTimeFormatted}`}
        style={{
          width: `${percentage}%`,
        }}
      />
    </div>
  );
}
