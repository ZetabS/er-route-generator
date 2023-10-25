<script setup lang="ts">
import PopupWrapper from '@/components/wrapper/PopupWrapper.vue';
import SelectItemButton from './SelectItemButton.vue';
import type { Item } from '@/assets/data/itemData';
import { itemDataFilter } from '@/assets/data/itemData';
import { useSelectedStore } from '@/stores/selected';
import { computed } from 'vue';
const selectedStore = useSelectedStore();

const props = defineProps(['slotType', 'closePopup']);

const itemType = computed(() => {
  if (props.slotType == 'Weapon') {
    return selectedStore.selectedWeaponType;
  } else {
    return props.slotType;
  }
});

function compareItemType(itemType: string | number) {
  return (item: Item) => item.subType === itemType;
}

const itemData: Array<Item> = itemDataFilter(compareItemType(itemType.value));
</script>

<template>
  <PopupWrapper :closePopup="closePopup">
    <h2>목표 아이템</h2>
    <div class="item-button-container">
      <SelectItemButton
        v-for="item of itemData"
        :key="item.code"
        :item="item"
        :slotType="slotType"
        :closePopup="closePopup"
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
