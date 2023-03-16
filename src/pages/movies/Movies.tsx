import { Box, Button, CardContent, Collapse, IconButton } from "@mui/material";
import { IconButtonProps } from "@mui/material/IconButton";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../../componets/Navbar";
import {
  addItem,
  ApiResponseMovie,
  createList,
  getMovieDetails,
  data,
} from "../../utils/httpsService";
import {
  Action,
  BackgroundImage,
  CardContentDetails,
  Control,
  Overview,
  PlayButton,
  Text,
  Title,
} from "./styles";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import { Carusel } from "../../componets/Carusel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../..";
import { setListId } from "../../utils/redux/action";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const Movies: React.FC = () => {
  const dispatch = useDispatch();
  const [movieDetails, setMovieDetails] = useState(false);
  const [recommended, setRecommended] = useState(false);
  const [details, setDetails] = useState<ApiResponseMovie | undefined>(
    undefined
  );
  const { id = "", type = "" } = useParams();
  const movieId = parseInt(id);
  console.log(type);

  const accessToken: string = useSelector(
    (state: RootState) => state.login.auth.access_token ?? ""
  );

  let listId: number = useSelector(
    (state: RootState) => state.login.list_id ?? null
  );

  const handleExpandDetailsClick = () => {
    if (recommended) {
      setRecommended(!recommended);
    }
    setMovieDetails(!movieDetails);
  };

  const handleExpandRecommended = () => {
    if (movieDetails) {
      setMovieDetails(!movieDetails);
    }
    setRecommended(!recommended);
  };
  const handleAddItem = () => {
    const data: data = {
      items: [{ media_type: "movie", media_id: movieId }],
    };
    console.log(listId);
    if (listId === null) {
      createList(accessToken).then((response) => {
        console.log(response.id); // log per capire se la creazione è andata a buon fine
        dispatch(setListId(response.id));
        console.log(listId);
        addItem(response.id, accessToken, data);
      });
    } else {
      addItem(listId, accessToken, data);
    }
  };
  useEffect(() => {
    setMovieDetails(false);
    setRecommended(false);
    getMovieDetails(movieId, type)
      .then((response) => setDetails(response))
      .catch((error) => console.error(error));
    // è corretto?
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  const {
    title,
    overview,
    adult,
    backdrop_path,
    runtime,
    release_date,
    genres,
    directorName,
    castNames,
    recommendations,
  } = details || {};
  return (
    <>
      <BackgroundImage
        sx={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${backdrop_path})`,
        }}
      ></BackgroundImage>
      <Navbar></Navbar>
      <CardContent>
        <Title>{title}</Title>
        <Control>
          <PlayButton startIcon={<PlayArrowRounded />}>Play</PlayButton>
          <PlayButton>Trailer</PlayButton>
          <Button
            onClick={handleAddItem}
            startIcon={
              <AddCircleOutlineRoundedIcon sx={{ color: "#f9f9f9" }} />
            }
          ></Button>
        </Control>
        <Overview>
          <Text>{overview}</Text>
        </Overview>
      </CardContent>
      <Action>
        <ExpandMore
          expand={recommended}
          onClick={handleExpandRecommended}
          aria-expanded={recommended}
          aria-label="show more"
        >
          <Text>Recommended</Text>
        </ExpandMore>
        <ExpandMore
          expand={movieDetails}
          onClick={handleExpandDetailsClick}
          aria-expanded={movieDetails}
          aria-label="show more"
        >
          <Text>Details</Text>
        </ExpandMore>
      </Action>
      <Collapse in={recommended} timeout="auto" unmountOnExit>
        <CardContent>
          <Carusel list={recommendations?.results} type={type}></Carusel>
        </CardContent>
      </Collapse>
      <Collapse in={movieDetails} timeout="auto" unmountOnExit>
        <CardContentDetails>
          <Box>
            <Text>{title}</Text>
            <Text>{overview}</Text>
          </Box>
          <Box>
            <Text>Duration:</Text>
            <Text>{runtime}</Text>
            <Text>Realse Date:</Text>
            <Text>{release_date}</Text>
            <Text>Genre:</Text>
            <Text>{genres?.map((genre) => genre).join(", ")}</Text>
            <Text>Classification:</Text>
            <Text>{adult ? "18+" : "16+"}</Text>
            <Text>Director:</Text>
            <Text>{directorName}</Text>
            <Text>Cast:</Text>
            <Text>{castNames ? castNames.join(", ") : ""}</Text>
          </Box>
        </CardContentDetails>
      </Collapse>
    </>
  );
};
