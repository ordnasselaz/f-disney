import { Box } from "@mui/material";
import styled from "styled-components";

export const Container = styled(Box)`
  background-color: rgb(26, 29, 41);
  display: grid;
  grid-template-columns: 0.2fr 1fr 1fr;
  grid-template-rows: 0.2fr 1fr 1fr;
  gap: 10px;
  grid-template-areas:
    "StyledNavbar StyledNavbar StyledNavbar"
    "StyledMain StyledMain StyledMain"
    "StyledMain StyledMain StyledMain"
    "StyledMain StyledMain StyledMain"
    "StyledMain StyledMain StyledMain";
`;

export const StyledMain = styled(Box)`
  grid-area: StyledMain;
  margin-left: 5%;
  gap: 10px 10px;
`;

export const StyledNavbar = styled(Box)`
  grid-area: StyledNavbar;
`;
