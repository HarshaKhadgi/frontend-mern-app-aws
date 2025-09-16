import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppState from "./context/AppState.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppState>
      <App />
    </AppState>
  </StrictMode>
);
