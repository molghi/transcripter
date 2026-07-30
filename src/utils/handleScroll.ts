export function handleScroll(activeCue: number | null, setIsScrollBtnShown: React.Dispatch<React.SetStateAction<boolean>>) {
  //
  if (activeCue === null || activeCue < 0) return;

  const activeElement = document.getElementById(`cue-${activeCue}`);
  if (!activeElement) return;

  const rect = activeElement.getBoundingClientRect(); // get coords relative to viewport

  const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

  setIsScrollBtnShown(!isVisible);
}
