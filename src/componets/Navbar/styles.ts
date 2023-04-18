import { AppBar, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const StyledTypography = styled(Typography)`
  display: flex;
  align-items: center;
  gap: 5%;
  &:hover {
    border-bottom: 2px solid white;
  }
`;

export const StyledAppBar = styled(AppBar)`
  display: flex;
  background-color: #040714;
  gap: 2%;
`;

export const StyledFullToolbar = styled(Toolbar)`
  display: flex;
  background-color: #040714;
  gap: 2%;
`;

export const StyledResponsiveToolbar = styled(Toolbar)`
  display: flex;
  background-color: #040714;
  gap: 2%;
  @media (min-width: 600px) {
  }
`;
