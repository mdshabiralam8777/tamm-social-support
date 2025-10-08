// import React, {
//   createContext,
//   useContext,
//   useMemo,
//   useState,
//   useEffect,
//   Suspense,
// } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { CssBaseline, Snackbar, Alert } from "@mui/material";
// import { ThemeProvider } from "@mui/material/styles";
// import { CacheProvider } from "@emotion/react";
// import createCache from "@emotion/cache";
// import { prefixer } from "stylis";
// import rtlPlugin from "stylis-plugin-rtl";

// import { getTheme } from "./theme";
// import i18n from "./i18n";

// import NavBar from "./components/NavBar";
// import Home from "./pages/Home";
// import Wizard from "./pages/form/Wizard";

// interface AppCtx {
//   dir: "ltr" | "rtl";
//   lang: "en" | "ar";
//   setLang: (l: "en" | "ar") => void;
//   notify: (
//     msg: string,
//     severity?: "success" | "info" | "warning" | "error"
//   ) => void;
// }

// const Ctx = createContext<AppCtx | null>(null);
// export const useApp = () => {
//   const ctx = useContext(Ctx);
//   if (!ctx) throw new Error("useApp must be inside AppProvider");
//   return ctx;
// };

// const mkEmotionCache = (dir: "ltr" | "rtl") =>
//   createCache({
//     key: dir === "rtl" ? "mui-rtl" : "mui",
//     stylisPlugins: dir === "rtl" ? [prefixer, rtlPlugin] : [prefixer],
//     prepend: true,
//   });

// export const AppProvider: React.FC<React.PropsWithChildren> = ({
//   children,
// }) => {
//   const [lang, setLang] = useState<"en" | "ar">(
//     i18n.language?.startsWith("ar") ? "ar" : "en"
//   );
//   const dir: "ltr" | "rtl" = lang === "ar" ? "rtl" : "ltr";
//   const theme = useMemo(() => getTheme(dir), [dir]);
//   const cache = useMemo(() => mkEmotionCache(dir), [dir]);

//   useEffect(() => {
//     i18n.changeLanguage(lang);
//     document.documentElement.lang = lang;
//     document.documentElement.dir = dir;
//   }, [lang, dir]);

//   const [snack, setSnack] = useState({
//     open: false,
//     msg: "",
//     severity: "success" as "success" | "info" | "warning" | "error",
//   });

//   const notify = (
//     msg: string,
//     severity: "success" | "info" | "warning" | "error" = "success"
//   ) => setSnack({ open: true, msg, severity });

//   return (
//     <Ctx.Provider value={{ dir, lang, setLang, notify }}>
//       <CacheProvider value={cache}>
//         <ThemeProvider theme={theme}>
//           <CssBaseline />
//           {children}
//           <Snackbar
//             open={snack.open}
//             autoHideDuration={2500}
//             onClose={() => setSnack((s) => ({ ...s, open: false }))}
//           >
//             <Alert severity={snack.severity} variant="filled">
//               {snack.msg}
//             </Alert>
//           </Snackbar>
//         </ThemeProvider>
//       </CacheProvider>
//     </Ctx.Provider>
//   );
// };

// function AppShell() {
//   return (
//     <>
//       <NavBar />
//       <Suspense fallback={<div style={{ padding: 24 }}>Loading…</div>}>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/social-support" element={<Wizard />} />
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </Suspense>
//     </>
//   );
// }

// export default function App() {
//   return (
//     <AppProvider>
//       <AppShell />
//     </AppProvider>
//   );
// }

import React from "react";
import { CssBaseline, Container } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Wizard from "./pages/form/Wizard";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <NavBar />
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
