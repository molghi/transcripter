declare namespace YT {
  const PlayerState: {
    UNSTARTED: number;
    ENDED: number;
    PLAYING: number;
    PAUSED: number;
    BUFFERING: number;
    CUED: number;
  };

  class Player {
    constructor(
      element: string | HTMLElement,
      options: {
        videoId: string;
        events?: {
          onReady?: (event: unknown) => void;
          onStateChange?: (event: { data: number }) => void;
        };
      },
    );

    getCurrentTime(): number;
    seekTo: (seconds: number, allowSeeking: boolean) => void;
    playVideo: () => void;
    getDuration(): number;
    destroy(): void;
  }
}
