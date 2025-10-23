import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export function isVideo(src: string): boolean {
  const videoExtensions = [".mp4", ".webm", ".mov", ".ogg", ".avi"];
  return videoExtensions.some((ext) => src.toLowerCase().endsWith(ext));
}
