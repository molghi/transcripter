import { createContext, useContext, useState, type ReactNode } from "react";

export type SrtCueShape = {
  id: string;
  startTime: string;
  startSeconds: number;
  endTime: string;
  endSeconds: number;
  text: string;
};

export type VttCueShape = {
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

export type WordEntry = {
  word: string;
  sentence: string;
  translations: string[];
  language: string;
  dateAdded: string;
  videoName: string;
  videoUrl: string;
};

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
  currentVideoTime: number;
  setCurrentVideoTime: React.Dispatch<React.SetStateAction<number>>;
  isVideoPlaying: boolean;
  setIsVideoPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  activeCue: number | null;
  setActiveCue: React.Dispatch<React.SetStateAction<number | null>>;
  translations: string[] | null;
  setTranslations: React.Dispatch<React.SetStateAction<string[] | null>>;
  closestSentence: string | null;
  setClosestSentence: React.Dispatch<React.SetStateAction<string | null>>;
  videoDuration: number | null;
  setVideoDuration: React.Dispatch<React.SetStateAction<number | null>>;
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
  const [currentVideoTime, setCurrentVideoTime] = useState<number>(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [activeCue, setActiveCue] = useState<number | null>(0);
  const [translations, setTranslations] = useState<string[] | null>(null);
  const [closestSentence, setClosestSentence] = useState<string | null>(null);
  const [videoDuration, setVideoDuration] = useState<number | null>(null);

  return <AppContext.Provider value={{ videoUrl, setVideoUrl, selectedLanguage, setSelectedLanguage, transcriptData, setTranscriptData, videoName, setVideoName, currentVideoTime, setCurrentVideoTime, isVideoPlaying, setIsVideoPlaying, activeCue, setActiveCue, translations, setTranslations, closestSentence, setClosestSentence, videoDuration, setVideoDuration }}>{children}</AppContext.Provider>;
}

// ============================================================================

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider.");
  }

  return context;
}
