import { Autocomplete, Box, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import { Backdrop, CardProps } from "../../componets/Backdrop";
import { Navbar } from "../../componets/Navbar";
import { genres } from "../../utils/genres";
import { fetchData } from "../../utils/httpsService";
import { Main, BackdropContainer } from "./styles";

export const Movies: React.FC = () => {
  const [selectedGenre, setSelectedGenre] = useState("Action");
  const [list, setList] = useState<Array<CardProps>>([]);
  const { movies } = useParams<{ movies: string }>();
  const type = movies === "movies" ? "movie" : "tv";
  const [page, setPage] = useState<number>(1);

  const handleGenreSelect = (value: string | null) => {
    if (value !== null) {
      console.log(value);
      setSelectedGenre(value);
      setList([]);
      setPage(1);
    }
  };

  useEffect(() => {
    if (selectedGenre) {
      const genre = genres.find((genre) => genre.name === selectedGenre);
      console.log("genre.name", genre?.name);
      if (genre) {
        fetchData("genre", type, genre.id, page)
          .then((response) => {
            setList(list.concat(response));
          })
          .catch((error) => console.error(error));
      }
    }
  }, [page, selectedGenre]);

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
          renderInput={(params) => <TextField {...params} label="Movie" />}
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
