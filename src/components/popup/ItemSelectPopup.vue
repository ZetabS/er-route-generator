<script setup lang="ts">
import PopupWrapper from '@/components/popup/PopupWrapper.vue';
import ItemSelectButton from './ItemSelectButton.vue';
import { filteredItemData } from '@/assets/data/itemData';
import type { Item, ItemData } from '@/assets/data/itemData';

import { usePopupStore } from '@/stores/popup';
const popupStore = usePopupStore();

const itemType = popupStore.currentItemType;

function compareItemType(itemType: string) {
  return (item: Item) => item.itemType == itemType;
}

const itemData: ItemData = filteredItemData(compareItemType(itemType));
</script>

<template>
  <PopupWrapper>
    <h2>목표 아이템</h2>
    <div class="item-button-container">
      <ItemSelectButton v-for="item in itemData" :key="item.code" :item="item" />
    </div>
  </PopupWrapper>
</template>

<style scoped>
.item-button-container {
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  flex: 0 0 30rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}
</style>
