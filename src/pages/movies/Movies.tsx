import { Autocomplete, Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import { Backdrop, CardProps } from "../../componets/Backdrop";
import { Navbar } from "../../componets/Navbar";
import { movieGenres, tvGenres } from "../../utils/genres";
import { fetchData } from "../../utils/httpsService";
import { Main, BackdropContainer } from "./styles";
type Genre = {
  id: string;
  name: string;
};
export const Movies: React.FC = () => {
  const [selectedGenre, setSelectedGenre] = useState("Crime");
  const [list, setList] = useState<Array<CardProps>>([]);
  const [page, setPage] = useState<number>(1);
  const { movies } = useParams<{ movies?: string; series?: string }>();
  console.log(movies);
  const type = movies === "movies" ? "movie" : "tv";
  const genres: Genre[] = type === "movie" ? movieGenres : tvGenres;

  const handleGenreSelect = (value: string | null) => {
    if (value !== null) {
      console.log(value);
      setSelectedGenre(value);
      setList([]);
      setPage(1);
    }
  };

  const concatResults = () => {
    const genre = genres.find((genre: Genre) => genre.name === selectedGenre);
    console.log("genre.name", genre?.name);
    if (genre) {
      fetchData("genre", type, genre.id, page)
        .then((response) => {
          setList(list.concat(response));
        })
        .catch((error) => console.error(error));
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
    setPage(1);
    const genre = genres.find((genre: Genre) => genre.name === selectedGenre);
    console.log("genre.name", genre?.name);
    if (genre) {
      fetchData("genre", type, genre.id, page)
        .then((response) => {
          setList(response);
        })
        .catch((error) => console.error(error));
    }
  }, [type, selectedGenre]);
  /*
  useEffect(() => {
    setList([]);
    setSelectedGenre("Crime");
    setPage(1);
    concatResults();
  }, [type]);
  useEffect(() => {
    setList([]);
    setPage(1);
    concatResults();
  }, [selectedGenre]);
  */
  /*
  useEffect(() => {
    if (selectedGenre) {
      const genre = genres.find((genre: Genre) => genre.name === selectedGenre);
      console.log("genre.name", genre?.name);
      if (genre) {
        fetchData("genre", type, genre.id, page)
          .then((response) => {
            setList(list.concat(response));
          })
          .catch((error) => console.error(error));
      }
    }
  }, [page, selectedGenre, movies]);
*/

  /*
  useEffect(() => {
    const genre = genres.find((genre: Genre) => genre.name === selectedGenre);
    console.log("genre.name", genre?.name);
    if (genre) {
      fetchData("genre", type, genre.id, page)
        .then((response) => {
          setList(list.concat(response));
        })
        .catch((error) => console.error(error));
    }
  }, [page]);
*/
  return (
    <>
      <Navbar />
      <Main>
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
          renderInput={(params) => <TextField {...params} label={type} />}
        />
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
              <Box
                key={movie.id}
                sx={{ width: "250px", marginTop: "2%", marginX: "1%" }}
              >
                <Backdrop {...movie} type={type} />
              </Box>
            ))}
          </BackdropContainer>
        </InfiniteScroll>
      </Main>
    </>
  );
};
