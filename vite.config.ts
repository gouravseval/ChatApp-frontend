import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: ['https://chatapp-backend-6v42.onrender.com, http://localhost:3000'],
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
