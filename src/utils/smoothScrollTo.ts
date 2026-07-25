export default function smoothScrollTo(targetY: number, duration = 600) {
  const startY = window.scrollY; // where page is currently scrolled to
  const distance = targetY - startY; // how far need to scroll
  const startTime = performance.now(); // remember when animation started

  //
  function animate(currentTime: number) {
    const elapsed = currentTime - startTime; // time passed since animation began
    const progress = Math.min(elapsed / duration, 1); // // Progress from 0 to 1. Never let it exceed 1.

    const ease = 1 - Math.pow(1 - progress, 3); // ease-out movement so movement slows near the end

    window.scrollTo(0, startY + distance * ease);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  //
  requestAnimationFrame(animate);
}
