import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'


export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'hair-dryer.svg', 'hair-dryer-outline.svg'],
      devOptions: {
        enabled: true
      },
      workbox: {
        cleanupOutdatedCaches: true,
        globPatterns: ['**/*.{js,css,html,ico,svg,webmanifest,json}']
      },
      manifest: {
        name: 'Haircut',
        short_name: 'Haircut',
        description: 'Aplicativo PWA para explorar cortes de cabelo e salvar ideias.',
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/hair-dryer.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: '/hair-dryer.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})