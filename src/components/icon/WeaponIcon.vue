<script setup lang="ts">
const { weaponType, width, height } = defineProps(['weaponType', 'width', 'height']);
</script>

<template>
  <img
    :src="`/images/weapon-type/${weaponType}.png`"
    :style="`width: ${width}; height: ${height}; `"
    alt="Weapon"
  />
</template>

<style scoped></style>
