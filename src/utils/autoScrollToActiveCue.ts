import smoothScrollTo from "../utils/smoothScrollTo.ts";

export function autoScrollToActiveCue(activeCue: number | null, currentVideoTime: number) {
  //

  if (activeCue === null || activeCue < 0) return;

  // console.log("activeCue", activeCue);
  // console.log("currentVideoTime", currentVideoTime);

  const activeElement = document.getElementById(`cue-${activeCue}`);
  if (!activeElement) return;

  const rect = activeElement.getBoundingClientRect(); // get coords relative to viewport

  const offset = window.innerHeight * 0.4; // set offset from the top

  smoothScrollTo(window.scrollY + rect.top - offset); // scroll to current subtitle

  // NOTE: default browser smooth-scrolling is not smooth enough in this case:
  // window.scrollTo({
  //   top: window.scrollY + rect.top - offset,
  //   behavior: "smooth",
  // });
}
