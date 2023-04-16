import {
  Box,
  Button,
  CardContent,
  CardProps,
  Collapse,
  FormControlLabel,
  IconButton,
  Switch,
  Tooltip,
} from "@mui/material";
import { IconButtonProps } from "@mui/material/IconButton";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../../componets/Navbar";
import { Backdrop } from "../../componets/Backdrop";
import { ApiResponseMovie, Data, Episodes } from "../../utils/types";
import {
  addItem,
  createList,
  getMovieDetails,
  getListById,
  getEpisodeBySeason,
  deleteItem,
} from "../../utils/httpsService";

import {
  Action,
  AddButton,
  BackgroundImage,
  CardContentDetails,
  Control,
  StyledOverview,
  PlayButton,
  StyledCollapse,
  StyledEpisodesList,
  StyledMain,
  StyledSeasonsList,
  Text,
  Text2,
  Title,
} from "./styles";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import { useDispatch, useSelector } from "react-redux";
import { clearListId, setListId } from "../../utils/redux/action";
import { Carousel } from "../../componets/Carousel";
import { RootState } from "../../utils/redux/store";

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

export const Movie: React.FC = () => {
  const dispatch = useDispatch();
  const [collapseOverview, setCollapseOverview] = useState(false);
  const [movieDetails, setMovieDetails] = useState(false);
  const [recommended, setRecommended] = useState(false);
  const [episodes, setEpisodes] = useState(false);
  const [details, setDetails] = useState<ApiResponseMovie | undefined>(
    undefined
  );
  const [season, setSeason] = useState<string>("");
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
  const handleAddItem = () => {
    const data: Data = {
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

  const handleRemoveItem = () => {
    const data: Data = {
      items: [{ media_type: type, media_id: movieId }],
    };
    deleteItem(listId, accessToken, data);
    setListed(false);
  };

  const handleEpisodeBySeason = (type: string, id: string, season: number) => {
    getEpisodeBySeason(type, id, season.toString()).then((response) => {
      setEpisodesList(response);
      setSeason(season.toString());
    });
  };

  const handleCollapseOverview = () => {
    setCollapseOverview(!collapseOverview);
  };

  useEffect(() => {
    setMovieDetails(false);
    setRecommended(false);
    setEpisodesList([]);
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
  console.log(overview?.length);
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
      <StyledMain>
        <Title>{title}</Title>
        <Control>
          <PlayButton startIcon={<PlayArrowRounded />}>Play</PlayButton>
          <PlayButton>Trailer</PlayButton>
          <Tooltip
            title={!listed ? "Add to My List" : "Remove from My List"}
            placement="top"
          >
            <AddButton
              onClick={!listed ? handleAddItem : handleRemoveItem}
              startIcon={
                listed ? (
                  <CheckCircleOutlineRoundedIcon
                    fontSize="large"
                    sx={{ color: "#f9f9f9", fontSize: 400 }}
                  />
                ) : (
                  <AddCircleOutlineRoundedIcon
                    sx={{ color: "#f9f9f9", fontSize: 400 }}
                  />
                )
              }
            />
          </Tooltip>
        </Control>
        {overview && overview.length <= 200 ? (
          <StyledOverview>
            <Text>{overview}</Text>
          </StyledOverview>
        ) : (
          <StyledOverview>
            <Collapse collapsedSize={"70px"} in={collapseOverview}>
              <Text>{overview}</Text>
            </Collapse>
            {!collapseOverview && (
              <Text>
                <Button onClick={handleCollapseOverview} color="inherit">
                  ...
                </Button>
              </Text>
            )}
          </StyledOverview>
        )}
      </StyledMain>
      <Box sx={{ backgroundColor: "rgb(26, 29, 41)" }}>
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
                <StyledSeasonsList>
                  {seasons.map((season) => (
                    <Button
                      variant="outlined"
                      onClick={() => {
                        handleEpisodeBySeason(type, id, season.season_number);
                      }}
                      key={season.id}
                    >
                      {season.name}
                    </Button>
                  ))}
                </StyledSeasonsList>
                <Text>{season !== undefined ? "season " + season : ""}</Text>
                <StyledEpisodesList>
                  {episodesList.map((episode: Episodes) => (
                    <Backdrop
                      backdrop_path={episode.still_path}
                      title={episode.name}
                    ></Backdrop>
                  ))}
                </StyledEpisodesList>
              </Box>
            ) : (
              <Box>There are no episodes for this TV series</Box>
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
            <Box sx={{ width: "50%", padding: "2%" }}>
              <Text2>{title}</Text2>
              <Text>{overview}</Text>
            </Box>
            <Box sx={{ width: "50%", padding: "2%" }}>
              {type === "movie" && (
                <>
                  <Text2>Duration:</Text2>
                  <Text>{runtime}</Text>
                </>
              )}
              <Text2>Realse Date:</Text2>
              <Text>{release_date}</Text>
              <Text2>Genre:</Text2>
              <Text>{genres?.map((genre) => genre).join(", ")}</Text>
              <Text2>Classification:</Text2>
              <Text>{adult ? "18+" : "16+"}</Text>
              <Text2>Director:</Text2>
              <Text>{directorName}</Text>
              <Text2>Cast:</Text2>
              <Text>{castNames ? castNames.join(", ") : ""}</Text>
            </Box>
          </CardContentDetails>
        </StyledCollapse>
      </Box>
    </>
  );
};
