import { Box, TextField, debounce } from "@mui/material";
import { useEffect, useState } from "react";
import { getResultByKeyword } from "../../utils/httpsService";
import { Backdrop, CardProps } from "../../componets/Backdrop";
import { CardWrapper } from "../watchlist/styles";
import { Navbar } from "../../componets/Navbar";

export const Search: React.FC = ({}) => {
  const [searchField, setSearchField] = useState("");
  const [result, setResult] = useState<any[]>();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchField) {
        getResultByKeyword(searchField)
          .then((response) => setResult(response.results))
          .catch((error) => console.error(error));
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchField]);

  const onSearchChange = (event: any) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };
  console.log(result);
  debounce(() => onSearchChange, 100);
  return (
    <Box>
      <Navbar></Navbar>
      <Box sx={{ marginTop: "6%" }}>
        <Box sx={{ backgroundColor: "#31343e" }}>
          <TextField
            color="info"
            fullWidth={true}
            label="Search by title"
            value={searchField}
            onChange={onSearchChange}
            InputLabelProps={{ style: { color: "white" } }}
          />
        </Box>
        <CardWrapper>
          {result &&
            result.map((movie: CardProps) => (
              <Box key={movie.id} sx={{ width: "250px", margin: "10px" }}>
                <Backdrop {...movie} type={movie.media_type} />
              </Box>
            ))}
        </CardWrapper>
      </Box>
    </Box>
  );
};
