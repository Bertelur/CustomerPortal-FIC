import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App";
import { registerSW } from "virtual:pwa-register";
import { queryClient } from "./Lib/react-query/queryClient";
import { initSentry } from "./Lib/monitoring/sentry";
import { reportWebVitals, sendToAnalytics } from "./Lib/monitoring/webVitals";

initSentry();

registerSW({ immediate: true });

reportWebVitals(sendToAnalytics);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
