import React from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Carusel } from "./componets/carusel/Carusel";

const settings = {
  slidesToShow: 3,
  slidesToScroll: 1,
  infinite: false,
};

function Home() {
  return (
    <Carusel />
  );
}

export default Home;
