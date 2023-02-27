import { AppBar, Box, Card, Toolbar } from "@mui/material";
import Button from "@mui/material/Button/Button";
import React from "react";

export const Login: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Card>
      <AppBar position="static">
        <Toolbar sx={{display:"flex", justifyContent:"flex-end"}}>
        <Button variant="contained">Iscriviti</Button>
          <Button variant="contained">Accedi</Button>
          
        </Toolbar>
      </AppBar>
      </Card>
    </Box>
  );
};
