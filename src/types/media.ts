
export interface MusicItem {
  SKUPINA: string;
  ALBUM: string | null;
  TRACK: string | null;
  ROK: number;
  FORMÁT: string;
}

export interface MovieItem {
  JMÉNO: string;
  REŽIE: string;
  FORMÁT: string;
}

export interface MediaData {
  music: MusicItem[];
  movies: MovieItem[];
}
