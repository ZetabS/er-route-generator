import { ref, computed, type Ref } from 'vue';
import { defineStore } from 'pinia';

export const usePopupStore = defineStore('popup', () => {
  const isPopupOpen = computed(() => {
    return isItemPopupOpen.value || isWeaponSelectPopupOpen.value;
  });

  const isItemPopupOpen = ref(false);
  const currentItemType: Ref<string> = ref(null);
  const isWeaponSelectPopupOpen = ref(false);

  function closePopup() {
    isItemPopupOpen.value = false;
    isWeaponSelectPopupOpen.value = false;
    currentItemType.value = null;
  }

  function openItemSelectPopup(itemType: string) {
    isItemPopupOpen.value = true;
    currentItemType.value = itemType;
  }

  function openWeaponSelectPopup() {
    isWeaponSelectPopupOpen.value = true;
  }

  return {
    isPopupOpen,
    isItemPopupOpen,
    isWeaponSelectPopupOpen,
    currentItemType,
    openItemSelectPopup,
    openWeaponSelectPopup,
    closePopup
  };
});
