import { createContext, useContext, useState, type ReactNode } from "react";
import { LOCAL_STORAGE_KEYS } from "../constants.ts";

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
  id: string;
  word: string;
  sentence: string; // enclosing sentence containing 'word'
  translations: string[];
  translation: string;
  videoTime: string; // on what HH:MM:SS it appears in video
  language: string;
  // dateAdded: string;
  createdAt: string;
  modifiedAt: string;
  videoName: string; // aka subtitle file name
  videoUrl: string;
  nextPractice: string;
  personalNote?: string;
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
  clickedCueTime: string;
  setClickedCueTime: React.Dispatch<React.SetStateAction<string>>;
  translations: string[] | null;
  setTranslations: React.Dispatch<React.SetStateAction<string[] | null>>;
  closestSentence: string | null;
  setClosestSentence: React.Dispatch<React.SetStateAction<string | null>>;
  videoDuration: number | null;
  setVideoDuration: React.Dispatch<React.SetStateAction<number | null>>;
  playPauseAction: "play" | "pause" | null;
  setPlayPauseAction: React.Dispatch<React.SetStateAction<"play" | "pause" | null>>;
  isBeingFetched: boolean;
  setIsBeingFetched: React.Dispatch<React.SetStateAction<boolean>>;
  buttonClicked: "add" | "restore" | "dictionary" | "practice";
  setButtonClicked: React.Dispatch<React.SetStateAction<"add" | "restore" | "dictionary" | "practice">>;
  animBgUrl: string | null;
  setAnimBgUrl: React.Dispatch<React.SetStateAction<string | null>>;
  entries: WordEntry[];
  setEntries: React.Dispatch<React.SetStateAction<WordEntry[]>>;
  practiceLanguage: string | null;
  setPracticeLanguage: React.Dispatch<React.SetStateAction<string | null>>;
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
  const [clickedCueTime, setClickedCueTime] = useState<string>("");
  const [translations, setTranslations] = useState<string[] | null>(null);
  const [closestSentence, setClosestSentence] = useState<string | null>(null);
  const [videoDuration, setVideoDuration] = useState<number | null>(null);
  const [playPauseAction, setPlayPauseAction] = useState<"play" | "pause" | null>(null);
  const [isBeingFetched, setIsBeingFetched] = useState<boolean>(false);
  const [buttonClicked, setButtonClicked] = useState<"add" | "restore" | "dictionary" | "practice">("add");
  const [animBgUrl, setAnimBgUrl] = useState<string | null>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.BACKGROUND);
    return stored ? stored : null;
  });
  const [entries, setEntries] = useState<WordEntry[]>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.VOCABULARY);
    return stored ? JSON.parse(stored) : [];
  });
  const [practiceLanguage, setPracticeLanguage] = useState<string | null>(null);

  return <AppContext.Provider value={{ videoUrl, setVideoUrl, selectedLanguage, setSelectedLanguage, transcriptData, setTranscriptData, videoName, setVideoName, currentVideoTime, setCurrentVideoTime, isVideoPlaying, setIsVideoPlaying, activeCue, setActiveCue, translations, setTranslations, closestSentence, setClosestSentence, videoDuration, setVideoDuration, playPauseAction, setPlayPauseAction, clickedCueTime, setClickedCueTime, isBeingFetched, setIsBeingFetched, buttonClicked, setButtonClicked, animBgUrl, setAnimBgUrl, entries, setEntries, practiceLanguage, setPracticeLanguage }}>{children}</AppContext.Provider>;
}

// ============================================================================

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider.");
  }

  return context;
}
