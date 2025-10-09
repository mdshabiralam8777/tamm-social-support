import React from "react";
import { AppBar, Toolbar, Box, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next"; // ✨ ADDED
import LanguageSwitch from "./LanguageSwitch";
import logo from "../assets/svgs/tamm-log.svg";

const NavBar: React.FC = () => {
  const { t } = useTranslation(); // ✨ ADDED

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
        {/* ✨ CHANGED: Wrapped with RouterLink for better SPA navigation */}
        <RouterLink to="/">
          <Box
            component="img"
            src={logo}
            alt={t("brand")} // ✨ CHANGED
            sx={{
              height: 36,
              width: "auto",
              display: "block", // Ensures proper layout within the link
            }}
          />
        </RouterLink>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            component={RouterLink}
            to="/"
            color="inherit"
            aria-label="Go to Home"
          >
            {t("home")} {/* ✨ CHANGED */}
          </Button>
          <Button
            component={RouterLink}
            to="/apply"
            variant="contained"
            aria-label="Start Application"
          >
            {t("applyNow")} {/* ✨ CHANGED */}
          </Button>
          <LanguageSwitch />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
