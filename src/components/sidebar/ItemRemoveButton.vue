<script setup lang="ts">
import CloseIcon from '@/components/icon/CloseIcon.vue';
import { useSelectedStore } from '@/stores/selected';
const props = defineProps(['slotType']);
const selectedStore = useSelectedStore();
const size = 18;
</script>

<template>
  <div
    class="close-button"
    @click="selectedStore.deselectItem(slotType)"
    :style="`
    width: ${size}px;
    height: ${size}px;
    right: -${size / 2}px;
    top: -${size / 2}px;
    `"
  >
    <CloseIcon :size="size" />
  </div>
</template>

<style scoped>
.close-button {
  background-color: var(--bg-duller);
  border: none;
  border-radius: 50px;
  position: absolute;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
}

.close-button:hover {
  background-color: var(--bg-duller-highlighted);
}
</style>
