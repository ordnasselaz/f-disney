import { useMediaQuery } from "@mui/material";
import {
  StyledFullToolbar,
  StyledLink,
  StyledAppBar,
  StyledTypography,
} from "./styles";
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
            <StyledTypography variant="h6">
              <HomeRoundedIcon /> HOME
            </StyledTypography>
          )}
        </StyledLink>
        <StyledLink to={`/Search`}>
          {isSmallerThan600 ? (
            <SearchRoundedIcon />
          ) : (
            <StyledTypography variant="h6">
              <SearchRoundedIcon /> SEARCH
            </StyledTypography>
          )}
        </StyledLink>
        <StyledLink to={`/watchlist`}>
          {isSmallerThan600 ? (
            <AddRoundedIcon />
          ) : (
            <StyledTypography variant="h6">
              <AddRoundedIcon /> LIST
            </StyledTypography>
          )}
        </StyledLink>
        <StyledLink to={`/movies`}>
          {isSmallerThan600 ? (
            <LocalMoviesRoundedIcon />
          ) : (
            <StyledTypography variant="h6">
              <LocalMoviesRoundedIcon /> MOVIE
            </StyledTypography>
          )}
        </StyledLink>
        <StyledLink to={`/series`}>
          {isSmallerThan600 ? (
            <LiveTvRoundedIcon />
          ) : (
            <StyledTypography variant="h6">
              <LiveTvRoundedIcon /> SERIE
            </StyledTypography>
          )}
        </StyledLink>
      </StyledFullToolbar>
    </StyledAppBar>
  );
};
