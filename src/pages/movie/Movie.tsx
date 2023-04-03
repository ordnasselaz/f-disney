import { Box, Button, CardContent, CardProps, IconButton } from "@mui/material";
import { IconButtonProps } from "@mui/material/IconButton";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../../componets/Navbar";
import { Backdrop } from "../../componets/Backdrop";
import {
  addItem,
  ApiResponseMovie,
  createList,
  getMovieDetails,
  data,
  getListById,
  getEpisodeBySeason,
} from "../../utils/httpsService";
import {
  Action,
  AddButton,
  BackgroundImage,
  CardContentDetails,
  Control,
  Overview,
  PlayButton,
  StyledCollapse,
  Text,
  Title,
} from "./styles";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../..";
import { clearListId, setListId } from "../../utils/redux/action";
import { Carousel } from "../../componets/Carusel";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

type Season = Episodes[];

type Episodes = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
};

export const Movie: React.FC = () => {
  const dispatch = useDispatch();
  const [movieDetails, setMovieDetails] = useState(false);
  const [recommended, setRecommended] = useState(false);
  const [episodes, setEpisodes] = useState(false);
  const [details, setDetails] = useState<ApiResponseMovie | undefined>(
    undefined
  );
  const [episodesList, setEpisodesList] = useState<Array<Episodes>>([]);
  const { id = "", type = "" } = useParams();
  const movieId = parseInt(id);
  const [list, setList] = useState<Array<{ id: number; media_type: string }>>(
    []
  );
  const [listed, setListed] = useState(false);

  const accessToken: string = useSelector(
    (state: RootState) => state.login.auth.access_token
  );

  let listId: number = useSelector((state: RootState) => state.login.list_id);

  function handleButtonClick(buttonName: string) {
    if (buttonName === "movieDetails") {
      setMovieDetails(true);
      setRecommended(false);
      setEpisodes(false);
    } else if (buttonName === "recommended") {
      setMovieDetails(false);
      setRecommended(true);
      setEpisodes(false);
    } else if (buttonName === "episodes") {
      setMovieDetails(false);
      setRecommended(false);
      setEpisodes(true);
    }
  }
  /*
  const handleExpandEpisodes = () => {
    if (episodes) {
      if (recommended) {
        setRecommended(!recommended);
      } else if (movieDetails) {
        setMovieDetails(!movieDetails);
      }
    }
    setEpisodes(!episodes);
  };

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
*/
  const handleAddItem = () => {
    const data: data = {
      items: [{ media_type: type, media_id: movieId }],
    };
    if (listId === null) {
      createList(accessToken).then((response) => {
        dispatch(setListId(response.id));
        addItem(response.id, accessToken, data);
        setListed(true);
      });
    } else {
      addItem(listId, accessToken, data);
      setListed(true);
    }
  };

  const handleEpisodeBySeason = (type: string, id: string, season: number) => {
    getEpisodeBySeason(type, id, season.toString()).then((response) => {
      setEpisodesList(response);
    });
  };

  useEffect(() => {
    setMovieDetails(false);
    setRecommended(false);
    getMovieDetails(movieId, type)
      .then((response) => setDetails(response))
      .catch((error) => console.error(error));
    if (listId !== null) {
      getListById(listId, accessToken)
        .then((response) => {
          setList(response.results);
        })
        .catch((error) => console.error(error));
    }
  }, [movieId]);

  useEffect(() => {
    setListed(
      list.some((movie) => movie.id === movieId && movie.media_type === type)
    );
  }, [list, movieId, type]);
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
    seasons,
  } = details || {};
  console.log(seasons);
  return (
    <>
      {backdrop_path && (
        <BackgroundImage
          sx={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${backdrop_path})`,
          }}
        ></BackgroundImage>
      )}
      <Navbar></Navbar>
      <CardContent sx={{ marginTop: "12%" }}>
        <Title>{title}</Title>
        <Control>
          <PlayButton startIcon={<PlayArrowRounded />}>Play</PlayButton>
          <PlayButton>Trailer</PlayButton>
          <AddButton
            onClick={handleAddItem}
            startIcon={
              listed ? (
                <CheckCircleOutlineRoundedIcon
                  sx={{ color: "#f9f9f9", fontSize: "150%" }}
                />
              ) : (
                <AddCircleOutlineRoundedIcon
                  sx={{ color: "#f9f9f9", fontSize: "150%" }}
                />
              )
            }
          ></AddButton>
        </Control>
        <Overview>
          <Text>{overview}</Text>
        </Overview>
      </CardContent>
      <Action>
        {type === "tv" && (
          <ExpandMore
            expand={episodes}
            onClick={() => handleButtonClick("episodes")}
            aria-expanded={episodes}
            aria-label="show more"
          >
            <Text>Episodes</Text>
          </ExpandMore>
        )}
        <ExpandMore
          expand={recommended}
          onClick={() => handleButtonClick("recommended")}
          aria-expanded={recommended}
          aria-label="show more"
        >
          <Text>Recommended</Text>
        </ExpandMore>
        <ExpandMore
          expand={movieDetails}
          onClick={() => handleButtonClick("movieDetails")}
          aria-expanded={movieDetails}
          aria-label="show more"
        >
          <Text>Details</Text>
        </ExpandMore>
      </Action>

      <StyledCollapse in={episodes} timeout="auto" unmountOnExit>
        <CardContent>
          {seasons ? (
            <Box>
              <Box sx={{ width: 500, display: "flex" }}>
                {seasons.map((season) => (
                  <Button
                    onClick={() => {
                      handleEpisodeBySeason(type, id, season.season_number);
                    }}
                    key={season.id}
                  >
                    {season.name}
                  </Button>
                ))}
              </Box>
              <Box sx={{ display: "flex" }}>
                {episodesList.map((episode: Episodes) => (
                  <Backdrop
                    backdrop_path={episode.poster_path}
                    title={episode.name}
                  ></Backdrop>
                ))}
              </Box>
            </Box>
          ) : (
            <Box>Ciaooooooooo</Box>
          )}
        </CardContent>
      </StyledCollapse>

      <StyledCollapse in={recommended} timeout="auto" unmountOnExit>
        <CardContent>
          <Carousel list={recommendations?.results} type={type}></Carousel>
        </CardContent>
      </StyledCollapse>
      <StyledCollapse in={movieDetails} timeout="auto" unmountOnExit>
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
      </StyledCollapse>
    </>
  );
};
