import { styled } from "@mui/material/styles";
import { Button, Card, Modal, Toolbar } from "@mui/material";

export const StyledLogin = styled("div")`
  height: 100vh;
  justify-content: space-between;
  align-items: center;
`;
export const StyledCard = styled(Card)`
  display: flex;
`;
export const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: flex-end;
  background-color: #040714;
`;

export const StyledButton = styled(Button)`
  && {
    border: 1px solid white;
    background-color: black;
    color: white;
  }
`;

export const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;

  .MuiBox-root {
    max-width: 60%;
    outline: none;
    border-radius: 8px;
    padding: 16px;
  }
`;
