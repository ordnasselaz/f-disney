import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../../utils/httpsService";



export const Movies: React.FC = () => {
    const { id = "" } = useParams();
    const movieId = parseInt(id);
    useEffect(() => {
        getMovieDetails(movieId).then((movieDetails) => {
           
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <>
    </>
}
