import { Link as RouterLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  CardActions,
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
              sx={{
                bgcolor: "grey.50",
                borderRadius: 3,
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: 200,
                width: "100%",
                transition: "transform 0.2s ease",
                "&:hover": { transform: "translateY(-4px)" },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}
                >
                  <Box
                    component="img"
                    src={c.DefaultIcon}
                    alt="image"
                    sx={{ width: 36, height: 36 }}
                  />
                  <Typography
                    variant="h6"
                    sx={{ lineHeight: 1.25, fontWeight: 600 }}
                  >
                    {t(c.titleKey)}
                  </Typography>
                </Box>
                <Typography
                  color="text.secondary"
                  sx={{
                    fontSize: 14,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 4,
                    whiteSpace: "normal",
                  }}
                >
                  {t(c.descriptionKey)}
                </Typography>
              </CardContent>

              <CardActions sx={{ p: 2, pt: 0 }}>
                {c.ID === "social-support" ? (
                  <Button
                    component={RouterLink}
                    to="/apply"
                    variant="contained"
                    fullWidth
                  >
                    {t("open")}
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => handleOpen(c)}
                  >
                    {t("open")}
                  </Button>
                )}
              </CardActions>
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
