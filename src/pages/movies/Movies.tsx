import {
  Box,
  Button,
  CardContent,
  Collapse,
  IconButton,
} from "@mui/material";
import { IconButtonProps } from "@mui/material/IconButton";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../../componets/Navbar";
import { ApiResponseMovie, getMovieDetails } from "../../utils/httpsService";
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
  const [movieDetails, setMovieDetails] = useState(false);
  const [recommended, setRecommended] = useState(false);

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

  const { id = "" } = useParams();
  const movieId = parseInt(id);
  const [details, setDetails] = useState<ApiResponseMovie | undefined>(
    undefined
  );

  useEffect(() => {
    setMovieDetails(false);
    setRecommended(false);
    getMovieDetails(movieId)
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
          <Carusel list={recommendations?.results}></Carusel>
        </CardContent>
      </Collapse>
      <Collapse in={movieDetails} timeout="auto" unmountOnExit>
        <CardContentDetails>
          <Box>
            <Text>{title}</Text>
            <Text>{overview}</Text>
          </Box>
          <Box>
            <Text>Duration: {runtime}</Text>
            <Text>Realse Date: {release_date}</Text>
            <Text>Genre: {genres?.map((genre) => genre).join(", ")}</Text>
            <Text>Classification: {adult ? "18+" : "16+"}</Text>
            <Text>Director: {directorName}</Text>
            <Text>Cast: {castNames ? castNames.join(", ") : ""}</Text>
          </Box>
        </CardContentDetails>
      </Collapse>
    </>
  );
};
