<script setup lang="ts">
import GenerateButton from './GenerateButton.vue';
import OptionButton from './OptionButton.vue';
</script>

<template>
  <div class="side-component">
    <GenerateButton />
    <OptionButton />
  </div>
</template>

<style scoped>
.side-component {
  height: 3rem;
  display: flex;
  gap: var(--space-medium);
  min-width: min-content;
}
</style>
