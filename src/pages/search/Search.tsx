import { Box, TextField, debounce } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { getResultByKeyword } from "../../utils/httpsService";
import { Backdrop, CardProps } from "../../componets/Backdrop";
import { CardWrapper } from "../watchlist/styles";
import { Navbar } from "../../componets/Navbar";
import {
  CardContainer,
  CardListContainer,
  StyledMain,
  StyledTextField,
} from "./styles";

export const Search: React.FC = ({}) => {
  const [searchField, setSearchField] = useState("");
  const [result, setResult] = useState<any[]>();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchField) {
        getResultByKeyword(searchField, page.toString())
          .then((response) => {
            if (response.page === 1) {
              setResult(response.results);
            } else if (result) {
              setResult(result.concat(response.results));
            }
          })
          .catch((error) => console.error(error));
      } else {
        setResult(undefined);
        setPage(1);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchField, page]);

  const onSearchChange = (event: any) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  const filteredResult = result?.filter(
    (movie) =>
      (movie.media_type === "movie" && movie.overview !== "") ||
      (movie.media_type === "tv" && movie.overview !== "")
  );

  console.log(page);
  //debounce(() => onSearchChange, 100);
  return (
    <Box>
      <Navbar></Navbar>
      <StyledMain>
        <StyledTextField>
          <TextField
            color="info"
            fullWidth={true}
            label="Search by title"
            value={searchField}
            onChange={onSearchChange}
            InputLabelProps={{ style: { color: "white" } }}
          />
        </StyledTextField>
        {filteredResult && (
          <InfiniteScroll
            dataLength={filteredResult.length}
            next={() => {
              setPage(page + 1);
            }}
            hasMore={true}
            loader={<h4>Loading...</h4>}
          >
            <CardListContainer>
              {filteredResult.map((movie: CardProps) => (
                <CardContainer>
                  <Backdrop key={movie.id} {...movie} type={movie.media_type} />
                </CardContainer>
              ))}{" "}
            </CardListContainer>
          </InfiniteScroll>
        )}
      </StyledMain>
    </Box>
  );
};
