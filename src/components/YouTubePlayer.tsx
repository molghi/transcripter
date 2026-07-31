import { useEffect, useEffectEvent, useRef } from "react";
import { useAppContext } from "../context/Context.tsx";

type YouTubePlayerProps = {
  videoId: string;
  clickedCueStart: number | null;
};

export default function YouTubePlayer({ videoId, clickedCueStart }: YouTubePlayerProps) {
  //
  const { setCurrentVideoTime, setIsVideoPlaying, setVideoDuration, playPauseAction } = useAppContext();

  const videoElRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YT.Player | null>(null);

  const timerRefreshSpeed = 100;

  // ============================================================================

  const createYTplayer = () => {
    return new window.YT.Player(videoElRef.current!, {
      videoId,

      // register callbacks, state transitions
      events: {
        // on ready: assign player el, set duration
        onReady: (event: YT.PlayerEvent) => {
          playerRef.current = event.target;
          const duration = event.target.getDuration();
          // console.log(duration);
          setVideoDuration(duration > 0 ? duration : null);
        },

        // set when it's being played or paused
        onStateChange: (event) => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            console.log("Video is playing\n", new Date().toString().split("GMT")[0]);
            setIsVideoPlaying(true);
          }
          if (event.data === window.YT.PlayerState.PAUSED) {
            console.log("Video is paused\n", new Date().toString().split("GMT")[0]);
            setIsVideoPlaying(false);
          }
        },
      },
    });
  };

  // ============================================================================

  // create YT iframe
  useEffect(() => {
    if (!videoElRef.current) return;

    // create a YouTube Player instance -- videoElRef.current is video container
    playerRef.current = createYTplayer();

    // remove iframe
    return () => {
      playerRef.current?.destroy();
    };
  }, [videoId]);

  // ============================================================================

  // get current video time
  useEffect(() => {
    // check that video container exists
    if (!videoElRef.current) return;

    const intervalTimer = setInterval(() => {
      const currentVideoTime = playerRef.current?.getCurrentTime() ?? 0;
      setCurrentVideoTime(currentVideoTime);
    }, timerRefreshSpeed);

    return () => clearInterval(intervalTimer);
  }, []);

  // ============================================================================

  useEffect(() => {
    if (playPauseAction === "play") {
      playerRef.current?.playVideo();
    }
    if (playPauseAction === "pause") {
      playerRef.current?.pauseVideo();
    }
  }, [playPauseAction]);

  // ============================================================================

  // play at specific time (at cue start time)
  useEffect(() => {
    if (!clickedCueStart) return;
    playerRef.current?.seekTo(clickedCueStart, true);
    playerRef.current?.playVideo();
  }, [clickedCueStart]);

  // ============================================================================

  return (
    // w-[500px]
    <div className="fixed right-6 top-16 w-64 sm:w-80">
      <div className="grayscale-[0.8] contrast-125 brightness-75">
        <div id="player" ref={videoElRef} className="aspect-video h-full w-full border border-white/20" />
      </div>
    </div>
  );
}
