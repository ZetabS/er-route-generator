<script setup lang="ts">
import { computed } from 'vue';
import type { Ref } from 'vue';
import PopupWrapper from '@/components/wrapper/PopupWrapper.vue';
import SelectItemButton from './SelectItemButton.vue';
import { ITEM } from '@/modules/api/';
import type { Item, SubType } from '@/modules/api/';
import { useSelectedStore } from '@/stores/selected';

const props = defineProps<{ slotType: SubType | 'Weapon'; closePopup: Function }>();
const selected = useSelectedStore();

const itemType: Ref<SubType> = computed(() => {
  if (props.slotType === 'Weapon') {
    return selected.weaponType;
  } else {
    return props.slotType;
  }
});

function compareItemType(itemType: SubType) {
  return (item: Item) => item.subType === itemType;
}

const filteredItemData: Item[] = Object.values(ITEM).filter(compareItemType(itemType.value));
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