import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import { type Item } from '../assets/data/itemData';

export const useSelectedStore = defineStore('selected', () => {
  const selectedWeaponType: Ref<string> = ref('Rapier');
  const selectedWeapon: Ref<Item | null> = ref(null);
  const selectedChest: Ref<Item | null> = ref(null);
  const selectedHead: Ref<Item | null> = ref(null);
  const selectedArm: Ref<Item | null> = ref(null);
  const selectedLeg: Ref<Item | null> = ref(null);

  function selectWeaponType(weaponType: string) {
    selectedWeaponType.value = weaponType;
  }

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
    selectWeaponType,
    selectedWeaponType,
    selectedWeapon,
    selectedChest,
    selectedHead,
    selectedArm,
    selectedLeg
  };
});
