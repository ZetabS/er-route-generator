<script setup lang="ts">
import PopupWrapper from '@/components/wrapper/PopupWrapper.vue';
import SelectWeaponTypeButtonVue from './SelectWeaponTypeButton.vue';
import { allWeaponTypes } from '@/assets/data/itemData';
const props = defineProps(['closePopup']);
</script>

<template>
  <PopupWrapper :closePopup="closePopup">
    <h2>무기 선택</h2>
    <div class="button-container">
      <SelectWeaponTypeButtonVue
        v-for="weaponType in allWeaponTypes"
        :key="weaponType"
        :weapon-type="weaponType"
        :closePopup="closePopup"
      />
    </div>
  </PopupWrapper>
</template>

<style scoped>
.button-container {
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  flex: 0 0 30rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}
</style>
