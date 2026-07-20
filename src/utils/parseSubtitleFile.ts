import SrtParser from "srt-parser-2";
import { WebVTTParser } from "webvtt-parser";
import type { TranscriptData } from "../context/Context.tsx";

export default async function parseSubtitleFile(e: React.ChangeEvent<HTMLInputElement>): Promise<TranscriptData | null> {
  // Get file from file picker
  const file = e.target.files?.[0];
  if (!file) return null;

  // Get file extension
  const extension = file.name.split(".").at(-1);

  // Read file contents
  const content = await file.text();

  let parser,
    subtitles = null;

  if (extension !== "srt" && extension !== "vtt") return null;

  if (extension === "srt") {
    // Parse subtitle text SRT
    parser = new SrtParser();
    subtitles = parser.fromSrt(content);
  } else {
    // Parse subtitle text VTT
    parser = new WebVTTParser();
    subtitles = parser.parse(content);
  }

  return { format: extension, data: subtitles, name: file.name };
}
