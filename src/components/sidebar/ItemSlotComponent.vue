<script setup lang="ts">
import { usePopupStore } from '@/stores/popup';
const popup = usePopupStore();
const { itemType } = defineProps(['itemType']);
</script>

<template>
  <div
    class="item-slot"
    :id="`item-slot-${itemType.toLowerCase()}`"
    @click="popup.openItemSelectPopup(itemType)"
  >
    <img :src="`/images/item-icon/${itemType}.webp`" :alt="itemType" />
  </div>
</template>

<style scoped>
.item-slot {
  background-color: var(--bg-duller);

  width: 3rem;
  height: 1.8rem;
  border-style: hidden;
  border-radius: 0.5rem;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  > img {
    height: 0.8rem;
  }
}

.item-slot:hover {
  background-color: var(--bg-duller-highlighted);
}
</style>
