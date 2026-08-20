import express from "express";
import cors from "cors";
import { getSubtitles } from "youtube-caption-extractor";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

app.get("/api/captions/:videoId", async (req, res) => {
  try {
    const subtitles = await getSubtitles({
      videoID: req.params.videoId,
      lang: String(req.query.lang ?? "en"),
    });

    res.json(subtitles);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.listen(3001);
