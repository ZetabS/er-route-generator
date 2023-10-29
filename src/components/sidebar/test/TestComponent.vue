<script setup lang="ts">
import { ref } from 'vue';
import SidebarWrapper from '@/components/wrapper/SidebarWrapper.vue';
import TestText from './TestText.vue';
import { koreanData } from '@/modules/api/languageData';
const num = ref(0);
</script>

<template>
  <SidebarWrapper :size="10"> </SidebarWrapper>
</template>

<style scoped>
button {
  width: 5rem;
  height: 5rem;
}
</style>
