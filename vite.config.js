import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { VitePWA } from 'vite-plugin-pwa'
import manifest from './public/manifest.json' // Import your manifest

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest,
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'maskable_icon.png'],
      devOptions: {
        enabled: true, // Enable service worker in dev if needed
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
