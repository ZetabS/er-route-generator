<script setup lang="ts">
// import TestText from './TestText.vue';
import { computed } from 'vue';
import SidebarWrapper from '@/components/wrapper/SidebarWrapper.vue';
import { useSelectedStore } from '@/stores/selected';
import { Plan } from '@/modules/plan';
import ItemIcon from '@/components/icon/ItemIcon.vue';
import { AREA_BY_NAME } from '@/modules/api';

const selected = useSelectedStore();
const plan = computed(() => {
  return new Plan(
    [AREA_BY_NAME['병원'], AREA_BY_NAME['고급 주택가'], AREA_BY_NAME['숲']],
    selected.itemsArray
  );
});
</script>

<template>
  <SidebarWrapper :size="10">
    <div class="container" v-for="num of [1, 2, 3]" :key="num">
      {{ plan.inventoryAt(num)?.toString() }}
      {{ plan.inventoryAt(num)?.toString() }}
      <item-icon
        v-for="item of plan.inventoryAt(num)?.toArray()"
        :key="item"
        :item="item"
        :size="3"
      />
    </div>
  </SidebarWrapper>
</template>

<style scoped>
.container {
  display: flex;
}

button {
  width: 5rem;
  height: 5rem;
}
</style>
