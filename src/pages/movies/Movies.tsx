import { Autocomplete, Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
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

  const handleGenreSelect = (value: string | null) => {
    if (value !== null) {
      setSelectedGenre(value);
    }
  };
  
  useEffect(() => {
    if (selectedGenre) {
      let genre = genres.find((genre) => genre.name === selectedGenre);
      if (genre) {
        fetchData("genre", "movie", genre.id)
          .then((response) => {
            setList(response);
          })
          .catch((error) => console.error(error));
      }
    }
  }, [selectedGenre]);
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
          }}
          onChange={(event, value) => handleGenreSelect(value)}
          renderInput={(params) => <TextField {...params} label="Movie" />}
        />
        <BackdropContainer>
          {list.map((movie: CardProps) => (
            <Box key={movie.id} sx={{ width: "250px", margin: "10px" }}>
              <Backdrop {...movie} type={type} />
            </Box>
          ))}
        </BackdropContainer>
      </Main>
    </>
  );
};
