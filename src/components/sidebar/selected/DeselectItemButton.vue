<script setup lang="ts">
import CloseIcon from '@/components/icon/CloseIcon.vue';
import { useSelectedStore } from '@/stores/selected';
import { computed } from 'vue';
const props = defineProps(['slotType', 'size']);
const selectedStore = useSelectedStore();

const style = computed(
  () => `
    width: ${props.size}px;
    height: ${props.size}px;
    right: -${props.size / 2}px;
    top: -${props.size / 2}px;
    `
);
</script>

<template>
  <div class="background" :style="style">
    <CloseIcon :size="size" />
  </div>
  <div class="overlay" :style="style" @click="selectedStore.deselectItem(props.slotType)"></div>
</template>

<style scoped>
.background {
  background-color: var(--bg-duller);
  border: hidden;
  border-radius: 50px;
  position: absolute;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay {
  background-color: white;
  opacity: 0;
  position: absolute;
  border: hidden;
  border-radius: 50px;
  transition: 0.2s ease;
}

.overlay:hover {
  opacity: 0.3;
}
</style>
