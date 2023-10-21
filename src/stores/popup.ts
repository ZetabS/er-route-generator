import { ref, computed, type Ref } from 'vue';
import { defineStore } from 'pinia';

export const usePopupStore = defineStore('popup', () => {
  const isPopupOpen = computed(() => {
    return isItemPopupOpen.value || isWeaponSelectPopupOpen.value;
  });

  const isItemPopupOpen = ref(false);
  const currentItemSlot: Ref<string | null> = ref(null);
  const isWeaponSelectPopupOpen = ref(false);

  function closePopup() {
    isItemPopupOpen.value = false;
    isWeaponSelectPopupOpen.value = false;
    currentItemSlot.value = null;
  }

  function openItemSelectPopup(slot: string) {
    isItemPopupOpen.value = true;
    currentItemSlot.value = slot;
  }

  function openWeaponSelectPopup() {
    isWeaponSelectPopupOpen.value = true;
  }

  return {
    isPopupOpen,
    isItemPopupOpen,
    isWeaponSelectPopupOpen,
    currentItemSlot,
    openItemSelectPopup,
    openWeaponSelectPopup,
    closePopup
  };
});
