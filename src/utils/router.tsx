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
        path: "/movie",
        element: <></> //<Movies />
    },
    {
        path: "/tv",
        element: <></> //<Series />
    },
    {
        path: "/:type/:id",
        element: <Movies />
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