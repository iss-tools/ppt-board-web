import { defineConfig } from 'vite';
import UnoCSS from 'unocss/vite';
import vue from '@vitejs/plugin-vue';
import { Plugin as importToCDN, autoComplete } from 'vite-plugin-cdn-import';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ command }) => {
  return {
    base: '/',
    resolve: {
      alias: {}
    },
    plugins: [
      UnoCSS(),
      vue(),
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          name: 'PPT Board',
          short_name: 'PPT Board',
          description: 'A fully-featured presentation and editing host application',
          theme_color: '#ffffff',
          start_url: '/',
          display: 'standalone',
          icons: [
            {
              src: '/favicon.svg',
              sizes: '192x192',
              type: 'image/svg+xml'
            },
            {
              src: '/favicon.svg',
              sizes: '512x512',
              type: 'image/svg+xml'
            },
            {
              src: '/favicon.svg',
              sizes: '192x192 512x512',
              type: 'image/svg+xml',
              purpose: 'any maskable'
            }
          ]
        },
        workbox: {
          maximumFileSizeToCacheInBytes: 50 * 1024 * 1024, // 50MB
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,ttf}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\//i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'external-cache',
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // 365 days
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            },
            {
              urlPattern: /\.(?:mp3|wav|ogg|mp4)$/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'media-cache',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
                },
                cacheableResponse: {
                  statuses: [0, 200, 206]
                },
                plugins: [
                  {
                    cachedResponseWillBeUsed: async ({ cachedResponse }) => {
                      return cachedResponse;
                    }
                  }
                ]
              }
            }
          ]
        }
      }),
      command === 'build' ? importToCDN({
        prodUrl: '{path}',
        modules: [
          {
            name: 'vue',
            var: 'Vue',
            path: 'https://unpkg.com/vue@3.5.40/dist/vue.global.prod.js'
          },
          {
            name: 'echarts',
            var: 'echarts',
            path: 'https://unpkg.com/echarts@6.1.0/dist/echarts.min.js'
          },
          {
            name: 'katex',
            var: 'katex',
            path: 'https://unpkg.com/katex@0.18.4/dist/katex.min.js',
            css: 'https://unpkg.com/katex@0.18.4/dist/katex.min.css'
          },
          {
            name: 'naive-ui',
            var: 'naive',
            path: 'https://unpkg.com/naive-ui@2.44.1/dist/index.prod.js'
          },
          {
            name: 'pptxgenjs',
            var: 'pptxgen',
            path: 'https://unpkg.com/pptxgenjs@4.0.1/dist/pptxgen.bundle.js'
          }
        ]
      }) : undefined
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              // Priority: Extract our own monorepo packages even if they are in node_modules
              if (id.includes('@iss-ai/')) {
                const match = id.match(/@iss-ai\/([^/]+)/);
                if (match) return `iss-${match[1]}`;
              }
              // Other heavy dependencies
              if (id.includes('dexie')) {
                return 'vendor-dexie';
              }
              if (id.includes('@aiden0z/pptx-renderer')) {
                return 'vendor-pptx-renderer';
              }
              if (id.includes('@iconify')) {
                return 'vendor-iconify';
              }
              if (id.includes('lodash')) {
                return 'vendor-lodash';
              }
              if (id.includes('roughjs')) {
                return 'vendor-roughjs';
              }
              return 'vendor';
            }
            // Split internal monorepo packages (if resolved as absolute local paths)
            if (id.includes('/plugins/plugin-')) {
              const match = id.match(/\/plugins\/(plugin-[^\/]+)/);
              if (match) return match[1];
            }
            if (id.includes('/vue-canvas-core/')) {
              return 'core';
            }
            if (id.includes('/ppt-board/')) {
              return 'board';
            }
          }
        },
        chunkSizeWarningLimit: 1000
      }
    }
  };
});
