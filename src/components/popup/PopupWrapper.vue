<script setup lang="ts">
import CloseButton from './CloseButton.vue';
</script>

<template>
  <div class="popup" id="popup-item">
    <CloseButton />
    <slot></slot>
  </div>
</template>

<style>
.popup {
  background-color: var(--bg-focus);

  position: relative;
  width: 50rem;
  height: 80%;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 999;

  display: flex;
  flex-direction: column;
}
</style>
