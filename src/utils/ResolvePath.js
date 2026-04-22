import { BASE_PATH } from "./Config";

export const resolveAssetPath = (src) => {
  if (typeof src !== "string") return src;

  const trimmedSrc = src.trim();
  if (!trimmedSrc) return "";

  // Keep absolute/protocol-relative/blob/data URLs unchanged.
  if (
    /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(trimmedSrc) ||
    trimmedSrc.startsWith("//")
  ) {
    return trimmedSrc;
  }

  // Remove leading slash from src if it exists
  const cleanSrc = trimmedSrc.startsWith("/") ? trimmedSrc.slice(1) : trimmedSrc;

  // Ensure BASE_PATH ends with a slash
  const base = BASE_PATH.endsWith("/") ? BASE_PATH : BASE_PATH + "/";

  return base + cleanSrc;
};
