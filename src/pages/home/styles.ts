import { Box } from "@mui/material";
import styled from "styled-components";

export const Container = styled(Box)`
  background-color: rgb(26, 29, 41);
  display: grid;
  grid-template-columns: 0.2fr 1fr 1fr;
  grid-template-rows: 0.1fr 0.1fr 0.1fr;
  grid-template-areas:
    "StyledNavbar StyledNavbar StyledNavbar"
    "StyledPopularCarousel StyledPopularCarousel StyledPopularCarousel"
    "StyledMain StyledMain StyledMain"
    "StyledFooter StyledFooter StyledFooter";
`;

export const StyledMain = styled(Box)`
  grid-area: StyledMain;
  margin-left: 5%;
  gap: 10px 10px;
`;

export const StyledNavbar = styled(Box)`
  grid-area: StyledNavbar;
`;

export const StyledPopularCarousel = styled(Box)`
  grid-area: StyledPopularCarousel;
`;

export const StyledFooter = styled(Box)`
  grid-area: StyledFooter;
`;
