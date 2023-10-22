<script setup lang="ts">
const props = defineProps(['size']);
</script>

<template>
  <svg
    :width="size / 2"
    :height="size / 2"
    :viewBox="`0 0 ${props.size / 2} ${props.size / 2}`"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      :d="`M${props.size / 2} 0L0 ${props.size / 2}M0 0L${props.size / 2} ${props.size / 2}`"
      :stroke-width="props.size / 12"
    />
  </svg>
</template>

<style scoped>
path {
  stroke: var(--accent-dull);
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>
