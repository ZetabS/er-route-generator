<script setup lang="ts">
import PopupWrapper from '@/components/wrapper/PopupWrapper.vue';
import SelectItemButton from './SelectItemButton.vue';
import type { Item } from '@/modules/api/typing';
import { itemData } from '@/modules/api/data/itemData';
import { useSelectedStore } from '@/stores/selected';
import { computed } from 'vue';
const selected = useSelectedStore();

const props = defineProps(['slotType', 'closePopup']);

const itemType = computed(() => {
  if (props.slotType == 'Weapon') {
    return selected.weaponType;
  } else {
    return props.slotType;
  }
});

function compareItemType(itemType: string | number) {
  return (item: Item) => item.subType === itemType;
}

const filteredItemData: Item[] = itemData.filter(compareItemType(itemType.value));
</script>

<template>
  <PopupWrapper :closePopup="closePopup">
    <h2>목표 아이템</h2>
    <div class="item-button-container">
      <SelectItemButton
        v-for="item of filteredItemData"
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
