import { computed, ComputedRef, ref, type Ref, UnwrapRef } from 'vue';
import { defineStore } from 'pinia';
import { ITEM, Item } from '@/modules/api';

interface Items {
  Weapon?: Item;
  Chest?: Item;
  Head?: Item;
  Arm?: Item;
  Leg?: Item;
}

export const useSelectedStore = defineStore('selected', () => {
  const weaponType: Ref<string> = ref('Rapier');

  const items: Ref<UnwrapRef<Record<string, Item>>> = ref({
    Weapon: ITEM['활빈검'],
    Chest: ITEM['지휘관의 갑옷'],
    Head: ITEM['황실 부르고넷'],
    Arm: ITEM['드라우프니르'],
    Leg: ITEM['SCV']
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
