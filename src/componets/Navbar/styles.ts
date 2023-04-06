import { AppBar, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const StyledAppBar = styled(AppBar)``;

export const StyledFullToolbar = styled(Toolbar)`
  display: flex;
  background-color: #040714;
  gap: 2%;
`;
