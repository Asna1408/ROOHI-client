import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({

  server: {
    proxy: {
      '/user': {
        target: 'https://perfect-bride.shop',
        secure: false,
      },
      '/admin':{
        target: 'https://perfect-bride.shop',
        secure:false,
      }
      
    },
  },  


  plugins: [react()],
})
