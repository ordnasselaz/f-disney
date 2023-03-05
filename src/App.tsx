import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Carusel } from "./componets/Carusel";
import { Navbar } from './componets/Navbar';
function Home() {
  return (
    <>
      <Navbar />
      <Carusel id='popular'/>
      <Carusel id='topRated' />
    </>
  );
}

export default Home;
