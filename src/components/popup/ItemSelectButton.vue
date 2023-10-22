<script setup lang="ts">
import ItemIcon from '@/components/icon/ItemIcon.vue';

import { useSelectedStore } from '@/stores/selected';
const selectedItemStore = useSelectedStore();

import { usePopupStore } from '@/stores/popup';
const popupStore = usePopupStore();

const { item } = defineProps(['item']);
</script>

<template>
  <div
    class="item-button"
    @click="
      selectedItemStore.selectItem(item);
      popupStore.closePopup();
    "
  >
    <ItemIcon :item="item" :size="4" />
    <span>{{ item.name }}</span>
  </div>
</template>

<style scoped>
.item-button {
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

.item-button:hover {
  background-color: var(--bg-duller-highlighted);
}
</style>
