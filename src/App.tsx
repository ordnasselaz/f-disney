import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Navbar } from "./componets/Navbar";
import { RootState } from ".";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAccessToken, getAllList } from "./utils/httpsService";
import {
  clearListId,
  setAuthentication,
  setListId,
} from "./utils/redux/action";
import { Box } from "@mui/material";
import { Container } from "./styles";
import { Carousel } from "./componets/Carusel";

function Home() {
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
        //gestire la risposta
        getAllList(account_id, access_token).then((response) => {
          if (response[0] && response[0].id) {
            dispatch(setListId(response[0].id));
          } else {
            dispatch(clearListId(null));
          }
        });
        // note that get all list may need to be run even if you don't run get access token
      });
    }
  }, []);
  return (
    <Container>
      <Navbar />
      <Box sx={{ margin: 10 }}>
        <Carousel id="topRated" type="tv" />
        <Carousel id="popular" type="movie" />
        <Carousel id="topRated" type="movie" />
        <Carousel id="action" type="movie" />
      </Box>
    </Container>
  );
}

export default Home;
