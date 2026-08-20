import { getSubtitles } from "youtube-caption-extractor";

const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:5173",
};

export default {
  async fetch(request: Request) {
    try {
      const url = new URL(request.url);

      const videoId = url.searchParams.get("videoId");
      const lang = url.searchParams.get("lang") ?? "en";

      if (!videoId) {
        return Response.json(
          { error: "Missing videoId" },
          {
            status: 400,
            headers: corsHeaders,
          },
        );
      }

      const subtitles = await getSubtitles({
        videoID: videoId,
        lang,
      });

      return Response.json(subtitles, {
        headers: corsHeaders,
      });
    } catch (error) {
      return Response.json(
        {
          error: error instanceof Error ? error.message : "Unknown error",
        },
        {
          status: 500,
          headers: corsHeaders,
        },
      );
    }
  },
};
