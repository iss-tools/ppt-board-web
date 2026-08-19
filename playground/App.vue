<template>
  <div class="editor-container">
    <Main ref="editorRef" :plugins="activePlugins" />
    <ReloadPrompt />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { UploadFileInfo } from 'naive-ui';
import { Main } from '../src/index';
import ReloadPrompt from './ReloadPrompt.vue';

import { MenuPlugin } from '@iss-ai/plugin-menu';
import { MyLibraryPlugin } from '@iss-ai/plugin-my-library';
import { StoragePlugin } from '@iss-ai/plugin-storage';
import { StylePropsPlugin } from '@iss-ai/plugin-style-props';
import { AIPlugin } from '@iss-ai/plugin-ai';
import { createCooperationPlugin } from '@iss-ai/plugin-cooperation';
import { EChartsPlugin } from '@iss-ai/plugin-echarts';
import { KatexPlugin } from '@iss-ai/plugin-katex';
import { RemarkPlugin } from '@iss-ai/plugin-remark';

// @ts-ignore
const ablyApiKey = import.meta.env.VITE_ABLY_API_KEY;

const activePlugins = [
  MenuPlugin,
  MyLibraryPlugin,
  StoragePlugin,
  StylePropsPlugin,
  AIPlugin,
  EChartsPlugin,
  KatexPlugin,
  RemarkPlugin,
  createCooperationPlugin({ useP2P: true, ablyApiKey }),
];

const editorRef = ref<InstanceType<typeof Main> | null>(null);
onMounted(() => {});
</script>

<style lang="scss" scoped>
.editor-container {
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
}
</style>
