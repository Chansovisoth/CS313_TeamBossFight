import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    allowedHosts: [
      "klaude.proficientia.me",
      "npm.proficientia.me",
      "localhost",
    ],
  },
  optimizeDeps: {
    include: ['qr-scanner', 'qr-scanner/qr-scanner-worker.min.js']
  }
})

