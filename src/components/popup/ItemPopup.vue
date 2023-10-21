<script setup lang="ts">
import PopupWrapper from './PopupWrapper.vue';
</script>

<template>
  <PopupWrapper>
    <h2>목표 아이템</h2>
    <div class="item-button-container"></div>
  </PopupWrapper>
</template>

<style>
.item-button-container {
  background-color: white;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  flex: 0 0 30rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;

  .item-button {
    min-width: 5rem;
    min-height: 3.4rem;
    margin: 10px;
    border-radius: 10px;
    cursor: pointer;

    display: flex;
    justify-content: center;

    > .item-icon {
      width: 4rem;
      height: 2.4rem;

      > img {
        height: 1.8rem;
      }
    }
  }
  .item-button:hover {
    background-color: var(--bg-duller-highlighted);
  }
}
</style>
