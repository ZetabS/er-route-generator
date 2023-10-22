<script setup lang="ts">
import { computed, ref, watch } from 'vue';
const props = defineProps(['num']);

const numPlusOne = computed(() => {
  return props.num + 1;
});
</script>

<template>
  {{ numPlusOne }}
</template>

<style scoped></style>
