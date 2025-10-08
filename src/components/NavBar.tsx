import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { Link as RouterLink } from "react-router-dom";
import LanguageSwitch from "./LanguageSwitch";

const NavBar: React.FC = () => {
  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={1}
      sx={{ backdropFilter: "blur(6px)" }}
    >
      <Toolbar sx={{ gap: 2 }}>
        <SupportAgentIcon aria-hidden />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          TAMM Social Support
        </Typography>
        <Button
          component={RouterLink}
          to="/"
          color="inherit"
          aria-label="Go to Home"
        >
          Home
        </Button>
        <Button
          component={RouterLink}
          to="/apply"
          variant="contained"
          aria-label="Start Application"
        >
          Apply
        </Button>
        <Box sx={{ ml: 1 }}>
          <LanguageSwitch />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
