import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { CssBaseline, Container, Box, Typography } from "@mui/material";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Wizard from "./pages/form/Wizard";

import banner from "./assets/InnerBannerLightBG.jpg";
import SubmissionSuccess from "./pages/form/SubmissionSuccess";
import { useTranslation } from "react-i18next";

const App: React.FC = () => {
  const { t } = useTranslation();
  return (
    <BrowserRouter>
      <CssBaseline />
      <NavBar />
      <Box
        sx={{
          backgroundImage: `url(${banner})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          minHeight: "450px",
          width: "100%",
          display: "grid",
          placeItems: "center",
          position: "relative",
        }}
      >
        <Typography
          variant="h3"
          align="center"
          sx={{
            px: 2,
            color: "#FFFFFF",
            fontSize: "64px",
            fontFamily: `CircularStd, Noto Kufi Arabic`,
          }}
        >
          {t("mainBanner")}
        </Typography>
      </Box>
      <Container sx={{ py: 3 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apply" element={<Wizard />} />
          <Route path="/submitted" element={<SubmissionSuccess />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
