import axios, { AxiosRequestConfig } from "axios";
import { CardProps } from "../componets/Backdrop/Backdrop";
import { apiKey, ReadAccessToken as rat } from "./apiKey";

type ApiResponseHome = {
  id: number;
  originalTitle: string;
  backdropPath: string;
};

const formatApiResponse = (response: ApiResponseHome[]): CardProps[] => {
  return response.map((result: any) => ({
    id: result.id,
    originalTitle: result.title,
    backdropPath: `https://image.tmdb.org/t/p/original${result.backdrop_path}`,
  }));
};

export const getPopular = async (): Promise<CardProps[]> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
  );
  const movie = formatApiResponse(response.data.results);
  return movie;
};

export const getTopRated = async (): Promise<CardProps[]> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`
  );
  const movie = formatApiResponse(response.data.results);
  return movie;
};

export const apiCalls: {
  [key: string]: () => Promise<CardProps[]>;
} = {
  popular: getPopular,
  topRated: getTopRated,
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
