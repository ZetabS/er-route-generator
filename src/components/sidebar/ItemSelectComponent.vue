<script setup lang="ts">
import SidebarWrapper from './SidebarWrapper.vue';
import WeaponTypeSlotComponent from './WeaponTypeSlotComponent.vue';
import ItemSlotComponent from './ItemSlotComponent.vue';
import { equipableItemTypes as slotTypes } from '@/assets/data/itemData';
</script>

<template>
  <SidebarWrapper :size="10">
    <div class="slots">
      <WeaponTypeSlotComponent />
      <div class="item-slot-container">
        <ItemSlotComponent v-for="slotType in slotTypes" :key="slotType" :slotType="slotType" />
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
