import { computed, reactive, ref } from 'vue';
import type { ComputedRef, Ref, UnwrapRef } from 'vue';
import { defineStore } from 'pinia';
import { type Item, ITEM_BY_NAME } from '@/modules/api';

import { EquipType, EquipTypes } from '@/modules/api/enums';

export const useSelectedStore = defineStore('selected', () => {
  const weaponType: Ref<string> = ref('Rapier');

  const items: Record<EquipType, Item> = reactive({
    Weapon: ITEM_BY_NAME['활빈검'],
    Chest: ITEM_BY_NAME['지휘관의 갑옷'],
    Head: ITEM_BY_NAME['황실 부르고넷'],
    Arm: ITEM_BY_NAME['드라우프니르'],
    Leg: ITEM_BY_NAME['SCV']
  });

  const itemsArray: ComputedRef<UnwrapRef<Item[]>> = computed(() =>
    EquipTypes.reduce(
      (result: Item[], equipType: EquipType) => result.concat([items.value[equipType]]),
      []
    )
  );

  function selectItem(item: Item) {
    if (item.equipType) {
      items.value[item.equipType] = item;
    }
  }

  function deselectItem(equipType: EquipType) {
    delete items.value[equipType];
  }

  return {
    items,
    itemsArray,
    weaponType,
    selectItem,
    deselectItem
  };
});
