import * as Sentry from "@sentry/react";

type AnalyticsEvent = {
  name: string;
  properties?: Record<string, unknown>;
};

export function trackEvent(event: AnalyticsEvent) {
  if (import.meta.env.DEV) {
    console.log("Analytics Event:", event);
  }

  if (import.meta.env.PROD && import.meta.env.VITE_SENTRY_DSN) {
    Sentry.captureMessage(`Event: ${event.name}`, {
      level: "info",
      tags: {
        event_type: "analytics",
        event_name: event.name,
      },
      extra: {
        ...event.properties,
        url: typeof window !== "undefined" ? window.location.href : undefined,
        timestamp: new Date().toISOString(),
      },
    });
  }
}

export function trackPageView(path: string) {
  if (import.meta.env.DEV) {
    console.log("Page View:", path);
  }

  if (import.meta.env.PROD && import.meta.env.VITE_SENTRY_DSN) {
    Sentry.setContext("page", {
      path,
      url: typeof window !== "undefined" ? window.location.href : undefined,
      timestamp: new Date().toISOString(),
    });

    Sentry.addBreadcrumb({
      category: "navigation",
      message: `Page View: ${path}`,
      level: "info",
      data: {
        path,
        url: typeof window !== "undefined" ? window.location.href : undefined,
      },
    });
  }
}
