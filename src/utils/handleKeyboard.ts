export function handleKeyDown(event: KeyboardEvent, isVideoPlaying: boolean, setPlayPauseAction: React.Dispatch<React.SetStateAction<"play" | "pause" | null>>) {
  if (event.code !== "Space") return;

  const target = event.target as HTMLElement;

  // Preserve normal space-bar behavior while typing or pressing controls:
  if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT" || target.tagName === "BUTTON" || target.isContentEditable) {
    return;
  }

  event.preventDefault();

  if (isVideoPlaying) {
    setPlayPauseAction("pause");
  } else {
    setPlayPauseAction("play");
  }
}
