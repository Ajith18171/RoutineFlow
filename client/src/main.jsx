import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ScheduleProvider } from "./Context/ScheduleContext";

import "./index.css";
import App from "./App";

import { ThemeProvider } from "./Context/ThemeContext";
import { ToastProvider } from "./Context/ToastContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ToastProvider>
          <ScheduleProvider>
          <App />
          </ScheduleProvider>
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);