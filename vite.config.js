import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Correct Vite configuration
export default defineConfig({
  plugins: [react()],
  base: "./", // ensures correct relative paths for assets in production (like Vercel)
  css: {
    lightningcss: false, // disable LightningCSS to fix Tailwind v4 warnings
  },
})
