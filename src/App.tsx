import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import { CssBaseline, Container, Box, Typography, Fab } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Wizard from "./pages/form/Wizard";
import Chatbot from "./components/Chatbot";

import banner from "./assets/InnerBannerLightBG.jpg";
import SubmissionSuccess from "./pages/form/SubmissionSuccess";
import Dashboard from "./pages/Dashboard";
import ApplicationTracker from "./pages/ApplicationTracker";
import Footer from "./components/Footer";
import { useTranslation } from "react-i18next";

const App: React.FC = () => {
  const { t } = useTranslation();
  const [isChatbotOpen, setChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setChatbotOpen(!isChatbotOpen);
  };

  React.useEffect(() => {
    document.title = `${t("brand")} - ${t("applyNow")}`;
  }, [t]);

  return (
    <BrowserRouter>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <CssBaseline />
        <NavBar />
        <Box
          sx={{
            backgroundImage: `url(${banner})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            minHeight: { xs: "250px", sm: "350px", md: "450px" },
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
              px: { xs: 2, sm: 3 },
              color: "#FFFFFF",
              fontSize: { xs: "32px", sm: "48px", md: "64px" },
              fontFamily: `CircularStd, Noto Kufi Arabic`,
              lineHeight: 1.2,
            }}
          >
            {t("mainBanner")}
          </Typography>
        </Box>
        <Container
          sx={{ py: { xs: 2, sm: 3 }, px: { xs: 2, sm: 3 }, flexGrow: 1 }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apply" element={<Wizard />} />
            <Route path="/submitted" element={<SubmissionSuccess />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/application/:id" element={<ApplicationTracker />} />
          </Routes>
        </Container>
        <Footer />
        <Fab
          color="primary"
          aria-label="chat"
          sx={{
            position: "fixed",
            bottom: { xs: 16, sm: 20 },
            right: { xs: 16, sm: 20 },
            width: { xs: 48, sm: 56 },
            height: { xs: 48, sm: 56 },
          }}
          onClick={toggleChatbot}
        >
          <ChatIcon fontSize={isChatbotOpen ? "small" : "medium"} />
        </Fab>
        {isChatbotOpen && <Chatbot onClose={toggleChatbot} />}
      </Box>
    </BrowserRouter>
  );
};

export default App;
