import { useEffect, useState } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { getPopular } from "../../utils/httpsService";
import { CardProps, Backdrop } from "../Backdrop";
import { settings, StyledCarusel } from "./styles"

export const Carusel: React.FC = () => {
  const [list, setList] = useState<Array<CardProps>>([]);

  useEffect(() => {
    getPopular().then((photo: any[]) => {
      setList(photo);
    });
  }, []);

  return (
    <StyledCarusel id="carusel">
      <Slider {...settings} >      
        {list.map((film) => (
          <Backdrop
            key={film.id}
            id={film.id}
            backdropPath={film.backdropPath}
            originalTitle={film.originalTitle}
          />
        ))}
      </Slider>
    </StyledCarusel>
  );
};