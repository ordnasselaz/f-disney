import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../..";
import { Backdrop, CardProps } from "../../componets/Backdrop";
import { Navbar } from "../../componets/Navbar";
import { getListById } from "../../utils/httpsService";
import { Container, ContentWrapper, NavbarWrapper } from "./styles";

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
    getListById(listId, accessToken).then((response) => {
      const { name, results } = response;
      const filteredResults = (results as CardProps[]).map((item) => ({
        id: item.id,
        backdrop_path: item.backdrop_path,
        title: item.title,
      }));
      setList({ name, results: filteredResults });
    });
  }, []);
  return (
    <Container>
      <NavbarWrapper>
        <Navbar />
      </NavbarWrapper>
      <ContentWrapper>
        <Typography>{list.name}</Typography>
        {list.results.map((movie: CardProps) => (
          <Box sx={{width: 200}}>
            <Backdrop key={movie.id} {...movie} />
          </Box>
        ))}
      </ContentWrapper>
    </Container>
  );
};
