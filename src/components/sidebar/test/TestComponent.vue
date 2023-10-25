<script setup lang="ts">
import { ref } from 'vue';
import SidebarWrapper from '@/components/wrapper/SidebarWrapper.vue';
import TestText from './TestText.vue';
import { koreanData } from '@/assets/data/languageData';
const num = ref(0);
</script>

<template>
  <SidebarWrapper :size="10">
    {{ num }}
    <br />
    <TestText :num="num" />
    {{ koreanData['ArmorType/Head/Desc'] }}
    <button @click="num += 1">+1</button>
  </SidebarWrapper>
</template>

<style scoped>
button {
  width: 5rem;
  height: 5rem;
}
</style>
