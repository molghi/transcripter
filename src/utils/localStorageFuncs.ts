import { LOCAL_STORAGE_KEYS } from "../constants.ts";
import type { TranscriptData } from "../context/Context.tsx";

export function saveProcessedData(videoUrl: string, videoLang: string, fileName: string, transcriptData: object[]): void {
  localStorage.setItem(LOCAL_STORAGE_KEYS.VIDEO_URL, videoUrl);
  localStorage.setItem(LOCAL_STORAGE_KEYS.VIDEO_LANGUAGE, videoLang);
  localStorage.setItem(LOCAL_STORAGE_KEYS.FILE_NAME, fileName);
  localStorage.setItem(LOCAL_STORAGE_KEYS.TRANSCRIPT_DATA, JSON.stringify(transcriptData));
}

// ============================================================================

type ReturnTypes = {
  videoUrl: string;
  videoLang: string;
  fileName: string;
  transcriptData: string | TranscriptData;
};

export function loadFromLS(): ReturnTypes {
  const videoUrl = localStorage.getItem(LOCAL_STORAGE_KEYS.VIDEO_URL) || "";
  const videoLang = localStorage.getItem(LOCAL_STORAGE_KEYS.VIDEO_LANGUAGE) || "";
  const fileName = localStorage.getItem(LOCAL_STORAGE_KEYS.FILE_NAME) || "";

  let transcriptData = localStorage.getItem(LOCAL_STORAGE_KEYS.TRANSCRIPT_DATA) || "";
  if (transcriptData) {
    transcriptData = JSON.parse(transcriptData);
  } else {
    transcriptData = "";
  }

  return { videoUrl, videoLang, fileName, transcriptData };
}
