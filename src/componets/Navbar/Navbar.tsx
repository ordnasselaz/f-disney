import { Typography, useMediaQuery } from "@mui/material";
import { StyledFullToolbar, StyledLink, StyledAppBar } from "./styles";
import logo from "../../utils/img/logo.jpeg";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import LocalMoviesRoundedIcon from "@mui/icons-material/LocalMoviesRounded";
import LiveTvRoundedIcon from "@mui/icons-material/LiveTvRounded";
export const Navbar: React.FC = () => {
  const isSmallerThan600 = useMediaQuery("(max-width:600px)");

  return (
    <StyledAppBar>
      <StyledFullToolbar>
        <StyledLink to={`/home`}>
          <img src={logo} alt="logo"></img>
        </StyledLink>
        <StyledLink to={`/home`}>
          {isSmallerThan600 ? (
            <HomeRoundedIcon />
          ) : (
            <Typography variant="h6" component="div">
              HOME
            </Typography>
          )}
        </StyledLink>
        <StyledLink to={`/Search`}>
          {isSmallerThan600 ? (
            <SearchRoundedIcon />
          ) : (
            <Typography variant="h6" component="div">
              SEARCH
            </Typography>
          )}
        </StyledLink>
        <StyledLink to={`/watchlist`}>
          {isSmallerThan600 ? (
            <AddRoundedIcon />
          ) : (
            <Typography variant="h6" component="div">
              LIST
            </Typography>
          )}
        </StyledLink>
        <StyledLink to={`/movies`}>
          {isSmallerThan600 ? (
            <LocalMoviesRoundedIcon />
          ) : (
            <Typography variant="h6" component="div">
              MOVIE
            </Typography>
          )}
        </StyledLink>
        <StyledLink to={`/series`}>
          {isSmallerThan600 ? (
            <LiveTvRoundedIcon />
          ) : (
            <Typography variant="h6" component="div">
              SERIE
            </Typography>
          )}
        </StyledLink>
      </StyledFullToolbar>
    </StyledAppBar>
  );
};
