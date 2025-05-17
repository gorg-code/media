
import { MediaData, MusicItem, MovieItem } from "../types/media";

export const fetchMediaData = async (): Promise<MediaData> => {
  try {
    const response = await fetch("/media.json");
    if (!response.ok) {
      throw new Error("Nepodařilo se načíst data");
    }
    return await response.json();
  } catch (error) {
    console.error("Chyba při načítání dat:", error);
    return { music: [], movies: [] };
  }
};

export const exportToJson = (data: MediaData): void => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.href = url;
  link.download = "media.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const getAllMusicFormats = (musicItems: MusicItem[]): string[] => {
  const formats = Array.from(new Set(musicItems.map(item => item.FORMÁT)));
  return formats.sort();
};

export const getAllMovieFormats = (movieItems: MovieItem[]): string[] => {
  const formats = Array.from(new Set(movieItems.map(item => item.FORMÁT)));
  return formats.sort();
};

export const getAllMusicYears = (musicItems: MusicItem[]): number[] => {
  const years = Array.from(new Set(musicItems.map(item => item.ROK)));
  return years.sort((a, b) => a - b);
};
