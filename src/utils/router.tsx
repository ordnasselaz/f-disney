import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/login/Login";
import { Movie } from "../pages/movie";
import { Movies } from "../pages/movies";
import { Watchlist } from "../pages/watchlist";
import { Search } from "../pages/search";
import { Home } from "../pages/home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
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
