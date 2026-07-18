import SrtParser from "srt-parser-2";
import { WebVTTParser } from "webvtt-parser";

export default async function parseSubtitleFile(e: React.ChangeEvent<HTMLInputElement>): Promise<object | object[] | null> {
  // Get file from file picker
  const file = e.target.files?.[0];
  if (!file) return null;

  // Get file extension
  const extension = file.name.split(".").at(-1);

  // Read file contents
  const content = await file.text();

  let parser,
    subtitles = null;

  if (extension === "srt") {
    // Parse subtitle text SRT
    parser = new SrtParser();
    subtitles = parser.fromSrt(content);
    console.log("Selected: SRT");
  } else {
    // Parse subtitle text VTT
    parser = new WebVTTParser();
    subtitles = parser.parse(content);
    console.log("Selected: VTT");
  }
  return subtitles;
}
