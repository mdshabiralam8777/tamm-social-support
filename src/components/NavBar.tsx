import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"; // ✨ ADDED: The "hamburger" icon
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitch from "./LanguageSwitch";
import logo from "../assets/svgs/tamm-log.svg";

const NavBar: React.FC = () => {
  const { t } = useTranslation();

  // ✨ ADDED: State to manage the mobile menu's visibility
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
        }}
      >
        <RouterLink to="/">
          <Box
            component="img"
            src={logo}
            alt={t("brand")}
            sx={{ height: 36, width: "auto", display: "block" }}
          />
        </RouterLink>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 2,
          }}
        >
          <Button component={RouterLink} to="/" color="inherit">
            {t("home")}
          </Button>
          <LanguageSwitch />
        </Box>

        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="navigation menu"
            onClick={handleMenuOpen}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            MenuListProps={{ "aria-labelledby": "basic-button" }}
          >
            <MenuItem component={RouterLink} to="/" onClick={handleMenuClose}>
              {t("home")}
            </MenuItem>
            <MenuItem>
              <LanguageSwitch />
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
