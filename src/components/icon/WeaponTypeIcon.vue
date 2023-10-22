<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps(['weaponType', 'size']);
const imgStyle = `width: ${props.size}rem; height: ${props.size}rem;`;

const imgPath = computed(() => {
  return import.meta.env.BASE_URL + `images/weapon-type/${props.weaponType}.png`;
});
</script>

<template>
  <img :src="imgPath" :style="imgStyle" alt="Weapon" />
</template>

<style scoped></style>
