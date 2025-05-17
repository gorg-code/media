
import { MediaData, MusicItem, MovieItem } from "../types/media";

// Funkce pro načtení dat ze souboru media.json
export const fetchMediaData = async (): Promise<MediaData> => {
  try {
    console.log("Fetching from media.json");
    const response = await fetch("/media.json");
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Media data loaded:", data);
    return data;
  } catch (error) {
    console.error("Error fetching media data:", error);
    throw error;
  }
};

// Funkce pro export dat do JSON souboru
export const exportToJson = (data: MediaData) => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement("a");
  a.href = url;
  a.download = "media.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Pomocné funkce pro filtrování formátů
export const getAllMusicFormats = (items: MusicItem[]): string[] => {
  const formats = new Set<string>();
  items.forEach(item => {
    if (item.FORMÁT) {
      formats.add(item.FORMÁT);
    }
  });
  return Array.from(formats).sort();
};

export const getAllMovieFormats = (items: MovieItem[]): string[] => {
  const formats = new Set<string>();
  items.forEach(item => {
    if (item.FORMÁT) {
      formats.add(item.FORMÁT);
    }
  });
  return Array.from(formats).sort();
};

export const getAllMusicYears = (items: MusicItem[]): string[] => {
  const years = new Set<string>();
  items.forEach(item => {
    if (item.ROK) {
      years.add(item.ROK.toString());
    }
  });
  return Array.from(years).sort((a, b) => parseInt(b) - parseInt(a)); // Seřazení od nejnovějšího
};
