<script setup lang="ts">
import WeaponTypeIcon from '@/components/icon/WeaponTypeIcon.vue';
import { useSelectedStore } from '@/stores/selected';
const selectedStore = useSelectedStore();
defineProps(['weaponType', 'closePopup']);
</script>

<template>
  <div
    class="button"
    @click="
      selectedStore.selectedWeaponType = weaponType;
      if (selectedStore.selectedItems.Weapon?.subType !== weaponType) {
        selectedStore.deselectItem('Weapon');
      }
      closePopup();
    "
  >
    <div class="icon-background">
      <WeaponTypeIcon :weapon-type="weaponType" :size="2" />
    </div>
    <span>{{ weaponType }}</span>
  </div>
</template>

<style scoped>
.button {
  width: 5rem;
  height: 5rem;
  margin: 10px;
  padding: 5px;
  border-radius: 0.4rem;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon-background {
  background-color: var(--bg-duller);
  min-width: 3rem;
  min-height: 3rem;
  max-width: 3rem;
  max-height: 3rem;
  border-style: hidden;
  border-radius: 0.5rem;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
}

span {
  height: 3rem;
  line-height: 1.2;
  font-size: 0.7rem;
  text-align: center;

  display: flex;
  place-content: center;
  place-items: center;
}

.button:hover {
  background-color: var(--bg-duller-highlighted);
}
</style>
