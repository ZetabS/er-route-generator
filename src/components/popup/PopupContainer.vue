<script setup lang="ts">
import ItemPopup from './ItemPopup.vue'
import { usePopupStore } from '@/stores/popup'
const popup = usePopupStore()
</script>

<template>
  <div class="popup-container" v-if="popup.isPopupOpen">
    <div class="popup-background" @click="popup.closePopup()"></div>
    <ItemPopup v-if="popup.isItemPopupOpen" />
  </div>
</template>

<style>
.popup-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.popup-background {
  background: rgba(0, 0, 0, 0.5);

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
