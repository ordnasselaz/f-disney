import { AppBar, CardMedia } from "@mui/material";
import Button from "@mui/material/Button/Button";
import React from "react";
import { getRequestToken } from "../../utils/httpsService";
import { StyledLogin, StyledToolbar } from "./styles";

export const Login: React.FC = () => {
  
  return (
    <StyledLogin>
      <AppBar position="fixed">
        <StyledToolbar>
          <Button variant="contained" onClick={getRequestToken}>
            Accedi
          </Button>
        </StyledToolbar>
      </AppBar>
      <CardMedia
        component="img"
        image="https://cnbl-cdn.bamgrid.com/assets/f0834f757a81319046466cafc7ba44d1c46857bf5a5bd08bfd05932abcc030bb/original"
        alt="Background1"
      />
      <CardMedia
        component="img"
        image="https://cnbl-cdn.bamgrid.com/assets/32b0ecfa931584aec59229423b84ec9c717208e807eab356a2aba63dbd2cc308/original"
        alt="Background1"
      />
    </StyledLogin>
  );
};
