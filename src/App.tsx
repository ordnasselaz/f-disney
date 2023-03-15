import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Carusel } from "./componets/Carusel";
import { Navbar } from "./componets/Navbar";
import { RootState } from ".";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAccessToken, getAllList } from "./utils/httpsService";
import { clearListId, setAuthentication, setListId } from "./utils/redux/action";

function Home() {
  const requestToken: string = useSelector(
    (state: RootState) => state.login.request_token ?? ""
  );
  const dispatch = useDispatch();
  useEffect(() => {
    getAccessToken(requestToken).then((response) => {
      const { account_id, access_token } = response;
      const authData = { account_id, access_token };
      dispatch(setAuthentication(authData));
      //gestire la risposta
      getAllList(account_id, access_token).then((response) => {
        if (response[0] && response[0].id) {
          dispatch(setListId(response[0].id));
        }else{
          dispatch(clearListId(null));
        }
      });
      
      // usa account_id e access_token come necessario
    });
  }, []);
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
