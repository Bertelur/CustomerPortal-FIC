import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import App from "./App";
import { registerSW } from "virtual:pwa-register";
import { initGA } from "./Lib/ga";

const ENABLE_ANALYTICS = import.meta.env.VITE_ENABLE_ANALYTICS === "true";
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

if (ENABLE_ANALYTICS && GA_MEASUREMENT_ID) {
  initGA({
    measurementId: GA_MEASUREMENT_ID,
    debug: import.meta.env.MODE !== "production",
  });
}

registerSW({ immediate: true });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Analytics />
    </BrowserRouter>
  </StrictMode>
);
