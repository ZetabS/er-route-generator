import { computed, ComputedRef, ref, type Ref, UnwrapRef } from 'vue';
import { defineStore } from 'pinia';
import { type Item } from '@/common/typing';

interface Items {
  Weapon?: Item;
  Chest?: Item;
  Head?: Item;
  Arm?: Item;
  Leg?: Item;
}

export const useSelectedStore = defineStore('selected', () => {
  const weaponType: Ref<string> = ref('Rapier');

  const items: Ref<Items> = ref({
    Weapon: undefined,
    Chest: undefined,
    Head: undefined,
    Arm: undefined,
    Leg: undefined
  });

  const itemsArray: ComputedRef<Item[]> = computed(
    () => Object.values(items.value).filter((item) => !!item) as Item[]
  );

  function deselectItem(slotType: string) {
    items.value[slotType] = undefined;
  }

  return {
    items,
    itemsArray,
    weaponType,
    deselectItem
  };
});
