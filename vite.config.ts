import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
  registerType: 'autoUpdate',
  includeAssets: ['favicon.ico'],
  manifest: {
    name: 'latihan pwa',
    short_name: 'Latihan PWA',
    description: 'testing vite pwa',
    theme_color: '#f69435',
    background_color: '#f69435',
    display: 'standalone',
    start_url: '/',
    scope: '/',
    icons: [
      { src: '/192.png', sizes: '192x192', type: 'image/png' },
      { src: '/512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],

    // 🔴 penting untuk react-router
    navigateFallback: '/index.html',

    runtimeCaching: [
      {
        urlPattern: ({ request }) => request.destination === 'document',
        handler: 'NetworkFirst',
        options: { cacheName: 'pages' },
      },
      {
        urlPattern: ({ request }) => request.destination === 'image',
        handler: 'CacheFirst',
        options: { cacheName: 'images' },
      },
    ],
  },
})
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
