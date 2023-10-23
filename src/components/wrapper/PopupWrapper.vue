<script setup lang="ts">
import CloseIcon from '../icon/CloseIcon.vue';
defineProps(['closePopup']);
</script>

<template>
  <div class="popup-container">
    <div class="popup-background" @click="closePopup()"></div>
    <div class="popup" id="popup-item">
      <div class="close-button" @click="closePopup()">
        <CloseIcon :size="24" />
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.popup-container {
  position: fixed;
  margin-right: 10px;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.popup-background {
  background: rgba(0, 0, 0, 0.5);

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
}

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

.close-button {
  background-color: var(--bg-duller);

  width: 24px;
  height: 24px;
  border: none;
  border-radius: 50px;
  position: absolute;
  right: var(--space-medium);
  top: var(--space-medium);
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
}

.close-button:hover {
  background-color: var(--bg-duller-highlighted);
}
</style>
