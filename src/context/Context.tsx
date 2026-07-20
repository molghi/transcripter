import { createContext, useContext, useState, type ReactNode } from "react";

type SrtCueShape = {
  id: string;
  startTime: string;
  startSeconds: number;
  endTime: string;
  endSeconds: number;
  text: string;
};

type VttCueShape = {
  direction: string;
  snapToLines: boolean;
  linePosition: string;
  lineAlign: string;
  textPosition: string;
  positionAlign: string;
  size: number;
  alignment: string;
  id: string;
  startTime: number;
  endTime: number;
  pauseOnExit: boolean;
  text: string;
  tree: {
    children: {
      type: string;
      value: string;
    }[];
  };
};

type VttGeneralShape = {
  cues: VttCueShape[];
  errors: unknown[];
  styles: unknown[];
  time: number;
};

// export type TranscriptData = {
//   format: "srt" | "vtt";
//   data: VttGeneralShape | SrtCueShape[];
//   name: string;
// };

export type TranscriptData =
  | {
      format: "srt";
      data: SrtCueShape[];
      name: string;
    }
  | {
      format: "vtt";
      data: VttGeneralShape;
      name: string;
    };

type AppContextType = {
  videoUrl: string;
  setVideoUrl: React.Dispatch<React.SetStateAction<string>>;
  selectedLanguage: string;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<string>>;
  videoName: string;
  setVideoName: React.Dispatch<React.SetStateAction<string>>;
  transcriptData: TranscriptData | null;
  setTranscriptData: React.Dispatch<React.SetStateAction<TranscriptData | null>>;
};

const AppContext = createContext<AppContextType | null>(null);

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const [videoUrl, setVideoUrl] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [videoName, setVideoName] = useState("");
  const [transcriptData, setTranscriptData] = useState<TranscriptData | null>(null);

  return <AppContext.Provider value={{ videoUrl, setVideoUrl, selectedLanguage, setSelectedLanguage, transcriptData, setTranscriptData, videoName, setVideoName }}>{children}</AppContext.Provider>;
}

// ============================================================================

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider.");
  }

  return context;
}
