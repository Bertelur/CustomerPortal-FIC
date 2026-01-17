/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
    readonly VITE_ENABLE_ANALYTICS: string;
    readonly VITE_GA_MEASUREMENT_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}