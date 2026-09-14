import { defineConfig } from 'vite' 
import react from '@vitejs/plugin-react' 
import { VitePWA } from 'vite-plugin-pwa'
 
export default defineConfig({ 
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.png', 'favicon.ico'],
      manifest: {
        name: 'ResuNest - Career Discovery',
        short_name: 'ResuNest',
        description: 'Discover career fields that match your strengths.',
        theme_color: '#0c2545',
        background_color: '#eef4fb',
        display: 'standalone',
        id: '/',
        scope: '/',
        start_url: '/',
        icons: [
          { src: '/resunest-icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/resunest-icon.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
        ]
      }
    })
  ],
  server: { 
    port: 3000, 
    open: true,
    proxy: {
      '/api': 'http://localhost:4000'
    }
  } 
}) 
