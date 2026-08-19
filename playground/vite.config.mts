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
  ]
});
