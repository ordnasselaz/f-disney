import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Backdrop } from "../../componets/Backdrop";
import { Navbar } from "../../componets/Navbar";
import { getListById } from "../../utils/httpsService";
import { CardProps } from "../../utils/types";
import {
  CardContainer,
  CardListContainer,
  Container,
  MainWrapper,
  StyledTypograpy,
} from "./styles";
import { RootState } from "../../utils/redux/store";
import { Footer } from "../../componets/Footer";

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
          title: item.title || item.name,
          type: item.media_type,
        }));
        setList({ name, results: filteredResults });
      });
    } else {
      console.log(listId);
    }
  }, []);
  return (
    <>
      <Container>
        <Navbar />
        <MainWrapper>
          <StyledTypograpy>{list.name}</StyledTypograpy>
          <CardListContainer>
            {list.results.map((movie: CardProps) => (
              <CardContainer
                key={movie.id}
                sx={{ width: "250px", margin: "10px" }}
              >
                <Backdrop {...movie} type={movie.type} />
              </CardContainer>
            ))}
          </CardListContainer>
        </MainWrapper>
      </Container>
      <Footer></Footer>
    </>
  );
};
