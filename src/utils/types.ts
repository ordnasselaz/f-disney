export type ApiResponseHome = {
  id: number;
  backdropPath: string;
  originalTitle?: string;
  originalName?: string;
};

export type Cast = {
  name: string;
  order: number;
};

export type Crew = {
  name: string;
  job?: string;
  known_for_department?: string;
};

export type Credits = {
  cast: Cast[];
  crew: Crew[];
};

export type Genre = {
  id: number;
  name: string;
};

export type Videos = {
  results: Result;
};

export type Result = {
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  id: string;
};

export type Recommendations = {
  page: number;
  results: Result2[];
  total_pages: number;
  total_results: number;
};

export type Result2 = {
  adult: boolean;
  backdrop_path?: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path?: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type Season = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
};

export type ApiResponseMovie = {
  id: number;
  backdrop_path: string;
  title?: string;
  name?: string;
  overview?: string;
  runtime?: number;
  release_date?: string;
  genres: Genre[];
  adult: boolean;
  credits: Credits;
  directorName: string;
  castNames: Cast[];
  videos: Videos;
  recommendations: Recommendations;
  original_name?: string;
  first_air_date?: string;
  seasons?: Season[];
};

export type MovieSearchResponse = {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
};
export type Data = {
  items: [
    {
      media_type: string;
      media_id: number;
    }
  ];
};

//export type Season2 = Episodes[];

export type Episodes = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  still_path: string;
  season_number: number;
};

export type CardProps = {
  id?: number;
  backdrop_path?: string;
  still_path?: string;
  title?: string;
  type?: string;
  media_type?: string;
  name?: string;
};
