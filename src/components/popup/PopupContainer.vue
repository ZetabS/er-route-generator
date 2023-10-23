<script setup lang="ts">
import { usePopupStore } from '@/stores/popup';
const popup = usePopupStore();
const props = defineProps(['isPopupOpen']);
</script>

<template>
  <div class="popup-container" v-if="props.isPopupOpen">
    <div class="popup-background" @click="popup.closePopup()"></div>
    <slot></slot>
  </div>
</template>

<style scoped>
.popup-container {
  position: fixed;
  margin-right: 10px;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
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

@media (max-width: 1024px) {
}
</style>
