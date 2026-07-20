export default function isValidYouTubeUrl(value: string): boolean {
  try {
    const url = new URL(value);

    if (url.protocol !== "https:") return false;

    if (!value.startsWith("https://")) return false;

    const allowedHostnames = ["youtube.com", "www.youtube.com", "youtu.be"];

    return allowedHostnames.includes(url.hostname) && !value.includes(" ");
  } catch {
    return false;
  }
}
