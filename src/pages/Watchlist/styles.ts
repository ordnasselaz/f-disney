import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Container = styled("div")`
  display: flex;
`;

export const MainWrapper = styled("div")`
  margin-top: 5%;
`;

export const StyledMain = styled(Box)`
  margin-top: 6%;
`;

export const CardListContainer = styled(Box)`
  margin-top: 3%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1%;
`;

export const CardContainer = styled(Box)`
  max-width: 230px;
  margin-top: 2%;
  @media (max-width: 600px) {
    margin-top: 5%;
  }
`;

export const StyledTypograpy = styled(Typography)`
  color: white;
  font-size: 20px;
  margin: 2% 2%;
  @media (max-width: 900px) {
    margin-top: 5%;
  }
  @media (max-width: 600px) {
    margin-top: 15%;
  }
`;
