import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./i18n";
import { AppProvider } from "./context/AppContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <React.Suspense fallback="Loading...">
        <App />
      </React.Suspense>
    </AppProvider>
  </React.StrictMode>
);
