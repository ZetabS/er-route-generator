<script setup lang="ts">
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import MapComponent from './components/MapComponent.vue';
import ItemSelectComponent from './components/sidebar/ItemSelectComponent.vue';
import TestComponent from './components/sidebar/TestComponent.vue';
import OptionComponent from './components/sidebar/OptionComponent.vue';
import PopupContainer from './components/popup/PopupContainer.vue';
</script>

<template>
  <HeaderComponent />
  <div class="sidebar left">
    <ItemSelectComponent />
    <OptionComponent />
  </div>

  <div class="center">
    <MapComponent />
  </div>

  <div class="sidebar right">
    <TestComponent />
    <TestComponent />
    <TestComponent />
  </div>
  <PopupContainer />
  <FooterComponent />
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

@media (max-width: 1024px) {
  .sidebar.left {
    margin-right: var(--space-medium);
  }

  .sidebar.right {
    margin-left: var(--space-medium);
  }
}
</style>
