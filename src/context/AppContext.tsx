import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { ThemeProvider } from "@mui/material/styles";
import { getTheme } from "../theme";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { Snackbar, Alert } from "@mui/material";
import i18n from "../i18n";

interface AppCtx {
  dir: "ltr" | "rtl";
  lang: "en" | "ar";
  setLang: (l: "en" | "ar") => void;
  notify: (
    msg: string,
    severity?: "success" | "info" | "warning" | "error"
  ) => void;
}

const Ctx = createContext<AppCtx | null>(null);
export const useApp = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be inside AppProvider");
  return ctx;
};

const mkEmotionCache = (dir: "ltr" | "rtl") =>
  createCache({
    key: dir === "rtl" ? "mui-rtl" : "mui",
    stylisPlugins: dir === "rtl" ? [prefixer, rtlPlugin] : [prefixer],
  });

export const AppProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [lang, setLang] = useState<"en" | "ar">(
    i18n.language?.startsWith("ar") ? "ar" : "en"
  );
  const dir: "ltr" | "rtl" = lang === "ar" ? "rtl" : "ltr";
  const theme = useMemo(() => getTheme(dir), [dir]);
  const cache = useMemo(() => mkEmotionCache(dir), [dir]);

  useEffect(() => {
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const [snack, setSnack] = useState({
    open: false,
    msg: "",
    severity: "success" as any,
  });
  const notify = (
    msg: string,
    severity: "success" | "info" | "warning" | "error" = "success"
  ) => setSnack({ open: true, msg, severity });

  return (
    <Ctx.Provider value={{ dir, lang, setLang, notify }}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          {children}
          <Snackbar
            open={snack.open}
            autoHideDuration={2500}
            onClose={() => setSnack((s) => ({ ...s, open: false }))}
          >
            <Alert severity={snack.severity} variant="filled">
              {snack.msg}
            </Alert>
          </Snackbar>
        </ThemeProvider>
      </CacheProvider>
    </Ctx.Provider>
  );
};
