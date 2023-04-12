import { styled } from "@mui/material/styles";
import { Box, Typography, Button, CardContent, Collapse } from "@mui/material";

export const BackgroundImage = styled(Box)`
  //background-color: rgb(26, 29, 41);
  /*background: linear-gradient(
    to bottom,
    rgba(26, 29, 41, 1),
    rgba(26, 29, 41, 0.5)
  );*/
  position: fixed;
  height: 100vh;
  top: 8%;
  transition: opacity 200ms ease 0s;
  width: 100%;
  z-index: -1;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export const Control = styled(Box)`
  display: flex;
  align-items: center;
  gap: 2%;
`;

export const PlayButton = styled(Button)`
  width: 15%;
  height: 5%;
  font-size: x-large;
  background: #f9f9f9;
  color: black;
  &:hover {
  }
`;

export const AddButton = styled(Button)`
  color: "#f9f9f9";
`;

export const Text = styled(Typography)`
  color: white;
  font-size: 1.3rem;
  z-index: 2;
  padding: 1%;
`;

export const Title = styled(Typography)`
  margin-top: 25%;
  color: white;
  font-size: 3rem;
`;

export const Action = styled(Box)`
  border-bottom: 2px solid rgba(249, 249, 249, 0.2);
  display: flex;
  margin-bottom: 10px;
  z-index: 2;
  gap: 30px;
  background-color: rgb(26, 29, 41);
`;

export const CardContentDetails = styled(CardContent)`
  display: flex;
`;

export const Overview = styled(Box)`
  width: 50%;
  margin-top: 1%;
  padding-top: 2%;
  padding-bottom: 2%;
  background-color: rgb(26, 29, 41, 0.7);
`;
export const StyledCollapse = styled(Collapse)`
  background-color: rgb(26, 29, 41);
`;
