<script setup lang="ts"></script>

<template>
  <div class="side-component">
    <slot></slot>
  </div>
</template>

<style>
.side-component {
  flex: 0 0 10rem;
  background-color: var(--bg-focus);
  padding: var(--space-medium);
  margin-bottom: var(--space-medium);
  border-style: hidden;
  border-radius: var(--space-2);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);

  display: flex;
  flex-direction: column;
  min-width: min-content;
}
</style>
