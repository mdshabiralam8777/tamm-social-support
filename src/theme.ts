import { createTheme } from "@mui/material/styles";

export const getTheme = (dir: "ltr" | "rtl") =>
  createTheme({
    direction: dir,
    palette: {
      primary: { main: "#0062FF" },
      secondary: { main: "#00A3AD" },
    },
    shape: { borderRadius: 12 },
    components: {
      MuiButton: { styleOverrides: { root: { textTransform: "none" } } },
    },
  });
