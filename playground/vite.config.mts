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
          path: 'https://unpkg.com/vue@3.4.21/dist/vue.global.prod.js'
        },
        {
          name: 'echarts',
          var: 'echarts',
          path: 'https://unpkg.com/echarts@5.5.0/dist/echarts.min.js'
        },
        {
          name: 'katex',
          var: 'katex',
          path: 'https://unpkg.com/katex@0.16.9/dist/katex.min.js',
          css: 'https://unpkg.com/katex@0.16.9/dist/katex.min.css'
        },
        {
          name: 'naive-ui',
          var: 'naive',
          path: 'https://unpkg.com/naive-ui@2.44.1/dist/index.prod.js'
        }
      ]
    })
  ]
});
