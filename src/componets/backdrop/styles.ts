import { Card, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledBackdrop = styled(Card)`
  &:hover {
    padding: 1% 2%;
    transition: padding 500ms ease-out 0s;
  }
  margin: 0% 2%;
  //border-radius: 4px;
`;

export const Text = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #040714;
  color: white;
  height: 50px;
  text-decoration: none;
  padding: 3%;
`;
