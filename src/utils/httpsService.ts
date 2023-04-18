import axios, { AxiosRequestConfig } from "axios";
import { CardProps } from "./types";
import { apiKey, ReadAccessToken as rat } from "./apiKey";
import {
  ApiResponseHome,
  Credits,
  ApiResponseMovie,
  MovieSearchResponse,
  Data,
} from "./types";

const formatApiResponseHome = (response: ApiResponseHome[]): CardProps[] => {
  return response.map((result: any) => ({
    id: result.id,
    title: result.title || result.name,
    backdrop_path: result.backdrop_path,
  }));
};

const formatApiResponseMovie = (result: ApiResponseMovie): any => {
  const castNames = getCastNames(result.credits, 10);
  const directorName = getDirectorName(result.credits);
  return {
    id: result.id,
    backdrop_path: result.backdrop_path,
    title: result.title || result.name,
    overview: result.overview,
    runtime: `${result.runtime} min`,
    release_date: result.release_date || result.first_air_date,
    genres: result.genres.map((genre) => genre.name),
    adult: result.adult,
    castNames,
    directorName,
    videos: result.videos,
    recommendations: result.recommendations,
    seasons: result.seasons,
  };
};

export const getPopular = async (type: string): Promise<CardProps[]> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/${type}/popular?api_key=${apiKey}&language=en-US&page=1`
  );
  const movie = formatApiResponseHome(response.data.results);
  return movie;
};

export const getTopRated = async (type: string): Promise<CardProps[]> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/${type}/top_rated?api_key=${apiKey}&language=en-US&page=1`
  );
  const movie = formatApiResponseHome(response.data.results);
  return movie;
};

export const getUpcoming = async (type: string): Promise<CardProps[]> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/${type}/upcoming?api_key=${apiKey}&language=en-US&page=2`
  );
  const movie = formatApiResponseHome(response.data.results);
  return movie;
};

export const getLastest = async (type: string): Promise<CardProps[]> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/${type}/latest?api_key=${apiKey}&language=en-US&page=1`
  );
  const movie = formatApiResponseHome(response.data.results);
  return movie;
};

export const getMoviesByGenre = async (
  type: string,
  genre?: string,
  page?: string
): Promise<CardProps[]> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/discover/${type}?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=${page}&with_genres=${genre}`
  );
  const movie = formatApiResponseHome(response.data.results);
  return movie;
};

const getDirectorName = (credits: Credits): string | undefined => {
  const director = credits.crew.find(
    (crew) => crew.job === "Director" || crew.known_for_department === "Writing"
  );
  return director?.name;
};

const getCastNames = (credits: Credits, count: number): string[] => {
  return credits.cast.slice(0, count).map((cast) => cast.name);
};

export const getMovieDetails = async (
  movie_id: number,
  type: string
): Promise<any> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/${type}/${movie_id}?api_key=${apiKey}&language=en-US&append_to_response=credits,videos,recommendations`
  );
  const movie = formatApiResponseMovie(response.data);
  return movie;
};

export const fetchData = async (
  id: string,
  type: string,
  genre?: string,
  page = 1
): Promise<CardProps[]> => {
  try {
    let response: any;
    switch (id) {
      case "popular":
        response = await getPopular(type);
        break;
      case "topRated":
        response = await getTopRated(type);
        break;
      case "upcoming":
        response = await getUpcoming(type);
        break;
      case "lastest":
        response = await getLastest(type);
        break;
      case "genre":
        response = await getMoviesByGenre(type, genre, page.toString());
        break;
      default:
        response = [];
        break;
    }
    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getEpisodeBySeason = async (
  type: string,
  id: string,
  season: string
): Promise<any> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/${type}/${id}/season/${season}?api_key=${apiKey}&language=en-US`
  );
  const episode = response.data.episodes;
  return episode;
};

export const getResultByKeyword = async (
  keyword: string,
  page: string
): Promise<MovieSearchResponse> => {
  const response = await axios.get<MovieSearchResponse>(
    `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${keyword}&page=${page}`
  );
  return response.data;
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
    return { requestToken };
    //await requestAccessToken(requestToken);
  } catch (error) {
    console.error(error);
  }
};

// With an approved request token, generate a access token

export const getAccessToken = async (requestToken: string) => {
  const config: AxiosRequestConfig = {
    url: "https://api.themoviedb.org/4/auth/access_token",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${rat}`,
    },
    data: JSON.stringify({ request_token: requestToken }),
  };
  try {
    const response = await axios(config);

    return response.data;
  } catch (error) {
    console.error("error: " + error);
  }
};

//create list
export const createList = async (accessToken: string) => {
  try {
    const data = {
      name: "My List",
      iso_639_1: "en",
    };

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json;charset=utf-8",
      },
    };

    const response = await axios.post(
      "https://api.themoviedb.org/4/list",
      data,
      config
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//get all list

export const getAllList = async (accountid: string, accessToken: string) => {
  return axios({
    url: `https://api.themoviedb.org/4/account/${accountid}/lists?page=1`,
    method: "GET",
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => {
      return response.data.results;
    })
    .catch((error) => {
      console.error(error);
    });
};

// get list by Id
export const getListById = async (listId: number, accessToken: string) => {
  const settings = {
    url: `https://api.themoviedb.org/4/list/${listId}?page=1&api_key=${apiKey}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return axios(settings)
    .then((response) => {
      if (response.data.results) {
        return response.data;
      } else {
        console.log("The list does not exist or is empty");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

// add an item to the list

export const addItem = async (
  listId: number,
  accessToken: string,
  data: Data
) => {
  const config = {
    headers: {
      "content-type": "application/json;charset=utf-8",
      authorization: `Bearer ${accessToken}`,
    },
  };

  axios
    .post(`https://api.themoviedb.org/4/list/${listId}/items`, data, config)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteItem = async (
  listId: number,
  accessToken: string,
  data: Data
) => {
  try {
    const response = await axios({
      method: "DELETE",
      url: `https://api.themoviedb.org/4/list/${listId}/items`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json;charset=utf-8",
      },
      data: data,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
