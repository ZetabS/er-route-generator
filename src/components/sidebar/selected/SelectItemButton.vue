<script setup lang="ts">
import ItemIcon from '@/components/icon/ItemIcon.vue';

import { useSelectedStore } from '@/stores/selected';
const selectedStore = useSelectedStore();

defineProps(['item', 'slotType', 'closePopup']);
</script>

<template>
  <div
    class="button"
    @click="
      selectedStore.items[slotType] = item;
      closePopup();
    "
  >
    <ItemIcon :item="item" :size="4" />
    <span>{{ item.name }}</span>
  </div>
</template>

<style scoped>
.button {
  width: 5rem;
  height: 4.5rem;
  padding: 5px;
  border-radius: 0.4rem;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: center;
}

span {
  height: 3rem;
  line-height: 1.2;
  font-size: 0.7rem;
  text-align: center;

  display: flex;
  place-content: center;
  place-items: center;
}

.button:hover {
  background-color: var(--button-bg-hover);
}
</style>
