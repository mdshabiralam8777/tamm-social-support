import React from "react";
import { CssBaseline, Container, Box, Typography } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Wizard from "./pages/form/Wizard";

import banner from "./assets/InnerBannerLightBG.jpg";

const App: React.FC = () => {
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
          Abu Dhabi Government Services
        </Typography>
      </Box>

      <Container sx={{ py: 3 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apply" element={<Wizard />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
