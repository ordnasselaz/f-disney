import { AppBar, Typography } from "@mui/material";
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
        <Typography variant="h6" component="div">
          SEARCH
        </Typography>
        <StyledLink to={`/watchlist`}>
          <Typography variant="h6" component="div">
            LIST
          </Typography>
        </StyledLink>
        <Typography variant="h6" component="div">
          ORIGINALS
        </Typography>
        <Typography variant="h6" component="div">
          FILM
        </Typography>
        <Typography variant="h6" component="div">
          SERIE
        </Typography>
      </StyledFullToolbar>
    </StyledAppBar>
  );
};
