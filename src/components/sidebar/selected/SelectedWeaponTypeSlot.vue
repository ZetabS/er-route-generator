<script setup lang="ts">
import WeaponTypeIcon from '@/components/icon/WeaponTypeIcon.vue';
import { usePopupStore } from '@/stores/popup';
import { useSelectedStore } from '@/stores/selected';

const popupStore = usePopupStore();
const selectedStore = useSelectedStore();
</script>

<template>
  <div class="slot" @click="popupStore.openWeaponSelectPopup()">
    <WeaponTypeIcon :weapon-type="selectedStore.selectedWeaponType" :size="2" />
  </div>
</template>

<style scoped>
.slot {
  background-color: var(--bg-duller);
  width: 3rem;
  height: 3rem;
  border-style: hidden;
  border-radius: 0.5rem;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
}

.slot:hover {
  background-color: var(--bg-duller-highlighted);
}
</style>
