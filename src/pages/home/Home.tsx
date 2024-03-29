import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Navbar } from "../../componets/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAccessToken, getAllList } from "../../utils/httpsService";
import {
  clearListId,
  setAuthentication,
  setListId,
} from "../../utils/redux/action";
import {
  Container,
  StyledFooter,
  StyledMain,
  StyledNavbar,
  StyledPopularCarousel,
} from "./styles";
import { Carousel } from "../../componets/Carousel";
import { RootState } from "../../utils/redux/store";
import { Footer } from "../../componets/Footer";

export const Home: React.FC = () => {
  const requestToken: string = useSelector(
    (state: RootState) => state.login.request_token
  );
  const accessToken: string | "" = useSelector(
    (state: RootState) => state.login.auth.access_token
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (accessToken === "") {
      getAccessToken(requestToken).then((response) => {
        const { account_id, access_token } = response;
        const authData = { account_id, access_token };
        dispatch(setAuthentication(authData));
        getAllList(account_id, access_token).then((response) => {
          if (response[0] && response[0].id) {
            dispatch(setListId(response[0].id));
          } else {
            dispatch(clearListId(null));
          }
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Container>
        <StyledNavbar>
          <Navbar />
        </StyledNavbar>
        <StyledPopularCarousel>
          <Carousel id="popular" type="movie" settingsCarusel />
        </StyledPopularCarousel>
        <StyledMain>
          <Carousel id="genre" genre="Action & Adventure" type="tv" />
          <Carousel id="genre" genre="Crime" type="movie" />
          <Carousel id="topRated" type="movie" />
          <Carousel id="topRated" type="tv" />
          <Carousel id="genre" genre="Animation" type="tv" />
          <Carousel id="genre" genre="Drama" type="tv" />
        </StyledMain>
      </Container>
      <StyledFooter>
        <Footer></Footer>
      </StyledFooter>
    </>
  );
};
