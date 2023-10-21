<script setup lang="ts">
import { usePopupStore } from '@/stores/popup';
const pStore = usePopupStore();
</script>

<template>
  <div class="close-button" @click="pStore.closePopup()">
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path class="close-icon" d="M12 0L0 12M0 0L12 12" />
    </svg>
  </div>
</template>

<style>
.close-button {
  background-color: var(--bg-duller);

  width: 24px;
  height: 24px;
  border: none;
  border-radius: 50px;
  position: absolute;
  right: var(--space-medium);
  top: var(--space-medium);
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
}

.close-button:hover {
  background-color: var(--bg-duller-highlighted);
}

.close-icon {
  stroke: var(--accent-dull);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>
