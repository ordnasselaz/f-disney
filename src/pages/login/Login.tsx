import { AppBar, Box, CardMedia, Link, Modal, Typography } from "@mui/material";
import Button from "@mui/material/Button/Button";
import React, { useState } from "react";
import { getRequestToken } from "../../utils/httpsService";
import { StyledLogin, StyledToolbar } from "./styles";
import background1 from "../../utils/img/loginBackground1.jpeg";
import background2 from "../../utils/img/loginBackground2.jpeg";
import { useDispatch } from "react-redux";
import { setRequestToken } from "../../utils/redux/action";

export const Login: React.FC = () => {
  const [authUrl, setAuthUrl] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const result = await getRequestToken();
      if (result && result.requestToken) {
        const authUrl = `https://www.themoviedb.org/auth/access?request_token=${result?.requestToken}`;
        dispatch(setRequestToken(result?.requestToken));
        setAuthUrl(authUrl);
        handleOpen();
      } else {
        setAuthUrl("Incorrect Request Token");
      }
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
    bgcolor: "rgb(48, 49, 53)",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "4px",
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
              <Link underline="none" href={authUrl} sx={{ color: "black" }}>
                Click here to authorize
              </Link>
            ) : null}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            To continue you must authorize the app to access TMDB
          </Typography>
        </Box>
      </Modal>
      <CardMedia component="img" image={background1} alt="Background1" />
      <CardMedia component="img" image={background2} alt="Background2" />
    </StyledLogin>
  );
};
