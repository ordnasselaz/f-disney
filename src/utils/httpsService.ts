import axios, { AxiosRequestConfig } from "axios";
import { CardProps } from "../componets/Backdrop/Backdrop";
import { apiKey, ReadAccessToken as rat } from "./apiKey";

type ApiResponseHome = {
  id: number;
  backdropPath: string;
  originalTitle?: string;
  originalName?: string;
};

type Cast = {
  name: string
  order: number
}

type Crew = {
  name: string
  job: string
}

type Credits = {
  cast: Cast[]
  crew: Crew[]
}

type Genre = {
  id: number
  name: string
};

type ApiResponseMovie = {
  id: number;
  backdropPath: string;
  title?: string;
  name?: string;
  overview?: string;
  runtime?: number;
  release_date?: string;
  genres: Genre[];
  adult: boolean;
  credits: Credits
};

const formatApiResponseHome = (response: ApiResponseHome[]): CardProps[] => {
  return response.map((result: any) => ({
    id: result.id,
    title: result.title || result.original_name,
    backdropPath: `https://image.tmdb.org/t/p/original${result.backdrop_path}`,
  }));
};

const formatApiResponseMovie = (result: ApiResponseMovie): any => {
  const castNames = getCastNames(result.credits, 10);
  const directorName = getDirectorName(result.credits);
  return {
    id: result.id,
    backdropPath: `https://image.tmdb.org/t/p/original${result.backdropPath}`,
    title: result.title,
    overview: result.overview,
    runtime: `${result.runtime} min`,
    relaseDate: result.release_date,
    genres: result.genres.map((genre) => genre.name),
    adult: result.adult,
    castNames,
    directorName
  };
};


export const getPopular = async (): Promise<CardProps[]> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
  );
  const movie = formatApiResponseHome(response.data.results);
  console.log(movie)
  return movie;
};

export const getTopRated = async (): Promise<CardProps[]> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`
  );
  const movie = formatApiResponseHome(response.data.results);
  return movie;
};

export const getUpcoming = async (): Promise<CardProps[]> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=2`
  );
  const movie = formatApiResponseHome(response.data.results);
  return movie;
};


export const getAction = async (): Promise<CardProps[]> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1&with_genres=28`
  );
  const movie = formatApiResponseHome(response.data.results);
  return movie;
};

const getDirectorName = (credits: Credits): string | undefined => {
  const director = credits.crew.find((crew) => crew.job === 'Director');
  return director?.name;
};

const getCastNames = (credits: Credits, count: number): string[] => {
  return credits.cast.slice(0, count).map((cast) => cast.name);
};

export const getMovieDetails = async (movie_id: number): Promise<any> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}&language=en-US&append_to_response=credits`
  );
  const movie = formatApiResponseMovie(response.data);
  console.log(movie);
  return movie;
};

export const apiCalls: {
  [key: string]: () => Promise<CardProps[]>;
} = {
  popular: getPopular,
  topRated: getTopRated,
  upcoming: getUpcoming,
  action: getAction,
};

export const fetchData = async (id: string): Promise<CardProps[]> => {
  const apiCall = apiCalls[id];
  if (!apiCall) {
    throw new Error(`Invalid API call ID: ${id}`);
  }
  try {
    const response = await apiCall();
    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
};
// login
// Generate a new request token
// Send the user to TMDb asking the user to approve the token
export const getRequestToken = async () => {
  const redirect = JSON.stringify({
    // Page where to redirect after authorization
    redirect_to: "http://localhost:3000/home",
  });
  const config: AxiosRequestConfig = {
    url: "https://api.themoviedb.org/4/auth/request_token",
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${rat}`,
    },
    data: redirect,
  };

  try {
    const response = await axios(config);
    const requestToken: string = response.data.request_token;
    const authUrl = `https://www.themoviedb.org/auth/access?request_token=${requestToken}`;
    return { authUrl };
    //await requestAccessToken(requestToken);
  } catch (error) {
    console.error(error);
  }
};

// With an approved request token, generate a access token
/*
const requestAccessToken = async (requestToken: string) => {
  const config: AxiosRequestConfig = {
    url: "https://api.themoviedb.org/4/auth/access_token",
    method: "POST",
    headers: {
      "content-type": "application/json",
      "authorization": `Bearer ${rat}`,
    },
    data: JSON.stringify({ request_token: requestToken }),
  };
  try {
    const response = await axios(config);
    console.log(response);
  } catch (error) {
    console.error("error: " + error);
  }
};
*/
