import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  Button,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import services from "../assets/mock/services.json";

type Category = {
  ID: string;
  titleKey: string;
  descriptionKey: string;
  DefaultIcon: string;
};

const categories: Category[] = services;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [comingOpen, setComingOpen] = useState(false);
  const [selected, setSelected] = useState<Category | null>(null);

  const handleOpen = (cat: Category) => {
    if (cat.ID === "social-support") {
      navigate("/apply");
    } else {
      setSelected(cat);
      setComingOpen(true);
    }
  };

  return (
    <Container sx={{ py: 6 }}>
      <Box textAlign="center" sx={{ mb: "100px" }}>
        <Typography
          variant="h4"
          color="text.secondary"
          fontFamily={`CircularStd, Noto Kufi Arabic`}
        >
          {t("homeHeader")}
        </Typography>
      </Box>

      <Box textAlign="left" sx={{ mb: 2 }}>
        <Typography variant="h4">{t("servicesList")}</Typography>
      </Box>

      <Grid container spacing={3} alignItems="stretch">
        {categories.map((c) => (
          <Grid
            key={c.ID}
            sx={{
              flexBasis: { xs: "100%", sm: "50%", md: "23%" },
              maxWidth: { xs: "100%", sm: "50%", md: "23%" },
              display: "flex",
            }}
          >
            <Card
              onClick={() => handleOpen(c)}
              sx={{
                bgcolor: "background.paper",
                borderRadius: { xs: 2, sm: 3 },
                border: "1px solid",
                borderColor: "divider",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: { xs: "auto", sm: 200 },
                width: "100%",
                cursor: "pointer",
                transition: (theme) =>
                  theme.transitions.create(
                    ["box-shadow", "transform", "border-color"],
                    { duration: theme.transitions.duration.short }
                  ),
                "&:hover": {
                  boxShadow: (theme) => theme.shadows[6],
                  transform: {
                    xs: "scale(1.01)",
                    sm: "translateY(-6px) scale(1.01)",
                  },
                  borderColor: "primary.light",
                },
              }}
            >
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: { xs: "row", sm: "column" },
                  alignItems: { xs: "flex-start", sm: "center" },
                  textAlign: { xs: "left", sm: "center" },
                  p: { xs: 2, sm: 3 },
                  gap: { xs: 2, sm: 0 },
                }}
              >
                {/* Icon */}
                <Box
                  component="img"
                  src={c.DefaultIcon}
                  alt={t(c.titleKey)}
                  sx={{
                    width: { xs: 48, sm: 56 },
                    height: { xs: 48, sm: 56 },
                    mb: { xs: 0, sm: 2 },
                    flexShrink: 0,
                  }}
                />

                {/* Text content wrapper for mobile */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                  }}
                >
                  {/* Title */}
                  <Typography
                    variant="h6"
                    sx={{
                      lineHeight: 1.3,
                      fontWeight: 600,
                      mb: { xs: 0.5, sm: 1.5 },
                      fontSize: { xs: "1rem", sm: "1.25rem" },
                    }}
                  >
                    {t(c.titleKey)}
                  </Typography>

                  {/* Description */}
                  <Typography
                    color="text.secondary"
                    sx={{
                      fontSize: { xs: 13, sm: 14 },
                      lineHeight: 1.6,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: { xs: 2, sm: 3 },
                      whiteSpace: "normal",
                    }}
                  >
                    {t(c.descriptionKey)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={comingOpen}
        onClose={() => setComingOpen(false)}
        aria-labelledby="coming-soon-title"
      >
        <DialogTitle id="coming-soon-title">{t("comingSoon")}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 1.5 }}>
            {t("comingSoonMsg", { serviceName: t(selected?.titleKey || "") })}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("comingSoonSubMsg", {
              defaultValue:
                "In the meantime, you can explore other services or apply for Social Support.",
            })}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setComingOpen(false)}>{t("close")}</Button>
          <Button
            variant="contained"
            onClick={() => {
              setComingOpen(false);
              navigate("/apply");
            }}
          >
            {t("applyNow")}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Home;
