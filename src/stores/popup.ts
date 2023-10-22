import { ref, computed, type Ref } from 'vue';
import { defineStore } from 'pinia';

export const usePopupStore = defineStore('popup', () => {
  const isPopupOpen = computed(() => {
    return isItemPopupOpen.value || isWeaponSelectPopupOpen.value;
  });

  const isItemPopupOpen = ref(false);
  const currentItemSlotType: Ref<string> = ref('');
  const isWeaponSelectPopupOpen = ref(false);

  function closePopup() {
    isItemPopupOpen.value = false;
    isWeaponSelectPopupOpen.value = false;
    currentItemSlotType.value = '';
  }

  function openItemSelectPopup(slotType: string) {
    isItemPopupOpen.value = true;
    currentItemSlotType.value = slotType;
  }

  function openWeaponSelectPopup() {
    isWeaponSelectPopupOpen.value = true;
  }

  return {
    isPopupOpen,
    isItemPopupOpen,
    isWeaponSelectPopupOpen,
    currentItemSlotType,
    openItemSelectPopup,
    openWeaponSelectPopup,
    closePopup
  };
});
