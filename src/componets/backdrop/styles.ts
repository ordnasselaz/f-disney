import { Card, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledBackdrop = styled(Card)`
  &:hover {
    border-radius: 4px;
    border: 4px solid white;//rgba(255, 255, 255, 0);
    transition: border 300ms ease-out 0s;
  }
  margin-left: 10%;
  border-radius: 4px;
`;

export const Text = styled(Typography)`
background-color:  #040714;
color: white;
text-align: center;
height: 50px;
`;
