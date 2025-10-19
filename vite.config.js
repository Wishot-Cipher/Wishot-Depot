import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'
import process from 'node:process'  // ✅ Fix for 'process' not defined

// Resolve __dirname for ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Detect environment
const isVercel = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production'

// 🧠 Log build context clearly
console.log(`⚙️  Building with Vite configuration`)
console.log(`🌍 Environment: ${isVercel ? 'Vercel/Production' : 'Local Development'}`)
console.log(`💡 LightningCSS: ${isVercel ? 'Disabled' : 'Enabled'}`)

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    port: 3000,
    strictPort: false,
  },

  css: {
    // Disable LightningCSS in Vercel/Production to avoid build errors
    lightningcss: !isVercel,
  },

  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
})
