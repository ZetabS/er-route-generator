import { computed, ref } from 'vue';
import type { Ref } from 'vue';
import { defineStore } from 'pinia';
import { ITEM_BY_NAME, EquipTypes, SubType } from '@/modules/api';
import type { Item, EquipType } from '@/modules/api';
import type { WeaponType } from '@/modules/api/enums';

interface Items {
  Weapon?: Item;
  Chest?: Item;
  Head?: Item;
  Arm?: Item;
  Leg?: Item;
}

export const useSelectedStore = defineStore('selected', () => {
  const weaponType: Ref<WeaponType> = ref(SubType.Rapier);

  const items: Ref<Items> = ref({
    Weapon: ITEM_BY_NAME['활빈검'],
    Chest: ITEM_BY_NAME['지휘관의 갑옷'],
    Head: ITEM_BY_NAME['황실 부르고넷'],
    Arm: ITEM_BY_NAME['드라우프니르'],
    Leg: ITEM_BY_NAME['SCV']
  });

  const targetItems: Ref<Item[]> = computed(() => {
    const result: Item[] = [];
    for (const equipType of EquipTypes) {
      const item = items.value[equipType];
      if (item) {
        result.push(item);
      }
    }
    return result;
  });

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
    itemsArray: targetItems,
    weaponType,
    selectItem,
    deselectItem
  };
});
