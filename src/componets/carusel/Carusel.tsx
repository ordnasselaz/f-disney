import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchData } from "../../utils/httpsService";
import { CardProps, Backdrop } from "../Backdrop";
import { settings, } from "./styles";
import { Typography } from "@mui/material";

type CaruselProps = {
  id: string;
};

export const Carusel: React.FC<CaruselProps> = ({ id }) => {
  const [list, setList] = useState<Array<CardProps>>([]);

  useEffect(() => {
    fetchData(id)
      .then((response) => setList(response))
      .catch((error) => console.error(error));
  // è corretto?
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
        <Typography>{id}</Typography>
        <Slider {...settings}>
          {list.map((movie) => (
            <Backdrop key={movie.id} {...movie} />
          ))}
        </Slider>
    </>
  );
};
