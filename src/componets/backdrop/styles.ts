import { Card, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledBackdrop = styled(Card)`
  &:hover {
    border-radius: 4px;
    border: 4px solid white;
    transition: border 300ms ease-out 0s;
  }
  margin-left: 10%;
  border-radius: 4px;
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
