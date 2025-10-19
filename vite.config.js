import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Use SWC instead of Babel for better compatibility
      jsxRuntime: 'automatic',
      fastRefresh: true,
    }), 
    tailwindcss()
  ],
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
  // Fix for Rolldown HTML parsing issue
  assetsInclude: ['**/*.html'],
  
  optimizeDeps: {
    exclude: ['index.html'],
  },
  
  server: {
    port: 3000,
    strictPort: false,
  },
  
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
})