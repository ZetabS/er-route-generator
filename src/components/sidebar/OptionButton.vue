<script setup lang="ts">
import SettingIcon from '../icon/SettingIcon.vue';
</script>

<template>
  <div class="button">
    <SettingIcon :size="1.4" />
  </div>
</template>

<style scoped>
.button {
  background-color: var(--bg-focus);
  width: 3rem;
  height: 3rem;
  border-style: hidden;
  border-radius: var(--space-2);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);

  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.button:hover {
  background-color: var(--bg-duller-highlighted);
}
</style>
