import { Typography } from "@mui/material";
import { StyledFullToolbar, StyledLink, StyledAppBar } from "./styles";
import logo from "../../utils/img/logo.jpeg";

export const Navbar: React.FC = () => {
  return (
    <StyledAppBar>
      <StyledFullToolbar>
        <StyledLink to={`/home`}>
          <img src={logo} alt="logo"></img>
        </StyledLink>
        <StyledLink to={`/home`}>
          <Typography variant="h6" component="div">
            HOME
          </Typography>
        </StyledLink>
        <StyledLink to={`/search`}>
          <Typography variant="h6" component="div">
            SEARCH
          </Typography>
        </StyledLink>
        <StyledLink to={`/watchlist`}>
          <Typography variant="h6" component="div">
            LIST
          </Typography>
        </StyledLink>
        <Typography variant="h6" component="div">
          ORIGINALS
        </Typography>
        <StyledLink to={`/movies/`}>
          <Typography variant="h6" component="div">
            MOVIE
          </Typography>
        </StyledLink>
        <StyledLink to={`/series/`}>
          <Typography variant="h6" component="div">
            SERIE
          </Typography>
        </StyledLink>
      </StyledFullToolbar>
    </StyledAppBar>
  );
};
