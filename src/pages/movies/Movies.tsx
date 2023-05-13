import { Autocomplete, Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import { Backdrop } from "../../componets/backdrop";
import { Navbar } from "../../componets/Navbar";
import { movieGenres, tvGenres } from "../../utils/genres";
import { fetchData } from "../../utils/httpsService";
import { CardProps } from "../../utils/types";
import {
  Main,
  BackdropContainer,
  CardContainer,
  StyledAutocomplete,
} from "./styles";
type Genre = {
  id: string;
  name: string;
};
export const Movies: React.FC = () => {
  const firstGenre = "Crime";
  const [selectedGenre, setSelectedGenre] = useState(firstGenre);
  const [list, setList] = useState<Array<CardProps>>([]);
  const [page, setPage] = useState<number>(1);
  const { movies } = useParams<{ movies?: string; series?: string }>();
  const type = movies === "movies" ? "movie" : "tv";
  const genres: Genre[] = type === "movie" ? movieGenres : tvGenres;

  const handleGenreSelect = (value: string | null) => {
    if (value !== null) {
      setSelectedGenre(value);
      setList([]);
      setPage(1);
    }
  };

  useEffect(() => {
    const genre = genres.find((genre: Genre) => genre.name === selectedGenre);
    if (genre) {
      fetchData("genre", type, genre.id, page)
        .then((response) => {
          setList(list.concat(response));
        })
        .catch((error) => console.error(error));
    }
  }, [page]);

  useEffect(() => {
    setSelectedGenre(firstGenre);
    setPage(1);
    setList([]);
    const genre = genres.find((genre: Genre) => genre.name === selectedGenre);
    if (genre) {
      fetchData("genre", type, genre.id, page)
        .then((response) => {
          setList(response);
        })
        .catch((error) => console.error(error));
    }
  }, [type, selectedGenre]);

  console.log(type);
  console.log(list);
  return (
    <>
      <Navbar />
      <Main>
        <StyledAutocomplete>
          {" "}
          <Autocomplete
            disablePortal
            options={genres.map((genre) => genre.name)}
            openText="Open"
            sx={{
              width: 300,
              backgroundColor: "rgba(182, 182, 182, 0.2)",
              borderRadius: "22px",
              marginLeft: "2%",
            }}
            onChange={(event, value) => handleGenreSelect(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label={type === "movie" ? "movie" : "serie"}
                InputLabelProps={{ style: { color: "white" } }}
              />
            )}
          />
        </StyledAutocomplete>
        <InfiniteScroll
          dataLength={list.length}
          next={() => {
            setPage(page + 1);
          }}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          <BackdropContainer>
            {list.map((movie: CardProps) => (
              <CardContainer key={movie.id}>
                <Backdrop {...movie} type={type} />
              </CardContainer>
            ))}
          </BackdropContainer>
        </InfiniteScroll>
      </Main>
    </>
  );
};
