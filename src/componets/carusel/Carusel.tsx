import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchData } from "../../utils/httpsService";
import { CardProps, Backdrop } from "../Backdrop";
import { Typography } from "@mui/material";
import { settings } from "./styles";

type CaruselProps = {
  id?: string;
  list?: Array<CardProps>;
};

export const Carusel: React.FC<CaruselProps> = ({
  id = "",
  list: initialList,
}) => {
  const [list, setList] = useState<Array<CardProps>>([]);

  useEffect(() => {
    if (initialList && initialList.length > 0) {
      setList(initialList);
    } else if (id) {
      fetchData(id)
        .then((response) => setList(response))
        .catch((error) => console.error(error));
    }
    // è corretto?
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredList = list.filter(
    (item) => item.backdrop_path && item.backdrop_path !== ""
  );

  return (
    <>
      <Typography>{id}</Typography>
      <Slider {...settings}>
        {filteredList.map((movie: CardProps) => (
          <Backdrop key={movie.id} {...movie} />
        ))}
      </Slider>
    </>
  );
};
