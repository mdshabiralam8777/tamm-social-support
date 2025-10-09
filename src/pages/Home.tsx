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
import { Link as RouterLink, useNavigate } from "react-router-dom";
import services from "../assets/mock/services.json";

type Category = {
  ID: string;
  Title: string;
  Description: string;
  DefaultIcon: string;
};

const categories: Category[] = services;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [comingOpen, setComingOpen] = useState(false);
  const [selected, setSelected] = useState<Category | null>(null);

  const handleOpen = (cat: Category) => {
    if (cat.Title === "Social Support") {
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
          Apply for assistance with a simple, guided form.
        </Typography>
      </Box>

      <Box textAlign="left" sx={{ mb: 2 }}>
        <Typography variant="h4">List of Services</Typography>
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
                    alt=""
                    sx={{ width: 36, height: 36 }}
                  />
                  <Typography
                    variant="h6"
                    sx={{ lineHeight: 1.25, fontWeight: 600 }}
                  >
                    {c.Title}
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
                  {c.Description}
                </Typography>
              </CardContent>

              <CardActions sx={{ p: 2, pt: 0 }}>
                {c.Title === "Social Support" ? (
                  <Button
                    component={RouterLink}
                    to="/apply"
                    variant="contained"
                    fullWidth
                  >
                    Open
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => handleOpen(c)}
                  >
                    Open
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Common dialog */}
      <Dialog
        open={comingOpen}
        onClose={() => setComingOpen(false)}
        aria-labelledby="coming-soon-title"
      >
        <DialogTitle id="coming-soon-title">Coming soon</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 1.5 }}>
            {selected?.Title} is not available yet. We’re working hard to bring
            this service online.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            In the meantime, you can explore other services or apply for Social
            Support.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setComingOpen(false)}>Close</Button>
          <Button
            variant="contained"
            onClick={() => {
              setComingOpen(false);
              navigate("/apply");
            }}
          >
            Apply for Social Support
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Home;
