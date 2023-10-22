<script setup lang="ts">
import { ref, watch } from 'vue';
const { weaponType, width, height } = defineProps(['weaponType', 'width', 'height']);

const imgPath = ref('');

watch(imgPath, () => {
  return `/er-route-generator/images/weapon-type/${weaponType}.png`;
});
</script>

<template>
  <img
    :src="`/er-route-generator/images/weapon-type/${weaponType}.png`"
    :style="`width: ${width}; height: ${height}; `"
    alt="Weapon"
  />
</template>

<style scoped></style>
