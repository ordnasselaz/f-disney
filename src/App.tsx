import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Carusel } from "./componets/Carusel";
import { Navbar } from "./componets/Navbar";
import { RootState } from ".";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAccessToken, getAllList } from "./utils/httpsService";
import { setAuthentication } from "./utils/redux/action";

function Home() {
  const requestToken: string = useSelector(
    (state: RootState) => state.login.request_token ?? ""
  );
  const dispatch = useDispatch();
  useEffect(() => {
    getAccessToken(requestToken).then((response) => {
      const { account_id, access_token } = response;
      const authData = { account_id, access_token };
      getAllList(account_id, access_token).then((response) => {
        console.log(response);
      })
    
      dispatch(setAuthentication(authData));
      // usa account_id e access_token come necessario
    });
  }, []);

  /*dispatch(setAuthentication()));*/
  return (
    <>
      <Navbar />
      <Carusel id="popular" />
      <Carusel id="topRated" />
      <Carusel id="action" />
    </>
  );
}

export default Home;
