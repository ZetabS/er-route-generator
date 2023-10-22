import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import { type Item } from '../assets/data/itemData';

export const useSelectedStore = defineStore('selected', () => {
  const selectedWeaponType: Ref<string> = ref('Rapier');

  type SelectedItems = {
    [slotType: string]: Item | null;
    Weapon: Item | null;
    Chest: Item | null;
    Head: Item | null;
    Arm: Item | null;
    Leg: Item | null;
  };

  const selectedItems: Ref<SelectedItems> = ref({
    Weapon: null,
    Chest: null,
    Head: null,
    Arm: null,
    Leg: null
  });

  function deselectItem(slotType: string) {
    selectedItems.value[slotType] = null;
  }

  return {
    selectedItems,
    selectedWeaponType,
    deselectItem
  };
});
