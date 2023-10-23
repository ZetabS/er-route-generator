<script setup lang="ts">
import PopupWrapper from '@/components/popup/PopupWrapper.vue';
import SelectItemButton from './SelectItemButton.vue';
import { filteredItemData } from '@/assets/data/itemData';
import type { Item, ItemData } from '@/assets/data/itemData';
import { useSelectedStore } from '@/stores/selected';
import { usePopupStore } from '@/stores/popup';
import { computed } from 'vue';
const selectedStore = useSelectedStore();
const popupStore = usePopupStore();
const slotType = popupStore.currentItemSlotType;

const itemType = computed(() => {
  if (slotType == 'Weapon') {
    return selectedStore.selectedWeaponType;
  } else {
    return slotType;
  }
});

function compareItemType(itemType: string) {
  return (item: Item) => item.subType == itemType;
}

const itemData: ItemData = filteredItemData(compareItemType(itemType.value));
</script>

<template>
  <PopupWrapper>
    <h2>목표 아이템</h2>
    <div class="item-button-container">
      <SelectItemButton
        v-for="item in itemData"
        :key="item.code"
        :item="item"
        :slot-type="slotType"
      />
    </div>
  </PopupWrapper>
</template>

<style scoped>
.item-button-container {
  width: 100%;
  height: 100%;
  padding: var(--space-medium);
  overflow-x: hidden;
  overflow-y: scroll;

  display: grid;
  gap: var(--space-medium);
  grid-template-columns: repeat(auto-fill, minmax(5rem, auto));
  align-content: start;
}
</style>
