import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from https://aditin22.github.io/aditi-portfolio/, so production assets
// need that prefix. Dev stays at the root.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/aditi-portfolio/' : '/',
  server: { port: 5173 },
}))
