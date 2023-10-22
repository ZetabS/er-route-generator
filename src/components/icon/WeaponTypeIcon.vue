<script setup lang="ts">
import { computed } from 'vue';
const { weaponType, width, height } = defineProps(['weaponType', 'width', 'height']);

const imgPath = computed(() => {
  return import.meta.env.BASE_URL + `src/assets/images/weapon-type/${weaponType}.png`;
});
</script>

<template>
  <img :src="imgPath" :style="`width: ${width}; height: ${height}; `" alt="Weapon" />
</template>

<style scoped></style>
