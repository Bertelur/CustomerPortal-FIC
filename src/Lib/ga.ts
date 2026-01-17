// Google Analytics (GA)
// Disclaimer: Please use this library with caution and only if you have a valid GA property.
// Responsible by: https://github.com/bertelur/

type GAConfig = {
  measurementId: string;
  debug?: boolean;
};

type GtagCommand = "js" | "config" | "event";
type GtagFn = (command: GtagCommand, ...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
  }
}

let gaLoaded = false;

export function initGA(config: GAConfig): void {
  const { measurementId, debug = false } = config;

  if (!measurementId || !/^G-[A-Z0-9]+$/.test(measurementId)) {
    if (debug) console.warn("[GA] Invalid measurementId:", measurementId);
    return;
  }
  if (gaLoaded) {
    if (debug) console.info("[GA] Already initialized");
    return;
  }

  window.dataLayer = window.dataLayer ?? [];

  const gtag: GtagFn = (command, ...args) => {
    window.dataLayer!.push([command, ...args]);
  };

  window.gtag = gtag;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  script.onerror = () => {
    if (debug) console.error("[GA] Failed to load gtag.js");
  };
  document.head.appendChild(script);

  gtag("js", new Date());
  gtag("config", measurementId);

  gaLoaded = true;
  if (debug) console.info("[GA] Initialized with measurementId:", measurementId);
}

export function gaEvent(eventName: string, params: Record<string, unknown> = {}): void {
  const gtag = window.gtag;

  if (typeof gtag !== "function") {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push(["event", eventName, params]);
    return;
  }

  gtag("event", eventName, params);
}
