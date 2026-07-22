import { useEffect, useRef } from "react";

type YouTubePlayerProps = {
  videoId: string;
};

export default function YouTubePlayer({ videoId }: YouTubePlayerProps) {
  const videoElRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YT.Player | null>(null);

  // ================

  // create YT iframe
  useEffect(() => {
    if (!videoElRef.current) return;

    // create a YouTube Player instance -- videoElRef.current is video container
    playerRef.current = new window.YT.Player(videoElRef.current!, {
      videoId,
      // register callbacks, state transitions
      events: {
        onStateChange: (event) => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            console.log("Video is playing");
          }
          if (event.data === window.YT.PlayerState.PAUSED) {
            console.log("Video is paused");
          }
        },
      },
    });

    // remove iframe
    return () => playerRef.current?.destroy();
  }, [videoId]);

  // ================

  // get current video time
  useEffect(() => {
    // check that video container exists
    if (!videoElRef.current) return;

    const interval = setInterval(() => {
      const currentVideoTime = playerRef.current?.getCurrentTime();
      console.log("Current video time:", currentVideoTime);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // ============================================================================

  return (
    <div className="fixed right-6 top-6 w-80">
      <div className="grayscale-[0.8] contrast-125 brightness-75">
        <div id="player" ref={videoElRef} className="aspect-video h-full w-full border border-white/20" />
      </div>
    </div>
  );
}
