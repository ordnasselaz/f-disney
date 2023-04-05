import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Login } from "../pages/login/Login";
import { Movie } from "../pages/movie";
import { Movies } from "../pages/movies";
import { Watchlist } from "../pages/watchlist";
import { Search } from "../pages/search";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <App />,
  },
  {
    path: "/:movies",
    element: <Movies />,
  },
  {
    path: "/:series",
    element: <Movies />,
  },
  {
    path: "/tv",
    element: <></>, //<Series />
  },
  {
    path: "/:type/:id",
    element: <Movie />,
  },
  {
    path: "/watchlist",
    element: <Watchlist />,
  },
  {
    path: "/originals",
    //modified home
    element: <></>, //<Originals />
  },
  {
    path: "/search",
    element: <Search />,
  },
  /*
    {
        path: "/legal",
        element: <></> //<Legal />
    } 
    */
]);
