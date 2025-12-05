import { createTheme } from "@mui/material/styles";

// TAMM-inspired theme with RTL support
export const getTheme = (dir: "ltr" | "rtl") =>
  createTheme({
    direction: dir,
    palette: {
      primary: {
        main: "#169F9F", // TAMM official teal (from --uil-button-primary-default)
        dark: "#238281", // TAMM primary active state
        light: "#0eecda", // TAMM primary hover state
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#12121b", // TAMM neutral/dark
        dark: "#12121b",
        light: "#282931",
      },
      success: {
        main: "#2B8432",
        light: "#E8F5E9",
      },
      warning: {
        main: "#ED6C02",
        light: "#FFF4E5",
      },
      error: {
        main: "#D32F2F",
        light: "#FFEBEE",
      },
      info: {
        main: "#169F9F", // Use TAMM primary for info
        light: "#E6F2FF",
      },
      text: {
        primary: "#12121b", // TAMM dark text
        secondary: "#74747f", // TAMM disabled/secondary text
      },
      background: {
        default: "#FFFFFF",
        paper: "#FFFFFF",
      },
      divider: "#d0d0d1", // TAMM disabled border color
    },
    typography: {
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        "sans-serif",
      ].join(","),
      h1: {
        fontWeight: 700,
        letterSpacing: "-0.02em",
      },
      h2: {
        fontWeight: 700,
        letterSpacing: "-0.01em",
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
      button: {
        fontWeight: 500,
        textTransform: "none",
        letterSpacing: "0.02em",
      },
      body1: {
        fontSize: "1rem",
        lineHeight: 1.6,
      },
      body2: {
        fontSize: "0.875rem",
        lineHeight: 1.5,
      },
    },
    shape: {
      borderRadius: 8,
    },
    shadows: [
      "none",
      "0 1px 3px rgba(0,0,0,0.08)",
      "0 2px 6px rgba(0,0,0,0.08)",
      "0 4px 12px rgba(0,0,0,0.1)",
      "0 8px 24px rgba(0,0,0,0.12)",
      "0 12px 32px rgba(0,0,0,0.14)",
      "0 16px 40px rgba(0,0,0,0.16)",
      "0 1px 3px rgba(0,0,0,0.08)",
      "0 2px 6px rgba(0,0,0,0.08)",
      "0 4px 12px rgba(0,0,0,0.1)",
      "0 8px 24px rgba(0,0,0,0.12)",
      "0 12px 32px rgba(0,0,0,0.14)",
      "0 16px 40px rgba(0,0,0,0.16)",
      "0 1px 3px rgba(0,0,0,0.08)",
      "0 2px 6px rgba(0,0,0,0.08)",
      "0 4px 12px rgba(0,0,0,0.1)",
      "0 8px 24px rgba(0,0,0,0.12)",
      "0 12px 32px rgba(0,0,0,0.14)",
      "0 16px 40px rgba(0,0,0,0.16)",
      "0 1px 3px rgba(0,0,0,0.08)",
      "0 2px 6px rgba(0,0,0,0.08)",
      "0 4px 12px rgba(0,0,0,0.1)",
      "0 8px 24px rgba(0,0,0,0.12)",
      "0 12px 32px rgba(0,0,0,0.14)",
      "0 16px 40px rgba(0,0,0,0.16)",
    ],
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 160, // TAMM uses very rounded buttons (--uil-button-border-radius: 160px)
            padding: "0 32px", // TAMM button padding
            fontSize: "0.938rem",
            minHeight: "48px", // TAMM small button height
            boxShadow: "none",
            transition: "all 0.2s ease",
            borderWidth: "1.6px",
            "&:hover": {
              boxShadow: "0 2px 8px rgba(22,159,159,0.2)",
              transform: "translateY(-1px)",
            },
            "&:active": {
              transform: "translateY(0)",
            },
          },
          contained: {
            color: "#FFFFFF", // White text for default state
            "&:hover": {
              backgroundColor: "#0eecda", // TAMM primary hover (bright cyan)
              color: "#12121b", // Dark text on bright background for contrast
              boxShadow: "0 4px 12px rgba(14,236,218,0.3)",
            },
            "&:active": {
              backgroundColor: "#238281", // TAMM primary active (darker teal)
              color: "#FFFFFF", // White text on darker background
            },
          },
          outlined: {
            borderWidth: "1.6px",
            color: "#169F9F", // TAMM primary color for outlined buttons
            "&:hover": {
              borderWidth: "1.6px",
              backgroundColor: "#169F9F", // TAMM secondary hover
              color: "#FFFFFF", // White text on hover
              borderColor: "#169F9F",
            },
            "&:active": {
              backgroundColor: "#238281",
              color: "#FFFFFF", // White text on active
              borderColor: "#238281",
            },
          },
          text: {
            color: "#169F9F", // TAMM primary for text buttons
            "&:hover": {
              backgroundColor: "rgba(22,159,159,0.08)",
              color: "#169F9F", // Keep primary color on hover
            },
          },
          sizeSmall: {
            padding: "0 24px",
            fontSize: "0.813rem",
            minHeight: "48px",
          },
          sizeMedium: {
            padding: "0 32px",
            fontSize: "0.938rem",
            minHeight: "64px",
          },
          sizeLarge: {
            padding: "0 32px",
            fontSize: "1rem",
            minHeight: "80px",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            transition: "all 0.3s ease",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
          elevation1: {
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          },
          elevation2: {
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          },
          elevation3: {
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 8,
              transition: "all 0.2s ease",
              "&:hover": {
                "& > fieldset": {
                  borderColor: "#169F9F", // TAMM primary
                  borderWidth: "1.5px",
                },
              },
              "&.Mui-focused": {
                boxShadow: "0 0 0 3px rgba(22,159,159,0.1)", // TAMM primary with opacity
                "& > fieldset": {
                  borderWidth: "2px",
                },
              },
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            fontWeight: 500,
            fontSize: "0.813rem",
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: 4,
            height: 8,
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          },
        },
      },
    },
  });
