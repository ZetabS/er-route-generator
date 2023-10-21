import { ref, computed, Ref } from 'vue';
import { defineStore } from 'pinia';
import { Item } from '../assets/data/itemData';

export const useSelectedStore = defineStore('selected', () => {
  const selectedWeaponType: Ref<string> = ref('Rapier');
  const selectedWeapon: Ref<Item> = ref(null);
  const selectedChest: Ref<Item> = ref(null);
  const selectedHead: Ref<Item> = ref(null);
  const selectedArm: Ref<Item> = ref(null);
  const selectedLeg: Ref<Item> = ref(null);

  function selectItem(item: Item) {
    switch (item.itemType) {
      case 'Weapon':
        selectedWeapon.value = item;
        break;
      case 'Chest':
        selectedChest.value = item;
        break;
      case 'Head':
        selectedHead.value = item;
        break;
      case 'Arm':
        selectedArm.value = item;
        break;
      case 'Leg':
        selectedLeg.value = item;
        break;
    }
  }

  return {
    selectItem,
    selectedWeaponType,
    selectedWeapon,
    selectedChest,
    selectedHead,
    selectedArm,
    selectedLeg
  };
});
