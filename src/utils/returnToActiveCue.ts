import smoothScrollTo from "../utils/smoothScrollTo.ts";

// on clicking the btn to return to active/current cue:
export const returnToActiveCue = (activeCue: number | null) => {
  //
  const element = document.getElementById(`cue-${activeCue}`);
  if (!element) return;

  const rect = element.getBoundingClientRect(); // get coords relative to viewport

  const offset = window.innerHeight * 0.4; // set offset from the top

  smoothScrollTo(window.scrollY + rect.top - offset); // scroll to current subtitle
};
