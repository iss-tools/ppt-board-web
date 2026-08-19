import { defineConfig } from 'vite';
import UnoCSS from 'unocss/vite';
import vue from '@vitejs/plugin-vue';
import { Plugin as importToCDN, autoComplete } from 'vite-plugin-cdn-import';

export default defineConfig({
  base: './',
  resolve: {
    alias: {

    }
  },
  plugins: [
    UnoCSS(),
    vue(),
    importToCDN({
      prodUrl: '{path}',
      modules: [
        {
          name: 'vue',
          var: 'Vue',
          path: '/libs/vue.global.prod.js'
        },
        {
          name: 'echarts',
          var: 'echarts',
          path: '/libs/echarts.min.js'
        },
        {
          name: 'katex',
          var: 'katex',
          path: '/libs/katex/katex.min.js',
          css: '/libs/katex/katex.min.css'
        },
        {
          name: 'naive-ui',
          var: 'naive',
          path: '/libs/index.prod.js'
        },
        {
          name: 'pptxgenjs',
          var: 'pptxgen',
          path: '/libs/pptxgen.bundle.js'
        }
      ]
    })
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
});
