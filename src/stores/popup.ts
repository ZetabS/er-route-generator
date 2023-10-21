import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const usePopupStore = defineStore('popup', () => {
  const isPopupOpen = computed(() => {
    return isItemPopupOpen.value || isOtherPopupOpen.value;
  });

  const isItemPopupOpen = ref(false);
  const isOtherPopupOpen = ref(false);

  function closePopup() {
    isItemPopupOpen.value = false;
    isOtherPopupOpen.value = false;
  }

  function openItemPopup() {
    isItemPopupOpen.value = true;
  }

  function closeItemPopup() {
    isItemPopupOpen.value = false;
  }

  function openOtherPopup() {
    isOtherPopupOpen.value = true;
  }

  function closeOtherPopup() {
    isOtherPopupOpen.value = false;
  }

  return {
    isPopupOpen,
    isItemPopupOpen,
    isOtherPopupOpen,
    closePopup,
    openItemPopup,
    closeItemPopup,
    openOtherPopup,
    closeOtherPopup
  };
});
