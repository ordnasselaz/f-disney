import { AppBar, Typography } from "@mui/material";
import { StyledFullToolbar, StyledNavbar } from "./styles";
import logo from "../../utils/img/logo.jpeg";
import { StyledLink } from "../../styles";

export const Navbar: React.FC = () => {
  return (
    <StyledNavbar sx={{ flexGrow: 1 }}>
      <AppBar>
        <StyledFullToolbar >
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
          <Typography variant="h6" component="div">
            LIST
          </Typography>
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
      </AppBar>
    </StyledNavbar>
  );
};
