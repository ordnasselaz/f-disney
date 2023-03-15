import { createBrowserRouter } from "react-router-dom";  
import App from "../App";
import { Login } from "../pages/login/Login";
import { Movies } from "../pages/movies";
import { Watchlist } from "../pages/Watchlist";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/home",
        element: <App />
    },
    {
        path: "/movies",
        element: <></> //<Movies />
    },
    {
        path: "/movies/:id",
        element: <Movies />
    },
    {
        path: "/series",
        element: <></> //<Series />
    },
    {
        path: "/series/:id",
        element: <></> //<Serie />
    },
    {
        path: "/watchlist",
        element: <Watchlist />
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
])