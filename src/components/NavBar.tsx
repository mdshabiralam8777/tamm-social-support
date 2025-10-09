import React from "react";
import { AppBar, Toolbar, Box, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import LanguageSwitch from "./LanguageSwitch";
import logo from "../assets/svgs/tamm-log.svg";

const NavBar: React.FC = () => {
  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={1}
      sx={{ backdropFilter: "blur(6px)" }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="TAMM"
          sx={{
            height: 36,
            width: "auto",
            cursor: "pointer",
          }}
          onClick={() => (window.location.href = "/")}
        />

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
          <LanguageSwitch />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
