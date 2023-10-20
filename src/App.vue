<script setup lang="ts">
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
import MapComponent from './components/MapComponent.vue'
import TargetItemComponent from './components/sidebar/TargetItemComponent.vue'
import OptionComponent from './components/sidebar/OptionComponent.vue'
import PopupContainer from './components/popup/PopupContainer.vue'
</script>

<template>
  <HeaderComponent />
  <main>
    <div class="main-container side">
      <TargetItemComponent />
      <OptionComponent />
    </div>

    <div class="main-container center">
      <MapComponent />
    </div>

    <div class="main-container side">
      <div class="side-component test1">test1</div>
      <div class="side-component test2">test2</div>
      <div class="side-component test3">test3</div>
    </div>
    <PopupContainer />
  </main>
  <FooterComponent />
</template>

<style scoped>
main {
  flex: 1 1 auto;
  margin: var(--space-medium);
  display: flex;
  justify-content: space-between;
}

.main-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

@media (min-width: 961px) {
  main {
    flex-direction: row;
  }

  .main-container.side {
    flex: 0 0 var(--side-size);
  }

  .main-container.center {
    flex: 0 1 35%;
  }
}

@media (max-width: 960px) {
  main {
    flex-direction: column;
  }

  .main-container {
    min-width: var(--side-size);
  }

  .main-container.center {
    order: 999;
  }
}
</style>
