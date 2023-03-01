import { AppBar, Box, CardMedia, Modal, Typography } from "@mui/material";
import Button from "@mui/material/Button/Button";
import React, { useState } from "react";
import { getRequestToken } from "../../utils/httpsService";
import { StyledLogin, StyledToolbar } from "./styles";
const background1 = require("../../utils/img/loginBackground1.jpeg");
const background2 = require("../../utils/img/loginBackground2.jpeg")


type AuthUrlResponse = {
  authUrl: string;
};

export const Login: React.FC = () => {
  const [authUrl, setAuthUrl] = useState<AuthUrlResponse | undefined>(
    undefined
  );
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogin = async () => {
    try {
      const result = await getRequestToken();
      setAuthUrl(result);
      handleOpen();
    } catch (error) {
      console.error(error);
    }
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <StyledLogin>
      <AppBar position="fixed">
        <StyledToolbar>
          <Button variant="contained" onClick={handleLogin}>
            Accedi
          </Button>
        </StyledToolbar>
      </AppBar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {authUrl ? (
              <a href={authUrl.authUrl}>Click here to authorize</a>
            ) : null}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            To continue you must authorize the app to access TMDB
          </Typography>
        </Box>
      </Modal>
      <CardMedia
        component="img"
        image={background1}
        alt="Background1"
      />
      <CardMedia
        component="img"
        image={background2}
        alt="Background2"
      />
    </StyledLogin>
  );
};

/*
<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{style}}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {authUrl ? (
              <a href={authUrl.authUrl}>Click here to authorize</a>
            ) : null}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            To continue you must authorize the app to access TMDB
          </Typography>
        </Box>
      </Modal>
*/
