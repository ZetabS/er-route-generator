<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import CenterMap from './components/CenterMap.vue';
import SelectedItemSidebar from './components/sidebar/selected/SelectedItemSidebar.vue';
import TestComponent from './components/sidebar/test/TestComponent.vue';
import GenerateButton from './components/sidebar/GenerateButton.vue';
import OptionButton from './components/sidebar/OptionButton.vue';
</script>

<template>
  <AppHeader />
  <div class="sidebar left">
    <SelectedItemSidebar />
    <div class="sidebar-button-container">
      <GenerateButton />
      <OptionButton />
    </div>
    <TestComponent />
  </div>

  <div class="center">
    <CenterMap />
  </div>

  <div class="sidebar right">
    <TestComponent />
  </div>
  <AppFooter />
</template>

<style>
#app {
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-areas:
    'header header header'
    ' left  center right '
    'footer footer footer';

  grid-template-columns: var(--sidebar-width) auto var(--sidebar-width);
  grid-template-rows:
    var(--header-size)
    minmax(0, 1fr)
    var(--footer-size);

  gap: var(--space-medium);
  justify-content: space-between;
}

@media (max-width: 1024px) {
  #app {
    grid-template-areas:
      'header'
      ' left '
      'right '
      'center'
      'footer';

    grid-template-columns: auto;
    grid-template-rows:
      var(--header-size)
      auto
      auto
      auto
      var(--footer-size);

    justify-content: stretch;
  }
}
</style>

<style scoped>
.center {
  grid-area: center;
  margin-left: var(--space-medium);
  margin-right: var(--space-medium);
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--space-medium);
  justify-content: flex-start;
}

.sidebar.left {
  grid-area: left;
  margin-left: var(--space-medium);
}

.sidebar.right {
  grid-area: right;
  margin-right: var(--space-medium);
}

.sidebar-button-container {
  height: 3rem;
  display: flex;
  gap: var(--space-medium);
  min-width: min-content;
}

@media (max-width: 1024px) {
  .sidebar.left {
    margin-right: var(--space-medium);
  }

  .sidebar.right {
    margin-left: var(--space-medium);
  }
}
</style>
