export function getYoutubeVideoID(URL: string): string {
  const input = URL.trim();

  // Allow an already-extracted YouTube video ID.
  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
    return input;
  }

  try {
    const url = new globalThis.URL(input);
    const hostname = url.hostname.replace(/^www\./, "");

    if (hostname === "youtu.be") {
      return url.pathname.split("/").filter(Boolean)[0] ?? "";
    }

    if (hostname === "youtube.com" || hostname === "m.youtube.com" || hostname === "music.youtube.com") {
      if (url.pathname === "/watch") {
        return url.searchParams.get("v") ?? "";
      }

      const [, type, videoID] = url.pathname.split("/");

      if (["embed", "shorts", "live"].includes(type)) {
        return videoID ?? "";
      }
    }

    return "";
  } catch {
    return "";
  }
}
