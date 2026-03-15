import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://food-delivery-backend-1-rn4y.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
