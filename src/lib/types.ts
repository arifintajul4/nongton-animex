export type AnimeCard = {
  id: number;
  url: string;
  judul: string;
  cover: string;
  lastch: string;
};

export interface StreamType {
  data: Datum[];
}

export interface Datum {
  episode_id: number;
  likeCount: number;
  dislikeCount: number;
  userLikeStatus: number;
  reso: string[];
  stream: StreamItemType[];
}

export interface StreamItemType {
  reso: string;
  link: string;
}

export interface DetailsAnimeType {
  data: AnimeDetails[];
}

export interface AnimeDetails {
  id: number;
  series_id: string;
  bookmark: null;
  cover: string;
  judul: string;
  type: string;
  countdown: null;
  status: string;
  rating: string;
  published: string;
  author: string;
  genre: string[];
  genreurl: string[];
  sinopsis: string;
  history: string[];
  historyDurasi: number[];
  historyDurasiFull: number[];
  chapter: Chapter[];
}

export interface Chapter {
  id: number;
  ch: string;
  url: string;
  date: string;
  history: string;
  views: number;
  lastDurasi: null;
  fullDurasi: null;
}
