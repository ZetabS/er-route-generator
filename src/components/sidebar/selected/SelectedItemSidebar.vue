<script setup lang="ts">
import SidebarWrapper from '@/components/wrapper/SidebarWrapper.vue';
import SelectedWeaponTypeSlot from './SelectedWeaponTypeSlot.vue';
import SelectedItemSlot from './SelectedItemSlot.vue';

import { EquipTypes as slotTypes } from '@/modules/api/enums';
</script>

<template>
  <SidebarWrapper :size="10">
    <div class="slots">
      <SelectedWeaponTypeSlot />
      <div class="item-slot-container">
        <SelectedItemSlot v-for="slotType in slotTypes" :key="slotType" :slotType="slotType" />
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
