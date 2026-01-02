import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: 'localhost',
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173,
    },
    // ADD THIS PROXY CONFIGURATION:
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Your backend server
        changeOrigin: true,
        secure: false,
      }
    }
  },
})