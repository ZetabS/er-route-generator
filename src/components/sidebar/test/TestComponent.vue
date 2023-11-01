<script setup lang="ts">
import { computed, ComputedRef, Ref, ref } from 'vue';
import SidebarWrapper from '@/components/wrapper/SidebarWrapper.vue';
import TestText from './TestText.vue';
import { koreanData } from '@/modules/api/apiService';
import { useSelectedStore } from '@/stores/selected';

const selected = useSelectedStore();

import { getAllMaterials } from '@/modules/plan/Plan';
import type { Item } from '@/common/typing';
import ItemIcon from '@/components/icon/ItemIcon.vue';

const materials = computed(() => getAllMaterials(selected.itemsArray));

const materialsName = computed(() => materials.value.map((item) => item.name));

const num = ref(0);
</script>

<template>
  <SidebarWrapper :size="10">
    <item-icon v-for="item of materials" :key="item" :item="item" :size="3" />
  </SidebarWrapper>
</template>

<style scoped>
button {
  width: 5rem;
  height: 5rem;
}
</style>
