<script setup lang="ts">
import SidebarWrapper from './SidebarWrapper.vue';
import WeaponTypeSlotComponent from './WeaponTypeSlotComponent.vue';
import ItemSlotComponent from './ItemSlotComponent.vue';
import { allItemTypes } from '@/assets/data/itemData';
import { usePopupStore } from '@/stores/popup';
const popup = usePopupStore();
</script>

<template>
  <SidebarWrapper>
    <div class="slots">
      <WeaponTypeSlotComponent />
      <div class="item-slot-container">
        <ItemSlotComponent v-for="itemType in allItemTypes" :key="itemType" :itemType="itemType" />
      </div>
    </div>
  </SidebarWrapper>
</template>

<style scoped>
.slots {
  width: 22rem;
  display: flex;
  align-items: flex-end;
  gap: var(--space-medium);
}

.item-slot-container {
  width: 18rem;
  display: flex;
  justify-content: space-between;
}
</style>
