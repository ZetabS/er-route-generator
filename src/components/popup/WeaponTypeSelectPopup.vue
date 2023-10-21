<script setup lang="ts">
import PopupWrapper from '@/components/popup/PopupWrapper.vue';
import WeaponTypeSelectButton from './WeaponTypeSelectButton.vue';
import { allWeaponTypes } from '@/assets/data/itemData';
</script>

<template>
  <PopupWrapper>
    <h2>무기 선택</h2>
    <div class="button-container">
      <WeaponTypeSelectButton
        v-for="weapon in allWeaponTypes"
        :key="weapon"
        :weapon-type="weapon"
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
