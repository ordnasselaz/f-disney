import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchData } from "../../utils/httpsService";
import { Backdrop } from "../backdrop";
import { settings, Text, settings1 } from "./styles";
import { movieGenres, tvGenres } from "../../utils/genres";
import { CardProps } from "../../utils/types";

type CaruselProps = {
  id?: string;
  list?: Array<CardProps>;
  type?: string;
  genre?: string;
  settingsCarusel?: boolean;
};

function getTitle(type: string, id?: string): string {
  switch (type) {
    case "movie":
      switch (id) {
        case "popular":
          return "Popular movie";
        case "topRated":
          return "Top rated movie";
        default:
          return "";
      }
    case "tv":
      switch (id) {
        case "popular":
          return "Popular TV show";
        case "topRated":
          return "Top rated TV show";
        default:
          return "";
      }
    default:
      return "";
  }
}

export const Carousel: React.FC<CaruselProps> = ({
  id,
  list: initialList,
  type = "",
  genre,
  settingsCarusel,
}) => {
  const [list, setList] = useState<Array<CardProps>>([]);
  useEffect(() => {
    if (initialList && initialList.length > 0) {
      setList(initialList);
    } else if (genre) {
      const genres = type === "movie" ? movieGenres : tvGenres;
      let gen = genres.find((gen) => gen.name === genre);
      if (gen) {
        fetchData("genre", type, gen.id)
          .then((response) => {
            setList(response);
          })
          .catch((error) => console.error(error));
      }
    } else if (id) {
      fetchData(id, type)
        .then((response) => setList(response))
        .catch((error) => console.error(error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const dimension = settingsCarusel ? settings1 : settings;
  const filteredList = list.filter(
    (item) => item.backdrop_path && item.backdrop_path !== ""
  );
  return (
    <>
      <Text sx={{ color: "white", fontWeight: "bold" }}>
        {genre ? `${genre} ${type}` : getTitle(type, id)}
      </Text>
      <Slider {...dimension}>
        {filteredList.map((movie: CardProps) => (
          <Backdrop key={movie.id} {...movie} type={type} />
        ))}
      </Slider>
    </>
  );
};
