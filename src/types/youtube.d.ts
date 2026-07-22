declare namespace YT {
  class Player {
    constructor(
      elementId: string,
      options: {
        videoId: string;
        events?: {
          onReady?: (event: unknown) => void;
          onStateChange?: (event: { data: number }) => void;
        };
      },
    );

    getCurrentTime(): number;
    getDuration(): number;
    playVideo(): void;
    pauseVideo(): void;
    destroy(): void;
  }
}

export {};
