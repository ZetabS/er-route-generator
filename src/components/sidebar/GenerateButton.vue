<script setup lang="ts"></script>

<template>
  <div class="button">루트 생성</div>
</template>

<style scoped>
.button {
  background-color: var(--sidebar-button-bg);
  flex: 1 0 22rem;
  height: 3rem;
  padding: var(--space-medium);
  border-style: hidden;
  border-radius: var(--space-2);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  color: var(--font-color-2);
  font-weight: bold;

  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.button:hover {
  background-color: var(--sidebar-button-bg-hover);
}
</style>
