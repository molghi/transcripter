declare namespace YT {
  interface PlayerEvent {
    target: Player;
  }

  interface OnStateChangeEvent extends PlayerEvent {
    data: number;
  }

  class Player {
    constructor(
      elementId: string | HTMLElement,
      options: {
        videoId: string;
        events?: {
          onReady?: (event: PlayerEvent) => void;
          onStateChange?: (event: OnStateChangeEvent) => void;
        };
      },
    );

    // ...
  }
}
