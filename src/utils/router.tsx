import { createBrowserRouter } from "react-router-dom";  
import App from "../Home";
import { Login } from "../pages/login/Login";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/home",
        element: <></> //<Home />
    },
    {
        path: "/movies",
        element: <></> //<Movies />
    },
    {
        path: "/movies/:movieId",
        element: <></> //<Movie />
    },
    {
        path: "/series",
        element: <></> //<Series />
    },
    {
        path: "/serie/:serieId",
        element: <></> //<Serie />
    },
    {
        path: "/watchlist",
        element: <></> //<Watchlist />
    },
    {
        path: "/originals",
        //modified home
        element: <></> //<Originals />
    },
    {
        path: "/search",
        element: <></> //<Search />
    },
    /*
    {
        path: "/legal",
        element: <></> //<Legal />
    } 
    */
   {
    path: "/test",
    element: <App/>
   }
])