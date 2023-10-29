import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import { type Item } from '@/common/typing';

export const useSelectedStore = defineStore('selected', () => {
  const weaponType: Ref<string> = ref('Rapier');

  const items: Ref<Record<string, Item | undefined>> = ref({
    Weapon: undefined,
    Chest: undefined,
    Head: undefined,
    Arm: undefined,
    Leg: undefined
  });

  function deselectItem(slotType: string) {
    items.value[slotType] = undefined;
  }

  return {
    items,
    weaponType,
    deselectItem
  };
});
