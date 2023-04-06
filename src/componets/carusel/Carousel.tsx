import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchData } from "../../utils/httpsService";
import { CardProps, Backdrop } from "../Backdrop";
import { settings, StyledSlide, Text } from "./styles";
import { movieGenres, tvGenres } from "../../utils/genres";
import { Box } from "@mui/material";

type CaruselProps = {
  id?: string;
  list?: Array<CardProps>;
  type?: string;
  genre?: string;
};

export const Carousel: React.FC<CaruselProps> = ({
  id,
  list: initialList,
  type = "",
  genre,
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

  const filteredList = list.filter(
    (item) => item.backdrop_path && item.backdrop_path !== ""
  );

  return (
    <Box sx={{ paddingTop: "2%" }}>
      <Text>{genre ? genre : id}</Text>
      <StyledSlide>
        <Slider {...settings}>
          {filteredList.map((movie: CardProps) => (
            <Backdrop key={movie.id} {...movie} type={type} />
          ))}
        </Slider>
      </StyledSlide>
    </Box>
  );
};
