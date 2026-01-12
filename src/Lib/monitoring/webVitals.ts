import { onCLS, onFID, onFCP, onLCP, onTTFB, type Metric } from "web-vitals";
import * as Sentry from "@sentry/react";

type WebVitalsCallback = (metric: Metric) => void;

export function reportWebVitals(onPerfEntry?: WebVitalsCallback) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onCLS(onPerfEntry);
    onFID(onPerfEntry);
    onFCP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
  }
}

export function sendToAnalytics(metric: Metric) {
  if (import.meta.env.DEV) {
    console.log("Web Vital:", metric);
  }

  if (import.meta.env.PROD && import.meta.env.VITE_SENTRY_DSN) {
    if (Sentry.metrics && typeof Sentry.metrics.distribution === "function") {
      Sentry.metrics.distribution(
        `web_vital.${metric.name.toLowerCase()}`,
        metric.value,
        {
          unit: metric.name === "CLS" ? undefined : "millisecond",
        }
      );
    }

    Sentry.addBreadcrumb({
      category: "web_vital",
      message: `Web Vital: ${metric.name}`,
      level: "info",
      data: {
        value: metric.value,
        id: metric.id,
        name: metric.name,
        navigationType: metric.navigationType,
        rating: metric.rating,
        url: typeof window !== "undefined" ? window.location.href : undefined,
      },
    });
  }
}
