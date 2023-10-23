<script setup lang="ts">
import CloseButton from './CloseButton.vue';
</script>

<template>
  <div class="popup" id="popup-item">
    <CloseButton />
    <slot></slot>
  </div>
</template>

<style scoped>
.popup {
  background-color: var(--bg-focus);

  position: relative;
  width: 50rem;
  height: 80%;
  padding: var(--space-medium);
  margin: calc(var(--space-medium) + 5px); /* 5px 스크롤바 보정*/
  right: 5px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 999;

  display: flex;
  flex-direction: column;
  gap: var(--space-medium);
}
</style>
