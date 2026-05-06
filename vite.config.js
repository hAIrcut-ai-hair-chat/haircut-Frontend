import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',

      includeAssets: [
        'favicon.ico',
        'hair-dryer.svg',
        'hair-dryer-outline.svg'
      ],

      devOptions: {
        enabled: true
      },

      workbox: {
        cleanupOutdatedCaches: true,

        globPatterns: ['**/*.{js,css,html,ico,svg,png,webmanifest,json}'],

        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*onrender\.com/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 // 1 dia
              },
              networkTimeoutSeconds: 10
            }
          }
        ]
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
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
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