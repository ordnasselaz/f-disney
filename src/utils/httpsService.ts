import axios from "axios";
import { CardProps } from "../componets/backdrop/Backdrop";
import { apiKey, ReadAccessToken as Rat } from "./apiKey";

//1. https://cnbl-cdn.bamgrid.com/assets/f0834f757a81319046466cafc7ba44d1c46857bf5a5bd08bfd05932abcc030bb/original
//2. https://cnbl-cdn.bamgrid.com/assets/32b0ecfa931584aec59229423b84ec9c717208e807eab356a2aba63dbd2cc308/original


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
    const photos = formatApiResponse(response.data.results);
    return photos;
  };

  