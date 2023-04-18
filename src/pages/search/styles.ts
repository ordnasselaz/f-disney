import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledMain = styled(Box)`
  margin-top: 6%;
  min-height: 70vh;
`;

export const CardListContainer = styled(Box)`
  margin-top: 3%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: space-around;
  gap: 1%;
`;

export const CardContainer = styled(Box)`
  max-width: 230px;
  margin-top: 2%;
  @media (max-width: 600px) {
    margin-top: 5%;
  }
`;

export const StyledTextField = styled(Box)`
  background-color: #31343e;
  margin-top: 5%;
  @media (max-width: 900px) {
    margin-top: 10%;
  }
  @media (max-width: 600px) {
    margin-top: 20%;
  }
`;
