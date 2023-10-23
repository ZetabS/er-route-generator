<script setup lang="ts">
import WeaponTypeIcon from '@/components/icon/WeaponTypeIcon.vue';
import SelectWeaponTypePopup from './SelectWeaponTypePopup.vue';
import { useSelectedStore } from '@/stores/selected';
import { ref } from 'vue';

const selectedStore = useSelectedStore();

const isPopupOpen = ref(false);

function closePopup() {
  isPopupOpen.value = false;
}
</script>

<template>
  <div class="slot" @click="isPopupOpen = true">
    <WeaponTypeIcon :weapon-type="selectedStore.selectedWeaponType" :size="2" />
    <div class="overlay"></div>
  </div>
  <SelectWeaponTypePopup v-if="isPopupOpen" :closePopup="closePopup" />
</template>

<style scoped>
.slot {
  background-color: var(--button-bg);
  width: 3rem;
  height: 3rem;
  border-style: hidden;
  border-radius: 0.5rem;
  cursor: pointer;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay {
  background-color: white;
  opacity: 0;
  width: 3rem;
  height: 3rem;
  position: absolute;
  border-style: hidden;
  border-radius: 0.5rem;
  transition: 0.2s ease;
}

.overlay:hover {
  opacity: 0.1;
}
</style>
