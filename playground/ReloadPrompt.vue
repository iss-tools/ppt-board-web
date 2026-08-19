<template>
  <div v-if="needRefresh" class="pwa-toast">
    <div class="message">
      {{ t('pwa.newVersionAvailable', '发现新版本可用，请刷新以体验最新功能。') }}
    </div>
    <div class="buttons">
      <button @click="updateServiceWorker()" class="update-btn">{{ t('pwa.refresh', '刷新') }}</button>
      <button @click="close" class="close-btn">{{ t('pwa.close', '关闭') }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { useI18n } from './useI18n'

const { t } = useI18n()

const {
  needRefresh,
  updateServiceWorker,
} = useRegisterSW()

const close = () => {
  needRefresh.value = false
}
</script>

<style scoped>
.pwa-toast {
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 16px;
  padding: 12px;
  border: 1px solid #8885;
  border-radius: 4px;
  z-index: 9999;
  text-align: left;
  box-shadow: 3px 4px 5px 0 #8885;
  background-color: white;
}
.pwa-toast .message {
  margin-bottom: 8px;
}
.pwa-toast .buttons {
  display: flex;
  gap: 8px;
}
.pwa-toast button {
  border: 1px solid #8885;
  outline: none;
  margin-right: 5px;
  border-radius: 2px;
  padding: 3px 10px;
  cursor: pointer;
  background-color: #f8f8f8;
}
.pwa-toast .update-btn {
  background-color: #18a058;
  color: white;
  border-color: #18a058;
}
</style>
