import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../..";
import { Backdrop, CardProps } from "../../componets/Backdrop";
import { Navbar } from "../../componets/Navbar";
import { getListById } from "../../utils/httpsService";
import { CardWrapper, Container, MainWrapper, NavbarWrapper } from "./styles";

export const Watchlist: React.FC = () => {
  const listId = useSelector((state: RootState) => state.login.list_id);
  const accessToken = useSelector(
    (state: RootState) => state.login.auth.access_token
  );
  const [list, setList] = useState<{ name: string; results: CardProps[] }>({
    name: "",
    results: [],
  });

  useEffect(() => {
    if (listId !== null) {
      getListById(listId, accessToken).then((response) => {
        const { name, results } = response;
        const filteredResults = (results as CardProps[]).map((item) => ({
          id: item.id,
          backdrop_path: item.backdrop_path,
          title: item.title,
          type: item.media_type,
        }));
        setList({ name, results: filteredResults });
      });
    } else {
      console.log(listId);
    }
  }, []);
  return (
    <Container>
      <NavbarWrapper>
        <Navbar />
      </NavbarWrapper>
      <MainWrapper>
        <Typography>{list.name}</Typography>
        <CardWrapper>
          {list.results.map((movie: CardProps) => (
            <Box key={movie.id} sx={{ width: "250px", margin: "10px" }}>
              <Backdrop {...movie} type={movie.type} />
            </Box>
          ))}
        </CardWrapper>
      </MainWrapper>
    </Container>
  );
};
