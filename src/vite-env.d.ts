declare namespace YT {
  const PlayerState: {
    UNSTARTED: number;
    ENDED: number;
    PLAYING: number;
    PAUSED: number;
    BUFFERING: number;
    CUED: number;
  };

  interface PlayerEvent {
    target: Player;
  }

  class Player {
    constructor(
      element: string | HTMLElement,
      options: {
        videoId: string;
        events?: {
          onReady?: (event: PlayerEvent) => void;
          onStateChange?: (event: { data: number }) => void;
        };
      },
    );

    getCurrentTime(): number;
    seekTo: (seconds: number, allowSeeking: boolean) => void;
    playVideo: () => void;
    pauseVideo: () => void;
    getDuration(): number;
    destroy(): void;
  }
}
