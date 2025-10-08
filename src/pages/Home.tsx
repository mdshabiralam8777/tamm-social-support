import React from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <Container sx={{ py: 6 }}>
      <Grid container spacing={3}>
        <Grid sx={{ xs: 12 }}>
          <Box textAlign="center" sx={{ mb: 2 }}>
            <Typography variant="h4">Welcome to TAMM Social Support</Typography>
            <Typography color="text.secondary">
              Apply for assistance with a simple, guided form.
            </Typography>
          </Box>
        </Grid>

        <Grid sx={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Social Support</Typography>
              <Typography color="text.secondary">
                Start your application
              </Typography>
            </CardContent>
            <CardActions>
              <Button component={RouterLink} to="/apply" variant="contained">
                Open
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
