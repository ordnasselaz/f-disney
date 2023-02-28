import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Carusel } from "./componets/Carusel";
import { Card } from "./componets/Card";

function Home() {
  return (
    <>
      <Carusel />
      <Card name="Alessandro" color='green' />
      <Card name="Simone" color='aliceblue' />
    </>
  );
}

export default Home;
