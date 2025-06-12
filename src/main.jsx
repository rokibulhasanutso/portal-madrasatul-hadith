import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import AuthProvider from "./providers/AuthProvider";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
