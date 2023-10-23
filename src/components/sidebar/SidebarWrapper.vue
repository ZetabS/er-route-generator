<script setup lang="ts">
const props = defineProps(['size']);
</script>

<template>
  <div class="side-component" :style="`height: ${props.size}rem`">
    <slot></slot>
  </div>
</template>

<style scoped>
.side-component {
  background-color: var(--sidebar-bg);
  padding: var(--space-medium);
  border-style: hidden;
  border-radius: var(--space-2);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);

  display: flex;
  flex-direction: column;
  min-width: min-content;
}
</style>
