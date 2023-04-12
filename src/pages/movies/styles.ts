import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const Main = styled(Box)`
  margin-top: 5%;
`;

export const BackdropContainer = styled(Box)`
  margin-top: 3%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: space-around;
  gap: 1%;
`;

export const StyledMain = styled(Box)`
  margin-top: 6%;
`;

export const CardContainer = styled(Box)`
  max-width: 230px;
  margin-top: 2%;
  @media (max-width: 600px) {
    margin-top: 5%;
  }
`;

export const StyledAutocomplete = styled(Box)`
  margin-top: 5%;
  @media (max-width: 900px) {
    margin-top: 10%;
    display: flex;
    justify-content: center;
  }
  @media (max-width: 600px) {
    margin-top: 20%;
  }
`;
